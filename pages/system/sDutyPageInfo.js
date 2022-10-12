/**
 * @create by chenqm1 on 2018-05-11
 * @description 出账申请信息表
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CRUD_TYPE,STD_ZB_APPR_STATUS,STD_ZB_CHAGEOFF');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          dataUrl: '/api//console/api/s/users',
          showXform: false,
          baseParams: {
          },
          queryFields: [
            { placeholder: '岗位代码', field: 'bizSerno', type: 'input' },
            { placeholder: '岗位名称', field: 'contNo', type: 'input' },
            { placeholder: '状态', field: 'cusName', type: 'input' }
          ],
          queryButtons: [
            { label: '查询',
              op: 'submit',
              type: 'primary',
              click: function (model, valid) {
                if (valid) {
                  _self.$refs.reftable.remoteData(model);
                }
              } },
            { label: '重置', op: 'reset' }
          ],
          tableColumns: [
            { label: '岗位代码', prop: 'userCode', sortable: true, resizable: true },
            { label: '岗位名称', prop: 'userName', sortable: true, resizable: true },
            { label: '状态', prop: 'orgName', sortable: true, resizable: true }
          ],


          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false)
        };
      },
      methods: {
        handleClick: function () {

        },
        hightSearchFn: function () {
          this.showXform = !this.showXform;
        }
      }
    });
  };
});
