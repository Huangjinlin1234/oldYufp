/**
 * @create by ligm on 2019-09-04
 * @description 风险分类调整申请表
 */
define([
  './custom/widgets/js/OrgSelector.js'
],function (require, exports) {

  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CRUD_TYPE,STD_ZB_APPR_STATUS,STD_ZB_CERT_TYP,APRV_STATUS,S_ZB_TASK_TYPE，STD_ZB_FIVE_SORT，STD_ZB_ASSURE_MEANS,STD_ZB_ACC_STATUS,S_ZB_GENE_WAY，APPLY_CHANNEL_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          baseParams: {
            taskType:'2'
          },
          baseParams2: {},
          baseTab: 'baseTab',
          expandCollapseName: ['taskLoan','applyInfo'],
          //  风险分类调整申请表
          RscAdjustAppUrl: backend.flowService +'/api/rsc/adjust/apps',
          //  风险分类调整申请表 审批状态为通过的数据
          RscTaskLoanUrl: backend.flowService + '/api/rsc/adjust/apps/appr',

          queryFields: [
            { placeholder: '分类解除流水号', field: 'rscRmNo', type: 'input' },
            { placeholder: '分类调整流水号', field: 'rscAdjNo', type: 'input' },
            { placeholder: '借据编号', field: 'billNo', type: 'input' },
            { placeholder: '客户编号', field: 'cusId', type: 'input' },
            { placeholder: '证件类型', field: 'certType', type: 'select',dataCode: 'STD_ZB_CERT_TYP'},
            { placeholder: '证件号码', field: 'certCode', type: 'input' },
            { placeholder: '申请日期', field: 'appDate', type: 'date' ,editable:false },
            { placeholder: '审批状态', field: 'apprStatus', type: 'select',dataCode: 'APRV_STATUS'},
            { placeholder: '分类类型', field: 'taskType', type: 'select',dataCode: 'S_ZB_TASK_TYPE',hidden:true,value:'2'}

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
            { label: '分类解除流水号', prop: 'rscRmNo', sortable: true, resizable: true },
            { label: '分类调整流水号', prop: 'rscAdjNo', sortable: true, resizable: true },
            { label: '借据编号', prop: 'billNo', sortable: true, resizable: true },
            { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
            { label: '证件类型', prop: 'certType', sortable: true, resizable: true, type: 'select',dataCode: 'STD_ZB_CERT_TYP'},
            { label: '证件号码', prop: 'certCode', sortable: true, resizable: true },
            { label: '申请人', prop: 'createUser', sortable: true, resizable: true },
            { label: '申请日期', prop: 'appDate', sortable: true, resizable: true },
            { label: '申请人所属机构', prop: 'inputBrId', sortable: true, resizable: true},
            { label: '审批状态', prop: 'apprStatus', sortable: true, resizable: true,type: 'select',dataCode:'APRV_STATUS'},
            { label: '审批结束日期', prop: 'apprDate', sortable: true, resizable: true },

            { label: '客户名称', prop: 'cusName', sortable: true, resizable: true ,hidden:true},
            { label: '渠道编号', prop: 'channelNo', sortable: true, resizable: true ,hidden:true,type: 'select',dataCode:'APPLY_CHANNEL_TYPE'},
            { label: '产品名称', prop: 'prdName', sortable: true, resizable: true ,hidden:true},
            { label: '借据金额', prop: 'loanAmount', sortable: true, resizable: true ,hidden:true},
            { label: '借据余额', prop: 'loanBalance', sortable: true, resizable: true ,hidden:true},
            { label: '贷款起始日期', prop: 'loanStartDate', sortable: true, resizable: true ,hidden:true},
            { label: '贷款终止日期', prop: 'loanEndDate', sortable: true, resizable: true ,hidden:true},
            { label: '逾期天数', prop: 'overdueDate', sortable: true, resizable: true ,hidden:true},
            { label: '借据状态', prop: 'accountStatus', sortable: true, resizable: true ,hidden:true,type: 'select',dataCode:'STD_ZB_ACC_STATUS'  },
            { label: '担保方式', prop: 'assureMeansMain', sortable: true, resizable: true ,hidden:true},
            { label: '生成方式', prop: 'geneWay', sortable: true, resizable: true ,hidden:true,type: 'select',dataCode:'S_ZB_GENE_WAY'},
            { label: '审批人编号', prop: 'aprvUserCode', sortable: true, resizable: true ,hidden:true},
            { label: '人工处理意见', prop: 'aprvComment', sortable: true, resizable: true ,hidden:true},
            { label: '分类类型', prop: 'taskType', sortable: true, resizable: true ,hidden:true,type: 'select', dataCode: 'S_ZB_TASK_TYPE'},
            { label: '机评分类结果', prop: 'adjustBasic', sortable: true, resizable: true ,hidden:true},
            { label: '调整后分类结果', prop: 'adjustResult', sortable: true, resizable: true ,hidden:true},
            { label: '分类调整理由', prop: 'taskAdjustDesc', sortable: true, resizable: true,hidden:true },
            { label: '客户经理', prop: 'cusManager', sortable: true, resizable: true,hidden:true },
            { label: '主管机构', prop: 'mainBrId', sortable: true, resizable: true ,hidden:true},
            { label: '创建时间', prop: 'createTime', sortable: true, resizable: true ,hidden:true},
            { label: '最后更新人', prop: 'lastUpdateUser', sortable: true, resizable: true,hidden:true },
            { label: '最后更新时间', prop: 'lastUpdateTime', sortable: true, resizable: true,hidden:true }
          ],

          // 风险分类调整申请表查询框
          rscAdjustAppFields:[
            { placeholder: '分类调整流水号', field: 'rscAdjNo', type: 'input' },
            { placeholder: '借据编号', field: 'billNo', type: 'input' },
            { placeholder: '客户编号', field: 'cusId', type: 'input' },
            { placeholder: '客户名称', field: 'cusName', type: 'input' },
            { placeholder: '证件类型', field: 'certType', type: 'select',dataCode: 'STD_ZB_CERT_TYP',editable:false },
            { placeholder: '证件号码', field: 'certCode', type: 'input' },
            { placeholder: '机评分类结果', field: 'adjustBasic',type: 'select',dataCode:'STD_ZB_FIVE_SORT' ,editable:false },
            { placeholder: '借据余额', field: 'loanBalance', type: 'input'},
            { placeholder: '贷款起始日期', field: 'loanStartDate', type: 'date',editable:false },
            { placeholder: '贷款终止日期', field: 'loanEndDate', type: 'date',editable:false },
            { placeholder: '担保方式', field: 'assureMeansMain', type: 'select',dataCode:'STD_ZB_ASSURE_MEANS'},
            { placeholder: '客户经理', field: 'cusManager', type: 'input'},
            { placeholder: '主管机构', field: 'mainBrId', type: 'input'}

          ],
          //  风险分类调整申请表字段
          rscAdjustAppTableColumns:[
            { label: '分类调整流水号', prop: 'rscAdjNo', sortable: true, resizable: true },
            { label: '借据编号', prop: 'billNo', sortable: true, resizable: true },
            { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
            { label: '客户名称', prop: 'cusName', sortable: true, resizable: true},
            { label: '证件类型', prop: 'certType', sortable: true, resizable: true, type: 'select',dataCode: 'STD_ZB_CERT_TYP'},
            { label: '证件号码', prop: 'certCode', sortable: true, resizable: true },
            { label: '贷款起始日期', prop: 'loanStartDate', sortable: true, resizable: true },
            { label: '贷款终止日期', prop: 'loanEndDate', sortable: true, resizable: true },
            { label: '借据余额', prop: 'loanBalance', sortable: true, resizable: true },
            { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
            { label: '担保方式', prop: 'assureMeansMain', sortable: true, resizable: true, type: 'select',dataCode:'STD_ZB_ASSURE_MEANS' },
            { label: '逾期天数', prop: 'overdueDate', sortable: true, resizable: true },
            { label: '分类结果', prop: 'adjustBasic', sortable: true, resizable: true ,type: 'select',dataCode:'STD_ZB_FIVE_SORT'},
            { label: '调整前分类结果', prop: 'adjustResult', sortable: true, resizable: true,type: 'select',dataCode:'STD_ZB_FIVE_SORT'},
            { label: '客户经理', prop: 'cusManager', sortable: true, resizable: true},
            { label: '主管机构', prop: 'mainBrId', sortable: true, resizable: true},

            { label: '申请日期', prop: 'appDate', sortable: true, resizable: true ,hidden:true },
            { label: '申请人所属机构', prop: 'inputBrId', sortable: true, resizable: true ,hidden:true},
            { label: '审批状态', prop: 'apprStatus', sortable: true, resizable: true,type: 'select',dataCode:'APRV_STATUS' ,hidden:true},
            { label: '审批结束日期', prop: 'apprDate', sortable: true, resizable: true ,hidden:true },
            { label: '申请人', prop: 'createUser', sortable: true, resizable: true,hidden:true },
            { label: '分类解除流水号', prop: 'rscRmNo', sortable: true, resizable: true ,hidden:true},
            { label: '渠道编号', prop: 'channelNo', sortable: true, resizable: true ,hidden:true,type: 'select',dataCode:'APPLY_CHANNEL_TYPE'},
            { label: '借据金额', prop: 'loanAmount', sortable: true, resizable: true ,hidden:true},
            { label: '借据状态', prop: 'accountStatus', sortable: true, resizable: true ,hidden:true,type: 'select',dataCode:'STD_ZB_ACC_STATUS'  },
            { label: '生成方式', prop: 'geneWay', sortable: true, resizable: true ,hidden:true,type: 'select',dataCode:'S_ZB_GENE_WAY'},
            { label: '审批人编号', prop: 'aprvUserCode', sortable: true, resizable: true ,hidden:true},
            { label: '人工处理意见', prop: 'aprvComment', sortable: true, resizable: true ,hidden:true},
            { label: '分类类型', prop: 'taskType', sortable: true, resizable: true ,hidden:true,type: 'select', dataCode: 'S_ZB_TASK_TYPE'},
            { label: '分类调整理由', prop: 'taskAdjustDesc', sortable: true, resizable: true,hidden:true },
            { label: '创建时间', prop: 'createTime', sortable: true, resizable: true ,hidden:true},
            { label: '最后更新人', prop: 'lastUpdateUser', sortable: true, resizable: true,hidden:true },
            { label: '最后更新时间', prop: 'lastUpdateTime', sortable: true, resizable: true,hidden:true }
          ],

          //  基本申请信息表单
          updateFields: [{
            columnCount: 3,
            fields: [
              { field: 'billNo', label: '借据编号',disabled: true },
              { field: 'cusName', label: '客户名称',disabled: true },
              { field: 'adjustBasic', label: '机评分类结果',type: 'select',dataCode:'STD_ZB_FIVE_SORT',disabled: true },
              { field: 'rscRmNo', label: '分类解除流水号',disabled: true},
              { field: 'rscAdjNo', label: '分类调整流水号',disabled: true},
              { field: 'createUser', label: '申请人',disabled: true },
              { field: 'inputBrId', label: '申请人所属机构',disabled: true },

              { field: 'cusId', label: '客户编号',hidden:true,disabled: true},
              { field: 'certType', label: '证件类型',hidden:true,disabled: true,type: 'select',dataCode: 'STD_ZB_CERT_TYP'},
              { field: 'certCode', label: '证件号码',hidden:true,disabled: true},
              { field: 'channelNo', label: '渠道编号',hidden:true,disabled: true,type: 'select',dataCode:'APPLY_CHANNEL_TYPE'},
              { field: 'prdName', label: '产品名称',hidden:true,disabled: true},
              { field: 'loanAmount', label: '借据金额',hidden:true,disabled: true},
              { field: 'loanBalance', label: '借据余额',hidden:true,disabled: true},
              { field: 'loanStartDate', label: '贷款起始日期',hidden:true,disabled: true},
              { field: 'loanEndDate', label: '贷款终止日期',hidden:true,disabled: true},
              { field: 'overdueDate', label: '逾期天数',hidden:true,disabled: true},
              { field: 'accountStatus', label: '借据状态',hidden:true,disabled: true,type: 'select',dataCode:'STD_ZB_ACC_STATUS'  },
              { field: 'assureMeansMain', label: '担保方式',hidden:true,disabled: true,type: 'select',dataCode:'STD_ZB_ASSURE_MEANS'},
              { field: 'geneWay', label: '生成方式',hidden:true,type: 'select',dataCode:'S_ZB_GENE_WAY',disabled: true},
              { field: 'apprStatus', label: '审批状态',hidden:true,disabled: true,type: 'select',dataCode:'APRV_STATUS'},
              { field: 'apprDate', label: '审批日期',hidden:true,disabled: true},
              { field: 'aprvUserCode', label: '审批人编号',hidden:true,disabled: true},
              { field: 'aprvComment', label: '人工处理意见',hidden:true,disabled: true},
              { field: 'appDate', label: '申请日期',hidden:true,disabled: true},
              { field: 'taskType', label: '分类类型',hidden:true,disabled: true,type: 'select', dataCode: 'S_ZB_TASK_TYPE'},
              { field: 'cusManager', label: '客户经理',hidden:true,disabled: true},
              { field: 'mainBrId', label: '主管机构',hidden:true,disabled: true},
              { field: 'createTime', label: '创建时间',hidden:true,disabled: true},
              { field: 'lastUpdateUser', label: '最后更新人',hidden:true,disabled: true},
              { field: 'lastUpdateTime', label: '最后更新时间',hidden:true,disabled: true},
              { field: 'adjustResult', label: '调整后分类结果',type: 'select',dataCode:'STD_ZB_FIVE_SORT',hidden:true,disabled: true},
              { field: 'taskAdjustDesc', label: '解除理由',type:'textarea',rules: [{required: true, message: '解除理由是必填项'}]}
            ]
          }],
          updateButtons: [
            { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                if (valid) {
                  _self.$refs.rscAdjustAppTable.remoteData(model);
                }
              } },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],

          opButtons:[
            { label: '提交', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                model.eventId = 'mRscAdjustRemoveEnter';
                var validate = false;
                _self.$refs.applyInfoRef.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                yufp.service.request({
                  method: 'POST',
                  url: backend.flowService + '/api/rsc/adjust/rm/commit',
                  data: model,
                  callback: function (code, message, response) {
                    if (code == 0 && response.rows>0) {
                      _self.$refs.reftable.remoteData();
                      _self.$message('操作成功');
                      _self.dialogVisible = false;
                    } else {
                      _self.$message('操作失败: 该笔借据存在未处理完成的调整申请！');
                    }
                    _self.dialogVisible = false;
                    _self.clearFn();
                  }
                });
              } },
            { label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                var validate = false;
                _self.$refs.applyInfoRef.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                var rMethod = '';
                if(_self.viewType == "EDIT") {
                  rMethod = 'PUT';
                } else if(_self.viewType == "ADD") {
                  rMethod = 'POST';
                }
                yufp.service.request({
                  method: rMethod,
                  url: backend.flowService + '/api/rsc/adjust/app/rscRmNo',
                  data: model,
                  callback: function (code, message, response) {
                    if (code == 0 && response.rows>=0) {
                      _self.$refs.reftable.remoteData();
                      _self.$message('操作成功');
                    } else {
                      _self.$message('操作失败: 该笔借据存在未处理完成的调整申请！');
                    }
                    _self.dialogVisible = false;
                    _self.clearFn();
                  }
                });
              } },
            { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                _self.dialogVisible = false;
                _self.clearFn();
              } },
            { label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                _self.dialogVisible = false;
              } }
          ],
          height: yufp.frame.size().height - 103,
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          extensions: ['xls', 'xlsx'],
          fileData: {},
          headers: {},
          files: [],
          errors: [],
          importDialogVisible: false,
          tipsVisible: false,
          flag:"",
          exportFileName: "风险分类调整解除",
          loading2: false,
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
          // _self.updateButtons[0].hidden = !editable;
          _self.opButtons[0].hidden = !editable;
          _self.opButtons[1].hidden = !editable;
          _self.opButtons[2].hidden = !editable;
          _self.opButtons[3].hidden = editable;
          _self.formDisabled = !editable;
          _self.dialogVisible = true;
        },

        taskLoanStatus:function(){
          if(this.viewType != "ADD"){
            this.$refs.basecollapse.$children[0].$el.hidden = true;
          }else{
            this.$refs.basecollapse.$children[0].$el.hidden = false;
          }
        },

        switchParamsStatus: function () {
          var _self = this;
          if (_self.viewType != 'ADD') {
            _self.$refs.applyInfoRef.switch('rscAdjNo','hidden', false);
            _self.$refs.applyInfoRef.switch('rscRmNo','hidden', false);
            _self.$refs.applyInfoRef.switch('billNo','hidden', false);
            _self.$refs.applyInfoRef.switch('cusId','hidden', false);
            _self.$refs.applyInfoRef.switch('cusName','hidden', false);
            _self.$refs.applyInfoRef.switch('certType','hidden', false);
            _self.$refs.applyInfoRef.switch('certCode','hidden', false);
            _self.$refs.applyInfoRef.switch('channelNo','hidden', false);
            _self.$refs.applyInfoRef.switch('prdName','hidden', false);
            _self.$refs.applyInfoRef.switch('loanAmount','hidden', false);
            _self.$refs.applyInfoRef.switch('loanBalance','hidden', false);
            _self.$refs.applyInfoRef.switch('loanStartDate','hidden', false);
            _self.$refs.applyInfoRef.switch('loanEndDate','hidden', false);
            _self.$refs.applyInfoRef.switch('overdueDate','hidden', false);
            _self.$refs.applyInfoRef.switch('accountStatus','hidden', false);
            _self.$refs.applyInfoRef.switch('assureMeansMain','hidden', false);
            _self.$refs.applyInfoRef.switch('geneWay','hidden', false);
            _self.$refs.applyInfoRef.switch('apprStatus','hidden', false);
            _self.$refs.applyInfoRef.switch('apprDate','hidden', false);
            _self.$refs.applyInfoRef.switch('aprvUserCode','hidden', false);
            _self.$refs.applyInfoRef.switch('aprvComment','hidden', false);
            _self.$refs.applyInfoRef.switch('createUser','hidden', false);
            _self.$refs.applyInfoRef.switch('appDate','hidden', false);
            _self.$refs.applyInfoRef.switch('inputBrId','hidden', false);
            _self.$refs.applyInfoRef.switch('adjustBasic','hidden', false);
            _self.$refs.applyInfoRef.switch('adjustResult','hidden', false);
            _self.$refs.applyInfoRef.switch('taskAdjustDesc','hidden', false);
            _self.$refs.applyInfoRef.switch('cusManager','hidden', false);
            _self.$refs.applyInfoRef.switch('mainBrId','hidden', false);
            _self.$refs.applyInfoRef.switch('createTime','hidden', false);

          }else{
            _self.$refs.applyInfoRef.switch('rscAdjNo','hidden', true);
            _self.$refs.applyInfoRef.switch('cusId','hidden', true);
            _self.$refs.applyInfoRef.switch('certType','hidden', true);
            _self.$refs.applyInfoRef.switch('certCode','hidden', true);
            _self.$refs.applyInfoRef.switch('channelNo','hidden', true);
            _self.$refs.applyInfoRef.switch('prdName','hidden', true);
            _self.$refs.applyInfoRef.switch('loanAmount','hidden', true);
            _self.$refs.applyInfoRef.switch('loanBalance','hidden', true);
            _self.$refs.applyInfoRef.switch('loanStartDate','hidden', true);
            _self.$refs.applyInfoRef.switch('loanEndDate','hidden', true);
            _self.$refs.applyInfoRef.switch('overdueDate','hidden', true);
            _self.$refs.applyInfoRef.switch('accountStatus','hidden', true);
            _self.$refs.applyInfoRef.switch('assureMeansMain','hidden', true);
            _self.$refs.applyInfoRef.switch('geneWay','hidden', true);
            _self.$refs.applyInfoRef.switch('apprStatus','hidden', true);
            _self.$refs.applyInfoRef.switch('apprDate','hidden', true);
            _self.$refs.applyInfoRef.switch('aprvUserCode','hidden', true);
            _self.$refs.applyInfoRef.switch('aprvComment','hidden', true);
            _self.$refs.applyInfoRef.switch('appDate','hidden', true);
            _self.$refs.applyInfoRef.switch('cusManager','hidden', true);
            _self.$refs.applyInfoRef.switch('mainBrId','hidden', true);
            _self.$refs.applyInfoRef.switch('createTime','hidden', true);

          }
        },

        addFn: function () {
          var _self = this;
          _self.switchStatus('ADD', true);
          _self.$nextTick(function () {
            _self.$refs.applyInfoRef.resetFn();
            _self.taskLoanStatus();
            _self.switchParamsStatus();
          });
        },

        modifyFn: function () {
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          };
          var obj = this.$refs.reftable.selections[0];
          if (obj.apprStatus != '01' && obj.apprStatus != '05'){
            this.$message({ message: '审批状态为“待发起”、“退回”，才可修改', type: 'warning' });
            return;
          };
          this.switchStatus('EDIT', true);
          this.$nextTick(function () {
            yufp.extend(this.$refs.applyInfoRef.formModel, obj);
            // 调整后分类结果 = 机评分类结果
            this.$refs.applyInfoRef.formModel.adjustResult = this.$refs.applyInfoRef.formModel.adjustBasic
            this.taskLoanStatus();
            this.switchParamsStatus();
          });
        },

        infoFn: function () {
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          this.switchStatus('DETAIL', false);
          this.$nextTick(function () {
            yufp.extend(this.$refs.applyInfoRef.formModel, this.$refs.reftable.selections[0]);
            this.taskLoanStatus();
            this.switchParamsStatus();
          });
        },

        deleteFn: function () {
          var _self = this;
          var selections = _self.$refs.reftable.selections;
          if (selections.length < 1) {
            _self.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].rscRmNo);
          }
          this.$confirm('是否删除该风险分类调整申请？', '提示').then(function () {
            if (selections[0].apprStatus != '01') {
              _self.$message({
                message: '只能删除待发起的申请信息!!',
                type: 'warning'
              });
              return;
            }
            yufp.service.request({
              method: 'DELETE',
              url: backend.flowService + '/api/rsc/adjust/app/rscRmNo',
              data: {
                  rscRmNo: arr.join(','),
                  taskType: selections[0].taskType
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _self.$refs.reftable.remoteData();
                  _self.$message('操作成功');
                } else {
                  _self.$message('操作失败');
                }
              }
            })
          });
        },

        clearFn: function(){
          var _self = this;
          _self.$refs.rscAdjustAppTable.data = [];
          _self.$refs.applyInfoRef.resetFields();
          _self.$refs.queryFm.fm.rscAdjNo='';
          _self.$refs.queryFm.fm.billNo='';
          _self.$refs.queryFm.fm.cusId='';
          _self.$refs.queryFm.fm.cusName='';
          _self.$refs.queryFm.fm.certType='';
          _self.$refs.queryFm.fm.certCode='';
          _self.$refs.queryFm.fm.adjustBasic='';
          _self.$refs.queryFm.fm.loanBalance='';
          _self.$refs.queryFm.fm.loanStartDate='';
          _self.$refs.queryFm.fm.loanEndDate='';
          _self.$refs.queryFm.fm.assureMeansMain='';
          _self.$refs.queryFm.fm.cusManager='';
          _self.$refs.queryFm.fm.mainBrId='';
        },

        exportFn: function () {
          var _self = this;
          var rscRmNo=this.$refs.form.fm.rscRmNo;
          var rscAdjNo=this.$refs.form.fm.rscAdjNo;
          var billNo=this.$refs.form.fm.billNo;
          var cusId=this.$refs.form.fm.cusId;
          var certType=this.$refs.form.fm.certType;
          var certCode=this.$refs.form.fm.certCode;
          var appDate=this.$refs.form.fm.appDate;
          var apprStatus=this.$refs.form.fm.apprStatus;
          var taskType=this.$refs.form.fm.taskType;

          this.$confirm('是否导出数据?', '提示').then(function () {
            yufp.util.exportExcelByTable({
              fileName: _self.exportFileName,
              importType: 'service', // page当前页 selected 选中的数据  service 后端数据
              ref: _self.$refs.reftable,
              url: backend.flowService + '/api/rsc/adjust/apps/export',
              method:'POST',
              param:{
                rscRmNo:rscRmNo,
                rscAdjNo:rscAdjNo,
                billNo:billNo,
                cusId:cusId,
                certType:certType,
                certCode:certCode,
                appDate:appDate,
                apprStatus:apprStatus,
                taskType:'2'
              }
            });
          });
        },

        rowClickFn: function(row, event, column) {
          var model = this.$refs.applyInfoRef.formModel;
          yufp.extend(model, row);
          model.createUser = yufp.session.userId;
          // 申请日期 = 营业日期
          this.$refs.applyInfoRef.formModel.appDate = yufp.session.OPENDAY;
          // 申请人 = 当前登陆用户
          this.$refs.applyInfoRef.formModel.createUser = yufp.session.userId;

          this.$refs.applyInfoRef.formModel.taskAdjustDesc = "";
        },

        commitFn: function () {
          var _self = this;
        },
        cancleFn: function () {
          var _self = this;
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
