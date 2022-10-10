/**
 * @created by helin3 2017-11-30
 * @updated by
 * @description 菜单、控制点、数据权限模拟数据
 */

/**
 * 模拟菜单数据
 * @type
 */
var consoleMenu = [
    /**
     * 个人网络消费-法人控制台
     */
    //一级菜单
    { menuId: 'lp-90000', menuName: '法人控制台', upMenuId: '0', menuIcon: 'el-icon-yx-books'},
    //二级菜单
    { menuId: 'lp-91000', menuName: '产品中心', upMenuId: 'lp-90000', menuIcon: 'el-icon-yx-books'},
    //二级菜单
    { menuId: 'lp-92000', menuName: '系统配置', upMenuId: 'lp-90000', menuIcon: 'el-icon-yx-books'},
    //二级菜单
    { menuId: 'lp-93000', menuName: '业务流转', upMenuId: 'lp-90000', menuIcon: 'el-icon-yx-books'},    
    //三级菜单
       //产品中心
    { menuId: 'lp-91010', menuName: '产品管理', upMenuId: 'lp-91000', menuIcon: ''},
    { menuId: 'lp-91020', menuName: '专案管理', upMenuId: 'lp-91000', menuIcon: '',funcId: 'prdCaseManage', funcUrl: 'pages/console/prd/PrdCaseManagePageInfo'},
    { menuId: 'lp-91030', menuName: '信贷产品映射', upMenuId: 'lp-91000', menuIcon: '',funcId: 'prdInfoMap', funcUrl: 'pages/console/prd/PrdInfoMapPageInfo'},
    { menuId: 'lp-91040', menuName: '合同模板配置', upMenuId: 'lp-91000', menuIcon: ''},
    { menuId: 'lp-91050', menuName: '业务参数配置', upMenuId: 'lp-91000', menuIcon: '',funcId: 'BizParamCfgPageInfo', funcUrl:'pages/console/prd/BizParamCfgPageInfo'},
    { menuId: 'lp-91060', menuName: '授权设置', upMenuId: 'lp-91000', menuIcon: '',funcId: 'GrantAuthInfoPageInfo', funcUrl:'pages/console/prd/GrantAuthInfoPageInfo'},
    { menuId: 'lp-91070', menuName: '利率方案', upMenuId: 'lp-91000', menuIcon: ''},
    { menuId: 'lp-91080', menuName: '规则配置', upMenuId: 'lp-91000', menuIcon: '', funcId: 'sRuleCollPageInfo', funcUrl:'pages/console/prd/SRuleCollPageInfo'},
    { menuId: 'lp-91090', menuName: '风险分类配置', upMenuId: 'lp-91000', menuIcon: '', funcId: 'riskClassfyCfg', funcUrl:'pages/console/prd/RiskClassfyCfgPageInfo'},
    { menuId: 'lp-91100', menuName: '电核表单配置', upMenuId: 'lp-91000', menuIcon: ''},
    //系统管理
    { menuId: 'lp-92010', menuName: '用户管理', upMenuId: 'lp-92000', menuIcon: '', funcId: 'sUserPageInfo', funcUrl: 'pages/console/system/SUserPageInfo'},
    { menuId: 'lp-92020', menuName: '机构管理', upMenuId: 'lp-92000', menuIcon: '', funcId: 'sOrgPageInfo', funcUrl: 'pages/console/system/SOrgPageInfo'},
    { menuId: 'lp-92030', menuName: '账务机构管理', upMenuId: 'lp-92000', menuIcon: 'el-icon-yx-coin-yen', funcId: 'sAccoountOrgPageInfo', funcUrl: 'pages/console/system/SAccoountOrgPageInfo'},
    { menuId: 'lp-92040', menuName: '岗位管理', upMenuId: 'lp-92000', menuIcon: '', funcId: 'sDutyPageInfo', funcUrl: 'pages/console/system/sDutyPageInfo'},
    { menuId: 'lp-92050', menuName: '角色管理', upMenuId: 'lp-92000', menuIcon: 'el-icon-yx-command', funcId: 'SRolePageInfo', funcUrl: 'pages/console/system/SRolePageInfo' },
    { menuId: 'lp-92060', menuName: '资源管理', upMenuId: 'lp-92000', menuIcon: ''},
    { menuId: 'lp-92080', menuName: '部门管理', upMenuId: 'lp-92000', menuIcon: 'el-icon-yx-command', funcId: 'SDeptPageInfo', funcUrl: 'pages/console/system/SDeptPageInfo' },
    { menuId: 'lp-92070', menuName: '数据权限管理', upMenuId: 'lp-92000',  menuIcon: 'el-icon-yx-command', funcId: 'SRoleDataRulePageInfo', funcUrl: 'pages/console/system/SRoleDataRulePageInfo'},
    /*{ menuId: 'lp-92080', menuName: '字典管理', upMenuId: 'lp-92000', menuIcon: '', funcId: 'sDicPageInfo', funcUrl: 'pages/console/system/SDicPageInfo'},*/
    
    //业务流转
    { menuId: 'lp-93010', menuName: '业务流转配置', upMenuId: 'lp-93000', menuIcon: '', funcId: 'bizFlowInfo', funcUrl: 'pages/flow/BizFlowInfoPageInfo'},
    { menuId: 'lp-93020', menuName: '业务阶段信息', upMenuId: 'lp-93000', menuIcon: '', funcId: 'BizStageinfo', funcUrl: 'pages/flow/BizStageInfoPageInfo'},
    { menuId: 'lp-93030', menuName: '业务事件信息', upMenuId: 'lp-93000', menuIcon: '', funcId: 'BizEventinfo', funcUrl: 'pages/flow/BizEventInfoPageInfo'},
    { menuId: 'lp-93040', menuName: '业务服务插件', upMenuId: 'lp-93000', menuIcon: '', funcId: 'BizPluginService', funcUrl: 'pages/flow/BizPluginServicePageInfo'},
    { menuId: 'lp-93050', menuName: '业务页面插件', upMenuId: 'lp-93000', menuIcon: '', funcId: 'BizPluginPage', funcUrl: 'pages/flow/BizPluginPagePageInfo'},
    { menuId: 'lp-93060', menuName: '业务节点模板', upMenuId: 'lp-93000', menuIcon: '', funcId: 'BizTemplateNode', funcUrl: 'pages/flow/BizTemplateNodePageInfo'},    
    { menuId: 'lp-93070', menuName: '节点任务模板', upMenuId: 'lp-93000', menuIcon: '', funcId: 'BizTemplateTask', funcUrl: 'pages/flow/BizTemplateTaskPageInfo'},    
     
     //四级菜单
    { menuId: 'lp-91011', menuName: '产品上线申请', upMenuId: 'lp-91010', menuIcon: '', funcId: 'prdInfoApply', funcUrl: 'pages/console/prd/PrdInfoApplyPageInfo'},
    { menuId: 'lp-91012', menuName: '产品变更申请', upMenuId: 'lp-91010', menuIcon: '', funcId: 'prdInfoApplyChange', funcUrl: 'pages/console/prd/PrdInfoApplyChange'},
    { menuId: 'lp-91013', menuName: '产品下线申请', upMenuId: 'lp-91010', menuIcon: '', funcId: 'prdInfoApplyOffline', funcUrl: 'pages/console/prd/PrdInfoApplyOffline'},
    { menuId: 'lp-91014', menuName: '产品信息查询', upMenuId: 'lp-91010', menuIcon: '', funcId: 'prdInfo', funcUrl: 'pages/console/prd/PrdInfoPageInfo'},
     { menuId: 'lp-91015', menuName: '产品对照核心', upMenuId: 'lp-91010', menuIcon: '', funcId: 'prdPiccsBanceMapPageInfo', funcUrl: 'pages/console/prd/PrdPiccsBanceMapPageInfo'},
    { menuId: 'lp-92061', menuName: '资源定义', upMenuId: 'lp-92060', menuIcon: 'el-icon-yx-tree', funcId: 'resource', funcUrl: 'pages/console/system/SResourcePageInfo' },
    { menuId: 'lp-92062', menuName: '资源权限', upMenuId: 'lp-92060', menuIcon: 'el-icon-yx-tree', funcId: 'rescRoleAct', funcUrl: 'pages/console/system/SRoleRescRulePageInfo' },
    { menuId: 'lp-91041', menuName: '合同模版管理', upMenuId: 'lp-91040', menuIcon: 'el-icon-yx-msg-3', funcId: 'contTempInfo', funcUrl: 'pages/console/prd/ContTempInfoPageInfo' },
    { menuId: 'lp-91042', menuName: '合同模版组管理', upMenuId: 'lp-91040', menuIcon: 'el-icon-yx-make-group', funcId: 'contTempG', funcUrl: 'pages/console/prd/ContTempGPageInfo' },
    { menuId: 'lp-91101', menuName: '电核问题模板管理', upMenuId: 'lp-91100', menuIcon: '', funcId: 'TelVerifTplPageInfo', funcUrl:'pages/console/prd/TelVerifTplPageInfo'},
    { menuId: 'lp-91102', menuName: '电核组管理', upMenuId: 'lp-91100', menuIcon: '', funcId: 'TelVerifGrpDtlPageInfo', funcUrl:'pages/console/prd/TelVerifGrpCfgPageInfo'},
    { menuId: 'lp-91071', menuName: '利率方案管理', upMenuId: 'lp-91070', menuIcon: '',funcId: 'RateSchemeCfgPageInfo', funcUrl:'pages/console/prd/RateSchemeCfgPageInfo'},
    { menuId: 'lp-91072', menuName: '利率配置', upMenuId: 'lp-91070', menuIcon: '',funcId: 'PrdRateStdPageInfo', funcUrl:'pages/console/prd/PrdRateStdPageInfo'}

];

/**
 * 模拟菜单控制点数据
 * @type {Array}
 */
var consoleCtrls = [

    { menuId: 'lp-92010', funcId: 'sUserPageInfo', ctrlCode: 'create', ctrlName: '新增' },
    { menuId: 'lp-92010', funcId: 'sUserPageInfo', ctrlCode: 'edit', ctrlName: '修改' },
    { menuId: 'lp-92010', funcId: 'sUserPageInfo', ctrlCode: 'detail', ctrlName: '详情' },
    { menuId: 'lp-92010', funcId: 'sUserPageInfo', ctrlCode: 'delete', ctrlName: '删除' },
    { menuId: 'lp-92010', funcId: 'sUserPageInfo', ctrlCode: 'export', ctrlName: '导出' },
    { menuId: 'lp-92020', funcId: 'sOrgPageInfo', ctrlCode: 'detail', ctrlName: '详情' },
    { menuId: 'lp-92020', funcId: 'sOrgPageInfo', ctrlCode: 'create', ctrlName: '新增' },
    { menuId: 'lp-92020', funcId: 'sOrgPageInfo', ctrlCode: 'edit', ctrlName: '修改' },
    { menuId: 'lp-92020', funcId: 'sOrgPageInfo', ctrlCode: 'delete', ctrlName: '删除' },
    { menuId: 'lp-92030', funcId: 'sAccoountOrgPageInfo', ctrlCode: 'create', ctrlName: '新增' },
    { menuId: 'lp-92030', funcId: 'sAccoountOrgPageInfo', ctrlCode: 'edit', ctrlName: '修改' },
    { menuId: 'lp-92030', funcId: 'sAccoountOrgPageInfo', ctrlCode: 'detail', ctrlName: '详情' },
    { menuId: 'lp-92030', funcId: 'sAccoountOrgPageInfo', ctrlCode: 'delete', ctrlName: '删除' },
    { menuId: 'lp-91041', funcId: 'contTempInfo', ctrlCode: 'create', ctrlName: '新增' },
    { menuId: 'lp-91041', funcId: 'contTempInfo', ctrlCode: 'edit', ctrlName: '修改' },
    { menuId: 'lp-91041', funcId: 'contTempInfo', ctrlCode: 'detail', ctrlName: '详情' },
    { menuId: 'lp-91041', funcId: 'contTempInfo', ctrlCode: 'delete', ctrlName: '删除' },
    { menuId: 'lp-91042', funcId: 'contTempG', ctrlCode: 'create', ctrlName: '新增' },
    { menuId: 'lp-91042', funcId: 'contTempG', ctrlCode: 'edit', ctrlName: '修改' },
    { menuId: 'lp-91042', funcId: 'contTempG', ctrlCode: 'detail', ctrlName: '详情' },
    { menuId: 'lp-91042', funcId: 'contTempG', ctrlCode: 'delete', ctrlName: '删除' },
    { menuId: 'lp-91090', funcId: 'riskClassfyCfg', ctrlCode: 'create', ctrlName: '新增' },
    { menuId: 'lp-91090', funcId: 'riskClassfyCfg', ctrlCode: 'edit', ctrlName: '修改' },
    { menuId: 'lp-91090', funcId: 'riskClassfyCfg', ctrlCode: 'detail', ctrlName: '详情' },
    { menuId: 'lp-91090', funcId: 'riskClassfyCfg', ctrlCode: 'delete', ctrlName: '删除' },
    
    { menuId: 'lp-91011', funcId: 'prdInfoApply', ctrlCode: 'create', ctrlName: '新增' },
    { menuId: 'lp-91011', funcId: 'prdInfoApply', ctrlCode: 'edit', ctrlName: '修改' },
    { menuId: 'lp-91011', funcId: 'prdInfoApply', ctrlCode: 'detail', ctrlName: '详情' },
    { menuId: 'lp-91011', funcId: 'prdInfoApply', ctrlCode: 'delete', ctrlName: '删除' },
    { menuId: 'lp-91012', funcId: 'prdInfoApplyChange', ctrlCode: 'create', ctrlName: '新增' },
    { menuId: 'lp-91012', funcId: 'prdInfoApplyChange', ctrlCode: 'edit', ctrlName: '修改' },
    { menuId: 'lp-91012', funcId: 'prdInfoApplyChange', ctrlCode: 'detail', ctrlName: '详情' },
    { menuId: 'lp-91012', funcId: 'prdInfoApplyChange', ctrlCode: 'delete', ctrlName: '删除' },
    { menuId: 'lp-91013', funcId: 'prdInfoApplyOffline', ctrlCode: 'create', ctrlName: '新增' },
    { menuId: 'lp-91013', funcId: 'prdInfoApplyOffline', ctrlCode: 'edit', ctrlName: '修改' },
    { menuId: 'lp-91013', funcId: 'prdInfoApplyOffline', ctrlCode: 'detail', ctrlName: '详情' },
    { menuId: 'lp-91013', funcId: 'prdInfoApplyOffline', ctrlCode: 'delete', ctrlName: '删除' },
    { menuId: 'lp-91014', funcId: 'prdInfo', ctrlCode: 'detail', ctrlName: '详情' },
    { menuId: 'lp-91014', funcId: 'prdInfo', ctrlCode: 'stop', ctrlName: '停用' },
    { menuId: 'lp-91015', funcId: 'prdPiccsBanceMapPageInfo', ctrlCode: 'create', ctrlName: '新增' },
    { menuId: 'lp-91015', funcId: 'prdPiccsBanceMapPageInfo', ctrlCode: 'edit', ctrlName: '修改' },
    { menuId: 'lp-91015', funcId: 'prdPiccsBanceMapPageInfo', ctrlCode: 'detail', ctrlName: '详情' },
    { menuId: 'lp-91015', funcId: 'prdPiccsBanceMapPageInfo', ctrlCode: 'delete', ctrlName: '删除' },
    { menuId: 'lp-91020', funcId: 'prdCaseManage', ctrlCode: 'create', ctrlName: '新增' },
    { menuId: 'lp-91020', funcId: 'prdCaseManage', ctrlCode: 'edit', ctrlName: '修改' },
    { menuId: 'lp-91020', funcId: 'prdCaseManage', ctrlCode: 'detail', ctrlName: '详情' },
    { menuId: 'lp-91020', funcId: 'prdCaseManage', ctrlCode: 'delete', ctrlName: '删除' },
    { menuId: 'lp-91020', funcId: 'prdCaseManage', ctrlCode: 'stop', ctrlName: '停用' },
    
    { menuId: 'lp-91030', funcId: 'prdInfoMap', ctrlCode: 'create', ctrlName: '新增' },
    { menuId: 'lp-91030', funcId: 'prdInfoMap', ctrlCode: 'edit', ctrlName: '修改' },
    { menuId: 'lp-91030', funcId: 'prdInfoMap', ctrlCode: 'detail', ctrlName: '详情' },
    { menuId: 'lp-91030', funcId: 'prdInfoMap', ctrlCode: 'delete', ctrlName: '删除' },
    
    { menuId: 'lp-93010', funcId: 'bizFlowInfo', ctrlCode: 'create', ctrlName: '新增' },
    { menuId: 'lp-93010', funcId: 'bizFlowInfo', ctrlCode: 'edit', ctrlName: '修改' },
    { menuId: 'lp-93010', funcId: 'bizFlowInfo', ctrlCode: 'detail', ctrlName: '详情' },
    { menuId: 'lp-93010', funcId: 'bizFlowInfo', ctrlCode: 'delete', ctrlName: '删除' },
    
    { menuId: 'lp-93020', funcId: 'BizStageinfo', ctrlCode: 'create', ctrlName: '新增' },
    { menuId: 'lp-93020', funcId: 'BizStageinfo', ctrlCode: 'edit', ctrlName: '修改' },
    { menuId: 'lp-93020', funcId: 'BizStageinfo', ctrlCode: 'detail', ctrlName: '详情' },
    { menuId: 'lp-93020', funcId: 'BizStageinfo', ctrlCode: 'delete', ctrlName: '删除' },
    
    { menuId: 'lp-93030', funcId: 'BizEventinfo', ctrlCode: 'create', ctrlName: '新增' },
    { menuId: 'lp-93030', funcId: 'BizEventinfo', ctrlCode: 'edit', ctrlName: '修改' },
    { menuId: 'lp-93030', funcId: 'BizEventinfo', ctrlCode: 'detail', ctrlName: '详情' },
    { menuId: 'lp-93030', funcId: 'BizEventinfo', ctrlCode: 'delete', ctrlName: '删除' },
    
    { menuId: 'lp-93040', funcId: 'BizPluginService', ctrlCode: 'create', ctrlName: '新增' },
    { menuId: 'lp-93040', funcId: 'BizPluginService', ctrlCode: 'edit', ctrlName: '修改' },
    { menuId: 'lp-93040', funcId: 'BizPluginService', ctrlCode: 'detail', ctrlName: '详情' },
    { menuId: 'lp-93040', funcId: 'BizPluginService', ctrlCode: 'delete', ctrlName: '删除' },
    
    { menuId: 'lp-93050', funcId: 'BizPluginPage', ctrlCode: 'create', ctrlName: '新增' },
    { menuId: 'lp-93050', funcId: 'BizPluginPage', ctrlCode: 'edit', ctrlName: '修改' },
    { menuId: 'lp-93050', funcId: 'BizPluginPage', ctrlCode: 'detail', ctrlName: '详情' },
    { menuId: 'lp-93050', funcId: 'BizPluginPage', ctrlCode: 'delete', ctrlName: '删除' }
    
];

/**
 * 模拟数据权限数据
 * @type
 */
var consoleDataContr = [
    { authId: '', authTmplId: '', contrId: '', contrInclude: '', contrUrl: '', sqlName: '', sqlString: '', sysId: '' }
];