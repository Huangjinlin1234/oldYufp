/**
 * @create by szbd
 * @description 委外催收人工流转审批查看页面
 * @createDate 2019-09-05
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        // 引入字典项
        yufp.lookup.reg('CRUD_TYPE,APRV_STATUS');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
            var _self = this;
            return {
            	updateFields: [
					{
						columnCount: 3,
						fields: [
							{field: 'cusId', label: '客户编号', disabled: true},
							{field: 'cusName', label: '客户名称', disabled: true},
							{field: 'phoneNum', label: '手机号码', disabled: true },
							{field: 'liveAddr', label: '居住地址', disabled: true},
							{field: 'loanNo', label: '借据编号', disabled: true},
							{field: 'overDays', label: '逾期天数', disabled: true},
							{field: 'overLmt', label: '逾期金额', disabled: true},

							{field: 'flowApplyNo', label: '流转申请编号', disabled: true},
							{field: 'colltTaskNo', label: '催收任务编号', disabled: true},
							{field: 'basicColltTaskType', label: '原催收任务类型', disabled: true, type:'select',dataCode:'STD_COLLT_WAY'},
							{field: 'flowColltTaskType', label: '流转催收任务类型', disabled: true,type:'select',dataCode:'STD_COLLT_WAY'},
							{field: 'createUser', label: '申请人', disabled: true},
							{field: 'createTime', label: '申请时间', disabled: true},
							{field: 'lastUpdateUser', label: '最后修改人', disabled: true, hidden: true},
							{field: 'lastUpdateTime', label: '最后修改时间', disabled: true, hidden: true}
						]
					},
					{
						columnCount: 1,
						fields: [
							{field: 'flowReson', label: '流转原因', disabled: true, type: 'textarea', rows: 3, rules: [{ required: true, message: '必输项', trigger: 'blur' }]}
						]
					}
				],

                height: yufp.frame.size().height - 103,
                formDisabled: false,
                viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                //valiPagePluginData: true,
              }
            },

            mounted: function () {
				data.children = this;
				var obj = data.datas[data.dataKey];
				this.valiPagePluginData = true;
				var vieForm = this.$children[0].formModel;
				this.$nextTick(function(){
					yufp.service.request({
						method: 'POST',
						url: backend.riskmService + '/api/get/task/byno',
						data: {colltTaskNo:obj.colltTaskNo},
						callback: function (code, message, response) {
							if (response.code == 0) {
								obj.cusId = response.rows.cusId;
								obj.cusName = response.rows.cusName;
								obj.phoneNum = response.rows.phoneNum;
								obj.liveAddr = response.rows.liveAddr;
								obj.loanNo = response.rows.loanNo;
								obj.overDays = response.rows.overDays;
								obj.overLmt = response.rows.overLmt;
							}
							yufp.extend(vieForm, obj);
						}
					});
				});
        	} // end of mounted

        });
    };
    // 消息处理
    exports.onmessage = function (type, message) {};
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {}
});
