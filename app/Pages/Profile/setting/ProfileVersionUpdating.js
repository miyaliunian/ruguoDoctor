/**
 * Created by wufei on 2017/12/6.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import GlobalStyles from '../../../Common/GlobalStyles'
import ViewUtil from '../../../Common/viewUtil'
import ScreenUtil from '../../../Common/screenUtil'
import Px2dp from '../../../Common/px2dp'
import NavigationBar from '../../../Component/NavigationBar'
export default class ProfileVersionUpdating extends Component {

    // static navigationOptions = ({navigation}) => ({
    //     headerStyle: {backgroundColor: 'rgb(255,255,255)'},
    //     headerTitle: '检查更新',
    //     headerTitleStyle: {alignSelf: 'center', color: 'rgb(51,51,51)'},
    //     headerTintColor: GlobalStyles.headerTintColor,
    //     headerLeft: (ViewUtil.getLeftButton(navigation.state.params.navigatePressLeft)),
    // });

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.navigation.setParams({
            navigatePressLeft: this.navigatePressLeft
        })
    };

    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View style={[GlobalStyles.root_container]}>
                <NavigationBar
                    statusBar={{backgroundColor:'rgb(255,255,255)'}}
                    style={{backgroundColor: 'rgb(255,255,255)'}}
                    leftButton={ViewUtil.getLeftButton(()=>this.navigatePressLeft())}
                    title={'检查更新'}/>
                <View style={{
                    marginBottom: Px2dp.getHeight(56),
                    marginTop: Px2dp.getHeight(36),
                    width: ScreenUtil.screenSize.width,
                    alignItems: 'center'
                }}>
                    <Image
                        resizeMode='center'
                        source={require('../../../Resource/Imags/ic_setting_logo.png')}/>
                </View>
                <View style={styles.cellStyle}>
                    <Text style={{fontSize: 13, color: 'rgb(51,51,51)'}}>当前版本</Text>
                    <Text style={{fontSize: 11, color: 'rgb(153,153,153)'}}>当前版本v0.1.0</Text>
                </View>
                <View style={GlobalStyles.line}/>
                <View style={styles.cellStyle}>
                    <Text style={{fontSize: 13, color: 'rgb(51,51,51)'}}>新版本更新</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity>
                        <Image resizeMode='center' style={{marginRight:Px2dp.getWidth(10)}} source={require('../../../Resource/Imags/ic_setting_btn.png')} />
                        </TouchableOpacity>
                        <Text style={{fontSize: 11, color: 'rgb(153,153,153)'}}>无新版本</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cellStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingLeft: Px2dp.getWidth(30),
        paddingRight:Px2dp.getWidth(40),
        height:Px2dp.getHeight(92),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
});

