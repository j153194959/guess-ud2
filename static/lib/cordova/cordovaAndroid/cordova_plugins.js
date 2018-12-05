cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
        {
            "file": "../plugins/uniaccount.js",
            "id": "UniaccountPlugin",
            "clobbers": [
                "navigator.uniaccount"
            ]
        }
	]
});
