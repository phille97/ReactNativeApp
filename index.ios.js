var React = require('react-native')
var {AppRegistry} = React

var MovieApp = require('./src/movieapp.js')


class ReactNativeApp extends React.Component {

    render () {
        return (
            <MovieApp/>
        )
    }

}

AppRegistry.registerComponent('ReactNativeApp', () => ReactNativeApp)
