/**
 * 电核问题组选择器
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
            <el-dialog title="电核表单列表" :visible.sync="dialogVisible">\
              <el-form-q :field-data="queryFields" :buttons="queryButtons"></el-form-q>\
              <el-table-x ref="mytable" :data-url="dataUrl" @row-click="rowClickFn"\
               :table-columns="tableColumns" request-type="POST">\
              </el-table-x>\
              <div slot="footer" class="dialog-footer">\
                <el-button @click="dialogVisible = false">取 消</el-button>\
                <el-button type="primary" @click="confirmFn">确 定</el-button>\
              </div>\
            </el-dialog>\
            <el-dialog title="详情" :visible.sync="detailVisable" size="full"> <div id="TelVerifDialogDetail"></div>\
        <div slot="footer" class="dialog-footer"> <el-button @click="detailVisable = false">关 闭</el-button> </div>\
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
                isConfirm: false,
                dataUrl: backend.consoleService + '/api/tel/verif/grp/cfgs/valid',
                tableColumns: [
                    {label: '模板组ID', prop: 'tplGrpId', resizable: true},
                    {label: '问题模板组名称', prop: 'tplGrpName', sortable: true, resizable: true}
                ],
                queryFields: [
                    {placeholder: '模板组ID', field: 'tplGrpId', type: 'input'},
                    {placeholder: '问题模板组名称', field: 'tplGrpName', type: 'input'}
                ],
                queryButtons: [
                    {
                        label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                            if (valid) {
                                _self.selections = [];
                                _self.$refs.mytable.remoteData(model);
                            }
                        }
                    }
                ],
                rootId : 'TelVerifDialogDetail',
                detailVisable: false
            };
        },
        methods: {
            clickFn: function () {
                this.$emit('click-fn', this);
            },
            onIconClickFn: function (val) {
                if (this.disabled) {
                    return;
                }
                this.dialogVisible = true;
            },
            rowClickFn: function (row) {
                this.selections = this.$refs.mytable.selections;
            },
            confirmFn: function () {
                if (this.selections.length < 1) {
                    this.$message('请先选择一条数据');
                    return;
                }
                this.isConfirm = true; //是组件内修改
                this.selectedVal = this.selections[0].tplGrpName;
                this.$emit('input', this.selections[0].tplGrpId);
                //这个是你自定义返回的接口事件
                this.$emit('select-fn', this.selections[0].id, this.selections[0]);
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
                        tplGrpId: this.value
                    };
                    yufp.router.to('TelVerif_PrdLookRuleDtl', obj,  this.rootId);
                });

            }

        },
        mounted: function () {
            this.selectedVal = this.rawValue ? this.rawValue : this.value;
        },
        watch: {
            value: function (val) {
                //将key转换为对应的value值
                if ( this.selectedVal == '' && val && val != '' ) {
                    var self =this;
                    self.selectedVal = val;
                    yufp.service.request({
                        method: 'POST',
                        url: backend.consoleService + '/api/tel/verif/grp/cfg/' + val,
                        callback: function (code, message, response) {
                            if ( response &&  response.success == true) {
                                self.selectedVal = response.data.tplGrpName;
                            }else
                                self.selectedVal = val;
                        }
                    });
                }
            },
            rawValue: function (val) {
                this.selectedVal = this.selectedVal ? this.selectedVal : val;
            }
        }

    });
})(Vue, yufp.$, 'div-tel-verif-grp-selector');