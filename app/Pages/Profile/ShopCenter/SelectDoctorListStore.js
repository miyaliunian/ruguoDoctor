import {observable, action, computed, autorun} from 'mobx';

export default class DoctorListStore{
    // 本地数据源
    @observable
    CACHE_RESULTS = {
        current: 1,//当前页
        rowCount: 5,//每页显示数
        DATA_LIST: [], //数据装载
        NEXT_PAGE: 1, //用于翻页
        TOTAL: 0  //总数据条数
    }

    selectItem =''


    unSelectedAll=(clickitem)=>{
        this.CACHE_RESULTS.DATA_LIST.map((item) => {
            if (item.id!= clickitem.id) {
                item.isSelect = false
            }
        });
        if(clickitem.isSelect){
            this.selectItem=clickitem
        }else {
            this.selectItem=''
        }

    }

    // 添加初始数据
    addDataToList = (items) => {
        let ITEMS = this.CACHE_RESULTS.DATA_LIST.slice()
        ITEMS = ITEMS.concat(items)
        this.CACHE_RESULTS.DATA_LIST = ITEMS
        this.CACHE_RESULTS.NEXT_PAGE += 1
        this.CACHE_RESULTS.TOTAL = 5
        //this.CACHE_RESULTS.TOTAL = items.total
    };

    hasMore=()=> {
        return this.CACHE_RESULTS.DATA_LIST.length !== this.CACHE_RESULTS.TOTAL
    }

    clean=()=>{
        this.CACHE_RESULTS.current= 1;//当前页
        this.CACHE_RESULTS.rowCount= 5;//每页显示数
        this.CACHE_RESULTS.DATA_LIST=[];
        this.CACHE_RESULTS.NEXT_PAGE=1;
        this.CACHE_RESULTS.TOTAL=0
    }

}