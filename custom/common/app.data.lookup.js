/**
 * 本地数据字典
 * created by helin3 2017-12-04
 */
define(function (require, exports) {
    exports.localLookup = {
    	CRUD_TYPE: [
            {enname: 'ADD', cnname: '新增'},
            {enname: 'EDIT', cnname: '修改'},
            {enname: 'DETAIL', cnname: '详情'}
        ],
        QT_ANSWER_CORT: [

        ]
        /*CRUD_TYPE: [
            {key: 'ADD', value: '新增'},
            {key: 'EDIT', value: '修改'},
            {key: 'DETAIL', value: '详情'}
        ],
        GENDER: [
            {key: '01', value: '男'},
            {key: '02', value: '女'}
        ],

        YESNO: [
            {key: '01', value: '是'},
            {key: '02', value: '否'}
        ],

        HASNO: [
            {key: '01', value: '有'},
            {key: '02', value: '无'}
        ],
        OBJECT_TYPE: [
            {'key': 'R', 'value': '角色'},
            {'key': 'U', 'value': '用户'},
            {'key': 'D', 'value': '部门'},
            {'key': 'G', 'value': '机构'}
        ],
        RESOURCE_TYPE: [
            {'key': 'M', 'value': '菜单'},
            {'key': 'C', 'value': '控制点'},
            {'key': 'D', 'value': '数据权限'}
        ],
        RECIVE_TYPE: [
            {'key': 'R', 'value': '角色'},
            {'key': 'G', 'value': '机构'}
        ],
        PUB_STS: [
            {'key': 'O', 'value': '已发布'},
            {'key': 'C', 'value': '未发布'}
        ],
        NOTICE_LEVEL: [
            {'key': 'I', 'value': '重要'},
            {'key': 'N', 'value': '一般'}
        ],
        TOP_FLAG: [
            {'key': 'I', 'value': '是'},
            {'key': 'N', 'value': '否'}
        ],
        RULE_TYPE: [
            {'key': '01', 'value': '申请准入模型'},
            {'key': '02', 'value': '风控模型'},
            {'key': '03', 'value': '支用准入模型'},
            {'key': '04', 'value': '额度测算模型'},
            {'key': '05', 'value': '提额测算模型'}
        ],
        COMMON_STATUS: [
            {'key': '0', 'value': '待生效'},
            {'key': '1', 'value': '生效'},
            {'key': '2', 'value': '失效'}
        ],
        RULE_PARAM_VAL_STATUS: [
            {'key': '01', 'value': '未存在需要配置参数'},
            {'key': '02', 'value': '相关参数配置已完成'},
            {'key': '03', 'value': '相关参数配置未完成'}
        ],
        ROLE_TYPE: [
            {'key': '001', 'value': '公共'},
            {'key': '002', 'value': '小企业'},
            {'key': '003', 'value': '消费金融'}
        ],
        GUAR_WAY: [
            {'key': '00', 'value': '信用'},
            {'key': '10', 'value': '抵押'},
            {'key': '20', 'value': '质押'},
            {'key': '30', 'value': '保证'}
        ],
        CUST_LEVEL: [
            {'key': '00', 'value': '未评级'},
            {'key': '01', 'value': '优秀'},
            {'key': '02', 'value': '较好'},
            {'key': '03', 'value': '一般'}
        ],
        RISK_CLASSFY: [
            {'key': '11', 'value': '正常一'},
            {'key': '12', 'value': '正常二'},
            {'key': '21', 'value': '关注一'},
            {'key': '22', 'value': '关注二'},
            {'key': '30', 'value': '次级'},
            {'key': '40', 'value': '可疑'},
            {'key': '50', 'value': '损失'}
        ],
        ORG_PROP: [
            {'key': '01', 'value': '账务机构'},
            {'key': '02', 'value': '管理机构'}
        ],
        DATA_RULE_TYPE: [
            {'key': '01', 'value': '当前本人'},
            {'key': '02', 'value': '当前本人所在机构'},
            {'key': '03', 'value': '当前本人所在机构及下属机构'}
        ],
        CONT_TEMP_TYPE: [
            {'key': '01', 'value': '合同类'},
            {'key': '02', 'value': '其他类'}
        ],
        CONT_TYPE: [
            {'key': '01', 'value': '额度合同'},
            {'key': '02', 'value': '借款合同'},
            {'key': '03', 'value': '放款协议'},
            {'key': '04', 'value': '补充协议'},
            {'key': '05', 'value': '通用担保合同'}
        ],
        COMMON_YES_NO: [
            {'key': '01', 'value': '是'},
            {'key': '02', 'value': '否'}
        ],
        USER_STATUS: [
            {'key': '1', 'value': '生效'},
            {'key': '2', 'value': '注销'},
            {'key': '3', 'value': '待启用'},
            {'key': '4', 'value': '锁定'}
        ],
        STD_ZX_SEX: [
            {key: '1', value: '男'},
            {key: '2', value: '女'}
        ],
        STD_ZX_TITLE:[
            {'key': '0', 'value': '无'},
            {'key': '1', 'value': '高级'},
            {'key': '2', 'value': '中级'},
            {'key': '3', 'value': '初级'},
            {'key': '9', 'value': '未知'}
        ],
        ZB_LEVEL_OF_USER:[
            {'key': '15', 'value': '见实'},
            {'key': '14', 'value': '初级'},
            {'key': '13', 'value': '中级'},
            {'key': '12', 'value': '高级'},
            {'key': '11', 'value': '资深'}
        ],
        ZB_DEGREE:[
            {'key': '10', 'value': '研究生（全日制）'},
            {'key': '11', 'value': '研究生（在职）'},
            {'key': '20', 'value': '大学本科（全日制）'},
            {'key': '21', 'value': '大学本科（在职）'},
            {'key': '30', 'value': '大学专科和专科学校（简称"大专"）'},
            {'key': '40', 'value': '中等专业学校或中等技术学校'},
            {'key': '50', 'value': '技术学校'},
            {'key': '60', 'value': '高中'},
            {'key': '70', 'value': '初中'},
            {'key': '80', 'value': '小学'},
            {'key': '90', 'value': '文盲或半文盲'},
            {'key': '99', 'value': '未知'}
        ],
     GRANT_TYPE:[
     	  {'key': '01', 'value': '岗位授权'},
        {'key': '02', 'value': '用户授权'}
        ],
        QUESTION_CLASSIFY:[
        APRV_STATUS:[
            {'key': '01', 'value': '身份信息核查'},
            {'key': '02', 'value': '贷款途径及用途询问'},
            {'key': '03', 'value': '住宅信息核查'},
            {'key': '04', 'value': '负债情况'},
            {'key': '05', 'value': '第三方查询电话'},
            {'key': '07', 'value': '申请表留存电话'},
            {'key': '08', 'value': '人行征信单位电话'},
            {'key': '09', 'value': '疑似欺诈代办公司'},
            {'key': '10', 'value': '联系人真实性核实'}
        ],
        QUESTION_TYPE:[
            {'key': '1', 'value': '单选'},
            {'key': '2', 'value': '多选'},
            {'key': '3', 'value': '填空'}
        ],
        STD_ZB_APPR_STATUS: [
            {'key': '000', 'value': '待发起'},
            {'key': '111', 'value': '审批中'},
            {'key': '990', 'value': '撤销'},
            {'key': '991', 'value': '追回'},
            {'key': '992', 'value': '打回'},
            {'key': '997', 'value': '通过'},
            {'key': '998', 'value': '否决(不同意)'}
        ]
        ,
        PRICE_MODEL: [
            {'key': '01', 'value': '人工录入'},
        ],
        STD_ZB_EFR_CHNG_IND: [
            {'key': '1', 'value': '固定利率'},
            {'key': '2', 'value': '浮动利率'},
        ]
*/
    };
});