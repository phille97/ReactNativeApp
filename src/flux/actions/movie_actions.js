const {_Dispatcher} = require('../dispatchers/dispatcher.js')
const MovieConstants = require('../constants/movie_constants.js').default

export default {

    add (movie) {
        _Dispatcher.dispatch({
            actionType: MovieConstants.MOVIE_ADD,
            movie: movie
        })
    },

    addMany (movies) {
        _Dispatcher.dispatch({
            actionType: MovieConstants.MOVIE_ADDMANY,
            movies: movies
        })
    },

    reset () {
        _Dispatcher.dispatch({
            actionType: MovieConstants.MOVIE_RESET
        })
    }

}
