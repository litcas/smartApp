apiready=function(){apiready_init(),vm.$mount("#wrap")};var vm=new Vue({el:"#wrap",data:{list:[]},methods:{onClickLeft:function(){this.closeWin()},watchClick:function(t){this.$dialog.alert({title:t.title,message:t.content}).then(function(){})}},mounted:function(){this.list=[{id:1,title:"小阿三大苏打1111",content:"大师傅但是",datetime:"2019/01/01"},{id:2,title:"决定是否",content:"大师傅但是",datetime:"2019/01/01"},{id:2,title:"吃不吃",content:"大师傅但是",datetime:"2019/01/01"}]}});