'use strict';

describe('Controller: D3keywordsCtrl', function () {

  // load the controller's module
  beforeEach(module('storyHubApp'));

  var D3keywordsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    D3keywordsCtrl = $controller('D3keywordsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
