/**
 * Created by wufei on 2017/11/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    FlatList,
    DeviceEventEmitter
} from 'react-native';
import {observer} from 'mobx-react/native';
import {action, autorun} from 'mobx';
import MobxStore from './MobxStore';

import Px2dp from '../../../Common/px2dp'
import GlobalStyles from '../../../Common/GlobalStyles'
import ViewUtil from '../../../Common/viewUtil'
import SubmitBtn from '../../../Component/SubmitBtn'
import ProfileAddressComponent from './ProfileAddressComponent';
import DataRepository, {FLAG_STORAGE} from '../../../Expand/Dao/DataRepository'
import LoadingModal from '../../../Component/LoadingModal'
import NavigationBar from '../../../Component/NavigationBar'
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
let jsonData = require('./address.json');

@observer
export default class ProfileAddress extends Component {
    fechAddressListData(){
        this.setState({
            showModal: true
        });
        let url = FLAG_STORAGE.serverUrl + "/personaldata/momemberaddresslist/findAllList";
        let params = {memberCode: '5eebe460bf2b458fb7a0a2101768599b'};
        this.dataRepository.postJsonRepository(url, params)
            .then((response) => {
                this.setState({
                    showModal: false
                });
                if (response.status === 'success') {
                    console.log(response);
                    this.setState({
                        flagData : true
                    });
                    jsonData = response.data;
                    this.data.replace(jsonData);

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
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.data = new MobxStore();
        this.state = {
            showModal: false,
            flagData : false
        }
    };
    componentWillMount(){
        this.fechAddressListData();
    }
    componentDidMount() {

    };
    componentWillUnmount(){

    }

    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };
    renderItem = (item) => {
        return (
            <ProfileAddressComponent itemData={ item } data={ this.data }{...this.props} />
        )
    };
    keyExtractor = (item) => item.personName;
    render() {
        if(this.state.flagData){
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end'
                }}>
                    <NavigationBar
                        statusBar={{backgroundColor:'rgb(255,208,96)'}}
                        style={{backgroundColor: 'rgb(255,208,96)'}}
                        leftButton={ViewUtil.getLeftButton(()=>this.navigatePressLeft())}
                        title={'地址管理'}/>
                    <FlatList
                        data={this.data.itemData}
                        renderItem={ ({item}) => this.renderItem(item) }
                        keyExtractor={ this.keyExtractor }
                    />


                    <SubmitBtn  onSubmit={() => this.formSubmit()} styles={{backgroundColor: 'rgb(255,208,96)',marginBottom:5,marginTop:5}}
                                txtTitle='添加地址'/>

                    <LoadingModal txtTitle='正在加载' visible={this.state.showModal}/>
                </View>
            );
        }else{
            return (
                <View style={GlobalStyles.root_container}>

                    <NavigationBar
                        statusBar={{backgroundColor:'rgb(255,208,96)'}}
                        style={{backgroundColor: 'rgb(255,208,96)'}}
                        leftButton={ViewUtil.getLeftButton(()=>this.navigatePressLeft())}
                        title={'地址管理'}/>

                    <View style={{alignItems:"center",marginTop:Px2dp.getHeight(150)}}>
                        <Image source={require('../../../Resource/Imags/ic_shopping_card_bg.png')} resizeMethod='scale'/>
                        <Text style={{color:'rgb(196,196,196)',fontSize:13,marginTop:Px2dp.getHeight(20),marginBottom:Px2dp.getHeight(48)}}>地址为空</Text>
                        <TouchableOpacity onPress={() => this.formSubmit(this.itemData)}>
                            <View style={{backgroundColor:'rgb(255,208,96)',width:Px2dp.getWidth(180),height:Px2dp.getHeight(60),borderRadius:3,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:14}}>去添加</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <LoadingModal txtTitle='正在加载' visible={this.state.showModal}/>
                </View>
            );
        }



    }
    formSubmit(){
        this.props.navigation.navigate('addressAdd', {...this.props})
    }
    selectPress(obj) {

        let newData = [];

        for(var i=0;i<this.data.itemData.datas.length;i++){

            if(obj.id==this.data.itemData.datas[i].id){
                this.data.itemData.datas[i].isSelect = true;
            }else{
                this.data.itemData.datas[i].isSelect = false;
            }
        }
        newData = this.data.itemData.datas;
        this.setState({data: newData});

    };

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C6E2FF',
    },
    txt: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 30,
    },
    btn: {
        width: '100%',
        height: Px2dp.getHeight(80),
        backgroundColor: 'rgb(255,208,96)',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    btnText: {
        fontSize: 14
    }
});

