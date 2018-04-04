/**
 * Created by wufei on 2017/11/20.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Image
} from 'react-native';
import Px2dp from '../../Common/px2dp'
export default class ProfileCollect extends Component {

    static propTypes = {
        visible: PropTypes.bool,
        callback:PropTypes.func
    };

    render() {
        return (
            <View><Text>WE</Text></View>
        );
    }
}


