/**
 * Plugin Name: Jquery Image Scaling Plugin
 *
 * Takes parent selector used by each invocation to determine the parent 
 * element size. The default parent selector is 'div' which matches the first
 * parent selected by the selector
 *
 * Author: Damien Allison
 * Author URI: http://www.damienallison.com/
 */

if (typeof jQuery == 'undefined') {
  throw 'jquery-image-scale plugin required jQuery to be loaded';
}

jQuery.fn.scaleImageToParent = function(parentSelector) {

  if ('undefined' === typeof(parentSelector)) {
    parentSelector = 'div';
  }

  this.each(function() { 
  
    var image = $(this);
    var parents = image.parents(parentSelector);
    if (1 > parents.length) {
      return true; 
    }
    var container = $(parents[0]);

    image.load(function() {

      var width = image.width();
      var height = image.height();
      if (0 == width || 0 == height) {
        // still not loaded
        return true;
      }

      console.log('Container: ' + container.width() + ' x ' + container.height());
      console.log('Image: ' + width + ' x ' + height);

      // stage 1: resize in the width to ensure the width is covered.
      if (width < container.width()) {
        var scale = container.width() / width;
        width = scale * width;
        height = scale * height;
      } else { // scale down if larger
        var scale = container.width() / width;
        width = scale * width;
        height = scale * height;
      }

      // stage 2: if the image is still too short scale up to height
      if (height < container.height()) {
        var scale = container.height() / height;
        width = scale * width;
        height = scale * height;
      }

      width = Math.floor(width);
      height = Math.floor(height);

      // stage 3: determine the left offset to center the image horizontally
      var leftAlign = - Math.floor((width - container.width()) / 2);
      var topAlign = - Math.floor((height - container.height()) / 2);


      // write the image css
      image.css('width', width);
      image.css('height', height);
      image.css('margin-left', leftAlign);
      image.css('margin-top', topAlign);
    });
    image.load();
  });

  return this;
}
