/**
 * Created by wufei on 2017/12/23.
 */
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import HomeMenuItem from './HomeMenuItem'
import Px2dp from '../../Common/px2dp'
export default class HomeMenuView extends PureComponent {

    constructor(props) {
        super(props)
    }

    onMenuSelected(target){
        alert(target)
    }

    render() {
        let {menuInfos} = this.props;

        let menuItems = menuInfos.map(
            (info, i) => (
                <HomeMenuItem
                    key={i}
                    title={info.title}
                    icon={info.icon}
                    onPress={()=>this.onMenuSelected(i)
                    } />
            )
        );

        return (
            <View style={styles.container}>
                    {menuItems}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingLeft:Px2dp.getWidth(68),
        paddingBottom:Px2dp.getHeight(24),
        flexDirection: 'row',
    },
});

