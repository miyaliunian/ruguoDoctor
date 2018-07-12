/**
 * Created by wufei on 2018/7/6.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import Px2dp from '../../../common/px2dp'
import theme from '../../../config/theme'
import PropTypes from 'prop-types'

export default class Cell extends Component {

    static propTypes = {
        callback: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props)
    }

    render() {
        let {data,callback} = this.props
        debugger
        return (
            <TouchableOpacity onPress={callback}>
                <View style={{
                    flex: 1,
                    paddingLeft: Px2dp(34),
                    flexDirection: 'row',
                    height: Px2dp(150),
                    alignItems: 'center',
                    backgroundColor: 'white'
                }}>
                    {
                        data.picUrl != undefined ?
                            <Image style={{width: Px2dp(100), height: Px2dp(100), borderRadius: 8}}
                                   source={{uri: data.picUrl}}/>
                            :

                            <Image style={{width: Px2dp(100), height: Px2dp(100), borderRadius: 8}}
                                   source={{uri: data.picUrl}}/>
                    }

                    <View style={{marginLeft: Px2dp(24)}}>
                        <View style={{flexDirection: 'row', alignItems: "center"}}>
                            <Text style={{fontSize: 16}}>{data.relaPerName}</Text>
                            <Text style={styles.subTxt}>{data.relaPerGenderName}</Text>
                            <Text style={styles.subTxt}>{data.relaPerBirthday}</Text>
                        </View>
                        <Text style={{fontSize: 14}}>服务项目：新生儿发育迟缓</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    subTxt: {
        fontSize: 14,
        marginLeft: Px2dp(24)
    }
});

