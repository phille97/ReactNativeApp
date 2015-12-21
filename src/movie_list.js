var React = require('react-native');
var {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
} = React;

var {MovieStore} = require('./flux/stores/movie_store.js')


class MovieList extends React.Component {

    constructor (props) {
        super(props)
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        this.state = this.storeState()
        this._onChange = this._onChange.bind(this);
    }

    storeState () {
        this.ds = this.ds.cloneWithRows(MovieStore.getAll())
        return {
            dataSource: this.ds
        }
    }

    _onChange () {
        this.setState(this.storeState());
    }

    componentDidMount () {
        MovieStore.addChangeListener(this._onChange);
    }

    componentWillUnmount () {
        MovieStore.removeChangeListener(this._onChange);
    }

    render () {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderMovie}
                style={styles.listView}
            />
        )
    }

    renderMovie (movie) {
        return (
            <View style={styles.container}>
                <Image
                    source={{uri: movie.posters.thumbnail  }}
                    style={styles.thumbnail}/>
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.year}>{movie.year}</Text>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    year: {
        textAlign: 'center',
    },
    thumbnail: {
        width: 53,
        height: 81,
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#FFF',
    },
});

module.exports = MovieList;
