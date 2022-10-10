/**
 * @create by xxx on 2018-xx-xx
 * @description xx
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
 yufp.lookup.reg('CRUD_TYPE,STD_ZX_YES_NO,STD_ZB_ASSURE_MEANS,STD_ZB_SEVEN_SORT,STD_ZB_CREDIT_GRADE');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
                    contUrl:backend.riskService+'/api/rsc/adjust/conts',
                   contaddUrl:backend.riskService+'/api/rsc/adjust/cont/crt',
                   baseParams: {
                     },
                       //合同页面层 ,hidden:true
              contgstableColumns:[
                  { label: '任务流水号', prop: 'taskNo', sortable: true, resizable: true,hidden:true},
                  { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
                  { label: '合同号', prop: 'contNo', sortable: true, resizable: true},
                  { label: '合同金额（元）', prop: 'contAmt', sortable: true, resizable: true },
                  { label: '产品号', prop: 'prdCode', sortable: true, resizable: true },
                  { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
                  { label: '担保方式', prop: 'assureMeansMain', sortable: true, resizable: true,dataCode:'STD_ZB_ASSURE_MEANS' },
                  { label: '客户评级', prop: 'cusCdt', sortable: true, resizable: true,dataCode: 'STD_ZB_CREDIT_GRADE' },
                  { label: '是否涉农', prop: 'isAgri', sortable: true, resizable: true,dataCode: 'STD_ZX_YES_NO'},
                  { label: '调整后风险分类', prop: 'adjustResult', sortable: true, resizable: true,dataCode: 'STD_ZB_SEVEN_SORT'  },
                  { label: '分类理由', prop: 'taskReason', sortable: true, resizable: true,width:130 }
            ],
            contupdateFields:[{
              fields: [
                    { field: 'taskAdjustDesc', label: '风险分类调整描述',type: 'textarea',size:'small',rows:5,
                     rules:[{ required: true, message: '请输入风险分类调整描述', trigger: 'blur' },
                                { max: 1000, message: '不能超过1000个字符', trigger: 'blur' }]
                       },
                        { field: 'taskNo', label: '任务流水号',type: 'input',hidden:true}
                   ]
            }],
             //新增合同页面
            contaddtableColumns:[
                  { label: '合同号', prop: 'contNo', sortable: true, resizable: true},
                  { label: '合同金额（元）', prop: 'contAmt', sortable: true, resizable: true },
                  { label: '产品号', prop: 'prdCode', sortable: true, resizable: true },
                  { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
                  { label: '担保方式', prop: 'assureMeansMain', sortable: true, resizable: true,dataCode:'STD_ZB_ASSURE_MEANS'  },
                  { label: '客户评级', prop: 'cusCdt', sortable: true, resizable: true,dataCode: 'STD_ZB_CREDIT_GRADE'  },
                  { label: '是否涉农', prop: 'isAgri', sortable: true, resizable: true,dataCode: 'STD_ZX_YES_NO' }
            ],
            contaddupdateFields: [{
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
//            contformDisabled:false,
            contadddialogVisible:false,
//            contaddformDisabled:false,
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
//                      _self.contformDisabled = !editable;
//                      _self.contaddformDisabled = !editable;
                   },
           infoFn: function (obj) {
              this.$nextTick(function () {
              var taskNo = obj.taskNo;  
               var params = {
                    taskNo: taskNo
               }
                this.$refs.conttable.remoteData(params);
                yufp.extend(this.$refs.contform.formModel, obj);
             });
            },
//          continfoFn: function (obj) {
//               var assureMeansMain = obj.assureMeansMain;  
//               var cusId = obj.cusId;  
//               var params = {
//                   taskNo: obj.taskNo
//               }
//               this.$refs.conttable.remoteData(params);//异步传输
//               yufp.extend(this.$refs.contform.formModel, obj);
//          },
          contaddReturn:function(){//返回
             this.contadddialogVisible = false;
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