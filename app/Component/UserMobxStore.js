/**
 * Created by wufei on 2017/11/26.
 */
import {observable, action, computed, autorun} from 'mobx';

export default class UserMobxStore {
    @observable
        //优惠券
    discountCoupon: '';
    @observable
        //积分
    integral: '';
    @observable
        //手机号绑定
    bindingTelState: '';
    @observable
        //微信号绑定
    bindingWeichatState: '';
    @observable
        //修改密码
    updatePassState: '';

    addDiscountCoupon = (count) => {
        this.discountCoupon='优惠券'+count
    };


    addIntegral = (count) => {
        this.integral='积分'+count
    }


}


