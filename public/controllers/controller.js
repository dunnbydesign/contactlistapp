angular.module("myApp",[]);
angular.module("myApp").controller("AppCtrl",AppCtrl);
function AppCtrl($scope, $http) {
  console.log("Hello world from controller");

  var refresh = function() {
    $http.get("/contactList").success(function(response) {
      console.log("I got the data I requested");
      $scope.contacts = response;
      $scope.contact = "";
    });
  };

  refresh();

  // $http.get("/contactList")
  //
  // var person1 = {
  //   name: "Tim",
  //   email: "tim@email.com",
  //   number: "(111) 111-1111"
  // };
  //
  // var person2 = {
  //   name: "Emily",
  //   email: "emily@email2.com",
  //   number: "(222) 222-2222"
  // };
  //
  // var person3 = {
  //   name: "John",
  //   email: "john@email3.com",
  //   number: "(333) 333-3333"
  // };
  //
  // var contactList = [person1, person2, person3];
  // $scope.contacts = contactList;

  $scope.addContact = function() {
    console.log($scope.contact);
    $http.post("/contactList", $scope.contact).success(function(response) {
      console.log(response);
      refresh();
    });
    // $http.post("/contactList", $scope.contact);
  };

  $scope.remove = function(id) {
    console.log(id);
    $http.delete("/contactList/" + id).success(function(response) {
      refresh();
    });
  };

  $scope.edit = function(id) {
    console.log(id);
    $http.get("/contactList/" + id).success(function(response) {
      $scope.contact = response;
    });
  };

  $scope.update = function() {
    console.log($scope.contact._id);
    $http.put("/contactList/" + $scope.contact._id, $scope.contact).success(function(response) {
      refresh();
    });
  };

  $scope.deselect = function() {
    $scope.contact = "";
  };
};
