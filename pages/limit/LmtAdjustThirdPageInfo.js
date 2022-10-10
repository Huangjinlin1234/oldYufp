/**
 * @create by szbd
 * @description 额度调整申请表的前端js
 * @createDate 2018-10-07 11:10:16
 */
define([
	  './custom/widgets/js/PrdIdInfoSelector.js'
	], function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        //引入字典项
        yufp.lookup.reg('CRUD_TYPE,LMT_ADJ_COMMENT,LMT_ADJ_MODE,LMT_ADJ_STATUS,STD_ZB_APPR_STATUS,LMT_ZB_ADJ_TYPE,STD_ZB_ADJ_STATUS,STD_ZB_CERT_TYP,STD_ZB_ADJ_TYPE,STD_ZB_ADJ_BASE,STD_ZB_LMT_REJECT_RSN');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
            var _self = this;
            return {
            	
            	dataUrl:backend.creditService + '/api/lmt/adjust/third/apps',
                baseParams: {
                },
                //搜索条件
                queryFields: [
                    {placeholder: '调额申请编号', field: 'adjSeq', type: 'input'},
                    {placeholder: '渠道名称', field: 'channelNo', type: 'select',dataCode:'APPLY_CHANNEL_TYPE',
                    	change:function(value,model,args){
                        	_self.$refs.form.fm.prdName=''; 
                    	}
                    },
                    {placeholder: '产品名称', field: 'prdName', type: 'custom', is: 'div-prdId-info-selector' ,params:{channelNo:'',type:''},
        				clickFn:function(value,model,args){
        					_self.$refs.form.switch('prdName','params',{channelNo:model.channelNo,type:'name'});
        					_self.$refs.form.rebuildFn();
        				}
                    },
                    {placeholder: '客户编号', field: 'cusId', type: 'input'},
                    {placeholder: '客户名称', field: 'cusName', type: 'input'},
                    {placeholder: '证件类型', field: 'certType', type: 'select',dataCode:'STD_ZB_CERT_TYP'},
                    {placeholder: '证件号码', field: 'certCode', type: 'input'},
                    {placeholder: '进件日期区间', field: 'signDate_b2e', type: 'daterange' ,value:[] , editable:false },
                    {placeholder: '审批状态', field: 'adjStatus', type: 'select',dataCode:'LMT_ADJ_STATUS'},
                ],
                queryButtons: [
                    {label:'查询', op: 'submit', type:'primary', icon:'search', click:function (model, valid) {
                        if (valid) {
                            _self.$refs.reftable.remoteData(model);
                        }
                    }},
                    {label:'重置', op:'reset', type:'primary', icon:'yx-loop2'}
                ],
                tableColumns: [
                    {label:'调额申请编号', prop:'adjSeq', sortable:true, resizable:true,width:130},
                    {label:'客户编号', prop:'cusId', sortable:true, resizable:true},
                    {label:'客户名称', prop:'cusName', sortable:true, resizable:true},
                    {label:'证件类型', prop:'certType', sortable:true, resizable:true,dataCode:'STD_ZB_CERT_TYP'},
                    {label:'证件号码', prop:'certCode', sortable:true, resizable:true},
                    {label:'渠道名称', prop:'channelNo', sortable:true, resizable:true, dataCode:'APPLY_CHANNEL_TYPE'},
                    {label:'产品名称', prop:'prdName', sortable:true, resizable:true},
                    {label:'调整前额度', prop:'adjBasicLmt', sortable:true, resizable:true},
                    {label:'调整后额度', prop:'adjResultLmt', sortable:true, resizable:true},
                    {label:'调整类型', prop:'bdScenarioType', sortable:true, resizable:true,dataCode:'LMT_ZB_ADJ_TYPE'},
                    {label:'调整原因', prop:'adjComment', sortable:true, resizable:true,dataCode:'LMT_ADJ_COMMENT'},
                    {label:'调额方向', prop:'adjMode', sortable:true, resizable:true, dataCode:'LMT_ADJ_MODE'},
                    {label:'进件时间', prop:'applyDate', sortable:true, resizable:true},
                    {label:'审批状态', prop:'adjStatus', sortable:true, resizable:true, dataCode:'LMT_ADJ_STATUS'},
                    {label:'审批时间', prop:'lastUpdateTime', sortable:true, resizable:true},
                ],
                updateFields: [{
                    columnCount: 3,
                    fields: [
                        {field:'adjSeq', label:'调额申请编号'},
                        {field:'cusId', label:'客户编号'},
                        {field:'cusName', label:'客户名称'},
                        {field:'bdYxdDate', label:'首次用信时间'},
                        {field:'certType', label:'证件类型',type:'select',dataCode:'STD_ZB_CERT_TYP'},
                        {field:'certCode', label:'证件号码'},
                        {field:'channelNo', label:'渠道名称',type: 'select', dataCode:'APPLY_CHANNEL_TYPE',
                        	change:function(fields){
			  		               		if(fields != "05"){
			  		               			_self.$refs.basecollapse.$children[1].$el.hidden = true;
			  		               		}else{
			  		               			_self.$refs.basecollapse.$children[1].$el.hidden = false;
			  		               		}
		                     	  } 
                        },
                        {field:'prdName', label:'产品名称'},
                        {field:'adjBasicLmt', label:'调整前额度'},
                        {field:'adjResultLmt', label:'调整后额度'},
                        {field:'bdScenarioType', label:'调整类型',type:'select',dataCode:'LMT_ZB_ADJ_TYPE'},
                        {field:'adjComment', label:'调额原因',type:'select',dataCode:'LMT_ADJ_COMMENT'},
                        {field:'adjMode', label:'调额方向',type:'select',dataCode:'LMT_ADJ_MODE'},
                        {field:'applyDate', label:'进件时间'},
                        {field:'adjStatus', label:'审批状态',type:'select',dataCode:'LMT_ADJ_STATUS'},
                        {field:'lastUpdateTime', label:'审批时间'},
                        {field:'createUser', label:'创建人'},
                        {field:'createTime', label:'创建时间'},
                        {field:'lastUpdateUser', label:'修改人'},
                        {field:'lastUpdateTime', label:'修改时间'}
                    ]
                }],
                baiduFields: [{
                    columnCount: 3,
                    fields: [
                      { field: 'bdPostLoanLevel', label: '贷中人群分层', disabled: true },
                      { field: 'bdPreaCustSeg', label: '贷前人群分层', disabled: true },
                      { field: 'bdEducation', label: '最高学历', disabled: true,type:'select',dataCode:'ZB_DEGREE' },
                      { field: 'bdAge', label: '年龄', disabled: true },
                      { field: 'bdBlackListType', label: '黑名单类型', disabled: true },
                      { field: 'bdPrcidNormalScoreExp3', label: '内部多头分（身份证）', disabled: true },
                      { field: 'bdBidNormalScoreExp3', label: '内部多头分（百度帐号）', disabled: true },
                      { field: 'bdPhoneNormalScoreExp3', label: '内部多头分（手机）', disabled: true },
                      { field: 'bdUtilityRatio', label: '最近三个月额度利用率', disabled: true },
                      { field: 'bdJxjdueTimes', label: '当前逾期期数', disabled: true },
                      { field: 'bdDxmbScore', label: '度小满B模型分数', disabled: true }
                    ]
                  }],
                updateButtons: [
                    {label:'返回', type:'primary', icon:'yx-undo2', hidden:false, click:function (model) {
                        _self.dialogVisible = false;
                    }},
                    {label:'保存', type:'primary', icon:'check', hidden:false, click:function (model) {
                        var validate = false;
                        _self.$refs.reform.validate(function (valid) {
                            validate = valid;
                        });
                        if (!validate) {
                            return;
                        }
                        var rMethod = '';
                        if(_self.viewType == "EDIT") {
                            rMethod = 'PUT';
                        } else if(_self.viewType == "ADD") {
                            rMethod = 'POST';
                        }
                        yufp.service.request({
                            method: rMethod,
                            url: '/api/lmt/adjust/app',
                            data: model,
                            callback: function (code, message, response) {
                                if (code == 0) {
                                    _self.$refs.reftable.remoteData();
                                    _self.$message('操作成功');
                                    _self.dialogVisible = false;
                                } else {
                                    _self.$message('操作失败');
                                }
                            }
                        });
                    }}
                ],
                height: yufp.frame.size().height - 103,
                dialogVisible: false,
                formDisabled: false,
                viewType: 'DETAIL',
                viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                expandCollapseName: ['applyBase', 'updateItem','baiduItem']
                }
            },
            methods: {
                /**
                * @param ctrlCode 操作码
                */
                checkPermission: function(ctrlCode) {
                    return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
                },
                /**
                * @param viewType 表单类型
                * @param editable 可编辑,默认false
                */
                switchStatus: function (viewType, editable) {
                    var _self = this;
                    _self.viewType = viewType;
                    // _self.updateButtons[0].hidden = !editable;
                    _self.updateButtons[1].hidden = !editable;
                    _self.formDisabled = !editable;
                     _self.dialogVisible = true;
                },
                addFn: function () {
                    var _self = this;
                    _self.switchStatus('ADD', true);
                    _self.$nextTick(function () {
                        _self.$refs.reform.resetFn();
                    });
                },
                modifyFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    this.switchStatus('EDIT', true);
                    this.$nextTick(function () {
                        var obj = this.$refs.reftable.selections[0];
                        yufp.extend(this.$refs.reform.formModel, obj);
                    });
                },
                infoFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var _self = this;
                    this.switchStatus('DETAIL', false);
                    this.$nextTick(function () {
                        yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
                        yufp.extend(this.$refs.baiduRef.formModel, this.$refs.reftable.selections[0]);
                        
//                        yufp.service.request({
//                			method: "POST",
//                			url: backend.creditService + '/api/nls/credit/infos',
//                			data: {lmtApplySeq: this.$refs.reftable.selections[0].lmtApplySeq},
//                			callback: function (code, message, response) {
//                				if (response.success) {
//                					if(response.rows.length > 0){
//                						yufp.extend(_self.$refs.baiduRef.formModel, response.rows[0]);
//                					}
//                				} else {
//                					_self.$message("获取信息失败：" + response.message);
//                				}
//                			}
//                		});
                    });
                },
                deleteFn: function () {
                    var _self = this;
                    var selections = _self.$refs.reftable.selections;
                    if (selections.length < 1) {
                        _self.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    
                    yufp.service.request({
                        method: 'DELETE',
                        url: '/api/lmt/adjust/app',
                        data: {
                            adjSerno: selections[0].adjSerno
                        },
                        callback: function (code, message, response) {
                            if (code == 0) {
                                _self.$refs.reftable.remoteData();
                                _self.$message('操作成功');
                            } else {
                                _self.$message('操作失败');
                            }
                        }
                    });
                },
                exportFn: function () {
                    yufp.util.exportExcelByTable({
                        fileName: '下载文件',
                        importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                        ref: this.$refs.reftable,
                        url: '',
                        param: {}
                    });
                }
            }
        });
    };
    // 消息处理
    exports.onmessage = function (type, message) {};
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {}
});
