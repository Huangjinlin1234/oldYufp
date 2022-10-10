/**
 * div-cont-temp-g-selector
 * 合同模版组选择器
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
            <el-button slot="prepend" icon="yx-list2" @click="detailClick"></el-button>\
            </el-input>\
            <el-dialog title="业务流程列表" :visible.sync="dialogVisible" if="dialogVisible">\
              <el-form-q :field-data="queryFields" :buttons="queryButtons"></el-form-q>\
              <el-table-x ref="mytable" :data-url="dataUrl" @row-click="rowClickFn"\
               :table-columns="tableColumns" request-type="POST" :default-load="false">\
              </el-table-x>\
              <div slot="footer" class="dialog-footer">\
                <el-button @click="dialogVisible = false">取 消</el-button>\
                <el-button type="primary" @click="confirmFn">确 定</el-button>\
              </div>\
            </el-dialog>\
            <el-dialog title="详情" :visible.sync="detailVisable" size="full"> <div id="bizFlowDialogDetail"></div>\
                <div slot="footer" class="dialog-footer"> <el-button @click="detailVisable = false">关闭</el-button> </div>\
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
                detailVisable: false,
                isConfirm: false,
                dataUrl: backend.flowService + '/api/biz/flow/infos',
                conditionDataUrl: backend.flowService + '/api/biz/flow/info/condition',
                tableColumns: [
                    { label: '业务流转标识', prop: 'bizFlowId', sortable: true, resizable: true },
                    { label: '业务流转名称', prop: 'bizFlowName', sortable: true, resizable: true },
                    { label: '业务流转类型', prop: 'bizFlowType', dataCode: 'BIZ_FLOW_TYPE', sortable: true, resizable: true }
                ],
                queryFields: [
                    { placeholder: '业务流转标识', field: 'bizFlowId', type: 'input' },
                    { placeholder: '业务流转名称', field: 'bizFlowName', type: 'input' },
                ],
                queryButtons: [
                  { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                      if (valid) {
                          _self.selections = [];
                        var obj = {};
                        yufp.extend(obj, model);
                        yufp.extend(obj, _self.params);
                        _self.$refs.mytable.remoteData(obj);
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
                if ( this.params && this.params.query == 'condition' ) {
                    this.dataUrl = this.conditionDataUrl;
                }
                this.$nextTick(function() {
                    this.$refs.mytable.remoteData(this.params);
                });
            },
            rowClickFn: function (row) {
                this.selections = this.$refs.mytable.selections;
            },
            confirmFn: function () {
                if(this.selections.length<1){
                    this.$message('请先选择一条数据');
                    return ;
                }
                this.isConfirm = true; //是组件内修改
                this.selectedVal = this.selections[0].bizFlowName;
                this.$emit('input', this.selections[0].bizFlowId);
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
            },
            detailClick: function(){
                if ( this.value == '') {
                    this.$message({message: '请先选择一条记录,再查看详情!', type: 'warning' });
                    return ;
                }
                this.detailVisable = true;
                this.$nextTick(function(){
                    var obj = {
                        bizFlowId: this.value
                    };
                    yufp.router.to('FLOW_BizFlowInfoDetail', obj, 'bizFlowDialogDetail');
                });

            }

        },
        mounted: function () {
            this.selectedVal = this.rawValue ? this.rawValue: this.value;
        },
        watch: {
            value: function (val) {
            	//将key转换为对应的value值
            	if (this.isConfirm == true) {
            		//如果是组件内修改,则不改变显示值
            		this.selectedVal = this.selectedVal ? this.selectedVal : val;
            		this.isConfirm = false;
            	}else{ //如果是非组件内修改, 则显示当前value值
            		//this.selectedVal = val;
            	}
            },
            rawValue: function (val) {
            	this.selectedVal = val;
            }
        }

    });
})(Vue, yufp.$, 'div-biz-flow-info-selector');