const {_Dispatcher} = require('../dispatchers/dispatcher.js')
const {EventEmitter} = require('events')
const MovieConstants = require('../constants/movie_constants.js').default


const CHANGE_EVENT = 'change'

var _movies = []


function add (movie) {
    _movies.push(movie)
}

function addMany(movies){
    movies.forEach( (movie) => {
        add(movie)
    })
}

function reset() {
    _movies = []
}

export let MovieStore = Object.assign({}, EventEmitter.prototype, {

    get (id) {
        return _movies[id]
    },

    getAll () {
        return _movies
    },

    emitChange () {
        this.emit(CHANGE_EVENT)
    },

    addChangeListener (callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener (callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }
})

_Dispatcher.register( action => {

    switch (action.actionType) {

        case MovieConstants.MOVIE_ADD:
            add(action.movie)
            MovieStore.emitChange()
            break

        case MovieConstants.MOVIE_ADDMANY:
            addMany(action.movies)
            MovieStore.emitChange()
            break

        case MovieConstants.MOVIE_RESET:
            reset()
            MovieStore.emitChange()
            break

        default:

    }
})
