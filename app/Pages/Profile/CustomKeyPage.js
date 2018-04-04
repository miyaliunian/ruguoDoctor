/**
 * Created by wufei on 2017/11/18.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';

import CheckBox from 'react-native-check-box'

import ViewUtil from '../../Common/viewUtil'
import ArrayUtil from '../../Common/arrayUtil'

import LanguageDao, {FLAG_LANGUAGE} from '../../Expand/Dao/LanguageDao'


export default class CustomKeyPage extends Component {

    static navigationOptions = ({navigation}) => ({
        headerStyle: {backgroundColor: 'blue'},
        headerTitle: navigation.state.params.title,
        headerTintColor: 'red',
        headerLeft: (ViewUtil.getLeftButton(navigation.state.params.navigatePressLeft)),
        headerRight: (
            <TouchableOpacity onPress={navigation.state.params.navigatePressRight}>
                <View style={{margin: 10}}>
                    <Text style={styles.title}>保存</Text>
                </View>
            </TouchableOpacity>
        )
    });

    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.changeValues=[];
        this.state = {
            dataArray: []
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            navigatePressLeft: this.navigatePressLeft,
            navigatePressRight: this.navigatePressRight
        });
        this.loadData();
    }


    navigatePressRight = () => {
        debugger;
        alert('点击headerRight');
        if(this.changeValues.length === 0){
            this.props.navigation.goBack();
            return
        }
        this.languageDao.save(this.state.dataArray);
        this.props.navigation.goBack();
    };

    navigatePressLeft = () => {
        // alert('点击headerLeft');
        // if(this.changeValues.length === 0){
        //     this.props.navigation.goBack();
        //     return
        // }
        // this.languageDao.save(this.state.dataArray)
        // this.props.navigation.goBack();

        alert('点击headerLeft');
        if(this.changeValues.length === 0){
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

    loadData() {
        this.languageDao.fetch()
            .then(result => {
                this.setState({
                    dataArray: result
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    renderView() {

        if (!this.state.dataArray || this.state.dataArray.length === 0) return null;

        let len = this.state.dataArray.length;

        let views = [];

        for (let i = 0, l = len - 2; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i + 1])}
                    </View>
                    <View style={styles.line}></View>
                </View>
            )
        }

        return views
    }

    renderCheckBox(data) {
        let leftText = data.name;
        return (
            <CheckBox
                style={{flex:1,padding:10}}
                onClick={() => this.onClick(data)}
                leftText={leftText}
                isChecked={data.checked}
                checkedImage={<Image style={{tintColor:'#6495ED'}} source={require('../../Resource/Imags/ic_star.png')}/>}
                unCheckedImage={<Image style={{tintColor:'#6495ED'}} source={require('../../Resource/Imags/ic_tiaozhuan.png')}/>}/>
        )
    }

    onClick(data){
        data.checked=!data.checked;
        ArrayUtil.updateArray(this.changeValues,data);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.renderView()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 20,
        color: 'white'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    line: {
        height: 0.3,
        backgroundColor: 'darkgray',

    }
});

