﻿/**
 * @create by chenqm1 on 2018-05-04
 * @description 贷款申请表
 */
define([
	'./custom/widgets/js/YufpDemoSelector.js',
	'./custom/widgets/js/YufpOrgTree.js',
	'./custom/widgets/js/YufpUserSelector.js',
	'./custom/widgets/js/AddrDicSelecter.js',
	'./custom/widgets/js/OrgSelector.js',
	'./custom/widgets/js/UserSelecter.js',
	'./custom/widgets/js/PrdIdInfoSelector.js'
], function (require, exports) {
	// page加载完成后调用ready方法
	exports.ready = function (hashCode, data, cite) {
		yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZX_YES_NO_TAX,STD_ZX_SEX_TAX,PUNISH_WAY');
		yufp.custom.vue({
			el: cite.el,
			data: function () {
				var _self = this;
				return {
					dataUrl: backend.creditService +'/api/tax/basic/infos',
					wthldngCorpDataUrl:backend.creditService + '/api/tax/withhold/remit/crdt',
					incmTaxPayDataUrl:backend.creditService + '/api/tax/income/tax/infos',
					ilglVltnInfDataUrl:backend.creditService + '/api/tax/against/law/infos',
					anulFnlSetlDataUrl:backend.creditService + '/api/tax/annual/pay/clear/infos',
					baseParams: {},
					baseParamsRel: {},
					queryFields: [
						{ placeholder: '申请流水', field: 'crdtAppFlowNo', type: 'input' },
						{ placeholder: '客户名称', field: 'taxpyNm', type: 'input' },
						{ placeholder: '身份证号', field: 'certNo', type: 'input' },
						{ placeholder: '申请日期', field: 'applyDt', type: 'date' ,editable:false},
					],

					queryButtons: [
						{ label: '查询',op: 'submit',type: 'primary',icon: 'search',
							click: function (model, valid) {
								if (valid) {
									_self.$refs.reftable.remoteData(model);
								}
							} },
						{ label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
					],

					tableColumns: [
						{ label: '申请流水', prop: 'crdtAppFlowNo', sortable: true, resizable: true, template: function () {
								return '<template scope="scope">\
      			<a href="javascript:void(0);" style="text-decoration:underline;" @click="_$event(\'custom-row-click\', scope.row)">{{ scope.row.crdtAppFlowNo }}</a>\
      		</template>';
							}},
						{ label: '客户名称', prop: 'taxpyNm', sortable: true, resizable: true },
						{ label: '身份证号', prop: 'certNo', sortable: true, resizable: true },
						{ label: '申请日期', prop: 'applyDt', sortable: true, resizable: true },
						{ label: '授权流水号', prop: 'authFlowNo', sortable: true, resizable: true },
						{ label: '授权日期', prop: 'authDt', sortable: true, resizable: true },
						{ label: '授权截止日期', prop: 'authEndDt', sortable: true, resizable: true },
						{ label: '授权人证件号码', prop: 'authrCertNo', sortable: true, resizable: true },
						{ label: '授权银行', prop: 'authBank', sortable: true, resizable: true },
						{ label: '创建者', prop: 'creater', sortable: true, resizable: true, hidden: true},
						{ label: '创建时间', prop: 'createTime', sortable: true, resizable: true, hidden: true},
						{ label: '修改者', prop: 'modifier', sortable: true, resizable: true, hidden: true},
						{ label: '修改时间', prop: 'modifyTime', sortable: true, resizable: true, hidden: true},
						{ label: '是否有效', prop: 'status', sortable: true, resizable: true, hidden: true, type: 'select',dataCode:'STD_ZX_YES_NO_TAX'},
						{ label: '证件类型', prop: 'certTp', sortable: true, resizable: true, hidden: true, type: 'select', dataCode:'STD_ZB_CERT_TYP'},
						{ label: '证件名称', prop: 'certNm', sortable: true, resizable: true, hidden: true},
						{ label: '中文名', prop: 'chinNm', sortable: true, resizable: true, hidden: true},
						{ label: '客户性别', prop: 'clnGndCd', sortable: true, resizable: true, hidden: true, type: 'select',dataCode:'STD_ZX_SEX_TAX'},
						{ label: '出生日期', prop: 'brthDt', sortable: true, resizable: true, hidden: true},
						{ label: '国籍', prop: 'nation', sortable: true, resizable: true, hidden: true},
						{ label: '国籍名称', prop: 'nationNm', sortable: true, resizable: true, hidden: true},
						{ label: '代扣代缴标志', prop: 'wthldngFlg', sortable: true, resizable: true, hidden: true, type: 'select',dataCode:'STD_ZX_YES_NO_TAX'},
						{ label: '个体户业主标志', prop: 'slfemplyOwnFlg', sortable: true, resizable: true, hidden: true, type: 'select',dataCode:'STD_ZX_YES_NO_TAX'},
						{ label: '代缴序号', prop: 'wthldngSrlNo', sortable: true, resizable: true, hidden: true},
					],

					// 代扣代缴单位列表
					wthldngCorpColumnsRel: [
						{ label: '代扣代缴单位纳税人识别号（统一社会信用代码）', prop: 'wthldngTaxpyNo', sortable: true, resizable: true},
						{ label: '代扣代缴单位名称', prop: 'wthldngCorpNm', sortable: true, resizable: true},
						{ label: '代扣代缴单位地址', prop: 'wthldngCorpAddr', sortable: true, resizable: true},
						{ label: '代扣代缴单位所属地市代码', prop: 'wthldngCorpCityCd', sortable: true, resizable: true},
						{ label: '代扣代缴单位所属地市名称', prop: 'wthldngCorpCityNm', sortable: true, resizable: true},
						{ label: '代扣代缴单位电话', prop: 'wthldngCorpTel', sortable: true, resizable: true},
						{ label: '代扣代缴单位行业代码', prop: 'wthldngCorpIndusCd', sortable: true, resizable: true},
						{ label: '代扣代缴单位行业名称', prop: 'wthldngCorpIndusNm', sortable: true, resizable: true},
						{ label: '代扣代缴单位注册类型代码', prop: 'wthldngCorpRgstTpCd', sortable: true, resizable: true},
						{ label: '代扣代缴单位注册类型名称', prop: 'wthldngCorpRgstTpNm', sortable: true, resizable: true},
					],
					incmTaxPayColumnsRel: [
						{ label: '扣缴义务人识别号（统一社会信用代码）', prop: 'wthldngAgntNo', sortable: true, resizable: true},
						{ label: '扣缴义务人名称', prop: 'wthldngAgntNm', sortable: true, resizable: true },
						{ label: '征收项目代码', prop: 'collPrjCd', sortable: true, resizable: true },
						{ label: '征收项目名称', prop: 'collPrjNm', sortable: true, resizable: true },
						{ label: '征收品目代码', prop: 'collGdsPrjCd', sortable: true, resizable: true },
						{ label: '征收品目名称', prop: 'collGdsPrjNm', sortable: true, resizable: true },
						{ label: '税款所属期起', prop: 'taxStrtDt', sortable: true, resizable: true },
						{ label: '税款所属期止', prop: 'taxEndDt', sortable: true, resizable: true },
						{ label: '收入额', prop: 'incmLmt', sortable: true, resizable: true },
						{ label: '应纳税所得额', prop: 'taxIncm', sortable: true, resizable: true },
						{ label: '应纳税额', prop: 'payLmt', sortable: true, resizable: true },
						{ label: '应补退税额', prop: 'taxRfnd', sortable: true, resizable: true },
						{ label: '实缴税额入库时间', prop: 'taxPayStrgTmstmp', sortable: true, resizable: true },
						{ label: '最后一次申报时间', prop: 'lstDclrTmstmp', sortable: true, resizable: true },
						{ label: '企业申报更正次数', prop: 'entrprsDclrCorcTms', sortable: true, resizable: true },
						{ label: '实缴税额', prop: 'actlTax', sortable: true, resizable: true },
					],
					ilglVltnInfColumnsRel: [
						{ label: '纳税人识别号（统一社会信用代码）/身份证件号码', prop: 'wthldngTaxpyNo4', sortable: true, resizable: true},
						{ label: '纳税人姓名', prop: 'taxpyNm4', sortable: true, resizable: true },
						{ label: '处罚方式', prop: 'pnyMd', sortable: true, resizable: true ,type: 'select',dataCode:'PUNISH_WAY'},
						{ label: '涉税违法类型代码', prop: 'taxrltIlglTpCd', sortable: true, resizable: true },
						{ label: '涉税违法类型名称', prop: 'taxrltIlglTpNm', sortable: true, resizable: true },
						{ label: '案件所在年月', prop: 'csTm', sortable: true, resizable: true },
						{ label: '罚款金额', prop: 'fine', sortable: true, resizable: true },
						{ label: '文书号', prop: 'imtNo', sortable: true, resizable: true },
						{ label: '税款所属期起', prop: 'taxStrtDt3', sortable: true, resizable: true },
						{ label: '税款所属期止', prop: 'taxEndDt3', sortable: true, resizable: true },
						{ label: '案件处理状态', prop: 'csSt', sortable: true, resizable: true },
					],
					anulFnlSetlColumnsRel: [
						{ label: '税款所属期起', prop: 'taxStrtDt4', sortable: true, resizable: true },
						{ label: '税款所属期止', prop: 'taxEndDt4', sortable: true, resizable: true },
						{ label: '年度汇算清缴金额', prop: 'anulFnlSetlAmt', sortable: true, resizable: true },
						{ label: '年度汇算清缴时间', prop: 'anulFnlSetlTmstmp', sortable: true, resizable: true },
					],
					tableColumnsRel: [
						{ label: '申请流水号', prop: 'certTp', sortable: true, resizable: true },
						{ label: '联系人姓名', prop: '', sortable: true, resizable: true},
						{ label: '关联关系', prop: 'relRelation', sortable: true, resizable: true},
						{ label: '创建时间', prop: 'createTime', sortable: true, resizable: true}
					],

					// 自然人授权信息
					authInfoFields: [{
						columnCount: 2,
						fields: [
							{field: 'authFlowNo', label: '授权流水号', disabled: true},
							{field: 'authrCertNo', label: '授权人证件号码', disabled: true},
							{field: 'authBank', label: '授权银行', disabled: true},
							{field: 'authDt', label: '授权日期', disabled: true},
							{field: 'authEndDt', label: '授权截止日期', disabled: true}
						]
					}],
					// 自然人基本信息
					basicInfoFields: [{
						columnCount: 3,
						fields: [
							{field: 'certTp', label: '证件类型', disabled: true, type: 'select', dataCode:'STD_ZB_CERT_TYP'},
							{field: 'certNm', label: '证件名称', disabled: true},
							{field: 'certNo', label: '证件号码', disabled: true},
							{field: 'taxpyNm', label: '姓名', disabled: true},
							{field: 'chinNm', label: '中文名', disabled: true},
							{field: 'clnGndCd', label: '客户性别', disabled: true,type: 'select',dataCode:'STD_ZX_SEX_TAX'},
							{field: 'brthDt', label: '出生日期', disabled: true},
							{field: 'nation', label: '国籍（地区）代码', disabled: true},
							{field: 'nationNm', label: '国籍（地区）名称', disabled: true},
							{field: 'wthldngFlg', label: '代扣代缴标志',disabled: true, type: 'select', dataCode:'STD_ZX_YES_NO_TAX'},
							{field: 'slfemplyOwnFlg', label: '个体户业主标志', disabled: true, type: 'select',dataCode:'STD_ZX_YES_NO_TAX'},
						]
					}],
					// 代扣代缴单位信息
					wthldngCorpFields: [{
						columnCount: 3,
						fields: [
							{field: 'wthldngTaxpyNo', label: '代扣代缴单位纳税人识别号', disabled: true},
							{field: 'wthldngCorpNm', label: '代扣代缴单位名称', disabled: true},
							{field: 'wthldngCorpAddr', label: '代扣代缴单位地址', disabled: true},
							{field: 'wthldngCorpCityCd', label: '代扣代缴单位所属地市代码', disabled: true},
							{field: 'wthldngCorpCityNm', label: '代扣代缴单位所属地市名称', disabled: true},
							{field: 'wthldngSrlNo2', label: '代缴序号2', disabled: true},
							{field: 'wthldngCorpTel', label: '代扣代缴单位电话', disabled: true},
							{field: 'wthldngCorpIndusCd', label: '代扣代缴单位行业代码', disabled: true},
							{field: 'wthldngCorpIndusNm', label: '代扣代缴单位行业名称', disabled: true},
							{field: 'wthldngCorpRgstTpCd', label: '代扣代缴单位注册类型代码', disabled: true},
							{field: 'wthldngCorpRgstTpNm', label: '代扣代缴单位注册类型名称', disabled: true}
						]
					}],
					// 收入纳税信息
					incmTaxPayFields: [{
						columnCount: 3,
						fields: [
							{field: 'wthldngAgntNo', label: '扣缴义务人识别号', disabled: true},
							{field: 'wthldngAgntNm', label: '扣缴义务人名称', disabled: true},
							{field: 'collPrjCd', label: '征收项目代码', disabled: true},
							{field: 'collPrjNm', label: '征收项目名称', disabled: true},
							{field: 'collGdsPrjCd', label: '征收品目代码', disabled: true},
							{field: 'collGdsPrjNm', label: '征收品目名称', disabled: true},
							{field: 'taxStrtDt', label: '税款所属期起', disabled: true},
							{field: 'taxEndDt', label: '税款所属期止', disabled: true},
							{field: 'incmLmt', label: '收入额', disabled: true},
							{field: 'taxIncm', label: '应纳税所得额', disabled: true},
							{field: 'payLmt', label: '应纳税额', disabled: true},
							{field: 'taxRfnd', label: '应补退税额', disabled: true},
							{field: 'taxPayStrgTmstmp', label: '实缴税额入库时间戳', disabled: true},
							{field: 'lstDclrTmstmp', label: '最后一次申报时间戳', disabled: true},
							{field: 'entrprsDclrCorcTms', label: '企业申报更正次数', disabled: true},
							{field: 'actlTax', label: '实缴税额', disabled: true},
						]
					}],
					// 违法违章信息
					ilglVltnInfFields: [{
						columnCount: 3,
						fields: [
							{field: 'wthldngTaxpyNo4', label: '代扣代缴单位纳税人识别号4', disabled: true},
							{field: 'taxpyNm4', label: '纳税人姓名4', disabled: true},
							{field: 'pnyMd', label: '处罚方式', disabled: true,type: 'select',dataCode:'PUNISH_WAY'},
							{field: 'wthldngSrlNo4', label: '代缴序号4', disabled: true},
							{field: 'taxrltIlglTpCd', label: '涉税违法类型代码', disabled: true},
							{field: 'taxrltIlglTpNm', label: '涉税违法类型名称', disabled: true},
							{field: 'csTm', label: '案件时间', disabled: true},
							{field: 'fine', label: '罚款金额', disabled: true},
							{field: 'imtNo', label: '文书号', disabled: true},
							{field: 'taxStrtDt3', label: '税款所属期起3', disabled: true},
							{field: 'taxEndDt3', label: '税款所属期止3', disabled: true},
							{field: 'csSt', label: '案件状态', disabled: true},
						]
					}],
					// 年度汇算清缴信息
					anulFnlSetlFields: [{
						columnCount: 2,
						fields: [
							{field: 'taxStrtDt4', label: '税款所属期起4', disabled: true},
							{field: 'taxEndDt4', label: '税款所属期止4', disabled: true},
							{field: 'anulFnlSetlAmt', label: '年度汇算清缴金额', disabled: true},
							{field: 'anulFnlSetlTmstmp', label: '年度汇算清缴时戳', disabled: true},
						]
					}],

					updateButtons: [
						{ label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false,
							click: function (model) {
								_self.dialogVisible = false;
							}
						}
					],

					height: yufp.frame.size().height - 103,
					dialogVisible: false,
					wthldngCorpInfoView:false,
					formDisabled: true,
					viewType: 'DETAIL',
					tabName: 'ntrPrsnAuthArry',
					viewTitle: yufp.lookup.find('CRUD_TYPE', false)
					// expandCollapseName: ['applyBase', 'approveInfoSecond' ]
				};
			},

			methods: {
				/**
				 * @param ctrlCode 操作码
				 */
				checkPermission: function (ctrlCode) {
					return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
				},

				/**
				 * @param viewType
				 *            表单类型
				 * @param editable
				 *            可编辑,默认false
				 */
				switchStatus: function (viewType, editable) {
					var _self = this;
					_self.viewType = viewType;
					_self.formDisabled = !editable;
					_self.dialogVisible = true;
					this.$nextTick(function () {
						//  _self.$refs.indivMarInFo.collapse=true
					});
				},

				infoFn: function () {
					var _self = this;
					if (this.$refs.reftable.selections.length != 1) {
						this.$message({message: '请先选择一条记录', type: 'warning'});
						return;
					}
					_self.dialogVisible = true;

					var obj = _self.$refs.reftable.selections[0];

					_self.baseParamsRel = {
						crdtAppFlowNo: _self.$refs.reftable.selections[0].crdtAppFlowNo
					};
					_self.switchStatus('DETAIL', true);
					this.$nextTick(function () {
						_self.$refs.wthldngCorpTable.data = [];
						_self.$refs.incmTaxPayTable.data = [];
						_self.$refs.ilglVltnInfTable.data = [];
						_self.$refs.anulFnlSetlTable.data = [];

						this.$refs.authInfo.resetFn();
						this.$refs.basicInfo.resetFn();
						this.$refs.wthldngCorpInfoRef.resetFn();
						this.$refs.incmTaxPayInfoRef.resetFn();
						this.$refs.ilglVltnInfInfoRef.resetFn();
						this.$refs.anulFnlSetlInfoRef.resetFn();
					});

					this.$nextTick(function () {
						this.$refs.wthldngCorpTable.remoteData(this.baseParamsRel); //代扣代缴单位列表
						this.$refs.incmTaxPayTable.remoteData(this.baseParamsRel); //收入纳税信息列表
						this.$refs.ilglVltnInfTable.remoteData(this.baseParamsRel); //违法违章信息列表
						this.$refs.anulFnlSetlTable.remoteData(this.baseParamsRel); //年度汇算清缴信息列表

						//填充有数据的表单
						yufp.util.copyObj(this.$refs.authInfo.formModel, obj); // 自然人授权信息
						yufp.util.copyObj(this.$refs.basicInfo.formModel, obj); // 自然人基本信息
					});

				},

				//申请流水号超链接处理函数
				applySernoClick: function (scope) {
					var _self = this;
					_self.dialogVisible = true;
					_self.baseParamsRel = {
						applySeq: scope.applySeq
					};
					_self.switchStatus('DETAIL', true);
					this.$nextTick(function () {
						this.$refs.authInfo.resetFn();
						this.$refs.basicInfo.resetFn();
						this.$refs.wthldngCorpInfoRef.resetFn();
						this.$refs.incmTaxPayInfoRef.resetFn();
						this.$refs.ilglVltnInfInfoRef.resetFn();
						this.$refs.anulFnlSetlInfoRef.resetFn();

						//填充有数据的表单
						yufp.util.copyObj(this.$refs.authInfo.formModel, scope); // 自然人授权信息
						yufp.util.copyObj(this.$refs.basicInfo.formModel, scope); // 自然人基本信息

					});
				},
				crdtAppFlowNoClick: function (row) {

					this.baseParamsRel = {
						crdtAppFlowNo: row.crdtAppFlowNo
					};
					//获取主表中选中的数据
					var obj = this.$refs.reftable.selection;
					//将选中的tab页变成授权页
					this.tabName="ntrPrsnAuthArry";
					this.switchStatus('DETAIL', false);
					this.$nextTick(function () {

						this.$refs.wthldngCorpTable.remoteData(this.baseParamsRel); //代扣代缴单位列表
						this.$refs.incmTaxPayTable.remoteData(this.baseParamsRel); //收入纳税信息列表
						this.$refs.ilglVltnInfTable.remoteData(this.baseParamsRel); //违法违章信息列表
						this.$refs.anulFnlSetlTable.remoteData(this.baseParamsRel); //年度汇算清缴信息列表

						//先隐藏各个表单的详情,防止没有数据的详情表单自动弹出
						document.getElementById("wthldngCorp").style.display = "none";
						document.getElementById("incmTaxPay").style.display = "none";
						document.getElementById("ilglVltnInf").style.display = "none";
						document.getElementById("anulFnlSetl").style.display = "none";

						//重置表单，防止本行的空数据被上次的数据所填充
						this.$refs.authInfo.resetFn();
						this.$refs.basicInfo.resetFn();
						this.$refs.wthldngCorpInfoRef.resetFn();
						this.$refs.incmTaxPayInfoRef.resetFn();
						this.$refs.ilglVltnInfInfoRef.resetFn();
						this.$refs.anulFnlSetlInfoRef.resetFn();

						//填充有数据的表单
						yufp.util.copyObj(this.$refs.authInfo.formModel, row); // 自然人授权信息
						yufp.util.copyObj(this.$refs.basicInfo.formModel, row); // 自然人基本信息


					});
					//数据渲染完成，再弹出详情窗口
					this.dialogVisible = true;
				},
				// 控制各个list的详情是否展示
				handleWthldngCorp: function(row) {
					this.$refs.wthldngCorpInfoRef.resetFn();
					yufp.util.copyObj(this.$refs.wthldngCorpInfoRef.formModel, row);
					document.getElementById("wthldngCorp").style.display = "";
				},
				handleIncmTaxPay: function(row) {
					this.$refs.incmTaxPayInfoRef.resetFn();
					yufp.util.copyObj(this.$refs.incmTaxPayInfoRef.formModel, row);
					document.getElementById("incmTaxPay").style.display = "";
				},
				handleIlglVltnInf: function(row) {
					this.$refs.ilglVltnInfInfoRef.resetFn();
					yufp.util.copyObj(this.$refs.ilglVltnInfInfoRef.formModel, row);
					document.getElementById("ilglVltnInf").style.display = "";
				},
				handleAnulFnlSetl: function(row) {
					this.$refs.anulFnlSetlInfoRef.resetFn();
					yufp.util.copyObj(this.$refs.anulFnlSetlInfoRef.formModel, row);
					document.getElementById("anulFnlSetl").style.display = "";
				},
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


