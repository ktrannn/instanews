$(document).ready(function () {
  var $stories = $('.stories')
  var $preloader = $('.preloader')

  // when user selects choice on menu, it will input the user selected value into url to get page//
  $('.selections').on('change', function () {

    $('.loader').show();

    if (!$('.header').hasClass('header-small')) {
      $('.header').addClass('header-small');
    } else {
    }
// ^^^^^^^^^^^^^^^^^ fix this 
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

      .done(function (data) {

        $('.loader').hide();
        var resultsObj = data.results;
        var sliced = resultsObj.filter(function (item) {
          if (item.multimedia.length == 0);
          return item.multimedia.length;
        }).slice(0, 12);
        console.log(sliced);

        $.each(sliced, function (index, value) {
          var images = value.multimedia.length - 1;
          var image = value.multimedia[images].url;
          var articleText = value.abstract;
          var articleLink = value.url;

          var output = '';
          output += '<li>';
          output += '<a href="' + articleLink + '">';
          output += '<div class="articlePic" style="background-image:url(' + image + ')"></div>';
          output += '<p class="text">' + articleText + '</p>';
          output += '</a></li>';
          $('#stories').append(output);
        });
      }).fail(function (err) {
        throw err;
      });
  });
});
