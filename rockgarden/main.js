var onScrollHandler = function() {
  var newImageUrl = document.querySelector(".navbar");
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop > 100) {
     newImageUrl.src = "assets/bar.svg"
  }
  if (scrollTop > 200) {
     newImageUrl.src = "assets/bar1.svg"
  }
  if (scrollTop > 300) {
     newImageUrl.src = "assets/bar2.svg"
  }
  bar = newImageUrl;
};
document.addEventListener ("scroll", onScrollHandler);

function colorChange() {
   $('.circle').css('border-color', colorsSelected[activeSlide]);
   
}