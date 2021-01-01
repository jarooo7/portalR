
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
   
     var all = document.getElementsByClassName("navbar")
     if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
     for (var i = 0; i < all.length; i++) {
        all[i].classList.add("nav-small")
      }

    } else {
        for (var i = 0; i < all.length; i++) {
            all[i].classList.remove("nav-small")
          }
       
    }
    console.log("chuj");
  }