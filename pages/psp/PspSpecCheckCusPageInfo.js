/**
 * @create by ligm on 2019-09-04
 * @description 专项检查客户表
 */
define(function (require, exports) {

  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CRUD_TYPE,TODO,STD_ZX_CHK_STATE,SPEC_CHECK_STATUS,STD_ZB_ACC_STATUS');
    var vm=yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          baseParams: {},
          valiPagePluginData: true,
          expandCollapseName: ['reform', 'billtable', 'warntable','form','stable','cdpTab'],
          zxExpandCollapseName: ['cdpReitem','redititem'],
          baseParams1: {
            specCheckStatus:'01'
          },
          baseTab: 'baseTab',
          dataUrl:backend.riskmService +"/api/psp/spec/check/cuss",
          dataUrl1:backend.riskmService+'/api/psp/spec/check/cus/acc/loans',
          dataUrl2:backend.riskmService+'/api/rsc/warn/loans',
          queryFields: [
            { placeholder: '检查任务编号', field: 'bizSerno', type: 'input' },
            { placeholder: '检查名称', field: 'chkName', type: 'input' },
            { placeholder: '客户编号', field: 'cusId', type: 'input' },
            { placeholder: '客户名称', field: 'cusName', type: 'input' },
            { placeholder: '证件类型', field: 'certType', type: 'input', type: 'select',dataCode:"STD_ZB_CERT_TYP" },
            { placeholder: '证件号码', field: 'certCode', type: 'input' },
            { placeholder: '检查登记状态', field: 'chkInputSts', type: 'select',dataCode:"STD_ZX_CHK_STATE" },
            { placeholder: '任务创建人', field: 'taskCreateUser', type: 'input' },
            { placeholder: '任务创建时间', field: 'taskCreateTime', type: 'date', editable: false },
            { placeholder: '任务办理人', field: 'taskHdlUser', type: 'input' },
            { placeholder: '任务办理时间', field: 'taskHdlTime', type: 'date', editable: false },
          ],
          queryButtons: [
            { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                if (valid) {
                  _self.$refs.reftable.remoteData(model);
                }
              } },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],

          tableColumns: [
            { label: '检查任务编号', prop: 'bizSerno', sortable: true, resizable: true },
            { label: '检查任务流水号', prop: 'bizSernoFlow', sortable: true, resizable: true ,hidden:true},
            { label: '检查名称', prop: 'chkName', sortable: true, resizable: true },
            { label: '检查任务状态', prop: 'specCheckStatus', sortable: true, resizable: true,hidden:true},
            { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
            { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
            { label: '证件类型', prop: 'certType', sortable: true, resizable: true,dataCode:"STD_ZB_CERT_TYP" },
            { label: '证件号码', prop: 'certCode', sortable: true, resizable: true },
            { label: '任务创建人', prop: 'taskCreateUser', sortable: true, resizable: true },
            { label: '任务创建时间', prop: 'taskCreateTime', sortable: true, resizable: true },
            { label: '任务办理人', prop: 'taskHdlUser', sortable: true, resizable: true },
            { label: '任务办理时间', prop: 'taskHdlTime', sortable: true, resizable: true },
            { label: '检查登记状态', prop: 'chkInputSts', sortable: true, resizable: true,dataCode:"STD_ZX_CHK_STATE" },
            { label: '客户经理', prop: 'cusManager', sortable: true, resizable: true ,hidden:true},
            { label: '主管机构', prop: 'mainBrId', sortable: true, resizable: true ,hidden:true },
            { label: '最后更新人', prop: 'lastUpdateUser', sortable: true, resizable: true ,hidden:true },
            { label: '最后修改时间', prop: 'lastUpdateTime', sortable: true, resizable: true ,hidden:true }
          ],
          updateFields: [{
            columnCount: 3,
            fields: [
              {field: 'bizSerno', label: '检查任务编号',disabled: true },
              {field: 'chkName', label: '检查名称',disabled: true },
              {field: 'chkState', label: '检查任务状态',hidden:true},
              {field: 'cusId', label: '客户编号',hidden:true},
              {field: 'cusName', label: '客户名称',hidden:true},
              {field: 'chkBln', label: '检查贷款余额',hidden:true},
              {field: 'chkNum', label: '检查贷款笔数',hidden:true},
              {field: 'ownCdt', label: '授信总额',hidden:true},
              {field: 'loanTotalBln', label: '贷款总余额',hidden:true},
              {field: 'othUnFactor', label: '其他不利因素',hidden:true},
              {field: 'expSugg', label: '情况说明及建议',hidden:true},
              {field: 'taskProId', label: '任务分配人',hidden:true},
              {field: 'taskProBrId', label: '任务分配机构',hidden:true},
              {field: 'taskExeId', label: '任务执行人',hidden:true},
              {field: 'hdlNo', label: '任务办理人',hidden:true},
              {field: 'hdlDate', label: '任务办理日期',hidden:true},
              {field: 'createTime', label: '创建时间',hidden:true},
              {field: 'lastUpdateUser', label: '最后更新人',hidden:true},
              {field: 'legalOrgCode', label: '机构法人代码',hidden:true},
              {field: 'legalOrgName', label: '机构法人名称',hidden:true},
              {field: 'chkType', label: '检查类型',hidden:true},
              {field: 'realFinDate', label: '实际完成日期',hidden:true},
              {field: 'createUser', label: '创建人',hidden:true},
              {field: 'lastUpdateTime', label: '最后修改日期',hidden:true},
              {field: 'orgCode', label: '机构代码',hidden:true},
              {field: 'orgName', label: '机构名称',hidden:true},
              {field: 'cusType', label: '客户类型',hidden:true},
              {field: 'contNo', label: '合同编号',hidden:true},
              {field: 'contAmt', label: '合同金额',hidden:true},
              {field: 'loanStartDate', label: '贷款起始日',hidden:true},
              {field: 'loanEndDate', label: '贷款到期时间',hidden:true},
              {field: 'mainBrId', label: '主管机构',hidden:true},
              {field: 'cusManager', label: '客户经理',hidden:true},
              {field: 'certType', label: '证件类型',hidden:true},
              {field: 'certCode', label: '证件号码',hidden:true},
              {field: 'inputBrId', label: '登记机构',hidden:true},
              {field: 'daybatDate', label: '跑批日期',hidden:true},
              {field: 'chkTaskNo', label: '检查任务编号',hidden:true},
              {field: 'approveStatus', label: '审批状态',hidden:true},
              {field: 'aprvUserCode', label: '审批人编号',hidden:true},
              {field: 'aprvUserName', label: '审批人名称',hidden:true},
              {field: 'aprvDate', label: '审批日期',hidden:true},
              {field: 'aprvComment', label: '人工处理意见',hidden:true }
            ]
          }],
          tableColumns1: [
            { label: '借据号', prop: 'billNo', sortable: true, resizable: true },
            { label: '产品', prop: 'prdName', sortable: true, resizable: true },
            { label: '担保方式', prop: 'assureMeansMain', sortable: true, resizable: true ,dataCode:'STD_ZB_ASSURE_MEANS' },
            { label: '贷款合同号', prop: 'contNo', sortable: true, resizable: true },
            { label: '贷款发放日', prop: 'loanStartDate', sortable: true, resizable: true },
            { label: '贷款到期日', prop: 'loanEndDate', sortable: true, resizable: true },
            { label: '贷款利率', prop: 'realityIrY', sortable: true, resizable: true, formatter: function(row, column, cellValue) {
                var num = parseFloat(cellValue);
                if (typeof(num) == 'undefined'  || num == null || isNaN(num) )
                  num = 0;
                var rateY = yufp.util.toPercent((parseFloat(num) * 100).toFixed(6));
//                            Number(num * 100).toFixed(4) + '%';
                return rateY;
              }},
            { label: '借据状态', prop: 'accountStatus', sortable: true, resizable: true,dataCode:'STD_ZB_ACC_STATUS'},
            // { label: '贷款帐号', prop: 'loanAccount', sortable: true, resizable: true },

            { label: '最近一次逾期金额(元)', prop: 'overdueBlnAmt', sortable: true, resizable: true },
            { label: '最近一次逾期时间', prop: 'overdueDate', sortable: true, resizable: true }
          ],
          tableColumns2: [
            // {label: '序号', prop: 'opUserCode', sortable: true, resizable: true},
            {label: '规则ID', prop: 'ruleCode', sortable: true, resizable: true},
            {label: '规则名称', prop: 'ruleName',sortable: true, resizable: true},
            {label: '预警时间', prop: 'riskDate', sortable: true, resizable: true}
          ],
          updateFields2: [{
            columnCount: 3,
            fields: [
              { field: 'cusId', label: '客户号',disabled:true,hidden:true},
              { field: 'cusName', label: '客户名称',disabled:true,hidden:true},
              { field: 'certType', label: '证件类型',type:'select',dataCode:'STD_ZB_CERT_TYP',disabled:true,hidden:true},
              { field: 'certCode', label: '证件号码',disabled:true,hidden:true},
              { field: 'ownCdt', label: '授信总额(元)',disabled:true, type: 'num', digit:2, formatter:yufp.util.moneyFormatter},
              { field: 'loanTotalBln', label: '贷款总余额(元)',disabled:true, type: 'num', digit:2, formatter:yufp.util.moneyFormatter},
              { field: 'contNo', label: '合同号',hidden:true},
              { field: 'contAmt', label: '合同金额(元)',hidden:true},
              { field: 'loanStartDate', label: '贷款起始日',hidden:true},
              { field: 'loanEndDate', label: '贷款到期日',hidden:true},
              { field: 'chkBln', label: '检查任务余额(元)',hidden:true},
              { field: 'cusType', label: '客户类型',hidden:true},
              { field: 'chkNum', label: '检查任务笔数',hidden:true}
            ]

          }],
          dataUrlannex: backend.riskmService + "/api/collt/task/distrs",
          baseParams: {},
          tableColumns3: [
            // {label: '序号', prop: 'opUserCode', sortable: true, resizable: true},
            {label: '附件名称', prop: 'opUserCode', sortable: true, resizable: true},
            {label: '附件描述', prop: 'opUserCode', sortable: true, resizable: true},
            {label: '上传人', prop: 'opUserCode', sortable: true, resizable: true},
            {label: '上传时间', prop: 'opUserCode', sortable: true, resizable: true}
          ],
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
          updateFields3: [{
            columnCount: 1,
            fields: [
              {
                field: 'othUnFactor', label: '影响贷款偿还的其他不利因素 ：', type: "textarea",
                rules: [
                  {required: true, message: '影响贷款偿还的其他不利因素是必填项', trigger: 'blur'},
                  {min: 0, max: 1000, message: '长度不能大于1000', trigger: 'blur'}
                ]
              }
            ]
          }],
        updateFields4: [{
            columnCount: 1,
            fields: [
              { field: 'expSugg', label: '其他风险描述：',type:"textarea",rules:[
                  {min: 0,  max: 1000, message:'长度不能大于1000',  trigger: 'blur'}
                ]}
            ]
          }],
          updateFields5: [{
            columnCount: 3,
            fields: [
              {field: 'cusId', label: '客户编号', disabled: true},
              {field: 'cusName', label: '客户名称', disabled: true},
              {field: 'indivSex', label: '性别', type: 'select', dataCode: 'STD_ZX_SEX', disabled: true},
              {field: 'indivDtOfBirth', label: '出生日期', type: 'date', disabled: true},//,type:'date'
              {field: 'certType', label: '证件类型', type: 'select', dataCode: 'STD_ZB_CERT_TYP', disabled: true},
              {field: 'certCode', label: '证件号码', disabled: true},
              {field: 'phone', label: '手机号码', disabled: true},
              {field: 'indivRsdAddr', label: '居住地址', disabled: true},
              {field: 'indivNtn', label: '民族', type: 'select', dataCode: 'STD_ZB_NATION', disabled: true},
              {field: 'indivComName', label: '工作单位名称', disabled: true},
              {field: 'indivComTyp', label: '单位性质', type: 'select', dataCode: 'STD_ZB_REG_TYPE', disabled: true},
              {field: 'indivCrtfctn', label: '职称', type: 'select', dataCode: 'STD_ZX_TITLE', disabled: true},
              {field: 'indivOcc', label: '职业', disabled: true, type: 'select', dataCode: 'STD_ZX_EMPLOYMET'},
              {field: 'postAddr', label: '通讯地址', disabled: true},
              {field: 'indivMarSt', label: '婚姻状况', type: 'select', dataCode: 'STD_ZX_MARR_STATUS', disabled: true}
            ]

          }],

          /** 附件上传*/
          dataUrlAnnex: backend.riskmService + '/api/mon/relief/ann',
          baseParamsAnnex:{},
          tableColumnsAnnex:[
            { label: '检查登记申请流水号', prop: 'flowAppNo', sortable: true, resizable: true },
            { label: '申请流水号', prop: 'bizSerno', sortable: true, resizable: true ,hidden:true},
            { label: '附件名称', prop: 'annexName', sortable: true, resizable: true },
            { label: '附件描述', prop: 'annexDesc', sortable: true, resizable: true },
            { label: '上传人', prop: 'uploadUser', sortable: true, resizable: true },
            { label: '上传时间', prop: 'uploadTime', sortable: true, resizable: true },
            { label: '最后更新人', prop: 'lastUploadUser', sortable: true, resizable: true },
            { label: '最后更新时间', prop: 'lastUploadTime', sortable: true, resizable: true }
          ],
          annexInfoFields: [
            {
              columnCount: 2,
              fields: [
                { field: 'annexName', label: '附件名称', type:'textarea', rows: 1,
                  rules: [{required: true, message: '必填项', trigger: 'blur'}]
                }
              ]
            },
            {
              columnCount: 1,
              fields: [
                { field: 'annexDesc', label: '附件描述', type:'textarea', rows: 3}
              ]
            }
          ],
          annexFormDisabled: false,
          dialogVisibleAnnex: false,
          flag: '',

          height: yufp.frame.size().height - 103,
          dialogVisible: false,
          formDisabled: false,
          cusDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false)
        }
      },
      methods: {
        /**
         * @param ctrlCode 操作码
         */
        checkPermission: function (ctrlCode) {
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
          _self.formDisabled = !editable;
          _self.cusDisabled = !editable;
          _self.dialogVisible = true;
        },

        modifyFn: function () {
          var _self = this;
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({message: '请先选择一条记录', type: 'warning'});
            return;
          }
          var obj = this.$refs.reftable.selections[0];
          var chkInputSts = obj.chkInputSts;
          if (chkInputSts != '00') {
            this.$message({message: '检查状态为已登记的任务不能再进行修改!', type: 'warning'});
            return;
          }
          // 附件上传记录表格参数
          _self.baseParamsAnnex = {
            flowAppNo : obj.bizSernoFlow,
            bizSerno : obj.bizSernoFlow
          };
          this.switchStatus('EDIT', true);
          this.$nextTick(function () {
            var obj = this.$refs.reftable.selections[0];
            this.$refs.form1.resetFn();
            this.$refs.form2.resetFn();
            this.$refs.form3.resetFn();
            this.$refs.form4.resetFn();
            this.$refs.formCus.resetFn();
            yufp.util.copyObj(this.$refs.form1.formModel, obj);
            this.displayCusInfo(obj);
            yufp.util.copyObj(this.$refs.form2.formModel, obj);
            yufp.util.copyObj(this.$refs.form3.formModel, obj);
            yufp.util.copyObj(this.$refs.form4.formModel, obj);
            _self.$refs.billtable.remoteData(obj);
            _self.$refs.reftableAnnex.remoteData(_self.baseParamsAnnex);
          });
          _self.acculationLoanBalance(obj);
          _self.acculationLmtAmt(obj);
        },
        infoFn: function () {
          var _self = this;
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({message: '请先选择一条记录', type: 'warning'});
            return;
          }
          _self.cdpReftableParams = {
            tabType: '02'
          }
          var obj = _self.$refs.reftable.selections[0];
          var conditions = {
            cusId: obj.cusId,
            cusName: obj.cusName,
            certType: obj.certType,
            certCode: obj.certCode
          };
          _self.zxReftableParams = {
            cusId: obj.cusId,
            cusName: obj.cusName,
            certType: obj.certType,
            certCode: obj.certCode
          }
          // 附件上传记录表格参数
          _self.baseParamsAnnex = {
            flowAppNo : obj.bizSernoFlow,
            bizSerno : obj.bizSernoFlow
          };
          this.switchStatus('DETAIL', false);
          _self.aprvVisible = true;
          _self.$nextTick(function () {
            this.$refs.form1.resetFn();
            this.$refs.form2.resetFn();
            this.$refs.form3.resetFn();
            this.$refs.form4.resetFn();
            this.$refs.formCus.resetFn();

            var obj = this.$refs.reftable.selections[0];
            yufp.util.copyObj(this.$refs.form1.formModel, obj);
            this.displayCusInfo(obj);
            yufp.util.copyObj(this.$refs.form2.formModel, obj);
            this.taskInfoDisplay(obj);
            _self.$refs.zxReftable.remoteData(_self.zxReftableParams);
            _self.$refs.billtable.remoteData(obj);
            _self.$refs.reftableAnnex.remoteData(_self.baseParamsAnnex);

            yufp.service.request({
              method: "POST",
              url: backend.riskmService + '/api/rec/hist/rsc/warn',
              data: conditions,
              callback: function (code, message, response) {
                if (response.code == 0) {
                  _self.$refs.cdpReftable.remoteData(_self.cdpReftableParams);
                } else {
                  _self.$refs.cdpReftable.remoteData(_self.cdpReftableParams);
                  _self.$message({message: "处理失败：" + response.message, type: 'warning'});
                }
              }
            });
          });
          _self.acculationLoanBalance(obj);
          _self.acculationLmtAmt(obj);
        },
        //查询贷款总额
        acculationLoanBalance: function(obj){
          var _self = this;
          this.$nextTick(function () {
            yufp.service.request({
              method: 'POST',
              url:backend.riskmService+ '/api/psp/acc/loan/balance',
              data: obj,
              callback: function (code, message, response) {
                if (code == 0) {
                  yufp.extend(_self.$refs.form2.formModel,{loanTotalBln:response.rows});
                } else {
                  _self.$message('计算失败');
                }
              }
            });
          })
        },

        //查询授信总额
        acculationLmtAmt: function(obj){
          var _self = this;
          this.$nextTick(function () {
            yufp.service.request({
              method: 'POST',
              url:backend.riskmService+ '/api/psp/lmt/amt',
              data: obj,
              callback: function (code, message, response) {
                if (code == 0) {
                  yufp.extend(_self.$refs.form2.formModel,{ownCdt:response.rows});
                } else {
                  _self.$message('计算失败');
                }
              }
            });
          })
        },

        returnFn: function () {
          var _self = this;
          _self.dialogVisible = false;
        },

        submitFn: function () {
          var _self = this;
          var validate = false;
          _self.$refs.form1.validate(function (valid) {
            validate = valid;
          });
          _self.$refs.form2.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          _self.$refs.form3.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          _self.$refs.form4.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }

          var cmisdata = {};
          yufp.extend(cmisdata, _self.$refs.form1.formModel);
          yufp.extend(cmisdata, _self.$refs.form1.formModel);
          yufp.extend(cmisdata, _self.$refs.form2.formModel);
          yufp.extend(cmisdata, _self.$refs.form3.formModel);
          yufp.extend(cmisdata, _self.$refs.form4.formModel);
          if(null!=cmisdata)
            cmisdata.chkTaskNo = _self.$refs.form1.formModel.bizSerno;
            cmisdata.bizSerno = '';
          var obj = _self.$refs.reftableAnnex.data;
          if (obj.length > 0){
            cmisdata.bizSerno =obj[0].flowAppNo;
          }
          yufp.service.request({
            method: 'POST',
            url: backend.flowService + '/api/psp/check/task/app/submit',
            data: cmisdata,
            callback: function (code, message, response) {
              if (response.code == 0) {
                _self.$refs.reftable.remoteData();
                _self.$message('操作成功');
                _self.dialogVisible = false;
              } else if (response.code == 1) {
                _self.$message({message:'操作失败：' + response.message, type: 'warning'});
              } else {
                _self.$message('操作失败');
              }
            }
          });
        },
        returnFn: function () {
          var _self = this;
          _self.dialogVisible = false;
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
        displayCusInfo: function(obj){
          var _self = this;
          _self.$nextTick(function () {
            yufp.service.request({
              method: "GET",
              url: backend.cusService + '/api/cus/indiv/' + obj.certCode,
              data: obj.certCode,
              callback: function (code, message, response) {
                if (response.success) {
                  yufp.extend(_self.$refs.formCus.formModel, response.rows);
                } else {
                  _self.$message("获取客户信息失败：" + response.message);
                }
              }
            });
          });
        },
        cancleFn: function () {
          var _self = this;
          _self.dialogVisible = false;
        },

        taskInfoDisplay: function (obj) {
          var _self = this;
          _self.$nextTick(function () {
            yufp.service.request({
              method: "POST",
              url: backend.flowService + '/api/psp/check/task/apps',
              data: obj,
              callback: function (code, message, response) {
                if (response.success) {
                  _self.$refs.form3.formModel.othUnFactor = response.rows.othUnFactor;
                  _self.$refs.form4.formModel.expSugg = response.rows.expSugg;
                } else {
                }
              }
            });
          });
        },
        /**附件上传相关*/
        uploadAnnexFn: function () {
          var _self = this;
          _self.dialogVisibleAnnex = true;
          _self.annexFormDisabled = false;
          _self.flag = '';
          var size = _self.$refs.reftableAnnex.data.length;
          _self.$nextTick(function () {
            _self.$refs.annexForm.resetFn();
            if('EDIT' == _self.viewType && size>0){
              var data = _self.$refs.reftableAnnex.data;
              var bizSerno = data[0].flowAppNo;
              yufp.extend(_self.$refs.annexForm.formModel,
                  {flowAppNo:bizSerno},
                  {bizSerno:bizSerno},
                  {uploadUser:yufp.session.userCode});
            }else{
              yufp.extend(_self.$refs.annexForm.formModel,
                  {uploadUser:yufp.session.userCode});
              _self.$refs.annexForm.switch('flowAppNo', 'hidden', true);
            }
          });
        },
        saveAnnexFn:function () {
          var _self = this;
          var validate = false;
          _self.$refs.annexForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var rMethod = 'POST';
          var cmisdata = {};
          var obj = _self.$refs.reftableAnnex.data;
          if (obj.length>0){
            rMethod = 'PUT';
            yufp.extend(_self.$refs.annexForm.formModel,
                {flowAppNo:obj[0].flowAppNo},
                {bizSerno:obj[0].bizSerno});
          }
          var msg = '此操作将保存数据,且保存本地记录后将前往影像平台新增影像资料，是否继续？';
          var right = '1100000';
          var date = yufp.util.dateFormat(new Date().getTime(), '{y}{m}{d}');
          yufp.extend(cmisdata, _self.$refs.annexForm.formModel);
          _self.$confirm(msg, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: rMethod,
                  url: backend.riskmService + '/api/upload/file/list/psp',
                  data: cmisdata,
                  callback: function (code, message, response) {
                    if (response.code == 0) {
                      var dat = response.rows;
                      _self.baseParamsAnnex = { flowAppNo : dat , bizSerno : dat };
                      _self.$refs.reftableAnnex.remoteData(_self.baseParamsAnnex);
                      _self.dialogVisibleAnnex = false;
                      _self.postWindow(_self.baseParamsAnnex.bizSerno,date,right);
                    } else {
                      _self.$message(response.message);
                    }
                  }
                });
              }
            }
          });
        },

        infoAnnexFn: function () {
          var _self = this;
          if (this.$refs.reftableAnnex.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _self.dialogVisibleAnnex = true;
          _self.annexFormDisabled = true;
          _self.flag = 'VIEWINFO';
          var obj = _self.$refs.reftableAnnex.selections[0];
          _self.$nextTick(function () {
            _self.$refs.annexForm.resetFn();
            yufp.extend(_self.$refs.annexForm.formModel,obj);
          });
          var right = '1100000';
          var date = obj.uploadTime.slice(0,10).replace(/\-/g,"");
          _self.$confirm('将前往影像平台查看影像资料，是否继续？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                _self.postWindow(obj.flowAppNo,date,right);
              }
            }
          });
        },

        postWindow: function(reliefAppNo,date,item){
          yufp.service.request({
            method: 'POST',
            url: backend.edocService + "/api/doEncode",
            data: {
              applySeq : reliefAppNo,
              sessionUserId: yufp.session.userId,
              sessionUserName: yufp.session.userName,
              sessionOrgCode: yufp.session.org.orgCode,
              sessionOrgName: yufp.session.org.orgName,
              startDate : date,
              rightCode : item
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
        },

        cancleAnnesFn:function () {
          var _self = this;
          _self.dialogVisibleAnnex = false;
          _self.$nextTick(function () {
            _self.$refs.annexForm.resetFn();
          });
        },
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
