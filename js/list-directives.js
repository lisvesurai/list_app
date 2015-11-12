(function(){
	var app = angular.module('list-directives', []);

	app.directive("listTabs", function() {
		return {
			restrict: "E",
			templateUrl: "list-tabs.html",
			controller: function() {
				this.tab = -1;

				this.isSet = function(checkTab) {
					return this.tab === checkTab;
				};

				this.setTab = function(activeTab) {
					this.tab = activeTab;
				};
			},
			controllerAs: "tab"
		};
	});

	app.directive("listItems", function() {
		return {
			restrict: 'E',
			templateUrl: "list-items.html"
		};
	});	
	
	app.directive("colorPicker", function() {
		return {
			restrict: "E",
			templateUrl: "color-picker.html",
			controller: function() {
				this.picker = -1;

				this.isSet = function(checkPicker) {
					return this.picker === checkPicker;
				};

				this.setPicker = function(activePicker) {
					this.picker = activePicker;
				};
			},
			controllerAs: "picker"
		};
	});

	app.directive("contenteditable", function() {
		return {
			restrict: "A",
			require: "ngModel",
			link: function(scope, element, attr, ngModel) {
				var tabindex = parseInt(attr.tabindex);
	
				function read() {
					var html = element.html();
					html = html.replace(/&nbsp;/g, "\u00a0");
					ngModel.$setViewValue(html);
				}
	
				ngModel.$render = function() {
					element.html(ngModel.$viewValue || "");
				};
	
				element.bind("blur keyup change", function() {
					scope.$apply(read);
					localStorage.setItem('lists', JSON.stringify(scope.lists));
				});
				
				element.on('keydown', function (event){
					if(event.which === 13){
						window.event.cancelBubble = true;
						event.returnValue = false;
						event.preventDefault();
        		localStorage.setItem('lists', JSON.stringify(scope.lists));
					}
      	});
			}
		};
	});

})();

