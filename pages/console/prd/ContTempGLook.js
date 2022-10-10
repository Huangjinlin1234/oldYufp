/**
 * @create by xxx on 2018-07-16
 * @description 查看合同模版组详细
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,CONT_TEMP_TYPE,CONT_TYPE,COMMON_STATUS,STD_ZX_YES_NO');
        // 创建virtual model
        var vm = yufp.custom.vue({
            el: cite.el,
            data: function (){
              var _self = this; 
            	return {
            		activeNames: ['1', '2'],
            		contTempInfosUrl: backend.consoleService + '/api/cont/temp/info/contGLinked',
            		contTempGField: [{
                    columnCount: 2,
                    fields: [
                      { field: 'contGroupName', label: '模版组名称' },
                    	{ field: 'contGroupId', label: '合同组ID', placeholder: '系统自动生成', disabled: true, hidden: true },
                      { field: 'status', label: '状态', type: 'select', dataCode: 'COMMON_STATUS' },
                      { field: 'legalOrgCode', label: '法人机构码' },
                      { field: 'createUser', label: '创建人' },
                      { field: 'createTime', label: '创建日期' },
                      { field: 'lastUpdateUser', label: '最后更新人' },
                      { field: 'lastUpdateTime', label: '最后更新时间' }
                    ]
                 }],
            		contTempInfoColumns: [
                  /*{ label: '合同模板ID', prop: 'contTempId',  resizable: true },*/
                  { label: '合同模板名称', prop: 'contTempName', sortable: true, resizable: true },
                  { label: '模板种类', prop: 'contTempType', resizable: true, dataCode: 'CONT_TEMP_TYPE' },
                  { label: '模板文件名', prop: 'contTempPath', resizable: true },
                  { label: '合同类型', prop: 'contType', resizable: true, dataCode: 'CONT_TYPE' },
                  { label: '是否最高额合同', prop: 'maxLmtContFlag', resizable: true, dataCode: 'STD_ZX_YES_NO' },
                  { label: '状态', prop: 'status', resizable: true, dataCode: 'COMMON_STATUS' }
                ]
            	};
            },
            methods: {
            },
            mounted: function () {
                if ( typeof(data) != 'undefined' && data != null ) {
                    var _self = this;
                    this.$nextTick(function (){
                        yufp.service.request({
                          method: 'GET',
                          url: backend.consoleService + '/api/cont/temp/g/' + data.contGroupId,
                          callback: function (code, message, response) {
                            if ( response &&  response.success == true) {
                              var contObj = response.data; 
                              yufp.extend(_self.$refs.contTempGForm.formModel, contObj);
                              _self.$refs.contTempInfoTable.remoteData(contObj);
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