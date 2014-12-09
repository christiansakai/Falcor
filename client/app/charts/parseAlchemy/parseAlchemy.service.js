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
      }, 
      keywords: [],
      sentiments: [],
      parseAlchemyBranchData: function(analysis){
        console.log('first: ', analysis[0])

        var Branches = function(sentiment, keyword){
          this.sentiment = sentiment; 
          this.keyword = keyword; 
        }

        var branch = {
          keywords: '', 
          sentiment: ''
        } 

        var numBranches = analysis[0].length; 
        var sentiment = analysis[0]; 
        var keywords = analysis[2]; 
        var singleBranchArr = []

        var arrayOfObjects = []

        for (var k = 0; k < sentiment.length; k++){
          branch.sentiment = sentiment[k].docSentiment; 
          branch.keywords = keywords[k]
          singleBranchArr.push(branch.sentiment, branch.keywords)
          arrayOfObjects.push(singleBranchArr)
          branch.sentiment = ''; 
          branch.keywords = ''; 
          singleBranchArr = []
        }

        // console.log('arr: ', arrayOfObjects)

        //parses the keywords data for rendering
        for (var i = 0; i < arrayOfObjects.length; i++){
            this.keywords.push(arrayOfObjects[i][1].keywords)
        }

        $log.debug( 'Saved to keywords to stats: from factory', this.keywords );


        //parses the sentiments data for rendering 
        for (var i = 0; i < arrayOfObjects.length; i++){
          this.sentiments.push(arrayOfObjects[i][0])
        }
        
        $log.debug( 'Saved to sentiments to stats: from factory', this.sentiments );
          
      }
    }

    return ParseAlchemy;



  });
