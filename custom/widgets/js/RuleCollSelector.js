/**
 * div-rule-coll-selector
 * 规则集选择器
 * 注：自定义组件规范：
 * 1、对外默认提供v-model配置,raw-value
 * 2、对外提供readonly、disabled、size属性
 * 3、对外接口事件：select-fn,具体参数请自定义
 */
(function (vue, $, name) {
	  yufp.lookup.reg('RULE_TYPE,COMMON_STATUS,RULE_PARAM_VAL_STATUS');
    vue.component(name, {
        template: '<div>\
            <el-input v-model="selectedVal" readonly :placeholder="placeholder" :disabled="disabled"\
            :size="size" :name="name" :icon="icon" :on-icon-click="onIconClickFn" @click.native="clickFn">\
            <el-button slot="prepend" icon="yx-list2" @click="detailClick"></el-button>\
            </el-input>\
            <el-dialog title="额度测算模型列表" :visible.sync="dialogVisible" size="large">\
               <el-form-q :field-data="queryFields" :buttons="queryButtons"></el-form-q>\
              <el-table-x ref="mytable" :data-url="dataUrl" :radiobox="true" @row-click="rowClickFn" :base-params="params"\
               :table-columns="tableColumns" v-loading="myLoading" @loaded="tableLoaded" @custom-row-click="lookDetail" request-type="POST">\
              </el-table-x>\
              <div slot="footer" class="dialog-footer">\
                <el-button @click="dialogVisible = false">取 消</el-button>\
                <el-button type="primary" @click="confirmFn">确 定</el-button>\
              </div>\
            </el-dialog>\
            <el-dialog title="详情" :visible.sync="detailVisable" size="full"> <div id="ruleCollDialogDetail"></div>\
               <div slot="footer" class="dialog-footer"> <el-button @click="detailVisable = false">关闭</el-button> </div>\
            </el-dialog>\
          </div>',

        props: {
            // 下述字段为el-input组件中部分属性，配置文档参见element-ui
            name: {
                type: String
            },
            value: {
                required: true
            },
            rawValue: String,
            size: String,
            disabled: {
                type: Boolean,
                'default': false
            },
            placeholder: {
                type: String,
                'default': ''
            },
            icon: {
                type: String,
                'default': 'search'
            },
            params: Object
        },

        data: function () {
        	  var vm = this;
            return {
            	
            	selections: [],
            	 myLoading: true,
            	 isConfirm: false,
            	 queryFields: [
                  { placeholder: '规则集编号', field: 'ruleCollId', type: 'input' },
                  { placeholder: '规则集合描述', field: 'ruleCollDesc', type: 'input' }
                ],
                queryButtons: [
                  { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                      if (valid) {
                      	vm.myLoading = true;
                      	vm.selections = [];
                        vm.$refs.mytable.remoteData(model);
                      }
                    } }
                ],
                selectedVal: '',
                dialogVisible: false,
                dataUrl: backend.consoleService+ "/api/s/rule/colls",
                tableColumns: [
                    { label: '规则集编号', prop: 'ruleCollId', sortable: true, resizable: true, hidden: false },
                    { label: '规则集合描述', prop: 'ruleCollDesc', sortable: true, resizable: true },
                    { label: '规则类型', prop: 'ruleCollType', sortable: true, resizable: true, dataCode:'RULE_TYPE' },
                    { label: '状态', prop: 'status', sortable: true, resizable: true, dataCode:'COMMON_STATUS' },
                    { label: '创建日期', prop: 'createTime', sortable: true, resizable: true, hidden: false },
                    { label: '操作', prop: '', template: function() {
                        return '<template scope="scope">\
                          <el-button icon= "document" @click="_$event(\'custom-row-click\',scope)" >查看</el-button>\
                          </template>';
                    }}
                ],
                rootId : 'ruleCollDialogDetail',
                detailVisable: false
            }
        },
        methods: {
        	   tableLoaded: function(){
                this.$nextTick(function() {
                    this.myLoading = false;
                });
        	   },
            clickFn: function () {
                this.$emit('click-fn', this);
            },
            onIconClickFn: function (val) {
                if (this.disabled){
                    return;
                }
                this.dialogVisible = true;
                this.$nextTick(function () {
                  this.myLoading = true;
                  this.selections = [];
                  this.$refs.mytable.remoteData();
                });
            },
            rowClickFn: function (row) {
                this.selections = this.$refs.mytable.selections;
            },
            confirmFn: function () {
                if(this.selections.length<1){
                    this.$message('请先选择一条数据');
                    return ;
                }
//                this.isConfirm = true; //是组件内修改
                this.selectedVal = this.selections[0].ruleCollDesc;
                this.$emit('input', this.selections[0].ruleCollId);
                //这个是你自定义返回的接口事件
                this.$emit('select-fn', this.selections[0].ruleCollId,this.selections[0]);
                this.dialogVisible = false;
            },
            // 对外提供选择器显示值
            getRawValue: function () {
                return this.selectedVal;
            },
            convertKey: function (val) {
                //将key转换为对应的value值
                return val;
            },
            detailClick: function(){
            	if ( this.value == '') {
            	   this.$message({message: '请先选择一条记录,再查看详情!', type: 'warning' });
            	   return ;
            	}
            	this.detailVisable = true;
            	this.$nextTick(function(){
            	   var obj = {
            	     ruleCollId: this.value
            	   };
            	   yufp.router.to('RULE_PrdLookRuleDtl', obj,  this.rootId);
            	});
            
            },
            lookDetail: function (scope) {
            	this.detailVisable = true;
              this.$nextTick(function(){
                 var obj = scope.row;
                 yufp.router.to('RULE_PrdLookRuleDtl', obj,  this.rootId);
              });
            }
        },
        mounted: function () {
             this.selectedVal = this.rawValue ? this.rawValue: this.value;
        },
        watch: {
            value: function (val) {
            	//将key转换为对应的value值
            	if ( this.selectedVal == '' && val && val != '' ) {
            		    var self =this;
            		    self.selectedVal = val;
            		    yufp.service.request({
                        method: 'POST',
                        url: backend.consoleService + '/api/s/rule/coll/' + val,
                        callback: function (code, message, response) {
                          if ( response &&  response.success == true) {
                            self.selectedVal = response.data.ruleCollDesc; 
                          }else
                            self.selectedVal = val;
                        }
                      });
            	}
            },
            rawValue: function (val) {
                this.selectedVal = val;
            }
        }

    });
})(Vue, yufp.$, 'div-rule-coll-selector');


