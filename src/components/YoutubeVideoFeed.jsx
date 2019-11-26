import React, { Component } from "react";
import axios from "axios";
import Dialog from '@material-ui/core/Dialog';
import Slider from "react-slick"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const YOUTUBE_API_ENDPOINT = "https://www.googleapis.com/youtube/v3/playlistItems";

const PrevArrow = props => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      onClick={onClick}
      style={style}
    >
      <i className="fas fa-angle-left"></i>
    </button>
  );
}

const NextArrow = props => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      onClick={onClick}
      style={style}
    >
      <i className="fas fa-angle-right"></i>
    </button>
  );
}

const settings = {
  infinite: true,
  speed: 500,
  draggable: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        swipe: true,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        swipe: true,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
      }
    },
  ]
};

const EmbeddedVideo = ({ video, onClickVideo }) => {
  return (
    <div className="padding-five">
      <div className="pos-relative video-thumbmail">
        <div className="play-button">
          <i className="fa fa-play-circle" onClick={onClickVideo}></i>
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
        <div className="xs-padding-five">
          <Slider { ...settings }>
            {
              videos.map(video => {
                return <EmbeddedVideo video={video} key={video.id} onClickVideo={() => this.setState({ videoId: video.snippet.resourceId.videoId, videoTitle: video.snippet.title }, this.openDialog) } />
              })
            }
          </Slider>
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
