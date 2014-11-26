'use strict';

describe('Service: nodeService', function () {

  // load the service's module
  beforeEach(module('storyHubApp'));

  // instantiate service
  var nodeService;
  beforeEach(inject(function (_nodeService_) {
    nodeService = _nodeService_;
  }));

  it('should do something', function () {
    expect(!!nodeService).toBe(true);
  });

});
