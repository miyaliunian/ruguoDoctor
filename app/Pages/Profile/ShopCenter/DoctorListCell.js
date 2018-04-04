/**
 * Created by wufei on 2017/12/30.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types'
import Px2dp from '../../../Common/px2dp'
import GlobalStyles from '../../../Common/GlobalStyles'

export default class DoctorListCell extends Component {

    static propTypes = {
        itemData : PropTypes.object.isRequired,
    };


    constructor(props) {
        super(props)
        this.itemData = this.props.itemData.item;
    }


    render() {
        return (
            <TouchableOpacity>
                <View style={GlobalStyles.root_container}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={styles.imageStyle} source={{uri: this.itemData.doctorIcon}}/>
                        <View style={{marginLeft: Px2dp.getWidth(20)}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',
                                alignItems:'flex-end',
                                marginTop:Px2dp.getHeight(10)}}>
                                <Text style={styles.titleStyle}>{this.itemData.doctorName}</Text>
                                <Text style={{marginLeft:10,borderWidth:Px2dp.getWidth(2),borderRadius:Px2dp.getWidth(10),borderColor:'#ffd060',color:'#ffd060',paddingLeft:10,paddingRight:10}}>已服务{this.itemData.serviceTimes}次</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'flex-start',
                                alignItems:'flex-end',
                                marginTop:Px2dp.getHeight(10)}}>
                                <Text style={styles.nameStyle}>{this.itemData.workplaceName}</Text><Text  style={{marginLeft:Px2dp.getWidth(10),marginRight:Px2dp.getWidth(10)}}>|</Text><Text style={styles.nameStyle}>{this.itemData.positonTitlesName}</Text>
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

