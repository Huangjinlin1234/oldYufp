/**
 * @created by helin3 2017-11-30
 * @updated by
 * @description 菜单、控制点、数据权限模拟数据
 */

/**
 * 模拟菜单数据
 * @type
 */
var riskMenu = [
    /**
     * 个人网络消费-贷后
     */
    //一级菜单
    { menuId: 'lp-80000', menuName: '贷后管理', upMenuId: '0', menuIcon: 'el-icon-yx-books'},
     //二级菜单
    { menuId: 'lp-81000', menuName: '贷后检查', upMenuId: 'lp-80000'},
    { menuId: 'lp-82000', menuName: '风险管理', upMenuId: 'lp-80000'},
    { menuId: 'lp-84000', menuName: '贷后作业', upMenuId: 'lp-80000'},
   //三级菜单
    { menuId: 'lp-83000', menuName: '风险分类', upMenuId: 'lp-82000'},
    { menuId: 'lp-82100', menuName: '风险预警台账', upMenuId: 'lp-82000', menuIcon: '', funcId: 'rscWarnLoanPageInfo', funcUrl: 'pages/risk/RscWarnLoanPageInfo'},
    { menuId: 'lp-84001', menuName: '贷后凭证上传', upMenuId: 'lp-84000', menuIcon: '', funcId: 'PspDataUploadPageInfo', funcUrl: 'pages/psp/PspDataUploadPageInfo'},
    //贷后检查
    { menuId: 'lp-81100', menuName: '专项检查发起', upMenuId: 'lp-81000', menuIcon: '', funcId: 'pspSpecCheckAppPageInfo', funcUrl: 'pages/psp/PspSpecCheckAppPageInfo'},
    { menuId: 'lp-81200', menuName: '贷后检查登记', upMenuId: 'lp-81000'},
    { menuId: 'lp-81300', menuName: '检查报告', upMenuId: 'lp-81000', menuIcon: '', funcId: 'PspCheckRptPageInfo', funcUrl: 'pages/psp/PspCheckRptPageInfo'},
    //四级菜单
   	//贷后检查
    { menuId: 'lp-81201', menuName: '不定期检查登记', upMenuId: 'lp-81200', menuIcon: '', funcId: 'pspCheckTaskAppPageInfo', funcUrl: 'pages/psp/PspCheckTaskAppPageInfo'},
    { menuId: 'lp-81202', menuName: '专项检查登记', upMenuId: 'lp-81200', menuIcon: '', funcId: 'PspSpecCheckTaskContPageInfo', funcUrl: 'pages/psp/PspSpecCheckTaskContPageInfo'},
    { menuId: 'lp-81203', menuName: '风险预警检查登记', upMenuId: 'lp-81200', menuIcon: '', funcId: 'PspWarnCheckTaskPageInfo', funcUrl: 'pages/psp/PspWarnCheckTaskPageInfo'},
   //四级菜单
   	//风险管理
    { menuId: 'lp-83101', menuName: '风险分类调整', upMenuId: 'lp-83000', menuIcon: '', funcId: 'rscAdjustAppPageInfo', funcUrl: 'pages/risk/RscAdjustAppPageInfo'},
    { menuId: 'lp-83102', menuName: '解除风险分类调整', upMenuId: 'lp-83000', menuIcon: '', funcId: 'RscRemoveAppPageInfo', funcUrl: 'pages/risk/RscRemoveAppPageInfo'},
    { menuId: 'lp-83103', menuName: '风险分类台账', upMenuId: 'lp-83000', menuIcon: '', funcId: 'rscTaskLoanPageInfo', funcUrl: 'pages/risk/RscTaskLoanPageInfo'},
    
];

/**
 * 模拟菜单控制点数据
 * @type {Array}
 */
var riskCtrls = [
    { menuId: 'lp-81000', funcId: 'pspCheckTaskAppPageInfo', ctrlCode: 'create', ctrlName: '新增' },
    { menuId: 'lp-81000', funcId: 'pspCheckTaskAppPageInfo', ctrlCode: 'edit', ctrlName: '修改' },
    { menuId: 'lp-81000', funcId: 'pspCheckTaskAppPageInfo', ctrlCode: 'detail', ctrlName: '详情' },
    { menuId: 'lp-81000', funcId: 'pspCheckTaskAppPageInfo', ctrlCode: 'delete', ctrlName: '删除' },
    { menuId: 'lp-81000', funcId: 'pspCheckTaskAppPageInfo', ctrlCode: 'export', ctrlName: '导出' },
    { menuId: 'lp-82000', funcId: 'PspCheckTaskHisPageInfo', ctrlCode: 'create', ctrlName: '新增' },
    { menuId: 'lp-82000', funcId: 'PspCheckTaskHisPageInfo', ctrlCode: 'edit', ctrlName: '修改' },
    { menuId: 'lp-82000', funcId: 'PspCheckTaskHisPageInfo', ctrlCode: 'detail', ctrlName: '详情' },
    { menuId: 'lp-82000', funcId: 'PspCheckTaskHisPageInfo', ctrlCode: 'delete', ctrlName: '删除' },
    { menuId: 'lp-82000', funcId: 'PspCheckTaskHisPageInfo', ctrlCode: 'export', ctrlName: '导出' }
];

/**
 * 模拟数据权限数据
 * @type
 */
var riskDataContr = [
    { authId: '', authTmplId: '', contrId: '', contrInclude: '', contrUrl: '', sqlName: '', sqlString: '', sysId: '' }
];