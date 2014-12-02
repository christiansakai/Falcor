'use strict';

describe('Controller: UserstoriesCtrl', function () {

  // load the controller's module
  beforeEach(module('storyHubApp'));

  var UserstoriesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserstoriesCtrl = $controller('UserstoriesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
