/**
 * Created by wufei on 2017/12/22.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import NavigationBar from '../../../Component/NavigationBar'
import ViewUtil from '../../../Common/viewUtil'
import GlobalStyles from '../../../Common/GlobalStyles'
import {MoreMenu} from '../../../Common/MoreMenu'
import Px2dp from '../../../Common/px2dp'

export default class PayResultPage extends Component {

    constructor(props) {
        super(props)
    }

    navigatePressRight() {
        const {state, goBack} = this.props.navigation;
        const params = state.params || {};
        goBack(params.go_back_key);
    }

    onChange(target) {

    }

    render() {
        let {naviBarTitle} = this.props.navigation.state.params;
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar
                    statusBar={GlobalStyles.navigationBarColor_yellow}
                    style={GlobalStyles.navigationBarColor_yellow}
                    leftButton={<View/>}
                    title={naviBarTitle}
                    rightButton={ViewUtil.getRightButton(() => this.navigatePressRight())}
                />
                <View style={styles.container}>
                    <Image source={require('../../../Resource/Imags/icon_pay_result.png')} resizeMode='center'/>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleStyle}>恭喜您，购买成功</Text>
                    </View>
                    <View style={styles.subTitleContainer}>
                        <Text style={styles.subTitle}>请完善健康资料，以便我们更好服务您~</Text>
                    </View>
                    <View style={styles.innerContainer}>
                        <TouchableOpacity onPress={() => this.onChange(target)}>
                            <View style={styles.subRightStyle}>
                                <Text style={styles.innerRightTitle}>查看订单</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Px2dp.getHeight(88),
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    titleContainer: {
        marginTop: Px2dp.getHeight(40)
    },
    titleStyle: {
        fontSize: 17,
        color: 'rgb(51,51,51)'
    },
    subTitleContainer: {
        marginTop: Px2dp.getHeight(40)
    },
    subTitle: {
        fontSize: 13,
        color: 'rgb(153,153,153)'
    },
    innerContainer: {
        marginTop: Px2dp.getHeight(92),
    },
    subLeftStyle: {
        marginRight: Px2dp.getWidth(60),
        width: Px2dp.getWidth(200),
        height: Px2dp.getHeight(52),
        borderColor: 'rgb(139,197,141)',
        borderWidth: 1,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerLeftTitle: {
        fontSize: 15,
        color: 'rgb(129,197,141)'
    },
    subRightStyle: {
        width: Px2dp.getWidth(200),
        height: Px2dp.getHeight(52),
        borderColor: 'rgb(196,196,196)',
        borderWidth: 1,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerRightTitle: {
        fontSize: 15,
        color: 'rgb(153,153,153)'
    },
});

