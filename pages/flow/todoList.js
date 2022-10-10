/**
 * @create by xxx on 2018-xx-xx
 * @description xx
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('EVENT_STATUS,BIZ_NODE_TYPE,FLOW_STATUS,PERSONAL_FLOW_STATUS,APRV_OPINION');
        var height = yufp.custom.viewSize().height - 110;
        var defaultLoad = !data ? true : false;
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
                dataUrl: backend.flowService + '/api/done/wait',
                visible: false,
                defaultLoad: defaultLoad,
                tabs: 'myInfoCenter',
                aprv: {
                    aprvComment: '',
                    aprvOpinion: ''
                },
                uris: [],
                param: {
                    key: 'value'
                },
                bizNodeNameProp: data.bizNodeName != null ? data.bizNodeName : '',
                queryFields: [
                    {
                        placeholder: '业务流水号',
                        field: 'bizSerno',
                        type: 'input'
                    },
                    {
                        placeholder: '业务事件名称',
                        field: 'bizEventName',
                        type: 'input'
                    },
                    {
                        placeholder: '业务节点名称',
                        field: 'bizNodeName',
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
                    },
                    {
                        placeholder: '业务开始时间范围',
                        field: 'eventStartTime_b2e',
                        type: 'daterange',
                        value: [],
                        editable: false
                    }
                ],
                queryButtons: [
                    {
                        label: '查询',
                        op: 'submit',
                        type: 'primary',
                        icon: 'search',
                        click: function (model, valid) {
                            if (valid) {
                                if (typeof (model.eventStartTime_b2e) != 'undefined') {
                                    model.subTimeStart = model.eventStartTime_b2e[0];
                                    model.subTimeEnd = model.eventStartTime_b2e[1];
                                }
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
                tableColumns: [
                    {
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
                        label: '业务节点名称',
                        prop: 'bizNodeName'
                    },
                    {
                        label: '业务节点类型',
                        prop: 'bizNodeType',
                        dataCode: 'BIZ_NODE_TYPE'
                    },
                    {
                        label: '人工处理用户ID',
                        prop: 'processUserId',
                        hidden: true
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
                        label: '业务流转状态',
                        prop: 'instFlowState',
                        dataCode: 'FLOW_STATUS'
                    },{
                        label: '业务节点处理岗位编号',
                        prop: 'bizNodeDutyNo',
                        hidden:true
                    }
                ],
                ApHisTableColumns: [
                    { label: '流水号', prop: 'bizSerno', sortable: true, resizable: true },
                    { label: '所属阶段', prop: 'flowStage', sortable: true, resizable: true },
                    { label: '审批人', prop: 'aprvUserCode', sortable: true, resizable: true },
                    { label: '审批结果', prop: 'aprvStatus',  dataCode: 'APRV_OPINION',sortable: true, resizable: true },
                    { label: '审批意见', prop: 'aprvComment', sortable: true, resizable: true },
                    { label: '审批时间', prop: 'aprvDate', sortable: true, resizable: true },
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
                submitLoading: false,
                activeName: [],
                //需要异步验证的页面插件数组
                valiPagePlus: [],
                //当前验证的页面插件下标
                valiIndex: 0,

                changeCliamParams: {status : '1'},
                aprvHisParam:{bizSerno:'1'},
                dataUrlCC: backend.flowService + '/api/userDuty/infos',
                aprvHisUrl: backend.flowService + '/api/flow/history',
                queryChangeCliamFields: [
                    {placeholder: '用户代码', field: 'userCode', type: 'input'},
                    {placeholder: '用户名称', field: 'userName', type: 'input'},
                ],
                queryChangeCliamButtons: [
                    {
                        label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                            if (valid) {
                                model.status = '1';
                                vm.$refs.changeCliamTable.remoteData(model);
                            }
                        }
                    },
                    {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'}
                ],
                changeCliamColumns: [//s_user_duty
                    {label: '岗位代码', prop: 'dutyCode'},
                    {label: '岗位名称', prop: 'dutyName'},
                    {label: '用户代码', prop: 'userCode'},
                    {label: '用户名称', prop: 'userName'},
                    {label: '机构名称', prop: 'orgCode'},
                    {label: '联系电话', prop: 'telPhone'},
                    {label: '状态', prop: 'status',dataCode:'PERSONAL_FLOW_STATUS'},
                    {label: '正在处理件数', prop: 'taskNum'},
                ],
                dialogVisible: false,
                nodeId: ''
            },
            methods: {
                checkPermission: function (ctrlCode) {
                    return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
                },
                init: function () {
                    this.$refs.queryform.fm.bizNodeName = data.bizNodeName;
                },
                //验证异步
                valiAsynFn: function (flag) {
                    if (flag === true) {
                        //如果所有异步验证页面插件， 已经通过校验
                        if (this.valiIndex == this.valiPagePlus.length) {
                            setTimeout(function () {
                                vm.sureSubmit();
                                vm.saveAprvHistory();
                            }, 100);
                            return;
                        }
                        var page = this.valiPagePlus[this.valiIndex];
                        this.valiIndex++;
                        page.valiPagePluginData(this.valiAsynFn);

                    } else {
                        this.submitLoading = false;
                        return;
                    }
                },
                submit: function () {
                    var selections = this.$refs.reftable.selections;
                    this.valiPagePlus = [];
                    this.valiIndex = 0;
                    this.submitLoading = true;

                    var allVali = false;
                    for (var i = 0; i < this.pageInfos.length; i++) {
                        var page = this.pageInfos[i].children;
                        if (typeof (page.valiPagePluginData) === 'function') {
                            this.valiPagePlus.push(page);
                            continue;
                        } else
                            allVali = page.valiPagePluginData;

                        if (!allVali)
                            break;
                    }
                    if (this.pageInfos.length == this.valiPagePlus.length)
                        allVali = true;
                    if (!allVali) {
                        this.submitLoading = false;
                        this.$message({
                            message: '存在未保存的数据!',
                            type: 'warning'
                        });
                        return;
                    }
                    if (this.valiPagePlus.length > 0){
                        this.valiAsynFn(true);
                    }
                    else
                        this.sureSubmit();
                    var da = this.data;
                    var hisObj = {
                        bizSerno:selections[0].bizSerno,
                        flowStage:selections[0].bizStageName,
                        aprvStatus:this.vos[1].datas.PageApproveVO.aprvOpinion,
                        aprvComment:this.vos[1].datas.PageApproveVO.aprvComment,
                    }

                },
                //确认可以提交函数
                sureSubmit: function () {
                    var obj = {};
                    var datas = [];
                    var tempObj = {};
                    var objtemp = {};
                    yufp.extend(obj, this.submitData);
                    obj.aprv = this.aprv;
                    obj.uris = null;
                    obj.vos = this.vos;
                    obj.data = this.data;
                    obj.e_bizSerno = obj.bizSerno;

                    yufp.service.request({
                        method: 'POST',
                        url: backend.flowService + '/api/event/continue/page/async',
                        data: obj,
                        callback: function (code, message, response) {

                            // 0:失败, 1:成功, 2:已提交,不可再次提交,
                            if (code == 0) {
                                if (response.rows == 0) {
                                    vm.$message({message: '提交失败', type: 'warning'});
                                    vm.submitLoading = false;
                                } else if (response.rows == 1) {
                                    setTimeout(function () {
                                        vm.submitLoading = false;
                                        vm.visible = false;
                                        vm.$refs.reftable.remoteData();
                                        vm.$message({message: '提交成功', type: 'success'});
                                    }, 1000);
                                } else if (response.rows == 2) {
                                    setTimeout(function () {
                                        vm.submitLoading = false;
                                        vm.visible = false;
                                        vm.$refs.reftable.remoteData();
                                        vm.$message({message: '已提交,不可再次提交!', type: 'warning'});
                                    }, 1000);
                                } else
                                    vm.submitLoading = false;
                            } else {
                                vm.$message('操作失败');
                            }
                        }
                    });
                },
                close: function () {
                    this.visible = false;
                    this.submitLoading = false;
                },
                claim: function () {
                    var selections = this.$refs.reftable.selections;
                    if (selections.length != 1) {
                        this.$message({
                            message: '请选择一条记录',
                            type: 'warning'
                        });
                        return;
                    }
                    var bizSerno = this.$refs.reftable.selections[0].bizSerno;
                    this.$confirm('确认领取该任务？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    data: {
                                        bizSerno : bizSerno
                                    },
                                    url: backend.flowService + '/api/task/claim',
                                    callback: function (code, message, response) {
                                        if (code == 0) {
                                            if (response.rows == "1") {
                                                vm.$message('领取成功, 请至待办事项页面查看');
                                                if (typeof (vm.$refs.queryform.fm) != 'undefined') {
                                                    for (var key in vm.$refs.queryform.fm) {
                                                        vm.$refs.queryform.fm[key] = null;
                                                    }
                                                }
                                                vm.$nextTick(function () {
                                                    vm.$refs.reftable.remoteData();
                                                });
                                            } else if (response.rows == "-1") {
                                                vm.$message('当前无满足认领条件的任务');
                                            } else {
                                                vm.$message('领取失败');
                                            }
                                        } else {
                                            vm.$message('领取失败');
                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                changeCliam: function () {
                    var selections = this.$refs.reftable.selections;
                    if (selections.length != 1) {
                        this.$message({
                            message: '请选择一条记录',
                            type: 'warning'
                        });
                        return;
                    }
                    if (selections[0].processUserId == 'taskPoolUserId') {
                        this.$message({
                            message: '该任务未被认领，无法调单！',
                            type: 'warning'
                        });
                        return;
                    }

                    this.dialogVisible = true;
                    this.nodeId = selections[0].instNodeId;
                    this.changeCliamParams = {
                        dutyCode: selections[0].bizNodeDutyNo,
                        status: '1'
                    };
                    this.$nextTick(function () {
                        this.$refs.changeCliamTable.remoteData(this.changeCliamParams);
                    })
                },
                confirmDataFn: function () {
                    var selections = this.$refs.changeCliamTable.selections;
                    if (selections.length != 1) {
                        this.$message({
                            message: '请选择一条记录',
                            type: 'warning'
                        });
                        return;
                    }
                    if (selections[0].taskNum >= 10) {
                        this.$message({
                            message: '该用户名下任务已达到10条！',
                            type: 'warning'
                        });
                        return;
                    }
                    var params = {
                        nodeId: this.nodeId,
                        userId: selections[0].userCode,
                        userName: selections[0].userName
                    };
                    this.$confirm('确认调单？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'GET',
                                    url: backend.flowService + '/api/task/changeUser',
                                    data: params,
                                    callback: function (code, message, response) {
                                        if (code == 0) {
                                            vm.$refs.reftable.remoteData();
                                            vm.concancelFn();
                                            vm.$message('处理成功！');
                                        } else {
                                            vm.concancelFn();
                                            vm.$message('处理失败');
                                        }
                                    }
                                });
                            }
                        }
                    });

                },
                concancelFn: function () {
                    this.$refs.changeCliamTable.data = [];
                    this.nodeId = '';
                    this.dialogVisible = false;
                },
                open: function () {
                    var selections = this.$refs.reftable.selections;
                    if (selections.length != 1) {
                        this.$message({message: '请选择一条记录', type: 'warning'});
                        return;
                    }
                    var data = selections[0];
                    if (yufp.session.userName != data.processUserName) {
                        this.$message({message: '您尚未领取当前的任务，请先领取。', type: 'warning'});
                        return;
                    }
                    this.aprv.aprvComment = '';
                    this.aprv.aprvOpinion = '';
                    this.aprvHisParam = {
                        bizSerno:selections[0].bizSerno,
                    };
                    this.activeName = [];
                    yufp.service.request({
                        method: 'POST',
                        url: backend.flowService + '/api/node/aprv',
                        data: data,
                        callback: function (code, message, response) {
                            if (code == 0) {
                                var pageData = response.rows;
                                if (pageData.dealFlag == 0) {
                                    vm.$message({message: '系统异常,请刷新重试!', type: 'warning'});
                                    return;
                                } else if (pageData.dealFlag == 2) {
                                    vm.$message({message: '当前节点已经处理,不可再次处理,请刷新重试!', type: 'warning'});
                                    return;
                                }
                                vm.bizNodeName = pageData.bizNodeName;
                                vm.vos = pageData.vos;
                                vm.submitData = pageData;
                                vm.visible = true;
                                if (vm.vos.length > 0) {
                                    vm.vos[0].show = true;
                                };
                                vm.$nextTick(function(){
                                    vm.$refs.aprvHistoryTable.remoteData(this.aprvHisParam);
                                });
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
                                        //防止多节点流程，展示上一节点的审批信息
                                        if('A' != pagePlugin.bizPluginType){
                                            pageInfo.datas = pagePlugin.datas;
                                        }else{
                                            pageInfo.datas = [];
                                        }
                                        pageInfo.dataKey = pagePlugin.dataKey;
                                        pageInfo.taskDone = this.taskDone;
                                        pageInfo.bizPageUrl = pagePlugin.bizPageUrl; //前端页面URL
                                        //pageInfo.getApprInfo = this.getApprInfo; //获取审批信息
                                        pageInfo.parentName = 'todoList'; //转移按钮权限到审批页面
                                        pageInfos.push(pageInfo);
                                        vm.activeName.push(pagePlugin.bizPluginId);
                                        vm.addRoute(pagePlugin.bizPluginId, pagePlugin.bizPageUrl, pageInfo);
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
                    this.data = data;
                    yufp.service.request({
                        method: 'POST',
                        url: backend.flowService + '/api/page/task/done',
                        data: pageInfo,
                        callback: function (code, message, response) {
                            // 0:失败, 1:不理, 2:已提交,不可再次提交,
                            if (code == 0) {
                                if (response.rows === true) {
                                    vm.$message({message: '保存成功!', type: 'success'});
                                    if (typeof (page.valiTaskDone) == 'function') {
                                        page.valiTaskDone(true);
                                    }
                                } else if (response.rows === false) {
                                    vm.$message({message: '保存失败!', type: 'warning'});
                                    if (typeof (page.valiPagePluginData) === 'boolean') {
                                        page.valiPagePluginData = true;
                                    }
                                    if (typeof (page.valiTaskDone) == 'function') {
                                        page.valiTaskDone(false);
                                    }
                                }
                            } else {
                                if (typeof (page.valiTaskDone) == 'function') {
                                    page.valiTaskDone(false);
                                }
                                vm.$message('保存失败!');
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
                },
                //获取到子页面的审批信息
                getApprInfo: function () {
                    var apprInfo = null;
                    var apprPage = null;
                    for (var i = 0; i < this.pageInfos.length; i++) {
                        var bizPageUrl = this.pageInfos[i].bizPageUrl;
                        if (typeof (bizPageUrl) === 'string' && bizPageUrl.indexOf(CONSTANT.approveUrl) != -1) {
                            apprPage = this.pageInfos[i];
                            break;
                        }
                    }
                    if (apprPage != null)
                        apprInfo = apprPage.children.getApprInfo();
                    return apprInfo;
                },

                // 生成历史审批信息
                saveAprvHistory:function () {
                    var obj = {};
                    var datas = [];
                    var tempObj = {};
                    var objtemp = {};
                    yufp.extend(obj, this.submitData);
                    obj.aprv = this.aprv;
                    obj.uris = null;
                    obj.vos = this.vos;
                    obj.data = this.data;
                    obj.e_bizSerno = obj.bizSerno;


                    yufp.service.request({
                        method: 'POST',
                        url: backend.flowService + '/api/flow/history/save',
                        data: obj,
                        callback: function (code, message, response) {

                            // 0:失败, 1:成功, 2:已提交,不可再次提交,
                            if (code == 0) {
                                if (response.rows == 0) {
                                    vm.$message({message: '提交失败', type: 'warning'});
                                    vm.submitLoading = false;
                                } else if (response.rows == 1) {
                                    setTimeout(function () {
                                        vm.submitLoading = false;
                                        vm.visible = false;
                                        vm.$refs.reftable.remoteData();
                                        vm.$message({message: '提交成功', type: 'success'});
                                    }, 1000);
                                } else if (response.rows == 2) {
                                    setTimeout(function () {
                                        vm.submitLoading = false;
                                        vm.visible = false;
                                        vm.$refs.reftable.remoteData();
                                        vm.$message({message: '已提交,不可再次提交!', type: 'warning'});
                                    }, 1000);
                                } else
                                    vm.submitLoading = false;
                            } else {
                                vm.$message('操作失败');
                            }
                        }
                    });
                }

            },
            mounted: function () {
                if (data) {
                    this.$refs.queryform.fm.bizNodeName = data.bizNodeName;
                    this.$refs.reftable.remoteData(this.$refs.queryform.fm);
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
