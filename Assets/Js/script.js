(function ($) {

  "use strict";

  // background color when scroll 
  var initScrollNav = function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 200) {
      $('.navbar.fixed-top').addClass("bg-black");
    } else {
      $('.navbar.fixed-top').removeClass("bg-black");
    }
  };

  $(window).scroll(function() {    
    initScrollNav();
  }); 

  // init Chocolat light box
  var initChocolat = function () {
    if (typeof Chocolat !== 'undefined') {
      Chocolat(document.querySelectorAll('.image-link'), {
        imageSize: 'contain',
        loop: true,
      });
    } else {
      console.warn("Chocolat library not found. Image lightbox will not function.");
    }
  };
  
  $(document).ready(function () {
  
    // Testimonial swiper (project-swiper)
    if (typeof Swiper !== 'undefined') {
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
    } else {
      console.warn("Swiper library not found. Project swiper will not function.");
    }

    // Colorbox for YouTube videos
    if ($.fn.colorbox) {
      $(".youtube").colorbox({
        iframe: true,
        innerWidth: 960,
        innerHeight: 585
      });
    } else {
      console.warn("Colorbox library not found. YouTube video lightbox will not function.");
    }

    // Animate on Scroll
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        once: true,
      });
    } else {
      console.warn("AOS library not found. Animate on Scroll will not function.");
    }
    
    // Isotope initialization and filtering
    window.addEventListener("load", (event) => {
      if ($.fn.isotope) {
        var $container = $('.isotope-container').isotope({
          itemSelector: '.item',
          layoutMode: 'masonry'
        });

        // Active button logic for filters
        $('.filter-button').click(function () {
          $('.filter-button').removeClass('active');
          $(this).addClass('active');
        });

        // Filter items on button click
        $('.filter-button').click(function () {
          var filterValue = $(this).attr('data-filter');
          $container.isotope({ filter: filterValue === '*' ? '*' : filterValue });
        });
      } else {
        console.warn("Isotope library not found. Filtering will not function.");
      }
    });
    
    initChocolat(); // Call Chocolat initialization

    // Toggle search bar
    const searchIcon = document.getElementById('search-icon');
    const searchBar = document.getElementById('search-bar');
    const profileDropdown = document.getElementById('profile-dropdown');

    if (searchIcon && searchBar && profileDropdown) {
      searchIcon.addEventListener('click', function(event) {
          event.preventDefault();
          searchBar.style.display = (searchBar.style.display === 'none' || searchBar.style.display === '') ? 'block' : 'none';
          searchBar.focus();
          profileDropdown.classList.remove('show'); // Close profile dropdown if open
      });
    } else {
      console.warn("Search icon, search bar, or profile dropdown element not found. Search toggle will not function.");
    }
    
    // Toggle profile dropdown
    const profileDropdownToggle = document.getElementById('profile-dropdown-toggle');
    if (profileDropdownToggle && profileDropdown && searchBar) {
      profileDropdownToggle.addEventListener('click', function(event) {
          event.preventDefault();
          profileDropdown.classList.toggle('show');
          searchBar.style.display = 'none'; // Close search bar if open
      });
    } else {
      console.warn("Profile dropdown toggle, profile dropdown, or search bar element not found. Profile dropdown toggle will not function.");
    }
    
    // Close dropdown/search when clicking outside
    document.addEventListener('click', function(event) {
        if (profileDropdown && !profileDropdown.contains(event.target) && !profileDropdownToggle.contains(event.target)) {
            profileDropdown.classList.remove('show');
        }
        
        if (searchBar && !searchBar.contains(event.target) && !searchIcon.contains(event.target)) {
            searchBar.style.display = 'none';
        }
    });

    // Vehicle filter logic (DOMContentLoaded)
    const applyFiltersBtn = document.getElementById('applyFilters');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const modelYearSelect = document.getElementById('modelYear');
    const marketSelect = document.getElementById('market');
    const powerSourceSelect = document.getElementById('powerSource');
    const bodyStyleSelect = document.getElementById('bodyStyle');
    const vehicleCards = document.querySelectorAll('.vehicle-card');

    if (applyFiltersBtn && resetFiltersBtn && modelYearSelect && marketSelect && powerSourceSelect && bodyStyleSelect && vehicleCards.length > 0) {
      function applyFilters() {
          const selectedModelYear = modelYearSelect.value;
          const selectedMarket = marketSelect.value;
          const selectedPowerSource = powerSourceSelect.value;
          const selectedBodyStyle = bodyStyleSelect.value;

          vehicleCards.forEach(card => {
              const cardCategory = card.dataset.category; // e.g., 'suv', 'truck', 'car'
              const cardPower = card.dataset.power;       // e.g., 'gas', 'electric', 'hybrid'
              const cardModelYear = card.dataset.modelyear; // Assuming data-modelyear attribute exists
              const cardMarket = card.dataset.market;       // Assuming data-market attribute exists

              let showCard = true;

              // Filter by Model Year
              if (selectedModelYear !== 'All' && cardModelYear !== selectedModelYear) {
                  showCard = false;
              }

              // Filter by Market
              if (selectedMarket !== 'All' && cardMarket !== selectedMarket) {
                  showCard = false;
              }

              // Filter by Power Source
              if (selectedPowerSource !== 'All') {
                  if (cardPower && cardPower.toLowerCase() !== selectedPowerSource.toLowerCase()) {
                      showCard = false;
                  }
              }

              // Filter by Body Style (Category)
              if (selectedBodyStyle !== 'All') {
                  let bodyStyleMatch = false;
                  if (selectedBodyStyle === 'suv-crossover' && cardCategory === 'suv') {
                      bodyStyleMatch = true;
                  } else if (selectedBodyStyle === 'truck-van' && cardCategory === 'truck') {
                      bodyStyleMatch = true;
                  } else if (selectedBodyStyle === 'sedan' && cardCategory === 'car') {
                      bodyStyleMatch = true;
                  } else if (selectedBodyStyle === 'all') {
                      bodyStyleMatch = true;
                  }
                  if (!bodyStyleMatch) {
                      showCard = false;
                  }
              }

              card.style.display = showCard ? 'block' : 'none';
          });
          closeFilterSidebar(); // Close sidebar after applying filters
      }

      function resetFilters() {
          modelYearSelect.value = 'All'; // Reset to default
          marketSelect.value = 'All';     // Reset to default
          powerSourceSelect.value = 'All'; // Reset to default
          bodyStyleSelect.value = 'All';   // Reset to default
          
          vehicleCards.forEach(card => {
              card.style.display = 'block'; // Show all cards
          });
          closeFilterSidebar(); // Close sidebar after resetting filters
      }

      applyFiltersBtn.addEventListener('click', applyFilters);
      resetFiltersBtn.addEventListener('click', resetFilters);
    } else {
      console.warn("One or more vehicle filter elements not found. Vehicle filtering will not function.");
    }
  });

  // --- New Filter Sidebar Logic ---
  const openFilterSidebarBtn = document.getElementById('openFilterSidebar');
  const sidebarWrapper = document.querySelector('.sidebar-wrapper');
  const sidebarCloseBtn = document.querySelector('.sidebar-close-btn');
  let sidebarBackdrop = null; // Will be created dynamically

  function createBackdrop() {
      if (!sidebarBackdrop) {
          sidebarBackdrop = document.createElement('div');
          sidebarBackdrop.classList.add('sidebar-backdrop');
          document.body.appendChild(sidebarBackdrop);
          sidebarBackdrop.addEventListener('click', closeFilterSidebar);
      }
  }

  function removeBackdrop() {
      if (sidebarBackdrop && sidebarBackdrop.parentNode) {
          sidebarBackdrop.parentNode.removeChild(sidebarBackdrop);
          sidebarBackdrop = null;
      }
  }

  function openFilterSidebar() {
      createBackdrop();
      if (sidebarWrapper) {
          sidebarWrapper.classList.add('open');
      }
      if (sidebarBackdrop) {
          sidebarBackdrop.classList.add('show');
      }
      document.body.classList.add('sidebar-open'); // Optional: for pushing content
  }

  function closeFilterSidebar() {
      if (sidebarWrapper) {
          sidebarWrapper.classList.remove('open');
      }
      if (sidebarBackdrop) {
          sidebarBackdrop.classList.remove('show');
      }
      document.body.classList.remove('sidebar-open'); // Optional: for pushing content
      removeBackdrop();
  }

  // Attach event listeners for the filter sidebar
  if (openFilterSidebarBtn && sidebarWrapper && sidebarCloseBtn) {
      openFilterSidebarBtn.addEventListener('click', openFilterSidebar);
      sidebarCloseBtn.addEventListener('click', closeFilterSidebar);
  } else {
      console.warn("Filter sidebar elements not found. Pop-out filter will not function.");
  }
// Inventory System Implementation for script.js

// -- Inventory System Storage --
const STORAGE_KEY = 'vehicleInventory';

// Initialize inventory
function initInventory() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
}

// Save vehicle to inventory
function saveVehicleToInventory(vehicleData) {
    try {
        const inventory = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        
        // Check if vehicle already exists in inventory
        const exists = inventory.some(item => item.id === vehicleData.id);
        
        if (!exists) {
            inventory.push(vehicleData);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory));
            console.log('Vehicle saved:', vehicleData);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error saving to inventory:', error);
        return false;
    }
}

// Get all inventory items
function getInventory() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (error) {
        console.error('Error reading inventory:', error);
        return [];
    }
}

// Remove item from inventory
function removeFromInventory(id) {
    try {
        let inventory = getInventory();
        inventory = inventory.filter(item => item.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory));
        return true;
    } catch (error) {
        console.error('Error removing from inventory:', error);
        return false;
    }
}

// -- Modify Save Button Event Listeners --
function setupSaveButtons() {
    const saveButtons = document.querySelectorAll('.save-to-inventory-btn');
    
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const vehicleCard = this.closest('.vehicle-card');
            if (vehicleCard) {
                const vehicleId = vehicleCard.dataset.id;
                const vehicleData = {
                    id: vehicleId,
                    name: vehicleCard.dataset.name || 'Unnamed Vehicle',
                    price: vehicleCard.dataset.price || 'N/A',
                    category: vehicleCard.dataset.category || 'Uncategorized',
                    power: vehicleCard.dataset.power || 'Unknown',
                    imageSrc: vehicleCard.querySelector('img')?.src || '',
                    imageAlt: vehicleCard.querySelector('img')?.alt || ''
                };

                const saved = saveVehicleToInventory(vehicleData);
                
                if (saved) {
                    // Button feedback
                    this.innerHTML = '<i class="fas fa-check"></i> Saved!';
                    this.classList.remove('btn-outline-primary');
                    this.classList.add('btn-success');
                    
                    // Update inventory count display if exists
                    updateInventoryCount();
                } else {
                    this.innerHTML = '<i class="fas fa-exclamation"></i> Already Saved';
                }
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-save"></i> Save to Inventory';
                    this.classList.remove('btn-success');
                    this.classList.add('btn-outline-primary');
                }, 2000);
            }
        });
    });
}

// Update inventory count display
function updateInventoryCount() {
    const countElement = document.getElementById('inventory-count');
    if (countElement) {
        countElement.textContent = `(${getInventory().length})`;
    }
}

// -- Inventory Page Rendering --
function renderInventoryPage() {
    const inventoryContainer = document.getElementById('inventory-items');
    if (inventoryContainer) {
        const inventory = getInventory();
        
        if (inventory.length === 0) {
            inventoryContainer.innerHTML = `
                <div class="empty-inventory">
                    <i class="fas fa-car fa-3x"></i>
                    <h3>Your inventory is empty</h3>
                    <p>Save vehicles from the showroom to see them here</p>
                    <a href="showroom.html" class="btn btn-primary">Browse Vehicles</a>
                </div>
            `;
            return;
        }
        
        inventoryContainer.innerHTML = inventory.map(vehicle => `
            <div class="inventory-item" data-id="${vehicle.id}">
                <div class="inventory-image">
                    <img src="${vehicle.imageSrc}" alt="${vehicle.imageAlt}">
                </div>
                <div class="inventory-details">
                    <h4>${vehicle.name}</h4>
                    <p class="price">$${vehicle.price}</p>
                    <p class="category">
                        <span class="badge bg-secondary">${vehicle.category}</span>
                        <span class="badge bg-primary">${vehicle.power}</span>
                    </p>
                    <button class="btn btn-danger remove-btn">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `).join('');
        
        // Setup remove buttons
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.closest('.inventory-item').dataset.id;
                if (removeFromInventory(itemId)) {
                    this.closest('.inventory-item').remove();
                    updateInventoryCount();
                    
                    // Show empty state if inventory is now empty
                    if (getInventory().length === 0) {
                        renderInventoryPage();
                    }
                }
            });
        });
    }
}

// -- Initialize the System --
document.addEventListener('DOMContentLoaded', function() {
    initInventory();
    
    // Setup save buttons if on a page with them
    if (document.querySelector('.save-to-inventory-btn')) {
        setupSaveButtons();
        updateInventoryCount();
    }
    
    // Render inventory page if on inventory page
    if (document.getElementById('inventory-items')) {
        renderInventoryPage();
    }
});

})(jQuery);
