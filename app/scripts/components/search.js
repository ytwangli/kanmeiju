import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SearchBox extends Component {

  handleChange(event) {
    event.target.select();
  }
  render() {
    return (
      <div className="col-xs-12 search-container nopadding">
        <div className="row">

          <div className="header col-xs-12 col-sm-6 col-lg-5">
            <a href="./" title="ReactJS TMDb Movie Search"><img src='images/logo.png' className="logo" alt="The Movie Database" />
            <span> 看美剧</span>
            </a>
          </div>
          <div className="col-xs-12 col-sm-6 col-lg-7">
            <form className="searchbox">
              {/* <label> */}
                <input ref="search suggestion" onClick={this.handleChange} className="searchbox__input typeahead form-control" type="text" placeholder="搜索美剧..." id="q" />
              {/* </label> */}
              </form>
          </div>
        </div>
      </div>
    )
  }
}
module.exports = SearchBox;
