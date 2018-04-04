/**
 * Created by wufei on 2017/11/21.
 */
import {
    Dimensions,
    Platform,
    PixelRatio
} from 'react-native';

const BASE_WIN_HEIGHT = 667;
const BASE_WIN_WIDTH = 375;

const pixelRatio=PixelRatio.get();
export default class px2dp {

    /** 根据实际屏幕尺寸转换对应的像素高度 */
    static getHeight(h) {

        if (!this.height) {
            var {height, width} = Dimensions.get('window');
            this.height = height;
            this.width = width;
        }
        return h / 2 * (this.height / BASE_WIN_HEIGHT);
    }

    /** 根据实际屏幕尺寸转换对应的像素宽度 */
    static getWidth(w) {

        if (!this.width) {
            var {height, width} = Dimensions.get('window');
            this.height = height;
            this.width = width;
        }
        return w / 2 * (this.width / BASE_WIN_WIDTH);
    }

}



