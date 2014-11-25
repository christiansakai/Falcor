'use strict';

describe('Service: exploreStories', function () {

  // load the service's module
  beforeEach(module('storyHubApp'));

  // instantiate service
  var exploreStories;
  beforeEach(inject(function (_exploreStories_) {
    exploreStories = _exploreStories_;
  }));

  it('should do something', function () {
    expect(!!exploreStories).toBe(true);
  });

});
