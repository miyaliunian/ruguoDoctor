/**
 * Created by wufei on 2017/11/18.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter,
    AsyncStorage
} from 'react-native';
import {NavigationActions} from 'react-navigation'
import Account from './store/common/Account'
import DataRepository from './Expand/Dao/DataRepository'
import {Toast} from 'teaset';


export default class WelcomePage extends Component {


    constructor(props) {
        super(props)
        this.dataRepository = new DataRepository();
    }

    componentDidMount() {
        //Toast
        this.subscription = DeviceEventEmitter.addListener('mainToastInfo', (info, type) => {
            if (type === 'success') {
                Toast.success(info, 1500, 'center');
                return
            }
            if (type === 'fail') {
                Toast.fail(info, 1500, 'center');
                return
            }
            if (type === 'smile') {
                Toast.smile(info, 1500, 'center');
                return
            }
            if (type === 'sad') {
                Toast.sad(info, 1500, 'center');
                return
            }
            if (type === 'stop') {
                Toast.stop(info, 1500, 'center');

            }

        })
        //取出本地缓存登录信息
        this.fetchACCOUNTLocalRepository();

        //取出 accountCode
        // let resetAction;
        // this.dataRepository.fetchLocalRepository('accountCode')
        //     .then(result => {
        //         if (result !== '' && result !== null) {
        //             this.account = Account;
        //             this.account.code = result.slice();
        //             resetAction = NavigationActions.reset({ //跳转到主页
        //                 index: 0,
        //                 actions: [
        //                     NavigationActions.navigate({routeName: 'login'})
        //                 ]
        //             });
        //             this.props.navigation.dispatch(resetAction)
        //         } else {
        //
        //             resetAction = NavigationActions.reset({  //跳转到登录页
        //                 index: 0,
        //                 actions: [
        //                     NavigationActions.navigate({routeName: 'main'})
        //                 ]
        //             });
        //             this.props.navigation.dispatch(resetAction)
        //         }
        //     })
        //     .catch(error => {
        //     })
        //     .done()

        // this.timer = setTimeout(() => {
        //     this.props.navigation.dispatch(resetAction)
        // }, 1000)

    }
//获取账户本地缓存数据
    fetchACCOUNTLocalRepository(){
        this.dataRepository.fetchLocalRepository('ACCOUNT')
            .then(result => {
                if (result !== '' && result !== null) {
                    //1：获取缓存账户信息
                    this.account = Account;
                    this.account.id = result.id;
                    this.account.code = result.code;
                    this.account.mobilePhone = result.mobilePhone;
                    this.account.wchatOpenId = result.wchatOpenId;

                    let resetAction;
                    //跳转到主页
                    resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({routeName: 'main'})
                        ]
                    });
                    this.props.navigation.dispatch(resetAction)

                }else{
                    this.props.navigation.navigate('login')
                }
            })
            .catch(error => {
            })
            .done()
    }
    componentWillUnmount() {
        // this.timer && clearTimeout(this.timer);
        this.subscription.remove();
    }

    render() {
        return (

            <View style={styles.container}>
                <Text>我是欢迎页:3S之后我会跳转</Text>
                <View style={{borderWidth: 1, borderColor: 'black', borderStyle: 'dashed'}}>
                    <Text>虚线框</Text>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C6E2FF',
    }
});

