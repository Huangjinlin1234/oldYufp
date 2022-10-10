/**
 * @created by helin3 2017-11-30
 * @updated by
 * @description 菜单、控制点、数据权限模拟数据
 */

/**
 * 模拟菜单数据
 * @type
 */
var pvpMenu = [ 
    { menuId: 'lp-20000', menuName: '出账管理', upMenuId: ''},
    { menuId: 'lp-21000', menuName: '贷款出账', upMenuId: '', menuIcon: 'lp-20000', funcId: 'PvpLoanAppPageInfo', funcUrl: 'pages/pvp/PvpLoanAppPageInfo'}
    
];

/**
 * 模拟菜单控制点数据
 * @type {Array}
 */
var pvpCtrls = [
    { menuId: 'lp-21000', funcId: 'PvpLoanAppPageInfo', ctrlCode: 'detail', ctrlName: '详情' }

];

/**
 * 模拟数据权限数据
 * @type
 */
var loanDataContr = [
    { authId: '', authTmplId: '', contrId: '', contrInclude: '', contrUrl: '', sqlName: '', sqlString: '', sysId: '' }
];