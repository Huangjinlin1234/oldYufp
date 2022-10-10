define([
  './custom/widgets/js/YufpDemoSelector.js',
  './custom/widgets/js/YufpOrgTree.js',
  './custom/widgets/js/YufpUserSelector.js',
  './custom/widgets/js/AddrDicSelecter.js',
  './custom/widgets/js/OrgSelector.js',
  './custom/widgets/js/UserSelecter.js',
  './custom/widgets/js/PrdIdInfoSelector.js'
], function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('STD_ZB_CERT_TYP,STD_PRD_REPAY_MODE,STD_ZB_ASSURE_MEANS,STD_ZX_CUR_TYPE,NLS_APPLY_STATE,BD_POLCY_CD,STD_LOAN_USE,STD_ZX_SEX,REL_COUNTRY,' +
        'LOAN_STATUS,STD_ZB_TERM_TYPE,BD_PREPAYMENT_PRICING,BD_PREPAYMENT_YMD,APPLY_CHANNEL_TYPE,CONTACTS_RELATION,STD_ZX_EMPLOYMET,STD_YES_NO,TD_LEND_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          dataUrl: backend.creditService + '/api/nls/apply/infos',
          dataUrlImages: backend.edocService +'/api/query/up/load/files',
          dataUrlZX: backend.creditService + '/api/query/report/infos',
          baseParams: {},
          baseParamsRel: {},
          baseParamsZX: {},
          //baseParamsSP: {},
          imagesParams: {},  //影像信息
          imageSrc:'',
          queryFields: [
            { placeholder: '申请流水号', field: 'applySeq', type: 'input' },
              {
                  placeholder: '渠道名称 ', field: 'channelNo', type: 'select', dataCode: 'APPLY_CHANNEL_TYPE',
                  rules: [{required: true, message: '渠道名称必输', trigger: 'blur'}],
                  change: function (value, model, args) {
                      _self.$refs.form.fm.prdCode = ''; //当下拉框值改变时，清空pop框产品值
                  }
              },
              {
                  placeholder: '产品名称',
                  field: 'prdCode',
                  type: 'custom',
                  is: 'div-prdId-info-selector',
                  params: {type: ''},
                  clickFn: function (value, model, args) {
                      _self.$refs.form.switch('prdCode', 'params', {prdType: model.channelNo, type: 'code'});
                      _self.$refs.form.rebuildFn();
                  }
                  ,rules: [{required: true, message: '产品名称必输', trigger: 'blur'}]
              },
            { placeholder: '证件类型', field: 'certType', type: 'select', dataCode: 'STD_ZB_CERT_TYP', datacodeFilter: function(options){
            	this.typeOptions = [];
            	for(var i=0; i<options.length; i++){
            		if(options[i].key != 'CN03' && options[i].key != 'HK01' && options[i].key != 'MO01' && options[i].key != 'TW01' && options[i].key != 'TW02'){
            			this.typeOptions.push(options[i]);
            		}
            	}
            } },
            { placeholder: '证件号码', field: 'certCode', type: 'input' },
              {placeholder: '申请日期起', field: 'signDate_b', type: 'date'
                  //rules: [{required: true, message: '申请日期起必输', trigger: ['change','blur'],type :'date'}],
                  /*value:new Date().getFullYear() + '-'
                      + (new Date().getMonth()+1 < 10 ? '0' + (new Date().getMonth()+1):new Date().getMonth()+1) + '-'
                      + (new Date().getDate()< 10 ? '0'+new Date().getDate():new Date().getDate())*/
              },
              {placeholder: '申请日期止', field: 'signDate_e', type: 'date'
                  //rules: [{required: true, message: '申请日期起必输', trigger: ['change','blur'],type :'date'}],
                  /*value:new Date().getFullYear() + '-'
                      + (new Date().getMonth()+1 < 10 ? '0' + (new Date().getMonth()+1):new Date().getMonth()+1) + '-'
                      + (new Date().getDate()< 10 ? '0'+new Date().getDate():new Date().getDate())*/
              },
            { placeholder: '审批状态', field: 'nlsApplyState', type: 'select', dataCode: 'NLS_APPLY_STATE' },
            { placeholder: '放款状态', field: 'dnSts', type: 'select', dataCode: 'LOAN_STATUS' }
          ],

          queryButtons: [
        	  { label: '查询',op: 'submit',type: 'primary',icon: 'search',
        		  click: function (model, valid) {
        			  if (valid) {
                          if((null==model.applySeq || model.applySeq == "") && (null==model.certCode || model.certCode == "") && ((null==model.signDate_b || model.signDate_b == "") && (null==model.signDate_e || model.signDate_e == ""))){
        			          //报错，申请流水，证件号，申请日期必须有一个必输
                              _self.$message('申请流水号，证件号码，申请日期起止必须有一个必输!');
                          }else if((null==model.applySeq || model.applySeq == "") && (null==model.certCode || model.certCode == "")){
                              var dateMin = new Date(model.signDate_b);
                              var dateMin1 = new Date(model.signDate_b);
                              var dateMinTime =  dateMin.getFullYear()+"-"+(dateMin.getMonth()+1)+"-"+dateMin.getDate();
                              var dateMax = new Date(model.signDate_e);
                              var dateMaxTime =  dateMax.getFullYear()+"-"+(dateMax.getMonth()+1)+"-"+dateMax.getDate();
                              if(model.signDate_b === "" || model.signDate_b === undefined || model.signDate_e === "" || model.signDate_e === undefined){
                                  _self.$message('申请日期起止必输!');
                              }else if(dateMax < dateMin){
                                  _self.$message('申请日期结束日期不能小于开始日期!');
                              }else{
                                  dateMin1.setMonth(dateMin.getMonth() +3);
                                  dateMin1.setDate(dateMin.getDate() +1);
                                  var dateMinTime1 =  dateMin1.getFullYear()+"-"+(dateMin1.getMonth()+1)+"-"+dateMin1.getDate();
                                  if(dateMax > dateMin1){
                                      _self.$message('申请日期起止时间不能超过三个月!');
                                  }else{
                                      _self.$refs.reftable.remoteData(model);
                                  }
                              }
                          }else{
                              _self.$refs.reftable.remoteData(model);
                          }
        			  }
        		  } },
        	  { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],

          tableColumns: [
        	{ label: '申请流水号', prop: 'applySeq', sortable: true, resizable: true, width: '180',
        		template: function () {
                    return '<template scope="scope">\
                    			<a href="javascript:void(0);" style="text-decoration:underline;"@click="_$event(\'custom-row-click\', scope.row)">{{ scope.row.applySeq }}</a>\
                    		</template>';
                }
        	},
        	{ label: '渠道名称', prop: 'channelNo', sortable: true, resizable: true, dataCode: 'APPLY_CHANNEL_TYPE' },
        	{ label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
            { label: '客户编号', prop: 'cusId', sortable: true, resizable: true, hidden: true },
            { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
            { label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode: 'STD_ZB_CERT_TYP' },
            { label: '证件号码', prop: 'certCode', sortable: true, resizable: true, width: '150' },
            { label: '申请额度（元）',prop: 'applyAmt',sortable: true,resizable: true,
              formatter: function (row, column, cellValue) {
                return yufp.util.moneyFormatter(cellValue, 2);
              } },
            { label: '申请时间', prop: 'applyTime', sortable: true, resizable: true, width: '150'  },
            { label: '贷款期限', prop: 'loanTerm', sortable: true, resizable: true}, // 贷款期限 + 期限类型
            { label: '审批状态', prop: 'nlsApplyState', sortable: true, resizable: true, dataCode: 'NLS_APPLY_STATE' },
            { label: '放款金额（元）',prop: 'amountOfLoan',sortable: true,resizable: true,
              formatter: function (row, column, cellValue) {
                return yufp.util.moneyFormatter(cellValue, 2);
              } },
            { label: '放款状态', prop: 'dnSts', sortable: true, resizable: true, dataCode: 'LOAN_STATUS' },
            { label: '最后修改时间', prop: 'lastModifyTime', sortable: true, resizable: true },
          ],

          tableColumnsRel: [
            { label: '申请流水号', prop: 'applySeq', sortable: true, resizable: true },
            { label: '联系人姓名', prop: 'relName', sortable: true, resizable: true},
            { label: '关联关系', prop: 'relRelation', sortable: true, resizable: true, dataCode: 'CONTACTS_RELATION'  },
            { label: '创建时间', prop: 'createTime', sortable: true, resizable: true}
          ],

          // 基本信息
          applyInfoFields: [{
            columnCount: 3,
            fields: [
              {field: 'applySeq', label: '申请流水号', disabled: true},
              {field: 'contNo', label: '借款合同编号', disabled: true},  //from ctr_loan_cont
              {field: 'channelNo', label: '渠道名称', disabled: true, type: 'select', dataCode: 'APPLY_CHANNEL_TYPE',
            	  change:function(fields){
            		  if(fields != "05") {
            			  _self.$refs.basecollapse1.$children[1].$el.hidden = true;
            		  } else {
            			  _self.$refs.basecollapse1.$children[1].$el.hidden = false;
            		  }
            	  }
              },
              {field: 'prdName', label: '产品名称', disabled: true},
              {field: 'cusName', label: '客户名称', disabled: true},
              {field: 'certType', label: '证件类型', disabled: true, type: 'select', dataCode: 'STD_ZB_CERT_TYP'},
              {field: 'certCode', label: '证件号码', disabled: true},
              {field: 'applyDate', label: '申请日期', disabled: true}, 
              {field: 'nlsOperOrgid', label: '受理机构', disabled: true},
              {field: 'chargeoffBrId', label: '出账机构', disabled: true},
              {field: 'lendType', label: '贷款种类', disabled: true, type: 'select', dataCode: 'TD_LEND_TYPE'},  // from acc_loan
              {field: 'loanCcy', label: '币种', disabled: true, type: 'select', dataCode: 'STD_ZX_CUR_TYPE'},
              {field: 'applyAmt',label: '申请额度（元）',disabled: true,type: 'num',
                  formatter: function (cellValue) {
                    if (typeof cellValue == 'undefined' || cellValue == null || isNaN(cellValue)) {
                      return;
                    }
                    return yufp.util.moneyFormatter(cellValue, 2);
                  }
              },
              {field: 'amountOfLoan',label: '放款金额（元）',disabled: true, type: 'num',
                  formatter: function (cellValue) {
                    if (typeof cellValue == 'undefined' || cellValue == null || isNaN(cellValue)) {
                      return;
                    }
                    return yufp.util.moneyFormatter(cellValue, 2);
                  }
              },
              {field: 'loanTerm', label: '贷款期限', disabled: true},
              {field: 'loanTermType', label: '期限类型', disabled: true, type: 'select', dataCode: 'STD_ZB_TERM_TYPE', hidden:true},
              {field: 'repayMethod', label: '还款方式', disabled: true, type: 'select', dataCode: 'STD_PRD_REPAY_MODE'},
              {field: 'recvAcctNo', label: '银行卡账号', disabled: true},
              {field: 'recvBankName', label: '银行名称', disabled: true},
              {field: 'rulingIrY', label: '基准利率', disabled: true}, //from ctr_loan_cont
              {field: 'irAdjustMode', label: '利率浮动方式', disabled: true, type: 'select', dataCode: 'STD_IR_ADJ_MODE'}, //from ctr_loan_cont
              {field: 'calFloatingRate', label: '利率浮动比', disabled: true}, //from ctr_loan_cont
              {field: '', label: '罚息收取方式', disabled: true},
              {field: 'overdueRate', label: '罚息浮动比', disabled: true}, //from ctr_loan_cont
              {field: '', label: '复利浮动比', disabled: true},
              {field: 'assureMeansMain', label: '担保方式', disabled: true, type: 'select', dataCode: 'STD_ZB_ASSURE_MEANS'}, //from ctr_loan_cont
              {field: 'loanPurpose', label: '贷款用途', disabled: true, type: 'select', dataCode: 'STD_LOAN_USE'},
              {field: 'nlsApplyState', label: '审批状态', disabled: true, type: 'select', dataCode: 'NLS_APPLY_STATE'},
              {field: 'dnSts', label: '放款状态', disabled: true, type: 'select', dataCode: 'LOAN_STATUS'},
              {field: 'createUser', label: '创建人', disabled: true},
              {field: 'createTime', label: '创建时间', disabled: true},
              {field: 'lastModifyUser', label: '修改人', disabled: true},
              {field: 'lastModifyTime', label: '修改时间', disabled: true},
            ]},
          {
            columnCount: 1,
            fields: [
            	  {field: 'refuseCause', label: '拒绝原因', disabled: true, type: 'textarea', rows: 3}
            ]} ],
           
          //百度特色字段
            baiduItemFields: [{
            	columnCount: 3,
            	fields: [
            		{field: 'bdReasonCode', label: '百度原因码', disabled: true},
                    {field: 'bdReasonMsg', label: '百度原因码说明', disabled: true},
                    {field: 'bdRisCode', label: '百度策略', type:'select', dataCode:'BD_POLCY_CD', disabled: true},
                    {field: 'bdOrderId', label: '百度用信和提款订单ID', disabled: true},
                    {field: 'bdIdpicture0', label: '身份证照片正面', disabled: true},
                    {field: 'bdIdpicture1', label: '身份证照片反面',disabled: true },
                    {field: 'bdLivingPhoto', label: '活体照片', disabled: true},
                    {field: 'bdUnionLoanUsed', label: '贷款用途(循环产品)', disabled: true,type:'select', dataCode:'BD_STD_LOAN_USE_CLY' },
                    {field: 'bdLoanUse', label: '贷款用途(分期产品)', disabled: true,type:'select', dataCode:'BD_STD_LOAN_USE_STA' },
                    {field: 'bdOcrExpdate', label: 'Ocr识别失效日期', disabled: true},
                    {field: 'bdTerm', label: '期数', disabled: true},
                    {field: 'bdDailyInterestRate', label: '日利息日利率（万分比）', disabled: true,
                   	 formatter: function(row, column, cellValue) {
                            var num = parseFloat(cellValue);
                            if (typeof(num) == 'undefined'  || num == null || isNaN(num) )
                                return "";
                            var rateY = Number(num * 100).toFixed(2) + '%';
                            return rateY;
                        }  
                    },
                    {field: 'bdDailyPenaltyRate', label: '罚息日罚息（万分比）',  disabled: true },
                    {field: 'bdCompreAnnualInterestRate', label: '综合年化利率', disabled: true },
                    {field: 'bdViolatePrepay', label: '提前还款违约金（分期产品）', disabled: true},
                    {field: 'bdViolatePrepayRule', label: '提前还款违约金定价计算规则（分期产品）', disabled: true,type:'select', dataCode:'BD_PREPAYMENT_PRICING'},
                    {field: 'bdViolatePrepayFlag', label: '提前还款违约金年月日标志（分期产品）', disabled: true ,type:'select', dataCode:'BD_PREPAYMENT_YMD'}
            	]
            }],

          //申请人基本信息-身份信息
            identityInfoFields: [{
           	 columnCount: 3,
           	 fields: [
                 { field: 'cusId', label: '客户号' ,disabled:true },
                 { field: 'cusName', label: '客户名称', disabled: true},
                 { field: 'indivSex', label: '客户性别', disabled: true,type: 'select', dataCode:'STD_ZX_SEX' },
                 { field: 'indivDtOfBirth', label: '出生日期' , editable: false , disabled: true},//,type:'date'
                 { field: 'certType', label: '证件类型', type: 'select', dataCode:'STD_ZB_CERT_TYP', disabled: true },
                 { field: 'certCode', label: '证件号码', disabled: true },
                 { field: 'phone', label: '手机号码' , disabled: true},
                 { field: 'fstAppChannel', label: '首次申请渠道', disabled: true, type: 'select',dataCode:'APPLY_CHANNEL_TYPE' },  
                 { field: 'indivRsdAddr', label: '居住地址', disabled: true },
                 { field: 'indivNtn', label: '民族', disabled: true, type: 'select',dataCode:'STD_ZB_NATION' },
           	     { field: 'indivComName', label: '工作单位名称', disabled: true },
           	     { field: 'indivComTyp', label: '单位性质', disabled: true, type: 'select',dataCode:'STD_ZB_REG_TYPE' },
                 { field: 'indivCrtfctn', label: '职称', disabled: true, type: 'select',dataCode:'STD_ZX_TITLE' },
                 { field: 'indivOcc', label: '职业', disabled: true, type: 'select',dataCode:'STD_ZX_EMPLOYMET' },
                 { field: 'indivAnnIncm', label: '个人月收入(元)', disabled: true, type:'num',formatter: function(cellValue) {
                     if (typeof(cellValue) == 'undefined'  || cellValue == null || isNaN(cellValue) )
                         return;
                     return yufp.util.moneyFormatter(cellValue, 2);
                 },rules: [{ validator: yufp.validator.number, message: '必须填写数字', trigger: 'blur'} ]},  //年收入情况
                 { field: 'postAddr', label: '通讯地址' , disabled: true},
                 { field: 'postCode', label: '邮政编码', disabled: true},
                 {
                     field: 'indivMarSt', label: '婚姻状况', disabled: true, type: 'select', dataCode: 'STD_ZX_MARR_STATUS'/*,
                     change: function (fields) {
                         if (fields == "20" || fields == "21" || fields == "22" || fields == "23") {
                             _self.$refs.basecollapse.$children[2].$el.hidden = false;
                             _self.$refs.indivMarInFo.formRules.indivSpsName[0].required = true;
                             _self.$refs.indivMarInFo.formRules.indivSpsIdTyp[0].required = true;
                             _self.$refs.indivMarInFo.formRules.indivSpsIdCode[0].required = true;
                             _self.$refs.indivMarInFo.formRules.indivSpsIdPeriod[0].required = true;
                         } else {
                             _self.$refs.basecollapse.$children[2].$el.hidden = true;
                             _self.$refs.indivMarInFo.formRules.indivSpsName[0].required = false;
                             _self.$refs.indivMarInFo.formRules.indivSpsIdTyp[0].required = false;
                             _self.$refs.indivMarInFo.formRules.indivSpsIdCode[0].required = false;
                             _self.$refs.indivMarInFo.formRules.indivSpsIdPeriod[0].required = false;
                         }
                     }*/
                 },
                 { field: 'inputId', label: '创建人', disabled: true },   //登记人
                 { field: 'createTime', label: '创建时间', disabled: true },
                 { field: 'lastUpdateUser', label: '最后修改人', disabled: true },
                 { field: 'lastUpdateTime', label: '最后修改时间', disabled: true }
           ] }],
           
           //申请人基本信息-背景信息
           backgroundInfoFields: [{
             columnCount: 3,
             fields: [
           	   { field: 'indivEdt', label: '最高学历', disabled: true, type: 'select',dataCode:'ZB_DEGREE'},
                  { field: 'agriFlg', label: '是否农户', disabled: true, type: 'select', dataCode:'STD_YES_NO' },   
                  { field: 'familyAddr', label: '家庭地址', disabled: true },
                  { field: 'fphone', label: '家庭电话', disabled: true},
                  { field: 'familyMincm', label: '家庭月收入(元)', disabled: true, type:'num',formatter: function(cellValue) {
                      if (typeof(cellValue) == 'undefined'  || cellValue == null || isNaN(cellValue) )
                          return;
                      return yufp.util.moneyFormatter(cellValue, 2);
                  },rules: [{ validator: yufp.validator.number, message: '必须填写数字', trigger: 'blur'} ]},
  	            { field: 'indivHealSt', label: '健康状况', disabled: true, type: 'select',dataCode:'STD_ZB_HEAL_ST', hidden:true },
                  { field: 'hasFamilyMember', label: '是否有家庭成员', disabled: true, type: 'select', dataCode:'STD_ZX_YES_NO', hidden:true }
           ] }],
           
           //申请人基本信息-婚姻状况
           indivMarInFoFields: [{
           	columnCount: 3,
           	fields: [
                 { field: 'indivSpsName', label: '配偶姓名' , disabled: true,rules: [ { required: false, message: '已婚客户，此项必填!', trigger: 'blur'}]},
                 { field: 'indivSpsMphn', label: '手机号码' , disabled: true},
                 { field: 'indivSpsPhone', label: '配偶联系电话' , disabled: true},
                 { field: 'indivSpsIdTyp', label: '配偶证件类型', disabled: true, type: 'select',dataCode:'STD_ZB_CERT_TYP', hidden: true},
                 { field: 'indivSpsIdCode', label: '配偶证件号码' , disabled: true, hidden: true},
                 { field: 'indivSpsIdPeriod', label: '配偶证件有效期', disabled: true,type:'date' , editable: false,  hidden: true },
                 { field: 'indivScomName', label: '工作单位', disabled: true, hidden: true},
                 { field: 'indivSpsPhn', label: '单位电话', disabled: true, hidden: true}
              ] }],

            // 征信信息
            tableColumnsZX: [
                { label: '报告编号', prop: 'reportId', sortable: true, resizable: true },
                { label: '查询请求时间', prop: 'requestTime', sortable: true, resizable: true },
                { label: '报告时间', prop: 'reportTime', sortable: true, resizable: true },
                { label: '被查询者姓名', prop: 'cername', sortable: true, resizable: true },
                { label: '被查询者证件类型', prop: 'certype', type: 'select', dataCode: 'STD_ZB_CERT_TYP'},
                { label: '被查询者证件号码', prop: 'cercode', sortable: true, resizable: true },
                { label: '查询操作员', prop: 'user', sortable: true, resizable: true }
            ],

            tableColumnsSP: [
                { prop: 'cusId', label: '客户编号', sortable: true, resizable: true},
                { prop: 'cusName', label: '客户名称', sortable: true, resizable: true},
                { prop: 'prdCode',label: '产品编号', sortable: true, resizable: true, rules: [{ validator: yufp.validator.number, message: '数字', trigger: 'blur'}]},
                { prop: 'prdName',label: '产品名称', sortable: true, resizable: true,rules: [{max: 24, message: '最大长度为24个字符串', trigger: 'blur'}]},
          	    { prop: 'soltCode', label: '当前插槽代码', sortable: true, resizable: true},
                { prop: 'soltName', label: '当前插槽名称', sortable: true, resizable: true},
                { prop: 'rspMsg', label: '响应信息', sortable: true, resizable: true}
            ],

            //网贷业务过程信息
            nlsProsBizInFoFields: [
                {
                    columnCount: 3,
                    fields: [
                        { field: 'applySeq', label: '申请流水号' , disabled: true, hidden:true},
                        { field: 'cusId', label: '客户编号' , disabled: true},
                        { field: 'cusName', label: '客户名称' , disabled: true},
                        { field: 'prdCode', label: '产品编号' , disabled: true},
                        { field: 'prdName', label: '产品名称', disabled: true },
                        { field: 'soltCode', label: '当前插槽代码' , disabled: true},
                        { field: 'soltName', label: '当前插槽名称', disabled: true},
                        { field: 'rspMsg', label: '响应信息', disabled: true}
                    ]
                }
            ],



          //影像信息
          imageFields: [
	          { label: '借据号', prop: 'applySeq', sortable: true, resizable: true },
	     	  { label: '影像类型', prop: 'imageType', sortable: true, resizable: true, dataCode: 'IMAGE_TYPE' },
	     	  { label: '影像批次号', prop: 'batch', sortable: true, resizable: true, width: '480',
	     		  template: function () {
	     			  return '<template scope="scope">\
	     			  			<a href="javascript:void(0);" style="text-decoration:underline;"@click="_$event(\'custom-row-click\', scope.row)">{{ scope.row.batch }}</a>\
	     			  		  </template>';
	     		  } },
	     	  { label: '上传状态', prop: 'state', sortable: true, resizable: true },
	     	  { label: '进件日期', prop: 'startDate', sortable: true, resizable: true },
	     	  { label: '上传时间', prop: 'createTime', sortable: true, resizable: true }
          ],

          updateButtons: [
            { label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false,
              click: function (model) {
                _self.dialogVisible = false;
              } }

          ],

          height: yufp.frame.size().height - 103,
          dialogVisible: false,
          formDisabled: true,
          viewType: 'DETAIL',
          tabName: 'first',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          expandCollapseName: ['applyBase', 'applyInfo','baiduItemInfo','identityInfo','backgroundInfo','indivMarInFo']
        };
      },

      methods: {

    	   getCredit: function () {
    		  var _self = this;
    		  var selections = this.$refs.thirdReftable.selections;
    		  if (selections.length != 1) {
    			  this.$message({ message: '请先选择一条记录', type: 'warning' });
    			  return;
    		  }
    		  var cmisdata = selections[0];
    		  yufp.service.request({
    			  method: 'POST',
    			  url: backend.creditService + '/api/cus/rpt/show',
    			  data: cmisdata,
    			  callback: function (code, message, response) {
    				  if (response.code == 0) {
    					  var report = response.rows.content;
    					  if(report != null || report != ""){
    						  w = window.open('about:blank');
        					  w.document.write(report);
        					  w.document.close();
    					  } else {
    						  _self.$message('没有查询到征信报告!');
    					  }
    				  } else {
    					  _self.$message('查看征信报告失败!');
    				  }
    			  }
    		  });
    	  },

        /**
          * @param ctrlCode 操作码
          */
        checkPermission: function (ctrlCode) {
          return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
        },

        /**
         * @param viewType
         *            表单类型
         * @param editable
         *            可编辑,默认false
         */
        switchStatus: function (viewType, editable) {
        	var _self = this;
        	_self.viewType = viewType;
        	_self.formDisabled = !editable;
        	_self.dialogVisible = true;
        	this.$nextTick(function () {
        	});
        },

        infoFn: function () {
        	if (this.$refs.reftable.selections.length != 1) {
        		this.$message({message: '请先选择一条记录', type: 'warning'});
        		return;
        	}
        	var _self = this;
        	_self.dialogVisible = true;

        	var obj = _self.$refs.reftable.selections[0];
        	_self.imagesParams = {
    				  applySeq : obj.applySeq
        	};
        	_self.baseParamsZX = {
                    cercode: obj.certCode
        	};
        	_self.switchStatus('DETAIL', true);
        	this.$nextTick(function () {
        		var _self = this;
        		var certId = _self.$refs.reftable.selections[0].certCode;
        		//计算年龄
        		var mydata = new Date();
        		var month = mydata.getMonth() + 1;
        		var day = mydata.getDate();
        		var age = mydata.getFullYear() - certId.substring(6, 10) - 1;
        		if (certId.substring(10, 12) < month || certId.substring(10, 12) == month && certId.substring(12, 14) <= day) {
        			age++;
        		}
        		yufp.service.request({
        			method: "GET",
        			url: backend.cusService + '/api/cus/indiv/' + certId,
        			data: certId,
        			callback: function (code, message, response) {
        				if (response.success) {
        					// 重置表单，防止第二次点击查看时，为空数据出现上一次查看的数据
        					_self.$refs.identityInfo.resetFn();
        					_self.$refs.backgroundInfo.resetFn();
        					_self.$refs.indivMarInFo.resetFn();

        					yufp.extend(_self.$refs.identityInfo.formModel, response.rows);
        					yufp.extend(_self.$refs.backgroundInfo.formModel, response.rows);
        					yufp.extend(_self.$refs.indivMarInFo.formModel, response.rows);
        				}
        			}
        		});
        		yufp.extend(_self.$refs.baseInfo.formModel, obj);
        		yufp.extend(_self.$refs.baiduInfo.formModel, obj);
        		yufp.extend(_self.$refs.nlsProsBizInFo.formModel, obj);
        		this.$refs.thirdReftable.remoteData(_self.baseParamsZX);
        	});
        },
        
        //申请流水号超链接处理函数
        applySernoClick: function (scope) {
        	var _self = this;
        	_self.dialogVisible = true;
        	_self.baseParamsRel = {
        		applySeq: scope.applySeq
        	};
        	_self.imagesParams = {
  				  applySeq : scope.applySeq
  		   };
        	_self.baseParamsZX = {
                    cercode: scope.certCode
        	};
        	_self.switchStatus('DETAIL', true);
        	this.$nextTick(function () {
        		var _self = this;
        		var certId = scope.certCode;
        		//计算年龄
        		var mydata = new Date();
        		var month = mydata.getMonth() + 1;
        		var day = mydata.getDate();
        		var age = mydata.getFullYear() - certId.substring(6, 10) - 1;
        		if (certId.substring(10, 12) < month || certId.substring(10, 12) == month && certId.substring(12, 14) <= day) {
        			age++;
        		}
//        		yufp.util.copyObj(this.$refs.baseInfo.formModel, scope);//拷贝对象的值
//
        		yufp.service.request({
        			method: "GET",
        			url: backend.cusService + '/api/cus/indiv/' + certId,
        			data: certId,
        			callback: function (code, message, response) {
        				if (response.success) {
        					// 重置表单，防止第二次点击查看时，为空数据出现上一次查看的数据
        					_self.$refs.identityInfo.resetFn();
        					_self.$refs.backgroundInfo.resetFn();
        					_self.$refs.indivMarInFo.resetFn();
        					
        					yufp.extend(_self.$refs.identityInfo.formModel, response.rows);
        					yufp.extend(_self.$refs.backgroundInfo.formModel, response.rows);
        					yufp.extend(_self.$refs.indivMarInFo.formModel, response.rows);
        					
        				}/* else {
        					_self.$message("获取客户信息失败：" + response.message);
        				}*/
        			}
        		});
        		yufp.extend(_self.$refs.baseInfo.formModel, scope);
        		yufp.extend(_self.$refs.baiduInfo.formModel, scope);
                yufp.extend(_self.$refs.nlsProsBizInFo.formModel, scope);
        		//this.$refs.forthReftable.remoteData(_self.baseParamsSP);
        		this.$refs.thirdReftable.remoteData(_self.baseParamsZX);
        	});
        },

      //影像批次号超链接处理函数
  	  batchSernoClick: function(scope){
  		  var serNo = scope.applySeq;
  		  var date = scope.startDate;
  		  if(null!= date && ''!=date && 'undefined' !=date){
   			 while(null != date.match('-')){
   				 date = date.replace('-', '');
   			 }
   		  }
  		  this.imageSrc = '';
  	  }
        // tabClick: function (tabs) {
        //   if (tabs.name == 'second') {
        //     var _self = this;
        //     var applyBaseObj = {cusName: '', cusId: '', certType: '', certCode: ''};
        //     yufp.util.copyObj(applyBaseObj, this.$refs.reftable.selections[0]);// 拷贝对象的值
        //     yufp.service.request({
        //       method: 'GET',
        //       url: backend.creditService + '/api/nls/apply/info/' + this.$refs.reftable.selections[0],
        //       callback: function (code, message, response) {
        //         if (response.success == true) {
        //           yufp.extend(_self.$refs.applyRef.formModel, response.data);// 申请人基本信息赋值
        //         } else {
        //           _self.$message(response.message);
        //         }
        //       }
        //     });
        //     // yufp.extend(this.$refs.applyRef.formModel, applyBaseObj);//申请人基本信息赋值
        //     yufp.util.copyObj(this.$refs.approveInfoRef.formModel, this.$refs.reftable.selections[0]);// 拷贝对象的值
        //   }
        // },

        // 影像获取
        // obtainImage: function () {
        //   var _self = this;
        //   yufp.service.request({
        //     method: 'POST',
        //     data: this.$refs.reftable.selections[0],
        //     url: backend.creditService + '/api/lmt/indiv/getIsrpInfo',
        //     callback: function (code, message, response) {
        //       if (response.code == '999999') {
        //         var url = response.data.emcUrl;
        //         w = window.open(url);
        //       } else {
        //         _self.$message({message: response.message, type: 'warning'});
        //       }
        //     }
        //   });
        // },
        // customRowClick: function (scope) {
        //   this.switchStatus('EDIT', true);
        //   this.$nextTick(function () {
        //     var obj = scope.row;
        //     var dataObj = {};
        //     yufp.extend(dataObj, obj, { barthday: new Date(obj.barthday) });

        //     yufp.extend(false, this.$refs.approveInfo.formModel, dataObj);
        //     yufp.extend(false, this.$refs.familyRef.formModel, dataObj);
        //     // yufp.extend(false, this.$refs.otherRef.formModel, dataObj);
        //     yufp.extend(false, this.$refs.obligateRef.formModel, dataObj);

        //     console.log(this.$refs.approveInfo.formModel);
        //     console.log(this.$refs.familyRef.formModel);
        //     // console.log(this.$refs.otherRef.formModel);
        //     console.log(this.$refs.obligateRef.formModel);
        //   });
        // },

        //   submitForm : submitForm,
        /* returnForm : function() {
          var _self = this;
          _self.dialogVisible = false;
        }*/

        /**
         * 提交
         */
        /* function submitForm() {
          var _self = this;
          var first = _self.$refs.baseInfo;
          var baseFlag = true;
          first.validate(function(valid) {
            baseFlag = valid;
          });
          if (approveFlag ) {
            var comitData = {};
            yufp.extend(comitData, approveInfo.formModel);
            console.log(approveInfo.formModel);
            var method = '';
            if(_self.viewType == "EDIT") {
              method = 'PUT';
            } else {
              method = 'POST'
            }

            yufp.service.request({
                  method: 'POST',
                  url: '/trade/api/demo/save',
                  data: comitData,
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _self.$refs.reftable.remoteData();
                      _self.$message('操作成功');
                      _self.dialogVisible = false;
                    }
                  }
                });
          }
        };*/
      }
    });
  };

  // 消息处理
  exports.onmessage = function (type, message) {

  };

  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {

  };
});


