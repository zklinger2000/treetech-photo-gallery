$(document).ready(function() {
  var $overlay = $('<div id="overlay"></div>');
  var $image = $('<img>');
  
  $overlay.append($image);
  
  // Add overlay
  $('body').append($overlay);
    // image
    // caption
  
  // Capture click event
  $('#photoGallery a').click(function(event) {
    event.preventDefault();
    var imageSource = $(this).attr('href');
    // Update overlay with clicked image
    $image.attr('src', imageSource);
    // Show the overlay
    $overlay.show();    
    // Get child's alt attr and set caption
  });
  // When overlay is clicked
  $overlay.click(function() {
    // Hide overlay
    $overlay.hide();
  });
});
