class VideoUrlClass {
  private videoUrl: string = "";
  private thumbnail: string = "";
  private start_time: string = "";

  setTimeStart = (time: string) => {
    return (this.start_time = time);
  };

  getTimeStart = () => {
    return this.start_time;
  };

  getVideoUrl = () => {
    return {
      videoUrl: this.videoUrl,
      thumbnail: this.thumbnail,
    };
  };

  changeURL = async (
    newVideoUrl: string,
    thumbnail: string,
    start_time: string
  ) => {
    if (newVideoUrl != "") {
      this.videoUrl = newVideoUrl;
      this.thumbnail = thumbnail;
    }
  };
}

const VideoUrlServiceClass = new VideoUrlClass();
export default VideoUrlServiceClass;
