import {observable, action, computed, autorun} from 'mobx';

export default class mobxStore {
    //登录信息
    @observable
    info = {
        cell_phone: '',//手机号
        verification_code: '',//验证码
    };

    @computed get btnState(){
        if (this.info.cell_phone!= ''&&this.info.verification_code!= ''){
            return false;
        }
        else {
            return true
        }
    }

    @observable
    passBtnInfo={
        password:'',//设置密码
    }

    @computed get passBtnState(){
        debugger
        if (this.passBtnInfo.password!= ''){
            return false;
        }
        else {
            return true
        }
    }


}


