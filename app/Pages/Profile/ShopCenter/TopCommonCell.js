/**
 * Created by wufei on 2017/12/8.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Px2dp from '../../../Common/px2dp'
import ScreenUtil from '../../../Common/screenUtil'

export default class TopCommonCell extends Component {

    static propTypes = {
        leftIcon: PropTypes.number.isRequired,
        rightTitle :PropTypes.string.isRequired,
        rightIcon :PropTypes.number.isRequired,
        callback:PropTypes.func
    };

    constructor(props) {
        super(props)
    }

    render() {
        let {leftIcon,rightTitle,rightIcon,callback}=this.props;
        return (
        <TouchableOpacity onPress={callback}>
            <View style={styles.CommonCellStyle}>
                <Image source={leftIcon} resizeMode={'center'}/>
                <View style={{flexDirection:'row', alignItems: 'center'}}>
                <Text style={{fontSize:12,color:'rgb(196,196,196)'}}>{rightTitle}</Text>
                <Image style={{marginLeft:Px2dp.getWidth(10)}} source={rightIcon} resizeMode={'center'}/>
                </View>
            </View>
        </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    CommonCellStyle: {
        width:ScreenUtil.screenSize.width,
        height:Px2dp.getHeight(60),
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight:Px2dp.getWidth(25),
        paddingLeft:Px2dp.getWidth(25),
        backgroundColor:'white'
    }
});

