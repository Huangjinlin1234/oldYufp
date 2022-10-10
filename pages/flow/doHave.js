/**
 * @create by xxx on 2018-xx-xx
 * @description xx
 */
define(function (require, exports) {

  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('EVENT_STATUS,BIZ_NODE_TYPE,PERSONAL_HANDLE_STATUS,FLOW_STATUS');
    var height = yufp.custom.viewSize().height - 110;
    // 创建virtual model
    var vm = yufp.custom.vue({
      el: cite.el,
      watch: {
        visible: function (val) {
          if (!val && this.vos && this.vos.length > 0) {
            for (var i = 0; i < vm.vos.length; i++) {
              pagePlugin = vm.vos[i];
              yufp.router.removeRoute(pagePlugin.bizPluginId);
            }

          }
        }
      },
      data: {
        dataUrl: backend.flowService + '/api/done/have',
        visible: false,
        tabs: 'myInfoCenter',
        aprv: {
          aprvComment: '',
          aprvOpinion: ''
        },
        uris: [],
        param: {
          key: 'value'
        },
        queryFields: [{
            placeholder: '业务流水号',
            field: 'bizSerno',
            type: 'input'
          },
          {
            placeholder: '业务阶段编号',
            field: 'bizStageId',
            type: 'input',
            hidden: true
          },
          {
            placeholder: '业务事件名称',
            field: 'bizEventName',
            type: 'input'
          },
          {
            placeholder: '业务阶段名称',
            field: 'bizStageName',
            type: 'input'
          },
          {
            placeholder: '业务节点实例号',
            field: 'instNodeId',
            type: 'input'
          }
        ],
        queryButtons: [{
            label: '查询',
            op: 'submit',
            type: 'primary',
            icon: 'search',
            click: function (model, valid) {
              if (valid) {
                vm.$refs.reftable.remoteData(model);
              }
            }
          },
          {
            label: '重置',
            op: 'reset',
            type: 'primary',
            icon: 'yx-loop2'
          }
        ],
        tableColumns: [{
            label: '业务流水号',
            prop: 'bizSerno'
          },
          {
            label: '业务事件名称',
            prop: 'bizEventName',
            sortable: true,
            resizable: true
          },
          {
            label: '业务阶段名称',
            prop: 'bizStageName'
          },
          {
            label: '业务节点实例号',
            prop: 'instNodeId'
          },
          {
            label: '业务事件状态',
            prop: 'bizEventState',
            dataCode: 'EVENT_STATUS'
          },
          {
            label: '业务节点名称',
            prop: 'bizNodeName'
          },
          {
            label: '业务节点类型',
            prop: 'bizNodeType',
            dataCode: 'BIZ_NODE_TYPE'
          },
          {
            label: '人工处理状态',
            prop: 'processState',
            dataCode: 'PERSONAL_HANDLE_STATUS'
          },
          {
            label: '人工处理用户名称',
            prop: 'processUserName'
          },
          {
            label: '人工处理机构名称',
            prop: 'processOrgName'
          },
          {
            label: '业务时间开始时间',
            prop: 'eventStartTime'
          },
          {
            label: '业务时间处理结束时间',
            prop: 'eventEndTime'
          },
          {
            label: '业务流转状态',
            prop: 'instFlowState',
            dataCode: 'FLOW_STATUS'
          }
        ],
        pageInfos: [],
        submitData: {},
        myStyle: {
          height: height + 'px',
          overflow: 'auto'
        },
        //业务节点名称
        bizNodeName: '',
        //业务插件对象
        vos: [],
        activeName: []
      },
      methods: {
        checkPermission: function (ctrlCode) {
          return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
        },
        submit: function () {
          var vm = this;
          var selections = this.$refs.reftable.selections;

          var obj = {};
          yufp.extend(obj, this.submitData);
          obj.aprv = this.aprv;
          var datas = [];
          var allVali = false;
          for (var i = 0; i < this.pageInfos.length; i++) {
            var page = this.pageInfos[i].children;
            allVali = page.valiPagePluginData;
            if (!allVali)
              break;

          }
          if (!allVali) {
            this.$message({
              message: '存在未保存的数据!',
              type: 'warning'
            });
            return;
          }
          obj.uris = null;
          obj.vos = null;
          obj.data = datas;
          obj.e_bizSerno = obj.bizSerno;
          yufp.service.request({
            method: 'POST',
            url: backend.flowService + '/api/event/continue/page/async',
            data: obj,
            callback: function (code, message, response) {
              if (code == 0) {
                console.log(response);
                vm.visible = false;
                vm.$refs.reftable.remoteData();
                vm.$message('操作成功');
              } else {
                vm.$message('操作失败');
              }
            }
          });

        },
        close: function () {
          this.visible = false;
        },
        open: function () {
          var selections = this.$refs.reftable.selections;
          if (selections.length != 1) {
            this.$message({
              message: '请选择一条记录',
              type: 'warning'
            });
            return;
          }
          this.aprv.aprvComment = '';
          this.aprv.aprvOpinion = '';
          var data = selections[0];
          this.activeName = [];
          this.$nextTick(function () {
            yufp.service.request({
              method: 'POST',
              url: backend.flowService + '/api/node/aprv/finish',
              data: data,
              callback: function (code, message, response) {
                if (code == 0) {
                  var pageData = response.rows;
                  vm.bizNodeName = pageData.bizNodeName;
                  vm.vos = pageData.vos;
                  vm.submitData = pageData;
                  vm.visible = true;
                  if (vm.vos.length > 0) {
                    vm.vos[0].show = true;
                  }
                  vm.$nextTick(function () {
                    var pagePlugin;
                    var pageInfos = [];
                    for (var i = 0; i < vm.vos.length; i++) {
                      pagePlugin = vm.vos[i];
                      pagePlugin.show = (i == 0);
                      var pageInfo = {};
                      pageInfo.flowId = data.bizFlowId;
                      pageInfo.eventId = pageData.eventId;
                      pageInfo.e_bizSerno = pageData.bizSerno;
                      pageInfo.g_bizSerno = pageData.g_bizSerno;
                      pageInfo.taskId = pagePlugin.taskId;
                      pageInfo.instNodeId = pageData.instNodeId;
                      pageInfo.datas = pagePlugin.datas;
                      pageInfo.disabled = true;
                      pageInfo.dataKey = pagePlugin.dataKey;
                      pageInfo.taskDone = this.taskDone;
                      pageInfos.push(pageInfo);
                      vm.activeName.push(pagePlugin.bizPluginId);
                      vm.addRoute(pagePlugin.bizPluginId,
                        pagePlugin.bizPageUrl, pageInfo);

                    }
                    this.pageInfos = pageInfos;
                    if (vm.vos.length > 0) {
                      //vm.tabs  = vm.vos[0].bizPluginId;
                      vm.vos[0].show = true;
                    }
                  });
                } else {
                  vm.$message('操作失败');
                }
              }
            });


          });
        },
        //页面任务结束
        taskDone: function (pagePlugin, data, page) {
          var pageInfo = {};
          pageInfo.flowId = pagePlugin.flowId;
          pageInfo.eventId = pagePlugin.eventId;
          pageInfo.e_bizSerno = pagePlugin.e_bizSerno;
          pageInfo.g_bizSerno = pagePlugin.g_bizSerno;
          pageInfo.taskId = pagePlugin.taskId;
          pageInfo.instNodeId = pagePlugin.instNodeId;
          pageInfo.data = data;
          yufp.service.request({
            method: 'POST',
            url: backend.flowService + '/api/page/task/done',
            data: pageInfo,
            callback: function (code, message, response) {
              if (code == 0) {
                page.valiPagePluginData = true;
                vm.$message('保存成功');
              } else {
                vm.$message('操作失败');
              }
            }
          });
        },
        showPage: function (bizPluginId) {
          var vos = [];
          vm.tabs = bizPluginId;
          var pagePlugin;
          for (var i = 0; i < vm.vos.length; i++) {
            pagePlugin = vm.vos[i];
            pagePlugin.show = (pagePlugin.bizPluginId == bizPluginId);
            vos.push(pagePlugin);
          }
          vm.vos = vos;
        },
        addRoute: function (name, url, data) {

          //定义deferred
          var deferred = new yufp.core.Deferred();
          var target = {
            id: name,
            rootId: name,
            data: data
          };
          var cite = {
            id: target.id,
            rootId: target.rootId,
            el: '#' + target.rootId + '>div',
            startTime: new Date().getTime(),
            options: target.options
          };
          var route = {
            html: url + '.html',
            js: url + '.js'
          };
          //加入路由
          yufp.router.addRoute(name, route);
          //装载
          yufp.router.mount(target, route, cite, deferred);
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