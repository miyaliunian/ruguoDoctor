/**
 * Created by wufei on 2017/12/8.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    DeviceEventEmitter
} from 'react-native';
import Px2dp from '../../../Common/px2dp'
import {MoreMenu} from '../../../Common/MoreMenu'
import ScreenUtil from '../../../Common/screenUtil'
import GlobalStyles from '../../../Common/GlobalStyles'
import DataRepository, {}from '../../../Expand/Dao/DataRepository'
import TopCommonCell from './TopCommonCell'
import ShopItemCommonCell from './ShopItemCommonCell'
import {Carousel} from 'teaset'
import {Config} from '../../../Expand/Dao/Config'

export default class ShopsSction extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,//是否正在加载数据
            genedata: '', //section数据
            smartdata: '', //section数据
            doctordata: '', //section数据
            images: '',  //轮播图
            isShowModal:false
        };
        this.dataRepository = new DataRepository()
    }

    componentDidMount() {
        this.fetchData();
    };

    fetchData() {
        this.setState({
            isLoading: true
        });
        this.dataRepository.postJsonRepository(Config.BASE_URL+Config.API_SHOP_CENTER, {
            accessToken: 'abcdef',
            current: 1,//当前页
            rowCount: 3,//每页显示数
        })
            .then((data) => {
                if (data.success) {
                    let doctorData = JSON.parse(data.doctor);
                    let smartdata = JSON.parse(data.smart);
                    let genedata = JSON.parse(data.gene);
                    this.setState({
                        genedata: genedata,
                        doctordata:doctorData,
                        smartdata:smartdata,
                        images: data.images,
                        isLoading: false //数据加载成功后，隐藏菊花
                    })
                }
            })
            .catch((err) => {
                DeviceEventEmitter.emit('toastInfo', err.status, 'sad');
                this.setState({
                    isLoading: false, //数据加载成功后，隐藏菊花
                    isShowModal:true
                })
            })
    }

    getItem(tab, title, targetUrl) {
        let {navigation} = this.props;
        navigation.navigate(tab, {title: title, targetUrl: targetUrl})
    }

    renderCarousel() {
        let itemImagesArr = [];
        var sectionImagesItem = this.state.images;
        if (sectionImagesItem != '') {
            for (let i = 0; i < sectionImagesItem.length; i++) {
                let data = sectionImagesItem[i];
                itemImagesArr.push(<Image
                    style={{width: ScreenUtil.screenSize.width, height: Px2dp.getHeight(240)}}
                    source={{uri: data.thumb}}
                    key={i}
                />)
            }
        }
        return itemImagesArr
    }

    renderYSFWItem() {
        let itemArr = [];
        var shopSectionItem = this.state.doctordata;
        if (shopSectionItem != '') {
            for (let i = 0; i < shopSectionItem.length; i++) {
                let data = shopSectionItem[i];
                itemArr.push(<ShopItemCommonCell
                    icon={data.thumb}
                    title={data.title}
                    price={data.price}
                    key={i}
                    callback={() => this.onDoctorServiceClick(data.id)}
                />)
            }
        }
        return itemArr
    }
    renderJYJCItem() {
        let itemArr = [];
        var shopSectionItem = this.state.genedata;
        if (shopSectionItem != '') {
            for (let i = 0; i < shopSectionItem.length; i++) {
                let data = shopSectionItem[i];
                itemArr.push(<ShopItemCommonCell
                    icon={data.thumb}
                    title={data.title}
                    price={data.price}
                    key={i}
                    callback={() => this.onClick(data.id)}
                />)
            }
        }
        return itemArr
    }
    renderZNYJItem() {
        let itemArr = [];
        var shopSectionItem = this.state.smartdata;
        if (shopSectionItem != '') {
            for (let i = 0; i < shopSectionItem.length; i++) {
                let data = shopSectionItem[i];
                itemArr.push(<ShopItemCommonCell
                    icon={data.thumb}
                    title={data.title}
                    price={data.price}
                    key={i}
                    callback={() => this.onClick(data.id)}
                />)
            }
        }
        return itemArr
    }

    onClick(title) {
        let {navigation} = this.props;
        navigation.navigate(MoreMenu.Profile.Shop.menu_shop_item_detail, {id: title})
    }

    onDoctorServiceClick(title) {
        let {navigation} = this.props;
        navigation.navigate(MoreMenu.Profile.Shop.menu_shop_doctor_detail, {id: title})
    }

    render() {
        return (
            <View style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Carousel style={{height: Px2dp.getHeight(240), width: ScreenUtil.screenSize.width}}
                                  control={true}>
                            {this.renderCarousel()}
                        </Carousel>
                        <View style={GlobalStyles.line_space_10}/>
                        <TopCommonCell leftIcon={require('../../../Resource/Imags/icon_shop_czws.png')} rightTitle="查看更多"
                                       rightIcon={require('../../../Resource/Imags/ic_shop_moreMenu.png')}
                                       callback={() => this.getItem(MoreMenu.Profile.Shop.menu_shop_doctor_list, '成长卫士', '3s')}/>
                        <View style={GlobalStyles.line}/>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            style={styles.scrollViewStyle}
                            horizontal={true}
                        >
                            {this.renderYSFWItem()}
                        </ScrollView>
                        <View style={GlobalStyles.line_space_10}/>
                        <TopCommonCell leftIcon={require('../../../Resource/Imags/ic_shop_jyjc.png')} rightTitle="查看更多"
                                       rightIcon={require('../../../Resource/Imags/ic_shop_moreMenu.png')}
                                       callback={() => this.getItem(MoreMenu.Profile.Shop.menu_shop_detail, '基因检测', '1')}/>
                        <View style={GlobalStyles.line}/>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            style={styles.scrollViewStyle}
                            horizontal={true}
                        >
                            {this.renderJYJCItem()}
                        </ScrollView>
                        <View style={GlobalStyles.line_space_10}/>
                        <TopCommonCell leftIcon={require('../../../Resource/Imags/ic_shop_znyj.png')} rightTitle="查看更多"
                                       rightIcon={require('../../../Resource/Imags/ic_shop_moreMenu.png')}
                                       callback={() => this.getItem(MoreMenu.Profile.Shop.menu_shop_detail, '智能硬件', '2')}/>
                        <View style={GlobalStyles.line}/>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            style={styles.scrollViewStyle}
                            horizontal={true}
                        >
                            {this.renderZNYJItem()}
                        </ScrollView>

                    </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollViewStyle: {
        height: Px2dp.getHeight(340),
        backgroundColor: 'white',
        paddingLeft: Px2dp.getWidth(25),
        paddingRight: Px2dp.getWidth(5)
    }
});

