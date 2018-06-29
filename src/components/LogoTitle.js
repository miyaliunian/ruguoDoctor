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

import {isIphoneX} from '../config/theme'
import theme from '../config/theme'
import LayoutIphoneX from '../config/layoutIphoneX'
import {observer} from 'mobx-react/native'

@observer
export default class LogoTitle extends Component {

    constructor(props) {
        super(props)
        this.layoutIphoneX = new LayoutIphoneX();
    }

    componentWillMount() {
        this.layoutIphoneX.naviHeight = isIphoneX() ? 88 : 64;
    }

    render() {
        return (
            <Image
                source={require('../icons/common/top.png')}
                style={{ width: theme.screenWidth, height: this.layoutIphoneX.naviHeight }}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

