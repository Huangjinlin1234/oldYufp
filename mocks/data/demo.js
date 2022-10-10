/**
 * @create by xxx on 2018-xx-xx
 * @description xx
 */
define([
    './mocks/data/stencisets.js'
],
function (require, exports) {
	
	var List = [];
    var count = 55;
	
	Mock.Random.increment(100)
    for (var i = 0; i < count; i++) {
        List.push(Mock.mock({
            id: '@increment(2)',
            name: '@cname',
            orgId: '100',
            "gender|1": ['01', '02'],
            "education|1": ['0', '1', '2', '3', '4'],
            "cardType|1": ['1', '2', '3', '4'],
            barthday: '@date',
            cardNo: '@id(18)',
            company: '@cname',
            company: '@ctitle(5, 18)',
            email: '@email',
            mount: '10000000.00',
            obligate1: '@ctitle(5, 18)',
            obligate2: '@ctitle(5, 18)',          
            obligate3: '@ctitle(5, 18)',
            obligate4: '@ctitle(5, 18)',
            obligate5: '@ctitle(5, 18)',
            obligate6: '@ctitle(5, 18)',
            obligate7: '@ctitle(5, 18)',       
            obligate8: '@ctitle(5, 18)',
            obligate21: '@ctitle(5, 18)',
            obligate22: '@ctitle(5, 18)',          
            obligate23: '@ctitle(5, 18)',
            obligate24: '@ctitle(5, 18)',
            obligate25: '@ctitle(5, 18)',
            obligate26: '@ctitle(5, 18)',
            obligate27: '@ctitle(5, 18)',       
            obligate28: '@ctitle(5, 18)'
        }))
    }
    
    function paramUrl2Obj(url) {
        var search = url.split('?')[1]
        if (!search) {
            return {}
        }
        return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\n/g, '\\n') + '"}')
    }

    function paramBody2Obj(body) {
        if (!body) {
            return {}
        }
        return JSON.parse(body);
    }

    // page加载完成后调用ready方法
    exports.getList = function (config) {
        var reqData = paramBody2Obj(config.body)
        //var reqData = paramUrl2Obj(config.url);
        var page = reqData.page;
        var size = reqData.size;
        var condition = reqData.condition ? JSON.parse(reqData.condition) : {};
        var create_at = condition.create_at;
        var type = condition.type;
        var title = condition.title;
        var name = condition.name;
        var gender = condition.gender;
        var sort = condition.sort;
        // var { condition, page = 1, size = 20 } = param2Obj(config.url)
        // var { create_at, type, title, sort } = JSON.parse(condition)
        
        if(!sort) {
        	sort = 'id';
        }

        var mockList = List.filter(function (item) {
            if (name && item.name.indexOf(name) < 0)
                return false;
            if (gender && item.gender !== gender)
                return false;
            if (title && item.title.indexOf(title) < 0)
                return false;
            return true
        });
        if (sort === '-id') {
            mockList = mockList.reverse()
        }
        var pageList = [];
        if (page && size) {
            pageList = mockList.filter(function(item, index){
                return index < size * page && index >= size * (page - 1)
            });
        } else {
            pageList = mockList;
        }
        return {
            total: mockList.length,
            data: pageList
        }
    };
    
    exports.info = function (config) {
    	var temp = paramUrl2Obj(config.url);	
    	var info = {};
    	for (var i=List.length-1;i>=0;i--) {
            var v = List[i];
            if (v.id === Number(temp.id)) {
               info = v;
               break;
            }
        }
        return info;
    };
    
    exports.save = function(config){
        var temp = paramBody2Obj(config.body);
        console.log(temp);
        temp.id = !temp.id ? Math.floor(Math.random() * 1000+10000) : temp.id;
        var updateFlag = false;
        for (var i=List.length-1;i>=0;i--) {
            var v = List[i];
            if (v.id === temp.id) {
                var index = List.indexOf(v);
                List.splice(index, 1, temp);
                updateFlag = true;
                break;
            }
        }
        if (!updateFlag) {
            List.unshift(temp);
        }
        return {
            code: 0
        };
    };
    
    exports.delete = function (config) {
        var temp = paramBody2Obj(config.body);
        var ids = temp.ids.split(',');
        for (var i=List.length-1;i>=0;i--) {
            var v = List[i];
            for (var j=ids.length-1;j>=0;j--) {
                var id = ids[j];
                if (v.id === Number(id)) {
                    var index = List.indexOf(v);
                    List.splice(index, 1);
                    ids.splice(j,1);
                    break
                }
            }
        }
        return {
            code: '0'
        };
    },
    
    exports.getStencilSets = function(config) {
    	var temp = paramBody2Obj(config.body);

        return stencisets;
    }
 
});