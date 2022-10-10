/**
 * 规则查看页面
 * @create by xxx on 2018-xx-xx
 * @description xx
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,COMMON_STATUS,PRICE_MODEL,STD_ZB_EFR_CHNG_IND,STD_ZB_TERM_TYPE,STD_ZB_IREXE_TYPE');
        // 创建virtual model
        var vm = yufp.custom.vue({
            el: cite.el,
            data: {
                activeNames: ['1', '2'],
                ruleCollDtlsUrl: backend.consoleService+ "/api/rate/scheme/details",
                sRuleCollDtlParams: {},

                sRuleCollField: [{
                    columnCount: 2,
                    fields: [
                        {
                            field: 'schemeName', label: '方案名称'
                        },
                        {field: 'legalOrgCode', label: '法人机构代码'},
                        {
                            field: 'priceModel', label: '定价模式', type: 'select',
                            dataCode: 'PRICE_MODEL'
                        },
                        {
                            field: 'singleTermUnit',
                            label: '单笔支用期限单位',
                            type: 'select',
                            dataCode: 'STD_ZB_TERM_TYPE'
                        },
                        {
                            field: 'status', label: '利率方案状态',
                            type: 'select',
                            dataCode: 'COMMON_STATUS'
                        },
                        {field: 'effictiveDate', label: '生效日期', type: 'date'},
                        {field: 'expiryDate', label: '失效日期', type: 'date'}
                    ]
                }],

                sRuleCollDtlColumns: [
                    {label: '单笔支用期限最小值', prop: 'singleTermUnitMin', sortable: true, resizable: true},
                    {label: '单笔支用期限最大值', prop: 'singleTermUnitMax', sortable: true, resizable: true},
                    {
                        label: '利率类型', prop: 'rateModel', sortable: true, resizable: true,
                        dataCode: 'STD_ZB_EFR_CHNG_IND'
                    },
                    {
                        label: '固定利率值',
                        prop: 'fixedRate',
                        sortable: true,
                        type: 'num',
                        formatter: function (money, num, cellValue) {
                            /*
                              * 参数说明：
                              * money：要格式化的数字
                              * num：保留几位小数
                              * */
//      num = num > 0 && num <= 20 ? num : 2;
                            if (cellValue != null && cellValue != '')
                                cellValue = parseFloat((cellValue + '')).toFixed(4) + '%';
                            else
                                cellValue = '';
                            return cellValue;
                        }

                    },
                    {
                        label: '浮动比例',
                        prop: 'floatRate',
                        sortable: true,
                        type: 'num',
                        formatter: function (money, num, cellValue) {
                            /*
                              * 参数说明：
                              * money：要格式化的数字
                              * num：保留几位小数
                              * */
//      num = num > 0 && num <= 20 ? num : 2;
                            if (cellValue != null && cellValue != '')
                                cellValue = parseFloat((cellValue + '')).toFixed(4) + '%';
                            else
                                cellValue = '';
                            return cellValue;
                        }
                    },
                    {prop: 'rateAdjustType', label: '利率调整方式', dataCode: 'STD_ZB_IREXE_TYPE'}
                ],

                mainGrid: {
                    data: null,
                    loading: false,
                    multipleSelection: []
                },

                height: yufp.frame.size().height - 103,
                paramDialogVisible: false
                
            },
            methods: {
            },
            mounted: function () {
                if ( typeof(data) != 'undefined' && data != null ) {
                	  var _self = this;
                    this.$nextTick(function (){
                    	  yufp.service.request({
                          method: 'GET',
                          url: backend.consoleService + '/api/rate/scheme/cfg/'+ data.schemeNo,
                          callback: function (code, message, response) {
                          	if ( response &&  response.success == true) {
                            	var ruleObj = response.data; 
                            	yufp.extend(_self.$refs.sRuleCollForm.formModel, ruleObj);
                              _self.$refs.sRuleCollDtlTable.remoteData(ruleObj);
                          	}else 
                          	  _self.$message({ message: '查询详情失败!', type : 'warning' });
                          }
                    	  });
                        
                    });
                }
            }
        });

    };
    // 消息处理
    exports.onmessage = function (type, message) {

    };
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    }

});