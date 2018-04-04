/**
 * Created by wufei on 2017/11/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Platform
} from 'react-native';
import ActionSheet from 'react-native-actionsheet'
import {NavigationActions} from 'react-navigation'
import SubmitBtn from '../../../Component/SubmitBtn'
import DataRepository from '../../../Expand/Dao/DataRepository'
import GlobalStyles from '../../../Common/GlobalStyles'
import ViewUtil from '../../../Common/viewUtil'
import NavigationBar from '../../../Component/NavigationBar'
import {MoreMenu} from '../../../Common/MoreMenu'


// ActionSheet常量定义
const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 2;
const options = ['是', '否'];
const title = '确定退出登录?';



export default class ProfileSetting extends Component {

    constructor(props) {
        super(props)
        this.dataRepository = new DataRepository();
    }

    componentDidMount() {

    };

    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };

    onClick(target) {
        let {navigate} = this.props.navigation;
        navigate(target)
    }

    getItem(target, text) {
        return (
            ViewUtil.getSettingItem(() => this.onClick(target), null, text, null)
        )
    }

    showActionSheet() {
        this.ActionSheet.show()
    }

    handlePress(i) {
        if (i == 0) {
            let resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                     NavigationActions.navigate({routeName: 'login'})
                ]
            });


            //退出登录清除本地缓存用户信息
            this.dataRepository.removeLocalRepository('accountCode')
                .then(result => {
                    if (result) {
                        setTimeout(() => {
                            this.props.navigation.dispatch(resetAction)
                        }, 100)
                    }
                })
                .catch(error => {
                })
                .done()


        }
    }

    render() {
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar
                               statusBar={{backgroundColor:'rgb(255,255,255)'}}
                               style={{backgroundColor: 'rgb(255,255,255)'}}
                               leftButton={ViewUtil.getLeftButton(()=>this.navigatePressLeft())}
                               title={'设置'}/>
                <ScrollView>
                    <View style={GlobalStyles.line_space_13}/>
                    {this.getItem(MoreMenu.Profile.Setting.menu_account, '账号管理')}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MoreMenu.Profile.Setting.menu_upgrade, '检查更新')}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MoreMenu.Profile.Setting.menu_feedback, '意见反馈')}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MoreMenu.Profile.Setting.cache, '清理缓存')}
                    <View style={GlobalStyles.line_space_13}/>
                    {this.getItem(MoreMenu.Profile.Setting.aboutRG, '关于洳果')}
                    <View style={GlobalStyles.line_space_30}/>
                    <SubmitBtn onSubmit={() => this.showActionSheet()} styles={{backgroundColor: 'rgb(247,133,133)'}}
                               titleStyle={{color: 'rgb(255,255,255)'}} txtTitle='退出登录'/>
                </ScrollView>
                <ActionSheet
                    ref={actionSheet => this.ActionSheet = actionSheet}
                    title={title}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={(i) => this.handlePress(i)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({});

