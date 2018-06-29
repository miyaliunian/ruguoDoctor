/**
 * Created by wufei on 2018/6/27.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import theme from '../../config/theme'
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderButtons from 'react-navigation-header-buttons'

export default class ServiceScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: '服务对象',
        headerRight: (
            <HeaderButtons IconComponent={Ionicons} OverflowIcon={<Ionicons name="ios-more" size={23} color= "#cccccc" />} iconSize={23} color={theme.navItemColor}>
                <HeaderButtons.Item title="add" iconName="ios-menu" onPress={() => console.warn('add')} />
            </HeaderButtons>
        ),

    });

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>服务对象</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.lightBlack,
    }
});

