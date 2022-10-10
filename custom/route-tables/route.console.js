/**
 * Created by 江成 on 2017/03/05.
 */
define(function (require) {
  // 定义路由表
  var routeTable = {

    SUserPageInfo: {
      html: 'pages/system/SUserPageInfo.html',
      js: 'pages/system/SUserPageInfo.html'
    },
    SOrgPageInfo: {
      html: 'pages/system/SOrgPageInfo.html',
      js: 'pages/system/SOrgPageInfo.js'
    },
    sDutyPageInfo: {
      html: 'pages/system/sDutyPageInfo.html',
      js: 'pages/system/sDutyPageInfo.js'
    }

  };
    // 注册路由表
  yufp.router.addRouteTable(routeTable);
});