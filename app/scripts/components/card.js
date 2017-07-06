import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Video from './video';
import ReactPlayer from 'react-player'
let numeral = require('numeral');
let backdropIMG;

class Card extends Component {

  render() {
    let data = this.props.data
      // if movie ID found, then...
      let posterIMG = data.poster,
          production = data.production,
          productionCountries = data.production_countries,
          genres = data.genre,
          totalRevenue = data.revenue,
          productionList = nestedDataToString(production),
          productionCountriesList = nestedDataToString(productionCountries),
          noData = '-',
          genresList = nestedDataToString(genres);
          backdropIMG = data.poster;

      // conditional statements for no data
       if (data.vote === 'undefined' || data.vote === 0) {
          data.vote = noData
        } else {
          data.vote = data.vote + ' / 10'
        };

      if (totalRevenue === 'undefined' || totalRevenue === 0) {
           totalRevenue = noData
         } else {
           totalRevenue = numeral(data.revenue).format('($0,0)');
         };

      let episodes = []
      if (data.episodes != undefined && data.episodes.length > 0) {
          data.episodes.sort(function(a, b) {
            return parseFloat(a.episode) - parseFloat(b.episode);
          });
          episodes = data.episodes.map((episode, index) =>
            <a className="col-xs-1" href="#" key={episode.episodeSid} onClick={() => this.props.fetchEpisode(episode.episodeSid)}>
              {episode.episode} 
            </a> 
          )
      }


      return (
        <div className="col-xs-12 cardcont nopadding">

          <div className="meta-data-container col-xs-12 col-md-8 push-md-4 col-lg-7 push-lg-5">
            <p>{data.overview}</p>
              <div className="row nopadding release-details">
                <div className="col-xs-12"> 剧集: 
                <span className="meta-data">
                { episodes } 
                </span>
                </div>
                <div className="row">
                <Video url={this.props.data.url}/>
                </div>
              </div>
          </div>
          <div className="poster-container nopadding col-xs-12 col-md-4 pull-md-8 col-lg-5 pull-lg-7 ">
            <img id="postertest" className='poster' src={posterIMG}/>
          </div>
        </div>
      )
    }
  componentDidUpdate() {
    document.body.style.backgroundImage = 'url(' + backdropIMG + ')';
  }
}


function nestedDataToString(nestedData) {
  let nestedArray = [],
      resultString;
  nestedArray.forEach(function(item, i){
    nestedArray.push(item.name);
  });
  resultString = nestedArray.join(', '); // array to string
  return resultString;
};
module.exports = Card;
