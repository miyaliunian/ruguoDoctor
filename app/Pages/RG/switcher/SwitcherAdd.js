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
import ScreenUtil from '../../../Common/screenUtil';
import {MoreMenu} from '../../../Common/MoreMenu';
import NavigationBar from '../../../Component/NavigationBar'


// 状态管理
import SwitcherMobxStore from './SwitcherMobxStore';
let ScrollItem = require('./ScrollItem.json');
import {observer} from 'mobx-react/native';
import {action, observe} from 'mobx';
import RiskItemBtn from './RiskItemBtn'

@observer
export default class SwitcherAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyboardShown: false,
            showModal: false,
            showModalTitle: '正在加载',
            id: null,
            code: null
        };

        this.genderMap = new Map([
            ['1', '男'],
            ['2', '女'],
        ]);
        this.reproductiveModeMap = new Map([
            ['0', '顺产'],
            ['1', 'two'],
            ['2', 'three'],
        ]);
        this.relationshipModeMap = new Map([
            ['0', '母子'],
            ['1', '父子'],
            ['2', '婆媳'],
        ]);

        this.dataRepository = new DataRepository();
        this.keyboardDidHideListener = null;
        this.onDismissKeyBoard = this.onDismissKeyBoard.bind(this);
        this.data = new SwitcherMobxStore();
    }

    componentDidMount() {
        this.data.replace(ScrollItem.datas);
        this.fatchData();
    }

    componentWillMount() {
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHideHandler.bind(this));

    }

    componentWillUnmount() {
        Picker.hide();
        this.keyboardDidHideListener.remove();
    }

    //初始化数据
    fatchData() {
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
            relationship: '母子',
            birthday: personInfo.birthday,
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

        let url = 'http://10.101.22.208:6080/ruguo-bs/personaldata/momemberbasicinfo/get';
        let params = {id: this.data.personInfo.id};
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

    navigatePressRight = () => {
        // this.props.navigation.goBack();
    };

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
        let data = [...this.genderMap.values()];
        Picker.init({
            pickerData: data,
            selectedValue: ['男'],
            pickerTitleText: '选择性别',
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            onPickerConfirm: data => {
                this.data.personInfo.genderName=data[0];
                let tempKey;
                this.genderMap.forEach(function (value, key) {
                    if (value === data[0]) {
                        tempKey = key;
                    }
                });
                this.data.personInfo.genderCode = tempKey;
            },
            onPickerCancel: data => {
            },
            onPickerSelect: data => {
            }
        });
        Picker.show();
    };

    onChangeRelationship = () => {
        this.onDismissKeyBoard();
        let data = [...this.relationshipModeMap.values()];
        Picker.init({
            pickerData: data,
            selectedValue: [this.data.personInfo.relationship != null ? this.data.personInfo.relationship : '母子'],
            pickerTitleText: '选择关系',
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            onPickerConfirm: data => {
                this.data.personInfo.relationship=data[0]
            },
        });
        Picker.show();
    };

    _createDateData() {
        let date = [];
        for(let i=1970;i<2020;i++){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        // day.push(k+'日');
                        day.push(k);
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if(i%4 === 0){
                        //day.push(29+'日');
                        day.push(29);
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        //day.push(k+'日');
                        day.push(k);
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        //day.push(k+'日');
                        day.push(k);
                    }
                }
                let _month = {};
                // _month[j+'月'] = day;
                _month[j] = day;
                month.push(_month);
            }
            let _date = {};
            //_date[i+'年'] = month;
            _date[i] = month;
            date.push(_date);
        }
        return date;
    }
    _showDatePicker() {
        Picker.init({
            pickerData: this._createDateData(),
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerTitleText: '选择出生日期',
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            onPickerConfirm: (pickedValue, pickedIndex) => {
                this.data.personInfo.birthday=pickedValue[0]+"-"+pickedValue[1]+"-"+pickedValue[2];
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            }
        });
        Picker.show();
    }

    onChangereproductiveMode = () => {
        this.onDismissKeyBoard();
        let data = [...this.reproductiveModeMap.values()];
        Picker.init({
            pickerData: data,
            selectedValue: [this.data.personInfo.reproductiveModeName != null ? this.data.personInfo.reproductiveModeName : '顺产'],
            pickerTitleText: '选择生产方式',
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            onPickerConfirm: data => {
                this.data.personInfo.reproductiveModeName=data[0];
                let tempKey;
                this.reproductiveModeMap.forEach(function (value, key) {
                    if (value === data[0]) {
                        tempKey = key;
                    }
                });
                this.data.personInfo.reproductiveMode = tempKey;
            },
        });
        Picker.show();
    };
    onChangeCertificateNo = () => {
        let menu;
        let title = '';
        if (this.data.personInfo.certificateNo !== '' && this.data.personInfo.certificateNo !== null) {
            menu = MoreMenu.Profile.Record.PersonInfo.menu_certificateNo_modify;
            title = '修改身份证号';
        } else {
            menu = MoreMenu.Profile.Record.PersonInfo.menu_certificateNo_enter;
            title = '输入身份证号';
        }
        this.props.navigation.navigate(menu, {
            title: title,
            personId: this.data.personInfo.id,
            callBack: (obj) => this.personInfoDidHandler(obj)
        });
    };

    @action
    selectPress(itemData) {
        itemData.isSelect = !itemData.isSelect;
    };




    renderHealthCell() {
        let row = [];
        let itemArr = [];
        var dates = this.data.itemData;
        let rowNum = dates.length / 3;
        let lastRowNum = dates.length % 3;
        for (let i = 0; i < dates.length; i++) {
            let data = dates[i];
            itemArr.push(<RiskItemBtn
                    title={data.title}
                    isSelect={data.isSelect}
                    key={i}
                    callback={() => this.selectPress(data)}
                />
            );
            if (i + lastRowNum % 3 == dates.length) {
                row.push(<View key={i} style={{flexDirection: 'row', marginTop: Px2dp.getHeight(40)}}>
                    {itemArr}
                </View>)
            }
            else {

                if ((i + 1) % 3 == 0) {
                    row.push(<View key={i} style={{flexDirection: 'row', marginTop: Px2dp.getHeight(40)}}>
                        {itemArr}
                    </View>);
                    itemArr = [];
                }
            }
        }
        return row
    }



    //获取《请选择健康状态》那些是选中的
    iterationMobxStatus(){
        let newItemArr = [];
        this.data.itemData.map((item) => {
            debugger;
            if (item.isSelect === true) {
                newItemArr.push(item)
            }
        });
        this.data.personInfo.healthStatus=newItemArr;
    }

    //保存
    savePersonInfo = () => {
        this.iterationMobxStatus();
        console.log(JSON.stringify(this.data.personInfo))
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
                    title={title}
                />


                <ScrollView style={{flex: 1}}>
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
                                           this.data.personInfo.name=text;
                                       }}
                                       value={this.data.personInfo.name}
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
                                    style={styles.fontText}>{this.data.personInfo.genderName}{this.data.personInfo.genderName != null ? '' : '请选择'}</Text>
                                {itemRightArrow}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line}/>

                    <TouchableOpacity onPress={this.onChangeRelationship.bind(this)}>
                        <View style={styles.row}>
                            <View style={styles.rowLabel}>
                                <Text style={styles.fontLabel}>关系</Text>
                            </View>
                            <View style={styles.rowContent}>
                                <Text
                                    style={styles.fontText}>{this.data.personInfo.relationship}{this.data.personInfo.relationship != null ? ' ' : '请选择'}</Text>
                                {itemRightArrow}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line}/>

                    <TouchableOpacity onPress={this._showDatePicker.bind(this)}>
                        <View style={styles.row}>
                            <View style={styles.rowLabel}>
                                <Text style={styles.fontLabel}>出生日期</Text>
                            </View>
                            <View style={styles.rowContent}>
                                <Text
                                    style={styles.fontText}>{this.data.personInfo.birthday}{this.data.personInfo.birthday != null ? '' : '请选择'}</Text>
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
                                        style={styles.fontText}>{this.data.personInfo.certificateNo}{this.data.personInfo.certificateNo !== '' && this.data.personInfo.certificateNo != null ? '' : '请输入'}</Text>
                                    {itemRightArrow}
                                </View>
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
                                    style={styles.fontText}>{this.data.personInfo.reproductiveModeName}{this.data.personInfo.reproductiveModeName != null ? '' : '请选择'}</Text>
                                {itemRightArrow}
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/*健康状态*/}
                    <View style={styles.line}/>
                    <View style={{
                        paddingTop: Px2dp.getHeight(30),
                        paddingBottom: Px2dp.getHeight(20),
                        backgroundColor: 'white'
                    }}>
                        <View style={{
                            alignItems: 'center'
                        }}><Text style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: 'rgb(51,51,51)',
                        }}>请选择健康状态</Text></View>
                        {this.renderHealthCell()}
                    </View>
                    <View style={[styles.row, {marginTop: Px2dp.getHeight(10)}]}>
                        <View style={styles.rowLabel}>
                            <Text style={styles.fontLabel}>手机号码</Text>
                        </View>
                        <View style={styles.rowContent}>
                            <TextInput style={[styles.TextInputStyle, styles.fontText]}
                                       ref='emailTextInput'
                                       maxLength={30}
                                       underlineColorAndroid='rgb(255,255,255)'
                                       placeholderTextColor='rgb(196,196,196)'
                                       placeholder={'请输入手机号码'}
                                       keyboard='numeric'
                                       onFocus={() => {
                                           this.setState({keyboardShown: true});
                                           Picker.hide()
                                       }}
                                       onChangeText={(text) => {
                                           this.data.personInfo.mobilePhone = text
                                       }}
                                       value={this.data.personInfo.mobilePhone}
                            />
                        </View>
                    </View>
                    <View style={styles.line}/>

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
                                       placeholder={'请输入电子邮箱'}
                                       keyboard='numeric'
                                       onFocus={() => {
                                           this.setState({keyboardShown: true});
                                           Picker.hide()
                                       }}
                                       onChangeText={(text) => {
                                           this.data.personInfo.email = text
                                       }}
                                       value={this.data.personInfo.email}
                            />
                        </View>
                    </View>

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
                    </View>
                    {/*<LoadingModal txtTitle={this.state.showModalTitle} visible={this.state.showModal}/>*/}
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
    headerContainer: {
        alignItems: 'center',
        height: Px2dp.getHeight(160),
        backgroundColor: 'white',
        paddingTop: Px2dp.getHeight(30),

    },
    headerTitle: {
        fontSize: 15,
        color: 'rgb(51,51,15)',
        fontWeight: "800"
    },
    headerBody: {
        width: ScreenUtil.screenSize.width - Px2dp.getWidth(152),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Px2dp.getHeight(20)
    },
    subContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255,208,96)',
        width: Px2dp.getWidth(260),
        height: Px2dp.getHeight(60),
        borderRadius: Px2dp.getWidth(6),
    },
});

