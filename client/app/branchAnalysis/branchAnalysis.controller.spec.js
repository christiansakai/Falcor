'use strict';

describe('Controller: BranchanalysisCtrl', function () {

  // load the controller's module
  beforeEach(module('storyHubApp'));

  var BranchanalysisCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BranchanalysisCtrl = $controller('BranchanalysisCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
