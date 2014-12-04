'use strict';

describe('Service: alchemyData', function () {

  // load the service's module
  beforeEach(module('storyHubApp'));

  // instantiate service
  var alchemyData;
  beforeEach(inject(function (_alchemyData_) {
    alchemyData = _alchemyData_;
  }));

  it('should do something', function () {
    expect(!!alchemyData).toBe(true);
  });

});
