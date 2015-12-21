var React = require('react-native');
var {
    Text,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    View
} = React;


class MovieSearch extends React.Component {

    constructor (props) {
        super(props)
        this.listeners = new Map()
    }

    addListener(label, callback) {
        this.listeners.has(label) || this.listeners.set(label, []);
        this.listeners.get(label).push(callback);
    }

    removeListener(label, callback) {
        let listeners = this.listeners.get(label),
            index;

        if (listeners && listeners.length) {
            index = listeners.reduce((i, listener, index) => {
                return ((typeof listener == 'function' || false) && listener === callback) ?
                    i = index :
                    i;
            }, -1);

            if (index > -1) {
                listeners.splice(index, 1);
                this.listeners.set(label, listeners);
                return true;
            }
        }
        return false;
    }

    emit(label, ...args) {
        let listeners = this.listeners.get(label);

        if (listeners && listeners.length) {
            listeners.forEach((listener) => {
                listener(...args); 
            });
            return true;
        }
        return false;
    }

    _onTextChange (text) {
        this.doSearch(text) 
    }

    doSearch(text) {
        this.emit('search', text)
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
