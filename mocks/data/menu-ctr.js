/**
 * @created by luobo 2017-11-30
 * @updated by
 * @description 菜单、控制点、数据权限模拟数据
 */

/**
 * 模拟菜单数据
 * @type
 */
var ctrMenu = [
    /**
     * 个人网络消费-贷后
     */
    //一级菜单
	 { menuId: 'lp-60000', menuName: '合同管理', upMenuId: '0', menuIcon: 'el-icon-yx-books'},
	
     //二级菜单
   { menuId: 'lp-61000', menuName: '授信合同查看', upMenuId: 'lp-60000', menuIcon: '', funcId: 'CtrLoanContPageInfo', funcUrl: 'pages/ctr/CtrLoanContPageInfo'}
];
/**
 * 模拟菜单控制点数据
 * @type {Array}
 */
var ctrCtrls= [
    { menuId: 'lp-61000', funcId: 'CtrLoanContPageInfo', ctrlCode: 'detail', ctrlName: '详情' }
    
];