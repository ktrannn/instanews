$(document).ready(function () {
  var $stories = $('.stories')
  var $preloader = $('.preloader')


  // when user selects item, will input value into url to get page//
  $('.selections').on('change', function () {
    var userSelection = $('.selections').val();
    var url = 'https://api.nytimes.com/svc/topstories/v2/' + userSelection + '.json';
    url += '?' + $.param({
      'api-key': "398e57e8d5124be18dd6456b4589b28e"
    });

    $stories.empty(); //when a new selection is made, stories ul gets resetted instead of being added to bottom
    $.ajax({
      url: url,
      method: 'GET',
    })

      // always hides preloader gif 
      // .always(function () {
      //   $preloader.hide();
      // })
     .done(function (data) {
      var resultsObj = data.results;
      var sliced = resultsObj.slice(0, 12);
      
      $.each(sliced, function (index, value) {
        var image = value.multimedia[4].url;
        var articleText = value.abstract;
        var articleLink = value.url;

        console.log(value);
        var output = '';
        output += '<li>';
        output += '<a href=" ' + articleLink + ' "> ';
        output += '<div class="articlePic" style="background-image:url(' + image + ')"></div>';
        output += '<p class="text">' + articleText + '</p>';
        output += '</a></li>';
        $('#stories').append(output);
      });
      console.log(data);
    }).fail(function (err) {
      throw err;
    });
  });
});

// flex text to bottom of img//
// var output = '';
// output += '<a';
// output += 'href=" ' + value.url + ' ">';
// output += 'style="background-image: url(' + value.multimedia[4].url + ')">';
// output += '<div class="image-text>' + value.abstract + '</div>';
// output += '</a>';
// $('#stories').append(output);