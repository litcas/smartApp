apiready=function(){apiready_init(),vm.$mount("#wrap"),vm.pageParam=api.pageParam};var vm=new Vue({el:"#wrap",data:{list:[],pageParam:null},methods:{onClickLeft:function(){this.closeWin()},openW:function(a){this.openWin(a,this.pageParam)}},mounted:function(){this.list=[{id:1,status:"完成",datetime:"2019/05/08 17:33"},{id:2,status:"完成",datetime:"2019/09/28 08:02"},{id:2,status:"完成",datetime:"2019/12/01 11:39"}]}});