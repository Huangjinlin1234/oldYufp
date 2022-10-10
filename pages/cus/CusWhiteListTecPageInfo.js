/**
 * @create by ligm on 2019-04-10
 * @description 技术白名单
 */
define([
	'./custom/widgets/js/PrdIdInfoSelector.js'
],function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,STD_ZB_CERT_TYP,MAINTANCE_CATEGORY');
      yufp.custom.vue({
		  components: {
			  FileUpload: window.VueUploadComponent
		  },
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            baseParams: {
            },
            dataUrl: backend.cusService + '/api/cus/white/list/tecs',
			  uploadUrl: backend.cusService + '/api/cus/white/list/tecs/upload',
            queryFields: [
				{ placeholder: '姓名', field: 'cusName', type: 'input' },
	            { placeholder: '证件类型', field: 'certType', type: 'select',dataCode:'STD_ZB_CERT_TYP', datacodeFilter: function(options){
	            	this.typeOptions = [];
	            	for(var i=0; i<options.length; i++){
	            		if(options[i].key != 'CN03' && options[i].key != 'HK01' && options[i].key != 'MO01' && options[i].key != 'TW01' && options[i].key != 'TW02'){
	            			this.typeOptions.push(options[i]);
	            		}
	            	}
	            }},
	            { placeholder: '证件号码', field: 'certNo', type: 'input' },
				{
					placeholder: '产品名称',
					field: 'prdCode',
					type: 'custom',
					is: 'div-prdId-info-selector',
					params: {type: 'code'}
				}
            ],
            queryButtons: [
              { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                  if (valid) {
                    _self.$refs.reftable.remoteData(model);
                  }
                } },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
            ],
  
            tableColumns: [
            	{ label: '姓名', prop: 'cusName', sortable: true, resizable: true },
	            { label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode:'STD_ZB_CERT_TYP' },
	            { label: '证件号码', prop: 'certNo', sortable: true, resizable: true },
	            { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
	            { label: '创建人', prop: 'createUser', sortable: true, resizable: true },
	            { label: '创建时间', prop: 'createTime', sortable: true, resizable: true },
	            { label: '最近修改人', prop: 'lastChgUsr', sortable: true, resizable: true },
	            { label: '最近修改时间', prop: 'lastChgDt', sortable: true, resizable: true },
				{ label: '生效开始日期', prop: 'vaildDateStart', sortable: true, resizable: true },
				{ label: '生效终止日期', prop: 'vaildDateEnd', sortable: true, resizable: true },
			],
            
            updateFields: [{
              columnCount: 3,
              fields: [
				  { field: 'cusName', label: '姓名', rules: [{required: true, message: '必填项', trigger: 'blur'}]},
				  {
					  field: 'certType', label: '证件类型', type: 'select', dataCode: 'STD_ZB_CERT_TYP',
					  rules: [{required: true, message: '必填项', trigger: 'blur'}],
					  datacodeFilter: function (options) {
						  this.typeOptions = [];
						  for (var i = 0; i < options.length; i++) {
							  if (options[i].key != 'CN03' && options[i].key != 'HK01' && options[i].key != 'MO01' && options[i].key != 'TW01' && options[i].key != 'TW02') {
								  this.typeOptions.push(options[i]);
							  }
						  }
					  },
					  change: function (value, model, args) {
						  if(value != null && value != '' && value == '10100'){
							  _self.$refs.reform.switch('certNo', 'rules', [{validator: yufp.validator.IDCard, message: '请输入正确的身份证号', trigger: 'blur'}]);
						  } else if (value != '10100'){
							  _self.$refs.reform.switch('certNo', 'rules', [{validator: true, message: '', trigger: 'blur'}]);
						  }
					  }
				  },
				  { field: 'certNo', label: '证件号码', rules: [{required: true, message: '必填项', trigger: 'blur'}] },
				  // {
					//   field: 'channelNo', label: '渠道', type: 'select', dataCode: 'APPLY_CHANNEL_TYPE',
					//   change: function (value, model, args) {
					// 	  model.prdCode = ''; //当下拉框值改变时，清空pop框产品值
					// 	  if (_self.$refs.reform.formModel != 'undefined') {
					// 		  model.prdCode = '';
					// 	  }
					//   }
				  // },
				  {
					  field: 'prdCode', label: '产品号', type: 'custom',
					  is: 'div-prdId-info-selector',
					  params: {},
					  // clickFn: function (value, model, args) {
						//   _self.$refs.reform.switch('prdCode', 'params', {prdType: model.channelNo, type: ''});
						//   _self.$refs.reform.rebuildFn();
					  // },
					  selectFn: function (val, formModel, arguments) {
						  formModel.prdName = arguments[1].prdName;
					  },
					  rules: [{required: true, message: '必填项', trigger: 'blur'}]
				  },
				  { field: 'prdName', label: '产品名称',disabled:true,rules: [{required: true, message: '必填项', trigger: 'blur'}]     },
				  { field: 'matainCategory', label: '维护类别', type: 'select',dataCode:'MAINTANCE_CATEGORY', rules: [{required: true, message: '必填项', trigger: 'blur'}]},
				  { field: 'createUser', label: '创建人', disabled: true},
				  { field: 'createTime', label: '创建时间', disabled: true},
				  { field: 'lastChgUsr', label: '最近修改人', disabled: true, hidden:true},
				  { field: 'lastChgDt', label: '最近修改时间', disabled: true, hidden:true}
              ]
            }],
            
            updateButtons: [
            	{ label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
            		_self.dialogVisible = false;
            	} },
            	{ label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
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
						_self.aFn(model,rMethod);
            		} else if(_self.viewType == "ADD") {
            			rMethod = 'POST';
						_self.$confirm('保存后立即生效，请确认是否继续？', '提示').then(function (action) {
							if (action === 'confirm') {
								_self.aFn(model,rMethod);
							}
						});
            		}


            	} },
            	{ label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
            		_self.dialogVisible = false;
            	} }
            ],
			  height: yufp.frame.size().height - 103,
			  extensions: ['xls', 'xlsx'], fileData: {},
			  headers: {},
			  files: [],
			  errors: [],
			  importDialogVisible: false,
			  dialogVisible: false,
			  formDisabled: false,
			  loading2: false,
			  flag:'',
			  tipsVisible: false,
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
        		_self.updateButtons[0].hidden = !editable;
        		_self.updateButtons[1].hidden = !editable;
        		_self.updateButtons[2].hidden = editable;
        		_self.formDisabled = !editable;
        		_self.dialogVisible = true;
        	},
			switchParamStatusFalse: function () {
				var _self = this;
				var arg = Array.prototype.slice.call(arguments);
				arg.forEach(function (item) {
					_self.$refs.reform.switch(item, 'hidden', false);
				});
				_self.$refs.reform.rebuildFn();
      	    },
			switchParamStatusTrue: function () {
				var _self = this;
				var arg = Array.prototype.slice.call(arguments);
				arg.forEach(function (item) {
					_self.$refs.reform.switch(item, 'hidden', true);
				});
				_self.$refs.reform.rebuildFn();
			},
			aFn:function (item,rMethod) {
				var _self = this;
				yufp.service.request({
					method: rMethod,
					url: backend.cusService + '/api/cus/white/list/tec',
					data: item,
					callback: function (code, message, response) {
						if (response.code == 0) {
							_self.$refs.reftable.remoteData();
							_self.$message('操作成功');
							_self.dialogVisible = false;
						} else {
							_self.$message(response.message);
						}
					}
				});
			},
        	addFn: function () {
        		var _self = this;
        		_self.switchStatus('ADD', true);
        		_self.$nextTick(function () {
					this.$refs.reform.switch('matainCategory', 'disabled', false);
        			_self.switchParamStatusTrue('createTime','createUser','lastChgUsr','lastChgDt');
					_self.$refs.reform.resetFn();
        		});
        	},
        	
        	modifyFn: function () {
				var _self = this;
        		if (_self.$refs.reftable.selections.length != 1) {
					_self.$message({ message: '请先选择一条记录', type: 'warning' });
        			return;
        		}
				_self.switchStatus('EDIT', true);
				_self.$nextTick(function () {
					_self.switchParamStatusFalse('createTime','createUser','lastChgUsr','lastChgDt');
        			var obj = this.$refs.reftable.selections[0];
        			yufp.extend(this.$refs.reform.formModel, obj);
        		});
        	},
        	infoFn: function () {
        		if (this.$refs.reftable.selections.length != 1) {
        			this.$message({ message: '请先选择一条记录', type: 'warning' });
        			return;
        		}
        		this.switchStatus('DETAIL', false);
        		this.$nextTick(function () {
					this.switchParamStatusFalse('lastChgUsr','lastChgDt');
        			yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
        		});
        	},
        	
        	deleteFn: function () {
        		var _self = this;
        		var selections = _self.$refs.reftable.selections;
        		if (selections.length < 1) {
        			_self.$message({ message: '请先选择要删除的记录', type: 'warning' });
        			return;
        		}
				var len = selections.length, arr = [];
				for (var i = 0; i < len; i++) {
					arr.push(selections[i].cusWhiteId);
				}
        		_self.$confirm('点击确定将永久删除该数据，是否确认？','提示',{type:'warning'}).then(function(){
	        		yufp.service.request({
	        			method: 'DELETE',
	        			url: backend.cusService + '/api/cus/white/list/tecs',
	        			data: {
							cusWhiteId:arr.join(',')
						},
	        			callback: function (code, message, response) {
	        				if (code == 0) {
	        					_self.$refs.reftable.remoteData();
	        					_self.$message('操作成功');
	        				} else {
	        					_self.$message('操作失败');
	        				}
	        			}
	        		});
        		});
        	},
			//模板下载
			downloadFn: function () {
				var downLoadUrl = backend.cusService + '/api/cus/white/list/tecs/downLoad';
				window.location.href = downLoadUrl;
			},
			//导入按钮
			importFn: function () {
				this.importDialogVisible = true;
			},
			inputFile: function (newFile, oldFile) {
				if (newFile && oldFile && !newFile.active && oldFile.active) {
					var mesType = 'warning';
					// Get response data
					if (newFile.success === true) {
						var msgData = newFile.response.message;
						//flag:用来区分错误类型（excel填写错误/数据库存在历史数据的错误）
						this.flag = msgData.substring(0, msgData.indexOf(":"))
						var errorMsg = msgData.substring(msgData.indexOf(":") + 1, msgData.length);
						//转化为数组，用于遍历展示
						this.errors = errorMsg.split(',');
						if (typeof (newFile.response) === 'string')
							newFile.response = JSON.parse(newFile.response);
						if (newFile.response && newFile.response.message) {
							if (newFile.response.success === true) {
								mesType = 'success';
								this.$message({message: newFile.response.message, type: mesType});
							} else {
								this.tipsVisible = true;
							}
						} else {
							this.$message({message: '上传文件失败!', type: mesType});
						}
						this.importDialogVisible = false;
						this.$refs.reftable.remoteData();
						this.files = [];
					} else {
						var message = '上传文件失败！';
						if (newFile.error === 'extension') {
							message = '上传的文件只支持：';
							for (var i = 0; i < this.extensions.length; i++) {
								message += this.extensions[i] + '、';
							}
							message += '后缀的文件！';
						}
						this.$message({message: message, type: mesType});
					}
					this.loading2 = false;
				}
			},

			inputFilter: function (newFile, oldFile, prevent) {
				if (this.files.length > 1) {
					this.$message({message: '一次只能选择一个文件！', type: 'warning'});
					return prevent();
				}
				newFile.data = this.fileData;
				newFile.blob = '';
				var URL = window.URL || window.webkitURL;
				if (URL && URL.createObjectURL && newFile.file) {
					newFile.blob = URL.createObjectURL(newFile.file)
				}
			},

			//保存
			commitFileFn: function () {
				if (this.files.length == 0) {
					this.$message({message: '请选择一个文件', type: 'warning'});
					return;
				}
				this.loading2 = true;
				this.$nextTick(function () {
					this.$refs.upload.active = true;
				})
			},
			//取消按钮
			cancelFn: function () {
				this.files = [];
				this.errors = [];
				this.importDialogVisible = false;
				this.tipsVisible = false;
			},
        	/*exportFn: function () {
        		yufp.util.exportExcelByTable({
        			fileName: '下载文件',
        			importType: 'service', // page当前页 selected 选中的数据  service 后端数据
        			ref: this.$refs.reftable,
        			url: '',
        			param: {}
        		});
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
