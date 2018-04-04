/**
 * Created by wufei on 2017/11/18.
 */
// import React, {Component} from 'react';
// import {
//     StyleSheet,
//     TextInput,
//     View,
//     AsyncStorage,
//     Text
// } from 'react-native';
// import Toast, {DURATION}from 'react-native-easy-toast'
// const KEY = 'text';
// export default class Login extends Component {
//
//     constructor(props) {
//         super(props)
//     }
//
//     // onSave() {
//     //     AsyncStorage.setItem(KEY, this.text, (error) => {
//     //         if (!error) {
//     //             this.toast.show('保存成功', DURATION.LENGTH_LONG)
//     //         } else {
//     //             this.toast.show('保存失败', DURATION.LENGTH_LONG)
//     //         }
//     //     })
//     // }
//     //
//     // onRemove() {
//     //     AsyncStorage.removeItem(KEY, (error) => {
//     //         if (!error) {
//     //             this.toast.show('删除成功', DURATION.LENGTH_LONG)
//     //         } else {
//     //             this.toast.show('删除失败', DURATION.LENGTH_LONG)
//     //         }
//     //     })
//     //
//     // }
//     //
//     // onFetch() {
//     //     AsyncStorage.getItem(KEY, (error, result) => {
//     //         if (!error) {
//     //             if (result !== '' && result !== null) {
//     //                 this.toast.show('取出的内容为:' + result);
//     //             } else {
//     //                 this.toast.show('取出的内容不存在');
//     //             }
//     //
//     //         } else {
//     //             this.toast.show('取出失败' + result);
//     //         }
//     //     })
//     // }
//
//
//     render() {
//         return (
//             <View style={styles.container}>
//                 <View style={{height: 64, backgroundColor: '#2196F3'}}>
//                     <Text>AsyncStorage存储</Text>
//                 </View>
//                 <TextInput style={{borderWidth: 1, height: 40}} onChangeText={(text) => this.text = text}/>
//                 <View style={{flexDirection: "row", justifyContent: 'space-around'}}>
//                     <Text style={{fontSize: 20}} onPress={() => this.onSave()}>保存</Text>
//                     <Text style={{fontSize: 20}} onPress={() => this.onRemove()}>删除</Text>
//                     <Text style={{fontSize: 20}} onPress={() => this.onFetch()}>取出</Text>
//                 </View>
//                 <Toast ref={toast => this.toast = toast}/>
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     }
// });
/**
 * Created by wufei on 2017/11/10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Image,
    Text,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import util from './Common/screenUtil'
import DataRepository from './Expand/Dao/DataRepository'

const KEY='USR';

export default class SignScreen extends Component {
    static navigationOptions = ({navigation}) => ({});

    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>我是登录页面</Text>
            </View>
        );
    }

    sign(){

        AsyncStorage.setItem(KEY, this.acco, (error) => {
            if (!error) {
                 // this.toast.show('保存成功', DURATION.LENGTH_LONG)
            } else {
                 // this.toast.show('保存失败', DURATION.LENGTH_LONG)
            }
        })

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center'
    },
    avatarStyle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 50,
        marginBottom: 30
    },
    textInputStyle: {
        height: 38,
        width: util.screenSize.width,
        backgroundColor: 'white',
        marginBottom: 1,
        textAlign: 'center'
    },
    signBtnStyle: {
        height: 35,
        width: util.screenSize.width * 0.9,
        backgroundColor: '#0099CC',
        marginTop: 30,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    settingStyle: {
        flexDirection: 'row',
        width: util.screenSize.width,
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 10
    },
    otherSignStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        left: 20
    },
    otherIconStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 8
    }

});
