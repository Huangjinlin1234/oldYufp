/**
 * div-cont-temp-info-selector
 * 合同模版选择器
 * 注：自定义组件规范：
 * 1、对外默认提供v-model配置,raw-value
 * 2、对外提供readonly、disabled、size属性
 * 3、对外接口事件：select-fn,具体参数请自定义
 * Created by xxx on 2018/05/07.
 */
(function (vue, $, name) {
    vue.component(name, {
        template: '<div>\
            <el-input v-model="selectedVal" readonly :placeholder="placeholder" :disabled="disabled"\
            :size="size" :name="name" :icon="icon" :on-icon-click="onIconClickFn" @click.native="clickFn">\
            </el-input>\
            <el-dialog title="合同模版列表" :visible.sync="dialogVisible">\
              <el-form-q :field-data="queryFields" :buttons="queryButtons"></el-form-q>\
              <el-table-x ref="mytable" :data-url="dataUrl" @row-click="rowClickFn"\
               :table-columns="tableColumns" request-type="POST">\
              </el-table-x>\
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
        	   var _self = this;
            return {
            	  selections: [],
                selectedVal: '',
                dialogVisible: false,
                dataUrl: backend.consoleService + '/api/cont/temp/info/allEnables',
                tableColumns: [
                  { label: '合同模板ID', prop: 'contTempId',  resizable: true },
                  { label: '合同模板名称', prop: 'contTempName', sortable: true, resizable: true },
                  { label: '模板种类', prop: 'contTempType', resizable: true, dataCode: 'CONT_TEMP_TYPE'  },
                  { label: '合同类型', prop: 'contType', resizable: true, dataCode: 'CONT_TYPE' },
                  { label: '是否最高额合同', prop: 'maxLmtContFlag', resizable: true, dataCode: 'COMMON_YES_NO' },
                  { label: '状态', prop: 'status', resizable: true, dataCode: 'COMMON_STATUS' },
                  { label: '合同模板存储路径', prop: 'contTempPath', resizable: true }
                ],
                queryFields: [
                    { placeholder: '合同模板ID', field: 'contTempId', type: 'input' },
                    { placeholder: '合同模板名称', field: 'contTempName', type: 'input' },
                    { placeholder: '模板种类', field: 'contTempType', type: 'select', dataCode: 'CONT_TEMP_TYPE' },
                    { placeholder: '合同类型', field: 'contType', type: 'select', dataCode: 'CONT_TYPE' }
                ],
                queryButtons: [
                  { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                      if (valid) {
                      	_self.selections = [];
                        _self.$refs.mytable.remoteData(model);
                      }
                    } }
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
                    return ;
                }
                this.selectedVal = this.selections[0].contTempName;
                this.$emit('input', this.selections[0].contTempId);
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
            	if (val == "")
            	 this.selectedVal = "";
            	else
                this.selectedVal = this.selectedVal ? this.selectedVal : val;
            },
            rawValue: function (val) {
                this.selectedVal = val
            }
        }

    });
})(Vue, yufp.$, 'div-cont-temp-info-selector');