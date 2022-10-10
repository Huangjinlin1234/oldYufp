/**
 * @create by fuzm on 2018-05-03
 * @description 产品表
 */
define([
  /*    './custom/widgets/js/Co/!*ntTempGSelector.js',
        './custom/widgets/js/LegalOrgSelector.js',
        './custom/widgets/js/RateSchemeSelecter.js',
        './custom/widgets/js/TelVerifGrpSelector.js',
        './custom/widgets/js/BizFlowInfoSelector.js',
        './custom/widgets/js/RuleCollSelector.js',
        './custom/widgets/js/PrdIdInfoS*!/elector.js',*/
  './custom/widgets/js/OrgSelector.js'
], function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('STD_PRD_TYPE,PRD_STATUS,PRD_SORT,STD_ZB_PAY_WAY,STD_LOAN_USE,LOAN_CATE,STD_ZX_CUR_TYPE,STD_IR_ADJ_MODE,STD_INTEREST_RATE_METHOD，STD_ZB_IR_ADJ_MODE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          dataUrl: backend.consoleService + '/api/prd/infos',
          // dataUrlDetails: backend.consoleService + '/api/prd/info/applyDetails',
          expandCollapseName: ['base', 'loan'],
          baseParams: {},
          baseParamsDetails: {
            bizFlowId: data.prdCode
          },

          queryFields: [
            {placeholder: '产品编号', field: 'prdCode', type: 'input'},
            {placeholder: '产品名称', field: 'prdName', type: 'input'},
            /*
                         * { placeholder: '产品类别', field: 'loanSort', type: 'select',
                         * dataCode: 'PRD_SORT' },
                         */
            {placeholder: '产品类型', field: 'prdSort', type: 'select', dataCode: 'STD_PRD_TYPE'},
            {placeholder: '产品状态', field: 'prdStatus', type: 'select', dataCode: 'PRD_STATUS'}
          ],
          baseTab: 'first',
          queryButtons: [{
            label: '查询',
            op: 'submit',
            type: 'primary',
            icon: 'search',
            click: function (model, valid) {
              if (valid) {
                // _self.$refs.reftable.remoteData(model);
                var tempUrl = backend.consoleService + '/api/prd/infos?1=1';
                if (model.prdId != null && model.prdId.length != 0) {
                  tempUrl += '&prdId=' + model.prdId;
                }
                if (model.prdCode != null && model.prdCode.length != 0) {
                  tempUrl += '&prdCode=' + model.prdCode;
                }
                if (model.prdName != null && model.prdName.length != 0) {
                  tempUrl += '&prdName=' + model.prdName;
                }
                if (model.loanSort != null && model.loanSort.length != 0) {
                  tempUrl += '&loanSort=' + model.loanSort;
                }
                if (model.prdStatus != null && model.prdStatus.length != 0) {
                  tempUrl += '&prdStatus=' + model.prdStatus;
                }
                _self.dataUrl = tempUrl;
                _self.$refs.reftable.remoteData(model);
              }
            }
          },
          {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'}],

          tableColumns: [
            {label: '产品ID', prop: 'prdId', sortable: true, resizable: true, hidden: true},
            {label: '产品编号', prop: 'prdCode', sortable: true, resizable: true},
            {label: '产品名称', prop: 'prdName', sortable: true, resizable: true},
            {label: '产品类别', prop: 'loanSort', sortable: true, resizable: true, dataCode: 'PRD_SORT'},
            {label: '产品类型', prop: 'prdSort', sortable: true, resizable: true, dataCode: 'STD_PRD_TYPE'},
            {label: '产品状态', prop: 'prdStatus', sortable: true, resizable: true, dataCode: 'PRD_STATUS'}
          ],

          tableColumnsDetails: [
            {label: '申请流水号', prop: 'bizSerno', sortable: true, resizable: true},
            {label: '产品号', prop: 'prdCode', sortable: true, resizable: true, hidden: true},
            {label: '产品名称', prop: 'prdName', sortable: true, resizable: true},
            {label: '产品类型', prop: 'prdThlDri', sortable: true, resizable: true, dataCode: 'STD_PRD_TYPE'},
            {label: '创建人 ', prop: 'createUser', sortable: true, resizable: true},
            {label: '创建日期 ', prop: 'createTime', sortable: true, resizable: true},
            {label: '审核状态', prop: 'aprvStatus', sortable: true, resizable: true, dataCode: 'APRV_STATUS'},
            {label: '申请类型', prop: 'reqType', sortable: true, resizable: true, dataCode: 'REQ_TYPE'},
            {label: '机构', prop: 'legalOrgCode', sortable: true, resizable: true, hidden: true},
            {label: '机构', prop: 'legalOrgCodeName', sortable: true, resizable: true}
          ],
          queryPrdFields: [
            {placeholder: '产品编号',
              field: 'prdCode',
              type: 'input',
              rules: [{required: true, message: '必填项', trigger: 'blur'}]}
          ],
          queryPrdButtons: [
            {
              label: '查询',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  yufp.service.request({
                    method: 'POST',
                    url: backend.consoleService + '/api/prd/queryNewPrdCode', // + model.newPrdCode,
                    data: {
                      prdCode: model.prdCode
                    },
                    callback: function (code, message, response) {
                      if (response.success) {
                        response.rows.lastUpdateUser = yufp.session.userId;
                        response.rows.lastUpdateTime = _self.Format(new Date(), 'yyyy-MM-dd hh:mm:ss');
                        yufp.extend(_self.$refs.baseRef.formModel, response.rows);
                      } else {
                        _self.$message({ message: response.message, type: 'warning' });
                      }
                    }
                  });
                }
              }
            }
          ],

          // 产品基本信息
          baseFields: [{
            columnCount: 2,
            fields: [
              {field: 'prdId', label: '产品ID', hidden: true},
              {field: 'prdCode',
                label: '产品编号',
                disabled: true,
                rules: [{required: true, message: '必填项', trigger: 'blur'},
                  {
                    validator: function (rule, value, callback) {
                      if (value == null || value == '') {
                        _self.$refs.baseRef.formModel.prdId = '';
                        callback();
                      } else {
                        _self.$refs.baseRef.formModel.prdId = value;
                        callback();
                      }
                    }
                  }]
              },
              { field: 'prdVersion', label: '版本号', value: '1', hidden: true},
              {field: 'prdName', label: '产品名称', disabled: true, rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              {field: 'cooprName', label: '合作方平台'},
              {field: 'effictiveDate', label: '产品生效日期', disabled: true},
              {field: 'expiryDate', label: '产品失效日期', disabled: true},
              // 产品类别，网商贷不是必输的
              {field: 'loanSort', label: '产品类别', type: 'select', dataCode: 'PRD_SORT'},
              {field: 'prdSort', label: '产品类型', type: 'select', dataCode: 'STD_PRD_TYPE', rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              // {field: 'prdStatus', label: '产品状态', type: 'select', dataCode: 'PRD_STATUS', rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              {field: 'prdStatus', label: '产品状态', type: 'select', value: '2', dataCode: 'PRD_STATUS', rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              {field: 'orgCode', label: '主管机构', type: 'custom', is: 'div-org-selector', rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              {field: 'prdDesc', label: '产品描述', rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              // 运营机构 目前只有网商贷必输。 rules: [{required: true, message: '必填项', trigger: 'blur'}]
              {field: 'operateAgency', label: '运营机构', type: 'custom', is: 'div-org-selector'},
              {field: 'operateAgencyUser', label: '运营机构办理人'},
              {field: 'createUser', label: '创建人', disabled: true, rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              {field: 'createTime', label: '创建时间', disabled: true, rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              {field: 'lastUpdateUser', label: '最后修改人', hidden: true, disabled: true},
              {field: 'lastUpdateTime', label: '最后修改时间', hidden: true, disabled: true}
            ]
          }],

          loanFields: [{
            columnCount: 2,
            fields: [
              // 贷款大类，网商贷不是必输的
              {field: 'loanCate', label: '贷款大类', type: 'select', dataCode: 'LOAN_CATE'},
              // 最大授信金额，最小授信金额，马上不是必输的
              {field: 'crdAprvMaxAmt',
                label: '最大授信金额',
                type: 'num',
                digit: 2,
                formatter: yufp.util.moneyFormatter,
                rules: [{ validator: yufp.validator.gZero, message: '必须填写数字', trigger: 'blur'}]},
              {field: 'crdAprvMinAmt',
                label: '最小授信金额',
                type: 'num',
                digit: 2,
                formatter: yufp.util.moneyFormatter,
                rules: [{ validator: yufp.validator.gZero, message: '必须填写数字', trigger: 'blur'}]},
              // 最大放款金额，最小放款金额，网商贷不是必输的
              {field: 'loanAppMaxAmt',
                label: '最大放款金额',
                type: 'num',
                digit: 2,
                formatter: yufp.util.moneyFormatter,
                rules: [{ validator: yufp.validator.gZero, message: '必须填写数字', trigger: 'blur'}]},
              {field: 'loanAppMinAmt',
                label: '最小放款金额',
                type: 'num',
                digit: 2,
                formatter: yufp.util.moneyFormatter,
                rules: [{ validator: yufp.validator.gZero, message: '必须填写数字', trigger: 'blur'}]},
              {field: 'guarWay', label: '担保方式', type: 'select', dataCode: 'STD_ZB_ASSURE_MEANS', rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              // 授信期限，授信期限单位，马上不是必输的
              {field: 'creditTerm',
                label: '授信期限',
                type: 'select',
                multiple: true,
                selected: [],
                options: [
                  {key: '2', value: '2'},
                  {key: '3', value: '3'},
                  {key: '6', value: '6'},
                  {key: '9', value: '9'},
                  {key: '12', value: '12'},
                  {key: '24', value: '24'},
                  {key: '36', value: '36'}
                ]
              },
              {field: 'creditTermUnit', label: '授信期限单位', type: 'select', dataCode: 'STD_ZB_TERM_TYPE'},
              {field: 'maxLoanTerm',
                label: '最长贷款期限',
                rules: [{required: true, message: '必填项', trigger: 'blur'},
                  {validator: yufp.validator.gZero, message: '必须填写数字', trigger: 'blur'}]},
              {field: 'minLoanTerm',
                label: '最短贷款期限',
                rules: [{required: true, message: '必填项', trigger: 'blur'},
                  {validator: yufp.validator.gZero, message: '必须填写数字', trigger: 'blur'}]},
              {field: 'lmtTermUnit', label: '贷款期限单位', type: 'select', dataCode: 'STD_ZB_TERM_TYPE', rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              {field: 'currencyOpt', label: '币种', type: 'select', dataCode: 'STD_ZX_CUR_TYPE', rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              {
                field: 'rateAdjustType',
                label: '利率调整方式',
                type: 'select',
                dataCode: 'STD_ZB_IR_ADJ_MODE',
                change: function (fields) {
                  var interestRateMethod = _self.$refs.loanRef.formModel.interestRateMethod;
                  _self.changeFields(fields, interestRateMethod);
                },
                rules: [{required: true, message: '必填项', trigger: 'blur'}]
              },
              {
                field: 'interestRateMethod',
                label: '利率取值方式',
                type: 'select',
                dataCode: 'STD_INTEREST_RATE_METHOD',
                change: function (fields) {
                  var rateAdjustType = _self.$refs.loanRef.formModel.rateAdjustType;
                  _self.changeFields(rateAdjustType, fields);
                }
                /** rules: [{required: true, message: '必填项', trigger: 'blur'}]*/
              },
              {field: 'loanIntRate', label: '贷款利率', type: 'num', formatter: yufp.util.toPercent, disabled: false, hidden: true},
              {field: 'maxLoanRate',
                label: '最大贷款利率',
                type: 'num',
                formatter: yufp.util.toPercent,
                hidden: true,
                rules: [{ validator: yufp.validator.gZero, message: '必须填写数字', trigger: 'blur'}]},
              {field: 'minLoanRate',
                label: '最小贷款利率',
                type: 'num',
                formatter: yufp.util.toPercent,
                hidden: true,
                rules: [{ validator: yufp.validator.gZero, message: '必须填写数字', trigger: 'blur'}]},
              {field: 'interestRateUpRatio', label: '利率上浮比例', type: 'num', formatter: yufp.util.toPercent, hidden: true},
              {field: 'minInterestRateUpRatio', label: '上浮比例下限', type: 'num', formatter: yufp.util.toPercent, hidden: true},
              {field: 'maxInterestRateUpRatio', label: '上浮比例上限', type: 'num', formatter: yufp.util.toPercent, hidden: true},
              {field: 'spread', label: '点差', type: 'num', formatter: yufp.util.toPercent, hidden: true},
              {field: 'spreadLowerLimit', label: '点差上浮下限', type: 'num', formatter: yufp.util.toPercent, hidden: true},
              {field: 'spreadUpperLimit', label: '点差上浮上限', type: 'num', formatter: yufp.util.toPercent, hidden: true},
              {field: 'loanUseType', label: '贷款用途', type: 'select', dataCode: 'STD_LOAN_USE', rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              {field: 'repayWay', label: '还款方式', type: 'select', dataCode: 'STD_PRD_REPAY_MODE', rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              // 支付方式，网商贷非必输
              {field: 'payWay', label: '支付方式', type: 'select', dataCode: 'STD_ZB_PAY_WAY'},
              // zxOpId，网商贷非必输
              {field: 'zxOpId', label: '征信查询操作员'},
              {field: 'acceptStatus',
                label: '进件受理时间开关',
                type: 'select',
                dataCode: 'ACCEPT_STATUS',
                value: '0',
                change: function (value) {
                  if (value == 0) {
                    _self.$refs.loanRef.formModel.acceptStartTime = '';
                    _self.$refs.loanRef.formModel.acceptEndTime = '';
                    _self.$refs.loanRef.formModel.acceptProcessMode = '';
                  }
                },
                rules: [{required: true, message: '必填项', trigger: 'blur'}]}, // 默认值是关闭
              {field: 'acceptStartTime', label: '受理开始时间', type: 'timePicker', editable: true},
              {field: 'acceptEndTime', label: '受理结束时间', trigger: 'change', editable: true, type: 'timePicker'},
              {field: 'acceptProcessMode', label: '处理方式', type: 'select', dataCode: 'ACCEPT_PROCESS_MODE'}

            ]
          }],

          closeButtons: [
            {
              label: '返回',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _self.dialogVisible = false;
              }
            }
          ],
          height: yufp.frame.size().height - 103,
          dialogVisible: false,
          formDisabled: false,
          viewType: 'EDIT',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          prdHisVis: false
        };
      },

      methods: {
        /**
                 * 获取指定时间格式的方法
                 * @param date
                 * @param fmt
                 * @returns {*}
                 * @constructor
                 */
        Format: function (date, fmt) {
          var o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds() // 秒
          };
          if (/(y+)/.test(fmt)) { // 根据y的长度来截取年
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
          }
          for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
              fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
            }
          }
          return fmt;
        },
        /**
                 * @param ctrlCode
                 *            操作码
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
          // _self.updateButtons[0].hidden = !editable;
          //					_self.updateButtons[1].hidden = !editable;
          _self.formDisabled = !editable;
          _self.dialogVisible = true;
        },
        switchParamsStatus: function () {
          if (this.viewType == 'ADD') {
            // this.$refs.baseRef.switch('prdCode', 'disabled', false);
            // this.$refs.baseRef.switch('prdName', 'disabled', false);
            this.$refs.baseRef.switch('prdCode', 'disabled', true);
            this.$refs.baseRef.switch('prdName', 'disabled', true);
            this.$refs.baseRef.switch('cooprName', 'disabled', false);
            this.$refs.baseRef.switch('loanSort', 'disabled', false);
            this.$refs.baseRef.switch('prdSort', 'disabled', false);
            this.$refs.baseRef.switch('lastUpdateUser', 'hidden', true);
            this.$refs.baseRef.switch('lastUpdateTime', 'hidden', true);
            this.$refs.loanRef.switch('currencyOpt', 'disabled', false);
            this.$refs.loanRef.switch('rateAdjustType', 'disabled', false);
          } else if (this.viewType == 'EDIT') {
            this.$refs.baseRef.switch('prdCode', 'disabled', true);
            this.$refs.baseRef.switch('prdName', 'disabled', true);
            this.$refs.baseRef.switch('cooprName', 'disabled', true);
            this.$refs.baseRef.switch('loanSort', 'disabled', true);
            this.$refs.baseRef.switch('prdSort', 'disabled', true);
            this.$refs.baseRef.switch('lastUpdateUser', 'hidden', false);
            this.$refs.baseRef.switch('lastUpdateTime', 'hidden', false);
            this.$refs.loanRef.switch('currencyOpt', 'disabled', true);
            this.$refs.loanRef.switch('rateAdjustType', 'disabled', true);
          }
          this.$refs.baseRef.rebuildFn();
          this.$refs.loanRef.rebuildFn();
        },
        addFn: function () {
          var _self = this;
          this.switchStatus('ADD', true);
          _self.$nextTick(function () {
            _self.switchParamsStatus();
            // _self.$refs.baseRef.switch('prdId', 'hidden', true);
            // _self.$refs.baseRef.switch('prdCode', 'hidden', false);
            _self.$refs.baseRef.resetFn();
            _self.$refs.loanRef.resetFn();
            this.$refs.baseRef.formModel.createUser = yufp.session.userId;
            this.$refs.baseRef.formModel.createTime = new Date().toLocaleString();
          });
        },
        infoFn: function () {
          var _self = this;
          if (_self.$refs.reftable.selections.length != 1) {
            _self.$message({message: '请先选择一条记录', type: 'warning'});
            return;
          }
          this.switchStatus('EDIT', false);

          _self.$nextTick(function () {
            _self.switchParamsStatus();
            var obj = this.$refs.reftable.selections[0];
            var creditTerm = '';
            if (obj.creditTerm != null && obj.creditTerm != '') {
              creditTerm = obj.creditTerm.split(',');// 转为数组
            } else {
              var creditTerm = [];
            }
            _self.changeFields(obj.rateAdjustType, obj.interestRateMethod);
            yufp.extend(_self.$refs.baseRef.formModel, obj);
            yufp.extend(_self.$refs.loanRef.formModel, obj, {creditTerm: creditTerm});
            var start = _self.$refs.loanRef.formModel.acceptStartTime;
            var end = _self.$refs.loanRef.formModel.acceptEndTime;
            if (start != '' && start != null && start != undefined && end != '' && end != null && end != undefined) {
              _self.$refs.loanRef.formModel.acceptStartTime = '2099-01-01 ' + start;// 适应type=timePicker yyyy-MM-dd HH:mm:ss的格式，页面才能正常显示
              _self.$refs.loanRef.formModel.acceptEndTime = '2099-01-01 ' + end;// 适应type=timePicker yyyy-MM-dd HH:mm:ss的格式，页面才能正常显示
            }
          });
        },
        modifyFn: function () {
          var _self = this;
          _self.closeButtons[0].hidden = true;
          if (_self.$refs.reftable.selections.length != 1) {
            _self.$message({message: '请先选择一条记录', type: 'warning'});
            return;
          }
          this.switchStatus('EDIT', true);
          this.$nextTick(function () {
            _self.switchParamsStatus();
            var obj = _self.$refs.reftable.selections[0];
            var creditTerm = '';
            if (obj.creditTerm != null && obj.creditTerm != '') {
              creditTerm = obj.creditTerm.split(',');// 转为数组
            } else {
              var creditTerm = [];
            }
            _self.changeFields(obj.rateAdjustType, obj.interestRateMethod);
            yufp.extend(_self.$refs.baseRef.formModel, obj);
            yufp.extend(_self.$refs.loanRef.formModel, obj, {creditTerm: creditTerm});
            var start = _self.$refs.loanRef.formModel.acceptStartTime;
            var end = _self.$refs.loanRef.formModel.acceptEndTime;
            if (start != '' && start != null && start != undefined && end != '' && end != null && end != undefined) {
              _self.$refs.loanRef.formModel.acceptStartTime = '2099-01-01 ' + start;// 适应type=timePicker yyyy-MM-dd HH:mm:ss的格式，页面才能正常显示
              _self.$refs.loanRef.formModel.acceptEndTime = '2099-01-01 ' + end;// 适应type=timePicker yyyy-MM-dd HH:mm:ss的格式，页面才能正常显示
            }
          });
        },
        submitForm: function () {
          var _self = this;
          // 获取要新增或者要修改的数据，并验证
          var base = _self.$refs.baseRef, family = _self.$refs.loanRef;
          var baseFlag = true;
          var familyFlag = true;
          base.validate(function (valid) {
            baseFlag = valid;
          });
          family.validate(function (valid) {
            familyFlag = valid;
          });
          if (!baseFlag) {
            _self.$message('基本信息有必填项没填写，请检查一下！');
            return;
          }
          if (!familyFlag) {
            _self.$message('贷款要素控制有必填项没填写，请检查一下！');
            return;
          }
          var acceptStatus = family.formModel.acceptStatus;
          var startTime = family.formModel.acceptStartTime;
          var endTime = family.formModel.acceptEndTime;
          var mode = family.formModel.acceptProcessMode;
          if (acceptStatus == '1') { // 开关打开
            if (startTime == '' || startTime == null || startTime == undefined) {
              _self.$message('打开了进件受理开关后，受理开始时间不能为空！');
              return;
            }
            if (endTime == '' || endTime == null || endTime == undefined) {
              _self.$message('打开了进件受理开关后，受理结束时间不能为空！');
              return;
            }
            if (mode == '' || mode == null || mode == undefined) {
              _self.$message('打开了进件受理开关后，处理方式不能为空！');
              return;
            }
            var startTimeTo = yufp.util.dateFormat(startTime, '{h}:{i}:{s}');
            var endTimeTo = yufp.util.dateFormat(endTime, '{h}:{i}:{s}');
            if (endTimeTo <= startTimeTo) {
              _self.$message('受理结束时间必须晚于受理开始时间！');
              return;
            }
            family.formModel.acceptStartTime = startTimeTo;
            family.formModel.acceptEndTime = endTimeTo;
          } else {
            if (startTime != '' && startTime != null && startTime != undefined) {
              _self.$message('打开了进件受理开关后，才可以设置受理开始时间！');
              return;
            }
            if (endTime != '' && endTime != null && endTime != undefined) {
              _self.$message('打开了进件受理开关后，才可以设置受理结束时间！');
              return;
            }
            if (mode != '' && mode != null && mode != undefined) {
              _self.$message('打开了进件受理开关后，才可以设置处理方式！');
              return;
            }
            family.formModel.acceptStartTime = '';
            family.formModel.acceptEndTime = '';
            family.formModel.acceptProcessMode = '';
          }
          // 将数据装入定义的容器comitData
          if (baseFlag && familyFlag) {
            var comitData = {};
            var baseInfos = _self.$refs.baseRef.formModel;
            var loanInfos = _self.$refs.loanRef.formModel;
            // 根据得到的viewType值判断是新增还是修改
            var rMethod = '';
            if (_self.viewType == 'EDIT') {
              comitData = _self.$refs.reftable.selections[0];
              rMethod = 'PUT';
              var prdDesc = base.formModel.prdDesc;
              var prdStatus = base.formModel.prdStatus;
              var operateAgencyUser = base.formModel.operateAgencyUser;
              var orgCode = base.formModel.orgCode;
              var operateAgency = base.formModel.operateAgency;
              yufp.extend(comitData, loanInfos, {prdDesc: prdDesc}, {prdStatus: prdStatus}, {operateAgencyUser: operateAgencyUser}, {orgCode: orgCode}, {operateAgency: operateAgency});// 装入
            } else if (_self.viewType == 'ADD') {
              rMethod = 'POST';
              yufp.extend(comitData, baseInfos);
              yufp.extend(comitData, loanInfos);
            }
            if (comitData.creditTerm) { // 对creditTerm的处理，由数组转化为字符串
              comitData.creditTerm = comitData.creditTerm.join(',');
            } else {
              comitData.creditTerm = [];
            }
            // 发出请求
            yufp.service.request({
              method: rMethod,
              url: backend.consoleService + '/api/prd/info',
              data: comitData,
              callback: function (code, message, response) {
                if (response.code == 0) {
                  _self.$refs.reftable.remoteData();
                  _self.$message('操作成功');
                  _self.dialogVisible = false;
                } else {
                  _self.$message(response.message);
                }
              }
            });
          }
        },
        deleteFn: function () {
          var _self = this;
          // 获取要删除的数据
          var selections = _self.$refs.reftable.selections;
          if (selections.length < 1) {
            _self.$message({message: '请先选择一条记录', type: 'warning'});
            return;
          }
          // 得到prdId作为删除的关键字
          _self.$confirm('是否删除?', '提示', {type: 'warning'}).then(function () {
            var len = selections.length, arr = [];
            for (var i = 0; i < len; i++) {
              arr.push(selections[i].prdId);
            }
            yufp.service.request({
              method: 'DELETE',
              url: backend.consoleService + '/api/prd/info',
              data: {
                prdId: arr.join(',')
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _self.$refs.reftable.remoteData();
                  _self.$message('操作成功');
                } else {
                  _self.$message('操作失败');
                }
              }
            });
          }).catch(function () {
          });
        },
        resetForm: function () {
          this.$refs.baseRef.resetFields();
          this.$refs.loanRef.resetFields();
        },
        closeForm: function () {
          var _self = this;
          _self.dialogVisible = false;
        },
        cancelPrdHis: function () {
          this.prdHisVis = false;
        },
        changeFields: function (rateAdjustType, interestRateMethod) {
          var _self = this;
          if (rateAdjustType == '1' && rateAdjustType != '') {
            if (interestRateMethod == '1') { // 固定利率
              // this.$refs.baseRef.switch('prdCode', 'rules', false);
              _self.setHiddenFalse('loanIntRate');
              _self.setHiddenTrue('minLoanRate', 'maxLoanRate', 'minInterestRateUpRatio', 'maxInterestRateUpRatio', 'interestRateUpRatio', 'spreadLowerLimit', 'spreadUpperLimit', 'spread');
            } else if (interestRateMethod == '2') {
              _self.setHiddenFalse('minLoanRate', 'maxLoanRate');
              _self.setHiddenTrue('loanIntRate', 'minInterestRateUpRatio', 'maxInterestRateUpRatio', 'interestRateUpRatio', 'spreadLowerLimit', 'spreadUpperLimit', 'spread');
            }
          } else if (rateAdjustType == '9' && rateAdjustType != '') { // 按点差上浮
            if (interestRateMethod == '1') {
              _self.setHiddenFalse('spread');
              _self.setHiddenTrue('loanIntRate', 'minLoanRate', 'maxLoanRate', 'minInterestRateUpRatio', 'maxInterestRateUpRatio', 'interestRateUpRatio', 'spreadLowerLimit', 'spreadUpperLimit');
            } else if (interestRateMethod == '2') {
              _self.setHiddenFalse('spreadLowerLimit', 'spreadUpperLimit');
              _self.setHiddenTrue('loanIntRate', 'minLoanRate', 'maxLoanRate', 'minInterestRateUpRatio', 'maxInterestRateUpRatio', 'interestRateUpRatio', 'spread');
            }
          } else if (rateAdjustType != '') { // 浮动利率（按月、按季……）
            if (interestRateMethod == '1') {
              _self.setHiddenFalse('interestRateUpRatio');
              _self.setHiddenTrue('loanIntRate', 'minLoanRate', 'maxLoanRate', 'minInterestRateUpRatio', 'maxInterestRateUpRatio', 'spreadLowerLimit', 'spreadUpperLimit', 'spread');
            } else if (interestRateMethod == '2') {
              _self.setHiddenFalse('minInterestRateUpRatio', 'maxInterestRateUpRatio');
              _self.setHiddenTrue('loanIntRate', 'minLoanRate', 'maxLoanRate', 'interestRateUpRatio', 'spreadLowerLimit', 'spreadUpperLimit', 'spread');
            }
          }
        },
        setHiddenTrue: function () {
          var _self = this;
          var arg = Array.prototype.slice.call(arguments);
          arg.forEach(function (item) {
            _self.$refs.loanRef.switch(item, 'hidden', true);
            // _self.$refs.loanRef.switch(item, 'rules', false);CusIndivPageInfo
          });
        },
        setHiddenFalse: function () {
          var _self = this;
          var arg = Array.prototype.slice.call(arguments);
          arg.forEach(function (item) {
            _self.$refs.loanRef.switch(item, 'hidden', false);
            // _self.$refs.loanRef.switch(item, 'rules', true);
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

  };
});
