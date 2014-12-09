'use strict';

describe('Directive: graphBar', function () {

  // load the directive's module and view
  beforeEach(module('storyHubApp'));
  beforeEach(module('app/d3Keywords/graphBar/graphBar.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<graph-bar></graph-bar>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the graphBar directive');
  }));
});