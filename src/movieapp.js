var React = require('react-native');
var {ScrollView} = React;

var MovieActions = require('./flux/actions/movie_actions.js').default
var MovieList = require('./movie_list.js')
var MovieSearchBar = require('./movie_search.js')


class MovieApp extends React.Component {

    render () {
        return (
            <ScrollView>
                <MovieSearchBar/>
                <MovieList/>
            </ScrollView>
        )
    }

}

module.exports = MovieApp;
