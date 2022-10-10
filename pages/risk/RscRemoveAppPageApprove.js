/**
 * @create by chenqm1 on 2018-05-07
 * @description 风险分类调整申请表
 */
define([
    './custom/widgets/js/YufpCusSelector.js'
    ],function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
    	yufp.lookup.reg('CRUD_TYPE,STD_ZB_APPR_STATUS,STD_ZB_SEVEN_SORT,STD_ZB_ASSURE_MEANS');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
          	valiPagePluginData: true,
          	removebillUrl:backend.riskService+'/api/rsc/remove/bills',
          	billUrl:backend.riskService+'/api/rsc/adjust/bills/remove',
            baseParams: {
            },
            removebillColumns: [
            { label: '借据号', prop: 'billNo', sortable: true, resizable: true },
            { label: '客户号', prop: 'cusId', sortable: true, resizable: true },
            { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
            { label: '产品号', prop: 'prdCode', sortable: true, resizable: true },
            { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
            { label: '机构', prop: 'mainBrId', sortable: true, resizable: true },
            { label: '解除前风险分类', prop: 'preReleResult', sortable: true, resizable: true ,dataCode:'STD_ZB_SEVEN_SORT' },
//            { label: '解除后风险分类', prop: 'releResult', sortable: true, resizable: true ,dataCode:'STD_ZB_SEVEN_SORT' },
            { label: '解除原因', prop: 'taskAdjustDesc', sortable: true, resizable: true,hidden:true},
            { label: '任务流水号', prop: 'taskNo', sortable: true, resizable: true,hidden:true }
            ],
              billColumns: [
            { label: '合同号', prop: 'contNo', sortable: true, resizable: true },
            { label: '借据号', prop: 'billNo', sortable: true, resizable: true },
            { label: '客户号', prop: 'cusId', sortable: true, resizable: true },
            { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
            { label: '担保方式', prop: 'assureMeansMain', sortable: true, resizable: true,dataCode:'STD_ZB_ASSURE_MEANS' },
            { label: '贷款余额（元）', prop: 'loanBalance', sortable: true, resizable: true },
            { label: '产品号', prop: 'prdCode', sortable: true, resizable: true },
            { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
            { label: '贷款起始日', prop: 'loanStartDate', sortable: true, resizable: true },
            { label: '贷款终止日', prop: 'loanEndDate', sortable: true, resizable: true },
            { label: '本金逾期天数', prop: 'capOverdueDays', sortable: true, resizable: true },
            { label: '利息逾期天数', prop: 'intOverdueDays', sortable: true, resizable: true },
            { label: '分类日期', prop: 'claDate', sortable: true, resizable: true },
            { label: '机评分类结果', prop: 'autoClaResult', sortable: true, resizable: true ,dataCode:'STD_ZB_SEVEN_SORT' }
            ], 
             updateFields: [{
            columnCount: 1,
              fields: [
                  { field: 'taskAdjustDesc', label: '解除原因',type:'textarea'},
                   { field: 'taskNo', label: '任务流水号',type:'input',hidden:true}
                    ]
                    }],
            taskNoFields: [{
              fields: [
                   { field: 'taskNo', label: '任务流水号',type:'input',hidden:true},
                   { field: 'taskType', label: '任务类型',type:'input',hidden:true}
                    ]
                    }],
            updateButtons: [
              { label: '关闭', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.dialogVisible = false;
                } }
            ],
            height: yufp.frame.size().height - 103,
            billVisible:false,
            formDisabled: false,
            flag:false,
            addflag:false,
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
          infoFn: function (obj) {
            this.switchStatus('DETAIL', false);
            this.$nextTick(function () {
            var taskNo = obj.taskNo;  
               var params = {
                    taskNo: taskNo
               }
               this.$refs.removebilltable.remoteData(params);
                yufp.extend(this.$refs.taskNoform.formModel, obj);
            });
          },
          /*infoBill: function () {
            if (this.$refs.removebilltable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.billVisible = true;
            this.switchStatus('DETAIL', false);
            this.$nextTick(function () {
            var obj = this.$refs.removebilltable.selections[0];
              var params = {
                    billNo: obj.billNo,
                    assureMeansMain: obj.assureMeansMain,
                    cusId: obj.cusId
               }
               this.$refs.billtable.remoteData(params);
                yufp.extend(this.$refs.form.formModel, obj);
            });
          },*/
         
          buttonReturn: function(){
            var _self = this;
            _self.billVisible = false;
          }
        },
         mounted: function(){
                var param = data.datas[data.dataKey];
                var url = backend.riskService + '/api/rsc/adjust/app/' + param.taskNo;
                data.children = this;
                this.valiPagePluginData = true;
                var _self = this;
                this.$nextTick(function() {
                        yufp.service.request({
                                    method: 'POST',
                                    url: url,
                                        callback: function (code, message, response) {
                                          if (code == 0) {
                                                 var responseCode = response.code;
                                                 if(responseCode == 0){
                                                         var data = response.data;
                                                         _self.infoFn(data);
                                                 }else{
                                                         _self.$message(response.message);
                                                 }
                                          } else 
                                                _self.$message('操作失败');
                                          }
                        });
                        
                });
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
