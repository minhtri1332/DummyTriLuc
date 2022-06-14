class VideoUrlClass {
  private videoUrl: string = "";
  private thumbnail: string = "";

  getVideoUrl = () => {
    return { videoUrl: this.videoUrl, thumbnail: this.thumbnail };
  };

  changeURL = async (newVideoUrl: string, thumbnail: string) => {
    if (newVideoUrl != "") {
      this.videoUrl = newVideoUrl;
      this.thumbnail = thumbnail;
    }
  };
}

const VideoUrlServiceClass = new VideoUrlClass();
export default VideoUrlServiceClass;
