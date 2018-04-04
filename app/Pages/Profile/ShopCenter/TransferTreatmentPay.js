/**
 * Created by hl on 2017/11/25.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Keyboard,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    DeviceEventEmitter
} from 'react-native';
import GlobalStyles from '../../../Common/GlobalStyles';
import ScreenUtil from '../../../Common/screenUtil'
import Px2dp from '../../../Common/px2dp';
import ViewUtil from '../../../Common/viewUtil';
import DataRepository from '../../../Expand/Dao/DataRepository'
import LoadingModal from '../../../Component/LoadingModal'
import NavigationBar from '../../../Component/NavigationBar'

export default class TransferTreatmentPay extends Component {

    constructor(props) {
        super(props);

        this.dataRepository = new DataRepository();
        // this.keyboardDidShowListener = null;
    }

    componentDidMount() {
       // this.loadData();
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    //初始化数据
    loadData() {
        this.setState({
            id: this.props.navigation.state.params.personId
        });
        this.dataRepository.fetchLocalRepository('personInfo')
            .then(result => {

            }).catch(error => {
        })
    }

    //设置个人信息状态
    setPersonInfoState(personInfo) {

    }

    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };
    //保存
    savePersonInfo = () => {

        this.setState({
            showModalTitle: '正在保存',
            showModal: true
        });
        let params = {};
        params.id = this.state.id;
        params.name = this.state.name;
        params.genderName = this.state.genderName;
        params.genderCode = this.state.genderCode;
        params.age = this.state.age;
        params.hight = this.state.hight;
        params.weight = this.state.weight;
        params.reproductiveMode = this.state.reproductiveMode;
        params.email = this.state.email;

        // let url = FLAG_STORAGE.serverUrl + "/personaldata/momemberbasicinfo/save";
        let url = 'http://10.101.22.208:6080/ruguo-bs/personaldata/momemberbasicinfo/save';
        this.dataRepository.postJsonRepository(url, params)
            .then((response) => {
                this.setState({
                    showModal: false
                });
                if (response.status === 'success') {
                    this.dataRepository.saveLocalRepository('personInfo', params)
                        .then(result => {
                            if (result) {
                                DeviceEventEmitter.emit('toastInfo', '保存成功', 'success');
                            }
                        })
                        .catch(error => {
                            DeviceEventEmitter.emit('toastInfo', '保存失败', 'fail');
                        })
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

    };

    render() {

        let title = '支付';
        let itemRightArrow = <Image source={require('../../../Resource/Imags/icon_arrow_black.png')}
                                    style={styles.imgRight}/>;
        return (
            <View style={[styles.container, this.state.keyboardShown && styles.bumpedContainer]}>
                <NavigationBar
                    statusBar={GlobalStyles.navigationBarColor_yellow}
                    style={GlobalStyles.navigationBarColor_yellow}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    title={title}/>

                <ScrollView style={{flex: 1}}>

                    <View style={styles.row}>
                        <View style={styles.rowLabel}>
                            <Text style={styles.fontLabel}>医生姓名</Text>
                        </View>
                        <View style={styles.rowContent}>
                            <Text>黄xxx</Text>
                        </View>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.row}>
                        <View style={styles.rowLabel}>
                            <Text style={styles.fontLabel}>订单名称</Text>
                        </View>
                        <View style={styles.rowContent}>
                            <Text>xxx转诊服务</Text>
                        </View>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.row}>
                        <View style={styles.rowLabel}>
                            <Text style={styles.fontLabel}>订单编号</Text>
                        </View>
                        <View style={styles.rowContent}>
                            <Text>123456789</Text>
                        </View>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.row}>
                        <View style={styles.rowLabel}>
                            <Text style={styles.fontLabel}>服务时间</Text>
                        </View>
                        <View style={styles.rowContent}>
                            <Text>2018-01-16 周三下午</Text>
                        </View>
                    </View>
                    <View style={[styles.row, {marginTop: Px2dp.getHeight(10)}]}>
                        <View style={styles.rowLabel}>
                            <Text style={styles.fontLabel}>总价</Text>
                        </View>
                        <View style={styles.rowContent}>
                            <Text style={{color:'#ef5e52'}}> ¥5555.00</Text>
                        </View>
                    </View>
                    <View style={styles.line}/>

                    <TouchableOpacity onPress={this.onChangeMobilePhone.bind(this)}>
                        <View style={styles.row}>
                            <View style={styles.rowLabel}>
                                <Text style={styles.fontLabel}>优惠券</Text>
                            </View>
                            <View style={styles.rowContent}>
                                <View style={styles.rowContent}>
                                    <Text
                                        style={styles.fontText}>无可用</Text>
                                    {itemRightArrow}
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <LoadingModal txtTitle={this.state.showModalTitle} visible={this.state.showModal}/>
                </ScrollView>

                <View style={{flexDirection:'row',width:ScreenUtil.screenSize.width}}>
                    <TouchableOpacity>
                        <View style={styles.ButtonStyle2}>
                            <Text style={[styles.fontLabel]}>需支付：</Text>
                            <Text style={[styles.fontLabel,{color:'#ef5e52'}]}>¥5555.00</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.ButtonStyle1}>
                            <Text style={[styles.fontLabel]}>去支付</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(244,244,244)',
    },
    bumpedContainer: {
        marginTop: -210,
        // marginBottom: 210
    },
    row: {
        backgroundColor: 'rgb(255,255,255)',
        height: Px2dp.getHeight(92),
        borderWidth: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowLabel: {
        width: 100,
        marginLeft: Px2dp.getWidth(30)
    },
    rowContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight:Px2dp.getWidth(20)
    },
    line: {
        height: 1,
        backgroundColor: 'rgb(244,244,244)',
        marginLeft: Px2dp.getWidth(30)
    },
    // line_space: {
    //     height: 5,
    //     // opacity:0.5,
    //     backgroundColor: 'rgb(244,244,244)'
    // }
    fontLabel: {
        fontSize: Px2dp.getHeight(28),
        color: 'rgb(51,51,51)'
    },
    fontText: {
        fontSize: Px2dp.getHeight(28),
        color: 'rgb(196,196,196)',

    },
    imgRight: {
        marginLeft: Px2dp.getWidth(30),
        marginRight: Px2dp.getWidth(30),
        height: Px2dp.getHeight(30),
        width: Px2dp.getWidth(30),
        tintColor: 'rgb(196,196,196)'
    },
    AvatarStyle: {
        height: Px2dp.getHeight(58),
        width: Px2dp.getWidth(58),
        borderRadius: Px2dp.getHeight(29)
    },
    TextInputStyle: {
        marginRight: Px2dp.getWidth(82),
        width: 200,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
        textAlign: 'right'
    },
    // ButtonStyle: {
    //     height: Px2dp.getHeight(80),
    //     width: Px2dp.getWidth(650),
    //     alignItems: 'center',
    //     borderRadius: Px2dp.getHeight(6),
    //     backgroundColor: 'rgb(255,208,96)',
    //     justifyContent: 'center'
    // }
    ButtonStyle1: {
        height: Px2dp.getHeight(90),
        alignItems: 'center',
        backgroundColor: 'rgb(255,208,96)',
        justifyContent: 'center',
        width:ScreenUtil.screenSize.width/4,
    },
    ButtonStyle2: {
        flexDirection:'row',
        height: Px2dp.getHeight(90),
        alignItems: 'center',
        backgroundColor: 'rgb(255,255,255)',
        justifyContent: 'center',
        width:ScreenUtil.screenSize.width*3/4,
    }
});

