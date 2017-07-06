import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Video extends Component {

  render() {
    let video = null;
    if (this.props.url != undefined && this.props.url != "")
        video = <video className="col-xs-12" src={this.props.url} type="video/mp4" controls autoPlay>
                </video>


    return (
    <div className="col-xs-12">
    { video }
    </div>
    )
  }
}

module.exports = Video;
