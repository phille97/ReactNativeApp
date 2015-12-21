const React = require('react-native');
const {ScrollView, Text} = React;

const MovieActions = require('./flux/actions/movie_actions.js').default
const MovieList = require('./movie_list.js')
const MovieSearchBar = require('./movie_search.js')

const OpenMoviesAPI = require('./apis/openmovies.js').default


class MovieApp extends React.Component {

    constructor (props) {
        super(props)
        this.msb = new MovieSearchBar()
        this.msb.addListener('search', query => OpenMoviesAPI.search(query))
    }

    render () {
        return (
            <ScrollView>
                {this.msb.render()}
                <MovieList/>
            </ScrollView>
        )
    }

}

module.exports = MovieApp;
