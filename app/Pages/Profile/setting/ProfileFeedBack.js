/**
 * Created by wufei on 2017/11/28.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    DeviceEventEmitter,
    Platform
} from 'react-native';
import GlobalStyles from '../../../Common/GlobalStyles'
import Px2dp from '../../../Common/px2dp'
import ViewUtil from '../../../Common/viewUtil'
import NavigationBar from '../../../Component/NavigationBar'
import SubmitBtn from '../../../Component/SubmitBtn'
import LoadingModal from '../../../Component/LoadingModal'
import DataRepository from '../../../Expand/Dao/DataRepository'
import {Config} from '../../../Expand/Dao/Config'
export default class ProfileFeedBack extends Component {
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.state = {
            feedBack: '',
            showModal: false,
        }
    }

    textInputsBlur() {
        this.refs.textInput.blur()
    }


    navigatePressLeft = () => {
        this.textInputsBlur();
        this.props.navigation.goBack();
    };

    formSubmit() {
        this.textInputsBlur();
        const {state, goBack} = this.props.navigation;
        const params = state.params || {};

        if (this.state.feedBack === '') {
            DeviceEventEmitter.emit('toastInfo', '请输入意见内容', 'stop');
            return;
        }
        this.setState({
            showModal: true
        });
        let obj = {};
        obj.feedbackType = '0';
        obj.memberCode = 'ABC123456';
        obj.document = this.state.feedBack;
        let url = Config.BASE_URL + Config.API_PROFILE_FEEDBACK;
        // let url = 'http://10.101.2.226:6080/ruguo-bs/personaldata/momemberfeedback/save';
        this.dataRepository.postJsonRepository(url, obj)
            .then((response) => {
                this.setState({
                    showModal: false
                });
                if (response.status === 'success') {
                    DeviceEventEmitter.emit('toastInfo', response.msg, 'success');
                    goBack(params.go_back_key);
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

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    statusBar={{backgroundColor: 'rgb(255,208,96)'}}
                    style={{backgroundColor: 'rgb(255,208,96)'}}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    title={'意见反馈'}/>
                <TextInput style={{
                    marginLeft: Px2dp.getWidth(25),
                    marginTop: Px2dp.getHeight(30),
                    marginRight: Px2dp.getWidth(25),
                    height: Px2dp.getHeight(300),
                    borderWidth: 1,
                    borderColor: 'rgba(190,190,190,0.5)',
                    color: '#333',
                    textAlignVertical: 'top'
                }}
                           ref="textInput"
                           placeholder='您的意见/建议'
                           placeholderTextColor='rgb(228,228,228)'
                           multiline={true}
                           underlineColorAndroid='rgb(255,255,255)'
                           returnKeyType='done'
                           maxLength={500}
                           onChangeText={(text) => this.setState({feedBack: text})}
                />
                <View style={{marginLeft: Px2dp.getWidth(25), marginTop: Px2dp.getHeight(25)}}>
                    <Text
                        style={{fontSize: 12, color: 'rgb(153,153,153)'}}>请输入你的意见和建议，工作人员会在第一时间内评估处理!</Text>
                </View>

                <SubmitBtn onSubmit={() => this.formSubmit()}
                           styles={{backgroundColor: 'rgb(255,208,96)', marginTop: Px2dp.getHeight(103)}}
                           txtTitle='提交'/>
                <LoadingModal txtTitle='正在提交' visible={this.state.showModal}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

