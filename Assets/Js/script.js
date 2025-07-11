(function ($) {

  "use strict";

  // background color when scroll 

  var initScrollNav = function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 200) {
      $('.navbar.fixed-top').addClass("bg-black");
    }else{
      $('.navbar.fixed-top').removeClass("bg-black");
    }
  }

  $(window).scroll(function() {    
    initScrollNav();
  }); 

    // init Chocolat light box
    var initChocolat = function () {
      Chocolat(document.querySelectorAll('.image-link'), {
        imageSize: 'contain',
        loop: true,
      })
    }
  
  $(document).ready(function () {
  
    //testimonial swiper
   
    var swiper = new Swiper(".project-swiper", {
      slidesPerView: 4,
      spaceBetween: 30,
      navigation: {
        nextEl: ".icon-arrow-right",
        prevEl: ".icon-arrow-left",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 10,

        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10,

        },
        1400: {
          slidesPerView: 4,
          spaceBetween: 10,

        },
      }
    });


    $(".youtube").colorbox({
      iframe: true,
      innerWidth: 960,
      innerHeight: 585
    });


        // Animate on Scroll
        AOS.init({
          duration: 1000,
          once: true,
        })
    
        window.addEventListener("load", (event) => {
          //isotope
          $('.isotope-container').isotope({
            // options
            itemSelector: '.item',
            layoutMode: 'masonry'
          });
    
    
    
          // Initialize Isotope
          var $container = $('.isotope-container').isotope({
            // options
            itemSelector: '.item',
            layoutMode: 'masonry'
          });
    
          $(document).ready(function () {
            //active button
            $('.filter-button').click(function () {
              $('.filter-button').removeClass('active');
              $(this).addClass('active');
            });
          });
    
          // Filter items on button click
          $('.filter-button').click(function () {
            var filterValue = $(this).attr('data-filter');
            if (filterValue === '*') {
              // Show all items
              $container.isotope({ filter: '*' });
            } else {
              // Show filtered items
              $container.isotope({ filter: filterValue });
            }
          });
    
        });
    
    
        initChocolat();


  });


})(jQuery);

// Toggle search bar
        document.getElementById('search-icon').addEventListener('click', function(event) {
            event.preventDefault();
            const searchBar = document.getElementById('search-bar');
            if (searchBar.style.display === 'none' || searchBar.style.display === '') {
                searchBar.style.display = 'block';
                searchBar.focus();
                // Close profile dropdown if open
                document.getElementById('profile-dropdown').classList.remove('show');
            } else {
                searchBar.style.display = 'none';
            }
        });
        
        // Toggle profile dropdown
        document.getElementById('profile-dropdown-toggle').addEventListener('click', function(event) {
            event.preventDefault();
            const dropdown = document.getElementById('profile-dropdown');
            dropdown.classList.toggle('show');
            // Close search bar if open
            document.getElementById('search-bar').style.display = 'none';
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const dropdown = document.getElementById('profile-dropdown');
            const dropdownToggle = document.getElementById('profile-dropdown-toggle');
            if (!dropdown.contains(event.target) && !dropdownToggle.contains(event.target)) {
                dropdown.classList.remove('show');
            }
            
            const searchBar = document.getElementById('search-bar');
            const searchIcon = document.getElementById('search-icon');
            if (!searchBar.contains(event.target) && !searchIcon.contains(event.target)) {
                searchBar.style.display = 'none';
            }
        });
