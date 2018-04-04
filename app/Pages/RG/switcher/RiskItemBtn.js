import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    PixelRatio,
    TouchableOpacity
} from 'react-native';
import Px2dp  from '../../../Common/px2dp'
import {observer} from 'mobx-react/native';
@observer
export default class RiskItemBtn extends Component {

    render(){
        let { title, isSelect, callback} = this.props;
        return (
            <TouchableOpacity onPress={callback}>
                <View style={isSelect==true?styles.selected:styles.unselected}>
                    <Text style={{
                        fontSize:16,
                    }}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    selected: {
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgb(255,208,96)',
        width:Px2dp.getWidth(200),
        height:Px2dp.getHeight(60),
        borderRadius:Px2dp.getHeight(15),
        marginLeft:Px2dp.getWidth(40)
    },
    unselected: {
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1/PixelRatio.get(),
        borderColor:'rgb(153,153,153)',
        width:Px2dp.getWidth(200),
        height:Px2dp.getHeight(60),
        borderRadius:Px2dp.getHeight(15),
        marginLeft:Px2dp.getWidth(40)
    }
});