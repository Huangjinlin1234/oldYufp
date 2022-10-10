/**
 * yufp-pageable-table
 * 表格JS分页组件
 * 
 * Created by chenyg3 on 2018-07-26
 */
(function (vue, $, name) {

    vue.component(name, {
            template: '<div><template>\
            		<el-table-x ref="baseTable" :pageable="false" :default-load="false"  \
                     :table-columns="tableColumns" :checkbox="checkbox" :row-index="rowIndex">\
                    </el-table-x>\
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"\
                     :current-page.sync="currentPage" :page-sizes="pageSizes" :layout="layout" \
                     :page-size="pageSize" :total="total" ></el-pagination>\
                </template></div>',
            props: {
                rowIndex: Boolean,
                checkbox: Boolean,
                tableColumns: Array,
                totalData: Array,
                params: Object
            },
            data: function () {
                return {
                	pageSize: 10, //当前页大小
                    total: 0, //总数
                    currentPage: 1,
                    pageSizes: [10, 20, 30, 40, 50, 100, 200],
                    layout: 'total, sizes, prev, pager, next, jumper',
                    showData: []  //当前页展示的数据
                };
            },
            computed: {
                startIndex: function() {
                    return this.pageSize * (this.currentPage - 1);
                },
                endIndex: function() {
                    return this.pageSize * this.currentPage;
                },
                selections: function() {
                    return this.$refs.baseTable.selections;
                }
            },
            methods: {
                handleSizeChange: function(val) {
                    this.pageSize = val;
                    this.currentPage = 1; //重置当前页
                    this.$nextTick(function() {
                        this.showTable();
                    });
                },
                handleCurrentChange: function(val){
                    this.$nextTick(function() {
                        this.showTable();
                    });
                },
                /** 插入多项数组 */
                pushAll: function(arr) {
                    
                },
                showTable: function() {
                    var start = this.startIndex < this.total ? this.startIndex : 0;
                    var end = this.endIndex < this.total ? this.endIndex : this.total;
                    var showData = [];
                    for (var i = start; i < end; i++) {
                        showData.push(this.totalData[i]);
                    }
                    this.showData = showData;
                }
            },
            mounted: function () {
            },
            watch: {
                totalData: function(val){
                    val = val || [];
                    this.total = val.length;
                    this.currentPage = 1; //重置当前页
                    this.$nextTick(function() {
                        this.showTable();
                    });
                },
                total: function(val) {
                    if (val == 0 ){
                        this.currentPage = 1;
                    }
                },
                showData: function(val) {
                    this.$refs.baseTable.data = val;
                }
            }
        }

    );
})(Vue, yufp.$, 'yufp-pageable-table');