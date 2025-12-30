// Mobile menu toggle for hero header
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const heroNav = document.querySelector('.hero-nav');
  const heroActions = document.querySelector('.hero-actions');

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      if (heroNav) heroNav.classList.toggle('active');
      if (heroActions) heroActions.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInside = heroNav?.contains(event.target) || 
                          heroActions?.contains(event.target) ||
                          mobileMenuToggle?.contains(event.target);
      
      if (!isClickInside && mobileMenuToggle?.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        if (heroNav) heroNav.classList.remove('active');
        if (heroActions) heroActions.classList.remove('active');
      }
    });
  }

  // Campaign slider functionality
  const campaignSlider = document.querySelector('.campaign-slider');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  if (campaignSlider && prevBtn && nextBtn) {
    const originalItems = campaignSlider.querySelectorAll('.campaign-item');
    const totalOriginal = originalItems.length;
    
    // We want to show 3 items.
    // To support infinite scrolling in both directions seamlessly, we clone items.
    // Minimal set for seamless 3-item view loop:
    // [Last, First, Second, Third, First] - simplified?
    // Robust way: Clone all items before and after.
    
    // Clone all items and append
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      clone.classList.add('clone-after');
      campaignSlider.appendChild(clone);
    });

    // Clone all items and prepend
    // We need to re-query or use originalItems list (which is static NodeList usually, but verify)
    // Actually, let's just create array of clones.
    for (let i = totalOriginal - 1; i >= 0; i--) {
       const clone = originalItems[i].cloneNode(true);
       clone.classList.add('clone-before');
       campaignSlider.insertBefore(clone, campaignSlider.firstChild);
    }

    // Now structure is: [ClonesBefore(3), Originals(3), ClonesAfter(3)]
    // Indices: 0,1,2 (clones), 3,4,5 (originals), 6,7,8 (clones)
    // Start at index 3.
    let currentIndex = totalOriginal; // 3
    
    const allItems = campaignSlider.querySelectorAll('.campaign-item');
    
    // Initial position without transition
    campaignSlider.style.transition = 'none';
    const itemWidthPercent = 100 / 3;
    campaignSlider.style.transform = `translateX(-${currentIndex * itemWidthPercent}%)`;

    let isTransitioning = false;

    function updateSlider(withTransition = true) {
      if (withTransition) {
        campaignSlider.style.transition = 'transform 0.5s ease-in-out';
      } else {
        campaignSlider.style.transition = 'none';
      }
      const translateX = -currentIndex * itemWidthPercent;
      campaignSlider.style.transform = `translateX(${translateX}%)`;
    }
    
    function nextSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex++;
      updateSlider(true);
    }
    
    function prevSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex--;
      updateSlider(true);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    campaignSlider.addEventListener('transitionend', () => {
      isTransitioning = false;
      
      // Check for loop conditions
      // Originals are at indices 3, 4, 5
      // If we are at index 6 (First Clone After), we visually look like index 3 (First Original).
      // So jump to 3.
      if (currentIndex >= totalOriginal * 2) {
        campaignSlider.style.transition = 'none';
        currentIndex = currentIndex - totalOriginal;
        updateSlider(false);
      }
      
      // If we are at index 2 (Last Clone Before), we visually look like index 5 (Last Original).
      // So jump to 5.
      if (currentIndex < totalOriginal) {
        campaignSlider.style.transition = 'none';
        currentIndex = currentIndex + totalOriginal;
        updateSlider(false);
      }
    });
  }
});

