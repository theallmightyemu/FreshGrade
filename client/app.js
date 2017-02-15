/*
@title: Fresh Grade Tech Test
@date: 2017-02-10
@author: Deryk Schneider
@contact: deryk.schneider@gmail.com
@notes: source on git, summary in README.md

Because this app is so simple and just a demo I didn't bother with custom directives or models.
I would implement a proper front end app for a more robust or more complicated solution.

*/

(function(angular) {
	'use strict';
	angular.module('App', [])
	.controller('AppCtrl', function($scope, $http) {
		$scope.students = {};
		$scope.student  = {};
		$scope.name     = $('#name');
		$scope.section  = $('section');
		$scope.pic      = '';

		$scope.open = function (target, id) {
			$scope.section.fadeOut();
			$('section.'+target).fadeIn();

			if (target == 'studentAdd') {
				$scope.name.val('');
				$scope.pic = '';
			}
			if (target == 'studentList') {
				$scope.list();
			}
			if (target == 'studentDetail') {
				$scope.load(id);
			}
		}
		$scope.save = function () {
			var data = {name: $scope.name.val(), profilePic: $scope.pic};
			$http.post("http://localhost:9980/students/", data)
			.error(function(response) { console.log('error',response); })
			.success(function(response) {
				console.log('success',response);
				$scope.open('studentList');
			});
		}
		$scope.list = function () {
			$http.get("http://localhost:9980/students/")
			.then(function(response) {
				$scope.students = response.data;
				console.log('loading list',response.data);
			});
		}
		$scope.load = function (id) {
			$http.get("http://localhost:9980/students/"+id)
			.then(function(response) {
				$scope.student = response.data;
				console.log('loading 1 student with ID: '+id,response.data);
			});
		}
		$scope.delete = function (id) {
			$http.delete("http://localhost:9980/students/"+id)
			.error(function(response) { console.log('error',response); })
			.success(function(response) {
				console.log('success',response);
				$scope.open('studentList');
			});
		}
		$scope.random = function () {
			$http.get("https://randomuser.me/api/")
			.error(function(response) { console.log('error',response); })
			.success(function(response) {
				console.log('success',response.results[0]);
				$('.frame').css({'background': 'center no-repeat #fff url('+response.results[0].picture.large+')'});
				$scope.name.val(response.results[0].name.last+', '+response.results[0].name.first);
			});
		}
		$scope.uploadFile = function(files) {
			var fd = new FormData();
			//Take the first selected file
			fd.append("pic", files[0]);
			$scope.pic = ''+files[0];

			$http.post("http://localhost:9980/students/pic", fd, {
				withCredentials: true,
				headers: {'Content-Type': undefined },
				transformRequest: angular.identity
			}).success(function(response) { console.log('success',response)}).error(function(response) {console.log('error',response)});

		};
	})
	.filter('unsafe', function($sce) {
		return function(val) {
			return $sce.trustAsHtml(val);
		}
	});
})(window.angular);
