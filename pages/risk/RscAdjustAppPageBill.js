/**
 * @create by xxx on 2018-xx-xx
 * @description xx
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
         yufp.lookup.reg('CRUD_TYPE,STD_ZB_ASSURE_MEANS,STD_ZB_SEVEN_SORT,STD_ZB_CREDIT_GRADE');
        // 创建virtual model
        var vm = yufp.custom.vue({
            el: cite.el,
              data: function () {
          var _self = this;
          return {
          	valiPagePluginData: true,
          	billUrl:backend.riskService+'/api/rsc/adjust/bills',
            billaddUrl:backend.loanService+'/api/acc/loan/days',
             baseParams: {
            },
                 //借据页面层 
            billgstableColumns:[
                  { label: '分类号', prop: 'taskNo', sortable: true, resizable: true,hidden:true },
                  { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
                  { label: '借据号', prop: 'billNo', sortable: true, resizable: true},
                  { label: '借据起始日', prop: 'loanStartDate', sortable: true, resizable: true },
                  { label: '借据终止日', prop: 'loanEndDate', sortable: true , resizable: true },
                  { label: '贷款余额（元）', prop: 'loanBalance', sortable: true, resizable: true },
                  { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
                  { label: '担保方式', prop: 'assureMeansMain', sortable: true, resizable: true,dataCode:'STD_ZB_ASSURE_MEANS' },
                  { label: '逾期天数', prop: 'overdueDays', sortable: true, resizable: true },
                  { label: '担保状况', prop: 'guarStatus', sortable: true, resizable: true},
                  { label: '信用状况', prop: 'creditGrade', sortable: true, resizable: true,dataCode:'STD_ZB_CREDIT_GRADE' },
                  { label: '机评分类结果', prop: 'autoClaResult', sortable: true, resizable: true,dataCode:'STD_ZB_SEVEN_SORT'},
                  { label: '调整前风险分类', prop: 'preAdjustResult', sortable: true, resizable: true,dataCode:'STD_ZB_SEVEN_SORT'  },
                  { label: '调整后风险分类', prop: 'adjustResult', sortable: true, resizable: true,dataCode:'STD_ZB_SEVEN_SORT'  },
                  { label: '分类理由', prop: 'taskReason', sortable: true, resizable: true}
            ],
            billupdateFields:[{
              fields: [
                   { field: 'taskAdjustDesc', label: '风险分类调整描述',type: 'textarea',size:'small',rows:5,
                   rules:[{ required: true, message: '请输入风险分类调整描述', trigger: 'blur' },
                                { max: 1000, message: '不能超过1000个字符', trigger: 'blur' }]
                           },
                           { field: 'taskNo', label: '任务流水号',type: 'input',hidden:true}
                   ]
            }],
            //新增借据页面
            billaddtableColumns: [
                  { label: '借据号', prop: 'billNo', sortable: true, resizable: true },
                  { label: '借据起始日', prop: 'loanStartDate', sortable: true, resizable: true },
                  { label: '借据终止日', prop: 'loanEndDate', sortable: true, resizable: true },
                  { label: '贷款余额（元）', prop: 'loanBalance', sortable: true, resizable: true },
                  { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
                  { label: '担保方式', prop: 'assureMeansMain', sortable: true, resizable: true,dataCode:'STD_ZB_ASSURE_MEANS' },
                  { label: '逾期天数', prop: 'overdueDays', sortable: true, resizable: true },
                  { label: '担保状况', prop: 'guarStatus', sortable: true, resizable: true },
                  { label: '信用状况', prop: 'creditGrade', sortable: true, resizable: true,dataCode:'STD_ZB_CREDIT_GRADE' },
                  { label: '机评分类结果', prop: 'autoClaResult', sortable: true, resizable: true,dataCode:'STD_ZB_SEVEN_SORT' },
                  { label: '调整前风险分类', prop: 'preAdjustResult', sortable: true, resizable: true,dataCode:'STD_ZB_SEVEN_SORT' }
                 
            ],
             billaddupdateFields: [{
              columnCount: 2,
                    fields: [
                   { field: 'adjustResult', label: '调整后风险分类',type:'select',dataCode: 'STD_ZB_SEVEN_SORT',
                                  rules:[{ required: true, message: '请输入调整后风险分类', trigger: 'blur' }]
                          },
                   { field: 'taskReason', label: '分类理由',type: 'textarea',size:'small',rows:5,
                               rules:[{ required: true, message: '请输入分类理由', trigger: 'blur' },
                                            { max: 500, message: '不能超过500个字符', trigger: 'blur' }]
                          },
                          { field: 'taskNo', label: '任务流水号',type: 'input',hidden:true}
                   ]
            }],
             height: yufp.frame.size().height - 103,
//            billformDisabled:false,
            billadddialogVisible:false,
//            billaddformDisabled:false,
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
//            _self.billformDisabled = !editable;
//            _self.billaddformDisabled = !editable;
          },
           infoFn: function (obj) {
            this.$nextTick(function () {
            var taskNo = obj.taskNo;  
               var params = {
                    taskNo: taskNo
               }
                this.$refs.billtable.remoteData(params);
                yufp.extend(this.$refs.billform.formModel, obj);
             });
            },
//           billinfoFn: function (obj) {
//
//               var params = {
//                     taskNo: obj.taskNo
//               }
//               this.$refs.billtable.remoteData(params);//异步传输
//              yufp.extend(this.$refs.billform.formModel, obj);
//          },
            billaddReturn:function(){//关闭
             this.billadddialogVisible = false;
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