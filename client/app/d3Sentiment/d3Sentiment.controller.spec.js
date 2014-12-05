'use strict';

describe('Controller: D3sentimentCtrl', function () {

  // load the controller's module
  beforeEach(module('storyHubApp'));

  var D3sentimentCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    D3sentimentCtrl = $controller('D3sentimentCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
