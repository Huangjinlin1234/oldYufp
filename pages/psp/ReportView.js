/**
 * @create by chenqm1 on 2018-05-11
 * @description 
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('rpt_achieve_total_by_day,STD_GENERAL_STATUS');
    yufp.custom.vue({
      el: cite.el,
            data: function () {
                var _self = this;
                return {
                    height: yufp.frame.size().height,
                    reportSrc: '',
                    fullscreenLoading: false,

                    baseParams: {
                    },
                    dataUrl: backend.edocService + '/api/file/export/lists',

                    queryFields: [
                        { placeholder: '文件名称', field: 'fileName', type: 'input' },
                        { placeholder: '导出状态', field: 'status', type: 'select', dataCode:'STD_GENERAL_STATUS' },
                        { placeholder: '导出日期区间', field: 'createDateS2E', type: 'daterange', value: [], editable: false},

                        { placeholder: '文件描述', field: 'fileDesc', type: 'input', hidden:true },
                        { placeholder: '文件路径', field: 'filePath', type: 'input', hidden:true },
                        { placeholder: '导出开始日期', field: 'createDateS', type: 'date', hidden:true },
                        { placeholder: '导出结束日期', field: 'createDateE', type: 'date', hidden:true },
                        { placeholder: '导出用户', field: 'createUser', type: 'input', hidden:true },
                        { placeholder: '导出用户所属机构', field: 'createUserOrg', type: 'input', hidden:true }
                    ],

                    queryButtons: [
                        { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    model.createDateS = model.createDateS2E[0];
                                    model.createDateE = model.createDateS2E[1];
                                    _self.$refs.reftable.remoteData(model);
                                }
                            } },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
                    ],

                    tableColumns: [
                        { label: '操作流水号', prop: 'pkId', sortable: true, resizable: true, hidden: true},
                        { label: '文件名称', prop: 'fileName', sortable: true, resizable: true },
                        { label: '文件描述', prop: 'fileDesc', sortable: true, resizable: true },
                        { label: '文件路径', prop: 'filePath', sortable: true, resizable: true, hidden: true},
                        { label: '导出查询参数', prop: 'queryParam', sortable: true, resizable: true, hidden: true },
                        { label: '导出状态', prop: 'status', sortable: true, resizable: true, dataCode:'STD_GENERAL_STATUS' },
                        { label: '导出状态描述', prop: 'statusDesc', sortable: true, resizable: true, hidden: true },
                        { label: '导出时间', prop: 'createTime', sortable: true, resizable: true },

                        { label: '导出用户', prop: 'createUser', sortable: true, resizable: true, hidden: true },
                        { label: '导出用户', prop: 'createUserName', sortable: true, resizable: true, hidden:true },
                        { label: '导出用户所属机构', prop: 'createUserOrg', sortable: true, resizable: true, hidden: true },
                        { label: '导出用户所属机构', prop: 'createUserOrgName', sortable: true, resizable: true, hidden:true },
                        { label: '下载状态', prop: 'downloadSts', sortable: true, resizable: true, hidden: true, dataCode:'STD_GENERAL_STATUS' },
                        { label: '下载状态描述', prop: 'downloadStsDesc', sortable: true, resizable: true, hidden: true },
                        { label: '下载时间', prop: 'downloadTime', sortable: true, resizable: true, hidden: true },
                        { label: '下载用户', prop: 'downloadUser', sortable: true, resizable: true, hidden: true },
                        { label: '下载用户', prop: 'downloadUserName', sortable: true, resizable: true, hidden: true },
                        { label: '下载用户所属机构', prop: 'downloadUserOrg', sortable: true, resizable: true, hidden: true},
                        { label: '下载用户所属机构', prop: 'downloadUserOrgName', sortable: true, resizable: true, hidden: true}
                    ],
                    rebackButtons: [
                        {
                            label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                yufp.service.request({
                                    method: "POST",
                                    url: backend.edocService + '/api/query/file/export/list',
                                    data: {
                                        status: '003'
                                    },
                                    callback: function (code, message, response) {
                                        if(response.rows != null){
                                            _self.$message({ message: '存在处理中的导出任务，再次查看导出结果请点击【导出清单查看】按钮', type: 'info' });
                                        }
                                        _self.dialogVisible = false;
                                    }
                                });

                            }
                        }
                    ],

                    updateFields: [{
                        columnCount: 2,
                        fields: [
                            { field: 'pkId', label: '操作流水号'},
                            { field: 'fileName', label: '文件名称'},
                            { field: 'fileDesc', label: '文件描述'},
                            { field: 'filePath', label: '文件路径'},
                            { field: 'status', label: '导出状态', type: 'select', dataCode:'STD_GENERAL_STATUS'},
                            { field: 'createTime', label: '导出时间'},
                            { field: 'createUserName', label: '导出用户', hidden: true},
                            { field: 'createUserOrgName', label: '导出用户所属机构', hidden: true},
                        ]
                    },{
                        columnCount: 1,
                        fields: [
                            { field: 'queryParam', label: '导出查询参数', type:'textarea', rows: 1},
                            { field: 'statusDesc', label: '导出状态描述', type:'textarea', rows: 2}
                        ]},{
                        columnCount: 2,
                        fields: [
                            { field: 'downloadSts', label: '下载状态', type: 'select', dataCode:'STD_GENERAL_STATUS'},
                            { field: 'downloadTime', label: '下载时间'},
                            { field: 'downloadUserName', label: '下载用户', hidden: true},
                            { field: 'downloadUserOrgName', label: '下载用户所属机构', hidden: true}
                        ]},{
                        columnCount: 1,
                        fields: [
                            { field: 'downloadStsDesc', label: '下载状态描述', type:'textarea', rows: 2}
                        ]}
                    ],

                    updateButtons: [
                        { label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.dialogVisibleSon = false;
                            } },
                        { label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                                var validate = false;
                                _self.$refs.reform.validate(function (valid) {
                                    validate = valid;
                                });
                                if (!validate) {
                                    return;
                                }

                                var rMethod = '';
                                if (_self.viewType == "EDIT") {
                                    rMethod = 'PUT';
                                } else if (_self.viewType == "ADD") {
                                    rMethod = 'POST';
                                }

                                yufp.service.request({
                                    method: rMethod,
                                    url: '/api/file/export/list',
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
                            } }
                    ],

                    dialogVisible: false,
                    //fileExportListRootId: 'fileExportList',
                    dialogVisibleSon: false,
                    height: yufp.frame.size().height - 103,
                    formDisabled: false,
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false)

                };
            },
            created() {
                window.addEventListener('message', this.callChild);
            },
            beforeDestroy() {
                window.removeEventListener('message', this.callChild, true);
            },
      methods: {
        /**
        * @param ctrlCode 操作码
        */
        checkPermission: function (ctrlCode) {
          // alter(this.$route.baseParams.paramsName);
          // var route = yufp.router.getRoute(hashCode) || {};
          // yufp.logger.info(hashCode + '路由参数：' + JSON.stringify(route));
          var reportname = '';
          switch (cite.menuId) {
          case 'lp-81000': // 影像缺失资料表
            reportname = 'rpt_image_miss';
            break;
          case 'lp-82000':// 贷款台账
            reportname = 'rpt_acc_loan';
            break;
          case 'lp-83000':// 贷款数据统计日报表
            reportname = 'rpt_loan_product_overdue';
            break;
          case 'lp-84000':// 贷款质量日报表（五级分类）
            reportname = 'rpt_loan_quality_product_fivelevel';
            break;
          case 'lp-85000':// 贷款余额报表
            reportname = 'rpt_loan_balance_day';
            break;
          case 'lp-86000':// 逾期还款日报表
            reportname = 'rpt_loan_overdue_back_detail';
            break;
          case 'lp-87000':// 逾期明细表
            reportname = 'rpt_loan_overdue_detail';
            break;
          case 'lp-88000':// 理赔结清客户明细
            reportname = 'rpt_compensation_statement';
            break;

          case 'lp-89000':// 贷款余额及利息收入月报表
            reportname = 'rpt_interest_income_by_month';
            break;
          case 'lp-81100':// 贷款余额剩余期限分布月报表
            reportname = 'rpt_loan_month';
            break;
          case 'lp-81200':// 贷后回款率
              reportname = 'rpt_loan_repayment_rate';
              break;
          case 'lp-81300':// 账龄监控报表
              reportname = 'rpt_account_age_monitor';
              break;
          case 'lp-81400':// 并账报表
              reportname = 'rpt_acc_ledger';
              break;
          case 'lp-81500':// 授信申请清单
              reportname = 'rpt_nls_credit_info';
              break;
          case 'lp-81600':// 月末在贷借据清单
              reportname = 'rpt_acc_loan_month';
              break;
          case 'lp-81700':// 月末逾期分布表(余额)
              reportname = 'rpt_month_overdue_balance';
              break;
          case 'lp-81800':// 月末逾期分布表(笔数)
              reportname = 'rpt_month_overdue_count';
              break;
          case 'lp-89100':// 度小满业务总分核对报表（日报）
              reportname = 'rpt_bd_total_detail_check';
              break;
          case 'lp-89200':// 马上金融业务总分核对报表（日报）
              reportname = 'rpt_ms_total_detail_check';
              break;
          case 'lp-89300':// 客户数及经营地贷款情况统计表（日报）
              reportname = 'rpt_cus_loan_situation';
              break;
          case 'lp-85008':// 回溯命中客户信息明细报表（日报）
              reportname = 'rpt_hit_cus_info';
              break;
          case 'lp-89400':// 贷款台账汇总表
              reportname = 'rpt_acc_loan_total';
              break;
          case 'lp-89500':// 度小满联合贷每日并账报表
              reportname = 'rpt_bd_acc_ledger';
              break;
          case 'lp-89600':// 智慧银行中心联网核查失败清单
              reportname = 'rpt_cus_online_verification';
              break;
          case 'lp-89700':// 度小满、马上金融贷款统计分类表一（用信金额）
              reportname = 'rpt_acc_loan_statistic';
              break;
          case 'lp-89800':// 度小满、马上金融贷款统计分类表二（用信金额）
              reportname = 'rpt_acc_loan_year_total';
              break;
          case 'lp-82100':// 普税贷每日台账
              reportname = 'rpt_psd_day_loan';
              break;
          case 'lp-82200':// 普税贷每日营销台账
              reportname = 'rpt_psd_day_selt';
              break;
          case 'lp-89700':// 优e贷日回款明细报表
              reportname = 'rpt_yed_loan_repay';
              break;

          case 'lp-89801':// 委外（诉讼）批月报表
              reportname = 'rpt_out_collt_task';
              break;
          case 'lp-89802':// 委外（诉讼）存量月报表
              reportname = 'rpt_out_collt_month';
              break;
          case 'lp-89803':// 委外（诉讼）机构月佣金报表
              reportname = 'rpt_out_collt_org';
              break;
          case 'lp-89804':// 委外（诉讼）批日报表
              reportname = 'rpt_out_collt_task_date';
              break;
          case 'lp-89805':// 各队列发送信息/IVR外呼统计报表（日报表）
              reportname = 'rpt_msg_ivr_info';
              break;
          case 'lp-89806':// 联系率统计报表（内催、委外）
              reportname = 'rpt_cus_contact_info';
              break;
          case 'lp-89701':// 优e贷日回款明细报表
              reportname = 'rpt_yed_loan_repay';
              break;
          case 'lp-89702':// 优e贷减免统计报表
              reportname = 'rpt_yed_mon_relief';
              break;
          case 'lp-89703':// 优e贷通用日、月报表(日报)
              reportname = 'rpt_yed_day_overdue_count';
              break;
          case 'lp-89704':// 优e贷通用日、月报表(日报)
              reportname = 'rpt_yed_month_overdue_count';
              break;
          case 'lp-89705':// 催收员日报表
              reportname = 'rpt_yed_overdue_usr4day';
              break;
          case 'lp-89706':// 催收员月报表
              reportname = 'rpt_yed_overdue_usr4month';
              break;
          case 'lp-89709':// 还款明细日报表
              reportname = 'rpt_repayment_detail';
              break;
          case 'lp-81101':// 优e贷、普税贷贷款余额剩余期限分布月报表
              reportname = 'rpt_loan_month_private';//优e贷、普税贷贷款余额剩余期限分布月报表
              break;
          case 'lp-89807':// 运营活动监控统计报表
                  reportname = 'rpt_coupon_activity';
                  break;
          case 'lp-89808':// 运营活动监控明细报表
                  reportname = 'rpt_coupon_use_record';
                  break;
          case 'lp-89910': //惠e贷并账报表
              reportname = 'rpt_hed_acct_flow';
              break;
          case 'lp-89920': //惠e贷日总额核对台账报表
              reportname = 'rpt_hed_acct_info';
              break;
          case 'lp-89930': //惠e贷通用月报表(月报)
              reportname = 'rpt_hed_month_overdue_count';
              break;
          case 'lp-89940': //惠e贷业务明细日报
              reportname = 'rpt_hed_acc_loan';
              break;
          case 'lp-92071': //惠e贷通用日报表(日报)
              reportname = 'rpt_hed_day_overdue_count';
              break;
          case 'lp-92072': //惠e贷通用周报表(周报)
              reportname = 'rpt_hed_week_overdue_count';
              break;
           case 'lp-89950': //惠e贷分润明细报表
              reportname = 'rpt_loan_service_detail';
              break;
           case 'lp-89960': //惠e贷分润汇总报表
              reportname = 'rpt_loan_service_total';
              break;
           case 'lp-89970': //惠e贷分润数据报表
              reportname = 'rpt_loan_service_fee_orgcode';
              break;

        }
          // this.reportSrc = 'http://localhost:8060/cmis-report/JdbcReportServlet?Sys_ReportName=' + reportname;
          this.reportSrc = yufp.settings.reportUrl + '/JdbcReportServlet?Sys_ReportName=' + reportname + '&orgCode=' + yufp.session.org.orgCode;

          // var reportUrl = 'http://localhost:8060/cmis-report/JdbcReportServlet?Sys_ReportName=' + cite.menuId;
          // yufp.logger.info('报表URL：' + reportUrl);
          // this.reportSrc = reportUrl;
          // return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
        },

          callChild: function (e) {
             var _self = this;
             if('FileExportListPageInfo' == e.data.refresh){
                _self.showFileExportListPage();

             } else if (e.data.logQuery && e.data.reportName == "rpt_acc_loan") {
                 yufp.service.request({
                     method: "POST",
                     url: backend.edocService + '/api/query/rpt/acc/loan/list',
                     data: {
                         sysReportName: e.data.elements[0],
                         qurDateD: e.data.elements[1],
                         qurDateM: e.data.elements[2],
                         qurDateDBeg: e.data.elements[3],
                         qurDateDEnd: e.data.elements[4],
                         qurDateMBeg: e.data.elements[5],
                         qurDateMEnd: e.data.elements[6],
                         qurPrdtype: e.data.elements[7],
                         qurPrd: e.data.elements[8],
                         qurBillNo: e.data.elements[9],
                         qurCusName: e.data.elements[10],
                         qurIdCard: e.data.elements[11],
                         qurLoanTerm: e.data.elements[12],
                         qurApplyType: e.data.elements[13],
                         qurPersention: e.data.elements[14],
                         qurAmountType: e.data.elements[15],
                         qurApprvSts: e.data.elements[16],
                         qurOverdueDayMin: e.data.elements[17],
                         qurOverdueDayMax: e.data.elements[18]
                     }
                 });
             } else{
                 yufp.service.request({
                     method: "POST",
                     url: backend.edocService + '/api/check/report/num',
                     data: {
                         sysReportName: e.data[0],
                         qurDateD: e.data[1],
                         qurDateM: e.data[2],
                         qurDateDBeg: e.data[3],
                         qurDateDEnd: e.data[4],
                         qurDateMBeg: e.data[5],
                         qurDateMEnd: e.data[6],
                         qurPrdtype: e.data[7],
                         qurPrd: e.data[8],
                         qurBillNo: e.data[9],
                         qurCusName: e.data[10],
                         qurIdCard: e.data[11],
                         qurLoanTerm: e.data[12],
                         qurApplyType: e.data[13],
                         qurPersention: e.data[14],
                         qurAmountType: e.data[15],
                         qurApprvSts: e.data[16],
                         qurOverdueDayMin: e.data[17],
                         qurOverdueDayMax: e.data[18],
                         qurCurrorgCode: e.data[29]
                     },
                     callback: function (code, message, response) {
                         if(response.rows <= 0){
                             _self.$message({ message: '暂无数据', type: 'info' });
                             return;
                         }else{
                             _self.exportsFile(e, response.rows);
                         }
                     }
                 });

             }
          },

          showFileExportListPage: function(){
              var _self = this;
              _self.dialogVisible = true;
              try {
                  setTimeout(() => {
                      _self.$refs.reftable.remoteData();
                  }, 5000);
              }catch (e) {
              }


              // _self.$nextTick(function () {
              //     try {
              //         setTimeout(() => {
              //             yufp.router.to("REPORT_FileExportListPageInfo", null, _self.fileExportListRootId);
              //         }, 2000)
              //     }catch (err) {
              //         console.log(err);
              //     }
              // });
          },

          exportsFile: function(e, count){
              var _self = this;
              // var exportInfos = window.frames["firstIframe"];
              var params = {
                  sysReportName: e.data[0],
                  qurDateD: e.data[1],
                  qurDateM: e.data[2],
                  qurDateDBeg: e.data[3],
                  qurDateDEnd: e.data[4],
                  qurDateMBeg: e.data[5],
                  qurDateMEnd: e.data[6],
                  qurPrdtype: e.data[7],
                  qurPrd: e.data[8],
                  qurBillNo: e.data[9],
                  qurCusName: e.data[10],
                  qurIdCard: e.data[11],
                  qurLoanTerm: e.data[12],
                  qurApplyType: e.data[13],
                  qurPersention: e.data[14],
                  qurAmountType: e.data[15],
                  qurApprvSts: e.data[16],
                  qurOverdueDayMin: e.data[17],
                  qurOverdueDayMax: e.data[18],
                  qurCurrorgCode: e.data[29],
                  reportCount: count
              };

              // console.log(params)
              _self.$confirm('确认导出该报表数据？', '提示', {type: 'warning'}).then(function () {
                  _self.showFileExportListPage();
                  yufp.service.request({
                      method: "POST",
                      url: backend.edocService + '/api/file/export/execute',
                      data: params,
                      timeout: 3600000
                      // callback: function (code, message, response) {
                      //     _self.$message(response);
                      // }   异步任务
                  });

              }).catch(function (){ });
          },

          cancelFn: function () {
            var _self = this;
              yufp.service.request({
                  method: "POST",
                  url: backend.edocService + '/api/query/file/export/list',
                  data: {
                      status: '003'
                  },
                  callback: function (code, message, response) {
                      if(response.rows != null){
                          _self.$message({ message: '存在处理中的导出任务，再次查看导出结果请点击【导出清单查看】按钮', type: 'info' });
                      }
                      _self.dialogVisible = false;
                  }
              });
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
              _self.dialogVisibleSon = true;
              //_self.dialogVisible = false;

          },

          infoFn: function () {
              if (this.$refs.reftable.selections.length != 1) {
                  this.$message({ message: '请先选择一条记录', type: 'warning' });
                  return;
              }
              this.switchStatus('DETAIL', false);
              this.$nextTick(function () {
                  yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
              });
          },

          downloadFn: function () {
              if (this.$refs.reftable.selections.length != 1) {
                  this.$message({ message: '请先选择一条记录', type: 'warning' });
                  return;
              }
              var _self = this;
              var obj = _self.$refs.reftable.selections[0];
              if('002' == obj.status){
                  _self.$message({ message: '文件导出失败，无法下载！', type: 'warning' });
                  return;
              }else if('003' == obj.status){
                  _self.$message({ message: '文件下载处理中，请稍后再下载!', type: 'info' });
                  return;
              }else if('001' == obj.status){
                  var downLoadUrl = backend.edocService + '/api/file/export/downLoad?pkId='+obj.pkId + '&filePath='+obj.filePath;
                  window.location.href = downLoadUrl;
              }else{
                  _self.$message({ message: '非法的导出状态！', type: 'error' });
              }
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
