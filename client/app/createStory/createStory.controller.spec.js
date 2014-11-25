'use strict';

describe('Controller: CreatestoryCtrl', function () {

  // load the controller's module
  beforeEach(module('storyHubApp'));

  var CreatestoryCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreatestoryCtrl = $controller('CreatestoryCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
