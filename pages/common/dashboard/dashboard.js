/**
 * Created by wangyin on 2017/11/16.
 */
define(['echarts'], function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('STD_WB_RISK_MESSAGE_TYPE,STD_WB_NOTICE_TYPE,STD_WB_PRB_MESSAGE_TYPE,STD_WB_PRB_STATUS');
    var _self = yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          tipsData: { back: 0, done: 0, ticket: 0, poolsize: 0, his: 0, copy: 0},
          myData: [],
          activeName: 'first',
          hiddenRisk: true,
          activeIndex: 3,
          riskData: [],
          coloryellow: [0, 4, 7, 10, 13],
          colordefault: [1, 6, 11, 15],
          colorpurple: [2, 5, 9, 12],
          colorgreen: [3, 8, 14],
          prbnum: 0,
          prbcommData: [],
          url: {
            bizCusCountUrl: '/api/batbizcuscount/',
            badassetsUrl: '/api/batbizbadassets/',
            assetsAnalyse: '/api/batbizassetsanalyse/',
            xdhxTotalUrl: '/api/accloan/dscms2sjzt/xdhxQueryTotalList/'
          }
        };
      },
      created: function () {
        // 获取常用功能
        this.getMydata();
        // 我的工作台
        this.queryWorkbench();
        this.getPrbcommDataFn();
      },
      methods: {
        queryWorkbench: function () {
          var _this = this;
          yufp.service.request({
            method: 'POST',
            url: '/api/custom/bench/count',
            callback: function (code, message, res) {
              console.log(code, message, res, 'ffrrr');
              if (code == '0') {
                _this.tipsData = res.data;
              }
            }
          });
        },
        getMydata: function () {
          var _this = this;
          yufp.service.request({
            method: 'POST',
            url: '/api/wbcommfunc/mydata',
            callback: function (code, message, res) {
              console.log(code, message, res, 'ffrrr');
              if (code == '0') {
                _this.myData = JSON.parse(res.data);
                console.log(_this.myData, 'my');
              }
            }
          });
        },
        getPrbcommDataFn: function () {
          var _this = this;
          yufp.service.request({
            method: 'POST',
            url: '/api/wbcommfunc',
            callback: function (code, message, response) {
              if (response.code == '0') {
                _this.prbnum = response.total;
                _this.prbcommData = response.data;
                console.log(_this.prbcommData, 'pp');
              } else {
                _this.$message({ message: '数据查询失败！', type: 'error' });
              }
            }
          });
        },
        getlookup (index, type) {
          return yufp.lookup.find(type, false)[index];
        },
        openGuar: function () {

        },
        enterNPSystem: function () {

        },

        doDel: function () {

        },
        sysApproval: function () {

        },
        sysPas: function () {

        },
        doHLWYP: function () {

        },
        doXWD: function () {

        },
        addwbprbCommFn: function () {

        },
        openRepobaseFn: function () {

        },
        openPage (index) {
          let route = '';
          let parms = {};
          switch (index) {
          case 0:
            route = 'workflow/bench/todo/todo';
            break;
          case 1:
            route = '/meetingIndex';
            parms = { backPage: true };
            break;
          case 2:
            route = 'workflow/bench/taskpool/taskpool';
            break;
          case 3:
            route = 'workflow/bench/done/done';
            break;
          case 4:
            route = 'workflow/bench/his/his';
            break;
          case 5:
            route = 'workflow/bench/copy/nwfcopyuser';
            break;
          default:
          }
          this.$router.push({path: route, query: parms});// name:'', params:{}
        }
      }
    });
  };

  // 消息处理
  exports.onmessage = function (type, message) {

  };

  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {

  };
});