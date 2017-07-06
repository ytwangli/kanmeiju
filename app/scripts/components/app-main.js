import React, { Component } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import SearchBox from './search';
import Card from './card';
import Video from './video';

var SERVER = 'http://kanmeiju.herokuapp.com'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      movieID: 4772
    }
  }
  render() {
    return (
      <div>
        <SearchBox fetchMovieID={this.fetchMovieID.bind(this)}/>
        <LoadingOverlay active={this.state.loading} background="#fff" spinner > 
            <Card data={this.state} fetchEpisode={this.fetchEpisode.bind(this)}/>
        </LoadingOverlay>
      </div>
    )
  } // END render

  // the api request function
  fetchApi(url) {

    fetch(url).then((res) => res.json()).then((data) => {
      // update state with API data
      console.log(data)
      this.setState({
        movieId: data.data.season.id,
        title: data.data.season.title,
        overview: data.data.season.brief,
        poster: data.data.season.cover,
        release: data.data.season.createTimeStr,
        runtime: data.data.season.viewCount,
        episodes: data.data.season.playUrlList,
        url: "",
        loading: false

      })
      

    })

    this.setState({
        loading: true
    });
    // .catch((err) => console.log('Movie not found!'))

  } // end function

  fetchMovieID(movieID) {
    let url = SERVER + `/api/detail/${movieID}`
    this.fetchApi(url)
  } // end function

  fetchEpisode(episodeSid) {
    let url = SERVER + `/api/m3u8/${episodeSid}`
    fetch(url).then((res) => res.json()).then((data) => {
        console.log(data)
        this.setState({
          url: data.data.m3u8.url,
          loading: false
        })
    });
    this.setState({
        loading: true
    });
  }

  componentDidMount() {
    let url = SERVER + `/api/detail/${this.state.movieID}`
    this.fetchApi(url)

    //========================= BLOODHOUND ==============================//
    let suggests = new Bloodhound({
      datumTokenizer: function(datum) {
        return Bloodhound.tokenizers.whitespace(datum.value);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: SERVER + '/api/search/%QUERY',
        filter: function(movies) {
          // Map the remote source JSON array to a JavaScript object array
          return $.map(movies.data.results, function(movie) {
            return {
              value: movie.title, // search original title
              id: movie.id // get ID of movie simultaniously
            };
          });
        } // end filter
      },
      limit: 15// end remote
    }); // end new Bloodhound

    suggests.initialize(); // initialise bloodhound suggestion engine

    //========================= END BLOODHOUND ==============================//

    //========================= TYPEAHEAD ==============================//
    // Instantiate the Typeahead UI
    $('.typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 2
    }, {source: suggests.ttAdapter()}).on('typeahead:selected', function(obj, datum) {
      this.fetchMovieID(datum.id)
    }.bind(this)); // END Instantiate the Typeahead UI
    //========================= END TYPEAHEAD ==============================//

  } // end component did mount function

  // } // END CLASS - APP
}
module.exports = App;
