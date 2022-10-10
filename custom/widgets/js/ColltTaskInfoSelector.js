(function (vue, $, name) {
    yufp.lookup.reg('STD_RISK_LEVEL,STD_COLLT_WAY,IDENT_WAY,COLLT_TASK_STATUS');
    vue.component(name, {
        template: '<div>\
            <el-input v-model="selectedVal" readonly :placeholder="placeholderInner" :disabled="disabled"\
            :size="size" :name="name" :icon="icon" :on-icon-click="onIconClickFn" @click.native="clickFn">\
            </el-input>\
            <el-dialog title="催收任务" :visible.sync="dialogVisible" size="large">\
               <el-form-q ref="queryForm" v-if="queryFlag" @search-click="queryClick" :field-data="queryFields"></el-form-q>\
              <el-table-x ref="mytable" :data-url="dataUrl" @row-click="rowClickFn" :default-load="false" \
               :table-columns="tableColumns" v-loading="myLoading" @loaded="tableLoaded" request-type="POST">\
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
                'default': '催收任务编号'
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
                fixedParams: {},
                colltWay: (this.params && this.params.colltWay ) || '',
                colltBatchNo: (this.params && this.params.colltBatchNo ) || '',
                outsOrgCode: (this.params && this.params.outsOrgCode ) || '',
                taskSts: (this.params && this.params.taskSts ) || '',
                queryFlag: true,
                myLoading: true,
                placeholderInner: "",
                placeholderInner: this.params != null && this.params.placeholder != null ? this.params.placeholder : this.placeholder,
                queryFields: [
                    {placeholder: '催收任务编号', field: 'colltTaskNo', type: 'input'},
                    {placeholder: '客户编号', field: 'cusId', type: 'input'},
                    {placeholder: '客户名称', field: 'cusName', type: 'input'},
                    {placeholder: '风险等级', field: 'riskLevel', type: 'select', dataCode: 'STD_RISK_LEVEL', hidden: true},
                    {placeholder: '任务状态', field: 'taskSts', type: 'select', dataCode: 'COLLT_TASK_STATUS', hidden: true}
                ],
                selectedVal: '',
                dialogVisible: false,
                dataUrl: backend.riskmService + '/api/collt/task/infos/props',
                tableColumns: [
                    {label: '催收任务编号', prop: 'colltTaskNo', sortable: true, resizable: true, hidden: false},
                    {label: '分配批次', prop: 'colltBatchNo', sortable: true, resizable: true, hidden: false},
                    {label: '律师事务所编号', prop: 'outsOrgCode', sortable: true, resizable: true, hidden: false},
                    {label: '律师事务所名称', prop: 'outsOrgName', sortable: true, resizable: true, hidden: false},
                    {label: '客户编号', prop: 'cusId', sortable: true, resizable: true, hidden: false},
                    {label: '客户名称', prop: 'cusName', sortable: true, resizable: true, hidden: false},
                    {label: '借据编号', prop: 'loanNo', sortable: true, resizable: true, hidden: false},
                    {label: '逾期天数', prop: 'overDays', sortable: true, resizable: true, hidden: true},
                    {label: '逾期金额', prop: 'overLmt', sortable: true, resizable: true, hidden: true},
                    {label: '逾期期数', prop: 'overNper', sortable: true, resizable: true, hidden: true},
                    {label: '风险等级',prop: 'riskLevel',sortable: true,resizable: true,hidden: true,dataCode: 'STD_RISK_LEVEL'},
                    {label: '风险类型', prop: 'riskType', sortable: true, resizable: true, hidden: true, dataCode: ''},
                    {label: '催收方式', prop: 'colltWay', sortable: true, resizable: true, hidden: true, dataCode: 'STD_COLLT_WAY'},
                    {label: '识别方式', prop: 'identWay', sortable: true, resizable: true, hidden: true, dataCode: 'IDENT_WAY'},
                    {label: '任务状态', prop: 'taskSts', sortable: true, resizable: true, hidden: true, dataCode: 'COLLT_TASK_STATUS'},
                    {label: '入催时间', prop: 'createTime', sortable: true, resizable: true, hidden: true},
                    {label: '操作员', prop: 'opUserCode', sortable: true, resizable: true, hidden: true},
                    {label: '操作员所属机构', prop: 'opOrgCode', sortable: true, resizable: true, hidden: true}
                ]
            }
        },
        methods: {

            tableLoaded: function () {
                this.$nextTick(function () {
                    this.myLoading = false;
                });
            },

            clickFn: function () {
                this.$emit('click-fn', this);
            },

            onIconClickFn: function (val) {
                if (this.disabled) {
                    return;
                }
                if (this.params && typeof (this.params.baseParams) == 'function') {
                    this.fixedParams = this.params.baseParams();
                    if (this.fixedParams === false)
                        return;
                }
                this.queryFlag = false;
                this.dialogVisible = true;
                this.$nextTick(function () {
                    this.queryFlag = true;
                    this.myLoading = true;
                    this.selections = [];
                    this.$refs.mytable.remoteData(this.fixedParams);
                });
            },

            queryClick: function (model, valid) {
                if (valid) {
                    var obj = {};
                    yufp.extend(obj, model);
                    if (this.fixedParams != null && typeof (this.fixedParams) == 'object')
                        yufp.extend(obj, this.fixedParams);
                    this.myLoading = true;
                    this.selections = [];
                    this.$refs.mytable.remoteData(obj);
                }
            },

            rowClickFn: function (row) {
                this.selections = this.$refs.mytable.selections;
            },

            confirmFn: function () {
                if (this.selections.length < 1) {
                    this.$message('请先选择一条数据');
                    return;
                }
                this.selectedVal = this.selections[0].colltTaskNo;
                this.$emit('input', this.selections[0].colltTaskNo);

                if (this.params && typeof (this.params.valid) == 'function') {
                    if (this.params.valid() == false) {
                        this.selectedVal = '';
                        return;
                    }
                }
                //这个是你自定义返回的接口事件
                this.$emit('select-fn', this.selections[0].colltTaskNo, this.selections[0]);
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
            this.selectedVal = this.rawValue ? this.rawValue : this.value;
            if (typeof (this.params) != 'undefined' && this.params != null) {
                var dataUrl = this.params.dataUrl; //父组件的请求路径
                if (typeof (dataUrl) != 'undefined' && dataUrl != null && dataUrl != '')
                    this.dataUrl = dataUrl;
            }
        },
        watch: {
            value: function (val) {
                //展示的key和value 都是一致的，所以
                if (this.params && this.params.showType == 'CNNAME') {
                } else
                    this.selectedVal = val;
            },
            rawValue: function (val) {
                this.selectedVal = val
            },
            params: function (val) {
                this.params = val;
                this.colltWay = this.params.colltWay;
                this.colltBatchNo = this.params.colltBatchNo;
                this.outsOrgCode = this.params.outsOrgCode;
                this.taskSts = this.params.taskSts;
                this.fixedParams = {colltWay:this.colltWay,colltBatchNo:this.colltBatchNo,outsOrgCode:this.outsOrgCode,taskSts:this.taskSts};
                this.$refs.mytable.remoteData(this.fixedParams);
            }
        }
    });
})(Vue, yufp.$, 'div-colltTaskInfo-selector');