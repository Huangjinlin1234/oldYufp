/**
 * yufp-demo-selector
 * 注：自定义组件规范：
 * 1、对外默认提供v-model配置,raw-value
 * 2、对外提供readonly、disabled、size属性
 * 3、对外接口事件：select-fn,具体参数请自定义
 * Created by helin3 on 2017/12/15.
 */
(function (vue, $, name) {
    yufp.lookup.reg('STD_ZB_LMT_STATE');
    vue.component(name, {
        template: '<div>\
            <el-input v-model="selectedVal" readonly :placeholder="placeholder" :disabled="disabled"\
            :size="size" :name="name" :icon="icon" :on-icon-click="onIconClickFn" @click.native="clickFn">\
            </el-input>\
            <el-dialog title="授信协议选择" :visible.sync="dialogVisible" size="large">\
              <el-form-q :field-data="queryFields" @search-click="searchFn"></el-form-q>\
              <el-table-x ref="mytable" :data-url="dataUrl" @row-click="rowClickFn"\
               :table-columns="tableColumns" :max-height="300" request-type="POST">\
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
            return {
                selectedVal: '',
                dialogVisible: false,
                dataUrl: backend.creditService + '/api/lmt/prd/cont/normal',
                tableColumns: [
                    { label: '授信协议编号', prop: 'lmtContNo' },
                    { label: '授信申请流水号', prop: 'lmtSerno', width: 260, sortable: true, resizable: true},
                    { label: '客户编号', prop: 'cusId', width: 110},
                    { label: '客户名称', prop: 'cusName', width: 110 },
                    { label: '证件类型', prop: 'certType', width: 110 },
                    { label: '证件号码', prop: 'certCode', width: 100},
                    { label: '产品ID', prop: 'prdId', width: 80},
                    { label: '产品号', prop: 'prdCode', width: 80},
                    { label: '产品名称', prop: 'prdName', width: 80},
                    { label: '授信额度', prop: 'lmtAmt', width: 80},
                    { label: '是否循环', prop: 'cyclicFlg', width: 80},
                    { label: '币种', prop: 'currencyType', width: 80},
                    { label: '利率(年)', prop: 'rateY', width: 80},
                    { label: '授信状态', prop: 'lmtStatus', width: 80},
                    { label: '起始日', prop: 'startDate', width: 80},
                    { label: '到期日期', prop: 'expireDate', width: 80},
                    { label: '签订日期', prop: 'signDate', width: 80},
                    { label: '客户经理', prop: 'cusManager', width: 80},
                    { label: '法人机构名称', prop: 'legalOrgName', width: 80},
                    { label: '审批状态', prop: 'approveStatus', width: 80}
                ],
                queryFields: [
                    {
                        placeholder: '授信协议编号',
                        field: 'lmtContNo',
                        type: 'input'
                    },
                    {
                        placeholder: '客户编号',
                        field: 'cusId',
                        type: 'input'
                    },
                    {
                        placeholder: '客户名称',
                        field: 'cusName',
                        type: 'input'
                    }
                ]
            };
        },
        methods: {
            searchFn: function(model, valid) {
                if (valid) {
                    this.$refs.mytable.remoteData(model);
                }
            },
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
                    return;
                }
                this.selectedVal = this.selections[0].lmtContNo;
                this.$emit('input', this.selections[0].lmtContNo);
                //这个是你自定义返回的接口事件$refs.form.formModel.de = 'sdddf'
                this.$emit('select-fn', this.selections[0].lmtContNo,this.selections[0]);
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
            if ( this.params && this.params.status == 'FREEZE') 
                this.dataUrl = backend.creditService + '/api/lmt/prd/cont/freeze';
            else
                this.dataUrl = backend.creditService + '/api/lmt/prd/cont/normal';
        },
        watch: {
            value: function (val) {
                //将key转换为对应的value值
                this.selectedVal = this.selectedVal ? this.selectedVal : val;
            },
            rawValue: function (val) {
                this.selectedVal = val;
            }
        }

    });
})(Vue, yufp.$, 'yufp-frozen-selector');


