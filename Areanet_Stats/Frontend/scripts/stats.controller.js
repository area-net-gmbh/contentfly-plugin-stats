(function() {
  'use strict';

  angular
    .module('app')
    .controller('AreanetStatsCtrl', AreanetStatsCtrl);

  function AreanetStatsCtrl($scope, $rootScope, $location, localStorageService, $cookies, $http){
    var vm = this;

    //Properties
    vm.dataUsage      = {};
    vm.dataView       = [];
    vm.filterDevice   = '0';
    vm.filterTime     = '0';
    vm.isLoading      = false;
    vm.modes          = [{key: 'Usage', label: 'Benutzung'}, {key: 'View', label: 'Inhalte'}];
    vm.mode           = vm.modes[0];

    //Methods
    vm.loadData = loadData;
    vm.setMode  = setMode;

    init();

    ///////////////////////////

    function getWhereString(mode){
      var whereStr = 'mode = ?';
      var whereParams = [mode];

      if(vm.filterDevice && vm.filterDevice != '0'){
        whereStr += ' AND platform = ?';
        whereParams.push(vm.filterDevice);
      }

      var year  = new Date().getFullYear();
      var month = new Date().getMonth() + 1;

      switch(vm.filterTime){
        case 1:
        case '1':
          whereStr += ' AND YEAR(created) = ? AND MONTH(created) = ?';
          whereParams.push(year);
          whereParams.push(month);
          break;
        case 2:
        case '2':
          whereStr += ' AND YEAR(created) = ? AND MONTH(created) = ?';

          if(month == 1){
            month = 12;
            year--;
          }else{
            month--;
          }

          whereParams.push(year);
          whereParams.push(month);
          break;
      }

      var where = {};
      where[whereStr] = whereParams;

      return where;
    }

    function init(){
      loadDataUsage();
    }

    function loadData(){
      switch(vm.mode.key){
        case 'Usage':
          loadDataUsage();
          break;
        case 'View':
          loadDataView();
          break;
      }
    }

    function loadDataUsage(){

      vm.dataView   = null;
      vm.isLoading  = true;

      $http({
        method: 'POST',
        url: '/api/query',
        data: {
          select: 'uid, COUNT(*) AS views, SUM(duration) as durationSum, SUM(duration)/COUNT(*) as durationAvg',
          from: 'plugin_areanet_stats',
          where: getWhereString(1),
          groupBy: 'uid'
        }
      }).then(function(response){

        vm.isLoading = false;

        var views = response.data.data.length ? response.data.data.reduce(function(total, item){
          return (total.views ? parseInt(total.views) : total) + parseInt(item.views);
        }) : 0;

        var duration = response.data.data.length ? response.data.data.reduce(function(total, item){
          return (total.durationAvg ? parseInt(total.views) : total) + parseInt(item.durationAvg);
        }) : 0;

        vm.dataUsage = {
          users: response.data.data.length,
          views:views,
          duration: duration,
          durationAvg: views ? duration/views : 0
        };

        console.log();

      }).catch(function(error){
        vm.isLoading = false;
      })
    }

    function loadDataView(){

      vm.dataUsage  = null;
      vm.isLoading  = true;

      $http({
        method: 'POST',
        url: '/api/query',
        data: {
          select: 'reference, referenceId, label, COUNT(*) AS views',
          from: 'plugin_areanet_stats',
          where: getWhereString(2),
          groupBy: 'referenceId',
          orderBy: {'views': 'DESC', 'label' : 'ASC'},
          setMaxResults: 50
        }
      }).then(function(response){
        vm.isLoading = false;

        vm.dataView = response.data.data;

      }).catch(function(error){
        vm.isLoading = false;
      });
    }

    function setMode(mode){
      vm.mode = mode;
      console.log(vm.mode);
      loadData();
    }

  }

})();