/**
 * Created by hl on 2018-1-8.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
    DeviceEventEmitter,
    TextInput,
    ScrollView
} from 'react-native';

import Px2dp from '../../../Common/px2dp';
import DataRepository from '../../../Expand/Dao/DataRepository'
import {MoreMenu} from '../../../Common/MoreMenu';
// import {Config} from '../../../Expand/Dao/Config';
import GlobalStyles from "../../../Common/GlobalStyles";
import ViewUtil from "../../../Common/viewUtil";
import LoadingModal from '../../../Component/LoadingModal'

export default class SearchList extends Component {
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.state = {
            data: '',
            showModal: false,
            isLoading: false,//标识数据是否加载中
            searchText: ''
        }
    }

    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };

    componentDidMount() {
        // let {tabId, personId} = this.props;/
        // alert(personId)
        // this.fetchData();
    }

    componentWillUnmount() {
    }

    onDeleteSearchText() {
        this.refs.searchTextInput.clear();
        // this.setState({
        //     searchText: ''
        // });
    }

    submitContext(text) {
        // alert(this.state.searchText)
        if (text === '') {
            DeviceEventEmitter.emit('toastInfo', '请输入搜索内容', 'sad');
            return;
        }
        this.state.searchText = text;
        this.setState({
            data: '',
            showModal: false,
            isLoading: true
        });

        // let url = FLAG_STORAGE.serverUrl + "http://10.101.22.208:6080/ruguo-bs/personaldata/momemberbasicinfo/get";
        let url = 'http://rap2api.taobao.org/app/mock/1368/GET/searchList';
        let params = {id: this.state.id};
        this.dataRepository.postJsonRepository(url, params)
            .then((result) => {
                this.setState({
                    isLoading: false
                });
                if (result.status === 'success') {
                    if (result.data && result.data.goodsList.length === 0 && result.data.newsList.length === 0 && result.data.questionnaireList.length === 0) {
                        this.setState({
                            showModal: true,
                        });
                    } else {
                        this.setState({
                            data: result.data,
                        });
                    }

                } else {
                    DeviceEventEmitter.emit('toastInfo', result.msg, 'fail');
                }
            })
            .catch(error => {
                this.setState({
                    isLoading: false
                });
                DeviceEventEmitter.emit('toastInfo', error.status, 'fail');
            })
            .done();
    }

    showListMore(type) {
        // alert(this.state.searchText);
        // return;
        let menu = '';
        if (type === 0) {//商品更多列表
            menu = MoreMenu.HomePage.menu_goods_search_list;
        } else if (type === 1) {//资讯更多列表
            menu = MoreMenu.HomePage.menu_news_search_list;
        } else if (type === 2) {//问卷更多列表
            menu = MoreMenu.HomePage.menu_ques_search_list;
        }
        this.props.navigation.navigate(menu, {searchText: this.state.searchText});
    }

    render() {
        // let {tabId} = this.props;
        return (
            <View style={styles.container}>
                <NavigationBar
                    statusBar={GlobalStyles.navigationBarColor_yellow}
                    style={GlobalStyles.navigationBarColor_yellow}
                    titleView={
                        <View style={styles.searchBar}>
                            <Image source={require('../../../Resource/Imags/ic_search.png')}
                                   style={styles.searchIcon}/>
                            <TextInput style={styles.TextInputStyle} maxLength={20}
                                       underlineColorAndroid='rgb(255,255,255)'
                                       placeholderTextColor='rgb(196,196,196)'
                                       placeholder='请输入'
                                       autoFocus={true}
                                // onFocus={() => {
                                //     Picker.hide()
                                // }}
                                //        onChangeText={(text) => {
                                //            this.state.searchText = text
                                //        }}
                                       returnKeyType={'search'}
                                       onSubmitEditing={(event) => this.submitContext( // 数据提交
                                           event.nativeEvent.text
                                       )}
                                       ref='searchTextInput'
                            />
                            <TouchableOpacity onPress={() => this.onDeleteSearchText()}>
                                <Image source={require('../../../Resource/Imags/ic_search_delete.png')}
                                       style={styles.searchDeleteIcon}/>
                            </TouchableOpacity>
                        </View>
                    }
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    rightButton={ViewUtil.getRightButton(title='取消',() => this.navigatePressLeft())}

                />
                {/*<FlatList*/}
                {/*data={this.state.data}*/}
                {/*ListEmptyComponent={() => this.renderListEmptyComponent()}*/}
                {/*renderItem={(rowData) => this.renderRow(rowData)}*/}
                {/*keyExtractor={(item, index) => index}*/}
                {/*onRefresh={() => this.onRefresh()}*/}
                {/*refreshing={this.state.refreshing}*/}
                {/*onEndReachedThreshold={0.1}*/}
                {/*onEndReached={() => this.fetchMoreData()}*/}
                {/*ListFooterComponent={() => this.renderFooter()}/>*/}
                <ScrollView style={{flex: 1}}>
                    {this.state.showModal ?
                        <View style={{alignItems: 'center', marginTop: Px2dp.getHeight(100)}}>
                            <Image source={require('../../../Resource/Imags/ic_default_search.png')}/>
                            <Text style={{
                                fontSize: 14,
                                color: 'rgb(153,153,153)', marginTop: Px2dp.getHeight(30)
                            }}>抱歉，没有更多搜索结果~</Text>
                        </View> :

                        <View>
                            {this.state.data !== '' && this.state.data.goodsList.length > 0 ?
                                <View>
                                    <SearchTypeRowItem label='商品' textRight='更多' onPress={() => this.showListMore(0)}/>
                                    <GoodRowItem goodsList={this.state.data.goodsList}/>
                                </View> : <View/>}

                            {this.state.data !== '' && this.state.data.newsList.length > 0 ?
                                <View>
                                    <SearchTypeRowItem label='资讯' textRight='更多' onPress={() => this.showListMore(1)}/>
                                    <NewsRowItem newsList={this.state.data.newsList}/>
                                </View> : <View/>}

                            {this.state.data !== '' && this.state.data.questionnaireList.length > 0 ?
                                <View>
                                    <SearchTypeRowItem label='问卷' textRight='更多' onPress={() => this.showListMore(2)}/>
                                    <QuestionnaireRowItem goodsList={this.state.data.questionnaireList}/>
                                </View> : <View/>}
                        </View>
                    }
                </ScrollView>
                <LoadingModal txtTitle='正在查询' visible={this.state.isLoading}/>
            </View>
        )
    }


}

// 分类
class SearchTypeRowItem extends Component {
    static propTypes = {
        // labelImg: PropTypes.number,
        // label: PropTypes.string.isRequired,
        // textLeft: PropTypes.string,
        // textRight: PropTypes.string,
        // onPress: PropTypes.func,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {labelImg, label, textLeft, textRight, onPress} = this.props;
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.row}>
                    <View style={styles.rowLeft}>
                        {/*<Image source={labelImg} style={styles.imgLeft}/>*/}
                        <Text style={styles.fontLabel}>{label}</Text>
                    </View>
                    <View style={styles.rowContent}>
                        {/*<Text style={styles.fontTextLeft}>{textLeft}</Text>*/}
                        <Text style={styles.fontTextRight}>{textRight}</Text>
                        <Image source={require('../../../Resource/Imags/icon_arrow_black.png')}
                               style={styles.imgRight}/>
                    </View>
                </View>
                {/*<View style={styles.line}/>*/}
            </TouchableOpacity>
        );
    }
}

// 商品列表
class GoodRowItem extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        // goodsList: PropTypes.array
    };

    showDetail = (itemId) => {
        alert(itemId);
        return;
        let menu = MoreMenu.Profile.Record.Report.menu_questionnaire_report;
        let title = '商品详情';
        this.props.navigation.navigate(menu, {
            title: title,
            personId: this.props.personId,
        });
    };

    renderList(list) {
        return list.map(item => this.renderItem(item));
    }

    renderItem(good) {
        return (
            <TouchableOpacity onPress={() => this.showDetail(good.id)} key={good.id}>
                <View style={styles.rowCenter} key={good.id}>
                    {good.goodsMainPicUrl ?
                        <Image source={{uri: good.goodsMainPicUrl}}
                               style={styles.productImage} resizeMode={'stretch'}/>
                        :
                        <Image source={require('../../../Resource/Imags/mycenter_bg_botton.png')}
                               style={styles.productImage} resizeMode={'stretch'}/>
                    }
                    <View style={styles.productContent}>
                        <View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.productTitle}>{good.goodsName}</Text>
                                <Text style={styles.productTitleSub}>
                                    {good.goodsTitle === '' || good.goodsTitle == null ? '' : '(' + good.goodsTitle + ')'}
                                </Text>
                            </View>
                            <View style={styles.productContentLine2}>
                                <Text style={styles.productDescribe} numberOfLines={2}>{good.goodsDescribe}</Text>
                            </View>
                        </View>
                        <View style={styles.productContentLine3}>
                            <Text style={styles.productPriceTotal}>￥{good.goodsPrice}</Text>
                            {/*<Text style={styles.productCount}>x{good.goodsUintNum}</Text>*/}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        );
    }

    render() {
        const {goodsList} = this.props;
        return <View>
            {this.renderList(goodsList)}
        </View>
    }

}

// 资讯列表
class NewsRowItem extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        // goodsList: PropTypes.array
    };

    showDetail = (itemId) => {
        alert(itemId);
        return;
        let menu = MoreMenu.HomePage.menu_news_search_list;
        let title = '资讯详情';
        this.props.navigation.navigate(menu, {
            title: title,
            personId: this.props.personId,
        });
    };

    renderList(list) {
        return list.map(item => this.renderItem(item));
    }

    renderItem(news) {
        return (
            <TouchableOpacity onPress={() => this.showDetail(news.id)} key={news.id}>
                <View style={styles.rowCenter} key={news.id}>
                    {news.newsMainPicUrl ?
                        <Image source={{uri: news.newsMainPicUrl}}
                               style={styles.newsImage} resizeMode={'stretch'}/>
                        :
                        <Image source={require('../../../Resource/Imags/mycenter_bg_botton.png')}
                               style={styles.newsImage} resizeMode={'stretch'}/>
                    }
                    <View style={styles.newsContent}>
                        <View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.newsTitle}>{news.newsTitle}</Text>
                                {/*<Text style={styles.newsTitleSub}>*/}
                                {/*{good.goodsTitle === '' || good.goodsTitle == null ? '' : '(' + good.goodsTitle + ')'}*/}
                                {/*</Text>*/}
                            </View>
                            <View style={styles.newsContentLine2}>
                                <Text style={styles.newsDescribe} numberOfLines={2}>{news.newsDescribe}</Text>
                            </View>
                        </View>
                        <View style={styles.newsContentLine3}>
                            <Text style={styles.newsKeyword}>{news.newsKeyword}</Text>
                            {/*<Text style={styles.productCount}>x{good.goodsUintNum}</Text>*/}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const {newsList} = this.props;
        return <View>
            {this.renderList(newsList)}
        </View>
    }

}

// 问卷列表
class QuestionnaireRowItem extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        // goodsList: PropTypes.array
    };

    showDetail = (itemId) => {
        alert(itemId);
        return;
        let menu = MoreMenu.HomePage.menu_ques_search_list;
        let title = '问卷详情';
        this.props.navigation.navigate(menu, {
            title: title,
            personId: this.props.personId,
        });
    };

    renderList(list) {
        return list.map(item => this.renderItem(item));
    }

    renderItem(item) {
        return (
            <TouchableOpacity onPress={() => this.showDetail(item.id)} key={item.id}>
                <View style={[styles.queRow]}>
                    <View style={styles.rowLeft}>
                        <Text style={styles.queFontLabel}>{item.quesTitle}</Text>
                    </View>
                    <View style={styles.rowContent}>
                        <Image source={require('../../../Resource/Imags/icon_arrow_black.png')}
                               style={styles.queImgRight}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const {goodsList} = this.props;
        return <View>
            {this.renderList(goodsList)}
        </View>
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(244,244,244)',
    },
    searchBar: {
        flexDirection: 'row',
        backgroundColor: 'rgb(255,255,255)',
        // width: ScreenUtil.screenSize.width * 0.7,
        width: Px2dp.getWidth(520),
        height: Px2dp.getHeight(56),
        borderRadius: Px2dp.getHeight(28),
        // borderWidth:1,
        alignItems: 'center',
    },
    searchIcon: {
        width: Px2dp.getWidth(24),
        height: Px2dp.getHeight(24),
        margin: Px2dp.getWidth(20),
    },
    searchDeleteIcon: {
        width: Px2dp.getWidth(28),
        height: Px2dp.getHeight(28),
        marginRight: Px2dp.getWidth(20),
    },
    TextInputStyle: {
        backgroundColor: 'white',
        width: Px2dp.getWidth(408),
        height: Px2dp.getHeight(56),
        padding: 0,
        fontSize: 13,
        color: 'rgb(51,51,51)'
    },
    // 分类
    row: {
        backgroundColor: 'rgb(244,244,244)',
        height: Px2dp.getHeight(60),
        // borderWidth: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowLeft: {
        justifyContent: 'center',
        flexDirection: 'column',
        // flexDirection: 'row',
        // alignItems: 'center'
    },
    fontLabel: {
        marginLeft: Px2dp.getWidth(30),
        fontSize: 11,
        color: 'rgb(51,51,51)'
    },
    fontTextRight: {
        marginLeft: Px2dp.getWidth(30),
        fontSize: 11,
        color: 'rgb(196,196,196)'
    },

    fontLabelSub: {
        marginLeft: Px2dp.getWidth(30),
        fontSize: 11,
        color: 'rgb(153,153,153)'
    },
    rowContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        height: Px2dp.getHeight(10),
        backgroundColor: 'rgb(244,244,244)',
        marginLeft: Px2dp.getWidth(30)
    },
    imgRight: {
        marginLeft: Px2dp.getWidth(10),
        marginRight: Px2dp.getWidth(30),
        height: Px2dp.getHeight(20),
        width: Px2dp.getWidth(20),
        tintColor: 'rgb(196,196,196)'
    },
    loadingMore: {
        marginVertical: 20,
    },
    loadingText: {
        color: '#777',
        textAlign: 'center'
    },
    //商品
    rowCenter: {
        paddingVertical: Px2dp.getWidth(20),
        paddingHorizontal: Px2dp.getWidth(30),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(244,244,244)',
        backgroundColor: 'rgb(255,255,255)',
        // borderWidth:1
    },
    productImage: {
        height: Px2dp.getHeight(140),
        width: Px2dp.getWidth(140),
    },
    productContent: {
        flex: 1,
        height: Px2dp.getHeight(140),
        marginLeft: Px2dp.getWidth(30),
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    productContentLine2: {
        flexDirection: 'row',
    },
    productContentLine3: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    productTitle: {
        fontSize: 17,
        color: 'rgb(51,51,51)',
    },
    productTitleSub: {
        fontSize: 17,
        color: 'rgb(153,153,153)',
        marginLeft: Px2dp.getWidth(10)
    },
    productDescribe: {
        fontSize: 15,
        color: 'rgb(196,196,196)'
    },
    productPriceTotal: {
        fontSize: 15,
        color: 'rgb(239,94,82)',
        textAlignVertical: 'bottom',
    },

    //资讯
    newsImage: {
        height: Px2dp.getHeight(140),
        width: Px2dp.getWidth(140),
    },
    newsContent: {
        flex: 1,
        height: Px2dp.getHeight(140),
        marginLeft: Px2dp.getWidth(30),
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    newsContentLine2: {
        flexDirection: 'row',
    },
    newsContentLine3: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    newsTitle: {
        fontSize: 17,
        color: 'rgb(51,51,51)',
    },
    newsTitleSub: {
        fontSize: 17,
        color: 'rgb(153,153,153)',
        marginLeft: Px2dp.getWidth(10)
    },
    newsDescribe: {
        fontSize: 15,
        color: 'rgb(196,196,196)'
    },
    newsKeyword: {
        fontSize: 15,
        color: 'rgb(255,208,96)',
        textAlignVertical: 'bottom',
    },
    //问卷
    queRow: {
        backgroundColor: 'rgb(255,255,255)',
        height: Px2dp.getHeight(80),
        // borderWidth: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(244,244,244)',
    },
    queFontLabel: {
        marginLeft: Px2dp.getWidth(30),
        fontSize: 15,
        color: 'rgb(51,51,51)'
    },
    queImgRight: {
        marginLeft: Px2dp.getWidth(10),
        marginRight: Px2dp.getWidth(30),
        height: Px2dp.getHeight(28),
        width: Px2dp.getWidth(28),
        tintColor: 'rgb(196,196,196)'
    },
});