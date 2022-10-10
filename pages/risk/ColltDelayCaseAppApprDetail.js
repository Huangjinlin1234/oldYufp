/**
 * @create by szbd
 * @description 委外延案申请审批查看页面
 * @createDate 2019-09-02
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        // 引入字典项
        yufp.lookup.reg('CRUD_TYPE,APRV_STATUS,TIME_UNIT');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
            var _self = this;
            return {
				dataUrl: backend.riskmService + '/api/collt/delay/case/records',
				baseParams: {
				},

				tableColumns: [
					{ label: '延案申请流水号', prop: 'delayCaseAppSerno', sortable: true, resizable: true, hidden: true  },
					{ label: '催收任务编号', prop: 'colltTaskNo', sortable: true, resizable: true },
					{ label: '分配批次号', prop: 'colltBatchNo', sortable: true, resizable: true },
					{ label: '委外机构编号', prop: 'outsOrgCode', sortable: true, resizable: true },
					{ label: '委外机构名称', prop: 'outsOrgName', sortable: true, resizable: true },
					{ label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
					{ label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
					{ label: '借据编号', prop: 'loanNo', sortable: true, resizable: true },
					{ label: '延长时间', prop: 'delayTime', sortable: true, resizable: true, type:'datetime' },
					{ label: '延长时间单位', prop: 'delayTimeUnit', sortable: true, resizable: true, dataCode: 'TIME_UNIT'},
					{ label: '申请时间', prop: 'createTime', sortable: true, resizable: true },
					{ label: '操作员', prop: 'opUserCode', sortable: true, resizable: true },
					{ label: '操作员所属机构', prop: 'opOrgCode', sortable: true, resizable: true }
				],

                // updateFields: [ {
                // 	columnCount: 3,
				// 	fields: [
				// 	{field: 'colltTaskNo', label: '催收任务编号',disabled: true},
				// 	{field: 'colltBatchNo', label: '分配批次号', disabled: true},
				// 	{field: 'outsOrgCode', label: '委外机构编号', disabled: true},
				// 	{field: 'outsOrgName', label: '委外机构名称', disabled: true},
				// 	{field: 'cusId', label: '客户编号', disabled: true},
				// 	{field: 'cusName', label: '客户名称', disabled: true},
				// 	{field: 'loanNo', label: '借据编号', disabled: true},
				// 	{field: 'opUserCode', label: '操作员', disabled: true},
				// 	{field: 'opOrgCode', label: '操作员所属机构', disabled: true},
				// 	{field: 'delayTime', label: '延长时间', rules: [ { required: true, message: '必输项', trigger: 'blur' }] },
				// 	{field: 'delayTimeUnit', label: '延长时间单位', type: 'select', dataCode: 'TIME_UNIT', rules: [ { required: true, message: '必输项', trigger: 'blur' }]}
				//   ]
                // } ],

                height: yufp.frame.size().height - 103,
                formDisabled: false,
                viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                //valiPagePluginData: true,
              }
            },

            methods: {
            	
            },

            mounted: function () {
        		data.children = this;
        		var obj = data.datas[data.dataKey];
        		this.valiPagePluginData = true;
        		var _self = this;
				_self.baseParams = {
					delayCaseAppSerno: obj.delayCaseAppSerno
				}
        		this.$nextTick(function(){
        			// yufp.extend(this.$refs.reform.formModel, obj);
					_self.$refs.reftable.remoteData(_self.baseParams);
        		});
        	} // end of mounted

        });
    };
    // 消息处理
    exports.onmessage = function (type, message) {};
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {}
});
