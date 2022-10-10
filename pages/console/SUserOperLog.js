/**
 * @create by xieziwei 20210312
 * @description 用户操作日志页面
 */
define(function (require, exports) {


    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('Oper_Type,Log_level');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
        	dataUrl: backend.consoleService +'/api/user/oper/logs',
            baseParams: {
            },
            queryFields: [
	            { placeholder: '用户账户', field: 'userId', type: 'input' },
	            { placeholder: '机构', field: 'userOrgCode', type: 'input' },
	            { placeholder: '操作类型', field: 'operType', type: 'select',dataCode:'Oper_Type' },
	            { placeholder: '日志时间', field: 'createTime2e', type: 'daterange' ,value:[]},
	            { placeholder: '日志等级', field: 'logLevel', type: 'select',dataCode:'Log_level' }
            ],
            queryButtons: [
              { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                  if (valid) {
                  	if (model.createTime2e.length>0){
                  		model.createTimeBegin = model.createTime2e[0];
                  		model.createTimeEnd = model.createTime2e[1];
					}
                    _self.$refs.reftable.remoteData(model);
                  }
                } },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
            ],
  
            tableColumns: [
				{ label: '主键', prop: 'id', sortable: true, resizable: true,hidden:true},
				{ label: '用户账户', prop: 'userId', sortable: true, resizable: true },
            	{ label: '用户名称', prop: 'userName', sortable: true, resizable: true },
				{ label: '归属机构', prop: 'userOrgCode', sortable: true, resizable: true,hidden:true},
				{ label: '操作类型', prop: 'operType', sortable: true, resizable: true,dataCode:'Oper_Type'},
  	     	  	{ label: 'Url', prop: 'operPageUrl', sortable: true, resizable: true},
  	     		{ label: '页面名称', prop: 'operPageName', sortable: true, resizable: true },
				{ label: '操作详情', prop: 'operInfo', sortable: true, resizable: true,hidden:true},
  	     		{ label: '用户ip地址', prop: 'userIpAddr', sortable: true, resizable: true,hidden:true},
				{ label: '日志等级', prop: 'logLevel', sortable: true, resizable: true ,dataCode:'Log_level'},
				{ label: '记录时间', prop: 'createTime', sortable: true, resizable: true}
			],
            
            updateFields: [
            	{
					  columnCount: 3,
					  fields: [
							 { field: 'id', label: '主键',hidden:true},
							 { field: 'userId', label: '用户账户'},
							 { field: 'userName', label: '用户名称'},
							 { field: 'userOrgCode', label: '归属机构'},
							 { field: 'operType', label: '操作类型',type: 'select',dataCode:'Oper_Type'},
							 { field: 'operPageUrl', label: 'Url'},
							 { field: 'operPageName', label: '页面名称'},
							 { field: 'userIpAddr', label: '用户ip地址'},
							 { field: 'logLevel', label: '日志等级',type: 'select',dataCode:'Log_level'},
							 { field: 'createTime', label: '记录时间'}
					  ]
            	},
				{
					columnCount: 1,
					fields: [
						{ field: 'operInfo', label: '操作详情',type:'textarea', rows: 2}
					]
				}
            ],
            
            updateButtons: [
              { label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.dialogVisible = false;
                } }
            ],
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

        	infoFn: function () {
        		if (this.$refs.reftable.selections.length != 1) {
        			this.$message({ message: '请先选择一条记录', type: 'warning' });
        			return;
        		}
        		var _self = this;
				_self.switchStatus('DETAIL',false);
        		var obj = _self.$refs.reftable.selections[0];
				_self.$nextTick(function () {
					yufp.extend(this.$refs.reform.formModel,obj);
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
