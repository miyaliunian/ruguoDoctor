/**
 * Created by wufei on 2017/11/26.
 */

// 提交按钮公共类
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ViewPropTypes
} from 'react-native';
import { observer } from 'mobx-react/native';
import Px2dp from '../Common/px2dp'
export default class SubmitBtn extends Component {

    static propTypes = {
        txtTitle: PropTypes.string.isRequired,
        styles: ViewPropTypes.style,
        titleStyle:Text.propTypes.style,
        onSubmit: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props)
    }

    render() {
        const {styles,txtTitle, onSubmit,titleStyle} = this.props;
        return (
            <TouchableOpacity onPress={onSubmit}>
                <View style={[{
                    height: Px2dp.getHeight(100),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 6,
                    marginLeft:Px2dp.getWidth(25),
                    marginRight:Px2dp.getWidth(25)
                },styles]}>
                    <Text style={[{fontSize: 16},titleStyle]}>{txtTitle}</Text>
                </View>
            </TouchableOpacity>
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

