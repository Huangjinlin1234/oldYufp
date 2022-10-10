/**
 * @created by luobo 2017-11-30
 * @updated by
 * @description 菜单、控制点、数据权限模拟数据
 */

/**
 * 模拟菜单数据
 * @type
 */
var limitMenu = [
    /**
     * 个人网络消费-贷前
     */
    //一级菜单LmtPrelistFroze
	   { menuId: 'lp-30000', menuName: '业务办理', upMenuId: '0', menuIcon: 'el-icon-yx-books'},
     { menuId: 'lp-70000', menuName: '贷前管理', upMenuId: '0', menuIcon: 'el-icon-yx-books'},
	
     //二级菜单
	   { menuId: 'lp-31002', menuName: '授信审批查看', upMenuId: 'lp-30000', menuIcon: '', funcId: 'LmtIndivAppPageInfo', funcUrl: 'pages/limit/LmtIndivAppPageInfo'},
     { menuId: 'lp-31003', menuName: '额度激活查询', upMenuId: 'lp-30000', menuIcon: '', funcId: 'LmtPrelistPageInfo2', funcUrl: 'pages/limit/LmtPrelistPageInfo2'},
     { menuId: 'lp-31004', menuName: '额度冻结', upMenuId: 'lp-30000', menuIcon: '', funcId: 'LmtPrelistFroze', funcUrl: 'pages/limit/LmtPrelistFroze'},

     //三级菜单
     { menuId: 'lp-71001', menuName: '导入产品白名单', upMenuId: 'lp-71000', menuIcon: '', funcId: 'LmtPrelistBatchAppPageInfo', funcUrl: 'pages/limit/LmtPrelistBatchAppPageInfo'},
     { menuId: 'lp-71002', menuName: '产品白名单复核', upMenuId: 'lp-71000', menuIcon: '', funcId: 'LmtPrelistTmpPageInfo', funcUrl: 'pages/limit/LmtPrelistTmpPageInfo'}

];
/**
 * 模拟菜单控制点数据
 * @type {Array}
 */
var limitCtrls = [
    { menuId: 'lp-31002', funcId: 'LmtIndivAppPageInfo', ctrlCode: 'detail', ctrlName: '详情' },
    { menuId: 'lp-31003', funcId: 'LmtPrelistPageInfo2', ctrlCode: 'detail', ctrlName: '详情' },    
   { menuId: 'lp-31004', funcId: 'LmtPrelistFroze', ctrlCode: 'create', ctrlName: '新增' },
   { menuId: 'lp-31004', funcId: 'LmtPrelistFroze', ctrlCode: 'detail', ctrlName: '详情' },
   { menuId: 'lp-31004', funcId: 'LmtPrelistFroze', ctrlCode: 'delete', ctrlName: '删除' },
   { menuId: 'lp-31004', funcId: 'LmtPrelistFroze', ctrlCode: 'edit', ctrlName: '修改' },
   
    { menuId: 'lp-71001', funcId: 'LmtPrelistBatchAppPageInfo', ctrlCode: 'edit', ctrlName: '修改' },
    { menuId: 'lp-71001', funcId: 'LmtPrelistBatchAppPageInfo', ctrlCode: 'detail', ctrlName: '详情' },
    { menuId: 'lp-71001', funcId: 'LmtPrelistBatchAppPageInfo', ctrlCode: 'delete', ctrlName: '删除' },


    { menuId: 'lp-71001', funcId: 'LmtPrelistBatchAppPageInfo', ctrlCode: 'commit', ctrlName: '提交' },
    { menuId: 'lp-71001', funcId: 'LmtPrelistBatchAppPageInfo', ctrlCode: 'create', ctrlName: '新增' },
    { menuId: 'lp-71001', funcId: 'LmtPrelistBatchAppPageInfo', ctrlCode: 'export', ctrlName: '导出' },
    { menuId: 'lp-71001', funcId: 'LmtPrelistBatchAppPageInfo', ctrlCode: 'download', ctrlName: '下载' },
    { menuId: 'lp-71001', funcId: 'LmtPrelistBatchAppPageInfo', ctrlCode: 'detail', ctrlName: '详情' },


    { menuId: 'lp-71001', funcId: 'LmtPrelistTmpPageInfo', ctrlCode: 'review', ctrlName: '复核' },
    { menuId: 'lp-71001', funcId: 'LmtPrelistTmpPageInfo', ctrlCode: 'export', ctrlName: '导出' },
    { menuId: 'lp-71001', funcId: 'LmtPrelistTmpPageInfo', ctrlCode: 'detail', ctrlName: '详情' }
];