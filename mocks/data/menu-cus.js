/**
 * @created by luobo 2017-11-30
 * @updated by
 * @description 菜单、控制点、数据权限模拟数据
 */

/**
 * 模拟菜单数据
 * @type
 */
var cusMenu = [
 { menuId: 'lp-50000', menuName: '客户管理', upMenuId: '0', menuIcon: 'el-icon-yx-books'},
     //二级菜单
   { menuId: 'lp-51000', menuName: '我的客户', upMenuId: 'lp-50000', menuIcon: 'el-icon-yx-books'},
   { menuId: 'lp-52000', menuName: '客户信贷关系', upMenuId: 'lp-50000', menuIcon: 'el-icon-yx-books'},
   //三级菜单
   { menuId: 'lp-51001', menuName: '个人客户信息管理', upMenuId: 'lp-51000', menuIcon: '', funcId: 'CusIndivPageInfo', funcUrl: 'pages/cus/CusIndivPageInfo'},
   { menuId: 'lp-52001', menuName: '客户移交申请', upMenuId: 'lp-52000', menuIcon: '', funcId: 'CusHandoverAppPageInfo', funcUrl: 'pages/cus/CusHandoverAppPageInfo'},
   
   { menuId: 'lp-52002', menuName: '客户移交审批', upMenuId: 'lp-52000', menuIcon: '', funcId: 'CusHandoverAppPageInfo', funcUrl: 'pages/cus/CusHandoverAppPageInfo'},
   { menuId: 'lp-52003', menuName: '客户移交接收', upMenuId: 'lp-52000', menuIcon: '', funcId: 'CusHandoverAppPageInfo', funcUrl: 'pages/cus/CusHandoverAppPageInfo'},
 //  { menuId: 'lp-52005', menuName: '征信信息', upMenuId: 'lp-52000', menuIcon: '', funcId: 'LmtIndivAppPageInfo', funcUrl: '/yufp-web/pages/cus/LmtIndivAppPageInfo'},
   { menuId: 'lp-52004', menuName: '客户移交日志', upMenuId: 'lp-52000', menuIcon: '', funcId: 'CusHandoverLogPageInfo', funcUrl: 'pages/cus/CusHandoverLogPageInfo'}
//    /**
//     * 个人网络消费-贷后
//     */
//    //一级菜单
//	 { menuId: 'lp-50000', menuName: '客户管理', upMenuId: '0', menuIcon: 'el-icon-yx-books'},
//     //二级菜单
//	 { menuId: 'lp-51000', menuName: '我的客户', upMenuId: 'lp-50000', menuIcon: 'el-icon-yx-books'},
//	
//	 //三级菜单客户管理-我的客户-个人客户信息管理
//	 { menuId: 'lp-51001', menuName: '个人客户信息管理', upMenuId: 'lp-51000', menuIcon: '', funcId: 'CusIndivPageInfo', funcUrl: 'pages/cus/CusIndivPageInfo'}
];

/**
 * 模拟菜单控制点数据
 * @type {Array}
 */
var cusCtrls = [
    { menuId: 'lp-51001', funcId: 'CusIndivPageInfo', ctrlCode: 'detail', ctrlName: '详情' }
];
var cusDataContr = [
    { authId: '', authTmplId: '', contrId: '', contrInclude: '', contrUrl: '', sqlName: '', sqlString: '', sysId: '' }
];