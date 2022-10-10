/**
 * @create by fuzm on 2018-06-23
 * @description 产品申请规则关联信息表
 */
define(['./custom/widgets/js/RuleCollSelector.js'], function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, exportData, cite) {
      yufp.lookup.reg('CRUD_TYPE,RULE_TYPE');
      var vm = yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            baseParams: {
            },
            /*
             * tableColumns: [ { label: '产品ID', prop: 'prdId', sortable: true,
             * resizable: true }, { label: '规则集ID', prop: 'ruleCollId',
             * sortable: true, resizable: true }, { label: '规则集合描述', prop:
             * 'ruleCollDesc', sortable: true, resizable: true }, { label:
             * '规则类型', prop: 'ruleCollType', sortable: true, resizable: true }, {
             * label: '创建日期', prop: 'createTime', sortable: true, resizable:
             * true }, { label: '创建人', prop: 'createUser', sortable: true,
             * resizable: true }, { label: '最后修改人', prop: 'lastUpdateUser',
             * sortable: true, resizable: true }, { label: '最后修改日期', prop:
             * 'lastUpdateTime', sortable: true, resizable: true } ],
             */
            height: yufp.frame.size().height - 103,
            formDisabled: false || exportData.formDisabled,
            
            mainGrid: {
                data: exportData.ruleData || [],
                deleteData: [],
                loading: false
            },
            
            ruleType: yufp.lookup.find('RULE_TYPE', false),
            
            dialogVisible: false,
            dataUrl: backend.consoleService+ "/api/s/rule/colls",
            ruleParams: {
                status: '1',
                collTypeList: ['01', '02','05','13']
            },
            myLoading: true,
            isConfirm: false,
            queryFields: [
                { placeholder: '规则集编号', field: 'ruleCollId', type: 'input' },
                { placeholder: '规则集合描述', field: 'ruleCollDesc', type: 'input' }
            ],
            queryButtons: [
              { label: '查询', op: 'submit', type: 'primary', icon: 'search', 
                click: function (model, valid) {
                  if (valid) {
                    _self.myLoading = true;
                    _self.selections = [];
                    _self.$refs.ruletable.remoteData(model);
                  }
                } 
              }
            ],
            tableColumns: [
                { label: '规则集编号', prop: 'ruleCollId', sortable: true, resizable: true, hidden: false },
                { label: '规则集合描述', prop: 'ruleCollDesc', sortable: true, resizable: true },
                { label: '规则类型', prop: 'ruleCollType', sortable: true, resizable: true, dataCode:'RULE_TYPE' },
                { label: '状态', prop: 'status', sortable: true, resizable: true, dataCode:'COMMON_STATUS' },
                { label: '创建日期', prop: 'createTime', sortable: true, resizable: true, hidden: false }
            ],

            ruleDtlDiaVis: false
          }
        },
        mounted: function() {
        	if(exportData && exportData.bizSerno) {
        		this.queryApplyRule();
        	}
        },
        methods: {
            queryApplyRule: function() {
                 var _self = this;
                 //发起请求
                 yufp.service.request({
                    method: 'POST',
                    url: backend.consoleService + '/api//prd/apply/rulesBySerno',
                    data: {
                        bizSerno: exportData != null ? exportData.bizSerno : null
                    },
                    callback: function (code, message, response) {
                		_self.mainGrid.data = response.data || [];
                        _self.mainGrid.loading = false;
                        if(_self.mainGrid.data && _self.mainGrid.data.length > 0) {
                        	//行对象添加响应式属性
                            _self.mainGrid.data = _self.mainGrid.data.map(function(v){
                                //_self.$set(v, 'edit', true);
                                _self.$set(v, 'opFlag', 'update');
                                return v;
                            });
                        }
                    }
                 });
            },
          addFn: function () {
             var _self = this;
             _self.dialogVisible = true;
          },
          deleteFn: function () {
              var _self = this;
              if(!_self.selections || _self.selections.length < 1){
                _self.$message('请先选择一条数据');
                return ;
              }
              
              var ruleCollId = _self.selections.ruleCollId;
              for(var i=0; i<_self.mainGrid.data.length; i++) {
                   var rule = _self.mainGrid.data[i];
                   if(ruleCollId == rule.ruleCollId) {
                        if(rule.opFlag == 'update') {
                            _self.$set(rule, 'opFlag', 'delete');
                            _self.mainGrid.deleteData.push(rule);
                        }
                        
                        _self.mainGrid.data.splice(i, 1);
                   }
              }
              _self.selections = [];
          },
          tableLoaded: function(){
              this.$nextTick(function() {
                  this.myLoading = false;
              });
          },
          rowClickFn: function (row) {
              this.selections = row;
          },
          lookRuleDtl: function (scope){
            var obj = scope.row;
            this.ruleDtlDiaVis = true;
            this.$nextTick(function() {
                yufp.router.to('RULE_PrdLookRuleDtl', obj, 'prdLookRuleDtl');
            });
          },
          confirmFn: function () {
              var _self = this;
              if(_self.$refs.ruletable.selections.length < 1){
                _self.$message('请先选择一条数据');
                return ;
              }
              
              //判断是否已经添加
              for(var i=0; i<_self.$refs.ruletable.selections.length; i++) {
              	  var ruleCollType = _self.$refs.ruletable.selections[i].ruleCollType;
              	  for(var j=0; j<_self.mainGrid.data.length; j++) {
              	 	   var collType = _self.mainGrid.data[j].ruleCollType;
              	 	   if(ruleCollType == collType) {
              	 	   	  _self.$message('类型:' + _self.ruleType[ruleCollType] + '已经添加！不能添加重复类型的规则，请删除后添加！');
              	 	   	  return;
              	 	   }
              	  };
              };
              
              _self.dialogVisible = false;
              _self.$refs.ruletable.selections.map(function(v){
              	  var opType = 'add';
              	  //判断新加的规则是否在删除列表中,存在则说明是重新添加不需要删除了,从删除列表中去除
              	  for(var i=0; i<_self.mainGrid.deleteData.length; i++){
              	  	  var x = _self.mainGrid.deleteData[i];
              	  	  if(x.ruleCollId == v.ruleCollId) {
                          _self.mainGrid.deleteData.splice(i, 1);
                          opType = 'update';
                          break;
                      }
              	  }
              	  
                  //_self.$set(v, 'edit', true);
                  _self.$set(v, 'opFlag', opType);
                  _self.mainGrid.data.push(v);
                  return v;
              });
          },
          ruleDtlInfoFn: function() {
              var selections = this.$refs.ruletable.selections;
              if ( selections.length != 1 ) {
                this.$message({message: '请先选中一条记录!', type: 'warning'});
              }
              var obj = selections[0];
              this.ruleDtlDiaVis = true;
              this.$nextTick(function() {
                  yufp.router.to('RULE_PrdLookRuleDtl', obj, 'prdLookRuleDtl');
              });
          },
          ruleDtlRtn: function() {
              this.ruleDtlDiaVis = false;
          }
        }
      });
      
      exportData.getRuleData = function() {
        return vm.mainGrid.data.concat(vm.mainGrid.deleteData);
      };
      
      exportData.setRuleData = function(ruleData) {
      	vm.mainGrid.data = ruleData;
      	vm.mainGrid.data.map(function(v) {
      		vm.$set(v, 'opFlag', 'add');
      		return v;
      	});
      }
    };
    // 消息处理
    exports.onmessage = function (type, message) {

    };
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    }

});
