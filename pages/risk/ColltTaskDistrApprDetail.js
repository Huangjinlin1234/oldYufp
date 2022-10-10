/**
 * @create by szbd
 * @description 外催分案申请审批查看页面
 * @createDate 2019-09-05
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        // 引入字典项
        yufp.lookup.reg('CRUD_TYPE,APRV_STATUS,STD_HANDLE_TYPE');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
            var _self = this;
            return {

				expandCollapseName: ['tableOuts', 'tableLaw', 'tableRisk'],

            	/** ------------------------------------ 委外催收机构审批信息 start ------------------ */
				baseParamsOuts:{},
				dataUrlOuts: backend.flowService + '/api/outs/task/distr/main/appr',

				tableColumnsOuts: [ //outs_task_distr_main
					{ label: '分配批次号', prop: 'colltBatchNo', sortable: true, resizable: true },
					{ label: '委外经手类型', prop: 'outsHdleType', sortable: true, resizable: true, dataCode:'STD_HANDLE_TYPE' },
					{ label: '分配金额', prop: 'distrLmt', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
							return yufp.util.moneyFormatter(cellValue, 2);
						} },
					{ label: '分配户数', prop: 'distrCustNum', sortable: true, resizable: true },
					{ label: '分配金额占比', prop: 'distrLmtRatio', sortable: true, resizable: true ,
						formatter: function (row, column, cellValue) {
							var num = parseFloat(cellValue);
							if (typeof (num) == 'undefined' || num == null || isNaN(num))
								num = 0;
							var rateY = yufp.util.toPercent((parseFloat(num) * 100).toFixed(6));
							return rateY;
						}},
					{ label: '分配户数占比', prop: 'distrCustsRatio', sortable: true, resizable: true},
					{ label: '分配时间', prop: 'distrTime', sortable: true, resizable: true },
					{ label: '操作员', prop: 'opUserCode', sortable: true, resizable: true },
					{ label: '操作员所属机构', prop: 'opOrgCode', sortable: true, resizable: true }
				],

				/** ------------------------------------ 律师事务所审批信息 start ------------------ */
				baseParamsLaw:{
				},
				dataUrlLaw: backend.riskmService + '/api/collt/task/distr/appr',

				tableColumnsLaw: [ // collt_task_distr
					{label: '分配批次', prop: 'colltBatchNo', sortable: true, resizable: true},
					{label: '律师事务所编号', prop: 'outsOrgCode', sortable: true, resizable: true},
					{label: '律师事务所名称', prop: 'outsOrgName', sortable: true, resizable: true},
					{
						label: '分配金额', prop: 'distrLmt', sortable: true, resizable: true,
						formatter: function (row, column, cellValue) {
							if (!row.distrLmt) {
								return row.distrLmt;
							} else {
								return yufp.util.moneyFormatter(row.distrLmt, 2);
							}
						}
					},
					{label: '分配任务数', prop: 'distrTaskNum', sortable: true, resizable: true},
					{
						label: '分配金额占比', prop: 'distrLmtRatio', sortable: true, resizable: true,
						formatter: function (row, column, cellValue) {
							var num = parseFloat(cellValue);
							if (typeof (num) == 'undefined' || num == null || isNaN(num))
								num = 0;
							var rateY = yufp.util.toPercent((parseFloat(num) * 100).toFixed(6));
							return rateY;
						}
					},
					{
						label: '分配任务数占比', prop: 'distrTasksRatio', sortable: true, resizable: true,
						formatter: function (row, column, cellValue) {
							var num = parseFloat(cellValue);
							if (typeof (num) == 'undefined' || num == null || isNaN(num))
								num = 0;
							var rateY = yufp.util.toPercent((parseFloat(num) * 100).toFixed(6));
							return rateY;
						}
					},
					{label: '分配时间', prop: 'distrTime', sortable: true, resizable: true},
					{label: '操作员', prop: 'opUserCode', sortable: true, resizable: true},
					{label: '操作员所属机构', prop: 'opOrgCode', sortable: true, resizable: true}
				],

				/** ------------------------------------ 风险代理审批信息 start ------------------ */
				baseParamsRisk: {
				},
				dataUrlRisk: backend.riskmService + '/api/collt/task/distr/appr',
				tableColumnsRisk: [ // collt_task_distr
					{label: '分配批次', prop: 'colltBatchNo', sortable: true, resizable: true},
					{label: '风险代理机构编号', prop: 'outsOrgCode', sortable: true, resizable: true},
					{label: '风险代理机构名称', prop: 'outsOrgName', sortable: true, resizable: true},
					{
						label: '分配金额', prop: 'distrLmt', sortable: true, resizable: true,
						formatter: function (row, column, cellValue) {
							if (!row.distrLmt) {
								return row.distrLmt;
							} else {
								return yufp.util.moneyFormatter(row.distrLmt, 2);
							}
						}
					},
					{label: '分配任务数', prop: 'distrTaskNum', sortable: true, resizable: true},
					{
						label: '分配金额占比', prop: 'distrLmtRatio', sortable: true, resizable: true,
						formatter: function (row, column, cellValue) {
							var num = parseFloat(cellValue);
							if (typeof (num) == 'undefined' || num == null || isNaN(num))
								num = 0;
							var rateY = yufp.util.toPercent((parseFloat(num) * 100).toFixed(6));
							return rateY;
						}
					},
					{
						label: '分配任务数占比', prop: 'distrTasksRatio', sortable: true, resizable: true,
						formatter: function (row, column, cellValue) {
							var num = parseFloat(cellValue);
							if (typeof (num) == 'undefined' || num == null || isNaN(num))
								num = 0;
							var rateY = yufp.util.toPercent((parseFloat(num) * 100).toFixed(6));
							return rateY;
						}
					},
					{label: '分配时间', prop: 'distrTime', sortable: true, resizable: true},
					{label: '操作员', prop: 'opUserCode', sortable: true, resizable: true},
					{label: '操作员所属机构', prop: 'opOrgCode', sortable: true, resizable: true}
				],

                height: yufp.frame.size().height - 103,
                formDisabled: false,
                viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                //valiPagePluginData: true,
              }
            },

            methods: {
				switchColltWay: function (obj) {
					var _self = this;
					if('03' === obj.colltWay){
						_self.baseParamsOuts = {
							colltBatchNo: obj.colltBatchNo
						};
						_self.$refs.basecollapse.$children[0].$el.hidden = false;
						_self.$refs.basecollapse.$children[1].$el.hidden = true;
						_self.$refs.basecollapse.$children[2].$el.hidden = true;
					} else if('04' === obj.colltWay){
						_self.baseParamsLaw = {
							colltBatchNo: obj.colltBatchNo,
							colltWay: '04'
						};
						_self.$refs.basecollapse.$children[0].$el.hidden = true;
						_self.$refs.basecollapse.$children[1].$el.hidden = false;
						_self.$refs.basecollapse.$children[2].$el.hidden = true;
					} else if('05' === obj.colltWay){
						_self.baseParamsRisk = {
							colltBatchNo: obj.colltBatchNo,
							colltWay: '05'
						};
						_self.$refs.basecollapse.$children[0].$el.hidden = true;
						_self.$refs.basecollapse.$children[1].$el.hidden = true;
						_self.$refs.basecollapse.$children[2].$el.hidden = false;
					} else {
						_self.$message('非外催，不存在分案，系统异常！');
						_self.$refs.basecollapse.$children[0].$el.hidden = true;
						_self.$refs.basecollapse.$children[1].$el.hidden = true;
						_self.$refs.basecollapse.$children[2].$el.hidden = true;
					}
				}
            },

            mounted: function () {
        		data.children = this;
        		var obj = data.datas[data.dataKey];
        		this.valiPagePluginData = true;
				this.switchColltWay(obj);
				var _self = this;
        		this.$nextTick(function(){
        			// yufp.extend(this.$refs.reform.formModel, obj);
					if('03' === obj.colltWay){
						_self.$refs.reftableOuts.remoteData(_self.baseParamsOuts);
					} else if('04' === obj.colltWay){
						_self.$refs.reftableLaw.remoteData(_self.baseParamsLaw);
					} else if('05' === obj.colltWay){
						_self.$refs.reftableRisk.remoteData(_self.baseParamsRisk);
					}else _self.$message('非外催，不存在分案，系统异常！');
        		});
        	}// end of mounted
        });
    };
    // 消息处理
    exports.onmessage = function (type, message) {};
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {}
});
