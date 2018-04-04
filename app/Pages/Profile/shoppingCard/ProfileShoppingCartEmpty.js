/**
 * Created by wufei on 2017/11/20.
 * 购物车
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';


import NavigationBar from '../../../Component/NavigationBar'
import GlobalStyles from '../../../Common/GlobalStyles'
import ViewUtil from '../../../Common/viewUtil'
import Px2dp from '../../../Common/px2dp'
export default class ProfileShoppingCartEmpty extends Component {

    // static navigationOptions = ({navigation}) => ({
    //     headerStyle: {backgroundColor: 'rgb(255,208,96)'},
    //     headerTitle: '购物车',
    //     headerTitleStyle:{alignSelf:'center'},
    //     headerTintColor: GlobalStyles.headerTintColor,
    //     headerLeft: (ViewUtil.getLeftButton(navigation.state.params.navigatePressLeft)),
    //
    // });

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            navigatePressLeft: this.navigatePressLeft,

        });

        setTimeout(()=>{
            this.props.navigation.navigate('menu_shopping_cart')
        },2000)

    }

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
                <NavigationBar
                    statusBar={{backgroundColor:'rgb(255,208,96)'}}
                    style={{backgroundColor: 'rgb(255,208,96)'}}
                    leftButton={ViewUtil.getLeftButton(()=>this.navigatePressLeft())}
                    title={'购物车'}/>
                    <View style={{alignItems:"center",marginTop:Px2dp.getHeight(150)}}>
                        <Image source={require('../../../Resource/Imags/ic_shopping_card_bg.png')} resizeMethod='scale'/>
                        <Text style={{color:'rgb(196,196,196)',fontSize:13,marginTop:Px2dp.getHeight(20),marginBottom:Px2dp.getHeight(48)}}>购物车为空</Text>
                        <TouchableOpacity>
                        <View style={{backgroundColor:'rgb(255,208,96)',width:Px2dp.getWidth(180),height:Px2dp.getHeight(60),borderRadius:3,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize:14}}>去逛逛</Text>
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

