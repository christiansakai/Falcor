'use strict';

angular.module('storyHubApp')
  .factory('ParseAlchemy', function ($log) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    //  var _stats = this;
    // var data;

    var ParseAlchemy = {
      data: {},
      test: "",
      doTest: function() {
        this.test = "hello";
      },
      parseAlchemyData: function (analysis) {
        if ( analysis.keywords.length > 50 ) {
          analysis.keywords = analysis.keywords.slice( 0, 50 );
        }
        for (var i = 0; i < analysis.keywords.length; i++) {
          if ( analysis.keywords[i].text.length > 15 ) {
            analysis.keywords[i].text = analysis.keywords[i].text.slice(0, 15) + '…';
          }
        }
        // var statObj = {
        //   // concepts: analysis.concepts,
        //   keywords: analysis.keywords,
        //   sentiment: analysis.sentiment
        // };


        // angular.copy(statObj, this.data);

        this.data = {
          keywords: analysis.keywords,
          sentiment: analysis.sentiment
        };
        // console.log('statsObj: ', statObj, 'data: ', _stats.data)
        $log.debug( 'Saved to stats: from factory', this.data );
      }
    };

    return ParseAlchemy;



  });
