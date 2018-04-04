/**
 * Created by hl on 2017/11/29.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    DeviceEventEmitter
} from 'react-native';
import GlobalStyles from '../../../Common/GlobalStyles';
import ViewUtil from '../../../Common/viewUtil'
import Px2dp from '../../../Common/px2dp';
import DataRepository, {FLAG_STORAGE} from '../../../Expand/Dao/DataRepository'
import RiskItemBtn from './RiskItemBtn'
import SubmitBtn from '../../../Component/SubmitBtn'
import NavigationBar from '../../../Component/NavigationBar'
import HealthRecordMobxStore from './HealthRecordMobxStore';
import {observer} from 'mobx-react/native';
import {action, observe} from 'mobx';
// 获取屏幕尺寸
const {width, height} = Dimensions.get('window');
let ScrollItem = require('./ScrollItem.json');
@observer
export default class CompleteHealthRecord extends Component {
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.data = new HealthRecordMobxStore();
    }
    componentDidMount() {
        this.data.replace(ScrollItem.datas)
    };
    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };
    @action
    selectPress(itemData) {
        //this.data.itemPress()
        itemData.isSelect = !itemData.isSelect;
    };
    renderPayCell() {
        let row=[];
        let itemArr = [];
        var dates = this.data.itemData;
        let rowNum = dates.length/3;
        let lastRowNum = dates.length%3;
        for (let i = 0; i < dates.length; i++) {
            let data = dates[i];
            itemArr.push(<RiskItemBtn
                    title={data.title}
                    isSelect={data.isSelect}
                    key={i}
                    callback={() => this.selectPress(data)}
                />
            );
            if(i+lastRowNum%3==dates.length){
                row.push(<View key={i} style={{flexDirection:'row',marginTop:Px2dp.getHeight(40)}}>
                    {itemArr}
                </View>)
            }
            else{

                if((i+1)%3==0){
                    row.push(<View key={i} style={{flexDirection:'row',marginTop:Px2dp.getHeight(40)}}>
                        {itemArr}
                    </View>);
                    itemArr=[];
                }
            }
        }
        return row
    }
    render() {
        //let title = this.props.navigation.state.params.title;
        let title = "完善健康档案";
        return(<View style={[GlobalStyles.root_container,{backgroundColor:'rgb(255,255,255)'}]}>
            <NavigationBar
                statusBar={GlobalStyles.navigationBarColor_yellow}
                style={GlobalStyles.navigationBarColor_yellow}
                leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                title={title}/>
            <ScrollView>
            <View style={{
                alignItems:'center',
                justifyContent:'center',
                width:width,
                height:Px2dp.getHeight(420)
            }}>

                <Image style={{width:Px2dp.getWidth(150),height:Px2dp.getWidth(150),
                    borderRadius:5,marginTop:Px2dp.getHeight(30)}} source={require('../../../Resource/Imags/huanglin.png')}/>
                <Text style={{fontSize:16,marginTop:Px2dp.getHeight(15),fontWeight:'bold',color:'rgb(51,51,51)'}}>李白人</Text>
                <View style={{
                    flexDirection:'row',
                    backgroundColor:'rgb(255,208,96)',
                    padding:5,
                    borderRadius:15,
                    marginTop:Px2dp.getHeight(15)
                }}>
                    <View style={{
                        paddingRight:5,
                        borderRightWidth:0.5,
                        borderRightColor:'#fff',
                    }}>
                        <Text >男</Text>
                    </View>
                    <View style={{
                        paddingLeft:5,
                        paddingRight:5
                    }}>
                        <Text>6个月</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection:'row',
                    padding:5,
                    marginTop:Px2dp.getHeight(16)
                }}>
                    <View style={{marginRight:Px2dp.getWidth(16)}}>
                        <Text>北京市</Text>
                    </View>
                    <View>
                        <Text>海淀区</Text>
                    </View>
                </View>
            </View>

            <View style={{
                flexDirection:'row',
                alignItems:'center',
                borderTopWidth:0.5,
                borderTopColor:'rgb(153,153,153)',
                paddingTop:Px2dp.getHeight(36),
                paddingBottom:Px2dp.getHeight(36)
            }}>
                <View style={{
                    paddingLeft:Px2dp.getHeight(44),
                    width:width/2,
                }}><Text style={{fontSize:16,
                    fontWeight:'bold',
                    color:'rgb(51,51,51)',}}>是否有家族史？</Text></View>
                <View style={{
                    flexDirection:'row',
                    width:width/3,
                    justifyContent:'space-between',
                }}>
                    <TouchableOpacity>
                        <View style={{flexDirection:'row',}}>
                            <Image source={require('../../../Resource/Imags/ic_group_selected.png')}/>
                            <Text style={{marginLeft:Px2dp.getWidth(20)}}>是</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{flexDirection:'row'}}>
                            <Image source={require('../../../Resource/Imags/ic_group_unselect.png')}/>
                            <Text style={{marginLeft:Px2dp.getWidth(20)}}>否</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{
                borderTopWidth:0.5,
                borderTopColor:'rgb(153,153,153)',
                paddingTop:Px2dp.getHeight(36),
                paddingBottom:Px2dp.getHeight(36)
            }}>
                <View style={{
                    paddingLeft:Px2dp.getHeight(44),
                }}><Text style={{fontSize:16,
                    fontWeight:'bold',
                    color:'rgb(51,51,51)',}}>请选择疾病的名称（可多选）：</Text></View>

                    {this.renderPayCell()}

            </View>
        <View style={{alignItems:'center',paddingBottom:Px2dp.getHeight(40)}}>
            <View style={{borderWidth:0.5,borderColor:'rgb(153,153,153)',width:width-2*Px2dp.getHeight(25),borderRadius:5}}>
                <TextInput
                    placeholder='请输入其他疾病名称'
                    underlineColorAndroid='rgb(255,255,255)'
                    placeholderTextColor='rgb(196,196,196)'
                    style={{textAlign: 'center'}}
                />
            </View>
        </View>
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                borderTopWidth:0.5,
                borderTopColor:'rgb(153,153,153)',
                paddingTop:Px2dp.getHeight(36),
                paddingBottom:Px2dp.getHeight(36)
            }}>
                <View style={{
                    paddingLeft:Px2dp.getHeight(44),
                    width:width*2/5,
                }}><Text style={{fontSize:16,
                    fontWeight:'bold',
                    color:'rgb(51,51,51)',}}>是否有家族史？</Text></View>
                <View style={{borderWidth:0.5,borderColor:'rgb(153,153,153)',width:width*3/6,borderRadius:5}}>
                    <TextInput
                        placeholder='请输入其他疾病名称'
                        underlineColorAndroid='rgb(255,255,255)'
                        placeholderTextColor='rgb(196,196,196)'
                        style={{textAlign: 'center'}}
                    />
                </View>
            </View>
                <View style={{height:height/5,backgroundColor:'rgb(230,230,230)',justifyContent:'center'}}>
                    <SubmitBtn txtTitle='保存' styles={{backgroundColor:'#ffd060'}}/>
                </View>
            </ScrollView>
        </View>)
    }
}