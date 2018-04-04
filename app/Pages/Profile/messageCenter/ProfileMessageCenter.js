/**
 * Created by wufei on 2017/11/27.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    StatusBar,
    Text,
    View,
    Image,
    Keyboard,
    TouchableOpacity,
    ListView,
    Linking,
    TextInput,
    DeviceEventEmitter
} from 'react-native';

import Px2dp from '../../../Common/px2dp'
import ViewUtil from '../../../Common/viewUtil'
import GlobalStyles from '../../../Common/GlobalStyles'
import NavigationBar from '../../../Component/NavigationBar'
var datas = [];

export default class ProfileMessageCenter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputContentText: '',
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            serviceTel: '400-800-600',
            currentTime: 0.0,
            recording: false,
            stoppedRecording: false,
            finished: false,
            visible: 'none',
            transparent: true,
            audioPath: '',
            hasPermission: undefined,
            keybordOffset: 0,
            scrollDistance: 0,
        };
        datas.push({
            isDate: true,
            isMe: false,
            isMessage: true,
            talkContent: '您好，我是小果，请问有什么可以帮您？',
            talkName: '客服小果',
            talkDate: this.getFormateDate()
        });
        this.listHeight = 0;
        this.footerY = 0;
    }

    componentDidMount() {

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(datas)
        });
        this._listView = {
            onStartShouldSetResponder: () => true,
            onMoveShouldSetResponder: () => true,
            onResponderGrant: () => {
                this.setState({
                    visible: 'none',
                    keybordOffset: 0,
                });
            },
            onResponderMove: () => {
            },
            onResponderRelease: () => {
            }
        };
    };

    renderEveryData(eData) {
        return (
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <View style={eData.isDate == true ? styles.dateShow : styles.dateHide}>
                    <Text style={{color: 'white'}}>{eData.talkDate}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                    <Image
                        source={eData.isMe == true ? null : require('../../../Resource/Imags/ic_chat.png')}
                        style={eData.isMe == true ? null : styles.talkImg}
                    />
                    <View style={eData.isMe == true ? styles.rightContent : styles.leftContent}>
                        <Text style={eData.isMe == true ? styles.rightName : styles.leftName}>{eData.talkName}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                            <View style={eData.isMe == true ? styles.talkViewRight : styles.talkView}>

                                <Text style={ eData.isMessage == true ? styles.showMessage : null }>
                                    {eData.talkContent}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <Image
                        source={eData.isMe == true ? require('../../../Resource/Imags/ic_accountManager_weic.png') : null}
                        style={eData.isMe == true ? styles.talkImgRight : null}
                    />
                </View>
            </View>
        );
    }

    myRenderFooter(e) {
        return <View onLayout={(e) => {
            this.footerY = e.nativeEvent.layout.y;

            if (this.listHeight && this.footerY && this.footerY > this.listHeight) {
                var scrollDistance = this.listHeight - this.footerY;
                this.refs._listView.scrollTo({y: -scrollDistance});
            }
        }}/>
    }


    pressSendBtn() {
        if (this.state.inputContentText.trim().length <= 0) {
            DeviceEventEmitter.emit('toastInfo', '输入的内容不能为空', 'stop');
            return;
        }
        datas.push({
            isMe: true,
            isMessage: true,
            talkContent: this.state.inputContentText,
            talkName: '我自己'
        });
        this.refs._textInput.clear();
        datas.push({
            isMe: false,
            isMessage: true,
            talkContent: '目前还未接入线上客服，请拨打客服热线：' + this.state.serviceTel,
            talkName: '客服小果'
        });
        this.setState({
            inputContentText: '',
            dataSource: this.state.dataSource.cloneWithRows(datas)
        })
    }

    dissOffSet() {
        this.setState({
            visible: 'none',
            keybordOffset: 0
        });
    }

    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };
    navigatePressRight = () => {
        let url = 'tel: ' + this.state.serviceTel;
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    };

    render() {
        let marginValue = this.state.keybordOffset;
        return (

            <View style={[GlobalStyles.root_container]}>
                <NavigationBar
                    statusBar={{backgroundColor: 'rgb(255,255,255)'}}
                    style={{backgroundColor: 'rgb(255,255,255)'}}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    rightButton={
                        <TouchableOpacity onPress={() => this.navigatePressRight()}>
                            <View style={{margin: 10}}>
                                <Image
                                    style={{
                                        width: Px2dp.getWidth(44),
                                        height: Px2dp.getHeight(44),
                                        marginLeft: Px2dp.getWidth(30)
                                    }}
                                    source={require('../../../Resource/Imags/ic_tel.png')}
                                    resizeMethod='scale'
                                />
                            </View>
                        </TouchableOpacity>
                    }
                    title={'客服小果'}/>


                <StatusBar barStyle='dark-content'
                           translucent={true}/>
                <ListView
                    {...this._listView}
                    ref='_listView'
                    onLayout={(e) => {
                        this.listHeight = e.nativeEvent.layout.height;
                    }}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderEveryData.bind(this)}
                    renderFooter={this.myRenderFooter.bind(this)}
                />
                <View style={styles.bottomView}>

                    <TouchableOpacity>
                        <Image
                            style={styles.button}
                            source={require('../../../Resource/Imags/ic_voice_btn.png')}
                        />
                    </TouchableOpacity>

                    <View style={styles.searchBox}>
                        <TextInput
                            ref='_textInput'
                            onChangeText={(text) => {
                                this.state.inputContentText = text
                            }}
                            placeholder=' 请输入对话内容'
                            returnKeyType='done'
                            underlineColorAndroid="transparent"
                            style={styles.inputText}

                        />
                    </View>

                    <TouchableOpacity onPress={this.pressSendBtn.bind(this)}>
                        <Image
                            style={styles.button}
                            source={require('../../../Resource/Imags/ic_send_btn.png')}
                        />
                    </TouchableOpacity>

                </View>

            </View>
        );
    }

    getFormateDate() {
        var today = new Date(); //获得当前时间
        //获得年、月、日，Date()函数中的月份是从0－11计算
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var date = today.getDate();
        var hour = today.getHours();  //获得小时、分钟、秒
        var minute = today.getMinutes();
        var second = today.getSeconds();

        var apm = "上午"; //默认显示上午: AM
        if (hour > 12) //按12小时制显示
        {
            hour = hour - 12;
            apm = "下午";
        }

        return year + "年" + month + "月" + date + "日 " + apm + hour + ":" + (Array(2).join(0) + minute).slice(-2);

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE'
    },
    topView: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        height: 52,
        padding: 5
    },
    bottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        height: 52,
        padding: 5
    },
    sendBtn: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        height: 40,
    },
    bottomBtnText: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',

    },
    talkView: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 55,
        marginBottom: 10
    },
    talkImg: {
        height: 40,
        width: 40,
        marginLeft: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        // 设置图片填充模式
        borderRadius: 20,
        backgroundColor: 'transparent'
    },
    talkText: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
    },
    talkViewRight: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#90EE90',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
        borderRadius: 5,
        marginLeft: 55,
        marginRight: 5,
        marginBottom: 10
    },
    talkImgRight: {
        height: 40,
        width: 40,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        backgroundColor: 'transparent'
    },
    searchBox: {
        height: 40,
        flexDirection: 'row',
        flex: 1,  // 类似于android中的layout_weight,设置为1即自动拉伸填充
        borderRadius: 5,  // 设置圆角边
        backgroundColor: 'white',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    inputText: {
        flex: 1,
        backgroundColor: 'transparent',
        fontSize: 15,
        marginLeft: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#DDD',
        backgroundColor: '#ddd',

    },
    leftName: {
        marginLeft: 5,
        marginRight: 55,
    },
    rightName: {
        marginRight: 5,
        marginLeft: 55,
    },
    leftContent: {
        flexDirection: 'column', alignItems: 'flex-start', flex: 1
    },
    rightContent: {
        flexDirection: 'column', alignItems: 'flex-end', flex: 1
    },
    dateShow: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#DDD',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        display: 'flex'
    },
    dateHide: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#DDD',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        display: 'none'
    },
    progressStyle: {
        marginLeft: 5,
        marginRight: 55,
    },
    showVoice: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        display: 'flex'
    },
    hideVoice: {
        display: 'none'
    },
    showMessage: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        display: 'flex'
    },
    hideMessage: {
        display: 'none'
    },


});

