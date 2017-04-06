var app = angular.module("littleSketcher", ["ngResource"]);

app.factory("DrawingResource", function($resource) {
  var DrawingResource = $resource("/api/drawings/:id", {id: "@id"});
  return DrawingResource;
});

app.controller("drawingListCtrl", function($scope, DrawingResource) {
    $scope.drawings = DrawingResource.query();
    $scope.remove = function(drawing) {
      var didRemove = drawing.$remove();
      didRemove.then( function() {
        var index = $scope.drawings.indexOf(drawing);
        $scope.drawings.splice(index, 1);
      }, function() {
        alert("oh, noes!");
      });
    };
    var drawingId = 4;
    $scope.addDrawing = function() {
      var newDrawing = new DrawingResource();
      newDrawing.$save();
      $scope.drawings.push(newDrawing);
    };
});