/**
 * @created by helin3 2018-11-30
 * @updated by
 * @description Mock模拟入口配置
 */
define([
  './libs/mockjs/mock.min.js',
  './mocks/data/system.js',
  './mocks/data/admq.js',
  './mocks/data/instruction.js',
  './mocks/data/maintable.js',
  './mocks/data/subtable.js',
  './mocks/data/demo.js',
  './mocks/data/login.js',
  './mocks/data/hjlMock.js'
],
function (require, exports) {
  var system = yufp.require.use('./mocks/data/system.js');
  var admq = yufp.require.use('./mocks/data/admq.js');
  var instruction = yufp.require.use('./mocks/data/instruction.js');
  var maintable = yufp.require.use('./mocks/data/maintable.js');
  var subtable = yufp.require.use('./mocks/data/subtable.js');
  var demo = yufp.require.use('./mocks/data/demo.js');

  var login = yufp.require.use('./mocks/data/login.js');
  var hjlMock = yufp.require.use('./mocks/data/hjlMock.js');

  var registerService = [
    // 连接后台服务时，请注释下述几行
    { url: backend.uaaService + '/api/oauth/token/bak1', method: 'POST', fn: system.loginFn },
    { url: backend.uaaService + '/api/logout', method: 'POST', fn: system.logoutFn },
    { url: backend.uaaService + '/api/session/info', method: 'POST', fn: system.sessionInfoFn },
    { url: backend.uaaService + '/api/account/menuandcontr', method: 'POST', fn: system.menuAndContrFn },
    { url: backend.uaaService + '/api/account/datacontr', method: 'GET', fn: system.dataContrFn },
    { url: backend.uaaService + '/api/account/password', method: 'GET', fn: system.passwordFn },
    { url: backend.uaaService + '/api/contr/url', method: 'GET', fn: system.contrUrlFn },
    { url: backend.uaaService + '/api/login/pubkey1', method: 'GET', fn: login.getPubkey},


    { url: backend.adminService + '/api/adminsmlookupitem/weblist', method: 'GET', fn: system.lookupFn },

    // 下述服务是纯模拟演示使用


    { url: backend.consoleService + '/api/quoat/limit/prd/infos', method: 'POST', fn: hjlMock.getLimitList },
    { url: '/trade/example/list', method: 'GET', fn: admq.getList },
    { url: '/trade/example/save', method: 'POST', fn: admq.save },
    { url: '/trade/example/delete', method: 'POST', fn: admq.delete },
    { url: '/trade/example/tree', method: 'GET', fn: admq.getTree },
    { url: '/trade/example/radio', method: 'GET', fn: admq.getRadio },
    { url: '/trade/example/checkbox', method: 'GET', fn: admq.getCheckbox },
    { url: '/trade/example/select', method: 'GET', fn: admq.getSlectList },
    { url: '/trade/example/cascader', method: 'GET', fn: admq.getCascader },
    { url: '/trade/cascader/getChild', method: 'GET', fn: admq.getChild },
    { url: '/trade/example/asynctree', method: 'GET', fn: admq.getTreeAsync },
    { url: '/example/instruction/list', method: 'GET', fn: instruction.getList },
    { url: '/example/template/msform', method: 'GET', fn: maintable.getList },
    { url: '/example/template/subtable', method: 'GET', fn: subtable.subList },
    { url: '/example/log/menu', method: 'POST', fn: admq.setLog },
    { url: '/trade/example/user', method: 'GET', fn: admq.getUser },
    { url: '/trade/example/role', method: 'GET', fn: admq.getOrle },
    { url: '/trade/example/duty', method: 'GET', fn: admq.getDuty },
    { url: '/trade/example/orgtree', method: 'GET', fn: admq.getOrgTree },

    { url: '/trade/api/demo/list', method: 'POST', fn: demo.getList},
    { url: '/trade/api/demo/save', method: 'POST', fn: demo.save},
    { url: '/trade/api/demo/info', method: 'GET', fn: demo.info},
    { url: '/trade/api/demo/delete', method: 'DELETE', fn: demo.delete},
    { url: '/api/custom/bench/count', method: 'POST', fn: hjlMock.getCount},
    { url: '/api/wbcommfunc/mydata', method: 'POST', fn: hjlMock.getMydata},
    { url: '/api/batbizcuscount', method: 'POST', fn: hjlMock.getPrbcommData},
    { url: '/api/wbcommfunc', method: 'POST', fn: hjlMock.getPrbcommData},

    { url: '/api/batbizbadassets', method: 'POST', fn: hjlMock.getPrbcommData},
    { url: '/api/batbizassetsanalyse', method: 'POST', fn: hjlMock.getPrbcommData},
    { url: '/api/accloan/dscms2sjzt/xdhxQueryTotalList/', method: 'POST', fn: hjlMock.getPrbcommData},
    { url: '/api//console/api/s/users', method: 'POST', fn: hjlMock.getUserListFn}

    // { url: 'app/rest/stencil-sets/editor', method: 'GET', fn: demo.getStencilSets}
    // { url: '/api/biz/event/chart/stencil-sets', method: 'GET', fn: demo.getStencilSets}
  ];

  var mock = function (url, method, fn) {
    method = (method && method.toLowerCase()) || 'post';
    var reg = new RegExp(url, '');
    Mock.mock(reg, method, fn);
  };

  Mock.setup({
    timeout: '350-600'
  });

  for (var i = 0; i < registerService.length; i++) {
    var rg = registerService[i];
    mock(rg.url, rg.method, rg.fn);
  }
}
);