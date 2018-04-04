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


export default class MemberCell extends Component {

    static propTypes = {
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        callback: PropTypes.func
    };


    constructor(props) {
        super(props)
    }


    renderKeyword() {
        let itemArr = [];
        let keywords = this.props.keyword;
        if (keywords != '') {
            for (let i = 0; i < keywords.length; i++) {
                let key = keywords[i];
                itemArr.push(<Text style={styles.keyWord}
                                   key={i}>#{key.statusName}#
                             </Text>
                            )
            }
        }
        return itemArr
    }

    render() {
        let {image, name, relationship, gender, age, callback} = this.props;
        return (
            <TouchableOpacity onPress={callback}>
                <View style={styles.cellContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={styles.imageStyle} source={{uri: image}}/>
                        <View style={{marginLeft: Px2dp.getWidth(30)}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.titleStyle}>{name}</Text>
                                <Text style={styles.relationshipStyle}>({relationship})</Text>
                            </View>
                            <View style={styles.subtitleContainer}>
                                <Text style={styles.subtitleLeftsubtitlel}>{gender}</Text>
                                <Text style={styles.subtitleLeftsubtitler}>{age}</Text>
                            </View>
                            <View style={styles.keyWordContainer}>
                                {this.renderKeyword()}
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
    relationshipStyle: {
        fontSize: 11,
        color: 'rgb(196,196,196)',
        marginLeft: Px2dp.getWidth(5),
    },
    subtitleContainer: {
        flexDirection: 'row',
        alignItems:'center'
    },
    subtitleLeftsubtitlel: {
        fontSize: 11,
        color: 'rgb(196,196,196)',
        marginRight: Px2dp.getWidth(20)
    },
    subtitleLeftsubtitler: {
        fontSize: 11,
        color: 'rgb(196,196,196)',
    },
    keyWordContainer: {
        flexDirection: 'row'
    },
    keyWord: {
        fontSize: 10,
        marginTop: Px2dp.getHeight(20),
        marginRight: Px2dp.getWidth(15),
        color: 'rgb(255,208,96)'
    }
});

