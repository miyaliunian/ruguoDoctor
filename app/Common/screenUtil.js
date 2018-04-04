/**
 * Created by wufei on 2017/11/13.
 */
import React from 'react';
import {
    Dimensions,
    PixelRatio
} from 'react-native';

const screenUtil = {

    screenSize: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    onePixel: 1 / PixelRatio.get(),
};

export default screenUtil;

