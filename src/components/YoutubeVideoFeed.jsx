import React, { Component } from "react";
import axios from "axios";
import Dialog from '@material-ui/core/Dialog';

const YOUTUBE_API_ENDPOINT = "https://www.googleapis.com/youtube/v3/playlistItems";

const EmbeddedVideo = ({ video, onClickVideo }) => {
  return (
    <div className="col-12 col-sm-6 col-md-3" onClick={onClickVideo}>
      <div className="pos-relative video-thumbmail">
        <div className="play-button">
          <i className="fa fa-play-circle"></i>
        </div>
        <img className="img-fluid" src={video.snippet.thumbnails.medium.url} alt={`Video thumbnail for "${video.snippet.title}"`} />
      </div>
      <h5 className="title-medium alt-font black-text display-block margin-ten no-margin-lr">{video.snippet.title}</h5>
    </div>
  )
}

class YoutubeVideoFeed extends Component {
  constructor(props) {
    super(props);
    this.state = { videos: [], openDialog: false, videoId: "" };
  }

  componentDidMount() {
    this.populateVideos()
  }

  populateVideos = () => {
    const url = `${YOUTUBE_API_ENDPOINT}?key=${process.env.GATSBY_YOUTUBE_API_KEY}&part=snippet&playlistId=${process.env.GATSBY_YOUTUBE_CHANNEL_UPLOADS_ID}&maxResults=50`;
    const method = "GET";

    axios({
      url,
      method
    })
    .then(res => {
      this.setState({ videos: res.data.items })
    })
    .catch(err => {
      console.log(err);
    });
  }

  openDialog = () => this.setState({ openDialog: true })

  closeDialog = () => this.setState({ openDialog: false })

  render() {
    const { videos, openDialog, videoId, videoTitle } = this.state;
    return (
      <div>
        <div className="row">
          {
            videos.map(video => {
              return <EmbeddedVideo video={video} key={video.id} onClickVideo={() => this.setState({ videoId: video.snippet.resourceId.videoId, videoTitle: video.snippet.title }, this.openDialog) } />
            })
          }
        </div>
        <Dialog onClose={this.closeDialog} aria-labelledby="simple-dialog-title" open={openDialog}>
          <div className="embed-container">
            <iframe title={videoTitle} src={`https://www.youtube.com/embed/${videoId}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </Dialog>
      </div>
    );
  }
}

export default YoutubeVideoFeed
