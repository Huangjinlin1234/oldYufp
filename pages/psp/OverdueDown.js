/**
 * @create by xxx on 2018-xx-xx
 * @description xx
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.custom.vue({
        el: cite.el,
        data: function () {
        	var _self = this;
          return {
            queryFields: [
                { placeholder: '日期', field: 'createTime', type: 'date' }
              ],

              queryButtons: [
            	  { label: '下载文件', op: 'submit', type: 'primary',icon: 'exportFn',
            		  click: function (model) {
            			  var date = model.createTime;
            			  console.log();
            			  if (date=="" || date==null) {
//            				  _self.$message({message:'请选择日期！', type: 'warning'});
            				  _self.$confirm('请选择日期!', '提示', { confirmButtonText: '确定',showCancelButton:false, type: 'warning'});
                        	  return;
            			  }

                		  yufp.service.request({
                			  method: 'GET',
                			  url:backend.cusService+'/api/cus/queue/Query/' + date,
                			  callback: function (code, message, response) {
//                				  console.log(code);
//                				  console.log(message);
//                				  console.log(response);
                				  if (response.rows == 0) {
                					  _self.$confirm('操作成功!', '提示', { confirmButtonText: '确定',showCancelButton:false, type: 'success'});
                					  var downLoadUrl = backend.cusService + '/api/cus/queue/Overdue/'+ date;
                                      window.location.href = downLoadUrl;
                				  } else if(response.rows == -1) {
//                					  alert('操作失败!');
                					  _self.$confirm('操作失败！', '提示', { confirmButtonText: '确定',showCancelButton:false, type: 'error'});
                				  }else{
                					  //_self.$message('不存在当天文件夹！'); 
                					  _self.$confirm('不存在当天文件夹！', '提示', { confirmButtonText: '确定',showCancelButton:false, type: 'warning'});
                				  }
                			  }
                		  });
                   }  }
            		  
              ]
  
          }
        },
        methods: {
        	
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