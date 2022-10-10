
/**
 * @create by ligm on 2019-01-03
 * @description
 */
define([
    './custom/widgets/js/PrdIdInfoSelector.js',
    './custom/widgets/js/OrgSelector.js'
],function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('APRV_STATUS,CRUD_TYPE,COLLT_TASK_STATUS,STD_ZB_ACC_STATUS,STD_ZB_CERT_TYP,APPLY_CHANNEL_TYPE,COLLT_OUTS_TASK_STS,STD_COLLT_WAY');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    dataURL: backend.riskmService + '/api/collt/write/off/apps',
                    dataURL2: backend.riskmService + '/api/collt/write/off/app/query',
                    expandCollapseName: ['1','4','2','3'],
                    baseTab: 'baseTab',
                    baseParams: {},
                    createbaseParams: {},
                    mytableParams:{},
                    queryFields: [
                        { placeholder: '流水号', field: 'bizSerno', type: 'input'},
                        { placeholder: '任务编号', field: 'colltTaskNo', type: 'input'},
                        { placeholder: '客户编号', field: 'cusId', type: 'input' },
                        { placeholder: '客户名称', field: 'cusName', type: 'input' },
                        { placeholder: '任务状态', field: 'taskSts',type: 'select', dataCode: 'COLLT_TASK_STATUS',
                            datacodeFilter:function(options){
                                this.typeOptions = [];
                                for(var i=0; i<options.length; i++){
                                    if(options[i].key == '01' || options[i].key == '02'){
                                        this.typeOptions.push(options[i]);
                                    }
                                }
                            } },
                    ],

                    updateFields: [{
                        columnCount: 3,
                        fields: [
                            {field: 'bizSerno', label: '流水号', disabled: true, hidden:true},
                            {field: 'colltTaskNo', label: '任务编号', disabled: true, hidden:true},
                            {field: 'cusId', label: '客户编号', disabled: true, hidden:true},
                            {field: 'cusName', label: '客户名称', disabled: true, hidden:true},
                            {field: 'certType', label: '证件类型', disabled: true, hidden:true},
                            {field: 'certCode', label: '证件号码', disabled: true, hidden:true},
                            {field: 'contNo', label: '合同编号', disabled: true, hidden:true},
                            {field: 'loanNo', label: '借据编号', disabled: true, hidden:true},
                            {field: 'channelCode', label: '渠道名称', disabled: true, hidden:true},
                            {field: 'prdName', label: '产品名称', disabled: true, hidden:true},
                            {field: 'loanAmount', label: '借据金额', disabled: true, hidden:true},
                            {field: 'overLmt', label: '逾期金额', disabled: true, hidden:true},
                            {field: 'overDays', label: '逾期天数', disabled: true, hidden:true},
                            {field: 'loanStartDate', label: '借据起始日', disabled: true, hidden:true},
                            {field: 'loanEndDate', label: '借据到期日', disabled: true, hidden:true},
                            {field: 'prdName', label: '借据状态', disabled: true, hidden:true},
                            {field: 'prdName', label: '任务状态', disabled: true, hidden:true},
                            {field: 'inputDate', label: '登记日期', disabled: true},
                        ] },{
                        columnCount: 1,
                        fields:[{field: 'writeOffReason', label: '核销原因', disabled: false, type: 'textarea',maxlength:100,rows:3,rules: [{required: true, message: '核销原因是必填项'}]}]
                        }],
                    queryButtons: [
                        { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    _self.$refs.reftable.remoteData(model);
                                }
                            } },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
                    ],

                    tableColumns: [
                        { label: '流水号', prop: 'bizSerno', sortable: true, resizable: true },
                        { label: '任务编号', prop: 'colltTaskNo', sortable: true, resizable: true },
                        { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
                        { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
                        { label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode: 'STD_ZB_CERT_TYP' },
                        { label: '证件号码', prop: 'certCode', sortable: true, resizable: true },
                        { label: '合同编号', prop: 'contNo', sortable: true, resizable: true, hidden:true },
                        { label: '借据编号', prop: 'loanNo', sortable: true, resizable: true },
                        { label: '渠道名称', prop: 'channelCode', sortable: true, resizable: true, dataCode: 'APPLY_CHANNEL_TYPE' },
                        { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
                        { label: '借据金额', prop: 'loanAmount', sortable: true, resizable: true },
                        { label: '逾期金额', prop: 'overLmt', sortable: true, resizable: true },
                        { label: '逾期天数', prop: 'overDays', sortable: true, resizable: true },
                        { label: '借据起始日', prop: 'loanStartDate', sortable: true, resizable: true },
                        { label: '借据到期日', prop: 'loanEndDate', sortable: true, resizable: true },
                        { label: '借据状态', prop: 'accountStatus', sortable: true, resizable: true, dataCode: 'STD_ZB_ACC_STATUS' },
                        { label: '任务状态', prop: 'taskSts', sortable: true,resizable: true,dataCode: 'COLLT_TASK_STATUS' },
                        { label: '审批状态', prop: 'aprvStatus', sortable: true,resizable: true,dataCode: 'APRV_STATUS' }
                    ],

                    baseParams2: {},
                    tableColumns2: [
                        {label: '任务编号', prop: 'colltTaskNo', sortable: true, resizable: true},
                        {label: '催收方式', prop: 'colltWay', sortable: true, resizable: true, dataCode: 'STD_COLLT_WAY'},
                        {label: '客户编号', prop: 'cusId', sortable: true, resizable: true},
                        {label: '客户名称', prop: 'cusName', sortable: true, resizable: true},
                        {label: '借据编号', prop: 'loanNo', sortable: true, resizable: true},
                        {
                            label: '还款金额', prop: 'repayLmt', sortable: true, resizable: true,
                            formatter: function (row, column, cellValue) {
                                if (!row.repayLmt) {
                                    return row.repayLmt;
                                } else {
                                    return yufp.util.moneyFormatter(row.repayLmt, 2);
                                }
                            }
                        },
                        {label: '还款日期', prop: 'repayDate', sortable: true, resizable: true},
                        {label: '任务状态', prop: 'taskSts', sortable: true, resizable: true, dataCode: 'COLLT_OUTS_TASK_STS'},
                        {label: '催收结果备注', prop: 'colltResRemark', sortable: true, resizable: true},
                        {label: '操作员', prop: 'opUserCode', sortable: true, resizable: true},
                        {label: '操作员所属机构', prop: 'opOrgCode', sortable: true, resizable: true}
                    ],
                    queryFields1: [
                        { placeholder: '任务编号', field: 'colltTaskNo', type: 'input'},
                        { placeholder: '客户编号', field: 'cusId', type: 'input' },
                        { placeholder: '客户名称', field: 'cusName', type: 'input' },
                        { placeholder: '任务状态', field: 'taskSts',type: 'select', dataCode: 'COLLT_TASK_STATUS',
                            datacodeFilter:function(options){
                                this.typeOptions = [];
                                for(var i=0; i<options.length; i++){
                                    if(options[i].key == '01' || options[i].key == '02'){
                                        this.typeOptions.push(options[i]);
                                    }
                                }
                            } },
                    ],
                    queryButtons1: [
                        { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    _self.$refs.createreftable.remoteData(model);
                                }
                            } },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
                    ],
                    createtableColumns: [
                        { label: '流水号', prop: 'bizSerno', sortable: true, resizable: true,hidden:true },
                        { label: '任务编号', prop: 'colltTaskNo', sortable: true, resizable: true },
                        { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
                        { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
                        { label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode: 'STD_ZB_CERT_TYP' },
                        { label: '证件号码', prop: 'certCode', sortable: true, resizable: true },
                        { label: '合同编号', prop: 'contNo', sortable: true, resizable: true, hidden:true },
                        { label: '借据编号', prop: 'loanNo', sortable: true, resizable: true },
                        { label: '渠道名称', prop: 'channelCode', sortable: true, resizable: true, dataCode: 'APPLY_CHANNEL_TYPE' },
                        { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
                        { label: '借据金额', prop: 'loanAmount', sortable: true, resizable: true },
                        { label: '逾期金额', prop: 'overLmt', sortable: true, resizable: true },
                        { label: '逾期天数', prop: 'overDays', sortable: true, resizable: true },
                        { label: '借据起始日', prop: 'loanStartDate', sortable: true, resizable: true },
                        { label: '借据到期日', prop: 'loanEndDate', sortable: true, resizable: true },
                        { label: '借据状态', prop: 'accountStatus', sortable: true, resizable: true, dataCode: 'STD_ZB_ACC_STATUS' },
                        { label: '任务状态', prop: 'taskSts', sortable: true,resizable: true,dataCode: 'COLLT_TASK_STATUS', hidden:true }
                    ],

                    /** 附件上传*/
                    dataUrlAnnex: backend.riskmService + '/api/mon/relief/ann',
                    baseParamsAnnex:{},
                    tableColumnsAnnex:[
                        { label: '核销申请流水号', prop: 'flowAppNo', sortable: true, resizable: true },
                        { label: '借据号', prop: 'bizSerno', sortable: true, resizable: true ,hidden:true},
                        { label: '附件名称', prop: 'annexName', sortable: true, resizable: true },
                        { label: '附件描述', prop: 'annexDesc', sortable: true, resizable: true },
                        { label: '上传人', prop: 'uploadUser', sortable: true, resizable: true },
                        { label: '上传时间', prop: 'uploadTime', sortable: true, resizable: true },
                        { label: '最后更新人', prop: 'lastUploadUser', sortable: true, resizable: true },
                        { label: '最后更新时间', prop: 'lastUploadTime', sortable: true, resizable: true }
                    ],
                    annexInfoFields: [
                        {
                            columnCount: 2,
                            fields: [
                                {field: 'fileSignCode', label: '', disabled: true, hidden: true},
                                {field: 'flowAppNo', label: '核销申请流水号', disabled: true,
                                    rules: [{required: true, message: '必填项', trigger: 'blur'}]
                                },
                                {field: 'uploadUser', label: '上传人', disabled: true,
                                    rules: [{required: true, message: '必填项', trigger: 'blur'}]
                                },
                                {field: 'bizSerno', label: '借据号', disabled: true, type:'textarea',hidden: true
                                },
                                {field: 'uploadTime', label: '上传时间', disabled: true, hidden: true},
                                {field: 'lastUploadUser', label: '最后更新人', disabled: true, hidden: true},
                                {field: 'lastUploadTime', label: '最后更新时间', disabled: true, hidden: true},
                            ]
                        },
                        {
                            columnCount: 2,
                            fields: [
                                {field: 'uploadTime', label: '上传时间', disabled: true, hidden: true},
                                {field: 'lastUploadUser', label: '最后更新人', disabled: true, hidden: true},
                                {field: 'lastUploadTime', label: '最后更新时间', disabled: true, hidden: true},
                                { field: 'annexName', label: '附件名称', type:'textarea', rows: 1,
                                    rules: [{required: true, message: '必填项', trigger: 'blur'}]
                                }
                            ]
                        },
                        {
                            columnCount: 1,
                            fields: [
                                { field: 'annexDesc', label: '附件描述', type:'textarea', rows: 3
                                }
                            ]
                        }
                    ],
                    annexFormDisabled: false,
                    dialogVisibleAnnex: false,
                    flag: '',

                    height: yufp.frame.size().height - 103,
                    fullscreenLoading:false,
                    formDisabled: false,
                    dialogVisible:false,
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false)
                }
            },
            methods: {
                /**
                 * @param ctrlCode 操作码
                 */
                checkPermission: function(ctrlCode) {
                    return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
                },
                /**
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
                switchStatus: function (viewType, editable) {
                    var _self = this;
                    _self.viewType = viewType;
                    _self.dialogVisible = true;
                    _self.formDisabled = !editable;
                    _self.$nextTick(function () {
                        if(this.viewType == "ADD"){
                            this.$refs.basecollapse.$children[0].$el.hidden = false;
                            this.$refs.basecollapse.$children[1].$el.hidden = true;
                            this.$refs.basecollapse.$children[2].$el.hidden = false;
                            this.$refs.basecollapse.$children[3].$el.hidden = false;
                        }else{
                            this.$refs.basecollapse.$children[0].$el.hidden = true;
                            this.$refs.basecollapse.$children[1].$el.hidden = false;
                            this.$refs.basecollapse.$children[2].$el.hidden = false;
                            this.$refs.basecollapse.$children[3].$el.hidden = false;
                        }
                    });
                },
                addFn: function () {
                    var _self = this;
                    _self.switchStatus('ADD', true);
                    _self.$nextTick(function () {
                        _self.clearFn();
                        _self.$refs.createreftable.remoteData();
                        var myDate = new Date();
                        var month = myDate.getMonth()+1;
                        var day = myDate.getDate()
                        _self.$refs.baseRef.formModel.inputDate = myDate.getFullYear()+"-"+(month<10?"0"+month:month)+"-"+(day<10?"0"+day:day);
                    });
                },
                modifyFn: function () {
                    var _self = this;
                    if (_self.$refs.reftable.selections.length != 1) {
                        _self.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var obj = _self.$refs.reftable.selections[0];
                    if (obj.aprvStatus != '01' && obj.aprvStatus != '05'){
                        this.$message({ message: '审批状态为“待发起”、“退回”才可修改', type: 'warning' });
                        return;
                    };
                    _self.mytableParams = {bizSerno : obj.bizSerno};
                    _self.baseParamsAnnex = {flowAppNo : obj.bizSerno,bizSerno : obj.bizSerno};
                    _self.switchStatus('EDIT', true);
                    _self.$nextTick(function () {
                        _self.clearFn();
                        _self.$refs.mytable.remoteData(_self.mytableParams);
                        _self.$refs.reftableAnnex.remoteData(_self.baseParamsAnnex);
                        yufp.extend(_self.$refs.baseRef.formModel, obj);
                    });
                },
                cancleAnnesFn:function () {
                    var _self = this;
                    _self.uploadDialogVisible = false;
                    _self.$nextTick(function () {
                        _self.$refs.annexForm.resetFn();
                    });
                },
                saveFn:function () {
                    var _self = this;
                    var validate = false;
                    this.$refs.baseRef.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    var obj = this.$refs.baseRef.formModel;
                    var rdata = '';
                    var rmethod = '';
                    if(_self.viewType == "ADD"){
                        rmethod = 'POST';
                        var bizSerno = '';
                        if (_self.$refs.reftableAnnex.data.length>0) {
                            bizSerno = _self.$refs.reftableAnnex.data[0].flowAppNo;
                        }
                        var selections = _self.$refs.createreftable.selections;
                        if (selections.length < 1) {
                            _self.$message({
                                message: '请先选择数据！',
                                type: 'warning'
                            });
                            return;
                        }
                        var len = selections.length, arr = [];
                        for (var i = 0; i < len; i++) {
                            selections[i].bizSerno = bizSerno;
                            selections[i].inputDate = obj.inputDate;
                            selections[i].writeOffReason = obj.writeOffReason;
                        }
                        rdata = JSON.stringify(selections);
                    }else if(_self.viewType == "EDIT"){
                        rmethod = 'PUT';
                        rdata = obj;
                    }
                    yufp.service.request({
                        method: rmethod,
                        url: backend.flowService + '/api/collt/write/off/app',
                        data: rdata,
                        callback: function (code, message, response) {
                            if (code == 0 && response.code == 0) {
                                _self.dialogVisible = false;
                                _self.$message({
                                    message: '处理成功!',
                                    type: 'success'
                                });
                                _self.$refs.reftable.remoteData();
                            } else{
                                _self.$message('操作失败，'+response.message);
                                _self.$refs.reftable.remoteData();
                            }
                            _self.dialogVisible = false;
                            _self.clearFn();
                        }
                    });
                },
                submitFn:function () {
                    var _self = this;
                    var validate = false;
                    this.$refs.baseRef.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    var obj = this.$refs.baseRef.formModel;
                    var rdata = '';
                    var rmethod = '';
                    if(_self.viewType == "ADD"){
                        var bizSerno = '';
                        if (_self.$refs.reftableAnnex.data.length>0) {
                            bizSerno = _self.$refs.reftableAnnex.data[0].flowAppNo;
                        }
                        rmethod = 'POST';
                        var selections = _self.$refs.createreftable.selections;
                        if (selections.length < 1) {
                            _self.$message({
                                message: '请先选择数据！',
                                type: 'warning'
                            });
                            return;
                        }
                        var len = selections.length, arr = [];
                        for (var i = 0; i < len; i++) {
                            selections[i].bizSerno = bizSerno;
                            selections[i].inputDate = obj.inputDate;
                            selections[i].writeOffReason = obj.writeOffReason;
                        }
                        rdata = JSON.stringify(selections);
                    }else if(_self.viewType == "EDIT"){
                        rmethod = 'PUT';
                        rdata = obj;
                    }
                    yufp.service.request({
                        method: rmethod,
                        url: backend.flowService + '/api/collt/write/off/app/submit',
                        data: rdata,
                        callback: function (code, message, response) {
                            if (code == 0 && response.code == 0) {
                                _self.dialogVisible = false;
                                _self.$message({
                                    message: '处理成功!',
                                    type: 'success'
                                });
                                _self.$refs.reftable.remoteData();
                            } else{
                                _self.$message('操作失败，'+response.message);
                                _self.$refs.reftable.remoteData();
                            }
                            _self.dialogVisible = false;
                            _self.clearFn();
                        }
                    });
                },
                returnFn:function () {
                    var _self = this;
                    _self.dialogVisible = false;
                    _self.clearFn();
                },
                clearFn:function () {
                    var _self = this;
                    _self.$refs.form1.fm.colltTaskNo='';
                    _self.$refs.form1.fm.cusId='';
                    _self.$refs.form1.fm.cusName='';
                    _self.$refs.form1.fm.taskSts='';
                    _self.$refs.createreftable.data=[];
                    _self.$refs.mytable.data=[];
                    _self.$refs.reftableAnnex.data=[];
                    _self.$refs.baseRef.resetFields();
                },

                uploadAnnexFile: function (item,bizSerno) {
                    var _self = this;
                    var date = yufp.util.dateFormat(new Date().getTime(), '{y}{m}{d}');
                    this.postWindow(bizSerno,date,item);
                    /*window.open('http://yx.tcyl.gzb.com:7001/SunIAS/SunIASRequestServlet.do?UID=LOANAdmin&PWD=LOANAdmin123&AppID=LOAN&UserID=' + yufp.session.userId + '&UserName=' + yufp.session.userName
                        + '&OrgID=' + yufp.session.org.orgCode + '&OrgName=' + yufp.session.org.orgName + '&info1=BUSI_SERIAL_NO:' + bizSerno + ';' + 'OBJECT_NAME:LOAN_DOC;' +
                        'QUERY_TIME:' + date + ';' + 'FILELEVEL:1;RIGHT:' + item, '_blank');*/
                },
                uploadAnnexFn: function () {
                    var _self = this;
                    _self.dialogVisibleAnnex = true;
                    _self.annexFormDisabled = false;
                    _self.flag = '';
                    var size  = _self.$refs.reftableAnnex.data.length;
                    this.$nextTick(function () {
                        _self.$refs.annexForm.resetFn();
                        if('EDIT' == _self.viewType){
                            var obj = _self.$refs.reftable.selections[0];
                            var bizSerno = obj.bizSerno;
                            yufp.extend(_self.$refs.annexForm.formModel,
                                {flowAppNo:bizSerno},
                                {bizSerno:bizSerno},
                                {uploadUser:yufp.session.userCode});
                        }else if('ADD' == _self.viewType && size>0){
                            var data = _self.$refs.reftableAnnex.data;
                            var bizSerno = data[0].flowAppNo;
                            yufp.extend(_self.$refs.annexForm.formModel,
                                {flowAppNo:bizSerno},
                                {bizSerno:bizSerno},
                                {uploadUser:yufp.session.userCode});
                        }else{
                            var selections = _self.$refs.createreftable.selections;
                            yufp.extend(_self.$refs.annexForm.formModel,
                                    {uploadUser:yufp.session.userCode});
                            _self.$refs.annexForm.switch('flowAppNo', 'hidden', true);
                        }
                    });
                },
                saveAnnexFn:function () {
                    var _self = this;
                    var validate = false;
                    _self.$refs.annexForm.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    var rMethod = '';
                    var msg = '';
                    var right = '';
                    if (_self.$refs.annexForm.formModel.flowAppNo != '' && _self.$refs.annexForm.formModel.flowAppNo != null) {
                    // if (_self.annexViewType == 'UPDATEANN') {
                        rMethod = 'PUT';
                        msg = "此操作将保存修改的数据,且保存本地记录后将前往影像平台修改影像资料，是否继续？"
                    } else /*if (_self.annexViewType == 'NEWANN') */{
                        rMethod = 'POST';
                        msg = "此操作将保存数据,且保存本地记录后将前往影像平台新增影像资料，是否继续？"
                    }
                    right = '1100000';
                    var cmisdata = {};
                    yufp.extend(cmisdata, _self.$refs.annexForm.formModel);
                    _self.$confirm(msg, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: rMethod,
                                    url: backend.riskmService + '/api/s/mon/reliefAnn/msg/cwoa',
                                    data: cmisdata,
                                    callback: function (code, message, response) {
                                        if (response.code == 0) {
                                            if (rMethod == 'POST'){
                                                var dat = response.rows;
                                                _self.baseParamsAnnex = { flowAppNo : dat , bizSerno : dat };
                                            }
                                            else if (rMethod == 'PUT'){
                                                var dae = _self.$refs.annexForm.formModel.flowAppNo;
                                                _self.baseParamsAnnex = { flowAppNo : dae , bizSerno : dae };
                                            }
                                            _self.$refs.reftableAnnex.remoteData(_self.baseParamsAnnex);
                                            _self.dialogVisibleAnnex = false;
                                            _self.uploadAnnexFile(right,_self.baseParamsAnnex.bizSerno);
                                        } else {
                                            _self.$message(response.message);
                                        }
                                    }
                                });
                            }
                        }
                    });
                },

                infoAnnexFn: function () {
                    var _self = this;
                    if (this.$refs.reftableAnnex.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var right = '0100000';
                    _self.dialogVisibleAnnex = true;
                    _self.annexFormDisabled = true;
                    _self.flag = 'VIEWINFO';
                    var obj = _self.$refs.reftableAnnex.selections[0];
                    _self.$nextTick(function () {
                        _self.$refs.annexForm.resetFn();
                        yufp.extend(_self.$refs.annexForm.formModel,obj);
                    });
                    _self.$confirm('将前往影像平台查看影像资料，是否继续？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                var date = obj.uploadTime.slice(0,10).replace(/\-/g,"");
                                _self.postWindow(obj.flowAppNo,date,right);
                            }
                        }
                    });
                },

                postWindow: function(reliefAppNo,date,item){
                    yufp.service.request({
                        method: 'POST',
                        url: backend.edocService + "/api/doEncode",
                        data: {
                            applySeq : reliefAppNo,
                            sessionUserId: yufp.session.userId,
                            sessionUserName: yufp.session.userName,
                            sessionOrgCode: yufp.session.org.orgCode,
                            sessionOrgName: yufp.session.org.orgName,
                            startDate : date,
                            rightCode : item
                        },
                        callback: function (code, message, response) {
                            var row = response.rows;
                            if (code == 0 && response.code == 0) {
                                // row 为加密后的完整url请求
                                window.open(row,'_blank');
                            } else {
                                this.$message("获取影像系统信息失败：" + response.message);
                            }
                        }
                    });
                },



                cancleAnnesFn:function () {
                    var _self = this;
                    _self.dialogVisibleAnnex = false;
                    _self.$nextTick(function () {
                        _self.$refs.annexForm.resetFn();
                    });
                },

                exportFn: function () {
                    var _self = this;
                    var obj = _self.$refs.createreftable.selections[0];
                    if (_self.$refs.createreftable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _self.$confirm('是否导出该客户名下的所有逾期超过180天的借据信息?', '提示').then(function () {
                        _self.fullscreenLoading = true;
                        _self.exportAccloanInfos(obj);
                        // _self.exportColltRcds(obj);
                    })
                },  // end of exportFn
                exportAccloanInfos:function (obj) {
                    var _self = this;
                    yufp.util.exportExcelByTable({
                        fileName: obj.cusName + '(' + obj.cusId + ')' + '名下的逾期超过180天借据信息',
                        importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                        ref: _self.$refs.createreftable,
                        url: backend.riskmService + '/api/acc/loan/overdue',
                        method:'POST',
                        param:{
                            cusId: obj.cusId,
                            exportFlag: 'exp'
                        }
                    });
                    _self.fullscreenLoading = false;
                }/*,
                exportColltRcds:function (obj) {
                    var _self = this;
                    yufp.util.exportExcelByTable({
                        fileName: obj.cusName + '(' + obj.cusId + ')' + '名下的逾期超过180天借据信息的催收结果',
                        importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                        ref: _self.$refs.reftable2,
                        url: backend.riskmService + '/api/collt/res/record/infos',
                        method:'POST',
                        param:{
                            cusId: obj.cusId,
                            exportFlag: 'exp'
                        }
                    });
                    _self.fullscreenLoading = false;
                }*/
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