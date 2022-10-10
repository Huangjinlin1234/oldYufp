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
	yufp.lookup.reg('ORG_LEVEL');
    vue.component(name, {
        template: '<div>\
            <el-input v-model="selectedVal" readonly :placeholder="placeholderInner" :disabled="disabled"\
            :size="size" :name="name" :icon="icon" :on-icon-click="onIconClickFn" @click.native="clickFn">\
            </el-input>\
            <el-dialog title="设置适用机构" :visible.sync="dialogVisible" :size="size">\
              <el-transfer style="margin-left: 3rem" v-model="setDuty" :data="dutyData" :titles="[\'可分配机构\',\'已选机构\']">\
              </el-transfer>\
              <br>\
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
                selections: [],
                fixedParams: {},
                orgCode: this.params,
            	myLoading: true,
                placeholderInner: this.params!=null && this.params.placeholder!=null ? this.params.placeholder : this.placeholder ,
                setDuty: [],//已选择数据，右侧数据
                dutyData:[],//全部数据
                selectedVal: '',
                dialogVisible: false,
                dataUrl: backend.consoleService + '/api/s/orgs/login/leage',

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
        	    var _self = this;
                if ( _self.disabled ){
                    return;
                }
                if ( _self.params && typeof(this.params.baseParams) == 'function' ) {
                    _self.fixedParams = _self.params.baseParams();
                  if ( _self.fixedParams === false )
                     return ;
                }
                _self.dialogVisible = true;
                _self.$nextTick(function() {
                    _self.myLoading = true;
                    _self.selections = [];
                    _self.dutyData = [];
                    _self.setDuty = [];
                    var selVal = _self.value;
                    yufp.service.request({
                        method: 'POST',
                        url: backend.consoleService + '/api/s/getOrgsForRole',
                        data: {},
                        callback: function (code, message, response) {
                            if (code == 0 && response.code == '0') {

                                for (var i = 0; i < response.rows.length; i++) {
                                    _self.dutyData.push({
                                        key: response.rows[i].orgCode,
                                        label: response.rows[i].orgName
                                    })

                                }
                                //根据选择项 反显到右侧列表
                                if(null==selVal||''==selVal){
                                    _self.setDuty.push("");
                                }else{
                                    var selList = selVal.split(",");
                                    for(var j=0;j<selList.length;j++){
                                        _self.setDuty.push(selList[j]);
                                    }
                                }
                            } else {
                                _self.$message('获取机构失败');
                            }
                        }
                    });
                });

            },
            

            
            confirmFn: function () {

                if(this.params && this.params.showType == 'CNNAME')
                  this.selectedVal = this.setDuty[0];
                else
                  this.selectedVal = this.setDuty[0];
                //这里需要把机构码值返回弹出框 ：依据已选择的key与全部选项的key ，比较相等的获取到key属性值
                var orgsParams = "";//如果后续用到中文字典 使用该字段
                var orgsCode = "";
                for (var i=0;i<this.setDuty.length;i++){

                    for(var j=0;j<this.dutyData.length;j++){
                        if(this.setDuty[i]==this.dutyData[j].key){
                            orgsParams = orgsParams + ","+ this.dutyData[j].label;
                            orgsCode = orgsCode +","+ this.dutyData[j].key;
                        }

                    }
                }
                if(orgsCode.indexOf(",")!=-1){
                    orgsCode = orgsCode.substring(1);
                    orgsParams = orgsParams.substring(1);
                }


                //弹出框回显
                this.$emit('input', orgsCode);
                if ( this.params && typeof(this.params.valid) == 'function'){
                	if ( this.params.valid() == false ) {
                		this.selectedVal = '';
                		return;
                	}
                }
                //这个是你自定义返回的接口事件
                this.$emit('select-fn', orgsCode,orgsCode);
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
                this.roleCode = this.params.roleCode;
                var _self = this;
                _self.setDuty = [];
                yufp.service.request({
                    method: 'GET',
                    url: backend.consoleService + '/api/sRole/org/' + roleCode + '?timestamp='+ new Date().getTime(),
                    /**
                     * url加时间戳，是为了避免AJAX
                     * GET请求加载的是缓存数据
                     */
                    data: {},
                    callback: function (code, message, response) {
                        if (code == 0 && response.code == '0') {
                            for (var i = 0; i < response.rows.length; i++) {
                                _self.setDuty.push(response.rows[i].orgCode);
                            }
                        } else {
                            this.$message('获取用户岗位失败');
                        }
                    }
                });
            }
        }

    });
})(Vue, yufp.$, 'div-org-distribution');


