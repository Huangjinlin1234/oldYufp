/**
 * @create xzw
 * @description 额度终止流程审批查看页面
 * @createDate 2018-08-24
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    // 引入字典项
    yufp.lookup.reg('STD_ZB_CERT_TYP,APRV_STATUS,APPLY_CHANNEL_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          expandCollapseName: ['1', '2', '3'],
          baseTab: 'baseTab',
          // 客户信息
          cusFields:[{
            columnCount:3,
            fields:[
              { field: 'cusName', label: '客户名称' ,disabled: true },
              { field: 'certType', label: '证件类型',disabled: true  ,type: 'select',dataCode: 'STD_ZB_CERT_TYP'},
              { field: 'certCode', label: '证件号码',disabled: true },
              { field: 'wrkCorpNm', label: '单位',disabled: true },
              { field: 'indivMobile', label: '联系电话',disabled: true }
            ]
          }],
          // 借贷信息
          loanFields:[{
            columnCount:3,
            fields:[
              { field: 'applyDate', label: '申请日期' ,disabled: true },
              { field: 'applyAmt', label: '申请金额',disabled: true  ,type: 'select',dataCode: 'STD_ZB_CERT_TYP'},
              { field: 'applyTerm', label: '申请期数',disabled: true },
              { field: 'approveRateY', label: '年利率',disabled: true }
            ]
          }],
          riskFields:[{
            columnCount:3,
            fields:[
              { field: 'bizSerno', label: '人工复核流水号' ,disabled: true  },
              { field: 'channelNo', label: '渠道' ,disabled: true,type:'select',dataCode: 'APPLY_CHANNEL_TYPE'  },
              { field: 'lmtApplySeq', label: '授信申请流水号',disabled: true  ,type: 'select',dataCode: 'STD_ZB_CERT_TYP'},
              { field: 'riskScore', label: '风控审批评分',disabled: true   },
              { field: 'riskLmtAmt', label: '风控建议额度',disabled: true   },
              { field: 'fxqListResult', label: '反洗钱名单筛查结果',disabled: true   },
              { field: 'approveSts', label: '审批状态',disabled: true,type:'select',dataCode: 'APRV_STATUS',hidden:true},
              { field: 'approveOpi', label: '审批意见',disabled: true ,hidden:true },
              { field: 'approveUser', label: '审批人',disabled: true  ,hidden:true },
              { field: 'approveTime', label: '审批时间',disabled: true ,hidden:true  },
              { field: 'lastUpdateUser', label: '最后修改人',disabled: true  ,hidden:true },
              { field: 'lastUpdateTime', label: '最后修改时间',disabled: true  ,hidden:true },
              { field: 'cusName', label: '客户名称' ,disabled: true,hidden:true},
              { field: 'certType', label: '证件类型',disabled: true,type: 'select',dataCode: 'STD_ZB_CERT_TYP',hidden:true},
              { field: 'certCode', label: '证件号码',disabled: true,hidden:true}
            ]
          }],
          // 人行征信
          zxExpandCollapseName: ['redititem'],
          //征信报告
          dataUrlZx:backend.riskmService+'/api/rsc/warn/zxReport',
          zxReftableParams:{},
          zxReftableColumns:[
            {label: '征信报告号', prop: 'reportId', sortable: true, resizable: true},
            {label: '客户姓名', prop: 'cusName', sortable: true, resizable: true},
            {label: '证件号码', prop: 'certCode', sortable: true, resizable: true},
            {
              label: '创建时间', prop: 'createTime', sortable: true, resizable: true,
              formatter: function (row, column, cellValue) {
                if (!row.createTime) {
                  return row.createTime;
                } else {
                  return yufp.util.dateFormat(row.createTime);
                }
              }
            },
            {
              label: '征信报告更新时间', prop: 'updateTime', sortable: true, resizable: true,
              formatter: function (row, column, cellValue) {
                if (!row.updateTime) {
                  return row.updateTime;
                } else {
                  return yufp.util.dateFormat(row.updateTime);
                }
              }
            },
          ],
          height: yufp.frame.size().height - 103,
          dialogVisible: false,
          formDisabled: false,
          cusFormDisabled: false,
          riskFormDisabled: false,
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          valiPagePluginData: true,
        }
      },
      methods: {
        queryInfoFn: function (obj) {
          var _self = this;
          yufp.service.request({
            method: 'POST',
            url: backend.flowService + '/api/manual/nls/credit/info',
            data: obj,
            callback: function (code, message, response) {
              if (code == 0 && response.code == 0) {
                yufp.extend(_self.$refs.cusRef.formModel,response.rows);
                yufp.extend(_self.$refs.loanRef.formModel, response.rows);
              } else{
                _self.$message('根据授信号查询授信信息失败！请检查数据');
              }
            }
          });
        },
        getContentFn: function () {
          var _self = this;
          var selections = this.$refs.zxReftable.selections;
          if (selections.length != 1) {
            this.$message({message: '请先选择一条记录', type: 'warning'});
            return;
          }
          var condition = {
            reportId: selections[0].reportId
          };
          yufp.service.request({
            method: 'POST',
            url: backend.creditService + '/api/cus/rpt/show',
            data: condition,
            callback: function (code, message, response) {
              if (response.code == 0) {
                var report = response.rows.content;
                if (report != "" && report != null) {
                  w = window.open('about:blank');
                  w.document.write(report);
                  w.document.close();
                } else {
                  _self.$message('没有查询到征信报告!');
                }
              } else {
                _self.$message({message: '查看征信报告失败：' + response.message, type: 'warning'});
              }
            }
          });
        }
      },
      mounted: function () {
        data.children = this;
        var obj = data.datas[data.dataKey];
        this.valiPagePluginData = true;
        var _self = this;
        var paramObj = {
          lmtApplySeq:obj.lmtApplySeq
        };
        _self.queryInfoFn(paramObj);
        _self.zxReftableParams = {
          cusName: obj.cusName,
          certType: obj.certType,
          certCode: obj.certCode
        }
        this.$nextTick(function () {
          yufp.extend(this.$refs.riskRef.formModel, obj);
          _self.$refs.zxReftable.remoteData(_self.zxReftableParams);
        });
      } // end of mounted
    });
  };
  // 消息处理
  exports.onmessage = function (type, message) {};
  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {}
});
