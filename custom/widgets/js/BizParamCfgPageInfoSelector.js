/**
 * biz-param-cfg-selector
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
            <el-dialog title="禁入行业" :visible.sync="dialogVisible" >\
                  <div v-loading="treeLoading"  element-loading-text="拼命加载中">\
                      <el-input\
                        placeholder="输入关键字进行过滤"\
                        v-model="filterText">\
                      </el-input>\
                     <el-tree-x ref="cfgTree"   :show-checkbox="true" \
                            :data-url="treeDataUrl" data-id="enname" data-label="cnname"  :root-visible="true"\
                           @load-all-data="loadTreeData" data-pid="abvenName" data-root="all" style="margin:10px 10px 0 0;"\
                          :filter-node-method="filterNode">\
                    </el-tree-x>\
                    <div slot="footer" class="dialog-footer" style="text-align: center;">\
                      <el-button type="primary" @click="confirmFn" v-if="!disabled">确 定</el-button>\
                      <el-button @click="dialogVisible = false">取 消</el-button>\
                    </div>\
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
                default: false
            },
            placeholder: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: 'search'
            },
            params: Object
        },

        data: function () {
            return {
            	  filterText:'',
                selectedVal: '',
                dialogVisible: false,
                treeDataUrl:backend.consoleService+'/api/s/dic/trees',
                treeLoading: true
            }
        },
        
        
        methods: {
        	 filterNode: function (value, data) {
              if (!value) return true;
              return data.cnname.indexOf(value) !== -1;
            },
        	  loadTreeData: function (data, res) {
        	  	//页面渲染完才执行的代码
        	  	 this.$nextTick(function(){
        	  	      this.treeLoading = false;
        	     });
        	  },
            clickFn: function () {
            	//主页与附页传值
                this.$emit('click-fn', this);
            },
            onIconClickFn: function (val) {
                this.dialogVisible = true;
                var _self = this;
                //设置默认勾选数据
         
                this.$nextTick(function(){
                	var valueId = this.params.bizPparams.forbidIndus;
                	var ennames=[];
                	yufp.service.request({
                  method: "POST",
                  url:backend.consoleService+ '/api/s/dic/value/bid',
                  data: {
                    valueId: valueId
                  },
                  callback: function (code, message, response) {
                    if (code == 0 && response.data != null) {
                      var mytreeSelectors = response.data;
                      for(var i=0;i<mytreeSelectors.length;i++){
                         ennames.push(mytreeSelectors[i].enname);
                      }
                      _self.$refs.cfgTree.setCheckedKeys(ennames);
                    }
                  }
                });
                
                });
            },
            
            rowClickFn: function (row) {
                this.selections = this.$refs.myCascader.selections;
            },
            confirmFn: function () {
              var _self = this;
              this.selections = this.$refs.cfgTree.getCheckedNodes();
                var obj = this.selections;
                if(this.selections.length<1){
                    this.$message('请先选择一条数据');
                }
                
                var flag = true;
                if ( flag ) {
                	this.$emit('input', obj);
                	this.dialogVisible = false;
                	return ;
                }
            /*    var bizForBidName=[];
                for (var i = 0; i < obj.length; i++) {
                      bizForBidName.push(obj[i].enname);
                       bizForBidName.push(obj[i].cnname);
                };
                
                bizForBidName.push(this.value);
                 yufp.service.request({
                  method: "POST",
                  url: backend.consoleService + '/api/s/dic/bid/tree',
                  data: {
                    bizForBidName: bizForBidName.join(',')
                  },
                  callback: function (code, message, response) {               
                    if (code == 0) {
                      if(response && response.data==-3){
                          _self.$message({message:response.message,type:'warning'});
                          _self.$emit('select-fn', true);
                          _self.dialogVisible = false;
                      }else if(response && response.data==-2){
                      	 _self.$message({message:response.message,type:'warning'});
                      	 _self.$emit('select-fn', true);
                         _self.dialogVisible = false;
                      } else{
                        _self.$message('操作成功');
                        _self.$emit('select-fn', true);
                        _self.dialogVisible = false;
                        }
                    } else {
                        _self.$message('操作失败');
                    }
                  }
                });*/

                //这个是你自定义返回的接口事件
                
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
          
        watch: {
        	filterText:function(val) {
            this.$refs.cfgTree.filter(val);
          },
           value: function (val) {
                //将key转换为对应的value值
                this.selectedVal = '查看禁入行业详情';
            },
           
           rawValue: function (val) {
                this.selectedVal = '查看禁入行业详情';
            }
        },
        mounted: function () {
            this.selectedVal = '查看禁入行业详情';
        }
    });
})(Vue, yufp.$, 'biz-param-cfg-selector');


