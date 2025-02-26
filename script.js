// script.js
 const menuToggle = document.querySelector(".menu-toggle");
 const navMenu = document.querySelector("nav ul");
 const filterButtons = document.querySelectorAll(".filter-btn");
const roomCards = document.querySelectorAll(".room-card");


// Toggle effect links for mobile phones
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        if(navMenu.classList.contains('active')){
          menuToggle.innerHTML = '&#x2715;'
        }
        else{
          menuToggle.innerHTML = '&#9776;'
        }
    });

function bookNow() {
    alert("Redirecting to booking page...");
}



// Card filter Effect
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");
        roomCards.forEach(card => {
            if (category === "all" || card.getAttribute("data-category") === category) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});
// Services Scroll Effect
function cloneElements(containerId) {
    let container = document.getElementById(containerId);
    let clone = container.cloneNode(true);
    container.parentNode.appendChild(clone);
}
cloneElements("imageSlider");
cloneElements("titleSlider");

// Testimonial Section Begin
const slider = document.querySelector('.slider');
      const slides = document.querySelectorAll('.slide');
      const dotsContainer = document.querySelector('.dots-container');
      const prevBtn = document.querySelector('.prev-btn');
      const nextBtn = document.querySelector('.next-btn');
      
      let currentIndex = 0;
      const totalSlides = slides.length;
      
      // Function to check if we're on mobile or desktop
      function isMobile() {
        return window.innerWidth < 768;
      }
      
      // Function to calculate how many slides per group
      function slidesPerGroup() {
        return isMobile() ? 1 : 3;
      }
      
      // Function to calculate total number of groups/dots
      function totalGroups() {
        return Math.ceil(totalSlides / slidesPerGroup());
      }
      
      // Function to create dots
      function createDots() {
        // Clear existing dots
        dotsContainer.innerHTML = '';
        
        // Create new dots based on grouped slides
        for (let i = 0; i < totalGroups(); i++) {
          const dot = document.createElement('div');
          dot.classList.add('dot');
          if (i === 0) dot.classList.add('active');
          dot.dataset.group = i;
          
          dot.addEventListener('click', function() {
            goToGroup(parseInt(this.dataset.group));
          });
          
          dotsContainer.appendChild(dot);
        }
      }
      
      // Function to go to a specific group of slides
      function goToGroup(groupIndex) {
        const sPerGroup = slidesPerGroup();
        
        if (groupIndex < 0) {
          groupIndex = totalGroups() - 1;
        } else if (groupIndex >= totalGroups()) {
          groupIndex = 0;
        }
        
        // Set index to the first slide of the selected group
        currentIndex = groupIndex * sPerGroup;
        
        // Ensure we don't go beyond the total number of slides
        if (currentIndex >= totalSlides) {
          currentIndex = totalSlides - sPerGroup;
        }
        
        updateSlider();
      }
      
      // Function to update slider based on current index
      function updateSlider() {
        const sPerGroup = slidesPerGroup();
        
        // For desktop, position the slider to show the current group
        // For mobile, position the slider to show the current slide
        slider.style.transform = `translateX(-${(currentIndex / sPerGroup) * (100 / totalSlides) * sPerGroup * totalGroups()}%)`;
        
        // Update active dot
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Calculate which dot should be active
        const activeDotIndex = Math.floor(currentIndex / sPerGroup);
        if (dots[activeDotIndex]) {
          dots[activeDotIndex].classList.add('active');
        }
      }
      
      // Event listeners for prev and next buttons
      prevBtn.addEventListener('click', function() {
        const sPerGroup = slidesPerGroup();
        if (isMobile()) {
          currentIndex = (currentIndex - 1 < 0) ? totalSlides - 1 : currentIndex - 1;
        } else {
          currentIndex = (currentIndex - sPerGroup < 0) ? 
                         Math.max(totalSlides - sPerGroup, 0) : 
                         currentIndex - sPerGroup;
        }
        updateSlider();
      });
      
      nextBtn.addEventListener('click', function() {
        const sPerGroup = slidesPerGroup();
        if (isMobile()) {
          currentIndex = (currentIndex + 1 >= totalSlides) ? 0 : currentIndex + 1;
        } else {
          currentIndex = (currentIndex + sPerGroup >= totalSlides) ? 
                         0 : 
                         currentIndex + sPerGroup;
        }
        updateSlider();
      });
      
      // Create initial dots and set up slider
      createDots();
      updateSlider();
      
      // Update layout when window resizes
      let resizeTimeout;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
          createDots();
          updateSlider();
        }, 250);
      });
      
      // Auto slide functionality
      let interval = setInterval(function() {
        nextBtn.click();
      }, 5000);
      
      // Pause auto sliding when hovering over the slider
      slider.addEventListener('mouseenter', function() {
        clearInterval(interval);
      });
      
      slider.addEventListener('mouseleave', function() {
        interval = setInterval(function() {
          nextBtn.click();
        }, 5000);
      });
// Testimonial Section Ends
// Animate Text
// Function to animate text one character at a time
function animateText(element, text, index, interval) {
  if (index < text.length) {
    element.innerHTML += text.charAt(index);
    setTimeout(function() {
      animateText(element, text, index + 1, interval);
    }, interval);
  }
}

// Function to clear and animate text
function animateElement(element, text, interval) {
  element.innerHTML = '';
  animateText(element, text, 0, interval);
}

// Function to handle animations for a room card
function animateRoomCard(card) {
  const title = card.querySelector('.room-title');
  const desc = card.querySelector('.room-desc');
  
  // Store the original text
  const titleText = title.textContent;
  const descText = desc.textContent;
  
  // Clear the text initially
  title.textContent = '';
  desc.textContent = '';
  
  // Animate the title first, then the description
  setTimeout(() => {
    animateElement(title, titleText, 50); // 50ms interval per character for title
    
    // After title is done, start description animation
    setTimeout(() => {
      animateElement(desc, descText, 20); // 20ms interval per character for description
    }, titleText.length * 50 + 300); // Wait for title animation + a small delay
  }, 300);
}

// Function to check if an element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Main function to handle scroll events and trigger animations
document.addEventListener('DOMContentLoaded', function() {
  const roomCards = document.querySelectorAll('.room-card');
  let animated = new Set(); // Keep track of already animated cards
  
  // Function to check and animate visible cards
  function checkVisibleCards() {
    roomCards.forEach(card => {
      if (isInViewport(card) && !animated.has(card)) {
        animated.add(card);
        animateRoomCard(card);
      }
    });
  }
  
  // Check on scroll
  window.addEventListener('scroll', checkVisibleCards);
  
  // Check on initial load
  checkVisibleCards();
});
