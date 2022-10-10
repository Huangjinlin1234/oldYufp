/**
 * 规则查看页面
 * @create by xxx on 2018-xx-xx
 * @description xx
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {

        // 创建virtual model
        var vm = yufp.custom.vue({
            el: cite.el,
            data: {
                activeNames: ['1', '2'],
                ruleCollDtlsUrl: backend.consoleService+ "/api/s/rule/coll/dtls-collid/",
                sRuleCollDtlParams: {},

                sRuleCollField: [{
                    columnCount: 2,
                    fields: [
                        { field: 'ruleCollId', label: '规则集编号', editable:'false',},
                        { field: 'ruleCollDesc', label: '规则集合描述'},
                        { field: 'ruleCollType', label: '规则类型', dataCode:'RULE_TYPE', type: 'select' },
                        { field: 'status', label: '状态', dataCode:'COMMON_STATUS', type: 'select' },
                        { field: 'createTime', label: '创建日期' }
                    ]
                }],

                sRuleCollDtlColumns: [
                    { label: '规则配置明细ID', prop: 'dtlId', sortable: true, resizable: true },
                    { label: '规则集编号', prop: 'ruleCollId', sortable: true, resizable: true },
                    { label: '规则ID', prop: 'ruleId', sortable: true, resizable: true },
                    { label: '规则名称', prop: 'ruleName', sortable: true, resizable: true },
                    { label: '规则配置描述', prop: 'ruleCfgDesc', sortable: true, resizable: true},
                    { label: '状态', prop: 'status', sortable: true, resizable: true, dataCode:'COMMON_STATUS' },
                    { label: '规则对应参数配置状态', prop: 'paramValStatus', sortable: true, resizable: true, dataCode:'RULE_PARAM_VAL_STATUS' },
                    { label: '操作', prop: '', template: function() {
                        return '<template scope="scope">\
                          <el-button icon= "document" @click="_$event(\'custom-row-click\',scope)" >查看</el-button>\
                          </template>';
                    }}
                ],

                sRuleCollDtlField: [{
                    columnCount: 2,
                    fields: [
                        { field: 'ruleId', label: '规则ID'},
                        { field: 'ruleName', label: '规则名称'}
                    ]
                },{
                    columnCount: 1,
                    fields: [
                        { field: 'ruleCfgDesc', label: '规则描述'}
                    ]
                } ],

                mainGrid: {
                    data: null,
                    loading: false,
                    multipleSelection: []
                },

                height: yufp.frame.size().height - 103,
                paramDialogVisible: false,
                
            },
            methods: {
                viewDetail: function() {
                    if (this.$refs.sRuleCollDtlTable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                
                    var obj = this.$refs.sRuleCollDtlTable.selections[0];
                    if (obj.paramValStatus == 01) {
                        this.$message({ message: '当前规则不存在需要配置参数', type: 'warning' });
                        return;
                    }
                    var _this = this;
                    _this.paramDialogVisible = true;
                    this.sRuleCollDtlParams.isViewParamStatus = true;
                    this.$nextTick(function () {
                        yufp.extend(this.$refs.sRuleCollDtlParamForm.formModel, obj);
                    });
                  
                
                    yufp.service.request({
                        method: 'POST',
                        url: backend.consoleService + "/api/s/rule/coll/dtl/param/dtl",
                        data: {'dtlId':obj.dtlId},
                        callback: function (code, message, response) {
                            _this.mainGrid.data = response.data;
                        }
                    });

                },
                rtnParam: function () {
                    this.paramDialogVisible = false;
                },
                lookDetail: function(scope) {
                    var obj = scope.row;
                    if (obj.paramValStatus == 01) {
                        this.$message({ message: '当前规则不存在需要配置参数', type: 'warning' });
                        return;
                    }
                    var _this = this;
                    _this.paramDialogVisible = true;
                    this.sRuleCollDtlParams.isViewParamStatus = true;
                    this.$nextTick(function () {
                        yufp.extend(this.$refs.sRuleCollDtlParamForm.formModel, obj);
                    });
                
                    yufp.service.request({
                        method: 'POST',
                        url: backend.consoleService + "/api/s/rule/coll/dtl/param/dtl",
                        data: {'dtlId':obj.dtlId},
                        callback: function (code, message, response) {
                            _this.mainGrid.data = response.data;
                        }
                    });
                }
            },
            mounted: function () {
                if ( typeof(data) != 'undefined' && data != null ) {
                	  var _self = this;
                    this.$nextTick(function (){
                    	  yufp.service.request({
                          method: 'POST',
                          url: backend.consoleService + '/api/s/rule/coll/' + data.ruleCollId,
                          callback: function (code, message, response) {
                          	if ( response &&  response.success == true) {
                            	var ruleObj = response.data; 
                            	yufp.extend(_self.$refs.sRuleCollForm.formModel, ruleObj);
                              _self.$refs.sRuleCollDtlTable.remoteData(ruleObj);
                          	}else 
                          	  _self.$message({ message: '查询详情失败!', type : 'warning' });
                          }
                    	  });
                        
                    });
                }
            }
        });

    };
    // 消息处理
    exports.onmessage = function (type, message) {

    };
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    }

});