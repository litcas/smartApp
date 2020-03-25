apiready = function apiready() {
    api.showProgress({
        title: '加载地图中...',
        modal: false
    });
    setTimeout(() => {
        api.hideProgress();
    }, 5000)
    apiready_init();
    vm.aMapLBS = api.require('aMapLBS');
    vm.aMap = api.require('aMap');
    //  vm.$mount('#wrap');
};


var vm = new Vue({
    el: '#wrap',
    data: {
        searchValue: '',
        mapShowPicker: false,
        mapColumnsDefault: '0',
        mapColumns: [{
            text: '矢量地图',
            value: 'sldt',
            key: '0'
        }, {
            text: '卫星地图',
            value: 'yxdt',
            key: '1'
        }, {
            text: '地形地图',
            value: 'dxdt',
            key: '2'
        }],
        fwcxing: false,
        aMapLBS: null,
        aMap: null,
        timeoutStamp: null,
        ro: {}
    },
    methods: {
        onClickLeft() {
            this.closeWin()
        },
        openW(win) {
            this.openWin(win,window.geometry_pageParam);
        },
        fwcxCLick() {
            this.fwcxing = true
            window.userCustomObj.fwcxClick()
        },
        fwcxComplete() {
            window.userCustomObj.sketchViewModel.complete()
        },
        fwcxCancal() {
            window.userCustomObj.sketchViewModel.cancel()
            this.fwcxing = false
        },
        changeMapOnConfirm(o) {
            window.userCustomObj.changeMap(o.value)
            this.mapColumnsDefault = o.key
            this.mapShowPicker = false
        },
        changeMapClick(s) {
            this.mapShowPicker = true
        },
        drawLocation() {
            var aMapLBS = this.aMapLBS
            var that = this
            if (!aMapLBS) {
                return
            }
            if (that.timeoutStamp) {
                window.userCustomObj.centerAt(that.ro.lon, that.ro.lat)
                return
            }
            api.showProgress({
                text: '努力定位中...',
                modal: false
            });
            aMapLBS.configManager({
                accuracy: 'best',
                filter: 1
            }, function(ret, err) {
                if (ret.status) {
                    aMapLBS.singleLocation({
                        timeout: 6
                    }, function(ret, err) {
                        if (ret.status) {
                            var ro = window._coordinate(ret.lat, ret.lon)
                            that.ro = ro
                            window.userCustomObj.drawLocation(ro.lon, ro.lat)
                            window.userCustomObj.centerAt(ro.lon, ro.lat)
                        }
                        that.refreshLocation()
                        api.hideProgress();
                    })
                }
            })
        },
        refreshLocation() {
            var self = this
            var f = function() {
                self.aMapLBS.singleLocation({
                    timeout: 6
                }, function(ret, err) {
                    if (ret.status) {
                        window.userCustomObj.clearUpSelection()
                        var ro = window._coordinate(ret.lat, ret.lon)
                        self.ro = ro
                        window.userCustomObj.drawLocation(ro.lon, ro.lat)
                        self.timeoutStamp = window.setTimeout(f, 8000)
                    } else {
                        self.timeoutStamp = window.setTimeout(f, 8000)
                    }
                })
            }
            self.timeoutStamp = window.setTimeout(f, 8000)
        },
        onSearch() {
            window.userCustomObj.clearMarker()
            var ro = window.userCustomObj.getCenterPoint()
            var that = this
            this.aMap.getNameFromCoords({
                lon: ro.lon,
                lat: ro.lat
            }, function(ret, err) {
                if (ret.status) {
                    that.aMap.getCoordsFromName({
                        city: ret.city,
                        address: that.searchValue
                    }, function(ret2, err) {
                        if (ret2.status) {
                            var ro = window._coordinate(ret2.lat, ret2.lon)
                            window.userCustomObj.addMarker(ro.lon, ro.lat)
                            window.userCustomObj.centerAt(ro.lon, ro.lat)
                        } else {
                           that.$toast.fail('未查询到结果');
                        }
                    });
                } else {
                    that.$toast.fail('未查询到结果');
                }
            });
        },
        onClear(){
            window.userCustomObj.clearMarker()
        }

    },
    mounted() {

    }
});
