  var photos = [{
    "src": "01.jpg",
    "name": "Hay Bales",
    "title": "I love hay bales. Took this snap on a drive through the countryside past some straw fields."
  }, {
    "src": "02.jpg",
    "name": "Lake",
    "title": "The lake was so calm today. We had a great view of the snow on the mountains from here."
  }, {
    "src": "03.jpg",
    "name": "Canyon",
    "title": "I hiked to the top of the mountain and got this picture of the canyon and trees below."
  }, {
    "src": "04.jpg",
    "name": "Iceburg",
    "title": "It was amazing to see an iceberg up close, it was so cold but didn’t snow today."
  }, {
    "src": "05.jpg",
    "name": "Desert",
    "title": "The red cliffs were beautiful. It was really hot in the desert but we did a lot of walking through the canyons."
  }, {
    "src": "06.jpg",
    "name": "Fall",
    "title": "Fall is coming, I love when the leaves on the trees start to change color."
  }, {
    "src": "07.jpg",
    "name": "Plantation",
    "title": "I drove past this plantation yesterday, everything is so green!"
  }, {
    "src": "08.jpg",
    "name": "Dunes",
    "title": "My summer vacation to the Oregon Coast. I love the sandy dunes!"
  }, {
    "src": "09.jpg",
    "name": "Countryside Lane",
    "title": "We enjoyed a quiet stroll down this countryside lane."
  }, {
    "src": "10.jpg",
    "name": "Sunset",
    "title": "Sunset at the coast! The sky turned a lovely shade of orange."
  }, {
    "src": "11.jpg",
    "name": "Cave",
    "title": "I did a tour of a cave today and the view of the landscape below was breathtaking."
  }, {
    "src": "12.jpg",
    "name": "Bluebells",
    "title": "I walked through this meadow of bluebells and got a good view of the snow on the mountain before the fog came in."
  }];  

$(document).ready(function() {
  var $overlay = $('<div id="overlay"></div>');
  var $image = $('<img>');
  var $caption = $('<p></p>');
  
  // Build Photo Gallery from JSON object
  var galleryHtml = '';
  
  photos.forEach(function(photo) {
    galleryHtml += '<a href="photos/' + photo.src + '"><img src="photos/thumbnails/' + photo.src + '" alt="Photo of ' + photo.name + '" title="' + photo.title + '"></a>'
  });
  $('#photoGallery').html(galleryHtml);
  
  // Add image to overlay
  $overlay.append($image);
  // Add caption to overlay
  $overlay.append($caption);
  // Add overlay
  $('body').append($overlay);
  
  // Click event for thumbnails
  $('#photoGallery a').click(function(event) {
    event.preventDefault();
    var imageSource = $(this).attr('href');
    // Update overlay with clicked image
    $image.attr('src', imageSource);
    // Get child's alt attr and set caption
    var captionText = $(this).children('img').attr('title');
    $caption.text(captionText);
    // Show the overlay
    $overlay.fadeIn('slow', function() {
      $overlay.children('img').fadeTo('slow', 1, function() {
        $overlay.children('p').fadeTo('fast', 1);
      });
    });
  });
  // When overlay is clicked
  $overlay.click(function() {
    // Hide overlay
    $overlay.fadeOut('fast', function() {
      $overlay.children('img').fadeTo(1, 0, function() {
        $overlay.children('p').fadeTo(1, 0);
      });
    });
  });
});
