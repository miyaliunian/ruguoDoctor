import React, { Component } from 'react';
import { AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    Platform,
    ScrollView,
    PermissionsAndroid, } from 'react-native';

import Px2dp from '../../../Common/px2dp'
import ViewUtil from '../../../Common/viewUtil'
import GlobalStyles from '../../../Common/GlobalStyles'
import PercentageCircle from 'react-native-percentage-circle';
// let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';
// 目录/data/user/0/com.opms_rn/files/test.aac

export default class TestRecordAudio extends Component {

    static navigationOptions = ({navigation}) => ({
        headerStyle: {backgroundColor: 'rgb(255,255,255)',height:Px2dp.getHeight(148),paddingTop:Px2dp.getHeight(54)},
        headerTitle: '客服小果',
        headerTitleStyle:{alignSelf:'center'},
        headerTintColor: GlobalStyles.headerTintColor,
        headerLeft: (ViewUtil.getLeftButton(navigation.state.params.navigatePressLeft)),
        headerRight: (
            <TouchableOpacity onPress={navigation.state.params.navigatePressRight}>
                <View style={{margin: 10}}>
                    <Image
                        style={{width: Px2dp.getWidth(44), height: Px2dp.getHeight(44), marginLeft: Px2dp.getWidth(30)}}
                        source={require('../../../Resource/Imags/ic_tel.png')}
                        resizeMethod='scale'
                    />
                </View>
            </TouchableOpacity>
        )
    });

    constructor(props) {
        super(props);
    }
    render() {

        return (
            <ScrollView  style={styles.container}>

            </ScrollView >
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2b608a",
    },
    controls: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    progressText: {
        paddingTop: 50,
        fontSize: 50,
        color: "#fff"
    },
    button: {
        padding: 20
    },
    disabledButtonText: {
        color: '#eee'
    },
    buttonText: {
        fontSize: 20,
        color: "#fff"
    },
    activeButtonText: {
        fontSize: 20,
        color: "#B81F00"
    }

});
