/**
 * @create by szbd
 * @description {tableComments}的前端js
 * @createDate 2018-07-31 09:19:42
 */
define(['./custom/widgets/js/UserSelecter.js',
    './custom/widgets/js/PageableTable.js'],function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        //引入字典项
        yufp.lookup.reg('CRUD_TYPE,STD_ZB_PRELMT_STS');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
            var _self = this;
            return {
                baseParams: {
                },
                detParams: {

                },
                appUrl: backend.creditService +  '/api/lmt/prelist/handover/apps',
                detailUrl: backend.creditService + '/api/lmt/prelist/condition',
                alreadyUrl: backend.creditService + '/api/lmt/prelist/handover/conditionbypage',
                //搜索条件
                queryFields: [
                    {placeholder: '移交申请流水号', field: 'serno', type: 'input', hidden:true},
                    {placeholder: '申请日期', field: 'applyDate', type: 'input', hidden:true},
                    {placeholder: '移出人代码', field: 'handoverId', type: 'input'},
                    {placeholder: '移出机构代码', field: 'handoverBrId', type: 'input', hidden:true},
                    {placeholder: '接收人代码', field: 'receiverId', type: 'input'},
                    {placeholder: '接收机构代码', field: 'receiverBrId', type: 'input', hidden:true},
                    {placeholder: '移交原因', field: 'handoverReason', type: 'input', hidden:true},
                    {placeholder: '登记人代码', field: 'inputId', type: 'input', hidden:true},
                    {placeholder: '登记机构代码', field: 'inputBrId', type: 'input', hidden:true},
                    {placeholder: '创建时间', field: 'createTime', type: 'input', hidden:true},
                    {placeholder: '最后修改用户', field: 'lastUpdateUser', type: 'input', hidden:true},
                    {placeholder: '最后修改时间', field: 'lastUpdateTime', type: 'input', hidden:true}
                ],
                queryButtons: [
                    {label:'搜索', op: 'submit', type:'primary', icon:'search', click:function (model, valid) {
                        if (valid) {
                            _self.$refs.reftable.remoteData(model);
                        }
                    }},
                    {label:'重置', op:'reset', type:'primary', icon:'yx-loop2'}
                ],
                tableColumns: [
                    {label:'移交申请流水号', prop:'serno', sortable:false, resizable:true, hidden:true},
                    {label:'移出人代码', prop:'handoverId', sortable:false, resizable:true},
                    {label:'移出机构代码', prop:'handoverBrId', sortable:false, resizable:true},
                    {label:'接收人代码', prop:'receiverId', sortable:false, resizable:true},
                    {label:'接收机构代码', prop:'receiverBrId', sortable:false, resizable:true},
                    {label:'移交原因', prop:'handoverReason', sortable:false, resizable:true},
                    {label:'登记人代码', prop:'inputId', sortable:false, resizable:true},
                    {label:'登记机构代码', prop:'inputBrId', sortable:false, resizable:true},
                    {label:'申请日期', prop:'applyDate', sortable:false, resizable:true},
                    {label:'创建时间', prop:'createTime', sortable:false, resizable:true, hidden:true},
                    {label:'最后修改用户', prop:'lastUpdateUser', sortable:false, resizable:true, hidden:true},
                    {label:'最后修改时间', prop:'lastUpdateTime', sortable:false, resizable:true, hidden:true}
                ],
                detailQueryFields: [
                    {placeholder: '客户号', field: 'cusId', type: 'input'},
                    {placeholder: '客户名称', field: 'cusName', type: 'input' },
                    {placeholder: '移交人代码', field: 'cusManager', type: 'input', hidden: true },
                    {placeholder: '状态', field: 'status', type: 'input',value: "10','30",hidden: true }
                ],
                detailQueryButtons: [
                    {label:'搜索', op: 'submit', type:'primary', icon:'search', click:function (model, valid) {
                            if (valid) {
                                model.cusManager = _self.$refs.baseForm.formModel.handoverId;
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.creditService + '/api/lmt/prelist/cond',
                                    data: model,
                                    callback: function (code, message, response) {
                                        if ( response && response.success === true ) {
                                            var mydata = response.data;
                                            var cusDetailData = mydata;
                                            _self.detailTotalData = cusDetailData;
                                        } else {
                                            _self.$message({message: response.message, type: 'warning'});
                                        }
                                    }
                                });
                            }
                        }},
                    {label:'重置', op:'reset', type:'primary', icon:'yx-loop2'}
                ],
                detailColumns: [
                    {label:'客户号', prop:'cusId', sortable:false, resizable:true},
                    {label:'客户名称', prop:'cusName', sortable:false, resizable:true},
                    {label:'状态', prop:'status', sortable:false, resizable:true, dataCode: 'STD_ZB_PRELMT_STS',hidden: true},
                    {label:'移交业务说明', prop:'businessDetail', width: '240px'},
                    {label:'创建时间', prop:'createTime', width: '240px'}
                ],
                updateFields: [{
                    columnCount: 4,
                    fields: [
                        {field:'serno', label:'移交申请流水号', hidden: true},
                        {field:'handoverName', label:'移出人',type: 'custom', is:'div-user-selector',
                            selectFn: function (val, formModel, arguments){
                                formModel.handoverId = arguments[1].userCode;
                                formModel.handoverBrId = arguments[1].orgCode;
                                formModel.handoverBrName = arguments[1].orgName;
                            }, rules: [{ required: true, message: '请选择一个移出人', trigger: 'blur'}],
                            params: {
                                valid: function() {
                                    var value = _self.$refs.baseForm.formModel.receiverId;
                                    if(value == _self.$refs.baseForm.formModel.handoverName){
                                        _self.$message({ message: '移出人与接收人不能是同一人!', type: 'warning' });
                                        return false;
                                    }
                                    return true;
                                }
                            }},
                        {field:'handoverId', label:'移出人', hidden:true},
                        {field:'handoverBrId', label:'移出机构',hidden:true},
                        {field:'handoverBrName', label:'移出机构',disabled: true},
                        {field:'receiverName', label:'接收人',type: 'custom', is:'div-user-selector',
                            selectFn: function (val, formModel, arguments){
                                formModel.receiverId = arguments[1].userCode;
                                formModel.receiverBrId = arguments[1].orgCode;
                                formModel.receiverBrName = arguments[1].orgName;
                            }, rules: [{ required: true, message: '请选择一个接收人', trigger: 'blur'}],
                            params: {
                                valid: function() {
                                    var value = _self.$refs.baseForm.formModel.receiverName;
                                    if(value == _self.$refs.baseForm.formModel.handoverId){
                                        _self.$message({ message: '移出人与接收人不能是同一人!', type: 'warning' });
                                        return false;
                                    }
                                    return true;
                                }
                            }},
                        {field:'receiverId', label:'接收人', hidden:true},
                        {field:'receiverBrId', label:'接收机构',hidden:true},
                        {field:'receiverBrName', label:'接收机构',disabled: true},
                        {field:'inputId', label:'登记人',hidden:true,disabled: true},
                        {field:'inputName', label:'登记人',disabled: true},
                        {field:'inputBrId', label:'登记机构',hidden:true},
                        {field:'inputBrName', label:'登记机构',disabled: true},
                        {field:'applyDate', label:'申请日期',disabled: true},
                        {field:'createTime', label:'创建时间', hidden:true},
                        {field:'lastUpdateUser', label:'最后修改用户', hidden:true},
                        {field:'lastUpdateTime', label:'最后修改时间', hidden:true}
                    ]
                },{
                    columnCount: 2,
                    fields: [
                        { field:'handoverReason', label:'移交原因' ,type:'textarea',rows:4}
                    ]
                }],
                updateButtons: [
                    {label:'保存', type:'primary', icon:'check', hidden:false, click:function (model) {
                        var validate = false;
                        _self.$refs.reform.validate(function (valid) {
                            validate = valid;
                        });
                        if (!validate) {
                            return;
                        }
                        var rMethod = '';
                        if(_self.viewType == "EDIT") {
                            rMethod = 'PUT';
                        } else if(_self.viewType == "ADD") {
                            rMethod = 'POST';
                        }
                        yufp.service.request({
                            method: rMethod,
                            url: '/api/lmt/prelist/handover/app',
                            data: model,
                            callback: function (code, message, response) {
                                if (code == 0) {
                                    _self.$refs.reftable.remoteData();
                                    _self.$message('操作成功');
                                    _self.dialogVisible = false;
                                } else {
                                    _self.$message('操作失败');
                                }
                            }
                        });
                    }},{label:'取消', type:'primary', icon:'yx-undo2', hidden:false, click:function (model) {
                            _self.dialogVisible = false;
                        }}
                ],
                height: yufp.frame.size().height - 103,
                dialogVisible: false,
                formDisabled: false,
                viewType: 'DETAIL',
                viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                hoVisible: false,
                queryReset: true,
                hiddenBn: true,
                detailSelectTotalData: [],
                detailTotalData: []
                }
            },
            methods: {
                checkPermission: function(ctrlCode) {
                    return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
                },
                addFn: function () {
                    var _self = this;
                    _self.dialogVisible = true;
                    _self.hiddenBn = true;
                    this.$nextTick(function () {
                        _self.$refs.baseForm.resetFn();
                        _self.$refs.baseForm.switch('handoverName', 'disabled', false);
                        _self.$refs.baseForm.switch('receiverName', 'disabled', false);
                        _self.$refs.baseForm.switch('handoverReason', 'disabled', false);
                        _self.$refs.baseForm.rebuildFn();
                        var ob = {applyDate: yufp.session.OPENDAY, inputId: yufp.session.userId, inputName: yufp.session.userName,
                            inputBrId: yufp.session.org.orgCode, inputBrName: yufp.session.org.orgName};
                        yufp.util.copyObj(_self.$refs.baseForm.formModel, ob);
                        _self.detailSelectTotalData = [];
                    });
                },
                commitFn: function() {
                    var _self = this;
                    var validate = false;
                    if (this.detailSelectTotalData.length <= 0) {
                        this.$message({ message: '请先选择需要移交的客户!', type: 'warning' });
                        return;
                    }
                    this.$refs.baseForm.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    for(var i = 0; i < _self.detailSelectTotalData.length; i++){
                        _self.detailSelectTotalData[i].businessDetail = '客户:' + _self.detailSelectTotalData[i].cusName + '由[' +  _self.$refs.baseForm.formModel.handoverBrId
                        + ']的' + _self.$refs.baseForm.formModel.handoverId + '移交给[' + _self.$refs.baseForm.formModel.receiverBrId + ']的' + _self.$refs.baseForm.formModel.receiverId;
                    }
                    yufp.service.request({
                        method: 'POST',
                        url: backend.creditService + '/api/lmt/prelist/handover/appandlst',
                        data: {lmtPrelistHandoverLstVO: _self.$refs.baseForm.formModel, lmtPrelistHandoverLstVOList: _self.detailSelectTotalData},
                        callback: function (code, message, response) {
                            var data = response.data;
                            if (response.success == true) {
                                _self.$message({message: '操作成功!', type: 'success'});
                            } else{
                                _self.$message({message: response.message, type: 'warning'});
                            }
                            _self.$refs.reftable.remoteData();
                            _self.dialogVisible = false;
                        }
                    });
                },
                handDetailFn: function() {
                    var _self = this;
                    if(typeof(_self.$refs.baseForm) == 'undefined'  || _self.$refs.baseForm.formModel.handoverId == null
                        || _self.$refs.baseForm.formModel.handoverId == ''){
                        _self.$message('请先选择一个移出人');
                        return;
                    }else{
                        _self.hoVisible = true;
                        _self.queryReset = false;
                        this.$nextTick(function () {
                            _self.queryReset = true;
                            _self.detailTotalData = [];
                            yufp.service.request({
                                method: 'POST',
                                url: backend.creditService + '/api/lmt/prelist/cond',
                                data: {cusManager: _self.$refs.baseForm.formModel.handoverId, status: "10','30"},
                                callback: function (code, message, response) {
                                    if ( response && response.success === true ) {
                                        var mydata = response.data;
                                        var cusDetailData = mydata;
                                        if(_self.detailSelectTotalData.length > 0 && cusDetailData.length > 0){
                                            for(var i=0; i < _self.detailSelectTotalData.length; i++){
                                                for(var j=0; j < cusDetailData.length; j++){
                                                    if(_self.detailSelectTotalData[i].cusId == cusDetailData[j].cusId){
                                                        cusDetailData.splice(j, 1);
                                                    }
                                                }
                                            }
                                            _self.detailTotalData = _self.detailTotalData.concat(cusDetailData);
                                        }else{
                                            _self.detailTotalData = _self.detailTotalData.concat(cusDetailData);
                                        }
                                    } else {
                                        _self.$message({message: response.message, type: 'warning'});
                                    }
                                }
                            });
                        });
                    }
                },
                confirmFn: function() {
                    var _self = this;
                    this.$nextTick(function () {
                        _self.detailSelectTotalData = _self.detailSelectTotalData.concat(_self.$refs.detailTable.selections);
                        _self.hoVisible = false;
                    });
                },
                deleteAppFn: function() {
                    var _self = this;
                    this.$nextTick(function () {
                        var selects = _self.$refs.detailSelectTable.selections;
                        if(selects.length > 0){
                            for(var i = 0; i < selects.length; i++){
                                for(var j = 0; j < _self.detailSelectTotalData.length; j++){
                                    if(selects[i] == _self.detailSelectTotalData[j]){
                                        _self.detailSelectTotalData.splice(j, 1);
                                    }
                                }
                            }
                        }else{
                            _self.$message({message:'请选择一条数据!', type: 'warning'});
                        }
                    });
                },
                infoFn: function() {
                    var _self = this;
                    if(_self.$refs.reftable.selections.length <= 0){
                        _self.$message({message: '请选择一条数据!', type: 'warning'});
                        return;
                    }else{
                        _self.dialogVisible = true;
                        _self.hiddenBn = false;
                        _self.detailSelectTotalData = [];
                        _self.$nextTick(function () {
                            _self.$refs.baseForm.switch('handoverName', 'disabled', true);
                            _self.$refs.baseForm.switch('receiverName', 'disabled', true);
                            _self.$refs.baseForm.switch('handoverReason', 'disabled', true);
                            _self.$refs.baseForm.rebuildFn();
                            yufp.service.request({
                                method: 'POST',
                                url: backend.creditService + '/api/lmt/prelist/handover/lstcondition',
                                data: {serno: _self.$refs.reftable.selections[0].serno},
                                callback: function (code, message, response) {
                                    if ( response && response.success === true ) {
                                        var mydata = response.data;
                                        var cusDetailData = mydata;
                                        _self.detailSelectTotalData = _self.detailSelectTotalData.concat(cusDetailData);
                                    } else {
                                        _self.$message({message: response.message, type: 'warning'});
                                    }
                                }
                            });
                            yufp.service.request({
                                method: 'GET',
                                url: backend.creditService + '/api/lmt/prelist/handover/app/' + _self.$refs.reftable.selections[0].serno,
                                data: '',
                                callback: function (code, message, response) {
                                    if ( response && response.success === true ) {
                                        var mydata = response.data;
                                        yufp.extend(_self.$refs.baseForm.formModel, mydata);
                                    } else {
                                        _self.$message({message: response.message, type: 'warning'});
                                    }
                                }
                            });

                        });
                    }
                },
                closeFn: function () {
                   this.dialogVisible = false;
                },
                detCloseFn: function () {
                    this.hoVisible = false;
                }
            },
            watch: {

            }
        });
    };
    exports.onmessage = function (type, message) {};
    exports.destroy = function (id, cite) {}
});
