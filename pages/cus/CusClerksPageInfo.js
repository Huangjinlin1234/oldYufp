/**
 * @author qiuyf
 * @since 2018-12-24
 * @description 关联人管理页面js
 */
define( function(require, exports) {
    
    exports.ready = function(hashCode, data, cite){
        yufp.lookup.reg('STD_ZB_CERT_TYP,REL_TYPE,WORKING_STATE');
        var vm = yufp.custom.vue({
        	el: cite.el,
            data: function(){
            	var _self = this;
                return {
                    tabName: 'first',
                    expandCollapseName: 'base',
                    
                    dataUrl: backend.cusService + "/api/cus/relChecks",
                    baseParams: {
                    	relRelation: '01'     //查询行员信息
                    },
                    queryFields: [
        	            { placeholder: '姓名', field: 'cusName', type: 'input' },
        	            { placeholder: '证件类型', field: 'certType', type: 'select', dataCode:'STD_ZB_CERT_TYP', datacodeFilter: function(options){
        	            	this.typeOptions = [];
        	            	for(var i=0; i<options.length; i++){
        	            		if(options[i].key === 'CN03' || options[i].key === 'HK01' || options[i].key === 'MO01' || options[i].key === 'TW01' || options[i].key === 'TW02'
        	            			|| options[i].key === '10100' || options[i].key === '10300' || options[i].key === '10900'){
        	            			this.typeOptions.push(options[i]);
        	            		}
        	            	}
        	            }  },
        	            { placeholder: '证件号码', field: 'certCode', type: 'input' }
                    ],
                    
                    tableColumns: [
                        { label: '姓名', prop: 'cusName', resizable: true, sortable: true},
                        { label: '证件类型', prop: 'certType', type:'select', dataCode:'STD_ZB_CERT_TYP', resizable: true, sortable: true},
                        { label: '证件号码', prop: 'certCode', sortable: true}/*,
                        { label: '在职状态', prop: 'sts', type:'select', dataCode:'WORKING_STATE',  sortable: true },
                        { label: '人员类别', prop: 'relType', type:'select', dataCode:'REL_TYPE',  sortable: true}*/
                        /*{ label: '银监会标准', prop: 'cbrcStandard'},*/
                    ],
                    
                    queryButtons: [
                        { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                            if (valid) {
                              _self.$refs.reftable.remoteData(model);
                            }
                          } },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
                    ],
                    
                    updateFields: [{
                    	columnCount: 3,
                        fields: [
                        	{ field: 'relSerno', label: '流水号'},
                            { field: 'cusName', label: '姓名' },
                            { field: 'relRelation', label: '关联关系', type:'select', dataCode:'REL_RELATION',hidden: true},
                            { field: 'certType', label: '证件类型', type:'select', dataCode:'STD_ZB_CERT_TYP'},
                            { field: 'certCode', label: '证件号码' },
                            { field: 'relType', label: '人员类别', type:'select', dataCode:'REL_TYPE' },
                            { field: 'sts', label: '在职状态', type:'select', dataCode:'WORKING_STATE' },
                            { field: 'createTime', label: '录入时间'}
                        ]
                    }],
                    
                    updateButtons: [
                    	{
                            label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.dialogVisible = false
                            }
                        }
                    ],
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    formDisabled: false,
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false)
                }
            }, // end of data: function()
            
            methods: {
                /**
                 * @param ctrlCode 操作码
                 */
                checkPermission: function (ctrlCode) {
                    return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
                },
                /**
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
                switchStatus: function (viewType, editable) {
                	var _self = this;
                	_self.viewType = viewType;
                	_self.updateButtons[0].hidden = editable;
                	_self.formDisabled = !editable;
                	_self.dialogVisible = true
                },
                
                infoFn: function () {
                	var _self = this;
                    if (_self.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return
                    }
                    this.switchStatus('DETAIL', false);
                    this.$nextTick(function () {
                        yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
                    })
                },

                exportFn: function () {
                    var _self = this;
                    var cusName=this.$refs.refQuery.fm.cusName;
                    var certType=this.$refs.refQuery.fm.certType;
                    var certCode=this.$refs.refQuery.fm.certCode;

                    this.$confirm('是否导出数据?', '提示').then(function () {
                        yufp.util.exportExcelByTable({
                            fileName: "行员信息",
                            importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                            ref: _self.$refs.reftable,
                            url: backend.cusService + '/api/cus/relChecks',
                            method:'POST',
                            param:{
                                cusName:cusName,
                                certType:certType,
                                certCode:certCode,
                                relRelation: '01',
                                exportFlag:'exp'
                            }
                        });
                    });
                },
                
            } // end of methods
            
        });
    }
    
    // 消息处理
    exports.onmessage = function (type, message) {

    };
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    }
});