/**
 * 
 */
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
	yufp.lookup.reg('CRUD_TYPE,PRD_STATUS,APPLY_CHANNEL_TYPE');
    vue.component(name, {
        template: '<div>\
            <el-input v-model="selectedVal" readonly :placeholder="placeholder" :disabled="disabled"\
            :size="size" :name="name" :icon="icon" :on-icon-click="onIconClickFn" @click.native="clickFn">\
            </el-input>\
            <el-dialog title="产品列表" :visible.sync="dialogVisible" size="middle">\
              <el-form-q :field-data="queryFields" :buttons="queryButtons"></el-form-q>\
              <el-table-x ref="mytable" :data-url="dataUrl" @row-click="rowClickFn"\
               :table-columns="tableColumns" request-type="POST" >\
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
                'default': '产品编号'
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
            	prdType: (this.params && this.params.prdType )||(this.params && this.params.channelNo )|| ''||(this.params),
                pedName: (this.params && this.params.prdName )|| ''||(this.params),
                selectedVal: '',
                dialogVisible: false,
                dataUrl: backend.consoleService + '/api/prd/queryPrdInfoSeletor',
                tableColumns: [
                   { label: '产品编号', prop: 'prdId', resizable: true},
                   { label: '产品编号', prop: 'prdCode', resizable: true ,hidden:true },
                   { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
                   { label: '渠道', prop: 'prdType', sortable: true, resizable: true, dataCode:'APPLY_CHANNEL_TYPE',hidden:true },
                   { label: '产品状态', prop: 'prdStatus', sortable: true, resizable: true, dataCode:'PRD_STATUS'},
                   { label: '机构', prop: 'legalOrgCode', sortable: true, resizable: true, hidden: true }
                ],
                queryFields: [
                	{ placeholder: '产品编号', field: 'prdCode', type: 'input' },
                    { placeholder: '产品名称', field: 'prdName', type: 'input' },
                    { placeholder: '渠道', field: 'prdType', type: 'select' , dataCode:'APPLY_CHANNEL_TYPE'},
                    { placeholder: '产品状态', field: 'prdStatus', type: 'select' , dataCode:'PRD_STATUS'}
                ],
                queryButtons: [
                  { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                      if (valid) {
//                    	  _self.selections = [];
                    	if (model.prdType == "01" || model.prdType == "02" || model.prdType == "08"
                            || model.prdType == "09" || model.prdType == "10" || model.prdType == "11") {
                    		var temp = model.prdType;
                    		model.prdType = "psd";
                    		_self.$refs.mytable.remoteData(model);
                    		model.prdType = temp;
                    	} else {
                    		_self.$refs.mytable.remoteData(model);
                    	}
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
                this.queryFlag = false;
                this.$nextTick(function() {
                    this.queryFlag = true;
                    this.myLoading = true;
                    this.selections = [];
                    this.$refs.mytable.remoteData(this.fixedParams);
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
                if(this.params.type == 'name') {
                    this.$emit('input', this.selections[0].prdName);
                    this.selectedVal = this.selections[0].prdName;
                } else if (this.params.type == 'code') {
                    this.$emit('input', this.selections[0].prdCode);
                    this.selectedVal = this.selections[0].prdName;
                } else {
                    this.$emit('input', this.selections[0].prdCode);
                    this.selectedVal = this.selections[0].prdCode;
                }

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
            },
            params: function (val) {
                this.params = val;
                this.prdType = this.params.prdType;
                this.channelNo = this.params.channelNo;
                
                //税e贷的三个渠道
                if(this.prdType == "01" || this.prdType == "02" || this.prdType == "08" || this.prdType == "09"
                    || this.prdType == "10" || this.prdType == "11") {
                	this.prdType = "psd";
                }
                if(this.channelNo == "00" || this.channelNo == "01" || this.channelNo == "02"){
                	this.channelNo = "00,01,02";
                }

                if ("undefined" != typeof this.prdType){
                	this.$refs.mytable.remoteData({prdType:this.prdType});
                } else if ("undefined" != typeof this.channelNo) {
                	this.$refs.mytable.remoteData({prdType:this.channelNo});
                }
            }
        }

    });
})(Vue, yufp.$, 'div-prdId-info-selector');