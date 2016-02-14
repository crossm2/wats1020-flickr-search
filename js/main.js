

// Flickr Public Feeds and $.getJSON() Search Assignment 

$(document).on('ready', function(){
	//search for images
  var searchImages = function(tags) {
    var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    console.log(tags);
    $('#images').innerHTML = '<li class="search-throbber">Searching...</li>';
    $.getJSON( flickrAPI, {
      tags: tags,
      tagmode: "any",
      format: "json"
	//display images
    }).done(function( data ) {
      $('#images').empty();
      $('h1.search-title').first()[0].innerHTML = "Search for: " + tags;
      $.each( data.items, function( i, item ) {
        var newListItem = $("<li>")
        // Provide details about each image
        var newTitle = $('<p class="image-title">').html(item.title).appendTo(newListItem);
        var newDate = $('<p class="image-date">').text(item.date_taken).appendTo(newListItem);
        var newDescription = $('<p class="image-description">').html(item.description).appendTo(newListItem);
        var newLink = $('<a>').attr('href', item.link).text('View on Flickr.').appendTo(newListItem);

        // Create button for enlarge modal
        var newButton = $("<button class='btn btn-sm btn-primary btn-enlarge'>enlarge</button>").attr({
          'data-title': item.title,
          'data-toggle': "modal",
          'data-target': "#infoModal",
          'data-imgsrc': item.media.m,
          'data-description': item.description,
          'type': "button" 
        }).appendTo(newListItem);
		  var infoButton = $("<button class='btn btn-sm btn-primary'>More Info</button>").attr({
		  'data-title': item.title,
          'data-toggle': "modal",
          'data-target': "#infoModal",
		  'data-author': item.author,
		  'data-date_taken': item.date_taken,
		  'data-tags': item.tags,
          'type': "button"  
		  }).appendTo(newListItem);
        newListItem.appendTo( "#images" );
		  //limit results that come back
        if ( i === 20 ) {
          return false;
        }
		  
      });
    });
  };
	//event that triggers the new search, On Click

  $('button.search').on('click', function(event){
    event.preventDefault();
    var searchTextInput = $(event.target.parentElement).find('input[name="searchText"]')[0];
    console.log(searchTextInput);
    searchImages(searchTextInput.value);
  });

	//trigger modal 
  $('#infoModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); 
    var title = button.data('title'); 
    var imgSrc = button.data('imgsrc');
	var author = button.data('author') || '';
	var tags = button.data('tags') || '';
	var date_taken = button.data('date_taken') || '';
    var imageDescription = button.data('description');

    // Update modal content
    var modal = $(this);
    modal.find('.modal-title').html(title);
	modal.find('.modal-author').html(author);
	modal.find('.modal-tags').html(tags);
	modal.find('.modal-date_taken').html(date_taken);
    var modalBody = modal.find('.modal-body');
    modalBody.empty();
	  
    var modalDescription = $("<p class='image-description'>").html(imageDescription).appendTo(modalBody);
  });

});


    // STRETCH GOAL: Add a "more info" popup using the technique shown on the
    // Bootstrap Modal documentation: http://getbootstrap.com/javascript/#modals-related-target

