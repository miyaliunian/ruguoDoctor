/**
 * Created by wufei on 2017/11/26.
 * 加载
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
    View,
    Modal,
    Text,
    ActivityIndicator
} from 'react-native';

export default class LoadingModal extends Component {

    static propTypes = {
        txtTitle: PropTypes.string.isRequired,
        visible :PropTypes.bool,
        onRequestClose :PropTypes.func
    };

    closeModel(){

    }

    render() {
        const {txtTitle,visible} = this.props;
        return (
            <View>
                <Modal
                    visible={visible}
                    transparent={true}
                    animationType='fade'
                    onRequestClose={()=>this.closeModel()}
                >
                    <View
                        style={{
                            flex:1,
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:'rgba(0, 0, 0, 0.7)'}}>

                        <View style={{height:Px2dp.getHeight(250),width:Px2dp.getWidth(350),backgroundColor:'rgba(0,0,0,0.8)',alignItems:'center',justifyContent:'center',borderRadius:Px2dp.getHeight(20)}}>
                            <ActivityIndicator animating={true} color='white' size='large'/>
                            <Text style={{fontSize:15,fontWeight:'bold',fontFamily: 'Cochin',color:'white',marginTop:Px2dp.getHeight(20)}}>{txtTitle}</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

