import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
    View,
    Modal,
    Text,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Px2dp from '../Common/px2dp'
// 获取屏幕尺寸
const {width, height} = Dimensions.get('window');
export default class ConfirmModal extends Component {
    static propTypes = {
        confirmTitle: PropTypes.string.isRequired,
        visible :PropTypes.bool.isRequired,
        onRequestClose :PropTypes.func,
        transparent:PropTypes.bool.isRequired,
        onRequestConfirm :PropTypes.func,
        onRequestCancle :PropTypes.func,
        confirmBtnTitle: PropTypes.string.isRequired,
        cancleBtnTitle: PropTypes.string.isRequired,
    };

    render() {
        let {confirmTitle,visible,onRequestClose,transparent,onRequestConfirm,onRequestCancle,confirmBtnTitle,cancleBtnTitle} = this.props;
        let maodalHeight=height/4;
        let titleHeigh=height/6;
        let btnHeight=maodalHeight-titleHeigh;
        let viewWidth=width*4/5;
        return(
            <Modal
            animationType={"slide"}
            transparent={transparent}
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <View style={{width:width,
                height:height,
                backgroundColor:'rgba(51,51,51,0.3)',
                alignItems:'center',
            }}>
                <View style={{alignItems:'center',
                    backgroundColor:'#fff',
                    marginTop:height/3,
                    width:viewWidth,
                    height:maodalHeight,
                    borderRadius:10
                }}>
                    <View style={{paddingTop:Px2dp.getWidth(80),
                        width:viewWidth,
                        alignItems:'center',
                        height:titleHeigh,
                        borderBottomWidth:0.5,
                        borderBottomColor:'#f4f4f4'}}>
                        <Text style={{fontSize:18,fontWeight:'bold'}}>{confirmTitle}</Text>
                    </View>
                    <View style={{flexDirection:'row', height:btnHeight,justifyContent:'space-between'}}>
                        <TouchableOpacity onPress={onRequestConfirm}>
                            <View style={{backgroundColor:'#ffd060',alignItems:'center',
                                height:btnHeight,
                                width:viewWidth/2,
                                borderBottomLeftRadius:10,
                                justifyContent:'center'
                            }}>
                                <Text style={{fontSize:18}}>{confirmBtnTitle}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onRequestCancle}>
                            <View style={{alignItems:'center',
                                height:btnHeight,
                                width:viewWidth/2,
                                borderBottomRightRadius:10,
                                justifyContent:'center'
                            }}>
                                <Text style={{fontSize:18}}>{cancleBtnTitle}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </Modal>
        );
    }
}