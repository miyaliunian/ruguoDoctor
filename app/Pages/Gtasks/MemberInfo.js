/**
 * Created by hl on 2018/2/1.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Keyboard,
    Image,
    ScrollView,
    DeviceEventEmitter
} from 'react-native';
import GlobalStyles from '../../Common/GlobalStyles';
import Px2dp from '../../Common/px2dp';
import ViewUtil from '../../Common/viewUtil';
import Picker from 'react-native-picker';
import DataRepository from '../../Expand/Dao/DataRepository'
import LoadingModal from '../../Component/LoadingModal'
import {MoreMenu} from '../../Common/MoreMenu';
import NavigationBar from '../../Component/NavigationBar'
import {Config} from '../../Expand/Dao/Config'
// import CodeListDataSet from '../../../Expand/Dao/CodeListDataSet'
export default class MemberInfo extends Component {

    constructor(props) {
        super(props);
        this.genderMap = new Map([
            ['1', '男'],
            ['2', '女'],
        ]);
        this.relaTypeMap = new Map([
            ['0', '本人或户主'],
            ['1', '配偶'],
            ['2', '子'],
            ['3', '女'],
            ['4', '孙子、孙女或外孙子、外孙女'],
            ['5', '父母'],
            ['6', '祖父母或外祖父母'],
            ['7', '兄、弟、姐、妹'],
            ['8', '其他'],
            ['9', '儿媳'],
            ['10', '女婿'],
        ]);
        this.dataRepository = new DataRepository();
        this.state = {
            showModal: false,
            showModalTitle: '正在加载',
            isModifyMobilePhone: true,

            name: null,
            genderName: null,
            genderCode: null,
            relaTypeName: null,
            relaTypeCode: null,
            relaPerBirthday: null,
            relaPerCertificateNo: null,
            relaPerMobilePhone: null,
            picUrl: null,

        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            navigatePressLeft: this.navigatePressLeft,
            // navigatePressRight: this.navigatePressRight,
        });
        this.senderCode = this.props.navigation.state.params.senderCode;
        this.senderName = this.props.navigation.state.params.senderName;
        this.memberCode = this.props.navigation.state.params.memberCode;
        this.loadData();
    }

    //初始化数据
    loadData() {
        if (this.senderCode) {
            this.fechPersonInfo();
        }
    }

    //设置个人信息状态
    setPersonInfoState(personInfo) {
        this.setState({
            // id: personInfo.id,
            name: personInfo.relaPerName,
            genderCode: personInfo.relaPerGenderCode,
            genderName: this.genderMap.get(personInfo.relaPerGenderCode),
            relaTypeCode: personInfo.relaTypeCode,
            relaTypeName: this.relaTypeMap.get(personInfo.relaTypeCode),
            relaPerBirthday: personInfo.relaPerBirthday,
            // relaPerCertificateNo: this.setCertificateNo(personInfo.relaPerCertificateNo),
            relaPerCertificateNo: personInfo.relaPerCertificateNo,
            relaPerMobilePhone: personInfo.relaPerMobilePhone,
            isModifyMobilePhone: personInfo.relaTypeCode === '0' ? false : true,
            picUrl: personInfo.picUrl
        });
    }

    //转换身份证号，星号显示
    setCertificateNo = (certificateNo) => {
        return (certificateNo != null) ? (certificateNo).replace(/^(.{3})(?:\d+)(.{4})$/, "$1***********$2") : '';
    };

    //服务端获取个人信息
    fechPersonInfo() {
        this.setState({
            showModal: true
        });

        let url = Config.BASE_URL + Config.API_MEMBER_GET;
        let params = {id: this.senderCode};
        this.dataRepository.postJsonRepository(url, params)
            .then((response) => {
                this.setState({
                    showModal: false
                });
                if (response.status === 'success') {
                    this.setPersonInfoState(response.data);
                } else {
                    DeviceEventEmitter.emit('toastInfo', response.msg, 'fail');
                }
            })
            .catch(error => {
                this.setState({
                    showModal: false
                });
                DeviceEventEmitter.emit('toastInfo', error.status, 'fail');
            })
            .done();
    }

    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };

    render() {

        return (
            <View style={styles.container}>
                <NavigationBar
                    statusBar={GlobalStyles.navigationBarColor_yellow}
                    style={GlobalStyles.navigationBarColor_yellow}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    title={this.senderName + '-档案'}/>

                <ScrollView style={{flex: 1}}>
                    <View style={styles.row}>
                        <View style={styles.rowLabel}>
                            <Text style={styles.fontLabel}>头像</Text>
                        </View>
                        <View style={styles.rowContent}>
                            {this.state.picUrl ?
                                <Image source={{uri: this.state.picUrl}}
                                       style={styles.AvatarStyle} resizeMode={'stretch'}/>
                                :
                                <Image source={require('../../Resource/Imags/res_photo_man.png')}
                                       style={styles.AvatarStyle} resizeMode={'stretch'}/>
                            }
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.rowLabel}>
                            <Text style={styles.fontLabel}>姓名</Text>
                        </View>
                        <View style={styles.rowContent}>
                            <Text style={styles.TextInputStyle}>{this.state.name}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.rowLabel}>
                            <Text style={styles.fontLabel}>性别</Text>
                        </View>
                        <View style={styles.rowContent}>
                            <Text style={styles.TextInputStyle}>{this.state.genderName}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.rowLabel}>
                            <Text style={styles.fontLabel}>关系</Text>
                        </View>
                        <View style={styles.rowContent}>
                            <Text style={styles.TextInputStyle}>{this.state.relaTypeName}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.rowLabel}>
                            <Text style={styles.fontLabel}>出生日期</Text>
                        </View>
                        <View style={styles.rowContent}>
                            <Text style={styles.TextInputStyle}>{this.state.relaPerBirthday}</Text>
                        </View>
                    </View>

                    <View style={[styles.row]}>
                        <View style={styles.rowLabel}>
                            <Text style={styles.fontLabel}>身份证</Text>
                        </View>
                        <View style={styles.rowContent}>
                            <Text style={styles.TextInputStyle}>{this.state.relaPerCertificateNo}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.rowLabel}>
                            <Text style={styles.fontLabel}>手机号码</Text>
                        </View>
                        <View style={styles.rowContent}>
                            <Text style={styles.TextInputStyle}>{this.state.relaPerMobilePhone}</Text>
                        </View>
                    </View>

                    <LoadingModal txtTitle={this.state.showModalTitle} visible={this.state.showModal}/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(244,244,244)',
    },
    row: {
        backgroundColor: 'rgb(255,255,255)',
        height: Px2dp.getHeight(92),
        borderWidth: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(244,244,244)',
    },
    rowLabel: {
        marginLeft: Px2dp.getWidth(30)
    },
    rowContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fontLabel: {
        fontSize: Px2dp.getHeight(28),
        color: 'rgb(51,51,51)'
    },
    AvatarStyle: {
        marginRight: Px2dp.getWidth(30),
        height: Px2dp.getHeight(58),
        width: Px2dp.getWidth(58),
        borderRadius: Px2dp.getHeight(29)
    },
    TextInputStyle: {
        marginRight: Px2dp.getWidth(30),
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
        textAlign: 'right',
        fontSize: Px2dp.getHeight(28),
        color: 'rgb(196,196,196)',
    },

});

