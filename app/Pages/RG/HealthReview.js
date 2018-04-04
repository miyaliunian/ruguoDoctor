/**
 * Created by wufei on 2017/12/23.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import Px2dp from '../../Common/px2dp'
import GlobalStyles from '../../Common/GlobalStyles'
import Titlear from './Titlear'
export default class HealthReview extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Titlear txtTitle={'健康Tips'} rightIcon={false}/>
                <View style={GlobalStyles.line}/>
                <View style={{height:Px2dp.getHeight(220)}}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height:Px2dp.getHeight(280),
        justifyContent:'center',
        backgroundColor:'white',
    }
});

