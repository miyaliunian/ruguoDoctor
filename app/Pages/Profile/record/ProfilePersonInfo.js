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
import Px2dp from '../../../Common/px2dp';
import ViewUtil from '../../../Common/viewUtil';
import Picker from 'react-native-picker';
import DataRepository from '../../../Expand/Dao/DataRepository'
import SubmitBtn from '../../../Component/SubmitBtn'
import LoadingModal from '../../../Component/LoadingModal'
import {MoreMenu} from '../../../Common/MoreMenu';
import NavigationBar from '../../../Component/NavigationBar'

export default class ProfilePersonInfo extends Component {

    constructor(props) {
        super(props);
        this.genderMap = new Map([
            ['1', '男'],
            ['2', '女'],
        ]);
        this.reproductiveModeMap = new Map([
            ['0', '顺产'],
            ['1', 'two'],
            ['2', 'three'],
        ]);
        this.dataRepository = new DataRepository();
        // this.keyboardDidShowListener = null;
        this.keyboardDidHideListener = null;
        this.onDismissKeyBoard = this.onDismissKeyBoard.bind(this);
        this.state = {
            keyboardShown: false,
            showModal: false,
            showModalTitle: '正在加载',
            id: null,
            code: null,
            name: null,
            genderName: null,
            genderCode: null,
            birthday: null,
            memberLevelCode: null,
            age: null,
            hight: null,
            weight: null,
            certificateNo: null,
            reproductiveMode: null,
            reproductiveModeName: null,
            email: null,
            mobilePhone: null,

        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            navigatePressLeft: this.navigatePressLeft,
            // navigatePressRight: this.navigatePressRight,

        });
        this.loadData();
    }

    componentWillMount() {
        // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShowHandler.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHideHandler.bind(this));

    }

    componentWillUnmount() {
        Picker.hide();
        this.keyboardDidHideListener.remove();
    }

    //初始化数据
    loadData() {
        this.setState({
            id: this.props.navigation.state.params.personId
        });
        this.dataRepository.fetchLocalRepository('personInfo')
            .then(result => {
                if (result) {
                    this.setPersonInfoState(result);
                } else {
                    this.fechPersonInfo();
                }
            }).catch(error => {
        })
    }

    //设置个人信息状态
    setPersonInfoState(personInfo) {
        this.setState({
            id: personInfo.id,
            genderCode: personInfo.genderCode,
            genderName: this.genderMap.get(personInfo.genderCode),
            name: personInfo.name,
            age: '30',
            hight: personInfo.hight,
            weight: personInfo.weight,
            reproductiveMode: personInfo.reproductiveMode,
            reproductiveModeName: this.reproductiveModeMap.get(personInfo.reproductiveMode),
            certificateNo: this.setCertificateNo(personInfo.certificateNo),
            email: personInfo.email,
            mobilePhone: personInfo.mobilePhone,
        });
    }

    //转换身份证号，星号显示
    setCertificateNo = (certificateNo) => {
        return (certificateNo != null) ? (certificateNo).replace(/^(.{3})(?:\d+)(.{4})$/, "$1***********$2") : '';
    };

    //服务端获取个人信息+保存至本地+刷新DOM
    fechPersonInfo() {
        this.setState({
            showModal: true
        });

        // let url = FLAG_STORAGE.serverUrl + "http://10.101.22.208:6080/ruguo-bs/personaldata/momemberbasicinfo/get";
        let url = 'http://10.101.22.208:6080/ruguo-bs/personaldata/momemberbasicinfo/get';
        let params = {id: this.state.id};
        this.dataRepository.postJsonRepository(url, params)
            .then((response) => {
                this.setState({
                    showModal: false
                });
                if (response.status === 'success') {
                    this.dataRepository.saveLocalRepository('personInfo', response.data)
                        .then(result => {
                            if (result) {
                                this.setPersonInfoState(response.data);
                            }
                        })
                        .catch(error => {
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

    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };

    keyboardDidShowHandler(event) {
        Picker.hide();
        this.setState({keyboardShown: true});
    }

    keyboardDidHideHandler(event) {
        this.refs.emailTextInput.blur();
        this.setState({keyboardShown: false});
    }

    personInfoDidHandler(obj) {
        this.setState({
            certificateNo: this.setCertificateNo(obj.certificateNo)
        });
        DeviceEventEmitter.emit('toastInfo', '保存成功', 'success');
    }

    //强制隐藏键盘
    onDismissKeyBoard = () => {
        Keyboard.dismiss();
    };

    onChangeGender = () => {
        this.onDismissKeyBoard();
        // let data = ['男', '女'];
        let data = [...this.genderMap.values()];
        Picker.init({
            pickerData: data,
            selectedValue: ['男'],
            pickerTitleText: '选择性别',
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            onPickerConfirm: data => {
                this.setState({genderName: data[0]});
                let tempKey;
                this.genderMap.forEach(function (value, key) {
                    if (value === data[0]) {
                        tempKey = key;
                    }
                });
                this.state.genderCode = tempKey;
            },
            onPickerCancel: data => {
            },
            onPickerSelect: data => {
            }
        });
        Picker.show();
    };

    onChangeAge = () => {
        this.onDismissKeyBoard();
        let data = [];
        for (let i = 0; i < 100; i++) {
            data.push(i);
        }
        Picker.init({
            pickerData: data,
            selectedValue: [this.state.age != null ? this.state.age : 30],
            pickerTitleText: '选择年龄(岁)',
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            onPickerConfirm: data => {
                this.setState({age: data[0]})
            },
        });
        Picker.show();
    };

    onChangeHight = () => {
        this.onDismissKeyBoard();
        let data = [];
        for (let i = 0; i < 200; i++) {
            data.push(i);
        }
        Picker.init({
            pickerData: data,
            selectedValue: [this.state.hight != null ? this.state.hight : 170],
            pickerTitleText: '选择身高(cm)',
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            onPickerConfirm: data => {
                this.setState({hight: data[0]})
            },
        });
        Picker.show();
    };

    onChangeWeight = () => {
        this.onDismissKeyBoard();
        let data = [];
        for (let i = 0; i < 200; i++) {
            data.push(i);
        }
        Picker.init({
            pickerData: data,
            selectedValue: [this.state.weight != null ? this.state.weight : 50],
            pickerTitleText: '选择体重(kg)',
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            onPickerConfirm: data => {
                this.setState({weight: data[0]})
            },
        });
        Picker.show();
    };
    onChangereproductiveMode = () => {
        this.onDismissKeyBoard();
        let data = [...this.reproductiveModeMap.values()];
        Picker.init({
            pickerData: data,
            selectedValue: [this.state.reproductiveModeName != null ? this.state.reproductiveModeName : '顺产'],
            pickerTitleText: '选择生成方式',
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            onPickerConfirm: data => {
                this.setState({reproductiveModeName: data[0]});
                let tempKey;
                this.reproductiveModeMap.forEach(function (value, key) {
                    if (value === data[0]) {
                        tempKey = key;
                    }
                });
                this.state.reproductiveMode = tempKey;
            },
        });
        Picker.show();
    };
    onChangeCertificateNo = () => {
        let menu;
        let title = '';
        if (this.state.certificateNo !== '' && this.state.certificateNo !== null) {
            menu = MoreMenu.Profile.Record.PersonInfo.menu_certificateNo_modify;
            title = '修改身份证号';
        } else {
            menu = MoreMenu.Profile.Record.PersonInfo.menu_certificateNo_enter;
            title = '输入身份证号';
        }
        this.props.navigation.navigate(menu, {
            title: title,
            personId: this.state.id,
            callBack: (obj) => this.personInfoDidHandler(obj)
        });
    };
    onChangeMobilePhone = () => {

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

        let title = this.props.navigation.state.params.title;
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
                    <TouchableOpacity>
                        <View style={styles.row}>
                            <View style={styles.rowLabel}>
                                <Text style={styles.fontLabel}>头像</Text>
                            </View>
                            <View style={styles.rowContent}>
                                <Image source={require('../../../Resource/Imags/res_photo_man.png')}
                                       style={styles.AvatarStyle}/>
                                {itemRightArrow}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line}/>
                    <View style={styles.row}>
                        <View style={styles.rowLabel}>
                            <Text style={styles.fontLabel}>姓名</Text>
                        </View>
                        <View style={styles.rowContent}>
                            <TextInput style={[styles.TextInputStyle, styles.fontText]} maxLength={10}
                                       underlineColorAndroid='rgb(255,255,255)'
                                       placeholderTextColor='rgb(196,196,196)'
                                       placeholder='请输入'
                                       onFocus={() => {
                                           Picker.hide()
                                       }}
                                       onChangeText={(text) => {
                                           this.state.name = text
                                       }}
                                       value={this.state.name}
                            />
                        </View>
                    </View>
                    <View style={styles.line}/>
                    <TouchableOpacity onPress={this.onChangeGender.bind(this)}>
                        <View style={styles.row}>
                            <View style={styles.rowLabel}>
                                <Text style={styles.fontLabel}>性别</Text>
                            </View>
                            <View style={styles.rowContent}>
                                <Text
                                    style={styles.fontText}>{this.state.genderName}{this.state.genderName != null ? '' : '请选择'}</Text>
                                {itemRightArrow}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line}/>

                    <TouchableOpacity onPress={this.onChangeAge.bind(this)}>
                        <View style={styles.row}>
                            <View style={styles.rowLabel}>
                                <Text style={styles.fontLabel}>年龄</Text>
                            </View>
                            <View style={styles.rowContent}>
                                <Text
                                    style={styles.fontText}>{this.state.age}{this.state.age != null ? ' 岁' : '请选择'}</Text>
                                {itemRightArrow}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line}/>

                    <TouchableOpacity onPress={this.onChangeHight.bind(this)}>
                        <View style={styles.row}>
                            <View style={styles.rowLabel}>
                                <Text style={styles.fontLabel}>身高</Text>
                            </View>
                            <View style={styles.rowContent}>
                                <Text
                                    style={styles.fontText}>{this.state.hight}{this.state.hight != null ? ' cm' : '请选择'}</Text>
                                {itemRightArrow}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line}/>

                    <TouchableOpacity onPress={this.onChangeWeight.bind(this)}>
                        <View style={styles.row}>
                            <View style={styles.rowLabel}>
                                <Text style={styles.fontLabel}>体重</Text>
                            </View>
                            <View style={styles.rowContent}>
                                <Text
                                    style={styles.fontText}>{this.state.weight}{this.state.weight != null ? ' kg' : '请选择'}</Text>
                                {itemRightArrow}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line}/>

                    <TouchableOpacity onPress={this.onChangeCertificateNo.bind(this)}>
                        <View style={styles.row}>
                            <View style={styles.rowLabel}>
                                <Text style={styles.fontLabel}>身份证</Text>
                            </View>
                            <View style={styles.rowContent}>

                                <View style={styles.rowContent}>
                                    <Text
                                        style={styles.fontText}>{this.state.certificateNo}{this.state.certificateNo !== '' && this.state.certificateNo != null ? '' : '请输入'}</Text>
                                    {itemRightArrow}
                                </View>

                                {/*<TextInput style={[styles.TextInputStyle, styles.fontText]} maxLength={18}*/}
                                {/*underlineColorAndroid='rgb(255,255,255)'*/}
                                {/*placeholderTextColor='rgb(196,196,196)'*/}
                                {/*placeholder={'请输入'}*/}
                                {/*onFocus={() => {*/}
                                {/*this.setState({keyboardShown: true});*/}
                                {/*Picker.hide()*/}
                                {/*}}*/}
                                {/*value={this.state.certificateNo}*/}
                                {/*editable={false}*/}
                                {/*></TextInput>*/}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line}/>

                    <TouchableOpacity onPress={this.onChangereproductiveMode.bind(this)}>
                        <View style={styles.row}>
                            <View style={styles.rowLabel}>
                                <Text style={styles.fontLabel}>生产方式</Text>
                            </View>
                            <View style={styles.rowContent}>
                                <Text
                                    style={styles.fontText}>{this.state.reproductiveModeName}{this.state.reproductiveModeName != null ? '' : '请选择'}</Text>
                                {itemRightArrow}
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={[styles.row, {marginTop: Px2dp.getHeight(10)}]}>
                        <View style={styles.rowLabel}>
                            <Text style={styles.fontLabel}>电子邮箱</Text>
                        </View>
                        <View style={styles.rowContent}>
                            <TextInput style={[styles.TextInputStyle, styles.fontText]}
                                       ref='emailTextInput'
                                       maxLength={30}
                                       underlineColorAndroid='rgb(255,255,255)'
                                       placeholderTextColor='rgb(196,196,196)'
                                       placeholder={'请输入'}
                                       keyboard='numeric'
                                       onFocus={() => {
                                           this.setState({keyboardShown: true});
                                           Picker.hide()
                                       }}
                                       onChangeText={(text) => {
                                           this.state.email = text
                                       }}
                                       value={this.state.email}
                                // value={this.state.email}
                            />
                        </View>
                    </View>
                    <View style={styles.line}/>

                    <TouchableOpacity onPress={this.onChangeMobilePhone.bind(this)}>
                        <View style={styles.row}>
                            <View style={styles.rowLabel}>
                                <Text style={styles.fontLabel}>手机号码</Text>
                            </View>
                            <View style={styles.rowContent}>
                                <View style={styles.rowContent}>
                                    <Text
                                        style={styles.fontText}>{this.state.mobilePhone}</Text>
                                    {itemRightArrow}
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={{
                        marginTop: Px2dp.getHeight(76),
                        marginBottom: Px2dp.getHeight(76),
                        alignItems: 'center'
                    }}>
                        <SubmitBtn onSubmit={() => this.savePersonInfo()} styles={{
                            backgroundColor: 'rgb(255,208,96)',
                            height: Px2dp.getHeight(80),
                            width: Px2dp.getWidth(650)
                        }}
                                   titleStyle={{color: 'rgb(51,51,51)'}} txtTitle='保存'/>

                        {/*<TouchableOpacity onPress={() => this.savePersonInfo()}>*/}
                        {/*<View style={styles.ButtonStyle}>*/}
                        {/*<Text style={[styles.fontLabel]}>保存</Text>*/}
                        {/*</View>*/}
                        {/*</TouchableOpacity>*/}
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

});

