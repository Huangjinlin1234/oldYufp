/**
 * grant-auth-duty-selector
 * 注：自定义组件规范：
 * 1、对外默认提供v-model配置,raw-value
 * 2、对外提供readonly、disabled、size属性
 * 3、对外接口事件：select-fn,具体参数请自定义
 * Created by helin3 on 2017/12/15.
 */
(function (vue, $, name) {
	  yufp.lookup.reg('CRUD_TYPE,NATIONALITY,PUBLISH_STATUS,COMMON_STATUS');
    vue.component(name, {
        template: '<div>\
            <el-input v-model="selectedVal" readonly :placeholder="placeholder" :disabled="disabled"\
            :size="size" :name="name" :icon="icon" :on-icon-click="onIconClickFn" @click.native="clickFn">\
            </el-input>\
            <el-dialog-x title="岗位数据列表" :visible.sync="dialogVisible" width="950px">\
              <el-form-q :field-data="queryFields" :buttons="queryButtons"></el-form-q>\
              <el-table-x ref="mytable" :data-url="dataUrl" @row-click="rowClickFn"\
               :table-columns="tableColumns" :max-height="300" request-type="POST">\
              </el-table-x>\
              <div slot="footer" class="dialog-footer">\
                <el-button type="primary" @click="confirmFn">确 定</el-button>\
                <el-button @click="dialogVisible = false">取 消</el-button>\
              </div>\
            </el-dialog-x>\
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
        	  var _self = this;
            return {
            	selections:[],
              selectedVal: '',
              dialogVisible: false,
              dataUrl: backend.consoleService +'/api/s/dutys',
              
               queryFields: [
                 { placeholder: '岗位代码', field: 'dutyCode', type: 'input'},
                 { placeholder: '岗位名称', field: 'dutyName', type: 'input'}
               ],
               queryButtons: [
                  { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                      if (valid) {
                        _self.selections=[];
                        _self.$refs.mytable.remoteData(model);
                      }
                    }},
                   {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'}
                ],
                tableColumns: [
                    { label: '岗位代码', prop: 'dutyCode', sortable: true, resizable: true  },
                    { label: '岗位名称', prop: 'dutyName', sortable: true, resizable: true  },
                    { label: '法人机构代码', prop: 'legalOrgCode', sortable: true, resizable: true, hidden:true },
                    { label: '岗位类型', prop: 'dutyType', sortable: true, resizable: true, hidden:true },
                    { label: '状态', prop: 'status', type:'select',dataCode:'COMMON_STATUS',sortable: true, resizable: true  }
             
                ]
            }
        },
        methods: {
            clickFn: function () {
                this.$emit('click-fn', this);
            },
            onIconClickFn: function (val) {
                if (this.disabled){
                    return;
                }
                this.dialogVisible = true;
            },
            rowClickFn: function (row) {
                this.selections = this.$refs.mytable.selections;
            },
            confirmFn: function () {
                if(this.selections.length<1){
                    this.$message('请先选择一条数据');
                }
                this.selectedVal = this.selections[0].dutyCode;
                this.$emit('input', this.selections[0].dutyCode);
                //这个是你自定义返回的接口事件
                this.$emit('select-fn', this.selections[0].id,this.selections[0]);
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
            value: function (val) {
                //将key转换为对应的value值
                this.selectedVal = val;
            },
            rawValue: function (val) {
                this.selectedVal = val
            }
        }

    });
})(Vue, yufp.$, 'grant-auth-duty-selector');


