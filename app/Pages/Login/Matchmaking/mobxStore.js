import {observable, action, computed, autorun} from 'mobx';

export default class mobxStore {
    //是否已经购买服务
    @observable
    is_On_statement:false;
    @observable
    is_Off_statement:false;

    @action
    changeOnStatement(){
        this.is_On_statement=!this.is_On_statement
        if (this.is_Off_statement==true){
            this.is_Off_statement=!this.is_Off_statement
        }
    }

    @action
    changeOffStatement(){
        this.is_Off_statement=!this.is_Off_statement
        if (this.is_On_statement==true){
            this.is_On_statement=!this.is_On_statement
        }
    }
}


