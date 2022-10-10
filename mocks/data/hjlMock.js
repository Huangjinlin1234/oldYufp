define(['./mocks/data/orgTreeData.js', './mocks/data/orgOrgTree.js', './mocks/data/roleByUser.js', './mocks/data/userData.js', './mocks/data/dutyByUser.js'], function (require, exports) {
  exports.getLimitList = function (config) {
    // var List = [ ];
    // for (var i = 0; i < 15; i++) {
    //   List.push(Mock.mock({
    //     serno: '@increment(2)',
    //     prdName: '@ctitle(8, 15)',
    //     strDt: '@date',
    //     createUser: '@cname',
    //     quotaLimitAmt: '@integer(1, 3)',
    //     'sts|1': ['0', '1', '2'],
    //     prdCode: '@integer(300, 5000)',
    //     remark: '@ctitle(15, 100)',
    //     EVALUATION_PERIOD_ID: '@date'
    //   }));
    // }
    // console.log(List, 'lissss');
    // var returnObj = {
    //   code: '0',
    //   message: 'success',
    //   data: List
    // };
    var returnObj = {'rows': [{'page': 1, 'size': 10, 'total': 2, 'loginUserId': 'admin', 'loginUserOrgCode': '00010', 'loginUserLeageOrgCode': null, 'loginUserOrgLocation': '00010', 'prdCodebyBaseInfo': null, 'dutyCodeStr': null, 'serno': 'CLN2020101000000008', 'quotaName': null, 'quotaLimitAmt': 10000000.00, 'strDt': '2020-10-12', 'endDt': '2020-10-31', 'sts': '00', 'quotaType': '02', 'cusType': null, 'createUser': 'admin', 'createTime': '2020-10-10 14:41:36', 'lastChgUsr': 'admin', 'lastChgTime': '2020-10-10 14:41:36', 'prdId': 'XD050401608', 'prdCode': 'XD050401608', 'prdName': '尊享贷'}, {'page': 1, 'size': 10, 'total': 2, 'loginUserId': 'admin', 'loginUserOrgCode': '00010', 'loginUserLeageOrgCode': null, 'loginUserOrgLocation': '00010', 'prdCodebyBaseInfo': null, 'dutyCodeStr': null, 'serno': 'CLN2021091600000015', 'quotaName': null, 'quotaLimitAmt': 100001.00, 'strDt': '2021-09-16', 'endDt': '2024-09-30', 'sts': '00', 'quotaType': '02', 'cusType': null, 'createUser': 'admin', 'createTime': '2021-09-16 18:17:47', 'lastChgUsr': 'admin', 'lastChgTime': '2022-09-19 11:45:24', 'prdId': 'XD050300501', 'prdCode': 'XD050300501', 'prdName': '网商联合贷'}], 'code': '0', 'message': '处理成功', 'total': 2, 'success': true};
    return returnObj;
  };
  exports.getCount = function (config) {
    var returObj = {
      'code': '0',
      'total': 0,
      'message': null,
      'level': null,
      'data': {
        'todo': 34,
        'his': 417,
        'ticket': 7,
        'poolsize': 0,
        'back': 4,
        'copy': 0,
        'done': 83
      },
      'i18nData': null,
      'extData': null
    };
    return returObj;
  };
  exports.getMydata = function (config) {
    console.log(config, 'con');

    var mydata = '[{\"id\":\"149e56b12604410db8f6a34928a1ba4f\",\"icon\":\"el-icon-yx-location\",\"routeUrl\":\"workflow/bench/start/todo\",\"title\":\"办理中\",\"exists\":true},{\"id\":\"1b3d5b4f121740f3bcdf7b66acd63add\",\"icon\":\"el-icon-yx-gift\",\"routeUrl\":\"workflow/bench/start/his\",\"title\":\"已办结\",\"exists\":true},{\"id\":\"a70c9cce715a4c73b6827a7f7ba337cc\",\"icon\":\"el-icon-yx-folder-download\",\"routeUrl\":\"workflow/bench/todo/todo\",\"title\":\"我的待办\",\"exists\":true},{\"id\":\"129ec68727224868a9e439cb9a24b63a\",\"icon\":\"el-icon-yx-user-minus\",\"routeUrl\":\"workflow/bench/done/done\",\"title\":\"我的已办\",\"exists\":true},{\"id\":\"2c5b70fe79124261bd9edf85c7010568\",\"icon\":\"el-icon-yx-user-check\",\"routeUrl\":\"workflow/bench/his/his\",\"title\":\"我的办结\",\"exists\":true},{\"id\":\"6a55fa64482d430da4cdff4aad973e47\",\"icon\":\"el-icon-yx-map2\",\"routeUrl\":\"workflow/bench/copy/nwfcopyuser\",\"title\":\"我的抄送\",\"exists\":true},{\"id\":\"62a7919956664c549ebcf572aba7b9ab\",\"icon\":\"yu-icon-more1\",\"routeUrl\":\"workflow/bench/metting/srhsmeetpage\",\"title\":\"三人会商会议\",\"exists\":true},{\"id\":\"d049a078db9e4361a987301f6f643316\",\"icon\":\"yu-icon-approval\",\"routeUrl\":\"workflow/bench/metting/dshvotepage\",\"title\":\"贷审会投票\",\"exists\":true},{\"id\":\"00fba68f694249c2b97236be9eba08c7\",\"icon\":\"\",\"routeUrl\":\"workflow/bench/metting/srhsvotepage\",\"title\":\"三人会商投票\",\"exists\":true},{\"id\":\"ee010c73637a4e26bb0eecb7f5da7bc4\",\"icon\":\"\",\"routeUrl\":\"zrcbank/biz/lmtComBiz/lmtReplyChg/lmtReplyChgList\",\"title\":\"单一客户授信批复变更\",\"exists\":true},{\"id\":\"76536e4d125740498fa2cc17cf323b4d\",\"icon\":\"yu-icon-menu2\",\"routeUrl\":\"zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/lmtAppAddList\",\"title\":\"单一客户授信申报\",\"exists\":true}]';
    var returObj = {
      'code': '0',
      'total': 0,
      'message': null,
      'level': null,
      'data': mydata

    };
    return returObj;
  };
  exports.getPrbcommData = function (config) {
    var returnObj = {
      'code': '0',
      'total': 5,
      'message': null,
      'level': null,
      'data': [ {
        'serno': 'CRE2022092100001218',
        'messageType': '1',
        'content': '太卡了',
        'accessory': '[]',
        'status': '2',
        'pubTime': '2022-09-21 19:42:55',
        'rcpContent': '优化中',
        'receiverId': 'admin',
        'receiverOrg': '000000',
        'receiverTime': 1663760630000,
        'inputId': 'admin',
        'inputBrId': '000000',
        'inputDate': '2022-09-21',
        'updId': 'admin',
        'updBrId': '000000',
        'updDate': '2022-09-21 19:54:04',
        'managerId': '202101',
        'managerBrId': '097000',
        'oprType': null,
        'cusManagerName': '黄锦麟',
        'createTime': 1663761244000,
        'updateTime': 1663761288000,
        'inputIdName': '系统管理员',
        'updIdName': '系统管理员',
        'receiverIdName': '系统管理员',
        'managerIdName': '对公授信客户经理A',
        'inputBrIdName': '宇信商业银行全行',
        'managerBrIdName': '常熟支行',
        'receiverOrgName': '宇信商业银行全行',
        'updBrIdName': '宇信商业银行全行'
      }, {
        'serno': 'CRE2021123000000361',
        'messageType': '3',
        'content': '测试一下系统的功能',
        'cusManagerName': '郭铭靖',
        'accessory': '[{"fileName":"code-wallpaper-8.jpg","fileSize":"196.72","fileId":"rO0ABXVyABNbTGphdmEubGFuZy5TdHJpbmc7rdJW5-kde0cCAAB4cAAAAAN0AApzZnRwU2VydmVydAAiY29kZS13YWxscGFwZXItOF8xNjQwODY2NTI3NDI0LmpwZ3QACy9maWxldXBsb2Fk","filePath":"/","extName":"yu-icon-img"}]',
        'status': '3',
        'pubTime': '2021-12-30 20:08:27',
        'rcpContent': '系统用的怎么样啊？哈哈，不错',
        'receiverId': 'admin',
        'receiverOrg': '000000',
        'receiverTime': 1640866227000,
        'inputId': 'admin',
        'inputBrId': '000000',
        'inputDate': '2021-12-30',
        'updId': 'admin',
        'updBrId': '000000',
        'updDate': '2021-12-30 20:15:29',
        'managerId': 'admin',
        'managerBrId': '000000',
        'oprType': null,
        'createTime': 1640866530000,
        'updateTime': 1640866725000,
        'inputIdName': '系统管理员',
        'updIdName': '系统管理员',
        'receiverIdName': '系统管理员',
        'managerIdName': '系统管理员',
        'inputBrIdName': '宇信商业银行全行',
        'managerBrIdName': '宇信商业银行全行',
        'receiverOrgName': '宇信商业银行全行',
        'updBrIdName': '宇信商业银行全行'
      }, {
        'serno': 'CRE2021122900000355',
        'messageType': '1',
        'content': '123123123',
        'cusManagerName': '刘邦',
        'accessory': '[{"fileName":"编辑1","fileSize":"0.79","fileId":null,"filePath":"/","extName":"yu-icon-infofile"}]',
        'status': '2',
        'pubTime': '2021-12-29 10:55:50',
        'rcpContent': 'huifu',
        'receiverId': 'admin',
        'receiverOrg': '000000',
        'receiverTime': 1640746624000,
        'inputId': 'admin',
        'inputBrId': '000000',
        'inputDate': '2021-12-29',
        'updId': 'admin',
        'updBrId': '000000',
        'updDate': '2021-12-29 11:02:40',
        'managerId': 'admin',
        'managerBrId': '000000',
        'oprType': null,
        'createTime': 1640746960000,
        'updateTime': 1640747006000,
        'inputIdName': '系统管理员',
        'updIdName': '系统管理员',
        'receiverIdName': '系统管理员',
        'managerIdName': '系统管理员',
        'inputBrIdName': '宇信商业银行全行',
        'managerBrIdName': '宇信商业银行全行',
        'receiverOrgName': '宇信商业银行全行',
        'updBrIdName': '宇信商业银行全行'
      }, {
        'serno': 'WBPRB2021121300000001',
        'messageType': '1',
        'content': '1111',
        'accessory': '[]',
        'status': '4',
        'cusManagerName': '项羽',
        'pubTime': '2021-12-13 16:49:48',
        'rcpContent': null,
        'receiverId': null,
        'receiverOrg': null,
        'receiverTime': null,
        'inputId': 'admin',
        'inputBrId': '000000',
        'inputDate': '2021-12-13',
        'updId': 'admin',
        'updBrId': '000000',
        'updDate': '2021-12-13 16:56:46',
        'managerId': 'admin',
        'managerBrId': '000000',
        'oprType': null,
        'createTime': 1639385806000,
        'updateTime': 1649225459000,
        'inputIdName': '系统管理员',
        'updIdName': '系统管理员',
        'receiverIdName': 'null',
        'managerIdName': '系统管理员',
        'inputBrIdName': '宇信商业银行全行',
        'managerBrIdName': '宇信商业银行全行',
        'receiverOrgName': 'null',
        'updBrIdName': '宇信商业银行全行'
      } ],
      'i18nData': null,
      'extData': null,
      'erorcd': '0000',
      'erortx': null
    };
    return returnObj;
  };
  exports.getUserListFn = function (config) {
    var returnObj = {'rows': [{'page': 1, 'size': 10, 'total': 809, 'loginUserId': 'admin', 'loginUserOrgCode': '00010', 'loginUserLeageOrgCode': null, 'loginUserOrgLocation': '00010', 'prdCodebyBaseInfo': null, 'dutyCodeStr': null, 'userCode': '00063', 'userName': '陈健坤', 'nickName': '陈健坤', 'legalOrgCode': null, 'legalOrgName': null, 'orgCode': '00010', 'orgName': '广州银行总行', 'userPwd': null, 'status': '1', 'birthday': '', 'telPhone': '13112260613', 'idCardNo': '', 'email': '', 'sex': '', 'staffingLevel': '', 'age': null, 'createTime': '2021-04-25 00:00:00', 'createUser': 'admin', 'lastLoginTime': null, 'currPwdWrongNum': null, 'pwdValdaDate': '', 'eduLevel': '', 'memo': '', 'lastUpdateUser': '64064', 'lastUpdateTime': '2021-11-11 17:11:13', 'handleColtTaskCount': 0, 'rescRoleMap': null, 'isTeller': 'N', 'ownBranch': '水荫支行', 'isUseFingerprint': '', 'tellerLevel': '', 'tellerCategory': '', 'isInitPwd': 'N', 'isSyncUser': null, 'certType': null}, {'page': 1, 'size': 10, 'total': 809, 'loginUserId': 'admin', 'loginUserOrgCode': '00010', 'loginUserLeageOrgCode': null, 'loginUserOrgLocation': '00010', 'prdCodebyBaseInfo': null, 'dutyCodeStr': null, 'userCode': '00169', 'userName': '彭淑君', 'nickName': '彭淑君', 'legalOrgCode': null, 'legalOrgName': null, 'orgCode': '00010', 'orgName': '广州银行总行', 'userPwd': null, 'status': '1', 'birthday': '', 'telPhone': '13926061288', 'idCardNo': '', 'email': '', 'sex': '', 'staffingLevel': '', 'age': null, 'createTime': '2021-04-25 00:00:00', 'createUser': 'admin', 'lastLoginTime': null, 'currPwdWrongNum': null, 'pwdValdaDate': '', 'eduLevel': '', 'memo': '', 'lastUpdateUser': 'admin', 'lastUpdateTime': '2021-04-25 00:00:00', 'handleColtTaskCount': 0, 'rescRoleMap': null, 'isTeller': 'N', 'ownBranch': '东华西支行', 'isUseFingerprint': '', 'tellerLevel': '', 'tellerCategory': '', 'isInitPwd': 'N', 'isSyncUser': null, 'certType': null}, {'page': 1, 'size': 10, 'total': 809, 'loginUserId': 'admin', 'loginUserOrgCode': '00010', 'loginUserLeageOrgCode': null, 'loginUserOrgLocation': '00010', 'prdCodebyBaseInfo': null, 'dutyCodeStr': null, 'userCode': '00193', 'userName': '陈向华', 'nickName': '陈向华', 'legalOrgCode': null, 'legalOrgName': null, 'orgCode': '00010', 'orgName': '广州银行总行', 'userPwd': null, 'status': '0', 'birthday': '', 'telPhone': '13711411047', 'idCardNo': '', 'email': '', 'sex': '', 'staffingLevel': '', 'age': null, 'createTime': '2021-04-25 00:00:00', 'createUser': 'admin', 'lastLoginTime': null, 'currPwdWrongNum': null, 'pwdValdaDate': '', 'eduLevel': '', 'memo': '', 'lastUpdateUser': null, 'lastUpdateTime': '2022-03-16 15:16:41', 'handleColtTaskCount': 0, 'rescRoleMap': null, 'isTeller': 'Y', 'ownBranch': '福利支行', 'isUseFingerprint': '', 'tellerLevel': '', 'tellerCategory': '', 'isInitPwd': 'N', 'isSyncUser': null, 'certType': null}, {'page': 1, 'size': 10, 'total': 809, 'loginUserId': 'admin', 'loginUserOrgCode': '00010', 'loginUserLeageOrgCode': null, 'loginUserOrgLocation': '00010', 'prdCodebyBaseInfo': null, 'dutyCodeStr': null, 'userCode': '00196', 'userName': '魏晓亮', 'nickName': '魏晓亮', 'legalOrgCode': null, 'legalOrgName': null, 'orgCode': '00010', 'orgName': '广州银行总行', 'userPwd': null, 'status': '1', 'birthday': '', 'telPhone': '', 'idCardNo': '', 'email': '', 'sex': '', 'staffingLevel': '', 'age': null, 'createTime': '2021-04-25 00:00:00', 'createUser': 'admin', 'lastLoginTime': null, 'currPwdWrongNum': null, 'pwdValdaDate': '', 'eduLevel': '', 'memo': '', 'lastUpdateUser': 'admin', 'lastUpdateTime': '2021-04-25 00:00:00', 'handleColtTaskCount': 0, 'rescRoleMap': null, 'isTeller': 'N', 'ownBranch': '芳草支行', 'isUseFingerprint': '', 'tellerLevel': '', 'tellerCategory': '', 'isInitPwd': 'N', 'isSyncUser': null, 'certType': null}, {'page': 1, 'size': 10, 'total': 809, 'loginUserId': 'admin', 'loginUserOrgCode': '00010', 'loginUserLeageOrgCode': null, 'loginUserOrgLocation': '00010', 'prdCodebyBaseInfo': null, 'dutyCodeStr': null, 'userCode': '00238', 'userName': '王春林', 'nickName': '王春林', 'legalOrgCode': null, 'legalOrgName': null, 'orgCode': '00010', 'orgName': '广州银行总行', 'userPwd': null, 'status': '1', 'birthday': '', 'telPhone': '13570079000', 'idCardNo': '', 'email': '', 'sex': '', 'staffingLevel': '', 'age': null, 'createTime': '2021-04-25 00:00:00', 'createUser': 'admin', 'lastLoginTime': null, 'currPwdWrongNum': null, 'pwdValdaDate': '', 'eduLevel': '', 'memo': '', 'lastUpdateUser': 'admin', 'lastUpdateTime': '2021-04-25 00:00:00', 'handleColtTaskCount': 0, 'rescRoleMap': null, 'isTeller': 'N', 'ownBranch': '广州客村支行', 'isUseFingerprint': '', 'tellerLevel': '', 'tellerCategory': '', 'isInitPwd': 'N', 'isSyncUser': null, 'certType': null}, {'page': 1, 'size': 10, 'total': 809, 'loginUserId': 'admin', 'loginUserOrgCode': '00010', 'loginUserLeageOrgCode': null, 'loginUserOrgLocation': '00010', 'prdCodebyBaseInfo': null, 'dutyCodeStr': null, 'userCode': '00262', 'userName': '文敏', 'nickName': '文敏', 'legalOrgCode': null, 'legalOrgName': null, 'orgCode': '00010', 'orgName': '广州银行总行', 'userPwd': null, 'status': '1', 'birthday': '', 'telPhone': '18620205599', 'idCardNo': '', 'email': '', 'sex': '', 'staffingLevel': '', 'age': null, 'createTime': '2021-04-25 00:00:00', 'createUser': 'admin', 'lastLoginTime': null, 'currPwdWrongNum': null, 'pwdValdaDate': '', 'eduLevel': '', 'memo': '', 'lastUpdateUser': 'admin', 'lastUpdateTime': '2021-04-25 00:00:00', 'handleColtTaskCount': 0, 'rescRoleMap': null, 'isTeller': 'N', 'ownBranch': '森保支行', 'isUseFingerprint': '', 'tellerLevel': '', 'tellerCategory': '', 'isInitPwd': 'N', 'isSyncUser': null, 'certType': null}, {'page': 1, 'size': 10, 'total': 809, 'loginUserId': 'admin', 'loginUserOrgCode': '00010', 'loginUserLeageOrgCode': null, 'loginUserOrgLocation': '00010', 'prdCodebyBaseInfo': null, 'dutyCodeStr': null, 'userCode': '00284', 'userName': '冼志明', 'nickName': '冼志明', 'legalOrgCode': null, 'legalOrgName': null, 'orgCode': '00010', 'orgName': '广州银行总行', 'userPwd': null, 'status': '1', 'birthday': '', 'telPhone': '13602856423', 'idCardNo': '', 'email': '', 'sex': '', 'staffingLevel': '', 'age': null, 'createTime': '2021-04-25 00:00:00', 'createUser': 'admin', 'lastLoginTime': null, 'currPwdWrongNum': null, 'pwdValdaDate': '', 'eduLevel': '', 'memo': '', 'lastUpdateUser': 'admin', 'lastUpdateTime': '2021-04-25 00:00:00', 'handleColtTaskCount': 0, 'rescRoleMap': null, 'isTeller': 'N', 'ownBranch': '龙津东支行', 'isUseFingerprint': '', 'tellerLevel': '', 'tellerCategory': '', 'isInitPwd': 'N', 'isSyncUser': null, 'certType': null}, {'page': 1, 'size': 10, 'total': 809, 'loginUserId': 'admin', 'loginUserOrgCode': '00010', 'loginUserLeageOrgCode': null, 'loginUserOrgLocation': '00010', 'prdCodebyBaseInfo': null, 'dutyCodeStr': null, 'userCode': '00299', 'userName': '秦巧珊', 'nickName': '秦巧珊', 'legalOrgCode': null, 'legalOrgName': null, 'orgCode': '00010', 'orgName': '广州银行总行', 'userPwd': null, 'status': '1', 'birthday': '', 'telPhone': '18620101089', 'idCardNo': '', 'email': '', 'sex': '', 'staffingLevel': '', 'age': null, 'createTime': '2021-04-25 00:00:00', 'createUser': 'admin', 'lastLoginTime': null, 'currPwdWrongNum': null, 'pwdValdaDate': '', 'eduLevel': '', 'memo': '', 'lastUpdateUser': 'admin', 'lastUpdateTime': '2021-04-25 00:00:00', 'handleColtTaskCount': 0, 'rescRoleMap': null, 'isTeller': 'N', 'ownBranch': '赤岗支行', 'isUseFingerprint': '', 'tellerLevel': '', 'tellerCategory': '', 'isInitPwd': 'N', 'isSyncUser': null, 'certType': null}, {'page': 1, 'size': 10, 'total': 809, 'loginUserId': 'admin', 'loginUserOrgCode': '00010', 'loginUserLeageOrgCode': null, 'loginUserOrgLocation': '00010', 'prdCodebyBaseInfo': null, 'dutyCodeStr': null, 'userCode': '00323', 'userName': '钟丽娟', 'nickName': '钟丽娟', 'legalOrgCode': null, 'legalOrgName': null, 'orgCode': '00010', 'orgName': '广州银行总行', 'userPwd': null, 'status': '1', 'birthday': '', 'telPhone': '13922245331', 'idCardNo': '', 'email': '', 'sex': '', 'staffingLevel': '', 'age': null, 'createTime': '2021-04-25 00:00:00', 'createUser': 'admin', 'lastLoginTime': null, 'currPwdWrongNum': null, 'pwdValdaDate': '', 'eduLevel': '', 'memo': '', 'lastUpdateUser': 'admin', 'lastUpdateTime': '2021-04-25 00:00:00', 'handleColtTaskCount': 0, 'rescRoleMap': null, 'isTeller': 'N', 'ownBranch': '科技支行', 'isUseFingerprint': '', 'tellerLevel': '', 'tellerCategory': '', 'isInitPwd': 'N', 'isSyncUser': null, 'certType': null}, {'page': 1, 'size': 10, 'total': 809, 'loginUserId': 'admin', 'loginUserOrgCode': '00010', 'loginUserLeageOrgCode': null, 'loginUserOrgLocation': '00010', 'prdCodebyBaseInfo': null, 'dutyCodeStr': null, 'userCode': '00496', 'userName': '温华', 'nickName': '温华', 'legalOrgCode': null, 'legalOrgName': null, 'orgCode': '00010', 'orgName': '广州银行总行', 'userPwd': null, 'status': '1', 'birthday': '', 'telPhone': '13710848678', 'idCardNo': '', 'email': '', 'sex': '', 'staffingLevel': '', 'age': null, 'createTime': '2021-04-25 00:00:00', 'createUser': 'admin', 'lastLoginTime': null, 'currPwdWrongNum': null, 'pwdValdaDate': '', 'eduLevel': '', 'memo': '', 'lastUpdateUser': 'admin', 'lastUpdateTime': '2021-04-25 00:00:00', 'handleColtTaskCount': 0, 'rescRoleMap': null, 'isTeller': 'N', 'ownBranch': '沙河支行', 'isUseFingerprint': '', 'tellerLevel': '', 'tellerCategory': '', 'isInitPwd': 'N', 'isSyncUser': null, 'certType': null}], 'code': '0', 'message': '处理成功', 'total': 809, 'success': true};
    return returnObj;
  };
});