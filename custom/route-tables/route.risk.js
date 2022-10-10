/**
 * Created by 江成 on 2017/03/05.
 */
define(function (require) {
  // 定义路由表
  var routeTable = {
    COLLT_ColltDelayCaseRecordPageInfo: {
      html: 'pages/risk/ColltDelayCaseRecordPageInfo.html',
      js: 'pages/risk/ColltDelayCaseRecordPageInfo.js'
    },

    COLLT_MonReliefDetailPageInfo: {
      html: 'pages/risk/MonReliefDetailPageInfo.html',
      js: 'pages/risk/MonReliefDetailPageInfo.js'
    },
    demo: {
      html: 'pages/demo/demo.html',
      js: 'pages/demo/demo.js'
    }

  };
    // 注册路由表
  yufp.router.addRouteTable(routeTable);
});