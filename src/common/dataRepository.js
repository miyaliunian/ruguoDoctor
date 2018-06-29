/**
 * Created by wufei on 2017/11/18.
 */
import React, {Component} from 'react';
import {
    AsyncStorage
} from 'react-native';

const STATUS = {
    SUCCESS: true,
    FAILED: false
};

export default class dataRepository {

    /**
     *
     *  POST:JSON请求
     *  @param url
     *  @param params
     *  @return {Promise}
     * */

    postJsonRepository(url, params) {
        return new Promise((resolve, reject) => {
            this.timeout_fetch(fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            }))
                .then(response => response.json())
                .then(response => {
                    resolve(response);
                })
                .catch((error) => {
                    if (error.message == 'Network request failed') {
                        reject({status: '网络出错'});
                    } else if (error === 'abort promise') {
                        reject({status: '请求超时'});
                    } else {
                       // reject({status: error.message});
                        reject({status: '请求超时：服务器无响应'});
                    }
                })
                .done()

        })
    }

    /**
     *
     *  POST:Form请求
     *  @param url
     *  @param params
     *  @return {Promise}
     * */
    postFormRepository(url, params) {
        if (params) {
            var formData = new FormData();
            let paramsKeyArray = Object.keys(params);
            paramsKeyArray.forEach(key => formData.append(key, params[key]))

        }
        return new Promise((resolve, reject) => {
            this.timeout_fetch(fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: JSON.stringify(params),
            }))
                .then(response => response.json())
                .then(response => {
                    resolve(response);
                })
                .catch((error) => {
                    if (error.message == 'Network request failed') {
                        reject({status: '网络出错'});
                    } else if (error === 'abort promise') {
                        reject({status: '请求超时'});
                    } else {
                        reject({status: '请求超时：服务器无响应'});
                    }
                })
                .done()

        })
    }

    /**
     * 存储数据
     * @param KEY
     * @param DataForm
     * @return {Promise}
     * */
    saveLocalRepository(KEY, DataForm) {
        return new Promise((resolve, reject) => {
            AsyncStorage.setItem(KEY, JSON.stringify(DataForm), (error) => {
                if (!error) {
                    resolve(STATUS.SUCCESS)
                } else {
                    reject(STATUS.FAILED)
                }
            })
        })

    }

    /**
     * 获取数据
     * @param KEY
     * @return {Promise}
     * */
    fetchLocalRepository(KEY) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(KEY, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result))
                    } catch (e) {
                        reject(e)
                    }
                } else {
                    reject(STATUS.FAILED)
                }
            })
        })
    }

    /**
     * 删除数据
     * @param KEY
     * @return {Promise}
     * */
    removeLocalRepository(KEY) {
        return new Promise((resolve, reject) => {
            AsyncStorage.removeItem(KEY, (error) => {
                if (!error) {
                    resolve(STATUS.SUCCESS)
                } else {
                    reject(STATUS.FAILED)
                }
            })
        })
    }

    /**
     * 合并数据 ：将现有的 key - value 与 输入值合并
     * @param KEY
     * @return {Promise}
     * */
    mergeLocalRepository(KEY,DataForm) {
        return new Promise((resolve, reject) => {
            AsyncStorage.mergeItem(KEY, JSON.stringify(DataForm),(error) => {
                if (!error) {
                    resolve(STATUS.SUCCESS)
                } else {
                    reject(STATUS.FAILED)
                }
            })
        })
    }

    /**
     * 清除所有的keys
     * 这个方法只能调用一次 如果之前的值 已经清空的话 再调用此方法会报错
     * @return {Promise}
     * */
    cleanLocalRepository() {
        return new Promise((resolve, reject) => {
            AsyncStorage.clear((error) => {
                if (!error) {
                    resolve(STATUS.SUCCESS)
                } else {
                    reject(STATUS.FAILED)
                }
            })
        })
    }

    /**
     *  上传头像
     *  @param url
     *  @return {Promise}
     * */
    uploadImage(url, params) {
        return new Promise((resolve, reject) => {
            //设置formData数据
            let formData = new FormData();
            for (let key in params) {
                if (key !== 'files') {
                    formData.append(key, params[key]);
                }
            }

            if (params.hasOwnProperty('files')) {
                for (let file of params.files) {
                    let tempFile = {uri: file.filePath, type: 'multipart/form-data', name: file.fileName};
                    formData.append("files", tempFile);
                }
            }
            //fetch post请求
            fetch(url, {
                method: 'POST',
                //设置请求头，请求体为json格式，identity为未压缩
                headers: {
                    'Content-Type': 'multipart/form-data;charset=utf-8',
                    'Content-Encoding': 'identity'
                },
                body: formData,
            }).then((response) => response.json())
                .then((responseData) => {
                    resolve(responseData);
                })
                .catch((error) => {
                    if (error.message == 'Network request failed') {
                        reject({status: '网络出错'});
                    } else if (error === 'abort promise') {
                        reject({status: '请求超时'});
                    } else {
                        reject({status: '请求超时：服务器无响应'});
                    }
                });
        });

    }

    /**
     * 延时处理
     * @param fetch_promise
     * @param timeout
     * */
    timeout_fetch(fetch_promise, timeout = 30000) {
        let timeout_fn = null;
        let timeout_promise = new Promise(function (resolve, reject) {
            timeout_fn = function () {
                reject('abort promise');
            };
        });
        let abort_promise = Promise.race([
            fetch_promise,
            timeout_promise
        ]);

        setTimeout(function () {
            timeout_fn();
        }, timeout);

        return abort_promise;
    }

}


