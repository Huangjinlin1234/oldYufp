/**
 * @create by ligm on 2019-08-10
 * @description 额度终止申请表
 */
define(['./custom/widgets/js/PrdIdInfoSelector.js',
  './custom/widgets/js/OrgPartSelector.js'],function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      //引用的字典项  渠道使用的字典项：APPLY_CHANNEL_TYPE，证件类型：STD_ZB_CERT_TYP，审批状态：APRV_STATUS，是否循环：CYCLIC_FLG,借据状态：STD_ZB_ACC_STATUS
      yufp.lookup.reg('APPLY_CHANNEL_TYPE,STD_ZB_CERT_TYP,APRV_STATUS,CYCLIC_FLG,STD_ZB_ACC_STATUS,LIMIT_STS');
      var vm = yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            valiPagePluginData: true,
            expandCollapseName: ['1', '2', '3'],
            baseParams: {},
            baseTab: 'baseTab',
            dataUrl:backend.flowService + '/api/lmt/terminate/apps', // 额度终止信息表
            lmtDataUrl:backend.creditService + '/api/lmt/prd/conts', // 授信协议信息表
            loanDataUrl: backend.flowService + '/api/lmt/terminate/app/acc/loans', //借据信息表
            baseParams: {
            },
            lmtStsParam:{
              isLmtStatus:'03'
            },
            queryFields: [
            { placeholder: '终止流水号', field: 'terminateSerno', type: 'input' },
            { placeholder: '授信协议编号', field: 'lmtContNo', type: 'input' },
            { placeholder: '渠道号', field: 'channelNo',type:'select',dataCode: 'APPLY_CHANNEL_TYPE'},
            {
                placeholder: '产品名称',
                field: 'prdName',
                type: 'custom',
                is: 'div-prdId-info-selector',
                params: {prdType: '', type: ''},
                clickFn: function (value, model, args) {
                    _self.$refs.query.switch('prdName', 'params', {prdType: model.channelNo, type: 'name'});
                    _self.$refs.query.rebuildFn();
                }
            },
            { placeholder: '客户编号', field: 'cusId', type: 'input' },
            { placeholder: '客户名称', field: 'cusName', type: 'input' },
            { placeholder: '证件类型', field: 'certType',type:'select',dataCode: 'STD_ZB_CERT_TYP'},
            { placeholder: '证件号码', field: 'certCode', type: 'input' },
            { placeholder: '归属机构', field: 'orgCode', type: 'custom', is: 'div-part-org-selector'},
            { placeholder: '审批状态', field: 'approveStatus', type:'select',dataCode: 'APRV_STATUS'},
            { placeholder: '客户经理号', field: 'cusManager', type: 'input' }
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
            { label: '终止流水号', prop: 'terminateSerno', sortable: true, resizable: true },
            { label: '授信协议编号', prop: 'lmtContNo', sortable: true, resizable: true },
            { label: '渠道号', prop: 'channelNo', sortable: true, resizable: true ,type:'select',dataCode: 'APPLY_CHANNEL_TYPE'},
            { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
            { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
            { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
            { label: '证件类型', prop: 'certType', sortable: true, resizable: true ,type: 'select',dataCode:'STD_ZB_CERT_TYP'},
            { label: '证件号码', prop: 'certCode', sortable: true, resizable: true },
            { label: '授信额度', prop: 'lmtAmt', sortable: true, resizable: true },
            { label: '是否循环', prop: 'cyclicFlg', sortable: true, resizable: true,type: 'select',dataCode: 'CYCLIC_FLG'},
            { label: '归属机构编码', prop: 'orgCode', sortable: true, resizable: true,hidden:true },
            { label: '归属机构', prop: 'orgName', sortable: true, resizable: true },
            { label: '客户经理', prop: 'cusManagerName', sortable: true, resizable: true },
            { label: '终止申请人', prop: 'createUserName', sortable: true, resizable: true },
            { label: '申请日期', prop: 'applyDate', sortable: true, resizable: true },
            { label: '审批状态', prop: 'approveStatus', sortable: true, resizable: true ,type: 'select',dataCode: 'APRV_STATUS'},
            { label: '可用额度', prop: 'availAmt', sortable: true, resizable: true ,hidden:true },
            { label: '终止原因', prop: 'terminateReason', sortable: true, resizable: true ,hidden:true },
            { label: '备注', prop: 'remarks', sortable: true, resizable: true },
            { label: '审批人编号', prop: 'aprvUserCode', sortable: true, resizable: true,hidden:true  },
            { label: '审批人名称', prop: 'aprvUserName', sortable: true, resizable: true,hidden:true  },
            { label: '审批日期', prop: 'aprvDate', sortable: true, resizable: true,hidden:true  },
            { label: '人工处理意见', prop: 'aprvComment', sortable: true, resizable: true,hidden:true  },
            { label: '产品id', prop: 'prdId', sortable: true, resizable: true,hidden:true  },
            { label: '产品编码', prop: 'prdCode', sortable: true, resizable: true ,hidden:true },
            { label: '创建时间', prop: 'createTime', sortable: true, resizable: true,hidden:true  },
            { label: '最后修改人', prop: 'lastUpdateUserName', sortable: true, resizable: true,hidden:true  },
            { label: '最后修改时间', prop: 'lastUpdateTime', sortable: true, resizable: true,hidden:true  }
             ],
            //  查询授信协议
            lmtQueryFields: [
                  { placeholder: '授信协议编号', field: 'lmtContNo', type: 'input' },
                  { placeholder: '产品名称', field: 'prdName', type: 'input' },
                  { placeholder: '渠道号', field: 'channelNo', type: 'input',type:'select',dataCode: 'APPLY_CHANNEL_TYPE'},
                  { placeholder: '客户编号', field: 'cusId', type: 'input' },
                  { placeholder: '客户名称', field: 'cusName', type: 'input' },
                  { placeholder: '证件类型', field: 'certType', type: 'input',type:'select',dataCode: 'STD_ZB_CERT_TYP'},
                  { placeholder: '证件号码', field: 'certCode', type: 'input' },
              ],
            // 授信协议信息表
            lmtTableColumns:[
              { label: '授信协议编号', prop: 'lmtContNo', sortable: true, resizable: true },
              { label: '渠道号', prop: 'channelNo', sortable: true, resizable: true ,type:'select',dataCode: 'APPLY_CHANNEL_TYPE'},
              { label: '产品编号', prop: 'prdCode', sortable: true, resizable: true ,hidden: true},
              { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
              { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
              { label: '证件类型', prop: 'certType', sortable: true, resizable: true ,type: 'select',dataCode:'STD_ZB_CERT_TYP'},
              { label: '证件号码', prop: 'certCode', sortable: true, resizable: true },
              { label: '授信额度', prop: 'lmtAmt', sortable: true, resizable: true },
              { label: '可用额度', prop: 'availAmt', sortable: true, resizable: true },
              { label: '是否循环', prop: 'cyclicFlg', sortable: true, resizable: true,type: 'select' ,dataCode: 'CYCLIC_FLG'},
              //....授信协议表
              { label: '额度状态', prop: 'lmtStatus', sortable: true, resizable: true,type:'select',dataCode:'LIMIT_STS'},
              { label: '额度起始日', prop: 'startDate', sortable: true, resizable: true },
              { label: '额度到期日', prop: 'expireDate', sortable: true, resizable: true },

              { label: '客户经理', prop: 'cusManagerName', sortable: true, resizable: true },
              { label: '归属机构', prop: 'legalOrgName', sortable: true, resizable: true }

            ],
            //  借据明细信息
            loanInfoColumns :  [
              { label: '借据号', prop: 'billNo', sortable: true, resizable: true },
              { label: '客户姓名', prop: 'cusName', sortable: true, resizable: true },
              { label: '借据金额', prop: 'loanAmount', sortable: true, resizable: true },
              { label: '借据余额', prop: 'loanBalance', sortable: true, resizable: true },
              { label: '借据状态', prop: 'accountStatus', sortable: true, resizable: true ,type: 'select', dataCode: 'STD_ZB_ACC_STATUS'}
            ],
            //  申请信息表
            updateFields: [{
              columnCount: 3,
              fields: [
                { field: 'terminateSerno', label: '终止流水号' ,disabled: true  },
                { field: 'lmtContNo', label: '授信协议编号',disabled: true  ,rules: [{required: true, message: '授信协议编号是必填项'}]},
                { field: 'cusId', label: '客户编号',disabled: true  },

                { field: 'cusName', label: '客户名称' ,disabled: true  },
                { field: 'certType', label: '证件类型',disabled: true  ,type: 'select',dataCode: 'STD_ZB_CERT_TYP'},
                { field: 'certCode', label: '证件号码',disabled: true   },

                { field: 'lmtAmt', label: '授信额度',disabled: true } ,
                { field: 'availAmt', label: '可用额度',disabled: true  ,rules: [{required: true, message: '可用额度是必填项'}] },
                { field: 'cyclicFlg', label: '是否循环',disabled: true ,type: 'select',dataCode: 'CYCLIC_FLG' },

                { field: 'approveStatus', label: '审批状态',disabled: true ,type: 'select',dataCode: 'APRV_STATUS' },
                { field: 'channelNo', label: '渠道号',disabled: true ,type: 'select',dataCode: 'APPLY_CHANNEL_TYPE'  },
                { field: 'applyDate', label: '申请日期' ,disabled: true  },

                { field: 'aprvUserCode', label: '审批人编号',disabled: true  },
                { field: 'aprvUserName', label: '审批人名称',disabled: true   },
                { field: 'aprvDate', label: '审批日期',disabled: true   },

                { field: 'prdId', label: '产品id',disabled: true   },
                { field: 'prdCode', label: '产品编码',disabled: true   },
                { field: 'prdName', label: '产品名称',disabled: true  },

                { field: 'orgName', label: '归属机构',disabled: true   },
                { field: 'cusManagerName', label: '客户经理',disabled: true  },
                { field: 'aprvComment', label: '人工处理意见' ,disabled: true  },

                { field: 'createTime', label: '创建时间' ,disabled: true  },
                { field: 'lastUpdateUserName', label: '最后修改人',disabled: true  },
                { field: 'lastUpdateTime', label: '最后修改时间',disabled: true   },

                { field: 'remarks', label: '备注',disabled: true   },
                { field: 'createUser', label: '终止申请人' ,disabled: true,hidden:true},
                { field: 'createUserName', label: '终止申请人' ,disabled: true},

              ]
            },
              { columnCount: 1, fields: [
                  {
                    field: 'terminateReason', label: '终止原因', type: 'textarea',maxlength:100,rows:3,
                    rules: [{
                      required: true,
                      message: '终止原因是必填项'
                    }]
                  }
                ]}
                ],
            height: yufp.frame.size().height - 103,
            dialogVisible: false,
            formDisabled: false,
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

          switchParamsStatus: function () {
              var _self = this;
            if (_self.viewType != 'ADD') {
              _self.$refs.baseRef.switch('cusId','hidden', false);
              _self.$refs.baseRef.switch('cusName','hidden', false);
              _self.$refs.baseRef.switch('certType','hidden', false);
              _self.$refs.baseRef.switch('certCode','hidden', false);
              _self.$refs.baseRef.switch('lmtAmt','hidden', false);
              _self.$refs.baseRef.switch('cyclicFlg','hidden', false);
              _self.$refs.baseRef.switch('remarks','hidden', false);
              _self.$refs.baseRef.switch('aprvUserCode','hidden', false);
              _self.$refs.baseRef.switch('aprvUserName','hidden', false);
              _self.$refs.baseRef.switch('aprvDate','hidden', false);
              _self.$refs.baseRef.switch('aprvComment','hidden', false);
              _self.$refs.baseRef.switch('channelNo','hidden', false);
              _self.$refs.baseRef.switch('prdId','hidden', false);
              _self.$refs.baseRef.switch('prdCode','hidden', false);
              _self.$refs.baseRef.switch('prdName','hidden', false);
              _self.$refs.baseRef.switch('orgName','hidden', false);
              _self.$refs.baseRef.switch('cusManagerName','hidden', false);
              _self.$refs.baseRef.switch('terminateSerno','hidden', false);
              _self.$refs.baseRef.switch('approveStatus','hidden', false);
              _self.$refs.baseRef.switch('applyDate','hidden', false);
              _self.$refs.baseRef.switch('createTime','hidden', false);
              _self.$refs.baseRef.switch('lastUpdateUserName','hidden', false);
              _self.$refs.baseRef.switch('lastUpdateTime','hidden', false);
              _self.$refs.baseRef.switch('createUserName','hidden', false);
            }else{
                _self.$refs.baseRef.switch('cusId','hidden', true);
                _self.$refs.baseRef.switch('cusName','hidden', true);
                _self.$refs.baseRef.switch('certType','hidden', true);
                _self.$refs.baseRef.switch('certCode','hidden', true);
                _self.$refs.baseRef.switch('lmtAmt','hidden', true);
                _self.$refs.baseRef.switch('cyclicFlg','hidden', true);
                _self.$refs.baseRef.switch('remarks','hidden', true);
                _self.$refs.baseRef.switch('aprvUserCode','hidden', true);
                _self.$refs.baseRef.switch('aprvUserName','hidden', true);
                _self.$refs.baseRef.switch('aprvDate','hidden', true);
                _self.$refs.baseRef.switch('aprvComment','hidden', true);
                _self.$refs.baseRef.switch('channelNo','hidden', true);
                _self.$refs.baseRef.switch('prdId','hidden', true);
                _self.$refs.baseRef.switch('prdCode','hidden', true);
                _self.$refs.baseRef.switch('prdName','hidden', true);
                _self.$refs.baseRef.switch('orgName','hidden', true);
                _self.$refs.baseRef.switch('cusManagerName','hidden', true);
                _self.$refs.baseRef.switch('terminateSerno','hidden', true);
                _self.$refs.baseRef.switch('approveStatus','hidden', true);
                _self.$refs.baseRef.switch('applyDate','hidden', true);
                _self.$refs.baseRef.switch('createTime','hidden', true);
                _self.$refs.baseRef.switch('lastUpdateUserName','hidden', true);
                _self.$refs.baseRef.switch('lastUpdateTime','hidden', true);
                _self.$refs.baseRef.switch('createUserName','hidden', false);
            }
          },

          lmtTagStatus:function(){
            if(this.viewType != "ADD"){
                this.$refs.basecollapse.$children[0].$el.hidden = true;
            }else{
                this.$refs.basecollapse.$children[0].$el.hidden = false;
            }
          },

          addFn: function () {
            var _self = this;
            this.switchStatus('ADD', true);
            _self.$nextTick(function () {
                _self.lmtTagStatus();
                _self.switchParamsStatus();
                _self.clearFn();
            });
          },

          deleteFn: function () {
            var _self = this;
            var selections = _self.$refs.reftable.selections;
            if (selections.length < 1) {
              _self.$message({
                message: '请先选择一条记录',
                type: 'warning'
              });
              return;
            }
            var len = selections.length, arr = [];
            for (var i = 0; i < len; i++) {
              arr.push(selections[i].terminateSerno);
            }
            this.$confirm('是否删除额度终止申请？', '提示').then(function () {
              if (selections[0].approveStatus != '01') {
                _self.$message({
                  message: '只能删除待发起的申请信息!!',
                  type: 'warning'
                });
                return;
              }

              yufp.service.request({
                method: 'DELETE',
                url: backend.flowService + '/api/lmt/terminate/app',
                data:  {
                  terminateSerno: arr.join(',')
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
            });
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
            if ( obj.approveStatus != '01' && obj.approveStatus != '05') {
                _self.$message({message: '审批状态为“待发起”、“打回”，才可修改!', type: 'warning'});
              return ;
            }
            this.switchStatus('EDIT', true);
            this.$nextTick(function () {
                _self.lmtTagStatus();
                _self.switchParamsStatus();
              yufp.extend(this.$refs.baseRef.formModel, obj);
              var terminateReason = obj.terminateReason;
              var params = {
                terminateReason : terminateReason
              };
              var loanParam = {
                certType: obj.certType,
                certCode: obj.certCode
              };
                _self.$refs.mytable.remoteData(loanParam);
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

            this.switchStatus('DETAIL', false);
            _self.aprvVisible = true;
            _self.$nextTick(function () {
                _self.lmtTagStatus();
                _self.switchParamsStatus();
                yufp.extend(this.$refs.baseRef.formModel, obj);
                var loanParam = {
                  certType: obj.certType,
                  certCode: obj.certCode
                };
                _self.$refs.mytable.remoteData(loanParam);
              });
          },

          saveFn: function () {
            var _self = this;
            var validate = false;
            this.$refs.baseRef.validate(function (valid) {
              validate = valid;
            });
            if (!validate) {
              return;
            }
            // 校验授信额度状态是否已失效
            if(_self.viewType == 'ADD'){
                var selections = _self.$refs.lmtTable.selections;
                if (selections[0].lmtStatus == '03') {
                    _self.$message({
                        message: '授信额度状态已为“失效”，不需再额度终止！',
                        type: 'warning'
                    });
                    return;
                }
            }
            var obj = this.$refs.baseRef.formModel;
            var rMethod = '';
            if (_self.viewType == "EDIT") {
              rMethod = 'PUT';
            } else if (_self.viewType == "ADD") {
              rMethod = 'POST';
            }
            yufp.service.request({
              method: rMethod,
              url: backend.flowService + '/api/lmt/terminate/app',
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
            _self.dialogVisible = false;
            this.clearFn();
          },

          commitFn: function () {
            var _self = this;
            var validate = false;
            this.$refs.baseRef.validate(function (valid) {
              validate = valid;
            });
            if (!validate) {
              return;
            }
            var obj = this.$refs.baseRef.formModel;
            yufp.service.request({
              method: 'POST',
              url: backend.flowService + '/api/lmt/terminate/app/submit',
              data: obj,
              callback: function (code, message, response) {
                if (code == 0 && response.code == 0) {
                  vm.dialogVisible = false;
                  vm.$message({
                    message: '处理成功!',
                    type: 'success'
                  });
                  vm.$refs.reftable.remoteData();
                } else{
                  vm.$message('操作失败，'+response.message);
                  _self.$refs.reftable.remoteData();
                }
                _self.dialogVisible = false;
                this.clearFn();
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

          searchFn: function(model, valid) {
            if (valid) {
              this.$refs.lmtTable.remoteData(model);
            }
          },

          rowClickFn: function(row, event, column) {
            var model = this.$refs.baseRef.formModel;
            yufp.extend(model, row);
            model.createUser = yufp.session.userId;

            var loanParam = {
              certType: row.certType,
              certCode: row.certCode,
              prdCode: row.prdCode
            };
            this.$refs.mytable.remoteData(loanParam);
          },

          clearFn: function(){
            var _self = this;
            _self.$refs.lmtTable.data = [];
            _self.$refs.mytable.data = [];
            _self.$refs.baseRef.resetFields();
            _self.$refs.queryFm.fm.lmtContNo='';
            _self.$refs.queryFm.fm.prdName='';
            _self.$refs.queryFm.fm.channelNo='';
            _self.$refs.queryFm.fm.cusId='';
            _self.$refs.queryFm.fm.cusName='';
            _self.$refs.queryFm.fm.certType='';
            _self.$refs.queryFm.fm.certCode='';
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
