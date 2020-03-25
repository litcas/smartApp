var allMap; //全局map变量
var baselayer; //地图底图
require([
    "esri/widgets/Sketch",
    "esri/Map",
    "esri/layers/GraphicsLayer",
    "esri/layers/TileLayer",
    "esri/views/MapView",
    "esri/geometry/Extent",
    "esri/widgets/Sketch/SketchViewModel",
    "esri/tasks/QueryTask",
    "esri/tasks/support/Query",
    "esri/widgets/Zoom",
    "esri/geometry/Point",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Graphic",
    "dojo",
], function(Sketch, Map, GraphicsLayer, TileLayer, MapView, Extent, SketchViewModel,
  QueryTask, Query, Zoom, Point, SimpleMarkerSymbol, SimpleLineSymbol, Graphic,dojo) {

    var map,
        view,
        polygonGraphicsLayer,
        sketchViewModel;
    //      const layer = new GraphicsLayer();

    var baselayer = new TileLayer(MapConfig.sldt);

    map = new Map({
        logo: false,
        slider: false,
        lods: MapConfig.mapInitParams.lods
    });


    map.add(baselayer);

    view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: MapConfig.mapInitParams.initZoom,
        center: MapConfig.mapInitParams.center
    });
    var initExtent = new Extent({
        xmin: MapConfig.mapInitParams.extent.xmin,
        ymin: MapConfig.mapInitParams.extent.ymin,
        xmax: MapConfig.mapInitParams.extent.xmax,
        ymax: MapConfig.mapInitParams.extent.ymax,
        spatialReference: MapConfig.mapInitParams.spatialReference
    });

    view.extent = initExtent;
    setUpSketchViewModel();
    sketchViewModel.on("create", function(event) {
        if (event.state === "complete") {
            // this polygon will be used to query features that intersect it
            polygonGraphicsLayer.remove(event.graphic);
            selectFeatures(event.graphic.geometry);
        }
    });

    function setUpSketchViewModel() {
        // polygonGraphicsLayer will be used by the sketchviewmodel
        // show the polygon being drawn on the view
        polygonGraphicsLayer = new GraphicsLayer();
        map.add(polygonGraphicsLayer);

        // add the select by polygon button the view
        // view.ui.add("select-by-polygon", "top-right");
        // const selectButton = document.getElementById("select-by-polygon");

        // click event for the button
        // selectButton.addEventListener("click", function() {
        //     clearUpSelection();
        //     view.popup.close();
        //     // ready to draw a polygon
        //     sketchViewModel.create("polygon");
        // });



        // create a new sketch view model set its layer
        sketchViewModel = new SketchViewModel({
            view: view,
            layer: polygonGraphicsLayer,
            pointSymbol: {
                type: "simple-marker",
                color: [255, 255, 255, 0],
                size: "1px",
                outline: {
                    color: "gray",
                    width: 0
                }
            }
        });
    }

    function clearUpSelection() {
        view.graphics.removeAll();
        //        grid.clearSelection();
    }

    function selectFeatures(geometry) {
      // console.log(geometry)
      window.geometry_pageParam = geometry
        var url = "http://218.77.59.2:8599/arcgis/rest/services/pl/testpl2/MapServer/1";
        var queryTask = new QueryTask(url);
        var query = new Query();
        query.returnGeometry = true;
        query.outFields = ["*"];
        query.geometry = geometry;
        query.where = ""
            //  queryTask.execute(query, searchPLLayerBack);
        queryTask
            .execute(query)
            .then(getResults)
            .catch(promiseRejected);
    };

    function getResults(response) {

        // debugger;
        // console.log(response)


        // vm.$dialog.alert({
        //     message: response.features["0"].attributes.MC
        // }).then(() => {
        //     vm.fwcxing = false
        // });

        vm.openW('win_cloudquery_result')

        //  alert(response.features["0"].attributes.MC)
    }

    function promiseRejected(error) {
        console.log("Promise rejected: ", error.message);
        vm.$notify({
            type: 'warning',
            message: '未查询到结果'
        });
        vm.fwcxing = false
    }





    // 删除底部控件，添加缩放按钮至右下角
    view.ui.remove('attribution')
    view.ui.remove('zoom')
    var zoom = new Zoom({
        view: view
    })
    view.ui.add(zoom, 'bottom-right')


    window.userCustomObj = {
        sketchViewModel: sketchViewModel,
        fwcxClick: function() { //范围查询
            clearUpSelection();
            view.popup.close();
            // ready to draw a polygon
            sketchViewModel.create("polygon");
        },
        centerAt: function(longitude, latitude) { //地图移动     经度，维度
            var pt = new Point(longitude, latitude);
            view.goTo(pt);
        },
        changeMap: function(type) { //切换地图
            map.removeAll();
            switch (type) { //
                case "sldt": //矢量地图
                    baselayer = new TileLayer(MapConfig.sldt);
                    map.add(baselayer);
                    break;
                case "yxdt": //影像地图
                    baselayer = new TileLayer(MapConfig.yxdt);
                    map.add(baselayer);
                    break;
                case "dxdt": //地形地图
                    baselayer = new TileLayer(MapConfig.dxdt);
                    map.add(baselayer);
                    break;
            }
        },
        drawLocation: function(lon, lat) {
            var labelPoint = new Point(lon, lat);
            var sls = new SimpleLineSymbol({
                color: '#1394ff'
            });
            var labelSymbol = new SimpleMarkerSymbol({
                color: '#1394ff',
                outline: sls
            });
            var labelGraphic = new Graphic(labelPoint, labelSymbol);
            view.graphics.add(labelGraphic);
        },
        clearUpSelection: clearUpSelection,
        addMarker: function(lon, lat) {
            var gLayer = new GraphicsLayer();
            map.add(gLayer);
            var symbol = {
                type: "picture-marker",
                url: "../../image/map-marker.png", //图片地址
                width: "28px",
                height: "28px"
            };
            var point = new Point(lon, lat);
            var gp = new Graphic(point, symbol);
            gLayer.graphics.add(gp); //添加到图层中显示
            vm.gLayer = gLayer
            vm.gp = gp
        },
        clearMarker: function() {
            if (vm.gLayer && vm.gLayer.graphics) {
                vm.gLayer.graphics.remove(vm.gp);
            }
        },
        getCenterPoint: function() {
            var lat = view.center.latitude
            var lon = view.center.longitude
            return {
                lat: lat,
                lon: lon
            };
        },
        createPointGraphic: function(coordinates) {
            view.graphics.removeAll();
            var point = {
                type: "point", // autocasts as /Point
                // x: coordinates[0],
                // y: coordinates[1],
                x: 114.28440870109,
                y: 36.07285172614,
                spatialReference: view.spatialReference
            };

            var graphic = new Graphic({
                geometry: point,
                symbol: {
                    type: "simple-marker", // autocasts as SimpleMarkerSymbol
                    style: "square",
                    color: "red",
                    size: "16px",
                    outline: { // autocasts as SimpleLineSymbol
                        color: [255, 255, 0],
                        width: 3
                    }
                }
            });
            console.log(graphic)
            view.graphics.add(graphic);
        }
    }




});
