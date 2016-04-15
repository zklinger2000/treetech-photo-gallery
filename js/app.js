$(document).ready(function() {
  var $overlay = $('<div id="overlay"></div>');
  var $image = $('<img>');
  var $caption = $('<p></p>');
  
  // Add image to overlay
  $overlay.append($image);
  // Add caption to overlay
  $overlay.append($caption);
  // Add overlay
  $('body').append($overlay);
  
  // Capture click event
  $('#photoGallery a').click(function(event) {
    event.preventDefault();
    var imageSource = $(this).attr('href');
    // Update overlay with clicked image
    $image.attr('src', imageSource);
    // Get child's alt attr and set caption
    var captionText = $(this).children('img').attr('alt');
    $caption.text(captionText);
    // Show the overlay
    $overlay.show();    
  });
  // When overlay is clicked
  $overlay.click(function() {
    // Hide overlay
    $overlay.hide();
  });
});
