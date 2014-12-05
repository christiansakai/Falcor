'use strict';

describe('Service: parseAlchemy', function () {

  // load the service's module
  beforeEach(module('storyHubApp'));

  // instantiate service
  var parseAlchemy;
  beforeEach(inject(function (_parseAlchemy_) {
    parseAlchemy = _parseAlchemy_;
  }));

  it('should do something', function () {
    expect(!!parseAlchemy).toBe(true);
  });

});
