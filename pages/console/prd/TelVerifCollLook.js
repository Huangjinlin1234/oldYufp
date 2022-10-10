/**
 * 规则查看页面
 * @create by xxx on 2018-xx-xx
 * @description xx
 */
define(function (require, exports) {
    yufp.lookup.reg('CRUD_TYPE,COMMON_STATUS,QUESTION_CLASSIFY');
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {

        // 创建virtual model
        var vm = yufp.custom.vue({
            el: cite.el,
            data: {
                activeNames: ['1', '2'],
                ruleCollDtlsUrl: backend.consoleService+ "/api/tel/verif/grp/dtls",
                sRuleCollDtlParams: {},

                sRuleCollField: [{
                    columnCount: 2,
                    fields: [
                        {label: '问题模板组名称', field: 'tplGrpName'},
                        {label: '法人机构代码', field: 'legalOrgCode'},
                        {label: '创建日期', field: 'createTime'},
                        {label: '创建人', field: 'createUser'},
                        {
                            label: '状态',
                            field: 'status',
                            type: 'select',
                            dataCode: 'COMMON_STATUS'
                        }
                    ]
                }],

                sRuleCollDtlColumns: [
                    {
                        label: '问题类型',
                        prop: 'questionClassify',
                        dataCode: 'QUESTION_CLASSIFY',

                    },
                    {label: '选择问题条数', prop: 'choiceQuestNum'},
                    {
                        label: '通过率',
                        prop: 'passRate',
                        type:'num', formatter: function (money, num, cellValue) {
                            /*
                              * 参数说明：
                              * money：要格式化的数字
                              * num：保留几位小数
                              * */
//      num = num > 0 && num <= 20 ? num : 2;
                            if (cellValue != null && cellValue != '')
                                cellValue = parseFloat((cellValue + '')) + '%';
                            else
                                cellValue = '';
                            return cellValue;
                        }
                    }
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
                          method: 'POST',
                          url: backend.consoleService + '/api/tel/verif/grp/cfg/'+ data.tplGrpId,
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