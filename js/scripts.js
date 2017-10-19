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
      var sliced = resultsObj.slice(0, 11);
      
      $.each(sliced, function (index, value) {
        console.log(value);
        var output = '';
        output += '<li>';
        output += '<a href=" ' + value.url + ' " ';
        output += '<p>' + value.abstract + '</p>';
        output += '<img src="' + value.multimedia[4].url + '">';
        output += '</li>';
        $('#stories').append(output);
      });
      console.log(data);
    }).fail(function (err) {
      throw err;
    });
  });
});
