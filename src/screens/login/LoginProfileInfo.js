/**
 * Created by wufei on 2018/6/27.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button
} from 'react-native';



import Icon from 'react-native-vector-icons/Ionicons'

export default class LoginProfileInfo extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: '首页',

    });

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>完善资料</Text>
                <Button title="Go To HomeScreen" onPress= {()=>this.props.navigation.navigate('App')}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C6E2FF',
    }
});

