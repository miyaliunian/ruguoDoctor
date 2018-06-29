/**
 * Created by wufei on 2018/1/4.
 */
import {observable} from 'mobx'

class Account {
    @observable
    memberCode = '';//会员编码 member_basic_info
    @observable
    picUrl = '';
    @observable
    relaId = '';//会员关系人编码 member_relationship_info
    @observable
    relaPerName = '';
    @observable
    relaPerGenderName = '';
    @observable
    relaPerGenderCode = '';
    @observable
    relaTypeName = '';
    @observable
    relaTypeCode = '';
    @observable
    relaPerBirthday = '';
    @observable
    relaPerMobilePhone = '';
    @observable
    isBuyService = '';
    @observable
    relaPerCertificateType = '';
    @observable
    relaPerCertificateName = '';
    @observable
    relaPerCertificateNo = ''
}

export default new Account()

