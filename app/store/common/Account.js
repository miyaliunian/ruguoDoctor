/**
 * Created by wufei on 2018/1/4.
 */
import {observable} from 'mobx'

class Account {
    @observable
    id = '';
    @observable
    code = '';
    @observable
    mobilePhone = '';
    @observable
    wchatOpenId = '';
}

export default new Account()

