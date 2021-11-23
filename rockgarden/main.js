var onScrollHandler = function() {
  var newImageUrl = bar;
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop > 100) {
     newImageUrl = "assets/bar.svg"
  }
  if (scrollTop > 200) {
     newImageUrl = "assets/bar1.svg"
  }
  if (scrollTop > 300) {
     newImageUrl = "assets/bar2.svg"
  }
  bar = newImageUrl;
};
object.addEventListener ("scroll", onScrollHandler);

function colorChange() {
   $('.circle').css('border-color', colorsSelected[activeSlide]);
   
}