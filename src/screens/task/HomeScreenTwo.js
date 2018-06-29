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
import MoreMenu from '../../config/moreMenu'
import LogoTitle from '../../components/LogoTitle'
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderButtons from 'react-navigation-header-buttons'

export default class HomeScreenTwo extends Component {

    static navigationOptions = ({navigation})=>( {
        headerLeft: (
            <HeaderButtons IconComponent={Ionicons} OverflowIcon={<Ionicons name="ios-more" size={23} color="blue" />} iconSize={23} color="blue">
                <HeaderButtons.Item title="add" iconName="ios-arrow-back" onPress={() => navigation.goBack()} />
            </HeaderButtons>
        ),
        //header:(<LogoTitle/>),
        headerRight: (
            <HeaderButtons IconComponent={Ionicons} OverflowIcon={<Ionicons name="ios-more" size={23} color="blue" />} iconSize={23} color="blue">
                <HeaderButtons.Item title="add" iconName="ios-search" onPress={() => console.warn('add')} />>
            </HeaderButtons>
        ),
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>HomeScreen</Text>
                <Button title="Go Back " onPress={() => this.props.navigation.goBack()}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }
});

