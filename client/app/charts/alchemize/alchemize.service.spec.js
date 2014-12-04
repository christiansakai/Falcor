'use strict';

describe('Service: alchemize', function () {

  // load the service's module
  beforeEach(module('storyHubApp'));

  // instantiate service
  var alchemize;
  beforeEach(inject(function (_alchemize_) {
    alchemize = _alchemize_;
  }));

  it('should do something', function () {
    expect(!!alchemize).toBe(true);
  });

});
