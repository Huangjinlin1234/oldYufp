/**
 * org-tree-selector
 * 机构选择树
 * 注：自定义组件规范：
 * 1、对外默认提供v-model配置,raw-value
 * 2、对外提供readonly、disabled、size属性
 * 3、对外接口事件：select-fn,具体参数请自定义
 * Created by helin3 on 2017/12/15.
 */
(function (vue, $, name) {

    vue.component(name, {
        template: '<div>\
            <el-input v-model="selectedVal" readonly :placeholder="placeholder" :disabled="disabled"\
            :size="size" :name="name" :icon="icon" :on-icon-click="onIconClickFn" @click.native="clickFn">\
            </el-input>\
            <el-dialog title="选择机构" :visible.sync="dialogVisible" top="5%">\
                      <el-input\
                        placeholder="输入关键字进行过滤"\
                        v-model="filterText">\
                      </el-input>\
                     <el-tree-x ref="orgTree"   :show-checkbox="true" request-type="POST" \
                            :data-url="treeDataUrl" data-id="orgCode" data-label="orgName"  :root-visible="true"\
                           @load-all-data="loadTreeData" data-pid="orgParentCode" :data-root="myOrgCode" style="margin:10px 10px 0 0;"\
                          :filter-node-method="filterNode">\
                    </el-tree-x>\
                    <div slot="footer" class="dialog-footer" style="text-align: center;">\
                      <el-button type="primary" @click="confirmFn" v-if="!disabled">确 定</el-button>\
                      <el-button @click="dialogVisible = false">取 消</el-button>\
                    </div>\
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
        	     var _self = this;
        	     var myOrgCode='';
        	      yufp.service.request({
                  method: 'POST',
                  url:backend.consoleService+ '/api/s/org/trees',
                  data: {
                  },
                  callback: function (code, message, response) {
                    if (code == 0) {
                     if(response && yufp.isArray(response.data) && response.data.length > 0){
                      	var obj = response.data[0].orgCode;
                        _self.myOrgCode = obj;
                      }
                    }
                  }
                });
            return {
            	  myOrgCode:_self.myOrgCode,
                filterText:'',
                selectedVal: '',
                dialogVisible: false,
                treeDataUrl:backend.consoleService+'/api/s/org/trees'
            }
        },
        
        
        methods: {
          filterNode: function (value, data) {
//          	var orgName = data[0].orgName;
              if (!value) return true;
              return data.orgName.indexOf(value) !== -1;
            },
            loadTreeData: function (data, res) {
           //this.treeLoading = false;
            },
            clickFn: function () {
              //主页与附页传值
                this.$emit('click-fn', this);
            },
            onIconClickFn: function (val) {
                if (this.disabled){
                    return;
                }
                this.dialogVisible = true;
            },
            
            rowClickFn: function (row) {
                this.selections = this.$refs.myCascader.selections;
            },
            confirmFn: function () {
              var _self = this;
              var selections = _self.$refs.orgTree.getCheckedNodes();
                var obj = this.selections;
                if(_self.$refs.orgTree.getCheckedNodes().length<1){
                    this.$message('请先选择一条数据');
                }
                var len = selections.length
                var arr = [];
                var rogCodes = '';
                for (var i = 0; i < len; i++) {
                  if(i<len-1){
                  rogCodes += selections[i].orgCode+',';
                  }else{
                  rogCodes += selections[i].orgCode;
                  }
                };
                this.selectedVal =  rogCodes;
                this.$emit('input', rogCodes);               
                //这个是你自定义返回的接口事件
                  this.$emit('select-fn', rogCodes, selections);
                  this.dialogVisible = false;
            },
            // 对外提供选择器显示值
            getRawValue: function () {
                return this.selectedVal;
            },
            convertKey: function (val) {
                //将key转换为对应的value值
                return val;
            }
        
        },
        mounted: function () {
              this.selectedVal = this.rawValue ? this.rawValue: this.value;
         },
          watch: {
          filterText:function(val) {
            this.$refs.orgTree.filter(val);
          },
            value: function (val) {
                // 展示的key和value 都是一致的，所以
                this.selectedVal = val;
            },
            rawValue: function (val) {
                this.selectedVal = val;
            }   
        }
     });
})(Vue, yufp.$, 'org-tree-selector');