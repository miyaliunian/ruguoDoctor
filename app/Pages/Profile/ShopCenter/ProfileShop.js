/**
 * Created by wufei on 2017/12/8.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';


import ViewUtil from '../../../Common/viewUtil'
import GlobalStyles from '../../../Common/GlobalStyles'
import NavigationBar from '../../../Component/NavigationBar'
import ShopsSction from './ShopsSction'
export default class ProfileShop extends Component {

    constructor(props) {
        super(props)
    }

    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar
                    statusBar={{backgroundColor:'rgb(255,208,96)'}}
                    style={{backgroundColor: 'rgb(255,208,96)'}}
                    leftButton={ViewUtil.getLeftButton(()=>this.navigatePressLeft())}
                    title={'健康商城'}/>
                <ShopsSction {...this.props}/>
            </View>
        );
    }
}


