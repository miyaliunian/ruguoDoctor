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

export default class HomeScreen extends Component {

    static navigationOptions = ({navigation})=>( {
        headerTitle:'待办任务',
        headerRight: (
            <HeaderButtons IconComponent={Ionicons} OverflowIcon={<Ionicons name="ios-more" size={23} color= "#cccccc" />} iconSize={23} color={theme.navItemColor}>
                <HeaderButtons.Item title="add" iconName="ios-search" onPress={() => console.warn('add')} />
            </HeaderButtons>
        ),
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={theme.root_container}>


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

