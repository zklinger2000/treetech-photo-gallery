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
  'use strict';
  
  var $photoGallery = $('#photoGallery');
  var $overlay = $('<div id="overlay"></div>');
  var $prevPhoto = $('<div id="prevPhoto"><</div>');
  var $nextPhoto = $('<div id="nextPhoto">></div>');
  var $image = $('<img>');
  var $caption = $('<p></p>');
  
  // Build Photo Gallery from JSON object
  var galleryHtml = '';
  // Create elements from each object in photos array
  photos.forEach(function(photo) {
    galleryHtml += '<a href="photos/' + photo.src +
                   '"><img src="photos/thumbnails/' + photo.src +
                   '" alt="Photo of ' + photo.name +
                   '" title="' + photo.title +
                   '"></a>'
  });
  // Insert HTML into #photoGallery
  $photoGallery.html(galleryHtml);
  // Add prevPhoto to #photoGallery
  $photoGallery.append($prevPhoto);
  // Add nextPhoto to #photoGallery
  $photoGallery.append($nextPhoto);
  // Add image to overlay
  $overlay.append($image);
  // Add caption to overlay
  $overlay.append($caption);
  // Add overlay to <body>
  $('body').append($overlay);
  
  // Input filter keyup listener
  $('input').keyup(function(event) {
    // Hide anchors with titles that don't contain the input string
    $photoGallery.find('a img').filter(function(index, element){
      return !$(element).attr('title').toLowerCase().includes((event.currentTarget.value.toLowerCase()));
    })// Hide elements
      .parent().css('display', 'none')
      // Sort elements by image filename
      .sort(sortByHref)
      // Move to end of thumbnail list
      .appendTo($photoGallery);
    // Show anchors with titles that do contain the input string
    $photoGallery.find('a img').filter(function(index, element){
      return $(element).attr('title').toLowerCase().includes((event.currentTarget.value.toLowerCase()));
    })// Show elements
      .parent().css('display', 'block')
      // Sort elements by image filename
      .sort(sortByHref)
      // Move to beginning of thumbnail list
      .prependTo($photoGallery);
  });
  // Thumbnail click listeners
  $photoGallery.find('a').click(function(event) {
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
        $('#prevPhoto').fadeTo('slow', 1);
        $('#nextPhoto').fadeTo('slow', 1);
        $overlay.children('p').fadeTo('fast', 1);
      });
    });
  });
  // Overlay click listener
  $overlay.click(function() {
    $('#prevPhoto').fadeTo(1, 0);
    $('#nextPhoto').fadeTo(1, 0);
    // Hide overlay
    $overlay.fadeOut('fast', function() {
      $overlay.children('img').fadeTo(1, 0, function() {
        $overlay.children('p').fadeTo(1, 0);
      });
    });
  });
  // Prev photo click listener
  $('#prevPhoto').click(['reverse'], changeImage);
  // Next photo click listener
  $('#nextPhoto').click([], changeImage);
  
  function changeImage(event) {
    var args = Array.prototype.slice.call(arguments);
    var direction = args[0].data[0];

    // Prevent the link from loading the image location
    event.preventDefault();
    // Get list of photos still visible after search filter
    var $anchors = $photoGallery.find('a').filter(function(index, element) {
      return $(element).css('display') === 'block';
    });
    // Do nothing if there's only 1 photo
    if ($anchors.length < 2) return;
    // Get photo filename
    var imageSource = $overlay.find('img').attr('src').slice(7);
    // Get anchor element that matches current photo
    var $current = $anchors.find('img').filter(function(i, photo) {
      return ($(photo).attr('src').slice(18) === imageSource);
    });
    var currentIndex = $anchors.index($current.parent());
    // Get index of next/prev anchor element
    var newIndex = (direction === 'reverse' ? 
                    (currentIndex === 0 ? $anchors.length - 1 : currentIndex - 1) : 
                    (currentIndex === $anchors.length - 1 ? 0 : currentIndex + 1));
    // Update overlay with clicked image
    $image.attr('src', 'photos/' + $($anchors.get(newIndex)).find('img').attr('src').slice(18));
    // Get child's alt attr and set caption
    var captionText = $($anchors.get(newIndex)).find('img').attr('title');
    $caption.text(captionText);
  }
  
  function sortByHref(a, b) {
    var aSrc = $(a).attr('href');
    var bSrc = $(b).attr('href');
    return (aSrc < bSrc) ? -1 : (aSrc > bSrc) ? 1 : 0;
  }
  
});
