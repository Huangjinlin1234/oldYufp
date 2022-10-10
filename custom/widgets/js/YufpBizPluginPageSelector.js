/**
 * yufp-demo-selector
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
            <el-dialog-x :title="title" :visible.sync="dialogVisible" >\
              <el-table-x ref="pageTable" :data-url="pageDataUrl"  @row-click="rowClickFn"\
                :table-columns="pageTableColumns" :max-height="300" request-type="POST" v-show="selectType == \'page\'">\
              </el-table-x>\
              <el-table-x ref="serviceTable" :data-url="serviceDataUrl" @row-click="rowClickFn"\
                :table-columns="serviceTableColumns" :max-height="300" request-type="POST" v-show="selectType == \'service\'">\
              </el-table-x>\
              <div slot="footer" class="dialog-footer">\
                <el-button @click="dialogVisible = false">取 消</el-button>\
                <el-button type="primary" @click="confirmFn">确 定</el-button>\
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
            return {
            	title: '页面插件选择器',
            	selectType: this.params.selectType || 'page',
                selectedVal: '',
                dialogVisible: false,

                pageDataUrl: backend.flowService + '/api/biz/plugin/pages',
                pageTableColumns: [
                    { label: '业务插件标识', prop: 'bizPluginId' },
                    { label: '业务插件名称', prop: 'bizPluginName'},
                    { label: '页面插件地址', prop: 'bizPageUrl' }
                ],
                
                serviceDataUrl: backend.flowService + '/api/biz/plugin/services',
                serviceTableColumns: [
                    { label: '业务插件标识', prop: 'bizPluginId' },
                    { label: '业务插件名称', prop: 'bizPluginName' },
                    { label: '业务服务插件类', prop: 'bizServiceClass' },
                    { label: '服务插件调用方法', prop: 'bizPluginMethodName' }
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
            	if(this.selectType == 'service') {
                    this.selections = this.$refs.serviceTable.selections;
                } else {
                    this.selections = this.$refs.pageTable.selections;
                }
            },
            confirmFn: function () {
                if(this.selections.length<1){
                    this.$message('请先选择一条数据');
                }
                this.selectedVal = this.selections[0].bizPluginName;
                this.$emit('input', this.selections[0].bizPluginId);
                //这个是你自定义返回的接口事件
                this.$emit('select-fn', this.selections[0].bizPluginId,this.selections[0]);
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
            	if(val == '') {
            		this.selectedVal = '';
            	} else {
                    //将key转换为对应的value值
                    this.selectedVal = this.selectedVal ? this.selectedVal : val;
            	}
            },
            rawValue: function (val) {
                this.selectedVal = val
            },
            params: function(val) {
            	this.params = val;
            	this.selectType = this.params.selectType;
            },
            selectType: function(val) {
            	if(val == 'service') {
            		this.title = '服务插件选择器';
            	} else {
            		this.title = '页面插件选择器';
            	}
            }
        }

    });
})(Vue, yufp.$, 'yufp-biz-plugin-page-selector');


