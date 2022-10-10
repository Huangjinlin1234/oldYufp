/**
 * yufp-addr-selector
 * 区域编码选择器
 * 注：自定义组件规范：
 * 1、对外默认提供v-model配置,raw-value
 * 2、对外提供readonly、disabled、size属性
 * 3、对外接口事件：select-fn,具体参数请自定义
 * Created by helin3 on 2017/12/15.
 */
(function (vue, $, name) {

    var areaCodes = [];
    var queryVal; //循环结果查找到的值
    vue.component(name, {
            template: '<div>\
                  <template><el-cascader v-model="selectedVal" :options="options" \
                    :props="props" @change="handleChange" :disabled="disabled" :placeholder="placeholder"></el-cascader></template>\
            </div>',
            props: {
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
                    'default': '区域编码'
                },
                icon: {
                    type: String,
                    'default': 'search'
                },
                params: Object
            },
            data: function (response) {
                return {
                    props: {
                        value: 'enname',
                        label: 'cnname'
                    },
                    selectedVal: null,
                    options: []
                };
            },
            methods: {
                loadData: function() {
                    var _this = this;
                    var root = '100000'; //根节点, 将父节点为空的节点， 设置为根节点
                    var options = {
                        id: 'enname',
                        pid: 'abvenName',
                        root: root,
                        label: 'cnname'
                    };
                    var areaUrl = backend.consoleService + '/api/s/dic/trees/area/code';
                    yufp.service.request({
                        method: 'POST',
                        url: areaUrl,
                        async: true,
                        callback: function (code, message, res) {
                            if (code == 0) {
                                if (res && res.data) {
                                    var trees = yufp.util.array2tree(res.data, options);
                                    trees = _this.delChildren(trees);
                                    areaCodes = trees.children;
                                    _this.options = areaCodes;
                                    if (_this.value && _this.value != '' ) {
                                        _this.searchSelectVal(_this.value);
                                    } 
                                }
                            }
                        }
                    });
                },
                //删除空的子数组
                delChildren: function(obj) {
                    if (obj.children.length >= 0) {
                        for (var i = 0; i < obj.children.length; i++) {
                            if ( obj.children[i].children == 0 ) 
                                delete obj.children[i].children;
                            else 
                                this.delChildren(obj.children[i]);
                        }
                    }
                    return obj;
                },
                handleChange: function(value) {
                    if ( value && yufp.isArray(value) ) {
                        //最后一级是值
                        this.$emit('input', value[value.length - 1]);
                        var areaObjArr = [];
                        for(var i = 0; i < value.length; i++) {
                            queryVal = null;
                            this.queryAreaByCode(this.options, value[i]);
                            if (queryVal) 
                                areaObjArr.push(queryVal);
                        }
                        var allName = '';
                        for (var j = 0; j < areaObjArr.length; j++) {
                            if ( j < areaObjArr.length - 1 )
                                allName += areaObjArr[j].cnname + '->';
                            else
                                allName += areaObjArr[j].cnname;
                        }
                        var param = {
                            allName: allName,
                            areaArr: value,
                            areaObjArr: areaObjArr
                        };


                        //这个是你自定义返回的接口事件
                        this.$emit('select-fn', value[value.length - 1], param);
                    }
                    
                },
                searchSelectVal: function(val) {
                    this.selectedVal = [];
                    var locate;
                    if (val == null || typeof(val) == 'undefined' || val == '' ) {
                        return ;
                    }else {
                        queryVal = null;
                        if (areaCodes.length > 0 && this.options.length == 0) {
                            this.options = areaCodes;        
                        }else if (areaCodes.length == 0 ) 
                            this.loadData();
                        this.queryAreaByCode(this.options, val);
                        if ( queryVal )
                            locate = queryVal.locate;
                        
                        if (locate != null && typeof(val) != 'undefined' ) {
                            var arr = locate.split(",");
                            if ( arr && yufp.isArray(arr) && arr.length > 1 ) {
                                var selectedVal = [];
                                for (var i = 1; i < arr.length; i++) {
                                    selectedVal.push(arr[i]);
                                }
                                this.selectedVal = selectedVal;
                            }
                        }

                    }
                },
                
                queryAreaByCode: function(obj, code) {
                    var temp;
                    if ( obj && yufp.isArray(obj) ) {
                        for (var i = 0; i < obj.length; i++) {
                            temp = obj[i];
                            if (temp.enname == code) 
                                queryVal = temp;
                            else 
                                this.queryAreaByCode(temp, code);
                        }
                    }else if (obj && obj.enname == code) {
                        queryVal = obj;
                    }else if (obj && obj.children && yufp.isArray(obj.children) ){
                        for (var j = 0; j < obj.children.length; j++) {
                            temp = obj.children[j];
                            if ( temp.enname == code) 
                                queryVal = temp;
                            else   
                                this.queryAreaByCode(temp, code);
                        }
                    }
                }
            },
            mounted: function () {
                if (areaCodes.length > 0) {
                    this.options = areaCodes;        
                }else 
                    this.loadData();
            },
            watch: {
                value: function(val) {
                    this.searchSelectVal(val);
                },
                rawValue: function(val) {
                	this.selectedVal = val;
                }
            }
        }

    );
})(Vue, yufp.$, 'yufp-addr-selector');