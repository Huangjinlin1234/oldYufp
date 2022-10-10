/**
 * @create by ligm on 2019-08-10
 * @description 额度终止申请表
 */
define([],function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      //引用的字典项  渠道使用的字典项：APPLY_CHANNEL_TYPE，证件类型：STD_ZB_CERT_TYP，审批状态：APRV_STATUS，是否循环：CYCLIC_FLG,借据状态：STD_ZB_ACC_STATUS
      yufp.lookup.reg('STD_ZB_CERT_TYP,APRV_STATUS,APPLY_CHANNEL_TYPE,APRV_OPINION');
      var vm = yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            expandCollapseName: ['1', '2', '3'],
            baseParams: {},
            baseTab: 'baseTab',
            dataUrl:backend.flowService + '/api/manual/review/apps', // 首页数据
            loanDataUrl: backend.flowService + '/api/lmt/terminate/app/acc/loans', //借据信息表
            queryFields: [
            { placeholder: '人工复核申请流水号', field: 'bizSerno', type: 'input' },
            { placeholder: '授信流水号', field: 'lmtApplySeq', type: 'input' },
            { placeholder: '证件类型', field: 'certType',type:'select',dataCode: 'STD_ZB_CERT_TYP'},
            { placeholder: '证件号码', field: 'certCode', type: 'input' },
            { placeholder: '审批状态', field: 'approveSts', type:'select',dataCode: 'APRV_STATUS'},
            { placeholder: '日期区间', field: 'applyDateRange', type: 'daterange' }
            ],
            queryButtons: [
              { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                  if (valid) {
                    if(model.applyDateRange === ""){
                      model.applyDateRange = new Array(2);
                    }
                    _self.$refs.reftable.remoteData(model);
                  }
                } },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
            ],
            // 人工复核表
            tableColumns: [
            { label: '人工复核流水号', prop: 'bizSerno', sortable: true, resizable: true },
            { label: '授信申请流水号', prop: 'lmtApplySeq', sortable: true, resizable: true },
            { label: '渠道', prop: 'channelNo', sortable: true, resizable: true ,type:'select',dataCode: 'APPLY_CHANNEL_TYPE'},
            { label: '客户编号', prop: 'cusId', sortable: true, resizable: true ,hidden:true},
            { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
            { label: '证件类型', prop: 'certType', sortable: true, resizable: true ,type: 'select',dataCode:'STD_ZB_CERT_TYP'},
            { label: '证件号码', prop: 'certCode', sortable: true, resizable: true },
            { label: '风控审批评分', prop: 'riskScore', sortable: true, resizable: true,},
            { label: '风控建议额度', prop: 'riskLmtAmt', sortable: true, resizable: true },
            { label: '反洗钱名单筛查结果', prop: 'fxqListResult', sortable: true, resizable: true},
            { label: '创建时间', prop: 'createTime', sortable: true, resizable: true},
            { label: '审批状态', prop: 'approveSts', sortable: true, resizable: true,dataCode: 'APRV_STATUS'},
            { label: '审批时间', prop: 'approveTime', sortable: true, resizable: true,hidden:true },
            { label: '审批人', prop: 'approveUser', sortable: true, resizable: true,hidden:true },
            { label: '审批意见', prop: 'approveOpi', sortable: true, resizable: true,hidden:true },
            { label: '最后修改人', prop: 'lastUpdateUser', sortable: true, resizable: true,hidden:true  },
            { label: '最后修改时间', prop: 'lastUpdateTime', sortable: true, resizable: true,hidden:true  }
             ],

            // 客户信息
            cusFields:[{
              columnCount:3,
              fields:[
                { field: 'cusName', label: '客户名称' ,disabled: true },
                { field: 'certType', label: '证件类型',disabled: true  ,type: 'select',dataCode: 'STD_ZB_CERT_TYP'},
                { field: 'certCode', label: '证件号码',disabled: true },
                { field: 'wrkCorpNm', label: '单位',disabled: true },
                { field: 'indivMobile', label: '联系电话',disabled: true }
              ]
            }],

            // 借贷信息
            loanFields:[{
              columnCount:3,
              fields:[
                { field: 'applyDate', label: '申请日期' ,disabled: true },
                { field: 'applyAmt', label: '申请金额',disabled: true  ,type: 'select',dataCode: 'STD_ZB_CERT_TYP'},
                { field: 'applyTerm', label: '申请期数',disabled: true },
                { field: 'approveRateY', label: '年利率',disabled: true }
              ]
            }],

            riskFields:[{
              columnCount:3,
              fields:[
                { field: 'bizSerno', label: '人工复核流水号' ,disabled: true  },
                { field: 'lmtApplySeq', label: '授信申请流水号',disabled: true  ,type: 'select',dataCode: 'STD_ZB_CERT_TYP'},
                { field: 'riskScore', label: '风控审批评分',disabled: true   },
                { field: 'riskLmtAmt', label: '风控建议额度',disabled: true   },
                { field: 'fxqListResult', label: '反洗钱名单筛查结果',disabled: true   },
                { field: 'approveSts', label: '审批状态',disabled: true,type:'select',dataCode: 'APRV_STATUS'},
                { field: 'approveOpi', label: '审批意见',disabled: true  },
                { field: 'approveUser', label: '审批人',disabled: true   },
                { field: 'approveTime', label: '审批时间',disabled: true   },
                { field: 'lastUpdateUser', label: '最后修改人',disabled: true   },
                { field: 'lastUpdateTime', label: '最后修改时间',disabled: true   },
                { field: 'cusName', label: '客户名称' ,disabled: true,hidden:true},
                { field: 'certType', label: '证件类型',disabled: true,type: 'select',dataCode: 'STD_ZB_CERT_TYP',hidden:true},
                { field: 'certCode', label: '证件号码',disabled: true,hidden:true}
              ]
            }],
            // 人行征信
            zxExpandCollapseName: ['redititem'],
            //人行征信tab页
            dataUrlcomm: backend.riskmService + '/api/rsc/warn/loan/hist/rule',
            cdpReftableParams: {},
            cdpReftableColumns: [
              {label: '规则编号', prop: 'ruleCode', sortable: true, resizable: true, hidden:true },
              {label: '规则名称', prop: 'ruleName', sortable: true, resizable: true},
              {label: '历史值', prop: 'histValue', sortable: true, resizable: true},
              {label: '当前值', prop: 'currValue', sortable: true, resizable: true}
            ],
            //征信报告
            dataUrlZx:backend.riskmService+'/api/rsc/warn/zxReport',
            zxReftableParams:{},
            zxReftableColumns:[
              {label: '征信报告号', prop: 'reportId', sortable: true, resizable: true},
              {label: '客户姓名', prop: 'cusName', sortable: true, resizable: true},
              {label: '证件号码', prop: 'certCode', sortable: true, resizable: true},
              {
                label: '创建时间', prop: 'createTime', sortable: true, resizable: true,
                formatter: function (row, column, cellValue) {
                  if (!row.createTime) {
                    return row.createTime;
                  } else {
                    return yufp.util.dateFormat(row.createTime);
                  }
                }
              },
              {
                label: '征信报告更新时间', prop: 'updateTime', sortable: true, resizable: true,
                formatter: function (row, column, cellValue) {
                  if (!row.updateTime) {
                    return row.updateTime;
                  } else {
                    return yufp.util.dateFormat(row.updateTime);
                  }
                }
              },
            ],

            aprvHisParam:{bizSerno:'1'},
            aprvHisUrl: backend.flowService + '/api/flow/history',
            ApHisTableColumns: [
              { label: '流水号', prop: 'bizSerno', sortable: true, resizable: true },
              { label: '所属阶段', prop: 'flowStage', sortable: true, resizable: true },
              { label: '审批人', prop: 'aprvUserCode', sortable: true, resizable: true },
              { label: '审批结果', prop: 'aprvStatus',  dataCode: 'APRV_OPINION',sortable: true, resizable: true },
              { label: '审批意见', prop: 'aprvComment', sortable: true, resizable: true },
              { label: '审批时间', prop: 'aprvDate', sortable: true, resizable: true },
            ],

            height: yufp.frame.size().height - 103,
            dialogVisible: false,
            formDisabled: false,
            cusFormDisabled:false,
            riskFormDisabled:false,
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

          modifyFn: function () {
              var _self = this;
            if (_self.$refs.reftable.selections.length != 1) {
                _self.$message({
                message: '请先选择一条记录',
                type: 'warning'
              });
              return;
            }
            var obj = _self.$refs.reftable.selections[0];
            if ( obj.approveStatus == '01' || obj.approveStatus == '05') {
                _self.$message({message: '审批状态为“待发起”、“打回”，才可修改!', type: 'warning'});
              return ;
            }
            this.switchStatus('EDIT', true);
            var paramObj = {
              lmtApplySeq:obj.lmtApplySeq
            };
            _self.aprvHisParam = {
              bizSerno:obj.bizSerno,
            };
            this.queryInfoFn(paramObj);
            this.$nextTick(function () {
              yufp.extend(this.$refs.riskRef.formModel, obj);
              _self.$refs.aprvHistoryTable.remoteData(this.aprvHisParam);
            });
          },

          infoFn: function () {
            var _self = this;
            if (_self.$refs.reftable.selections.length != 1) {
                _self.$message({
                message: '请先选择一条记录',
                type: 'warning'
              });
              return;
            }
            var obj = _self.$refs.reftable.selections[0];
            /*_self.cdpReftableParams = {
              tabType: '02'
            }*/
            _self.zxReftableParams = {
              cusName: obj.cusName,
              certType: obj.certType,
              certCode: obj.certCode
            };
            _self.aprvHisParam = {
              bizSerno:obj.bizSerno,
            };
            this.switchStatus('DETAIL', false);
            var paramObj = {
              lmtApplySeq:obj.lmtApplySeq
            };
            _self.queryInfoFn(paramObj);
            this.$nextTick(function () {
              yufp.extend(this.$refs.riskRef.formModel, obj);
              _self.$refs.aprvHistoryTable.remoteData(this.aprvHisParam);
              yufp.service.request({
                method: 'POST',
                url: backend.riskmService + '/api/rsc/warn/zxReport',
                data: _self.zxReftableParams,
                callback: function (code, message, response) {
                  if (code == 0 && response.code == 0){
                    if (response.rows.length > 0 ) {
                      _self.$refs.zxReftable.data = response.rows;
                    } else {
                      _self.$message({
                        message: '未查询到征信报告！',
                        type: 'warning'
                      });
                    }
                  } else {
                    _self.$message({
                      message: '查询征信报告失败！',
                      type: 'warning'
                    });
                  }

                }
              });
            });
          },
          getContentFn: function () {
            var _self = this;
            var selections = this.$refs.zxReftable.selections;
            if (selections.length != 1) {
              this.$message({message: '请先选择一条记录', type: 'warning'});
              return;
            }
            var condition = {
              reportId: selections[0].reportId
            };
            yufp.service.request({
              method: 'POST',
              url: backend.creditService + '/api/cus/rpt/show',
              data: condition,
              callback: function (code, message, response) {
                if (response.code == 0) {
                  var report = response.rows.content;
                  if (report != "" && report != null) {
                    w = window.open('about:blank');
                    w.document.write(report);
                    w.document.close();
                  } else {
                    _self.$message('没有查询到征信报告!');
                  }
                } else {
                  _self.$message({message: '查看征信报告失败：' + response.message, type: 'warning'});
                }
              }
            });
          },
          commitFn: function () {
            var _self = this;
            var validate = false;
            this.$refs.riskRef.validate(function (valid) {
              validate = valid;
            });
            if (!validate) {
              return;
            }
            var obj = this.$refs.riskRef.formModel;
            var rMethod = '';
            if (_self.viewType == "EDIT") {
              rMethod = 'PUT';
            } else if (_self.viewType == "ADD") {
              rMethod = 'POST';
            }
            yufp.service.request({
              method: rMethod,
              url: backend.flowService + '/api/manual/review/app/submit',
              data: obj,
              callback: function (code, message, response) {
                if (code == 0 && response.code == 0) {
                  _self.$refs.reftable.remoteData();
                  vm.dialogVisible = false;
                  vm.$message({
                    message: '处理成功!',
                    type: 'success'
                  });
                  vm.$refs.reftable.remoteData();
                } else
                  vm.$message('操作失败，'+response.message);
                _self.$refs.reftable.remoteData();
              }
            });
            this.clearFn();
          },

          queryInfoFn: function (obj) {
            var _self = this;
            yufp.service.request({
              method: 'POST',
              url: backend.flowService + '/api/manual/nls/credit/info',
              data: obj,
              callback: function (code, message, response) {
                if (code == 0 && response.code == 0) {
                  yufp.extend(_self.$refs.cusRef.formModel,response.rows);
                  yufp.extend(_self.$refs.loanRef.formModel, response.rows);
                } else{
                  _self.$message('根据授信号查询授信信息失败！请检查数据');
                }
              }
            });
          },

          cancleFn: function () {
            var _self = this;
            _self.dialogVisible = false;
            this.clearFn();
          },

          returnFn: function(){
            var _self = this;
            _self.dialogVisible = false;
            this.clearFn();
          },

          clearFn: function(){
            var _self = this;
            _self.$refs.cusRef.resetFields();
            _self.$refs.loanRef.resetFields();
            _self.$refs.riskRef.resetFields();
            _self.$refs.zxReftable.data=[];
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
