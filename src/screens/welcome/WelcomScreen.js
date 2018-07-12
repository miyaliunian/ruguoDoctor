/**
 * Created by wufei on 2018/7/12.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import DataRepository from '../../common/dataRepository'
import Account from '../../store/common/Account'

export default class WelcomScreen extends Component {

    constructor(props) {
        super(props)
        this.dataRepository = new DataRepository();
    }

    componentDidMount() {
        this.dataRepository.fetchLocalRepository('ACCOUNT')
            .then(result => {
                if (result !== '' && result !== null) {//跳转到首页
                    //1：获取缓存账户信息
                    this.account = Account;
                    this.account.ID = result.account_info.id;
                    this.account.code = result.account_info.code;
                    this.account.mobilePhone = result.account_info.mobilePhone;
                    this.props.navigation.navigate('App')
                } else {//跳转到登录
                    this.props.navigation.navigate('Auth')
                }
            })
            .catch(error => {
            })
            .done()
    }


    render() {
        return (
            <View style={styles.container}>
                <Text>我是欢迎页</Text>
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

