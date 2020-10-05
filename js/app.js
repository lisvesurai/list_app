(function() {
  var app = angular.module('listApp', ['list-directives']);
  var defaultColors = [
        '#ed5151',
        '#ed8551',
        '#edb951',
        '#eded51',
        '#b9ed51',
        '#85ed51',
        '#51ed51',
        '#51ed85',
        '#51edb9',
        '#51eded',
        '#51b9ed',
        '#5185ed',
		'#5151ed',
		'#8551ed',
		'#b951ed',
		'#ed51ed',
		'#ed51b9',
		'#ed5185',
		'#909090',
		'#eeeeee'
  ];

  app.controller('ListController', function($scope) {
		$scope.saved = localStorage.getItem('lists');
		$scope.lists = (localStorage.getItem('lists')!==null) ? JSON.parse($scope.saved) : [];
		$scope.colors = defaultColors;
		localStorage.setItem('lists', JSON.stringify($scope.lists));

		$scope.add = function(tab) {
			$scope.lists.push({
				name: $scope.listName,
				listitems: [],
				color: $scope.colors[Math.floor(Math.random() * $scope.colors.length)]
			});
			$scope.listName = '';
			localStorage.setItem('lists', JSON.stringify($scope.lists));
			tab.setTab($scope.lists.length-1);
			window.location='#newlist';
		};
			
 		this.del = function($index) {
			$scope.lists.splice($index,1);
			localStorage.setItem('lists', JSON.stringify($scope.lists));
    };
    
		this.changeColor = function(picker) {
			picker.setPicker(-1);
			localStorage.setItem('lists', JSON.stringify($scope.lists));
		};
  });

  app.controller('ListitemController', function($scope) {
    this.listitem = {};

    this.add = function(list) {
			if (this.listitem.text!==undefined){
      	list.listitems.push({
					text: this.listitem.text,
					done: false
				});
			}
      this.listitem = {};
			localStorage.setItem('lists', JSON.stringify($scope.lists));
    };
		
    this.del = function(list,$index) {
			list.listitems.splice($index,1);
			localStorage.setItem('lists', JSON.stringify($scope.lists));
    };

    this.mark = function() {
			localStorage.setItem('lists', JSON.stringify($scope.lists));
    };
  });
	
  app.controller('ColorPickerController', function($scope) {
		$scope.colors = defaultColors;
  });
})();
