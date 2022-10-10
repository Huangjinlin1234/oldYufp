/**
 * div-role-selecter 机构选择器 注：自定义组件规范： 1、对外默认提供v-model配置,raw-value
 * 2、对外提供readonly、disabled、size属性 3、对外接口事件：select-fn,具体参数请自定义 Created by helin3
 * on 2018/06/17.
 */
(function (vue, $, name) {
    vue.component(name, {
        template: '<div>\
            <el-input v-model="selectedVal" readonly :placeholder="placeholder" :disabled="disabled"\
            :size="size" :name="name" :icon="icon" :on-icon-click="onIconClickFn" @click.native="clickFn">\
            </el-input>\
            <el-dialog title="角色列表" :visible.sync="dialogVisible" size="large" top="5%">\
              <el-row>\
               <el-col :span="12">\
               <el-form-q :field-data="queryFields" :buttons="queryButtons"></el-form-q>\
               <el-table-x ref="mytable" :data-url="dataUrl" @row-click="rowClickFn" :checkbox=true\
               :table-columns="tableColumns"  @loaded="tableLoaded" request-type="POST">\
              </el-table-x>\
              </el-col>\
             <el-col :span="12">\
              <el-button-group style="margin-top: 10px; padding-top: 0px; padding-bottom: 0px; margin-bottom: 11px;">\
                 <el-button type="primary" icon="edit" @click="addFn">添加</el-button>\
                  <el-button type="primary" icon="delete"  @click="deleteFn">删除</el-button>\
              </el-button-group>\
               <el-table-x ref="mytableTwo" :checkbox=true\
               :table-columns="tableColumnsTwo"  @loaded="tableLoadedTwo" request-type="POST" :default-load="false" :pageable="false">\
              </el-table-x>\
              </el-col>\
              </el-row>\
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
            var vm = this;
            return {
            	//左侧加载的列表
              selections: [],
               // myLoading: true,
               queryFields: [
                { placeholder: '角色代码', field: 'roleCode', type: 'input' },
                { placeholder: '角色名称', field: 'roleName', type: 'input' }
                ],
                queryButtons: [
                  { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                      if (valid) {
                      // vm.myLoading = true;
                        vm.selections = [];
                        vm.$refs.mytable.remoteData(model);
                      }
                    } }
                ],
                selectedVal: '',
                dialogVisible: false,
                dataUrl: backend.consoleService + '/api/s/role/legal/status',
                tableColumns: [
                  { label: '角色代码', prop: 'roleCode' },
                  { label: '角色名称', prop: 'roleName', resizable: true }
                ],
            
              // 右侧加载的列表
              selectionsToo: [],
               // myLoadingTwo: true,
                selectedVal: '',
                dialogVisible: false,
                //url: backend.consoleService + '',
                tableColumnsTwo: [
                  { label: '角色代码', prop: 'roleCode' },
                  { label: '角色名称', prop: 'roleName', resizable: true }
                ]
            }
        },
        methods: {
           // 右侧列表的相关方法
             tableLoadedTwo: function(){
          // this.myLoading = false;
             },
            clickFn: function () {
                this.$emit('click-fn', this);
            },
            onIconClickFn: function (val) {
                var _self = this;
                if (this.disabled){
                    return;
                }
                this.dialogVisible = true;
                if (typeof (_self.$refs.mytableTwo) != 'undefined') _self.$refs.mytableTwo.data = [];
            },
            rowClickFn: function (row) {
                this.selections2 = this.$refs.mytableTwo.selections;
            },
            //从右侧列表中移除选择的数据
            deleteFn: function () {
            	var _self = this;
            	var selections =_self.$refs.mytableTwo.selections;
                if(selections.length<1){
                    this.$message('请先选择一条要移除的角色数据');
                    return ;
                }
                var len = selections.length;
                var arr = [];
                var data  = _self.$refs.mytableTwo.data || [];
                for (var i = 0; i < selections.length; i++) {
              	for (var j = 0; j < data.length; j++) {
              		 if ( data[j].roleCode == selections[i].roleCode)  {
              		 	data.splice(j,1);
              		 	break;
              		 }
              	}
              
            }
         _self.$refs.mytableTwo.data = data;
          },
             //从左侧列表中加载数据到右侧
             addFn: function () {
             	var selections = this.$refs.mytable.selections;
                if(selections.length<1){
                    this.$message('请先选择一条角色数据');
                    return ;
                }
                var len = selections.length;
                var arr = [];
                var data = this.$refs.mytableTwo.data || [];
                for (var i = 0; i < len; i++) {
                	     var isHave = false;
                       for (var j = 0; j < data.length; j++) {
                    	 if (data[j].roleCode == selections[i].roleCode){
                    	 isHave =true;
                    	 break;
                    	}
                    }
                    if (!isHave) {
                      data.push(selections[i]);
                    }
                }
                this.$refs.mytableTwo.data = data;

            },
            // 对外提供选择器显示值
            getRawValue: function () {
                return this.selectedVal;
            },
            convertKey: function (val) {
                // 将key转换为对应的value值
                return val;
            },
           
            // 左侧列表的相关方法
             tableLoaded: function(){
          // this.myLoading = false;
             },
            clickFn: function () {
                this.$emit('click-fn', this);
            },
            onIconClickFn: function (val) {
                var _self = this;
                if (this.disabled){
                    return;
                }
                this.dialogVisible = true;
                if (typeof (_self.$refs.mytable) != 'undefined') _self.$refs.mytable.remoteData();
                if (typeof (_self.$refs.mytableTwo) != 'undefined') _self.$refs.mytableTwo.data = [];
            },
            rowClickFn: function (row) {
                this.selections = this.$refs.mytable.selections;
            },
            //点击确定时候将右侧列表数据加载到需要显示的角色列表
            confirmFn: function () {
            	var _self = this;
              var selections =_self.$refs.mytableTwo.data;
                var len = selections.length;
                var arr = [];
                var selectId = '';
                for (var i = 0; i < len; i++) {
                	 if ( i < len - 1){
                	 selectId += selections[i].roleCode + ',';
                	 } else{
                	  selectId += selections[i].roleCode;
                	 }  
                }
                this.selectedVal =  selectId;
                this.$emit('input', selectId);
                // 这个是你自定义返回的接口事件
                this.$emit('select-fn', selectId, selections);
                this.dialogVisible = false;
            },
            // 对外提供选择器显示值
            getRawValue: function () {
                return this.selectedVal;
            },
            convertKey: function (val) {
                // 将key转换为对应的value值
                return val;
            }     

        },
        
 
        mounted: function () {
            this.selectedVal = this.rawValue ? this.rawValue: this.value;
        },
        watch: {
            value: function (val) {
                // 展示的key和value 都是一致的，所以
                this.selectedVal = val;
            },
            rawValue: function (val) {
                this.selectedVal = val;
            }
        }

    });
})(Vue, yufp.$, 'div-role-selector');


