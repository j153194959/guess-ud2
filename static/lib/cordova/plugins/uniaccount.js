cordova.define("UniaccountPlugin", function(require, exports, module) {
    /*
     *
     * Licensed to the Apache Software Foundation (ASF) under one
     * or more contributor license agreements.  See the NOTICE file
     * distributed with this work for additional information
     * regarding copyright ownership.  The ASF licenses this file
     * to you under the Apache License, Version 2.0 (the
     * "License"); you may not use this file except in compliance
     * with the License.  You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing,
     * software distributed under the License is distributed on an
     * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
     * KIND, either express or implied.  See the License for the
     * specific language governing permissions and limitations
     * under the License.
     *
     */
    var exec = require('cordova/exec');

    module.exports = {
        login: function() {
            exec(null, null, "UniaccountPlugin", "login", []);
        },
        logout: function() {
            exec(null, null, "UniaccountPlugin", "logout", []);
        },
        jumpAction: function(params) {
            exec(null, null, "UniaccountPlugin", "jumpAction", [params]);
        },
        jumpUrl: function(params) {
            exec(null, null, "UniaccountPlugin", "jumpUrl", [params]);
        },
        activeMobile: function(successCallback, errorCallback,params){
            exec(successCallback, errorCallback, "UniaccountPlugin", "activeMobile", [params]);
        },
        setMobilePwd: function(params){
            exec(null, null, "UniaccountPlugin", "setMobilePwd", [params]);
        },
        cleanMobilePwd: function(){
            exec(null, null, "UniaccountPlugin", "cleanMobilePwd", []);
        },
        getMobilePwd: function(successCallback, errorCallback){
            exec(successCallback, errorCallback, "UniaccountPlugin", "getMobilePwd", []);
        },
        getIMEI: function(successCallback, errorCallback) {
            exec(successCallback, errorCallback, "UniaccountPlugin", "getIMEI", []);
        },
        getMAC: function(successCallback,errorCallback) {
            exec(successCallback,errorCallback, "UniaccountPlugin", "getMAC", []);
        },
        showBar: function(params) {
            exec(null,null, "UniaccountPlugin", "showBar", [params]);
        },
        getAppInfo: function(successCallback, errorCallback) {
            exec(successCallback,errorCallback, "UniaccountPlugin", "getAppInfo", []);
        },
        downLoadRes: function(params) {
            exec(null,null, "UniaccountPlugin", "downLoadRes", [params]);
        },
        openNews: function(params) {
            exec(null,null, "UniaccountPlugin", "openNews", [params]);
        },

        ulbAccLogin: function(successCallback, errorCallback,params) {
            //解决IOS接口返回字符串格式问题，以及params为空提供默认参数调用
            if(params == null || typeof params == 'undefined') {
                params = {'reloginflag':'0'};
            }

            function okWrapCallback(data) {
                var jsonData;
                if(typeof data == 'string') {
                    jsonData = JSON.parse(data);
                }else if(typeof data == 'object'){
                    jsonData = data;
                }else{
                    jsonData = null;
                }

                successCallback(jsonData);
            }

            exec(okWrapCallback,errorCallback, "UniaccountPlugin", "ulbAccLogin", [params]);

            //exec(successCallback,errorCallback, "UniaccountPlugin", "ulbAccLogin", [params]);
        },

        ulbAccLogout: function(successCallback, errorCallback,params) {
            exec(successCallback,errorCallback, "UniaccountPlugin", "ulbAccLogout", [params]);
        },

        jumpActivity: function(params) {
            exec(null,null, "UniaccountPlugin", "jumpActivity", [params]);
        },

        closeActivity: function() {
            exec(null,null, "UniaccountPlugin", "closeActivity", []);
        },

        exitApp:function() {
            exec(null,null, "UniaccountPlugin", "firstLevelPageBack", []);
        },

        cordovaInitFinish:function() {
            exec(null,null, "UniaccountPlugin", "cordovaInitFinish", []);
        },

        setTitleBar:function(params) {
            exec(null,null, "UniaccountPlugin", "setTitleBar", [params]);
        },

        ulbPageNotice:function(params) {
            exec(null,null, "UniaccountPlugin", "ulbPageNotice", [params])
        },
        ulbShare:function(title,iconPath,content,jumpUrl) {
            var params = {'title':title,'iconPath':iconPath,'content':content,'jumpUrl':jumpUrl};
            exec(null,null, "UniaccountPlugin", "ulbShare", [params]);
        }
    }
});
