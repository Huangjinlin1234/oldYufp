/**
 * div-cooper-org-selector
 * 机构选择器
 * 注：自定义组件规范：
 * 1、对外默认提供v-model配置,raw-value
 * 2、对外提供readonly、disabled、size属性
 * 3、对外接口事件：select-fn,具体参数请自定义
 * Created by helin3 on 2018/05/05.
 */
(function (vue, $, name) {
	yufp.lookup.reg('ORG_LEVEL,COOPR_STS,COOPR_ORG_TYPE,COOPR_STS');
    vue.component(name, {
        template: '<div>\
            <el-input v-model="selectedVal" readonly :placeholder="placeholderInner" :disabled="disabled"\
            :size="size" :name="name" :icon="icon" :on-icon-click="onIconClickFn" @click.native="clickFn">\
            </el-input>\
            <el-dialog title="机构列表" :visible.sync="dialogVisible" size="large">\
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
                'default': '合作机构代码'
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
                cooprOrgType: (this.params && this.params.cooprOrgType )||this.params,
                queryFlag: true,
            	myLoading: true,
                placeholderInner: this.params!=null && this.params.placeholder!=null ? this.params.placeholder : this.placeholder ,
            	queryFields: [
                  { placeholder: '合作机构代码', field: 'cooprOrgNo', type: 'input' },
                  { placeholder: '合作机构名称', field: 'cooprOrgName', type: 'input' },
                  { placeholder: '合作机构类型', field: 'cooprOrgType', type: 'select', dataCode:'COOPR_ORG_TYPE',hidden:true}
                ],
                selectedVal: '',
                dialogVisible: false,
                dataUrl: backend.riskmService + '/api/coopr/org/pop',
                tableColumns: [
                	{ label: '合作机构编号', prop: 'cooprOrgNo', sortable: true, resizable: true },
                    { label: '合作机构名称', prop: 'cooprOrgName', sortable: true, resizable: true },
                    { label: '公司地址', prop: 'compAddr', sortable: true, resizable: true, hidden:true },
                    { label: '联系人姓名', prop: 'linkName', sortable: true, resizable: true , hidden:true},
                    { label: '联系人手机号', prop: 'linkPhone', sortable: true, resizable: true, hidden:true },
                    { label: '联系电话', prop: 'linkTel', sortable: true, resizable: true, hidden:true },
                    { label: '发送邮箱', prop: 'sendEmail', sortable: true, resizable: true, hidden:true },
                    { label: '抄送邮箱', prop: 'copyEmail', sortable: true, resizable: true, hidden:true },
                    { label: '一手佣金率', prop: 'primCommRate', sortable: true, resizable: true, hidden:true },
                    { label: '二手佣金率', prop: 'secdCommRate', sortable: true, resizable: true, hidden:true },
                    { label: '三手佣金率', prop: 'thdCommRate', sortable: true, resizable: true, hidden:true },
                    { label: '长账龄佣金率', prop: 'longAgeCommRate', sortable: true, resizable: true , hidden:true},
                    { label: '开始合作日期', prop: 'startCooprDt', sortable: true, resizable: true, hidden:true },
                    { label: '终止合作日期', prop: 'terminateCooprDt', sortable: true, resizable: true , hidden:true},
                    { label: '合作状态', prop: 'cooprStatus', sortable: true, resizable: true, dataCode:'COOPR_STS'},
                    { label: '合作机构类型', prop: 'cooprOrgType', sortable: true, resizable: true, dataCode:'COOPR_ORG_TYPE'},
                    { label: '录入人', prop: 'inputUserId', sortable: true, resizable: true, hidden:true },
                    { label: '录入机构', prop: 'inputOrg', sortable: true, resizable: true, hidden:true },
                    { label: '录入时间', prop: 'inputTime', sortable: true, resizable: true, hidden:true },
                    { label: '最后更新人', prop: 'lastUpdateUser', sortable: true, resizable: true, hidden:true },
                    { label: '最后更新机构', prop: 'lastUpdateOrg', sortable: true, resizable: true, hidden:true },
                    { label: '最后更新时间', prop: 'lastUpdateTime', sortable: true, resizable: true, hidden:true }
                ]
            }
        },
        methods: {
        	
        	tableLoaded: function(){
                this.$nextTick(function() {
                 this.myLoading = false;
                });
        	   },
        	   
            clickFn: function () {
                this.$emit('click-fn', this);
            },
            
            onIconClickFn: function (val) {
                if ( this.disabled ){
                    return;
                }
                if ( this.params && typeof(this.params.baseParams) == 'function' ) {
                	this.fixedParams = this.params.baseParams();
                  if ( this.fixedParams === false ) 
                     return ;
                }
                this.queryFlag = false;
                this.dialogVisible = true;
                this.$nextTick(function() {
                  this.queryFlag = true;
                  this.myLoading = true;
                  this.selections = [];
                  this.$refs.mytable.remoteData(this.fixedParams);
                });
            },
            
            
            queryClick: function(model, valid) {
              if (valid) {
                var obj = {
                		cooprOrgType:this.params.cooprOrgType
                		};
                model.cooprOrgType=obj;
                yufp.extend(obj, model);
                if ( this.fixedParams != null && typeof(this.fixedParams) == 'object'  ) 
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
                if(this.selections.length<1){
                    this.$message('请先选择一条数据');
                    return ;
                }
                
                if(this.params && this.params.showType == 'CNNAME'){
                  this.selectedVal = this.selections[0].orgName;
                }else
                  this.selectedVal = this.selections[0].orgCode;
                this.$emit('input', this.selections[0].orgCode);
                if ( this.params && typeof(this.params.valid) == 'function'){
                	if ( this.params.valid() == false ) {
                		this.selectedVal = '';
                		return;
                	}
                }
                //这个是你自定义返回的接口事件
                this.$emit('select-fn', this.selections[0].cooprOrgNo,this.selections[0]);
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
            if ( typeof(this.params) != 'undefined' && this.params != null ) {
                var dataUrl = this.params.dataUrl; //父组件的请求路径
                if ( typeof(dataUrl) != 'undefined' && dataUrl != null && dataUrl != '' )
                    this.dataUrl = dataUrl;
            }
        },
        watch: {
            value: function (val) {
                //展示的key和value 都是一致的，所以
            	if(this.params && this.params.showType == 'CNNAME'){
            	}else
            	   this.selectedVal = val;
            },
            rawValue: function (val) {
                this.selectedVal = val
            },
            params: function (val) {
               this.params = val;
               this.cooprOrgType = this.params.cooprOrgType;
//               console.log(this.params)
//               console.log(this.cooprOrgType)
               this.$refs.mytable.remoteData({cooprOrgType:this.cooprOrgType});
               
            }
        }

    });
})(Vue, yufp.$, 'div-coopr-org-selector');


