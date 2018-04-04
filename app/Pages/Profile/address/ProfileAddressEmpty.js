/**
 * Created by yanqizhi on 2017/11/20.
 * 地址管理
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    Platform
} from 'react-native';

import GlobalStyles from '../../../Common/GlobalStyles'
import ViewUtil from '../../../Common/viewUtil'
import Px2dp from '../../../Common/px2dp'
export default class ProfileAddressEmpty extends Component {

    static navigationOptions = ({navigation}) => ({
        headerStyle: {backgroundColor: 'rgb(255,208,96)'},
        headerTitle: '地址管理',
        headerTitleStyle:{alignSelf:'center'},
        headerTintColor: GlobalStyles.headerTintColor,
        headerLeft: (ViewUtil.getLeftButton(navigation.state.params.navigatePressLeft)),
        // headerRight: (
        //     <TouchableOpacity onPress={navigation.state.params.navigatePressRight}>
        //         <View style={{margin: 10}}>
        //             <Text style={styles.title}></Text>
        //         </View>
        //     </TouchableOpacity>
        // )
    });

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            navigatePressLeft: this.navigatePressLeft,
            navigatePressRight: this.navigatePressRight
        })
        // this.loadData();
    }


    navigatePressRight = () => {

        alert('点击headerRight');
        this.props.navigation.goBack();
    };

    navigatePressLeft = () => {


        alert('点击headerLeft');
        if(0 === 0){
            this.props.navigation.goBack();
            return
        }
        Alert.alert(
            '提示',
            '要保存修改吗 ？',
            [
                {text: '不保存', onPress: () => this.props.navigation.goBack(),style: 'cancel'},
                {text: '保存', onPress: () => {this.navigatePressRight()}},
            ],
            { cancelable: false }
        )
    };



    render() {
        return (
            <View style={GlobalStyles.root_container}>
                <View style={{alignItems:"center",marginTop:Px2dp.getHeight(150)}}>
                    <Image source={require('../../../Resource/Imags/ic_shopping_card_bg.png')} resizeMethod='scale'/>
                    <Text style={{color:'rgb(196,196,196)',fontSize:13,marginTop:Px2dp.getHeight(20),marginBottom:Px2dp.getHeight(48)}}>地址为空</Text>
                    <TouchableOpacity>
                        <View style={{backgroundColor:'rgb(255,208,96)',width:Px2dp.getWidth(180),height:Px2dp.getHeight(60),borderRadius:3,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize:14}}>去添加</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    headerBarStyle:{
        backgroundColor: 'rgb(255,208,96)',height:Px2dp.getHeight(148),paddingTop:Px2dp.getHeight(54)
    }
});

