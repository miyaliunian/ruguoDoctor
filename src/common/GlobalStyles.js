
import Theme from '../config/theme'
import Px2dp from './px2dp'
module.exports = {
    //1dp的线
    line: {
        height: ScreenUtil.onePixel,
        width:ScreenUtil.screenSize.width,
        backgroundColor: '#dcdcdc'
    },
    //5dp的线
    line_space: {
        height: Px2dp.getHeight(5),
        width:ScreenUtil.screenSize.width,
        // opacity:0.5,
        backgroundColor: 'rgb(244,244,244)'
    },
    //15px的线
    line_space_10: {
        height: Px2dp.getHeight(10),
        width:ScreenUtil.screenSize.width,
        // opacity:0.5,
        backgroundColor: 'rgb(244,244,244)'
    },
    //15px的线
    line_space_13: {
        height: Px2dp.getHeight(13),
        width:ScreenUtil.screenSize.width,
        // opacity:0.5,
        backgroundColor: 'rgb(244,244,244)'
    },
    //15px的线
    line_space_30: {
        height: Px2dp.getHeight(25),
        width:ScreenUtil.screenSize.width,
        // opacity:0.5,
        backgroundColor: 'rgb(244,244,244)'
    },
    // 每个页面的根样式
    root_container: {
        flex: 1,

    },
    //navigationBarStyle
    headerTintColor: '#ffffff',
    navigationBarColor_yellow:{
        backgroundColor: '#36c4ca'
    },

};

