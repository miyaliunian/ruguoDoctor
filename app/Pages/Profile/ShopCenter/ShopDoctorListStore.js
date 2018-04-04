import {observable, action, computed, autorun} from 'mobx';

export default class ShopDoctorListStore{
    // 本地数据源
    @observable
    CACHE_RESULTS = {
        DATA_LIST: [], //数据装载
        NEXT_PAGE: 1, //用于翻页
        TOTAL: 0  //总数据条数
    };

    // 添加初始数据
    @action
    addDataToList = (items) => {
        let ITEMS = this.CACHE_RESULTS.DATA_LIST.slice();
        ITEMS = ITEMS.concat(items.productList);
        this.CACHE_RESULTS.DATA_LIST = ITEMS;
        this.CACHE_RESULTS.NEXT_PAGE += 1;
        this.CACHE_RESULTS.TOTAL = items.total
    };

    @action
    hasMore=()=> {
        return this.CACHE_RESULTS.DATA_LIST.length !== this.CACHE_RESULTS.TOTAL
    };

    @action
    clean=()=>{
        this.CACHE_RESULTS.DATA_LIST=[];
        this.CACHE_RESULTS.NEXT_PAGE=1;
        this.CACHE_RESULTS.TOTAL=0
    }
}