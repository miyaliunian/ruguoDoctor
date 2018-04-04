/**
 * Created by wufei on 2017/11/21.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    FlatList,
    Text,
    DeviceEventEmitter,
    ActivityIndicator,
    TouchableWithoutFeedback
} from 'react-native';

import GlobalStyles from '../../Common/GlobalStyles'
import HomeGridView from './HomeGridView'
import ScreenUtil from '../../Common/screenUtil'
import {MoreMenu} from '../../Common/MoreMenu'
import Px2dp from '../../Common/px2dp'
import DailySpecial from './DailySpecial'
import HealthReview from './HealthReview'
import HomeMenuView from './HomeMenuView'
import DataRepository from '../../Expand/Dao/DataRepository'
import {Config} from '../../Expand/Dao/Config'
import Titlear from './Titlear'
import {Paragraph} from '../../Common/Text'
import {Badge} from 'teaset'
import NavigationBar from '../../Component/NavigationBar'
import HealthItem from './HealthItem'

const JSON_DATA = require('./topBgBtn.json');

import {observer, inject} from 'mobx-react/native'

@inject('account')
export default class Rg extends Component {
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.isLoadingMore = false;
        this.state = {
            data: '',
            isLoadingTail: false//标识数据是否加载中
        };
        {
            (this: any).onGridSelected = this.onGridSelected.bind(this)
        }
    }

    componentDidMount() {

        const {account: {code}} = this.props;
        this.fetchData();
    }

    componentWillUnmount() {

    }

    fetchData() {
        this.setState({
            isLoadingTail: true
        });
        let url = 'http://rap2api.taobao.org/app/mock/2902/POST/api/healthTips';
        // this.dataRepository.postJsonRepository(Config.BASE_URL + Config.API_SHOP_CENTER, '')
        this.dataRepository.postJsonRepository(url)
            .then((data) => {
                if (data.success) {
                    this.setState({
                        data: data.datas,
                        isLoadingTail: false //数据加载成功后，隐藏菊花
                    })
                }
            })
            .catch((err) => {
                DeviceEventEmitter.emit('toastInfo', err.status, 'sad');
                this.setState({
                    isLoading: false, //数据加载成功后，隐藏菊花
                })
            })
            .done()
    }

    onRefresh() {

    }

    separatorView = () => {
        return <View style={GlobalStyles.line}/>;
    };

    renderFooter() {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 14}}>~~已经到底啦~~</Text>
            </View>
        )
    }

    onGridSelected(index: number) {
        alert(index)
    }

    onHealthInfo(target) {
        let {navigate} = this.props.navigation;
        navigate(target);
    }

    doSearch(target) {
        let {navigate} = this.props.navigation;
        navigate(target);
    }

    renderHeader() {
        return (
            <View>
                {/*A值动态*/}
                <View style={styles.AValueStyle}>
                </View>
                <HomeMenuView menuInfos={JSON_DATA.datas}/>
                <View style={GlobalStyles.line_space_10}/>
                <DailySpecial/>
                <View style={GlobalStyles.line_space_10}/>
                <HomeGridView infos={JSON_DATA.towItems} onGridSelected={(this.onGridSelected)} {...this.props}/>
                <View style={GlobalStyles.line_space_10}/>
                <HealthReview/>
                <View style={GlobalStyles.line_space_10}/>
                <Titlear txtTitle={'健康资讯'} rightIcon={true}
                         callback={() => this.onHealthInfo(MoreMenu.HomePage.menu_health_info)}/>
            </View>
        )
    }

    renderItem(item) {
        return <HealthItem image={item.item.thumb}
                           title={item.item.title}
                           content={item.item.content}
                           keyword1={item.item.keyword1}
                           keyword2={item.item.keyword2}
                           keyword3={item.item.keyword3}
                           callback={() => this.onHealthItemClick(MoreMenu.HomePage.menu_health_info_detail, item.item.id)}/>
    }

    onHealthItemClick(target, info) {
        this.props.navigation.navigate(target, {id: info})
    }

    switcher(target){
        this.props.navigation.navigate(target)
    }

    render() {
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar
                    statusBar={{backgroundColor: 'rgb(255,208,96)'}}
                    style={{backgroundColor: 'rgb(255,208,96)'}}
                    leftButton={
                        <TouchableOpacity onPress={()=>this.switcher(MoreMenu.HomePage.Switch.menu_home_switch_list)}>
                        <View style={styles.NavigationLeftItem}>
                            <Image source={require('../../Resource/Imags/icon_home_leftnavi.png')}
                                   resizeMode={'center'}/>
                        </View>
                        </TouchableOpacity>
                    }
                    titleView={
                        <TouchableWithoutFeedback onPress={() => this.doSearch(MoreMenu.HomePage.menu_search_list)}>
                            <View style={styles.searchBar}>
                                <Image source={require('../../Resource/Imags/search_icon.png')}
                                       style={styles.searchIcon}/>
                                <Paragraph>搜索</Paragraph>
                            </View>
                        </TouchableWithoutFeedback>
                    }
                    rightButton={
                        <View style={styles.NavigationRightItem}>
                            <Badge count={6} type='capsule' maxCount={99}
                                   style={{position: 'absolute', right: 3, top: -0.5}}/>
                            <Image source={require('../../Resource/Imags/ic_message.png')}/>
                        </View>

                    }
                />
                <FlatList
                    data={this.state.data}
                    renderItem={(item) => this.renderItem(item)}
                    ItemSeparatorComponent={this.separatorView}
                    keyExtractor={(item, index) => index}
                    initialNumToRender={5}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isLoadingTail}
                    ListHeaderComponent={() => this.renderHeader()}
                    ListFooterComponent={() => this.renderFooter()}
                />
            </View>
        );
    }
}

//样式定义
const styles = StyleSheet.create({
    searchBar: {
        width: ScreenUtil.screenSize.width * 0.7,
        height: 30,
        borderRadius: 19,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    searchIcon: {
        width: 20,
        height: 20,
        margin: 5,
    },
    NavigationLeftItem: {
        marginLeft: Px2dp.getWidth(20),
        width: Px2dp.getWidth(80),
        height: Px2dp.getHeight(80),
        justifyContent: 'center',
        alignItems: 'center'
    },
    NavigationRightItem: {
        marginRight: Px2dp.getWidth(20),
        width: Px2dp.getWidth(80),
        height: Px2dp.getHeight(80),
        justifyContent: 'center',
        alignItems: 'center'
    },
    AValueStyle: {
        backgroundColor: 'red',
        width: ScreenUtil.screenSize.width,
        height: 300,
    }
});

