'use strict';

describe('Directive: currentUsers', function () {

  // load the directive's module and view
  beforeEach(module('storyHubApp'));
  beforeEach(module('app/story/currentUsers/currentUsers.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<current-users></current-users>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the currentUsers directive');
  }));
});