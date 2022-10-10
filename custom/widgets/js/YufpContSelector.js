/**
 * yufp-demo-selector
 * 注：自定义组件规范：
 * 1、对外默认提供v-model配置,raw-value
 * 2、对外提供readonly、disabled、size属性
 * 3、对外接口事件：select-fn,具体参数请自定义
 * Created by helin3 on 2017/12/15.
 */
(function (vue, $, name) {
	 yufp.lookup.reg('STD_ZB_CONT_STATUS,STD_ZX_YES_NO,STD_ZB_ASSURE_MEANS');
    vue.component(name, {
        template: '<div>\
            <el-input v-model="selectedVal" readonly :placeholder="placeholder" :disabled="disabled"\
            :size="size" :name="name" :icon="icon" :on-icon-click="onIconClickFn" @click.native="clickFn">\
            </el-input>\
            <el-dialog title="合同列表" :visible.sync="dialogVisible" size="full">\
              <el-form-q title="查询条件"  :field-data="queryFields" :buttons="queryButtons" ></el-form-q>\
              <el-table-x ref="mytable" :data-url="dataUrl"  @row-click="rowClickFn"\
               :table-columns="tableColumns" :max-height="600" :request-type="method">\
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
                selectedVal: '',
                dialogVisible: false,
                method:'POST',
                dataUrl:backend.pspService+'/api/psp/check/task/conts',
                tableColumns: [
                            { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
                            { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
                            { label: '证件号', prop: 'certCode', sortable: true, resizable: true },
                            { label: '合同编号', prop: 'contNo', sortable: true, resizable: true },
                            { label: '合同金额', prop: 'contAmt', sortable: true, resizable: true },
                            { label: '合同类型', prop: 'contType', sortable: true, resizable: true,dataCode:'STD_ZX_YES_NO'},
                            { label: '产品号', prop: 'prdId', sortable: true, resizable: true },
                            { label: '产品代码', prop: 'prdCode', sortable: true, resizable: true },
                            { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
                            { label: '合同可用金额', prop: 'availAmt', sortable: true, resizable: true },
                            { label: '借据起始日', prop: 'loanStartDate', sortable: true, resizable: true },
                            { label: '借据到期日', prop: 'loanEndDate', sortable: true, resizable: true },
                            { label: '担保方式', prop: 'assureMeansMain', sortable: true, resizable: true,dataCode:'STD_ZB_ASSURE_MEANS'  },
                            { label: '合同状态', prop: 'contState', sortable: true, resizable: true,dataCode: 'STD_ZB_CONT_STATUS' },
                            { label: '客户经理', prop: 'cusManager', sortable: true, resizable: true },
                            { label: '法人机构代码', prop: 'legalOrgCode', sortable: true, resizable: true },
                            { label: '法人机构名称', prop: 'legalOrgName', sortable: true, resizable: true }     
            ],
            queryFields:[
                          { placeholder: '客户号', field: 'cusId', type: 'input' },
                          { placeholder: '客户名称', field: 'cusName', type: 'input' },
                          { placeholder: '证件号', field: 'certCode', type: 'input' },
                          { placeholder: '合同编号', field: 'contNo', type: 'input' }
                          
            ],
             queryButtons: [
              { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                  if (valid) {
                    _self.$refs.mytable.remoteData(model);
                  }
                } },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
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
                this.selectedVal = this.selections[0].cusId;
                this.$emit('input', this.selections[0].contNo);
                //这个是你自定义返回的接口事件
                this.$emit('select-fn', this.selections[0].contNo,this.selections[0]);
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
                this.selectedVal = this.selectedVal ? this.selectedVal : val;
            },
            rawValue: function (val) {
                this.selectedVal = val
            }
        }

    });
})(Vue, yufp.$, 'yufp-cont-selector');


