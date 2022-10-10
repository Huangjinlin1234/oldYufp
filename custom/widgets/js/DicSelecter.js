/**
 * 字典选择器
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
            <el-dialog title="字典列表" :visible.sync="dialogVisible">\
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
                dataUrl: backend.consoleService + '/api/s/dics',
                tableColumns: [
                   { label: '字典码', prop: 'enname', resizable: true },
                   { label: '字典值', prop: 'cnname', sortable: true, resizable: true },
                   { label: '字典类型', prop: 'opttype', sortable: true, resizable: true },
                   { label: '字典描述', prop: 'memo', sortable: true, resizable: true },
                ],
                queryFields: [
                    { placeholder: '字典类型', field: 'opttype', type: 'input' },
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
                var _self = this;
                this.selectedVal = this.selections[0].opttype;
                var optList = [];
                yufp.service.request({
                    method: 'GET',
                    url: backend.consoleService + '/api/s/dic',
                    data: {
                        opttype:_self.selectedVal
                    },
                    callback: function (code, message, response) {
                        if (code == 0 && response.success) {
                            optList = response.data[_self.selectedVal];
                            _self.$emit('input', _self.selections[0].opttype);
                            //这个是你自定义返回的接口事件
                            _self.$emit('select-fn', _self.selections[0].opttype,optList);
                            _self.dialogVisible = false;
                        } else {
                            _self.$message('操作失败');
                        }
                    }
                });

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
})(Vue, yufp.$, 'div-dic-selector');