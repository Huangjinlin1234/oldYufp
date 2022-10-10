/**
 * @create by
 * @description 息费减免审批查看页面
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        // 引入字典项
        yufp.lookup.reg('CRUD_TYPE,APRV_STATUS，APPLY_CHANNEL_TYPE，STD_ZB_ACC_STATUS');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
            var _self = this;
            return {
				expandCollapseName: ['baseInfo', 'reliefInfo', 'otherInfo'],
				baseInfoFields: [{
					columnCount: 2,
					fields: [
						{field: 'reliefAppNo', label: '减免申请流水号', disabled: true, hidden: false},
						{field: 'billNo', label: '借据编号', disabled: true, hidden: false},
						{field: 'cusId', label: '客户编号', disabled: true, hidden: false},
						{field: 'cusName', label: '客户名称', disabled: true, hidden: false},
						{field: 'contNo', label: '合同编号', disabled: true, hidden: false},
						{field: 'channelCode', label: '渠道名称', disabled:true, type: 'select', dataCode:'APPLY_CHANNEL_TYPE'},
						{field: 'prdCode', label: '产品编号', hidden: true},
						{field: 'prdName', label: '产品名称', disabled:true},
						{field: 'loanAmount', label: '借据金额', disabled: true, hidden: false, type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
						{field: 'overdueBalance', label: '逾期本金金额', disabled: true, hidden: false, type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
						{field: 'overdueDays', label: '逾期本金天数', disabled: true, hidden: false},
						{field: 'delayIntCumu', label: '逾期利息金额', disabled: true, type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
						{field: 'receIntCumu', label: '应收利息', disabled: true, type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
						{field: 'receIntPen', label: '应收罚息', disabled: true, type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
						{field: 'loanStartDate', label: '借据起始日', disabled: true, hidden: false},
						{field: 'loanEndDate', label: '借据到期日', disabled: true, hidden: false},
						{field: 'loanStatus',label: '借据状态',disabled: true,hidden: false,type: 'select',dataCode: 'STD_ZB_ACC_STATUS'},
						{field: 'createUser',label: '提交人',disabled: true, hidden: false },
						{field: 'createTime',label: '提交时间',disabled: true, hidden: false },
						{field: 'approveStatus',label: '审批状态',disabled: true,hidden: false,type: 'select',dataCode: 'APRV_STATUS'},
						// {field: 'reliefLmt', label: '减免金额', disabled: true, rules: [{ required: true, message: '必输项', trigger: 'blur' }]},
						// {field: 'reliefRange', label: '减免幅度(%)', disabled:true, rules: [{ required: true, message: '必输项', trigger: 'blur' }]}
					]}
				],

				reliefInfoFields: [{
					columnCount: 2,
					fields: [
						{field: 'reliefLmt', label: '减免金额', disabled: true, rules: [{ required: true, message: '必输项', trigger: 'blur' }]},
						{field: 'reliefRange', label: '减免幅度(%)', disabled:true, rules: [{ required: true, message: '必输项', trigger: 'blur' }]}
					]
					},{
						columnCount: 1,
						fields: [
							{ field: 'reliefReson', label: '减免原因', disabled:true, type:'textarea', rows: 3, rules: [{ required: true, message: '必输项', trigger: 'blur' }]}
						]
					},{
						columnCount: 1,
						fields: [
							{ field: 'remarks', label: '备注', disabled:true, type:'textarea', rows: 3},
						]
				}],

				otherInfoFields: [{
					columnCount: 2,
					fields: [
						{field: 'overTimesTotal', label: '累计逾期期数', disabled: true},
						{field: 'overTimesCurrent', label: '当前逾期期数', disabled: true},
						{field: 'maxTimesTotal', label: '最高逾期期数', disabled: true},
						{field: 'payTimesTotal', label: '累计已还期数', disabled: true, hidden: true},
						{field: 'remainTimesTotal', label: '剩余未还期数', disabled: true, hidden: true}
					]
				}],

				tableColumns: [
					{ label: '减免申请流水号', prop: 'reliefAppNo', sortable: true, resizable: true },
					{ label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
					{ label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
					{ label: '借据编号', prop: 'billNo', sortable: true, resizable: true },
					{ label: '逾期天数', prop: 'overdueDays', sortable: true, resizable: true },
					{ label: '逾期金额', prop: 'overdueBalance', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
							return yufp.util.moneyFormatter(cellValue, 2);
						} },
					{ label: '逾期期数', prop: 'overTimesTotal', sortable: true, resizable: true },  //来自贷款台账表 over_times_total 累计逾期期数
					{ label: '还款期数', prop: 'term', sortable: true, resizable: true },  // 来自还款计划
					{ label: '计划还款日', prop: 'stmtDate', sortable: true, resizable: true },  // 来自还款计划 stmt_date 到期日期
					{ label: '实际还款日', prop: 'setlApplyDt', sortable: true, resizable: true },   // 来自还款明细  主动还款申请日期
					{ label: '还款类型', prop: 'setlTyp', sortable: true, resizable: true, dataCode: 'APPLY_CHANNEL_TYPE' }, // 来自还款明细
					{ label: '减免金额', prop: 'loanAmount', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
							return yufp.util.moneyFormatter(cellValue, 2);
						} },
					{ label: '减免幅度(%)', prop: 'reliefRange', sortable: true, resizable: true },
					{ label: '减免原因', prop: 'reliefReson', sortable: true, resizable: true },
					{ label: '减免备注', prop: 'remarks', sortable: true, resizable: true },
					{ label: '申请人', prop: 'remarks', sortable: true, resizable: true },
					{ label: '申请时间', prop: 'remarks', sortable: true, resizable: true },
					{ label: '审批状态', prop: 'remarks', sortable: true, resizable: true },
					{ label: '提交时间', prop: 'remarks', sortable: true, resizable: true },
					{ label: '审批完成时间', prop: 'remarks', sortable: true, resizable: true }
				],

				dataUrlAnnex: backend.riskmService + '/api/mon/relief/ann',
				baseParamsAnnex:{},
				tableColumnsAnnex:[
					{ label: '申请流水号', prop: 'flowAppNo', sortable: true, resizable: true },
					{ label: '借据号', prop: 'bizSerno', sortable: true, resizable: true ,hidden:true},
					{ label: '附件名称', prop: 'annexName', sortable: true, resizable: true },
					{ label: '附件描述', prop: 'annexDesc', sortable: true, resizable: true },
					{ label: '上传人', prop: 'uploadUser', sortable: true, resizable: true },
					{ label: '上传时间', prop: 'uploadTime', sortable: true, resizable: true },
					{ label: '最后更新人', prop: 'lastUploadUser', sortable: true, resizable: true },
					{ label: '最后更新时间', prop: 'lastUploadTime', sortable: true, resizable: true }
				],

                height: yufp.frame.size().height - 103,
                formDisabled: false,
                viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                //valiPagePluginData: true,
              }
            },

            methods: {
            	getLoanInfo: function (loanNo) {
            		var _self = this;
					yufp.service.request({
						method: "GET",
						url: backend.creditService + '/api/acc/loan/' + loanNo,
						data: {},
						callback: function (code, message, response) {
							if (response.success) {
								_self.$refs.otherReform.resetFn();
								yufp.extend(_self.$refs.otherReform.formModel, response.rows);
							} else {
								//_self.$message("获取催收借据信息失败：" + response.message);
							}
						}
					});
				},
				infoAnnexFn: function(){
					this.$nextTick(function(){
						var _self = this;
						if (this.$refs.reftableAnnex.selections.length != 1 ) {
							this.$message({ message: '请选择一条数据！', type: 'warning' });
							return;
						}
						var right = '0100001';
						var biz = this.$refs.reftableAnnex.selections[0].flowAppNo;
						var date = this.$refs.reftableAnnex.selections[0].uploadTime.slice(0,10).replace(/\-/g,"");
						_self.$confirm('将前往影像平台查看影像资料，是否继续？', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning',
							center: true,
							callback: function (action) {
								if (action === 'confirm') {
									yufp.service.request({
										method: 'POST',
										url: backend.edocService + "/api/doEncode",
										data: {
											applySeq : biz,
											sessionUserId: yufp.session.userId,
											sessionUserName: yufp.session.userName,
											sessionOrgCode: yufp.session.org.orgCode,
											sessionOrgName: yufp.session.org.orgName,
											startDate : date,
											rightCode : right
										},
										callback: function (code, message, response) {
											var row = response.rows;
											if (code == 0 && response.code == 0) {
												// row 为加密后的完整url请求
												window.open(row,'_blank');
											} else {
												this.$message("获取影像系统信息失败：" + response.message);
											}
										}
									});

								}
							}
						});
					});
				},
            },

            mounted: function () {
        		data.children = this;
        		var obj = data.datas[data.dataKey];
        		var _self = this;
				_self.valiPagePluginData = true;
				_self.baseParamsAnnex = {
					flowAppNo : data.e_bizSerno,
					bizSerno : obj.billNo
				};
				_self.$nextTick(function(){
        			yufp.extend(this.$refs.baseReform.formModel, obj);
        			yufp.extend(this.$refs.reliefReform.formModel, obj);
        			this.getLoanInfo(obj.billNo);
        			//yufp.extend(this.$refs.otherReform.formModel, obj);
					_self.$refs.reftableAnnex.remoteData(_self.baseParamsAnnex);
				});
        	} // end of mounted

        });
    };
    // 消息处理
    exports.onmessage = function (type, message) {};
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {}
});
