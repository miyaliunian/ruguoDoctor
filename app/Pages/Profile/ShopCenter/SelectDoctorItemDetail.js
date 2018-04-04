/**
 * Created by wufei on 2017/12/9.
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
import { observer } from 'mobx-react/native';
import { action, observe } from 'mobx';
@observer
export default class SelectDoctorItemDetail extends Component {

    static propTypes = {
        itemData : PropTypes.object.isRequired,
        data : PropTypes.object.isRequired,
    };


    constructor(props) {
        super(props)
        this.itemData = this.props.itemData;
    }

    @action
    selectPress = () => {
        this.itemData.isSelect = !this.itemData.isSelect;
       this.props.data.unSelectedAll(this.itemData);
    };
    render() {
        return (
            <TouchableOpacity onPress={this.selectPress}>
                <View style={styles.cellContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={styles.imageStyle} source={{uri: this.itemData.iconUrl}}/>
                        <View style={{marginLeft: Px2dp.getWidth(20)}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',
                                alignItems:'flex-end',
                                marginTop:Px2dp.getHeight(10)}}>
                                    <Text style={styles.titleStyle}>{this.itemData.doctorName}</Text>
                                    <Text style={{marginLeft:10,borderWidth:Px2dp.getWidth(2),borderRadius:Px2dp.getWidth(10),borderColor:'#ffd060',color:'#ffd060',paddingLeft:10,paddingRight:10}}>已服务{this.itemData.serviceTimes}次</Text>
                                       <Image source={this.itemData.isSelect==true ?
                                require('../../../Resource/Imags/ic_group_selected.png')
                                : require('../../../Resource/Imags/ic_group_unselect.png')}/>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'flex-start',
                                alignItems:'flex-end',
                                marginTop:Px2dp.getHeight(10)}}>
                                <Text style={styles.nameStyle}>{this.itemData.workplaceName}</Text><Text  style={{marginLeft:Px2dp.getWidth(10),marginRight:Px2dp.getWidth(10)}}>|</Text><Text style={styles.nameStyle}>{this.itemData.positionalTitlesName}</Text>
                            </View>

                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-end'}}>
                                <Text style={{ width:Px2dp.getWidth(500),}}>
                                    {this.itemData.introduction}
                                </Text>
                            </View>

                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    cellContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: Px2dp.getWidth(30),
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    imageStyle: {
        width: Px2dp.getWidth(150),
        height: Px2dp.getHeight(150),
        borderRadius:Px2dp.getHeight(150)
    },
    titleStyle: {
        fontWeight:'bold'
    },
    nameStyle: {
        // width: Px2dp.getWidth(380)- (13+42+5+45+11+18+10),
        color: 'rgb(196,196,196)'
    },
    jobLevelStyle: {
        marginLeft:10,
        fontSize: 10,
        // width: Px2dp.getWidth(380)- (13+42+5+45+11+18+10),
        color: 'rgb(196,196,196)'
    },
    priceStyle: {
        fontSize: 17,
        color: 'rgb(239,94,82)'
    },
    priceStyle1: {
        fontSize: 10,
        color: 'rgb(239,94,82)',
    }

});

