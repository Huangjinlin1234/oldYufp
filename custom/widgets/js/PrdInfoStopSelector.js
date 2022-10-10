/**
 * div-cont-temp-g-selector
 * 合同模版组选择器
 * 注：自定义组件规范：
 * 1、对外默认提供v-model配置,raw-value
 * 2、对外提供readonly、disabled、size属性
 * 3、对外接口事件：select-fn,具体参数请自定义
 * Created by liuxp on 2018/05/12.
 */
(function (vue, $, name) {
	yufp.lookup.reg('CRUD_TYPE,PRD_STATUS');
    vue.component(name, {
        template: '<div>\
            <el-input v-model="selectedVal" readonly :placeholder="placeholder" :disabled="disabled"\
            :size="size" :name="name" :icon="icon" :on-icon-click="onIconClickFn" @click.native="clickFn">\
            </el-input>\
            <el-dialog title="产品列表" :visible.sync="dialogVisible">\
              <el-form-q :field-data="queryFields" :buttons="queryButtons"></el-form-q>\
              <el-table-x ref="mytable" :data-url="dataUrl" @row-click="rowClickFn"\
               :table-columns="tableColumns" request-type="POST">\
              </el-table-x>\
              <div slot="footer" class="dialog-footer">\
        	<el-button type="primary" @click="confirmFn">确 定</el-button>\
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
            return {
            	  selections: [],
                selectedVal: '',
                dialogVisible: false,
                dataUrl: backend.consoleService + '/api/prd/queryPrdInfoStopSeletor',
                tableColumns: [
                   { label: '产品号', prop: 'prdCode', resizable: true },
                   { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
                   { label: '产品类型', prop: 'prdThlDri', sortable: true, resizable: true, dataCode:'PRD_THL_DRI' },
                   { label: '产品状态', prop: 'prdStatus', sortable: true, resizable: true, dataCode:'PRD_STATUS'},
                   { label: '机构', prop: 'legalOrgCode', sortable: true, resizable: true }
                ],
                queryFields: [
                	{ placeholder: '产品号', field: 'prdCode', type: 'input' },
                    { placeholder: '产品名称', field: 'prdName', type: 'input' },
                    { placeholder: '产品类型', field: 'prdThlDri', type: 'select' , dataCode:'PRD_THL_DRI' },
                    { placeholder: '产品状态', field: 'prdStatus', type: 'select' , dataCode:'PRD_STATUS',hidden:true }
                ],
                queryButtons: [
                  { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                      if (valid) {
//                    	  _self.selections = [];
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
                this.selectedVal = this.selections[0].prdCode;
                this.$emit('input', this.selections[0].prdCode);
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
})(Vue, yufp.$, 'div-prd-info-stop-selector');