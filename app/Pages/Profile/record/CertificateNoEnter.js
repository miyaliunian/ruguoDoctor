/**
 * Created by hl on 2017/11/29.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Keyboard,
    TextInput,
    DeviceEventEmitter,
} from 'react-native';
import GlobalStyles from '../../../Common/GlobalStyles';
import Px2dp from '../../../Common/px2dp';
import ViewUtil from '../../../Common/viewUtil';
import DataRepository, {FLAG_STORAGE} from '../../../Expand/Dao/DataRepository'
import SubmitBtn from '../../../Component/SubmitBtn'
import LoadingModal from '../../../Component/LoadingModal'
import NavigationBar from '../../../Component/NavigationBar'
export default class CertificateNoEnter extends Component {

    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.state = {
            showModal: false,
            id: null,
            certificateNo: null,
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            navigatePressLeft: this.navigatePressLeft,
        });
        this.setState({
            id: this.props.navigation.state.params.personId
        });
    }

    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    //强制隐藏键盘
    onDismissKeyBoard = () => {
        Keyboard.dismiss();
    };

    IdentityCodeValid=(code)=> {
        let city = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        };
        let tip = "";
        let pass = true;
        if (!code || !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/i.test(code)) {
            tip = "身份证号格式错误";
            pass = false;
        }

        else if (!city[code.substr(0, 2)]) {
            tip = "地址编码错误";
            pass = false;
        }
        else {
            //18位身份证需要验证最后一位校验位
            if (code.length === 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                let sum = 0;
                let ai = 0;
                let wi = 0;
                for (let i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                let last = parity[sum % 11];
                if (parity[sum % 11] != code[17]) {
                    tip = "校验位错误";
                    pass = false;
                }
            }
        }
        if (!pass) {
            DeviceEventEmitter.emit('toastInfo', tip, 'stop');
        }
        return pass;
    };

    //保存
    saveCertificateNo = () => {

        this.onDismissKeyBoard();
        //验证输入的身份证号
        if (this.IdentityCodeValid(this.state.certificateNo)) {
            this.setState({
                showModal: true
            });
            let params = {};
            params.id = this.state.id;
            params.certificateTypeCode = '1';
            params.certificateName = '居民身份证';
            params.certificateNo = this.state.certificateNo;

            // let url = FLAG_STORAGE.serverUrl + "/personaldata/momemberbasicinfo/save";
            let url = 'http://10.101.22.208:6080/ruguo-bs/personaldata/momemberbasicinfo/save';
            this.dataRepository.postJsonRepository(url, params)
                .then((response) => {
                    this.setState({
                        showModal: false
                    });
                    if (response.status === 'success') {

                        this.dataRepository.fetchLocalRepository('personInfo')
                            .then(result => {
                                if (result) {
                                    //身份证号赋值
                                    result.certificateNo = this.state.certificateNo;

                                    this.dataRepository.saveLocalRepository('personInfo', result)
                                        .then(result => {
                                            if (result) {
                                                DeviceEventEmitter.emit('toastInfo', '保存成功', 'success');
                                                const {state, goBack} = this.props.navigation;
                                                state.params.callBack({certificateNo: this.state.certificateNo});
                                                goBack();
                                                // DeviceEventEmitter.emit('personInfoListener', {certificateNo: this.state.certificateNo});
                                            }
                                        })
                                        .catch(error => {
                                            DeviceEventEmitter.emit('toastInfo', '保存失败', 'fail');
                                        })
                                }
                            }).catch(error => {
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
        }
    };

    render() {
        let title = this.props.navigation.state.params.title;
        return (
            <View style={[styles.container]}>
                <NavigationBar
                    statusBar={GlobalStyles.navigationBarColor_yellow}
                    style={GlobalStyles.navigationBarColor_yellow}
                    leftButton={ViewUtil.getLeftButton(()=>this.navigatePressLeft())}
                    title={title}/>
                <View style={styles.row}>
                    <TextInput style={[styles.TextInputStyle, styles.fontText]} maxLength={18}
                               underlineColorAndroid='rgb(255,255,255)'
                               placeholderTextColor='rgb(196,196,196)'
                               placeholder='请输入身份证号'
                               onChangeText={(text) => {
                                   this.state.certificateNo = text
                               }}
                    >{this.state.certificateNo}</TextInput>
                </View>

                <View style={{marginTop: Px2dp.getHeight(76), alignItems: 'center'}}>
                    <SubmitBtn onSubmit={() => this.saveCertificateNo()} styles={{
                        backgroundColor: 'rgb(255,208,96)',
                        height: Px2dp.getHeight(80),
                        width: Px2dp.getWidth(650)
                    }}
                               titleStyle={{color: 'rgb(51,51,51)'}} txtTitle='保存'/>

                </View>
                <LoadingModal txtTitle='正在提交' visible={this.state.showModal}/>
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
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    TextInputStyle: {
        width: 300,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
        textAlign: 'center'
    },
    fontText: {
        fontSize: Px2dp.getHeight(28),
        color: 'rgb(196,196,196)',

    }
});

