'use strict';

describe('Controller: JoinstoryCtrl', function () {

  // load the controller's module
  beforeEach(module('storyHubApp'));

  var JoinstoryCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JoinstoryCtrl = $controller('JoinstoryCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
