import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import ScreenUtil  from '../../Common/screenUtil'
import Px2dp  from '../../Common/px2dp'
import {Heading1, Heading2} from '../../Common/Text'

// create a component
class HomeGridItem extends PureComponent {
    render() {
        let info = this.props.info;
        let title = info.title;
        let icon = info.icon;
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <View>
                    <Heading1>{title}</Heading1>
                </View>
                <Image style={styles.iconStyle}
                       source={icon ? require('../../Resource/Imags/icon_home_wdys.png') : require('../../Resource/Imags/icon_home_zbpc.png')}/>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: ScreenUtil.screenSize.width / 2 - ScreenUtil.onePixel,
        height: Px2dp.getHeight(140),
        backgroundColor: 'white',
        borderRightWidth: ScreenUtil.onePixel,
        borderColor: '#e0e0e0',
    },
    iconStyle: {
        marginLeft: Px2dp.getWidth(30),
        width: ScreenUtil.screenSize.width / 7,
        height: ScreenUtil.screenSize.width / 7,
    }
});
export default HomeGridItem;
