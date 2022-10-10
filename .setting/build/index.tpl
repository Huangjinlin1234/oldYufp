<!--
  @created by helin3 2018-04-16
  @updated by
  @description 系统入口页面--模板
-->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{ appName }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="themes/common/images/favicon.ico" type="image/x-icon" />
    <style>
        html,body{width:100%;height: 100%;background-color:white;margin:0px;padding: 0px;overflow: hidden;}#_rootDiv{ width:100%;height:100%;margin: 0px;padding: 0px;overflow: hidden;}#_rootDiv > div{width:100%;height:100%;margin: 0px;padding: 0px;overflow: hidden;}
    </style>
</head>
  <body>
    <div id="_rootDiv"></div>
  </body>
  <script>document.write('<script src="custom/config.js?r='+new Date().getTime()+'"><\/script>');</script>
  <script src="libs/yufp/yufp-1.0.0{{yufpCoreMin}}.js?b={{buildDate}}"></script>
  <script src="custom/main.js?b={{buildDate}}"></script>
</html>