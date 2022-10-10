/**
 * div-duty-user-selector
 * 根据岗位选择用户信息
 * 注：自定义组件规范：
 * 1、对外默认提供v-model配置,raw-value
 * 2、对外提供readonly、disabled、size属性
 * 3、对外接口事件：select-fn,具体参数请自定义
 * Created by helin3 on 2018/05/05.
 */
(function (vue, $, name) {
    vue.component(name, {
        template: '<div>\
                    <el-input v-model="selectedVal" readonly :placeholder="placeholder" :disabled="disabled"\
                       :size="size" :name="name" :icon="icon" :on-icon-click="onIconClickFn" @click.native="clickFn">\
                    </el-input>\
                   <el-dialog title="岗位下的用户列表" :visible.sync="dialogVisible" size="large">\
                      <el-form-q :field-data="queryFields" :buttons="queryButtons"></el-form-q>\
                      <el-row :gutter="10">\
                          <el-col :span="12">\
                              <div class="yu-toolBar">\
                                  <h2>岗位列表</h2>\
                              </div>\
                              <el-table-x ref="dutytable" :data-url="dutyDataUrl" :table-columns="dutyTableColumns"\
                                   @row-click="search" :height="height"  request-type="POST" :default-load="false"></el-table-x>\
                          </el-col>\
                          <el-col :span="12">\
                              <div class="yu-toolBar">\
                                  <h2>用户列表</h2>\
                              </div>\
                              <el-table-x ref="usertable" :data-url="userUrl" :table-columns="userTableColumns"\
                                   :height="height" :default-load="false"></el-table-x>\
                          </el-col>\
                      </el-row>\
                      <div slot="footer" class="dialog-footer">\
                        <el-button @click="dialogVisible = false">取 消</el-button>\
                        <el-button type="primary" @click="confirmFn">确 定</el-button>\
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
        	var vm = this;
            return {
            	dutyDataUrl: backend.consoleService + '/api/s/dutys/legal',
            	userDataUrl: backend.consoleService + '/api//s/user/duty/users',
            	userUrl: '',
            	selections: [],
            	 myLoading: true,
            	 queryButtons: [
                  { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                      if (valid) {
                        vm.$refs.dutytable.remoteData(model);
                      }
                    } }
                ],
            	 queryFields: [
                        {placeholder: '岗位名称', field: 'dutyName', type: 'input'}
                    ],
                height: yufp.frame.size().height - 103-92,//默认103+两行标题36*2
                dutyTableColumns: [
                    { label: '岗位码', prop: 'dutyCode',width:80 },
                    { label: '岗位名称', prop: 'dutyName', sortable: true, resizable: true}
                ],
                userTableColumns: [
                    { label: '用户码', prop: 'userCode',width:80 },
                    { label: '用户名称', prop: 'userName', sortable: true, resizable: true}
                ],
                selectedVal: '',
                dialogVisible: false
                
            };
        },
        methods: {
        	   tableLoaded: function(){
        	     this.myLoading = false;
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
                	var _self = this;
                  var dutyCode = '';
                  var dutyCodes;
                  if (this.params) {
                    dutyCodes = this.params.dutyCodes;

                  }
                  if ( dutyCodes ) {
                      var obj = {
                        dutyCodes: dutyCodes
                      };
                      this.$refs.dutytable.remoteData(obj);
                  }else {
                      
                      yufp.service.request({
                          method: 'GET',
                          url:backend.consoleService+ '/api/s/duty/' + dutyCode,
                          callback: function (code, message, response) {
                            if (code == 0) {
                            	if ( response && response.data)
                                _self.$refs.dutytable.data = [response.data];
                            }
                          }
                        });
                  
                  }
                });
                 
            },
            rowClickFn: function (row) {
                this.selections = this.$refs.mytable.selections;
            },
            confirmFn: function () {
            	var selections = this.$refs.usertable.selections;
                if(selections.length<1){
                    this.$message('请先选择一条数据');
                    return ;
                }
                this.selectedVal = selections[0].userName;
                this.$emit('input', selections[0].userCode);
                //这个是你自定义返回的接口事件
                this.$emit('select-fn', selections[0].userCode, selections[0]);
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
            search: function (  row, event, column) {
               this.userUrl= this.userDataUrl + '?legalOrgCode=&dutyCode=' + row.dutyCode;
            }

        },
        mounted: function () {
            this.selectedVal = this.rawValue ? this.rawValue: this.value;
           
        },
        watch: {
            value: function (val) {
                this.selectedVal = this.selectedVal ? this.selectedVal : val;
            },
            rawValue: function (val) {
                this.selectedVal = val;
            }
        }

    });
})(Vue, yufp.$, 'div-duty-user-selector');


