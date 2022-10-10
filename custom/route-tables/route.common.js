/**
 * Created by 江成 on 2017/03/05.
 */
define(function (require) {
  // 定义路由表
  var routeTable = {

    login: {
      html: 'pages/common/login/login.html',
      css: 'pages/common/login/login.css',
      js: 'pages/common/login/login.js'
    },

    frame: {
      html: 'pages/common/frame/frame.html',
      js: 'pages/common/frame/frame.js'
    },

    frameRight: {
      html: 'pages/common/frame/frame.html',
      js: 'pages/common/frame/frame.js'
    },

    frameTop: {
      html: 'pages/common/frame/frame.html',
      js: 'pages/common/frame/frame.js'
    },

    dashboard: {
      html: 'pages/common/dashboard/dashboard.html',
      js: 'pages/common/dashboard/dashboard.js'
    },

    modifyUserPassword: {
      html: 'pages/common/login/modifyUserPassword.html',
      css: 'pages/common/login/modifyUserPassword.css',
      js: 'pages/common/login/modifyUserPassword.js'
    }


  };
    // 注册路由表
  yufp.router.addRouteTable(routeTable);
});