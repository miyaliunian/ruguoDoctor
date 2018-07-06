/**
 * Created by wufei on 2018/6/27.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    DeviceEventEmitter,
    Image
} from 'react-native';
import {Toast} from 'teaset'
import theme from '../../config/theme'
import Px2dp from '../../common/px2dp'
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderButtons from 'react-navigation-header-buttons'
import {observer,inject} from 'mobx-react/native'
import {MoreMenu} from "../../config/moreMenu";
@inject('account')
export default class HomeScreen extends Component {

    static navigationOptions = ({navigation})=>( {
        headerTitle:'待办任务',
        headerRight: (
            <HeaderButtons IconComponent={Ionicons} OverflowIcon={<Ionicons name="ios-more" size={23} color= "#cccccc" />} iconSize={23} color={theme.navItemColor}>
                <HeaderButtons.Item title="add" iconName="ios-search" onPress={() => console.warn('add')} />
            </HeaderButtons>
        ),
    })

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener('toastInfoDetail', (info, type) => {
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
        let {account} = this.props;
        this.code = account.code;
        console.log(account)
    }

    componentWillUnmount(){
        this.subscription.remove()
    }

    render() {
        return (
            <View style={theme.root_container}>
                <TouchableOpacity activeOpacity={0.6} onPress={() => this.onDialog(1)}>
                    < Image
                        style={{
                            width: Px2dp(100),
                            height: Px2dp(100),
                            borderRadius: Px2dp(50),
                            borderWidth: 4,
                            borderColor: 'white'
                        }}
                        source={require('../../icons/task_icon/huanglin.png')}/>
                </TouchableOpacity>

            </View>
        );
    }

    onDialog(){
        this.props.navigation.navigate(
            'DoctorDialogueScreen',
            {doctorId: '26988005549745089fb3e5e20ab06794',re_relaId:'9',
                re_patientId:'72c3ebe85e3145768d55e32a60c55da8'})
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.lightBlack,
    }
});

