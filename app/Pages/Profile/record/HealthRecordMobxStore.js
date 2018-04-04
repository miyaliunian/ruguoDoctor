/**
 * Created by wufei on 2017/12/20.
 */

import {observable, action, computed, autorun} from 'mobx';

export default class HealthRecordMobxStore {
    @observable
    itemData = {};

    replace = (data) => {
        this.itemData = data;
    };

    itemPress = () => {
        let cell = '';
        this.itemData.map((item) => {
            item.isSelect=false
        });
    }

}

