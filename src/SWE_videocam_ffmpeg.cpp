/***************************************************************************
 *   Copyright (C) 2019 by SWE team <sdl.window.engine@gmail.com>          *
 *                                                                         *
 *   Part of the SWE Lua:                                                  *
 *   https://github.com/AndreyBarmaley/SWE_lua                             *
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation; either version 3 of the License, or     *
 *   (at your option) any later version.                                   *
 *                                                                         *
 *   This program is distributed in the hope that it will be useful,       *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
 *   GNU General Public License for more details.                          *
 *                                                                         *
 *   You should have received a copy of the GNU General Public License     *
 *   along with this program; if not, write to the                         *
 *   Free Software Foundation, Inc.,                                       *
 *   59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.             *
 ***************************************************************************/

#ifdef WITH_VIDEOCAM_FFMPEG

#include "SWE_videocam_ffmpeg.h"

#ifdef __cplusplus
extern "C" {
#endif

#include <unistd.h>
#include <cctype>

#include "libavdevice/avdevice.h"
#include "libavcodec/avcodec.h"
#include "libavformat/avformat.h"
#include "libavformat/avio.h"
#include "libswscale/swscale.h"

// centos6, ffmpeg 2.6.8:  LIBAVFORMAT_VERSION_INT == AV_VERSION_INT(56,25,101)
// centos7, ffmpeg 2.8.15: LIBAVFORMAT_VERSION_INT == AV_VERSION_INT(56,40,101)
// centos7, ffmpeg 4.1.4:  LIBAVFORMAT_VERSION_INT == AV_VERSION_INT(58,20,100)
// fedora24, ffmpeg 3.1.9: LIBAVFORMAT_VERSION_INT == AV_VERSION_INT(57,41,100)
// fedora26, ffmpeg 3.3.7: LIBAVFORMAT_VERSION_INT == AV_VERSION_INT(57,71,100)
// fedora28, ffmpeg 4.0.4: LIBAVFORMAT_VERSION_INT == AV_VERSION_INT(58,12,100)

#if LIBAVFORMAT_VERSION_MAJOR < 53
#define FFMPEG_OLD_API 1
#else
#include "libavutil/imgutils.h"
#endif

#include <fcntl.h>

#ifdef LINUX
#include <sys/ioctl.h>
#include <linux/videodev2.h>
#endif

char* string_dup(const std::string & str)
{
    size_t len = str.size();
    char*  res = (char*) malloc(len + 1);
    if(res)
    {
	std::copy(str.begin(), str.end(), res);
	res[len] = 0;
    }
    return res;
}

#ifdef LINUX
std::string ffmpeg_v4l2_convert_name(__u8* ptr, int sz)
{
    std::string res;

    for(int it = 0; it < sz; ++it)
    {
	if(! isgraph(ptr[it])) break;
	res.append(1, tolower(ptr[it]));
    }

    return res;
}

int ffmpeg_v4l2_channel_input(const std::string & dev, const std::string & channel)
{
    int fd = open(dev.c_str(), O_RDONLY);
    int res = 0;

    if(0 <= fd)
    {
	for(int index = 0;;index++)
	{
    	    struct v4l2_input st_input;
    	    memset(&st_input, 0, sizeof(st_input));
    	    st_input.index = index;

    	    if(ioctl(fd, VIDIOC_ENUMINPUT, &st_input) < 0)
        	break;

	    std::string input = ffmpeg_v4l2_convert_name(st_input.name, 32);
	    VERBOSE("available input: " << input);

    	    if(0 == channel.compare(input))
	    {
		VERBOSE("selected input: " << channel << ", " << index);
		res = index;
	    }
	}

	close(fd);
    }

    return res;
}
#else
int ffmpeg_v4l2_channel_input(const std::string & dev, const std::string & channel)
{
    return 0;
}
#endif

#ifndef FFMPEG_OLD_API
void ffmpeg_list_devices(void)
{
    // list format
    AVInputFormat* format = NULL;
    while(NULL != (format = av_input_video_device_next(format)))
    {
	DEBUG("available format: " << format->name << ", (" << format->long_name << ")");

	AVDeviceInfoList* device_list = NULL;

	if(format->get_device_list &&
	    0 == avdevice_list_input_sources(format, NULL, NULL, &device_list))
	{
	    for(int ii = 0; ii < device_list->nb_devices; ++ii) if(device_list->devices[ii])
	    {
		DEBUG("available source: " << device_list->devices[ii]->device_name << ", (" << device_list->devices[ii]->device_description << ")");
	    }
	}
        else
	{
	    DEBUG("sources: empty");
	}

	avdevice_free_list_devices(&device_list);
    }
}
#endif

bool FFmpegContext::init(const JsonObject & params)
{
    std::string strFormat = params.getString("format");
    std::string strDevice = params.getString("device");

    if(strFormat.empty())
    {
	ERROR("format empty");
	return false;
    }

    DEBUG("format: " << strFormat);
    if(strDevice.size())
    {
	DEBUG("device: " << strDevice);
    }

    if(params.getBoolean("debug", false))
    {
	av_log_set_level(AV_LOG_DEBUG);
    }
    else
    {
	av_log_set_level(AV_LOG_ERROR);
    }

    int err = -1;

#ifdef FF_OLD_API
    avdevice_register_all();
#else
#if LIBAVFORMAT_VERSION_MAJOR < 58
    av_register_all();
#endif
    avformat_network_init();
    avdevice_register_all();

    ffmpeg_list_devices();
#endif

    AVInputFormat *pFormatInput = av_find_input_format(strFormat.c_str());

#ifdef FFMPEG_OLD_API
    AVFormatParameters v4l2Params;
    v4l2Params.time_base = AV_TIME_BASE_Q;
    AVFormatParameters* curParams = NULL;
    StringList keys = params.keys();
    char* v4l2Standard = NULL;

    for(auto it = keys.begin(); it != keys.end(); ++it)
    {
	if(*it == "format" || *it == "device" ||  *it == "debug") continue;
	const std::string & key = *it;

	if(key == "video_input")
	{
	    std::string val = String::toLower(params.getString(key));
	    int input = ffmpeg_v4l2_channel_input(strDevice, val);
	    v4l2Params.channel = input;
	    curParams = & v4l2Params;
	    DEBUG("av_dict_set: " << key << "=" << input);
	}
        else
	if(key == "video_standard")
	{
	    std::string val = String::toUpper(params.getString(key));
	    v4l2Standard = string_dup(val);
	    v4l2Params.standard = v4l2Standard;
	    curParams = & v4l2Params;
	    DEBUG("av_dict_set: " << key << "=" << val);
	}
        else
	if(key == "video_size")
	{
	    Size size = Size::parse(params.getString(key));
	    v4l2Params.width = size.w;
	    v4l2Params.height = size.h;
	    curParams = & v4l2Params;
	    DEBUG("av_dict_set: " << key << "=" << size.w << "x" << size.h);
	}
	else
	if(key == "sample_rate")
	{
	    int val = params.getInteger(key);
	    v4l2Params.sample_rate = val;
	    curParams = & v4l2Params;
	    DEBUG("av_dict_set: " << key << "=" << val);
	}
	else
	if(key == "channels")
	{
	    int val = params.getInteger(key);
	    v4l2Params.channels = val;
	    curParams = & v4l2Params;
	    DEBUG("av_dict_set: " << key << "=" << val);
	}
	else
	if(key == "channel")
	{
	    int val = params.getInteger(key);
	    v4l2Params.channel = val;
	    curParams = & v4l2Params;
	    DEBUG("av_dict_set: " << key << "=" << val);
	}
    }

    err = av_open_input_file(& ctxFormat, strDevice.c_str(), pFormatInput, 0, curParams);
#else
    AVDictionary* v4l2Params = NULL;
    AVDictionary** curParams = NULL;
    StringList keys = params.keys();

    for(auto it = keys.begin(); it != keys.end(); ++it)
    {
	if(*it == "format" || *it == "device" ||  *it == "debug") continue;
	const std::string & key = *it;
	auto type = params.getType(key);

	if(key == "video_input")
	{
	    std::string val = String::toLower(params.getString(key));
	    int input = ffmpeg_v4l2_channel_input(strDevice, val);
	    av_dict_set_int(& v4l2Params, key.c_str(), input, 0);
	    DEBUG("av_dict_set: " << key << "=" << input);
	}
        else
	if(type == JsonType::Integer || type == JsonType::Double)
	{
	    int val = params.getInteger(key);
	    av_dict_set_int(& v4l2Params, key.c_str(), val, 0);
	    DEBUG("av_dict_set: " << key << "=" << val);
	}
	else
        {
	    std::string val = params.getString(*it);
	    av_dict_set(& v4l2Params, key.c_str(), val.c_str(), 0);
	    DEBUG("av_dict_set: " << key << "=" << val);
	}

	curParams = & v4l2Params;
    }

    err = avformat_open_input(& ctxFormat, strDevice.c_str(), pFormatInput, curParams);
#endif

    if(err < 0)
    {
    	ERROR("unable to open device: " << strDevice << ", error: " << err);
    	return false;
    }

#ifdef FFMPEG_OLD_API
    err = av_find_stream_info(ctxFormat);
#else
    err = avformat_find_stream_info(ctxFormat, NULL);
#endif
    if(err < 0)
    {
    	ERROR("unable to find stream info" << ", error: " << err);
    	return false;
    }

    AVStream* av_stream = NULL;
    int videoStreamIndex = 0;
    for(; videoStreamIndex < ctxFormat->nb_streams; ++videoStreamIndex)
    {
#if LIBAVFORMAT_VERSION_MAJOR > 56
	AVCodecParameters* codec = ctxFormat->streams[videoStreamIndex]->codecpar;
#else
	AVCodecContext* codec = ctxFormat->streams[videoStreamIndex]->codec;
#endif
	if(codec->codec_type == AVMEDIA_TYPE_VIDEO)
	{
	    streamIndex = videoStreamIndex;
	    av_stream = ctxFormat->streams[videoStreamIndex];
	    break;
	}
    }

    if(NULL == av_stream)
    {
    	ERROR("unable to find video stream" << ", error: " << err);
    	return false;
    }

#if LIBAVFORMAT_VERSION_MAJOR > 56
    AVCodec* codec = avcodec_find_decoder(av_stream->codecpar->codec_id);
    ctxCodec = avcodec_alloc_context3(codec);
    avcodec_parameters_to_context(ctxCodec, av_stream->codecpar);
    err = avcodec_open2(ctxCodec, codec, NULL);
#else
    ctxCodec = av_stream->codec;
    AVCodec* codec = avcodec_find_decoder(ctxCodec->codec_id);
    err = avcodec_open2(ctxCodec, codec, NULL);
#endif

    if(err < 0)
    {
    	ERROR("unable to open codec" << ", error: " << err);
    	return false;
    }

#ifdef FFMPEG_OLD_API
    if(v4l2Standard) free(v4l2Standard);
#else
    if(curParams) av_dict_free(curParams);
#endif

    return true;
}

void FFmpegContext::quit(void)
{
#if LIBAVFORMAT_VERSION_MAJOR > 56
    if(ctxCodec)
    {
	avcodec_free_context(&ctxCodec);
	ctxCodec = NULL;
    }
#endif
#ifdef FFMPEG_OLD_API
    if(ctxCodec) avcodec_close(ctxCodec);
    if(ctxFormat) av_close_input_file(ctxFormat);
#else
    if(ctxCodec) avcodec_close(ctxCodec);
    if(ctxFormat) avformat_close_input(& ctxFormat);
#endif
    ctxCodec = NULL;
    ctxFormat = NULL;
}

#if SDL_BYTEORDER == SDL_BIG_ENDIAN
#define Rmask 0xff000000
#define Gmask 0x00ff0000
#define Bmask 0x0000ff00
#define Amask 0x000000ff
#else
#define Rmask 0x000000ff
#define Gmask 0x0000ff00
#define Bmask 0x00ff0000
#define Amask 0xff000000
#endif

#if LIBAVFORMAT_VERSION_MAJOR > 56
int avcodec_decode_video22(AVCodecContext* avctx, AVFrame* frame, int* got_frame, AVPacket* pkt)
    {
    int ret;
    *got_frame = 0;

    if (pkt)
    {
        ret = avcodec_send_packet(avctx, pkt);
        if (ret < 0)
            return ret == AVERROR_EOF ? 0 : ret;
    }

    ret = avcodec_receive_frame(avctx, frame);
    if (ret < 0 && ret != AVERROR(EAGAIN) && ret != AVERROR_EOF)
        return ret;

    if (ret >= 0)
        *got_frame = 1;

    return 0;
}
#else
int avcodec_decode_video22(AVCodecContext* avctx, AVFrame* frame, int* got_frame, AVPacket* pkt)
{
    return avcodec_decode_video2(avctx, frame, got_frame, pkt);
}
#endif

bool FFmpegContext::capture(void)
{
    if(! ctxFormat || ! ctxCodec)
    {
	ERROR("context is NULL");
	return false;
    }

#ifdef FFMPEG_OLD_API
    AVFrame* pFrame = avcodec_alloc_frame();
    AVFrame* pFrameRGB = avcodec_alloc_frame();

    if(pFrameRGB == NULL)
    {
	ERROR("pFrameRGB is NULL");
	return false;
    }

    int numBytes = avpicture_get_size(PIX_FMT_RGB24, ctxCodec->width, ctxCodec->height);

    uint8_t* buffer = (uint8_t *) av_malloc(numBytes * sizeof(uint8_t));

    struct SwsContext* sws_ctx = sws_getContext(ctxCodec->width, ctxCodec->height, ctxCodec->pix_fmt,
            		ctxCodec->width, ctxCodec->height, PIX_FMT_RGB24, SWS_BILINEAR, NULL, NULL, NULL);

    avpicture_fill((AVPicture *) pFrameRGB, buffer, PIX_FMT_RGB24, ctxCodec->width, ctxCodec->height);
#else
    AVFrame* pFrame = av_frame_alloc();
    AVFrame* pFrameRGB = av_frame_alloc();

    if(pFrameRGB == NULL)
    {
	ERROR("pFrameRGB is NULL");
	return false;
    }

    int numBytes = av_image_get_buffer_size(AV_PIX_FMT_RGB24, ctxCodec->width, ctxCodec->height, 1);
    uint8_t* buffer = (uint8_t *) av_malloc(numBytes * sizeof(uint8_t));

    struct SwsContext* sws_ctx = sws_getContext(ctxCodec->width, ctxCodec->height, ctxCodec->pix_fmt,
            		ctxCodec->width, ctxCodec->height, AV_PIX_FMT_RGB24, SWS_BILINEAR, NULL, NULL, NULL);

    av_image_fill_arrays(pFrameRGB->data, pFrameRGB->linesize, buffer, AV_PIX_FMT_RGB24, ctxCodec->width, ctxCodec->height, 1);
#endif

    AVPacket packet;
    av_init_packet(& packet);

    int frameFinished = 0;

    while(av_read_frame(ctxFormat, &packet) >= 0)
    {
        if(packet.stream_index == streamIndex)
        {
            if(0 > avcodec_decode_video22(ctxCodec, pFrame, &frameFinished, &packet))
	    {
		break;
	    }

            if(frameFinished)
            {
                sws_scale(sws_ctx, (uint8_t const* const*) pFrame->data, pFrame->linesize, 0,
                            ctxCodec->height, pFrameRGB->data, pFrameRGB->linesize);

#if SDL_VERSION_ATLEAST(2,0,5)
		SDL_Surface* sf = SDL_CreateRGBSurfaceWithFormatFrom(pFrameRGB->data[0],
			    ctxCodec->width, ctxCodec->height,
			    24, pFrameRGB->linesize[0], SDL_PIXELFORMAT_RGB24);
#else
		SDL_Surface* sf = SDL_CreateRGBSurfaceFrom(pFrameRGB->data[0],
			    ctxCodec->width, ctxCodec->height,
			    24, pFrameRGB->linesize[0], Rmask, Gmask, Bmask, Amask);
#endif

		av_frame_unref(pFrame);
		av_frame_unref(pFrameRGB);
		if(sf) frameTexture = Display::createTexture(Surface(sf));
                break;
            }
        }

#ifdef FFMPEG_OLD_API
        av_free_packet(&packet);
#else
    	av_packet_unref(&packet);
#endif
    }

#ifdef FFMPEG_OLD_API
    av_free_packet(&packet);
#else
    av_packet_unref(&packet);
#endif

    av_free(buffer);
    sws_freeContext(sws_ctx);

    av_free(pFrameRGB);
    av_free(pFrame);

    return true;
}

#ifdef __cplusplus
}
#endif

#endif
