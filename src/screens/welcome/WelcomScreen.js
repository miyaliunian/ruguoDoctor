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
                    this.account.memberCode = result.memberCode;
                    this.account.picUrl = result.picUrl;
                    this.account.relaId = result.id;
                    this.account.relaPerName = result.relaPerName;
                    this.account.relaPerGenderName = result.relaPerGenderName;
                    this.account.relaPerGenderCode = result.relaPerGenderCode;
                    this.account.relaTypeName = result.relaTypeName;
                    this.account.relaTypeCode = result.relaTypeCode;
                    this.account.relaPerBirthday = result.relaPerBirthday;
                    this.account.relaPerMobilePhone = result.relaPerMobilePhone;
                    this.account.isBuyService = result.isBuyService;
                    this.account.relaPerCertificateType = result.relaPerCertificateType;
                    this.account.relaPerCertificateName = result.relaPerCertificateName;
                    this.account.relaPerCertificateNo = result.relaPerCertificateNo;
                } else {跳转到登录
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

