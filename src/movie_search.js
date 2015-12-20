var React = require('react-native');
var {
    Text,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    View
} = React;

var MovieActions = require('./flux/actions/movie_actions.js').default


class MovieSearch extends React.Component {

    constructor (props) {
        super(props)
    }

    _onTextChange (text) {
        if(text.length >= 3) {
            this.doSearch(text)
        }
    }

    doSearch(text) {
        // TODO Move this to a separate class
        MovieActions.reset()
        let API_URL = 'http://www.omdbapi.com/?'
        let REQUEST_URL = `${API_URL}s=${text}&plot=short&r=json`
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                MovieActions.addMany(
                    Array.prototype.push.call(responseData.Search).map( movie => {
                        return {title: movie.Title, year: movie.Year, posters: {thumbnail: movie.Poster}}
                    })
                )
            })
    }

    render () {
        return (
            <View style={styles.container}>
                {this.renderInputField()}
                {/*this.renderButton()*/}
            </View>
        )
    }

    renderInputField () {
        return (
            <TextInput
                placeholder="Search..."
                style={styles.inputField}
                onChangeText={(text) => this._onTextChange(text)}
            />
        )
    }
    
    /*
    renderButton () {
        return (
            <TouchableHighlight
                style={styles.searchButton}
                onPress={this._onPressButton}>

                <Text>Search</Text>
            </TouchableHighlight>
        )
    }
    */
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    inputField: {
        flex: 0.8,
        borderColor: 'gray',
        borderWidth: 1
    },
    searchButton: {
        flex: 0.2
    }
});

module.exports = MovieSearch;
