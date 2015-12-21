const MovieActions = require('../flux/actions/movie_actions.js').default

const API_URL = 'http://www.omdbapi.com/'

class OpenMoviesAPI {
    
    static search (query) {
        MovieActions.reset()
        let REQUEST_URL = `${API_URL}?s=${query}&plot=short&r=json`
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                let movies = responseData.Search,
                    parsed = []

                if(typeof movies === 'undefined') return;

                Object.keys(movies).forEach( i => {
                   let movie = movies[i]
                   parsed.push({
                       imdbID: (typeof movie.imdbID == undefined || movie.imdbID == null) ? -1 : movie.imdbID,
                       title: (typeof movie.Title == undefined || movie.Title == null) ? '' : movie.Title,
                       year: (typeof movie.Year == undefined || movie.Year == null) ? '' : movie.Year,
                       posters: {
                           thumbnail: typeof movie.Poster == undefined || movie.Poster == null || movie.Poster == 'N/A' ? '' : movie.Poster
                       }
                   })
               })

               MovieActions.addMany(parsed)
           })
           .catch( err => {
               console.warn(err)
               MovieActions.add({title: 'Failed!', year: 0, posters: {thumbnail: ''}})
           })
    }
}

export default OpenMoviesAPI
