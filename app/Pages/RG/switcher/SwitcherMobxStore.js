import {observable, action, computed, autorun} from 'mobx';

export default class SwitcherMobxStore {

    @observable
        //用于描述健康状态
    itemData = {};
    //家人信息
    @observable
    personInfo = {
        name: '',//姓名
        genderName: '',//性别
        relationship: '',//关系
        birthday: '',//出生日期
        certificateNo: '',//身份证
        reproductiveModeName: '',//生产方式
        healthStatus: {},//健康状态
        mobilePhone: '',//手机号码
        email: '',//电子邮箱
    };

    replace = (data) => {
        this.itemData = data;
    };

    itemPress = () => {
        let cell = '';
        this.itemData.map((item) => {
            item.isSelect = false
        });
    }
}


