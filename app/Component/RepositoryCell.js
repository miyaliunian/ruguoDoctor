/**
 * Created by wufei on 2017/11/18.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

export default class RepositoryCell extends Component {
    render() {
        const data = this.props.data;
        return (<TouchableOpacity
                style={styles.container}
                onPress={this.props.onSelect}
            >
                <View style={styles.cell_container}>
                    <Text style={styles.title}>{data.item.full_name}</Text>
                    <Text style={styles.description}>{data.item.description}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text>Author:</Text>
                            {/*<Image*/}
                                {/*style={{width: 22, height: 22}}*/}
                                {/*source={{uri: data.item.owner.avatar_url}}/>*/}
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text>Starts:</Text>
                            <Text>{data.item.stargazers_count}</Text>
                        </View>

                    </View>

                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121'
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: 'white',
        color: '#757575'
    },
    cell_container:{
        backgroundColor:'white',
        padding:10,
        paddingLeft:5,
        paddingRight:5,
        marginVertical:3,
        borderWidth:0.5,
        borderColor:'#dddddd',
        shadowColor:'gray',
        shadowOffset:{width:0.5,height:0.5},
        shadowOpacity:0.4,
        shadowRadius:1,
    }
});