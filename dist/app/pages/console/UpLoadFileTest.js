define(function(e,a){a.ready=function(e,a,t){yufp.lookup.reg("CRUD_TYPE,IMAGE_TYPE"),yufp.custom.vue({el:t.el,data:function(){var l=this;return{dataUrl:backend.edocService+"/api/query/up/load/fileLists",baseParams:{},queryFields:[{placeholder:"流水号",field:"applySeq",type:"input"},{placeholder:"批次号",field:"batch",type:"input"},{placeholder:"上传状态",field:"state",type:"input"}],queryButtons:[{label:"查询",op:"submit",type:"primary",icon:"search",click:function(e,a){a&&l.$refs.reftable.remoteData(e)}},{label:"重置",op:"reset",type:"primary",icon:"yx-loop2"}],tableColumns:[{label:"流水号",prop:"applySeq",sortable:!0,resizable:!0},{label:"影像类型",prop:"imageType",sortable:!0,resizable:!0,dataCode:"IMAGE_TYPE"},{label:"影像批次号",prop:"batch",sortable:!0,resizable:!0,width:"480"},{label:"上传状态",prop:"state",sortable:!0,resizable:!0},{label:"进件日期",prop:"startDate",sortable:!0,resizable:!0},{label:"上传时间",prop:"createTime",sortable:!0,resizable:!0}],updateFields:[{columnCount:2,fields:[{field:"applySeq",label:"流水号"},{field:"filePath",label:"上传文件绝对路径"},{field:"imageType",label:"影像类型",type:"select",dataCode:"IMAGE_TYPE",hidden:!0},{field:"batch",label:"影像批次号",hidden:!0},{field:"state",label:"上传状态 ",hidden:!0},{field:"startDate",label:"进件日期",type:"date"},{field:"certCode",label:"证件号码"},{field:"cusName",label:"客户姓名"},{field:"prdName",label:"产品名称"},{field:"createTime",label:"上传时间",hidden:!0}]}],updateButtons:[{label:"取消",type:"primary",icon:"yx-undo2",hidden:!1,click:function(e){l.dialogVisible=!1}},{label:"上传文件测试",type:"primary",icon:"check",hidden:!1,click:function(e){var a=!1;if(l.$refs.reform.validate(function(e){a=e}),a){var t="",i="";"EDIT"==l.viewType?(i="PUT",t=backend.edocService+"/api/update/batch/file"):"ADD"==l.viewType&&(t=backend.edocService+"/api/up/load/file",i="POST"),yufp.service.request({method:i,url:t,data:e,callback:function(e,a,t){0==e?(l.$refs.reftable.remoteData(),l.$message("操作成功"),l.dialogVisible=!1):l.$message("操作失败")}})}}}],height:yufp.frame.size().height-103,dialogVisible:!1,formDisabled:!1,viewType:"DETAIL",viewTitle:yufp.lookup.find("CRUD_TYPE",!1)}},methods:{checkPermission:function(e){return!yufp.session.checkCtrl(e,t.menuId)},switchStatus:function(e,a){var t=this;t.viewType=e,t.updateButtons[1].hidden=!a,t.formDisabled=!a,t.dialogVisible=!0},addFn:function(){var e=this;e.switchStatus("ADD",!0),e.$nextTick(function(){e.$refs.reform.resetFn()})},modifyFn:function(){1==this.$refs.reftable.selections.length?(this.switchStatus("EDIT",!0),this.$nextTick(function(){var e=this.$refs.reftable.selections[0];yufp.extend(this.$refs.reform.formModel,e)})):this.$message({message:"请先选择一条记录",type:"warning"})},infoFn:function(){if(1==this.$refs.reftable.selections.length){var i=this,e=i.$refs.reftable.selections[0];yufp.service.request({method:"POST",url:backend.edocService+"/api/query/batch/file",data:e,callback:function(e,a,t){0==e?(i.$refs.reftable.remoteData(),i.$message(t.message+a)):i.$message("查询不到批次信息！")}})}else this.$message({message:"请先选择一条记录",type:"warning"})},downloadFn:function(){if(1==this.$refs.reftable.selections.length){var i=this,e=i.$refs.reftable.selections[0];yufp.service.request({method:"POST",url:backend.edocService+"/api/query/and/download",data:e,callback:function(e,a,t){0==e?(i.$refs.reftable.remoteData(),i.$message(t.message+a)):i.$message("查询不到批次信息！")}})}else this.$message({message:"请先选择一条记录",type:"warning"})},deleteFn:function(){var i=this,e=i.$refs.reftable.selections;if(e.length<1)i.$message({message:"请先选择一条记录",type:"warning"});else{for(var a=e.length,t=0;t<a;t++);var l=i.$refs.reftable.selections[0];yufp.service.request({method:"DELETE",url:backend.edocService+"/api/delete/batch/file",data:l,callback:function(e,a,t){0==e?(i.$refs.reftable.remoteData(),i.$message("操作成功")):i.$message("操作失败")}})}},exportFn:function(){yufp.util.exportExcelByTable({fileName:"下载文件",importType:"service",ref:this.$refs.reftable,url:"",param:{}})}}})},a.onmessage=function(e,a){},a.destroy=function(e,a){}});