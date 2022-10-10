/**
 * @create by szbd
 * @description 提额系数配置审批的前端js
 * @createDate 2018-09-17 15:10:09
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        //引入字典项
        yufp.lookup.reg('CRUD_TYPE,STD_ZB_REG_TYPE_REVENUE');
        yufp.custom.vue({
            el: cite.el,
            
            data: function() {
            	var _self = this;
            	return {
            		valiPagePluginData: true,
            	height: yufp.custom.viewSize().height - 120,
            	mainGrid:{
            		data:null,
            		loading:false
            	},
            	
            	paramType: null
            	
            	}
            },
            
            
            methods: {
                
//            	commitFn:function(){
//            		var _self = this;
//            		var data = {list:_self.mainGrid.data};
//            		var url = backend.consoleService +'/api/coeff/cfg/app/commit';
//            		if(data == null){
//            			_self.$message('操作失败！');
//            			return;
//            		};
//            		yufp.service.request({
//            			method:'POST',
//            			url:url,
//            			data:data,
//            			callback:function(code,message,response){
//            				if(code== 0){
//            					_self.$message('操作成功！');
//            					_self.reftable.resetFn();
//            				}else{
//            					_self.$message('操作失败！');
//            					
//            				}
//            			}
//            		});
//            	},
        	},
            
            mounted:function(){
            	var _self = this;
            	var url = backend.consoleService+'/api/coeff/cfg/appr';
            	_self.mainGrid.loading = true;
            	data
            	//绑定字典数据到某个指定对象上：调整类型的数组
                yufp.lookup.bind("STD_ZB_REG_TYPE_REVENUE", function (lookup) { 
                	_self.paramType = yufp.lookup.find("STD_ZB_REG_TYPE_REVENUE", false)
                	
                });
            	this.$nextTick(function(){
            		yufp.service.request({
            			method:'POST',
            			url:url,
            			callback:function(code,message,response){
            				_self.mainGrid.loading = false;
            				if(code == 0){
            					var responseData = response.data;
            					_self.mainGrid.data = responseData;
            					_self.coeffLoading = false;
            					
            				}else{
            					_self.$message(response.message);
            				}
            			}
            		});
            	});
            	data.children = this;
                var param = data.datas[data.dataKey];
            },
            
            
            
        });
    };
    // 消息处理
    exports.onmessage = function (type, message) {};
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {}
});
