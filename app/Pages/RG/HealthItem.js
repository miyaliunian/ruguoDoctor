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
import Px2dp from '../../Common/px2dp'
import ScreenUtil from '../../Common/screenUtil'
export default class HealthItem extends Component {

    static propTypes = {
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content:PropTypes.string.isRequired,
        callback: PropTypes.func
    };


    constructor(props) {
        super(props)
    }

    render() {
        let {image, title, content, keyword1,keyword2,keyword3,callback} = this.props;
        return (
            <TouchableOpacity onPress={callback}>
                <View style={styles.cellContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={styles.imageStyle} source={{uri: image}}/>
                        <View style={{marginLeft: Px2dp.getWidth(30)}}>
                            <Text style={styles.titleStyle}>{title}</Text>
                            <Text style={styles.subtitleStyle} numberOfLines={4}>{content}</Text>
                            <View style={styles.keyWordContainer}>
                                <Text style={styles.keyWord}>{keyword1}</Text>
                                <Text style={styles.keyWord}>{keyword2}</Text>
                                <Text style={styles.keyWord}>{keyword3}</Text>
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
        width: Px2dp.getWidth(140),
        height: Px2dp.getHeight(140),
    },
    titleStyle: {
        fontSize: 13,
        color: 'rgb(51,51,51)',
        marginBottom: Px2dp.getHeight(20)
    },
    subtitleStyle: {
        width:Px2dp.getWidth(500),
        color: 'rgb(153,153,153)'
    },
    keyWordContainer:{
      flexDirection:'row',
    },
    keyWord: {
        fontSize: 10,
        marginTop:Px2dp.getHeight(20),
        marginRight:Px2dp.getWidth(15),
        color: 'rgb(239,94,82)'
    }
});

