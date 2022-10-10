/**
 * div-org-selector
 * 机构选择器
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
            <el-dialog title="机构列表" :visible.sync="dialogVisible" size="large">\
               <el-form-q :field-data="queryFields" :buttons="queryButtons"></el-form-q>\
              <el-table-x ref="mytable" :data-url="dataUrl" @row-click="rowClickFn"\
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
                'default': '机构代码'
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
            	 myLoading: true,
            	 queryFields: [
                { placeholder: '机构代码', field: 'orgCode', type: 'input' },
                { placeholder: '机构名称', field: 'orgName', type: 'input' }
                ],
                queryButtons: [
                  { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                      if (valid) {
                      	vm.myLoading = true;
                      	vm.selections = [];
                        vm.$refs.mytable.remoteData(model);
                      }
                    } }
                ],
                selectedVal: '',
                dialogVisible: false,
                dataUrl: backend.consoleService + '/api/s/orgs/login/leage',
                tableColumns: [
                  { label: '机构代码', prop: 'orgCode' },
                  { label: '上级机构代码', prop: 'orgParentCode', resizable: true },
                  { label: '法人机构代码', prop: 'legalOrgCode', resizable: true },
                  { label: '机构名称', prop: 'orgName', sortable: true, resizable: true, width: 200 },
                  { label: '机构联系电话', prop: 'orgTel',  resizable: true },
                  { label: '机构地址', prop: 'orgAddress', sortable: true, resizable: true },
                  { label: '位置属性', prop: 'location', sortable: true, resizable: true }
                ]
            }
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
            },
            rowClickFn: function (row) {
                this.selections = this.$refs.mytable.selections;
            },
            confirmFn: function () {
                if(this.selections.length<1){
                    this.$message('请先选择一条数据');
                    return ;
                }
                this.selectedVal = this.selections[0].orgCode;
                this.$emit('input', this.selections[0].orgCode);
                //这个是你自定义返回的接口事件
                this.$emit('select-fn', this.selections[0].orgCode,this.selections[0]);
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
            if ( this.params && this.params.onlyLegal === true ) {
            	this.dataUrl = backend.consoleService + '/api/s/orgs/login/only/leage';
            }
        },
        watch: {
            value: function (val) {
                //展示的key和value 都是一致的，所以
                this.selectedVal = val;
            },
            rawValue: function (val) {
                this.selectedVal = val
            }
        }

    });
})(Vue, yufp.$, 'div-degal-org-selector');


