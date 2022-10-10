/**
 * @create by fuzm on 2018-06-23
 * @description 产品规则关联信息表
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, exportData, cite) {
      yufp.lookup.reg('CRUD_TYPE,RULE_TYPE');
      var vm = yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            baseParams: {
            },
            height: yufp.frame.size().height - 103,
            mainGrid: {
                data: [],
                deleteData: [],
                loading: false
            },
            
            ruleType: yufp.lookup.find('RULE_TYPE', false),
            ruleDtlDiaVis: false
          }
        },
        mounted: function() {
        	this.queryApplyRule();
        },
        methods: {
            queryApplyRule: function() {
            	 var _self = this;
            	 //发起请求
                 yufp.service.request({
                    method: 'POST',
                    url: backend.consoleService + '/api/prd/rule/relsByPrdId',
                    data: {
                        prdId: exportData != null ? exportData.prdId : null
                    },
                    callback: function (code, message, response) {
                        _self.mainGrid.data = response.data;
                        _self.mainGrid.loading = false;
                    }
                 });
            },
            lookRuleDtl: function (scope){
		        var obj = scope.row;
		        this.ruleDtlDiaVis = true;
		        this.$nextTick(function() {
		            yufp.router.to('RULE_PrdLookRuleDtl', obj, 'prdRuleDtl');
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
