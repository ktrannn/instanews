$(document).ready(() => {
  const $stories = $('.stories')
  const $preloader = $('.preloader')

  // when user selects choice on menu, it will input the user selected value into url to get page//
  $('.selections').on('change', () => {

    $('.loader').show();
    if (!$('.header').hasClass('header-small')) {
      $('.header').addClass('header-small');
    } else {
    }

    if (!$('.footer-text').hasClass('footer-text-small')) {
      $('.footer-text').addClass("footer-text-small");
    } else {
    }

    let userSelection = $('.selections').val();
    let url = `https://api.nytimes.com/svc/topstories/v2/${userSelection}.json`;
    url += '?' + $.param({
      'api-key': "398e57e8d5124be18dd6456b4589b28e"
    });

    $stories.empty(); //when a new selection is made, stories ul gets resetted instead of being added to bottom
    $.ajax({
      url: url,
      method: 'GET',
    })

      .done((data) => {

        $('.loader').hide();
        let resultsObj = data.results;
        let sliced = resultsObj.filter((item) => {
          if (item.multimedia.length == 0);
          return item.multimedia.length;
        }).slice(0, 12);
    
        $.each(sliced, (index, value) => {
          let images = value.multimedia.length - 1,
            image = value.multimedia[images].url,
            articleText = value.abstract,
            articleLink = value.url;

          let output = '';
          output += '<li>';
          output += '<a href="' + articleLink + '">';
          output += '<div class="articlePic" style="background-image:url(' + image + ')">';
          output += '<p class="text">' + articleText + '</p></div>';
          output += '</a></li>';
          $('#stories').append(output);
        });
      }).fail((err) => {
        throw err;
      });
  });
});
