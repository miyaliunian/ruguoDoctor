/**
 * Created by wufei on 2017/12/30.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    Image,
    WebView
} from 'react-native';
const  URL="http://10.101.2.66:8080/hcms/app/rest/testGetContent"
export default class HealthInfoDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEnshrine: false //标识此文章是否被收藏
        }
    }

    componentDidMount() {

    }

    navigatePressLeft() {
        this.props.navigation.goBack();
    }

    navigatePressRight(target) {
        if (target === 0) {
           this.setState({
               isEnshrine: !this.state.isEnshrine
           })
        }
        if (target === 1) {
            alert(target);
        }
    }

    render() {
        let id = this.props.navigation.state.params.id;
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar
                    statusBar={{backgroundColor: 'rgb(255,208,96)'}}
                    style={{backgroundColor: 'rgb(255,208,96)'}}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    title={'资讯'}
                    rightButton={<View style={{
                        flexDirection: 'row',
                        marginRight: Px2dp.getWidth(30),
                        height: Px2dp.getHeight(70),
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: Px2dp.getWidth(130),
                        paddingLeft: Px2dp.getWidth(10),
                        paddingRight: Px2dp.getWidth(10)
                    }}>
                        <TouchableWithoutFeedback onPress={() => this.navigatePressRight(0)}>
                            <Image
                                style={{
                                    width: Px2dp.getWidth(45),
                                    height: Px2dp.getHeight(45),
                                    backgroundColor: 'transparent'
                                }}
                                source={this.state.isEnshrine ? require('../../../Resource/Imags/icon_home_enshrine.png') : require('../../../Resource/Imags/icon_home_unenshrine.png')}
                                resizeMode={'contain'}/>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.navigatePressRight(1)}>
                            <Image
                                style={{
                                    width: Px2dp.getWidth(45),
                                    height: Px2dp.getHeight(45),
                                }}
                                source={require('../../../Resource/Imags/icon_home_share.png')}
                                resizeMode={'contain'}/>
                        </TouchableWithoutFeedback>
                    </View>}
                />


                {/*正文内容*/}
                <WebView
                   automaticallyAdjustContentInsets={true}
                   scalesPageToFit={true}
                   source={{uri:'http://10.101.2.66:8080/hcms/app/rest/testGetContent?id='+id}}
                   // onLoadStart={()=>alert('onLoadStart')}
                   // onLoad={()=>alert('onLoad')}
                   // onLoadEnd={()=>alert('onLoadEnd')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C6E2FF',
    }
});

