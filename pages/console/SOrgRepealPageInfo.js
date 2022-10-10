/**
 * @create by xieziwei on 2020-09-25
 * @description 机构撤并申请表
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('JGCB_DEAL_STATUS,JGCB_DEAL_RESULT');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
          	expandCollapseName: ['1','2'],
        	dataUrl: backend.consoleService +'/api/s/org/repeal',
            baseParams: {
            },
            queryFields: [
	            { placeholder: '撤销机构代码', field: 'repealOldOrg', type: 'input' },
	            { placeholder: '合并机构代码', field: 'repealNewOrg', type: 'input' },
	            { placeholder: '处理状态', field: 'status', type: 'select',dataCode:'JGCB_DEAL_STATUS' },
	            { placeholder: '撤并日期区间', field: 'repealDateList', type: 'daterange' ,value:[] , editable:false }
            ],
            queryButtons: [
              { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                  if (valid) {
                  	if (model.repealDateList!=null){
                  		model.beginDate = model.repealDateList[0];
                  		model.endDate = model.repealDateList[1];
					}
                    _self.$refs.reftable.remoteData(model);
                  }
                } },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
            ],
  
            tableColumns: [
            	{ label: '撤并申请流水号', prop: 'applySeq', sortable: true, resizable: true },
  	     	  	{ label: '撤销机构号', prop: 'repealOldOrg', sortable: true, resizable: true },
				{ label: '撤销机构名称', prop: 'oldOrgName', sortable: true, resizable: true},
				{ label: '合并机构号', prop: 'repealNewOrg', sortable: true, resizable: true},
				{ label: '合并机构名称', prop: 'newOrgName', sortable: true, resizable: true},
				{ label: '撤并日期', prop: 'repealDate', sortable: true, resizable: true },
  	     		{ label: '广播日期（申请日期）', prop: 'broadcastDate', sortable: true, resizable: true },
  	     		{ label: '处理状态', prop: 'status', sortable: true, resizable: true, dataCode: 'JGCB_DEAL_STATUS' },
  	     		{ label: '上一次处理状态', prop: 'preStatus', sortable: true, resizable: true, dataCode: 'JGCB_DEAL_STATUS' },
  	     		{ label: '取消撤并日期', prop: 'cancelRepealDate', sortable: true, resizable: true},
  	     		{ label: '创建时间', prop: 'createTime', sortable: true, resizable: true,hidden:true},
  	     		{ label: '创建人', prop: 'createUser', sortable: true, resizable: true,hidden:true},
  	     		{ label: '最后修改时间', prop: 'lastUpdateTime', sortable: true, resizable: true,hidden:true},
  	     		{ label: '最后修改人', prop: 'lastUpdateUser', sortable: true, resizable: true,hidden:true},
				{ label: '全局流水号', prop: 'bakField1', sortable: true, resizable: true ,hidden:true},
				{ label: '当前处理阶段', prop: 'bakField2', sortable: true, resizable: true ,hidden:true},
				{ label: '备用字段3', prop: 'bakField3', sortable: true, resizable: true,hidden:true }
            ],
            
            updateFields: [{
              columnCount: 2,
              fields: [
				  { field: 'applySeq',label: '撤并申请流水号' },
				  { field: 'repealOldOrg',label: '撤销机构号' },
				  { field: 'oldOrgName',label: '撤销机构名称'},
				  { field: 'repealNewOrg',label: '合并机构号'},
				  { field: 'newOrgName',label: '合并机构名称'},
				  { field: 'repealDate',label: '撤并日期' },
				  { field: 'broadcastDate',label: '广播日期（申请日期)' },
				  { field: 'status',label: '处理状态', dataCode: 'JGCB_DEAL_STATUS' },
				  { field: 'preStatus',label: '上一次处理状态', dataCode: 'JGCB_DEAL_STATUS' },
				  { field: 'cancelRepealDate',label: '取消撤并日期'},
				  { field: 'createTime',label: '创建时间',hidden:true},
				  { field: 'createUser',label: '创建人',hidden:true},
				  { field: 'lastUpdateTime',label: '最后修改时间',hidden:true},
				  { field: 'lastUpdateUser',label: '最后修改人',hidden:true},
				  { field: 'bakField1',label: '全局流水号',hidden:true},
				  { field: 'bakField2',label: '当前处理阶段',hidden:true},
				  { field: 'bakField3',label: '备用字段3',hidden:true}

              ]
            }],

            updateButtons: [
              { label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.dialogVisible = false;
                } }
            ],

			/** 撤并检查历史表*/
			dataUrlHis: backend.consoleService +'/api/s/org/chk/dtl',
			  baseParamsHis:{},
			  queryFields1: [
				{ placeholder: '撤并检查流水号', field: 'chkSeq', type: 'input' },
				{ placeholder: '检查结果', field: 'chkResult', type: 'select',dataCode:'JGCB_DEAL_RESULT' },
				{ placeholder: '检查人', field: 'checker', type: 'input' }
			],
			  queryButtons1: [
				  { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
						  if (valid) {
							  _self.$refs.reftableHis.remoteData(model);
						  }
					  } },
				  { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
			  ],
			  chkTableColumns: [
				  { label: '撤并检查流水号', prop: 'chkSeq', sortable: true, resizable: true },
				  { label: '撤并申请流水号', prop: 'applySeq', sortable: true, resizable: true },
				  { label: '检查时间', prop: 'chkTime', sortable: true, resizable: true },
				  { label: '检查结果', prop: 'chkResult', sortable: true, resizable: true,dataCode:'JGCB_DEAL_RESULT'},
				  { label: '检查详情', prop: 'chkDetail', sortable: true, resizable: true},
				  { label: '检查详情展开', prop: 'chkFullDetail', sortable: true, resizable: true},
				  { label: '检查人', prop: 'checker', sortable: true, resizable: true }
				  ],

			  chkUpdateFields: [{
				  columnCount: 2,
				  fields: [
					  { field: 'chkSeq',label: '撤并检查流水号' ,hidden:true},
					  { field: 'applySeq',label: '撤并申请流水号' ,hidden:true},
					  { field: 'chkTime',label: '检查时间' ,hidden:true},
					  { field: 'chkResult',label: '检查结果',dataCode:'JGCB_DEAL_RESULT',hidden:true},
					  { field: 'chkDetail',label: '检查详情',hidden:true},
					  { field: 'chkFullDetail',label: '检查详情展开',type:'textarea'},
					  { field: 'checker',label: '检查人' ,hidden:true}
				  ]
			  }],
            height: yufp.frame.size().height - 103,
            dialogVisible: false,
            formDisabled: false,
            viewType: 'DETAIL',
            viewTitle: yufp.lookup.find('CRUD_TYPE', false)
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
        		_self.formDisabled = !editable;
        		_self.dialogVisible = true;
        	},

			rowClickFn: function (row, event, column) {
        		var _self = this;
				_self.$refs.baseRef.resetFields();
        		yufp.extend(_self.$refs.baseRef.formModel,row);
			},

        	checkFn: function () {
				var _self = this;
				if (_self.$refs.reftable.selections.length != 1) {
					_self.$message({ message: '请先选择一条记录', type: 'warning' });
        			return;
        		};
				var obj = _self.$refs.reftable.selections[0];
				if (obj.status == "0" || obj.status == "9") {
					_self.$message({ message: '选中记录无需处理！', type: 'warning' });
					return;
				};
				if (obj.status == "5") {
					_self.$message({ message: '选中记录已撤并成功，无须重新检查！', type: 'warning' });
					return;
				};
				this.$confirm('是否要重新发起撤并机构检查？', '提示').then(function () {
					yufp.service.request({
						method: 'POST',
						url: backend.consoleService +'/api/s/org/repeal/chk',
						data: obj,
						callback: function (code, message, response) {
							if (code == 0) {
								_self.$refs.reftable.remoteData();
								_self.$message("重新检查完毕，请前往详情页查看数据");
							} else {
								_self.$message('检查过程异常！');
							}
						}
					});
				});

        	},

			repealFn: function () {
				var _self = this;
				if (_self.$refs.reftable.selections.length != 1) {
					_self.$message({ message: '请先选择一条记录', type: 'warning' });
					return;
				};
				var obj = _self.$refs.reftable.selections[0];
				if (obj.status == "0" || obj.status == "9") {
					_self.$message({ message: '选中记录无需处理！', type: 'warning' });
					return;
				};
				if (obj.status == "5") {
					_self.$message({ message: '该记录已经撤并成功，无法重新发起！', type: 'warning' });
					return;
				};
				if (obj.bakField2 == "1") {
					_self.$message({ message: '当前记录处于撤并处理中，请耐心等待！', type: 'warning' });
					return;
				};

				this.$confirm('是否要发起强制撤并操作？', '提示').then(function () {
					yufp.service.request({
						method: 'POST',
						url: backend.consoleService +'/api/s/org/do/repeal',
						data: obj,
						callback: function (code, message, response) {
							if (code == 0 && response.code == 0) {
								_self.$refs.reftable.remoteData();
								_self.$message("后台撤并中，请稍后。可点击查看当前撤并进度。");
							} else {
								_self.$message(response.message);
							}
						}
					});
				});
			},
        	
        	infoFn: function () {
				var _self = this;
				if (_self.$refs.reftable.selections.length != 1) {
					_self.$message({ message: '请先选择一条记录', type: 'warning' });
        			return;
        		}
				var obj = _self.$refs.reftable.selections[0];
				_self.switchStatus('DETAIL', false);
				_self.baseParamsHis = {
					applySeq : obj.applySeq
				};
				_self.$refs.reftableHis.data=[];
				_self.$nextTick(function () {
					_self.$refs.reftableHis.remoteData();
				});
        	},

			returnFn: function () {
				var _self = this;
				_self.dialogVisible = false;
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
