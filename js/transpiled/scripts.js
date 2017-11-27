'use strict';

$(document).ready(function () {
  var $stories = $('.stories');
  // const $preloader = $('.preloader')
  var $head = $('.header');
  var $footer = $('.footer-text');
  // when user selects choice on menu, it will input the user selected value into url to get page//
  $('.selections').on('change', function () {

    $('.loader').show();
    if (!$head.hasClass('header-small')) {
      $head.addClass('header-small');
    }

    if (!$footer.hasClass('footer-text-small')) {
      $footer.addClass('footer-text-small');
    }

    var userSelection = $('.selections').val();
    var url = 'https://api.nytimes.com/svc/topstories/v2/' + userSelection + '.json';
    url += '?' + $.param({
      'api-key': '398e57e8d5124be18dd6456b4589b28e'
    });

    $stories.empty(); //when a new selection is made, stories ul gets resetted instead of being added to bottom
    $.ajax({
      url: url,
      method: 'GET'
    }).done(function (data) {

      $('.loader').hide();
      var resultsObj = data.results;
      var sliced = resultsObj.filter(function (item) {
        if (item.multimedia.length === 0) ;{
          return item.multimedia.length;
        }
      }).slice(0, 12);

      $.each(sliced, function (index, value) {
        var images = value.multimedia.length - 1,
            image = value.multimedia[images].url,
            articleText = value.abstract,
            articleLink = value.url;

        var output = '';
        output += '<li>';
        output += '<a href="' + articleLink + '">';
        output += '<div class="articlePic" style="background-image:url(' + image + ')">';
        output += '<p class="text">' + articleText + '</p></div>';
        output += '</a></li>';
        $('#stories').append(output);
      });
    }).fail(function (err) {
      throw err;
    });
  });
});