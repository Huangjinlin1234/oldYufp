/**
 * Created by 江成 on 2017/03/05.
 */
define(function (require) {
    //定义路由表
    var routeTable = {
        REPORT_FileExportListPageInfo: {
            html: 'pages/psp/FileExportListPageInfo.html',
            js: 'pages/psp/FileExportListPageInfo.js'
        }

    };
    //注册路由表
    yufp.router.addRouteTable(routeTable);
});