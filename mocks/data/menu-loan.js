/**
 * @created by helin3 2017-11-30
 * @updated by
 * @description 菜单、控制点、数据权限模拟数据
 */

/**
 * 模拟菜单数据
 * @type
 */
var loanMenu = [ 
    { menuId: 'lp-40000', menuName: '台账管理', upMenuId: ''},
    { menuId: 'lp-41000', menuName: '贷款台账', upMenuId: 'lp-40000', menuIcon: '', funcId: 'accLoanPageInfo', funcUrl: 'pages/loan/AccLoanPageInfo'}
    
];

/**
 * 模拟菜单控制点数据
 * @type {Array}
 */
var loanCtrls = [
    { menuId: 'lp-41000', funcId: 'accLoanPageInfo', ctrlCode: 'detail', ctrlName: '详情' }

];

/**
 * 模拟数据权限数据
 * @type
 */
var loanDataContr = [
    { authId: '', authTmplId: '', contrId: '', contrInclude: '', contrUrl: '', sqlName: '', sqlString: '', sysId: '' }
];