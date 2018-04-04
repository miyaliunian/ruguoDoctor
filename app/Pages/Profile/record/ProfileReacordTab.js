/**
 * Created by hl on 2017/12/4.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
    DeviceEventEmitter,
    ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types'

import GlobalStyles from '../../../Common/GlobalStyles';
import Px2dp from '../../../Common/px2dp';
import DataRepository from '../../../Expand/Dao/DataRepository'
import {MoreMenu} from '../../../Common/MoreMenu';
import {Config} from '../../../Expand/Dao/Config';

const CACHE_RESULTS = {
    current: 1,//当前页
    rowCount: 10,//每页显示数
    total: 0,//总记录数
    rows: [],//数据集
};
export default class ProfileRecordTab extends Component {
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.isLoadingMore = false;
        this.state = {
            data: '',
            isLoadingTail: false,//标识数据是否加载中
            refreshing: false, //初始化不刷新
        }
    }

    componentDidMount() {
        let {tabId} = this.props;
        if (tabId === '2') {
            this.fetchData();
        }
    }

    componentWillUnmount() {
        this.clean()
    }

    onPress1 =(id)=> {
        alert(id)
    };

    showReport = (reportNo) => {
        let menu;
        let title = '';
        if (reportNo === '0') {
            menu = MoreMenu.Profile.Record.Report.menu_questionnaire_report;
            title = '问卷报告';
        } else if (reportNo === '1') {
            menu = MoreMenu.Profile.Record.Report.menu_questionnaire_report;
            title = '体检报告';
        } else if (reportNo === '2') {
            menu = MoreMenu.Profile.Record.Report.menu_questionnaire_report;
            title = '基因报告';
        }
        this.props.navigation.navigate(menu, {
            title: title,
            personId: this.props.personId,
        });
    };

    fetchData() {
        this.isLoadingMore = true;
        // 请求数据时显示菊花
        this.setState({
            isLoadingTail: true,
        });
        // Config.BASE_URL+Config.API_SHOP_CENTER_TYPE3
        let uri = 'http://rap2api.taobao.org/app/mock/1368/GET/mycase';
        this.dataRepository.postJsonRepository(uri, {
            accessToken: '22',
            current: CACHE_RESULTS.current,//当前页
            rowCount: CACHE_RESULTS.rowCount,//每页显示数
        })
            .then((data) => {
                if (data.status) {

                    let item = CACHE_RESULTS.rows.slice();
                    item = item.concat(data.rows);
                    CACHE_RESULTS.rows = item;
                    CACHE_RESULTS.current += 1;
                    CACHE_RESULTS.total = data.total;
                    this.setState({
                        data: CACHE_RESULTS.rows,
                        isLoadingTail: false, //数据请求成功后隐藏菊花
                        refreshing: false
                    });
                    this.isLoadingMore = false;
                } else {

                }
            })
            .catch((error) => {
                DeviceEventEmitter.emit('toastInfo', error.status, 'fail');
                this.setState({
                    data: CACHE_RESULTS.rows,
                    isLoadingTail: false,//数据请求失败后隐藏菊花
                    refreshing: false
                });
                this.isLoadingMore = false;
            });
    }

    hasMore =()=> {
        return CACHE_RESULTS.rows.length !== CACHE_RESULTS.total
    };

    fetchMoreData() {
        if (this.isLoadingMore) {
            return;
        }
        if (!this.hasMore() || this.state.isLoadingTail) {
            return
        }
        this.isLoadingMore = true;
        this.fetchData();
    }

    clean = () => {
        CACHE_RESULTS.rows = [];
        CACHE_RESULTS.current = 1;
        CACHE_RESULTS.total = 0
    };

    //返回每一行cell的样式
    renderRow(rowData) {
        return (
            <RecordRowItemBL label={rowData.item.title} labelDownText={rowData.item.date}
                             onPress={() => this.onPress1(rowData.item.id)}/>
        );
    }

    // separatorView = () => {
    //     return <View style={GlobalStyles.line}/>;
    // };

    renderListEmptyComponent() {
        return (
            this.state.data ?
                <View style={{alignItems: 'center', marginTop: Px2dp.getHeight(100)}}>
                    <Image source={require('../../../Resource/Imags/ic_default_bl.png')}/>
                </View>
                : <View/>
        )
    }

    onRefresh() {
        if (this.isLoadingMore) {
            return;
        }
        this.setState({
            data: '',
        });
        this.clean();
        this.fetchData();
    }

    renderFooter() {
        if (!this.hasMore() && CACHE_RESULTS.total !== 0) {
            return (
                <View style={{alignItems: 'center', justifyContent: 'center', margin: Px2dp.getHeight(30)}}>
                    <Text style={{fontSize: 14, color: 'rgb(196,196,196)'}}>~已显示全部病例~</Text>
                </View>
            )
        }

        if (!this.state.isLoadingTail) {
            return <View/>
        }

        return (
            <View style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: Px2dp.getHeight(30)
            }}>
                <ActivityIndicator animating={true} size='small'/>
                <Text style={{fontSize: 14, marginLeft: Px2dp.getWidth(10)}}>数据加载中...</Text>
            </View>
        )
    }


    render() {
        let {tabId} = this.props;
        if (tabId === '0') {
            return (
                <View style={[styles.container]}>
                    <ScrollView style={{flex: 1}}>
                        <RecordRowItem labelImg={require('../../../Resource/Imags/ic_steps.png')} label='运动步数'
                                       textLeft='1730'
                                       textRight='步'/>
                        <RecordRowItem labelImg={require('../../../Resource/Imags/ic_BP.png')} label='血压' textLeft='0.0'
                                       textRight='/L' onPress={this.onPress1}/>
                        <RecordRowItem labelImg={require('../../../Resource/Imags/ic_Glu.png')} label='餐前血糖'
                                       textLeft='0/0mm'
                                       textRight='Hg'/>
                        <RecordRowItem labelImg={require('../../../Resource/Imags/ic_height.png')} label='身高'
                                       textLeft='180'
                                       textRight='cm'/>
                        <RecordRowItem labelImg={require('../../../Resource/Imags/ic_weight.png')} label='体重'
                                       textLeft='78'
                                       textRight='kg'/>
                        <RecordRowItem labelImg={require('../../../Resource/Imags/ic_headsize.png')} label='头围'
                                       textLeft='--'
                                       textRight='cm'/>
                        <RecordRowItem labelImg={require('../../../Resource/Imags/ic_BMI.png')} label='BMI'
                                       textLeft='--'
                                       textRight=''/>
                    </ScrollView>
                </View>
            );
        }
        else if (tabId === '1') {
            return (
                <View style={[styles.container]}>
                    <ScrollView style={{flex: 1}}>
                        <RecordRowItem labelImg={require('../../../Resource/Imags/ic_report_wj.png')} label='问卷报告'
                                       onPress={() => this.showReport('0')}/>
                        <RecordRowItem labelImg={require('../../../Resource/Imags/ic_report_tj.png')} label='体检报告'
                                       onPress={() => this.showReport('1')}/>
                        <RecordRowItem labelImg={require('../../../Resource/Imags/ic_report_jy.png')} label='基因报告'
                                       onPress={() => this.showReport('2')}/>
                    </ScrollView>
                </View>
            );
        }
        else if (tabId === '2') {

            return (
                <View style={[styles.container]}>

                    <RecordRowItem label='健康史'/>
                    <FlatList
                        data={this.state.data}
                        ListEmptyComponent={() => this.renderListEmptyComponent()}
                        renderItem={(rowData) => this.renderRow(rowData)}
                        keyExtractor={(item, index) => index}
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.refreshing}
                        onEndReachedThreshold={0.1}
                        onEndReached={() => this.fetchMoreData()}
                        ListFooterComponent={() => this.renderFooter()}/>

                </View>
            );
        }
    }
}

class RecordRowItem extends Component {
    static propTypes = {
        labelImg: PropTypes.number,
        label: PropTypes.string.isRequired,
        textLeft: PropTypes.string,
        textRight: PropTypes.string,
        onPress: PropTypes.func,
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
                        <Image source={labelImg} style={styles.imgLeft}/>
                        <Text style={styles.fontLabel}>{label}</Text>
                    </View>
                    <View style={styles.rowContent}>
                        <Text style={styles.fontTextLeft}>{textLeft}</Text>
                        <Text style={styles.fontTextRight}> {textRight}</Text>
                        <Image source={require('../../../Resource/Imags/icon_arrow_black.png')}
                               style={styles.imgRight}/>
                    </View>
                </View>
                <View style={styles.line}/>
            </TouchableOpacity>
        );
    }
}

class RecordRowItemBL extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        labelDownText: PropTypes.string.isRequired,
        styles: ViewPropTypes.style,
        titleStyle:Text.propTypes.style,
        onPress: PropTypes.func,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {label, labelDownText, onPress} = this.props;
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={[styles.row]}>
                    <View style={styles.rowLeftBL}>
                        {/*<Image source={labelImg} style={styles.imgLeft}/>*/}
                        <Text style={styles.fontLabelBl}>{label}</Text>
                        <Text style={styles.fontLabelSubBl}>{labelDownText}</Text>
                    </View>
                    <View style={styles.rowContent}>
                        <Image source={require('../../../Resource/Imags/icon_arrow_black.png')}
                               style={styles.imgRight}/>
                    </View>
                </View>
                <View style={styles.line}/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(244,244,244)',
    },
    // bumpedContainer: {
    //     marginTop: -210,
    //     // marginBottom: 210
    // },
    row: {
        backgroundColor: 'rgb(255,255,255)',
        height: Px2dp.getHeight(108),
        borderWidth: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowLeftBL: {
        justifyContent: 'center',
        flexDirection: 'column',
        // flexDirection: 'row',
        // alignItems: 'center'
    },
    rowLabel: {
        flexDirection: 'row',
        borderWidth: 1,
        width: 200,
        marginLeft: Px2dp.getWidth(30)
    },
    rowContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        height: 1,
        backgroundColor: 'rgb(244,244,244)',
        marginLeft: Px2dp.getWidth(30)
    },
    fontLabelBl: {
        marginLeft: Px2dp.getWidth(30),
        fontSize: Px2dp.getHeight(28),
        color: 'rgb(51,51,51)'
    },
    fontLabelSubBl: {
        marginLeft: Px2dp.getWidth(30),
        fontSize: Px2dp.getHeight(24),
        color: 'rgb(153,153,153)'
    },
    fontLabel: {
        marginLeft: Px2dp.getWidth(30),
        fontSize: Px2dp.getHeight(28),
        color: 'rgb(153,153,153)'
    },
    fontTextLeft: {
        fontSize: Px2dp.getHeight(32),
        color: 'rgb(51,51,51)',
        fontWeight: 'bold'
    },
    fontTextRight: {
        fontSize: Px2dp.getHeight(26),
        color: 'rgb(153,153,153)',
    },
    imgLeft: {
        marginLeft: Px2dp.getWidth(30),
        height: Px2dp.getHeight(40),
        width: Px2dp.getWidth(40),
        // tintColor: 'rgb(196,196,196)'
    },
    imgRight: {
        marginLeft: Px2dp.getWidth(30),
        marginRight: Px2dp.getWidth(30),
        height: Px2dp.getHeight(28),
        width: Px2dp.getWidth(28),
        tintColor: 'rgb(196,196,196)'
    },
    // defaultBL: {},
    loadingMore: {
        marginVertical: 20,
    },
    loadingText: {
        color: '#777',
        textAlign: 'center'
    }
    // AvatarStyle: {
    //     height: Px2dp.getHeight(58),
    //     width: Px2dp.getWidth(58),
    //     borderRadius: Px2dp.getHeight(58)
    // },
    // TextInputStyle: {
    //     marginRight: Px2dp.getWidth(82),
    //     width: 200,
    //     paddingTop: 0,
    //     paddingBottom: 0,
    //     paddingRight: 0,
    //     textAlign: 'right'
    // }
    // ButtonStyle: {
    //     height: Px2dp.getHeight(80),
    //     width: Px2dp.getWidth(650),
    //     alignItems: 'center',
    //     borderRadius: Px2dp.getHeight(6),
    //     backgroundColor: 'rgb(255,208,96)',
    //     justifyContent: 'center'
    // }

});