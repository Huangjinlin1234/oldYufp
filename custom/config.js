/**
 * Created by 江成 on 2016/08/09.
 */

define(function (require, exports, module) {
  // 设置配置
  var config = {
    // 请求URLsit
    //	ulr: '96.0.60.13:9090',
    	// 请求路径URLuat
		  // url: '180.139.6.1:8081',
    // url: '127.0.0.1',
    // 请求路径URLdbb
    // url: '96.0.68.13:9090',
    	url: '47.107.173.118:8808',

    	 // sit
    // reportUrl: 'http://localhost:8080/cmis-report',
    	// uat
    // reportUrl: 'http://96.0.60.46:9090/cmis-report',
    // dbb
    // 	reportUrl: 'http://96.0.68.13:9090/cmis-report',

    // 是否启用SSL
    ssl: false,
    // web socket 通信方式
    webSocketType: 'get',
    // 默认root id
    defaultRootId: '_rootDiv',
    // 开始页面
    startPage: 'login',
    // 录制模式
    recorderModel: false,
    // 录制范围
    recorderScope: ['yufp.service'],
    // 调试模式
    debugModel: true,
    // 调试范围
    debugScope: ['yufp.service'],
    // 紧凑模式
    compactMode: false
  };
    // 保存配置
  module.exports = config;
});
