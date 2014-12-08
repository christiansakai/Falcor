'use strict';

describe('Controller: BranchanalysissentimentCtrl', function () {

  // load the controller's module
  beforeEach(module('storyHubApp'));

  var BranchanalysissentimentCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BranchanalysissentimentCtrl = $controller('BranchanalysissentimentCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
