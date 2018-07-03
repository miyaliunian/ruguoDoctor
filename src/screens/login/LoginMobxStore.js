import {observable, action, computed, autorun} from 'mobx';

export default class LoginMobxStore {
    @observable
    USER_INFO = {
        cell_phone: '',//手机号
        user_password: '',//密码
        statement:false ,//同意汝果用户服务协议
    };

    @action
    changeStatement(){
        this.USER_INFO.statement=!this.USER_INFO.statement
    }

    @computed get btnState(){
        if (this.USER_INFO.cell_phone!= '' && this.USER_INFO.user_password!= '' && this.USER_INFO.statement==true){
            return false;
        }else {
            return true
        }
    }


    @computed get btnSettingPasswordEnable(){
        if (  this.USER_INFO.user_password!= ''){
            return false;
        }else {
            return true
        }
    }

}


