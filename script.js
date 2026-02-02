// =====================================================
// THE MEWA - MAIN JAVASCRIPT
// Fully Responsive with Mobile Menu Support
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  // Core UI Modules
  initMobileMenu();
  initNavbarScroll();
  initDropdownMenus();
  initBackToTop();
  initActivePageHighlight();

  // Animations & Interactions
  initScrollAnimations();
  initCounterAnimations();
  initSmoothScroll();
  activateBenefitsShowcase();

  // Page Specific Modules
  initFAQAccordion();
  initServiceTabs();
  initContactForm();

  // Interactive Explainer Cards (Recommendations)
  // These initialize automatically if the elements exist
  initSection2Explainer();
  
  // Revised stamp click listener
  const revisedStamp = document.querySelector('.status-stamp.revised-stamp');
  if (revisedStamp) {
    revisedStamp.style.cursor = 'pointer';
    revisedStamp.addEventListener('click', switchToRevisedTab);
  }
});


// =====================================================
// 1. CORE NAVIGATION & UI
// =====================================================

function initMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileNavMenu = document.getElementById("mobileNavMenu");
  const mobileDropdownToggles = document.querySelectorAll(".mobile-dropdown-toggle");

  if (!mobileMenuToggle || !mobileNavMenu) return;

  // Toggle mobile menu
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenuToggle.classList.toggle("active");
    mobileNavMenu.classList.toggle("active");

    // Prevent body scroll when menu is open
    if (mobileNavMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  // Mobile dropdown toggles
  mobileDropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent any default button behavior
      
      // FIX: Find the parent container first, then find the menu inside it
      const container = toggle.closest('.mobile-nav-dropdown');
      const dropdownMenu = container.querySelector('.mobile-dropdown-menu');
      
      if (dropdownMenu) {
        toggle.classList.toggle("active");
        dropdownMenu.classList.toggle("active");
      }
    });
  });

  // Close menu when clicking on a link
  const mobileNavLinks = mobileNavMenu.querySelectorAll("a");
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuToggle.classList.remove("active");
      mobileNavMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileNavMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      mobileMenuToggle.classList.remove("active");
      mobileNavMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Close menu on resize to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1199) {
      mobileMenuToggle.classList.remove("active");
      mobileNavMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

function initNavbarScroll() {
  const navbar = document.querySelector(".navbar-custom");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 10px 40px rgba(0,0,0,0.3)";
    } else {
      navbar.style.boxShadow = "none";
    }
  });
}

function initDropdownMenus() {
  // Desktop Dropdowns
  const dropdownToggles = document.querySelectorAll(".nav-dropdown .nav-link-custom");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      const href = toggle.getAttribute("href");
      if (href === "#" || href.startsWith("#")) {
        e.preventDefault();
      }

      const dropdown = toggle.closest(".nav-dropdown");
      const dropdownMenu = dropdown.querySelector(".dropdown-menu-custom");
      const isCurrentlyOpen = dropdownMenu.style.opacity === "1";

      // Close other dropdowns
      document.querySelectorAll(".nav-dropdown").forEach((other) => {
        if (other !== dropdown) {
          const otherMenu = other.querySelector(".dropdown-menu-custom");
          if (otherMenu) {
            otherMenu.style.opacity = "0";
            otherMenu.style.visibility = "hidden";
          }
        }
      });

      if (isCurrentlyOpen) {
        dropdownMenu.style.opacity = "0";
        dropdownMenu.style.visibility = "hidden";
      } else {
        dropdownMenu.style.opacity = "1";
        dropdownMenu.style.visibility = "visible";
      }
    });
  });

  // Hover effects for desktop
  document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
    dropdown.addEventListener("mouseenter", () => {
      const dropdownMenu = dropdown.querySelector(".dropdown-menu-custom");
      if (dropdownMenu) {
        dropdownMenu.style.opacity = "";
        dropdownMenu.style.visibility = "";
      }
    });

    dropdown.addEventListener("mouseleave", () => {
      const dropdownMenu = dropdown.querySelector(".dropdown-menu-custom");
      if (dropdownMenu) {
        dropdownMenu.style.opacity = "0";
        dropdownMenu.style.visibility = "hidden";
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-dropdown")) {
      document.querySelectorAll(".dropdown-menu-custom").forEach((menu) => {
        menu.style.opacity = "0";
        menu.style.visibility = "hidden";
      });
    }
  });
}

function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTopBtn");
  const progressCircle = document.querySelector(".progress-ring__circle");

  if (!backToTopBtn || !progressCircle) return;

  const radius = progressCircle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
  progressCircle.style.strokeDashoffset = circumference;

  function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
  }

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    let scrollPercent = 0;
    
    if (docHeight > 0) {
      scrollPercent = (scrollTop / docHeight) * 100;
    }

    if (scrollTop > 200) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }

    setProgress(scrollPercent);
  });

  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function initActivePageHighlight() {
  const path = window.location.pathname;
  let page = path.split("/").pop();

  if (page === "" || page === "/") {
    page = "index.html";
  }

  const navLinks = document.querySelectorAll('.nav-link-custom, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.split('#')[0].split('?')[0];
    if (cleanHref === decodeURIComponent(page)) {
      link.classList.add('active');
    }
  });

  if (page === 'about-mewa.html') {
    highlightMobileDropdown('About MEWA');
  } else if (page === 'our-app.html') {
    highlightMobileDropdown('Our App');
  }
}

function highlightMobileDropdown(textToFind) {
  const buttons = document.querySelectorAll('.mobile-dropdown-toggle');
  buttons.forEach(btn => {
    if (btn.textContent.trim().includes(textToFind)) {
      btn.classList.add('active');
      btn.style.color = "var(--gradient-2)";
    }
  });
}

// =====================================================
// 2. ANIMATIONS
// =====================================================

function initScrollAnimations() {
  const fadeElements = document.querySelectorAll(".fade-up");
  const annotationItems = document.querySelectorAll(".annotation-item");
  const benefitCards = document.querySelectorAll(".asymmetric-benefit-card, .spotlight-benefit-card, .compact-benefit-card, .benefit-item");

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  fadeElements.forEach((el) => observer.observe(el));
  annotationItems.forEach((el) => observer.observe(el));
  benefitCards.forEach((el) => observer.observe(el));
}

function initCounterAnimations() {
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length === 0) return;

  const observerOptions = { threshold: 0.5 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        entry.target.classList.add("counted");
        animateCounter(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute("data-count"));
  const suffix = element.getAttribute("data-suffix") || "";
  const prefix = element.getAttribute("data-prefix") || "";
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += step;
    if (current < target) {
      element.textContent = prefix + Math.floor(current) + suffix;
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = prefix + target + suffix;
    }
  };

  updateCounter();
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#" || href === "#login") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

function activateBenefitsShowcase() {
  // Logic merged into initScrollAnimations
  const benefitCards = document.querySelectorAll(".benefit-item");
  if(benefitCards.length > 0) {
      // Hook for future specific logic
  }
}


// =====================================================
// 3. PAGE SPECIFIC MODULES (FAQ, TABS, FORMS)
// =====================================================

function initFAQAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  if (faqItems.length === 0) return;

  faqItems.forEach((item) => {
    if (item.hasAttribute("data-faq-init")) return;
    item.setAttribute("data-faq-init", "true");

    const question = item.querySelector(".faq-question");
    if (!question) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });
      if (isActive) {
        item.classList.remove("active");
      } else {
        item.classList.add("active");
      }
    });
  });
}

function initServiceTabs() {
  // 1. Service Page Tabs (Unchanged)
  const tabButtons = document.querySelectorAll(".service-tab-btn");
  const tabContents = document.querySelectorAll(".service-tab-content");

  if (tabButtons.length > 0) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetTab = button.getAttribute("data-tab");
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        tabContents.forEach((content) => content.classList.remove("active"));
        button.classList.add("active");
        const targetContent = document.getElementById(`tab-${targetTab}`);
        if (targetContent) {
          setTimeout(() => {
            targetContent.classList.add("active");
          }, 50);
        }
      });
    });
  }
  
  // 2. Recommendation Tabs (FULLY SCOPED FIX)
  const recoTabButtons = document.querySelectorAll(".tab-btn");
  if (recoTabButtons.length > 0) {
      recoTabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          // 1. Find which section this button belongs to (Original or Duplicate)
          const parentSection = btn.closest('section');
          if (!parentSection) return;

          // 2. Clear 'active' classes ONLY inside this specific section
          parentSection.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
          parentSection.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
          parentSection.querySelectorAll(".reco-tab-content").forEach(c => c.classList.remove("active"));

          // 3. Activate the clicked button
          btn.classList.add("active");
          
          // 4. Activate the target content (Scope search to ID, but logic is safe now)
          const tab = btn.dataset.tab; 
          const mainContent = document.getElementById(`${tab}-tab`); 
          if (mainContent) mainContent.classList.add("active");

          // 5. Trigger Specific Logic based on which tab was clicked
          
          // --- ORIGINAL SECTION (Section 3) ---
          if (tab === "active") {
            const inner = document.getElementById("tab-active-reco");
            if(inner) inner.classList.add("active");
          } 
          else if (tab === "revised") {
            const inner = document.getElementById("tab-revised-reco");
            if(inner) inner.classList.add("active");
            setTimeout(initSection3Explainer, 50);
          }
          
          // --- DUPLICATE SECTION (Section 4) ---
          else if (tab === "active-2") {
            const inner = document.getElementById("tab-active-reco-2");
            if(inner) inner.classList.add("active");
            // Draw Active Tab Duplicate Lines
            setTimeout(() => {
                if (typeof drawConnectorsSection2_Duplicate === 'function') {
                    drawConnectorsSection2_Duplicate();
                }
            }, 100);
          }
          else if (tab === "revised-2") {
            const inner = document.getElementById("tab-revised-reco-2");
            if(inner) inner.classList.add("active");
            // Draw Revised Tab Duplicate Lines
            setTimeout(() => {
                if (typeof drawChamferedConnectorsSection3_Duplicate === 'function') {
                    drawChamferedConnectorsSection3_Duplicate();
                }
            }, 100);
          }
        });
      });
  }
}

function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    alert(`Thank you, ${name}! We've received your message and will get back to you at ${email} within 24 hours.`);
    contactForm.reset();
  });
}

// =====================================================
// 4. INTERACTIVE EXPLAINER CARD (OUR APP PAGE)
// =====================================================

(function() {
    'use strict';
    
    const isDesktop = () => window.innerWidth > 991;
    let activeZone = null;
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initExplainerCard);
    } else {
        initExplainerCard();
    }
    
    window.addEventListener('resize', debounce(handleResize, 150));
    
    function initExplainerCard() {
        if (isDesktop()) {
            drawConnectors();
            setupDesktopHover();
        } else {
            setupMobileTap();
        }
    }
    
    function handleResize() {
        const svg = document.getElementById('connectorSvg');
        if (svg) svg.innerHTML = '';
        
        document.querySelectorAll('.annotation-item, .highlight-zone, .connector-path').forEach(el => {
            el.classList.remove('highlighted', 'faded', 'active');
        });
        document.querySelectorAll('.mobile-explanation').forEach(el => {
            el.classList.remove('expanded');
        });
        activeZone = null;
        
        if (isDesktop()) {
            drawConnectors();
            setupDesktopHover();
        } else {
            setupMobileTap();
        }
    }
    
    // ==================== DESKTOP: SVG CONNECTORS ====================
    // function drawConnectors() {
    //   const svg = document.getElementById('connectorSvg');
    //   const container = document.getElementById('explainerContainer');
    //   if (!svg || !container) return;
      
    //   svg.innerHTML = '';
    //   const containerRect = container.getBoundingClientRect();
      
    //   // Connection mapping: number -> [side, color]
    //   // Left: 1 (orange), 2 (purple), 3 (blue)
    //   // Right: 4 (pink), 5 (green), 6 (red)
    //   const connections = {
    //       1: ['left', 'orange'],
    //       2: ['left', 'purple'],
    //       3: ['left', 'blue'],
    //       4: ['right', 'pink'],
    //       5: ['right', 'green'],
    //       6: ['right', 'red'],
    //       7: ['left', 'red'],
    //       8: ['right', 'orange']
    //   };
      
    //   Object.entries(connections).forEach(([num, [side, color]]) => {
    //       const annotation = document.querySelector(`.annotation-item[data-target="${num}"]`);
    //       const zone = document.querySelector(`.highlight-zone[data-num="${num}"]`);
          
    //       if (!annotation || !zone) return;
          
    //       const annotationRect = annotation.getBoundingClientRect();
    //       const zoneRect = zone.getBoundingClientRect();
          
    //       let startX, startY, endX, endY;
          
    //       if (side === 'left') {
    //           // From annotation right edge to zone left edge
    //           startX = annotationRect.right - containerRect.left;
    //           startY = annotationRect.top + annotationRect.height / 2 - containerRect.top;
    //           endX = zoneRect.left - containerRect.left;
    //           endY = zoneRect.top + zoneRect.height / 2 - containerRect.top;
    //       } else {
    //           // From annotation left edge to zone right edge
    //           startX = annotationRect.left - containerRect.left;
    //           startY = annotationRect.top + annotationRect.height / 2 - containerRect.top;
    //           endX = zoneRect.right - containerRect.left;
    //           endY = zoneRect.top + zoneRect.height / 2 - containerRect.top;
    //       }
          
    //       // Create curved path using cubic bezier
    //       const midX = (startX + endX) / 2;
    //       const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    //       path.setAttribute('d', `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`);
    //       path.setAttribute('class', `connector-path ${color}`);
    //       path.setAttribute('data-num', num);
          
    //       svg.appendChild(path);
    //   });
    // }

  function drawConnectors() {
  const svg = document.getElementById('connectorSvg');
  const container = document.getElementById('explainerContainer');
  if (!svg || !container) return;

  svg.innerHTML = '';
  const containerRect = container.getBoundingClientRect();

  const connections = {
    1: ['left', 'orange'], 2: ['left', 'purple'], 3: ['left', 'blue'],
    4: ['right', 'pink'], 5: ['right', 'green'], 6: ['right', 'red'],
    7: ['left', 'red'], 8: ['right', 'orange']
  };

  Object.entries(connections).forEach(([num, [side, color]]) => {
    const annotation = document.querySelector(`.annotation-item[data-target="${num}"]`);
    const zone = document.querySelector(`.highlight-zone[data-num="${num}"]`);

    if (!annotation || !zone) return;

    const annotationRect = annotation.getBoundingClientRect();
    const zoneRect = zone.getBoundingClientRect();

    let startX, startY, endX, endY;

    if (side === 'left') {
      startX = annotationRect.right - containerRect.left;
      startY = annotationRect.top + annotationRect.height / 2 - containerRect.top;
      endX = zoneRect.left - containerRect.left;
      endY = zoneRect.top + zoneRect.height / 2 - containerRect.top;
    } else {
      startX = annotationRect.left - containerRect.left;
      startY = annotationRect.top + annotationRect.height / 2 - containerRect.top;
      endX = zoneRect.right - containerRect.left;
      endY = zoneRect.top + zoneRect.height / 2 - containerRect.top;
    }

    // --- HANGING THREAD LOGIC ---
    const midX = (startX + endX) / 2;
    
    // Calculate distance to determine how much it should "hang"
    const distance = Math.abs(endX - startX);
    // Slack: The longer the line, the more it hangs (max 50px drop)
    const slack = Math.min(50, distance * 0.15); 
    
    // The "Control Point" Y position is the midpoint + slack
    const controlY = (startY + endY) / 2 + slack;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    // 'Q' creates the smooth hanging curve
    path.setAttribute('d', `M ${startX} ${startY} Q ${midX} ${controlY} ${endX} ${endY}`);
    path.setAttribute('class', `connector-path ${color}`);
    path.setAttribute('data-num', num);
    svg.appendChild(path);

    // Dots
    [ {x: startX, y: startY}, {x: endX, y: endY} ].forEach(pt => {
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);
        dot.setAttribute('r', 3);
        dot.setAttribute('class', `connector-path ${color}`);
        dot.setAttribute('data-num', num);
        svg.appendChild(dot);
    });
  });
}
    
    // ==================== DESKTOP: HOVER INTERACTIONS ====================
    function setupDesktopHover() {
        const annotations = document.querySelectorAll('.annotation-item[data-target]');
        const zones = document.querySelectorAll('.highlight-zone[data-num]');
        
        annotations.forEach(annotation => {
            annotation.removeEventListener('mouseenter', handleHoverStart);
            annotation.removeEventListener('mouseleave', handleHoverEnd);
            annotation.addEventListener('mouseenter', handleHoverStart);
            annotation.addEventListener('mouseleave', handleHoverEnd);
        });
        
        zones.forEach(zone => {
            zone.removeEventListener('mouseenter', handleHoverStart);
            zone.removeEventListener('mouseleave', handleHoverEnd);
            zone.addEventListener('mouseenter', handleHoverStart);
            zone.addEventListener('mouseleave', handleHoverEnd);
        });
    }
    
    function handleHoverStart(e) {
        if (!isDesktop()) return;
        
        const num = e.currentTarget.dataset.target || e.currentTarget.dataset.num;
        if (!num) return;
        
        const annotation = document.querySelector(`.annotation-item[data-target="${num}"]`);
        const zone = document.querySelector(`.highlight-zone[data-num="${num}"]`);
        const path = document.querySelector(`.connector-path[data-num="${num}"]`);
        
        // Fade all
        document.querySelectorAll('.annotation-item').forEach(el => el.classList.add('faded'));
        document.querySelectorAll('.highlight-zone[data-num]').forEach(el => el.classList.add('faded'));
        document.querySelectorAll('.connector-path').forEach(el => el.classList.add('faded'));
        
        // Highlight active
        if (annotation) {
            annotation.classList.remove('faded');
            annotation.classList.add('highlighted');
        }
        if (zone) {
            zone.classList.remove('faded');
            zone.classList.add('highlighted');
        }
        if (path) {
            path.classList.remove('faded');
            path.classList.add('highlighted');
        }
    }
    
    function handleHoverEnd() {
        if (!isDesktop()) return;
        
        document.querySelectorAll('.annotation-item, .highlight-zone, .connector-path').forEach(el => {
            el.classList.remove('highlighted', 'faded');
        });
    }
    
    // ==================== MOBILE: TAP INTERACTIONS ====================
    function setupMobileTap() {
        const zones = document.querySelectorAll('.highlight-zone[data-num]');
        
        zones.forEach(zone => {
            zone.removeEventListener('click', handleTap);
            zone.addEventListener('click', handleTap);
        });
        
        document.removeEventListener('click', handleOutsideTap);
        document.addEventListener('click', handleOutsideTap);
    }
    
    function handleTap(e) {
        if (isDesktop()) return;
        
        e.stopPropagation();
        const zone = e.currentTarget;
        const explanation = zone.querySelector('.mobile-explanation');
        
        if (!explanation) return;
        
        // If already active, close it
        if (activeZone === zone) {
            closeExplanation(zone, explanation);
            activeZone = null;
            return;
        }
        
        // Close previous
        if (activeZone) {
            const prevExplanation = activeZone.querySelector('.mobile-explanation');
            closeExplanation(activeZone, prevExplanation);
        }
        
        // Open new
        zone.classList.add('active');
        explanation.classList.add('expanded');
        activeZone = zone;
    }
    
    function handleOutsideTap(e) {
        if (isDesktop() || !activeZone) return;
        
        if (!e.target.closest('.highlight-zone')) {
            const explanation = activeZone.querySelector('.mobile-explanation');
            closeExplanation(activeZone, explanation);
            activeZone = null;
        }
    }
    
    function closeExplanation(zone, explanation) {
        if (zone) zone.classList.remove('active');
        if (explanation) explanation.classList.remove('expanded');
    }
    
    // ==================== UTILITY ====================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
})();


// =====================================================
// EXPLAINER: SWITCH TAB & HISTORY TOGGLE
// =====================================================

function switchToRevisedTab() {
  // 1. Find the Original Section (We find it by looking for a unique child, like 'active-tab')
  // This ensures we are NOT selecting the Duplicate Section (which uses 'active-2-tab')
  const activeTabContent = document.getElementById('active-tab');
  if (!activeTabContent) return;
  
  const originalSection = activeTabContent.closest('.tabbed-reco-section');
  if (!originalSection) return;

  // 2. Select Buttons & Content ONLY inside this Original Section
  const tabButtons = originalSection.querySelectorAll(".tab-btn");
  const tabContents = originalSection.querySelectorAll(".tab-content");
  const innerTabContents = originalSection.querySelectorAll(".reco-tab-content");

  // 3. Clear 'active' class ONLY from these specific elements
  tabButtons.forEach((btn) => btn.classList.remove("active"));
  tabContents.forEach((content) => content.classList.remove("active"));
  innerTabContents.forEach((c) => c.classList.remove("active"));

  // 4. Activate the Revised Button (scoped to this section)
  const revisedTabBtn = originalSection.querySelector('.tab-btn[data-tab="revised"]');
  if (revisedTabBtn) revisedTabBtn.classList.add("active");

  // 5. Activate the Content IDs (Unique to Original Section)
  const revisedContent = document.getElementById("revised-tab");
  if (revisedContent) revisedContent.classList.add("active");

  const innerRevisedContent = document.getElementById("tab-revised-reco");
  if (innerRevisedContent) innerRevisedContent.classList.add("active");

  // 6. Scroll & Redraw
  originalSection.scrollIntoView({ behavior: "smooth", block: "start" });

  setTimeout(() => {
    initSection3Explainer();
  }, 100);
}

function toggleTabbedHistory() {
  const section = document.getElementById("tabbed-history-section");
  const text = document.getElementById("tabbed-history-text");
  const icon = document.getElementById("tabbed-history-icon");
  const btn = document.getElementById("tabbed-history-btn");

  if (section.classList.contains("expanded")) {
    section.classList.remove("expanded");
    text.textContent = "View History";
    icon.classList.remove("bi-chevron-up");
    icon.classList.add("bi-chevron-down");
    btn.classList.remove("expanded");
  } else {
    section.classList.add("expanded");
    text.textContent = "Hide History";
    icon.classList.remove("bi-chevron-down");
    icon.classList.add("bi-chevron-up");
    btn.classList.add("expanded");
  }

  setTimeout(() => {
    if (typeof drawOrthogonalConnectorsSection3 === 'function') {
      // drawConnectorsSection3(); // <--- OLD CURVED VERSION (Commented out)
      // drawOrthogonalConnectorsSection3(); // <--- NEW BRACKET VERSION
      drawChamferedConnectorsSection3(); // <--- NEW ChamferedVERSION
      // drawRoundedConnectorsSection3();      // <--- NEW rounded curve version
    }
  }, 350); 
}


// =====================================================
// EXPLAINER: SECTION 2 CONNECTORS
// =====================================================

function drawConnectorsSection2() {
    const svg = document.getElementById('connectorSvgSection2');
    const container = document.getElementById('explainerContainerSection2');
    if (!svg || !container) return;

    svg.innerHTML = '';
    const containerRect = container.getBoundingClientRect();
    const connections = { 's2-1': ['left', 'orange'], 's2-2': ['right', 'blue'] };

    Object.entries(connections).forEach(([num, [side, color]]) => {
        const annotation = document.querySelector(`.section2-annotations .annotation-item[data-target="${num}"]`);
        const zone = document.querySelector(`.highlight-zone[data-num="${num}"]`);
        if (!annotation || !zone) return;

        const annotationRect = annotation.getBoundingClientRect();
        const zoneRect = zone.getBoundingClientRect();
        let startX, startY, endX, endY;

        if (side === 'left') {
            startX = annotationRect.right - containerRect.left;
            startY = annotationRect.top + annotationRect.height / 2 - containerRect.top;
            endX = zoneRect.left - containerRect.left;
            endY = zoneRect.top + zoneRect.height / 2 - containerRect.top;
        } else {
            startX = annotationRect.left - containerRect.left;
            startY = annotationRect.top + annotationRect.height / 2 - containerRect.top;
            endX = zoneRect.right - containerRect.left;
            endY = zoneRect.top + zoneRect.height / 2 - containerRect.top;
        }

        // --- HANGING THREAD LOGIC ---
        const midX = (startX + endX) / 2;
        const distance = Math.abs(endX - startX);
        const slack = Math.min(30, distance * 0.15); // Slightly tighter slack for this section
        const controlY = (startY + endY) / 2 + slack;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${startX} ${startY} Q ${midX} ${controlY} ${endX} ${endY}`);
        path.setAttribute('class', `connector-path ${color}`);
        path.setAttribute('data-num', num);
        svg.appendChild(path);

        [ {x: startX, y: startY}, {x: endX, y: endY} ].forEach(pt => {
            const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);
            dot.setAttribute('r', 3);
            dot.setAttribute('class', `connector-path ${color}`);
            dot.setAttribute('data-num', num);
            svg.appendChild(dot);
        });
    });
}

function initSection2Explainer() {
    if (window.innerWidth > 991) {
        drawConnectorsSection2();
        setupSection2Hover();
    }
}

function setupSection2Hover() {
    const annotations = document.querySelectorAll('.section2-annotations .annotation-item');
    const zones = document.querySelectorAll('.highlight-zone[data-num^="s2-"]');

    annotations.forEach(item => {
        item.addEventListener('mouseenter', handleSection2HoverStart);
        item.addEventListener('mouseleave', handleSection2HoverEnd);
    });
    zones.forEach(zone => {
        zone.addEventListener('mouseenter', handleSection2HoverStart);
        zone.addEventListener('mouseleave', handleSection2HoverEnd);
    });
}

function handleSection2HoverStart(e) {
    if (window.innerWidth <= 991) return;
    const num = e.currentTarget.dataset.target || e.currentTarget.dataset.num;
    if (!num) return;

    const annotation = document.querySelector(`.section2-annotations .annotation-item[data-target="${num}"]`);
    const zone = document.querySelector(`.highlight-zone[data-num="${num}"]`);
    const paths = document.querySelectorAll(`#connectorSvgSection2 .connector-path[data-num="${num}"]`);

    document.querySelectorAll('.section2-annotations .annotation-item').forEach(el => el.classList.add('faded'));
    document.querySelectorAll('.highlight-zone[data-num^="s2-"]').forEach(el => el.classList.add('faded'));
    document.querySelectorAll('#connectorSvgSection2 .connector-path').forEach(el => el.classList.add('faded'));

    if (annotation) { annotation.classList.remove('faded'); annotation.classList.add('highlighted'); }
    if (zone) { zone.classList.remove('faded'); zone.classList.add('highlighted'); }
    paths.forEach(path => { path.classList.remove('faded'); path.classList.add('highlighted'); });
}

function handleSection2HoverEnd() {
    if (window.innerWidth <= 991) return;
    document.querySelectorAll('.section2-annotations .annotation-item, .highlight-zone[data-num^="s2-"], #connectorSvgSection2 .connector-path').forEach(el => {
        el.classList.remove('highlighted', 'faded');
    });
}

// Global Resize handler for Section 2
window.addEventListener('resize', debounce(function() {
    const svg = document.getElementById('connectorSvgSection2');
    if (svg) svg.innerHTML = '';
    
    document.querySelectorAll('.section2-annotations .annotation-item, .highlight-zone[data-num^="s2-"], #connectorSvgSection2 .connector-path').forEach(el => {
        el.classList.remove('highlighted', 'faded');
    });
    
    if (window.innerWidth > 991) {
        drawConnectorsSection2();
        setupSection2Hover();
    }
}, 150));

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}


// =====================================================
// EXPLAINER: SECTION 3 CONNECTORS (REVISED TAB)
// =====================================================

function drawConnectorsSection3() {
    const svg = document.getElementById('connectorSvgSection3');
    const container = document.getElementById('explainerContainerSection3');
    if (!svg || !container) return;

    svg.style.overflow = 'visible';
    // svg.style.zIndex = '10';
    svg.innerHTML = '';
    const containerRect = container.getBoundingClientRect();

    const connections = {
        's3-1': { side: 'left', color: 'orange', targets: ['s3-1a', 's3-1b', 's3-1c'] },
        's3-2': { side: 'left', color: 'red', targets: ['s3-2a', 's3-2b', 's3-2c'] },
        's3-3': { side: 'right', color: 'green', targets: ['s3-3a', 's3-3b'] },
        's3-4': { side: 'right', color: 'blue', targets: ['s3-4a', 's3-4b'] },
        's3-5': { side: 'left', color: 'purple', targets: ['s3-5'] },
        's3-6': { side: 'right', color: 'pink', targets: ['s3-6'] }
    };

    Object.entries(connections).forEach(([annotationId, config]) => {
        const annotation = document.querySelector(`.section3-annotations .annotation-item[data-target="${annotationId}"]`);
        if (!annotation) return;

        const annotationRect = annotation.getBoundingClientRect();
        
        let startX, startY;
        if (config.side === 'left') {
            startX = annotationRect.right - containerRect.left;
        } else {
            startX = annotationRect.left - containerRect.left;
        }
        startY = annotationRect.top + annotationRect.height / 2 - containerRect.top;

        // Draw Start Dot
        const dotStart = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dotStart.setAttribute('cx', startX); dotStart.setAttribute('cy', startY);
        dotStart.setAttribute('r', 3);
        dotStart.setAttribute('class', `connector-path ${config.color}`);
        dotStart.setAttribute('data-num', annotationId);
        svg.appendChild(dotStart);

        config.targets.forEach((targetNum) => {
            const zone = document.querySelector(`.highlight-zone[data-num="${targetNum}"]`);
            if (!zone) return;

            const historyContainer = zone.closest('#tabbed-history-section');
            if (historyContainer && !historyContainer.classList.contains('expanded')) return;

            const zoneRect = zone.getBoundingClientRect();
            if (zoneRect.width === 0 || zoneRect.height === 0) return;

            let endX, endY;
            if (config.side === 'left') {
                endX = zoneRect.left - containerRect.left;
            } else {
                endX = zoneRect.right - containerRect.left;
            }
            endY = zoneRect.top + zoneRect.height / 2 - containerRect.top;

            // --- HANGING THREAD LOGIC ---
            const midX = (startX + endX) / 2;
            const distance = Math.abs(endX - startX);
            const slack = Math.min(30, distance * 0.15);
            const controlY = (startY + endY) / 2 + slack;

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', `M ${startX} ${startY} Q ${midX} ${controlY} ${endX} ${endY}`);
            path.setAttribute('class', `connector-path ${config.color}`);
            path.setAttribute('data-num', annotationId);
            svg.appendChild(path);

            // End Dot
            const dotEnd = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dotEnd.setAttribute('cx', endX); dotEnd.setAttribute('cy', endY);
            dotEnd.setAttribute('r', 3);
            dotEnd.setAttribute('class', `connector-path ${config.color}`);
            dotEnd.setAttribute('data-num', annotationId);
            svg.appendChild(dotEnd);
        });
    });
}

function drawOrthogonalConnectorsSection3() {
    const svg = document.getElementById('connectorSvgSection3');
    const container = document.getElementById('explainerContainerSection3');
    const card = document.querySelector('.revision-card.active') || document.querySelector('.reco-card.active');
    
    if (!svg || !container || !card) return;

    svg.style.overflow = 'visible';
    svg.style.zIndex = '10'; 
    svg.style.pointerEvents = 'none'; 
    svg.innerHTML = '';
    
    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const connections = {
        's3-1': { side: 'left', color: 'orange', targets: ['s3-1a', 's3-1b', 's3-1c'] },
        's3-2': { side: 'left', color: 'red', targets: ['s3-2a', 's3-2b', 's3-2c'] },
        's3-3': { side: 'right', color: 'green', targets: ['s3-3a', 's3-3b'] },
        's3-4': { side: 'right', color: 'blue', targets: ['s3-4a', 's3-4b'] },
        's3-5': { side: 'left', color: 'purple', targets: ['s3-5'] },
        's3-6': { side: 'right', color: 'pink', targets: ['s3-6'] }
    };

    Object.entries(connections).forEach(([annotationId, config]) => {
        const annotation = document.querySelector(`.section3-annotations .annotation-item[data-target="${annotationId}"]`);
        if (!annotation) return;

        const annotationRect = annotation.getBoundingClientRect();
        
        // 1. Start Point
        let startX, startY;
        if (config.side === 'left') {
            startX = annotationRect.right - containerRect.left;
        } else {
            startX = annotationRect.left - containerRect.left;
        }
        startY = annotationRect.top + annotationRect.height / 2 - containerRect.top;

        createDot(svg, startX, startY, config.color, annotationId);

        // 2. Gather Targets with BREATHING SPACE
        const validTargets = [];
        // Define how far away from the card the arrow tip should stop
        const spaceFromCard = 15; 

        config.targets.forEach((targetNum) => {
            const zone = document.querySelector(`.highlight-zone[data-num="${targetNum}"]`);
            if (!zone) return;

            const historyContainer = zone.closest('#tabbed-history-section');
            if (historyContainer && !historyContainer.classList.contains('expanded')) return;

            const zoneRect = zone.getBoundingClientRect();
            if (zoneRect.width === 0 || zoneRect.height === 0) return;

            let endX;
            // Stop BEFORE the card edge
            if (config.side === 'left') {
                // Card Left Edge minus space
                endX = (cardRect.left - containerRect.left) - spaceFromCard; 
            } else {
                // Card Right Edge plus space
                endX = (cardRect.right - containerRect.left) + spaceFromCard;
            }
            
            const endY = zoneRect.top + zoneRect.height / 2 - containerRect.top;
            validTargets.push({ x: endX, y: endY });
        });

        if (validTargets.length === 0) return;

        // 3. Bus Position
        // Move bus further out to accommodate the new space + arrow
        let busX;
        const gapFromCard = 50; // Increased to 50px so lines look balanced

        if (config.side === 'left') {
            busX = (cardRect.left - containerRect.left) - gapFromCard;
        } else {
            busX = (cardRect.right - containerRect.left) + gapFromCard;
        }

        // 4. Draw Main Feeder
        createLine(svg, startX, startY, busX, startY, config.color, annotationId);
        
        // 5. Draw Vertical Bus
        const targetYs = validTargets.map(t => t.y);
        const minY = Math.min(startY, ...targetYs);
        const maxY = Math.max(startY, ...targetYs);

        createLine(svg, busX, minY, busX, maxY, config.color, annotationId);

        // 6. Draw Horizontal Branches
        validTargets.forEach(target => {
            const arrowSize = 10; // MUST MATCH createArrowHead size
            const arrowDir = config.side === 'left' ? 'right' : 'left';
            
            let lineEndX;
            if (arrowDir === 'right') {
                 // Stop line behind the arrow head
                 lineEndX = target.x - arrowSize + 1;
            } else {
                 lineEndX = target.x + arrowSize - 1;
            }

            createLine(svg, busX, target.y, lineEndX, target.y, config.color, annotationId);
            createArrowHead(svg, target.x, target.y, arrowDir, config.color, annotationId);
        });
    });
}

function drawChamferedConnectorsSection3() {
    const svg = document.getElementById('connectorSvgSection3');
    const container = document.getElementById('explainerContainerSection3');
    const card = document.querySelector('.revision-card.active') || document.querySelector('.reco-card.active');
    
    if (!svg || !container || !card) return;

    svg.style.overflow = 'visible';
    svg.style.zIndex = '10'; 
    svg.style.pointerEvents = 'none'; 
    svg.innerHTML = '';
    
    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    
    // CONFIGURATION
    const chamfer = 15;      // Size of the 45-degree cut
    const spaceFromCard = 15; // Gap before arrow tip
    const gapFromCard = 50;   // Distance of the vertical bus from the card

    const connections = {
        's3-1': { side: 'left', color: 'orange', targets: ['s3-1a', 's3-1b', 's3-1c'] },
        's3-2': { side: 'left', color: 'red', targets: ['s3-2a', 's3-2b', 's3-2c'] },
        's3-3': { side: 'right', color: 'green', targets: ['s3-3a', 's3-3b'] },
        's3-4': { side: 'right', color: 'blue', targets: ['s3-4a', 's3-4b'] },
        's3-5': { side: 'left', color: 'purple', targets: ['s3-5'] },
        's3-6': { side: 'right', color: 'pink', targets: ['s3-6'] }
    };

    Object.entries(connections).forEach(([annotationId, config]) => {
        const annotation = document.querySelector(`.section3-annotations .annotation-item[data-target="${annotationId}"]`);
        if (!annotation) return;

        const annotationRect = annotation.getBoundingClientRect();
        
        // --- 1. START POINT (Annotation) ---
        let startX, startY;
        if (config.side === 'left') {
            startX = annotationRect.right - containerRect.left;
        } else {
            startX = annotationRect.left - containerRect.left;
        }
        startY = annotationRect.top + annotationRect.height / 2 - containerRect.top;

        createDot(svg, startX, startY, config.color, annotationId);

        // --- 2. GATHER TARGETS ---
        const validTargets = [];
        config.targets.forEach((targetNum) => {
            const zone = document.querySelector(`.highlight-zone[data-num="${targetNum}"]`);
            if (!zone) return;

            const historyContainer = zone.closest('#tabbed-history-section');
            if (historyContainer && !historyContainer.classList.contains('expanded')) return;

            const zoneRect = zone.getBoundingClientRect();
            if (zoneRect.width === 0 || zoneRect.height === 0) return;

            let endX;
            if (config.side === 'left') {
                endX = (cardRect.left - containerRect.left) - spaceFromCard; 
            } else {
                endX = (cardRect.right - containerRect.left) + spaceFromCard;
            }
            const endY = zoneRect.top + zoneRect.height / 2 - containerRect.top;
            
            validTargets.push({ x: endX, y: endY });
        });

        if (validTargets.length === 0) return;

        // --- 3. BUS POSITION (Vertical Spine) ---
        let busX;
        if (config.side === 'left') {
            busX = (cardRect.left - containerRect.left) - gapFromCard;
        } else {
            busX = (cardRect.right - containerRect.left) + gapFromCard;
        }

        // --- 4. DRAW FEEDER LINE (Annotation -> Bus) ---
        createLine(svg, startX, startY, busX, startY, config.color, annotationId);

        // --- 5. DRAW BRANCHES WITH 45-DEGREE CHAMFER ---
        const arrowDir = config.side === 'left' ? 'right' : 'left';
        const busDir = config.side === 'left' ? 1 : -1; 

        validTargets.forEach(target => {
            const arrowSize = 10;
            let lineEndX = (arrowDir === 'right') ? target.x - arrowSize + 1 : target.x + arrowSize - 1;

            // Draw Arrow Head at target
            createArrowHead(svg, target.x, target.y, arrowDir, config.color, annotationId);

            // CASE A: Straight Line
            if (Math.abs(target.y - startY) < 1) {
                createLine(svg, busX, target.y, lineEndX, target.y, config.color, annotationId);
                return;
            }

            // CASE B: Chamfered 45-degree Corner
            // We use a single <path> to ensure NO GAPS
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            let d = "";

            // 1. Start at intersection of Feeder and Bus
            d += `M ${busX} ${startY} `;

            // 2. Vertical Line along Bus
            if (target.y > startY) {
                // Going DOWN: Stop 'chamfer' pixels before target Y
                d += `L ${busX} ${target.y - chamfer} `;
            } else {
                // Going UP: Stop 'chamfer' pixels before target Y
                d += `L ${busX} ${target.y + chamfer} `;
            }

            // 3. Diagonal Chamfer (The 45-degree cut)
            // Draw line to (BusX +/- chamfer, TargetY)
            d += `L ${busX + (busDir * chamfer)} ${target.y} `;

            // 4. Horizontal Line to Target
            d += `L ${lineEndX} ${target.y}`;

            path.setAttribute('d', d);
            path.setAttribute('class', `connector-path ${config.color}`);
            path.setAttribute('data-num', annotationId);
            path.style.fill = 'none'; 
            svg.appendChild(path);
        });
    });
}

function drawRoundedConnectorsSection3() {
    const svg = document.getElementById('connectorSvgSection3');
    const container = document.getElementById('explainerContainerSection3');
    const card = document.querySelector('.revision-card.active') || document.querySelector('.reco-card.active');
    
    if (!svg || !container || !card) return;

    svg.style.overflow = 'visible';
    svg.style.zIndex = '10'; 
    svg.style.pointerEvents = 'none'; 
    svg.innerHTML = '';
    
    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    
    // CONFIG: Adjust these for tighter/looser curves
    const cornerRadius = 15; 
    const spaceFromCard = 15; // Gap before arrow tip
    const gapFromCard = 50;   // Distance of the vertical bus from the card

    const connections = {
        's3-1': { side: 'left', color: 'orange', targets: ['s3-1a', 's3-1b', 's3-1c'] },
        's3-2': { side: 'left', color: 'red', targets: ['s3-2a', 's3-2b', 's3-2c'] },
        's3-3': { side: 'right', color: 'green', targets: ['s3-3a', 's3-3b'] },
        's3-4': { side: 'right', color: 'blue', targets: ['s3-4a', 's3-4b'] },
        's3-5': { side: 'left', color: 'purple', targets: ['s3-5'] },
        's3-6': { side: 'right', color: 'pink', targets: ['s3-6'] }
    };

    Object.entries(connections).forEach(([annotationId, config]) => {
        const annotation = document.querySelector(`.section3-annotations .annotation-item[data-target="${annotationId}"]`);
        if (!annotation) return;

        const annotationRect = annotation.getBoundingClientRect();
        
        // --- 1. START POINT (Annotation) ---
        let startX, startY;
        if (config.side === 'left') {
            startX = annotationRect.right - containerRect.left;
        } else {
            startX = annotationRect.left - containerRect.left;
        }
        startY = annotationRect.top + annotationRect.height / 2 - containerRect.top;

        createDot(svg, startX, startY, config.color, annotationId);

        // --- 2. GATHER TARGETS ---
        const validTargets = [];
        config.targets.forEach((targetNum) => {
            const zone = document.querySelector(`.highlight-zone[data-num="${targetNum}"]`);
            if (!zone) return;

            // Handle hidden history logic
            const historyContainer = zone.closest('#tabbed-history-section');
            if (historyContainer && !historyContainer.classList.contains('expanded')) return;

            const zoneRect = zone.getBoundingClientRect();
            if (zoneRect.width === 0 || zoneRect.height === 0) return;

            let endX;
            if (config.side === 'left') {
                endX = (cardRect.left - containerRect.left) - spaceFromCard; 
            } else {
                endX = (cardRect.right - containerRect.left) + spaceFromCard;
            }
            const endY = zoneRect.top + zoneRect.height / 2 - containerRect.top;
            
            validTargets.push({ x: endX, y: endY });
        });

        if (validTargets.length === 0) return;

        // --- 3. BUS POSITION (Vertical Spine) ---
        let busX;
        if (config.side === 'left') {
            busX = (cardRect.left - containerRect.left) - gapFromCard;
        } else {
            busX = (cardRect.right - containerRect.left) + gapFromCard;
        }

        // --- 4. DRAW FEEDER LINE (Annotation -> Bus) ---
        // This is always a straight line to the vertical bus
        createLine(svg, startX, startY, busX, startY, config.color, annotationId);

        // --- 5. DRAW BRANCHES WITH ROUNDED CORNERS ---
        const arrowDir = config.side === 'left' ? 'right' : 'left';
        const busDir = config.side === 'left' ? 1 : -1; // 1 for rightward curve, -1 for leftward

        validTargets.forEach(target => {
            const arrowSize = 10;
            let lineEndX = (arrowDir === 'right') ? target.x - arrowSize + 1 : target.x + arrowSize - 1;

            // Draw Arrow Head at target
            createArrowHead(svg, target.x, target.y, arrowDir, config.color, annotationId);

            // CASE A: Straight Line (Target is perfectly aligned with Start)
            // We use a small tolerance (1px)
            if (Math.abs(target.y - startY) < 1) {
                createLine(svg, busX, target.y, lineEndX, target.y, config.color, annotationId);
                return;
            }

            // CASE B: Rounded Corner
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            let d = "";

            // 1. Move to Bus Start (at intersection with Feeder)
            d += `M ${busX} ${startY} `;

            // 2. Vertical Line along Bus
            // We draw vertically until we are 'cornerRadius' away from the target height
            if (target.y > startY) {
                // Going DOWN
                d += `L ${busX} ${target.y - cornerRadius} `;
                // Curve DOWN-to-HORIZONTAL
                d += `Q ${busX} ${target.y} ${busX + (busDir * cornerRadius)} ${target.y} `;
            } else {
                // Going UP
                d += `L ${busX} ${target.y + cornerRadius} `;
                // Curve UP-to-HORIZONTAL
                d += `Q ${busX} ${target.y} ${busX + (busDir * cornerRadius)} ${target.y} `;
            }

            // 3. Horizontal Line to Target
            d += `L ${lineEndX} ${target.y}`;

            path.setAttribute('d', d);
            path.setAttribute('class', `connector-path ${config.color}`);
            path.setAttribute('data-num', annotationId);
            path.style.fill = 'none'; // Crucial for paths
            svg.appendChild(path);
        });
    });
}

// Helper to create SVG Line
function createLine(svg, x1, y1, x2, y2, color, id) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${x1} ${y1} L ${x2} ${y2}`);
    path.setAttribute('class', `connector-path ${color}`);
    path.setAttribute('data-num', id);
    svg.appendChild(path);
}

// Helper to create SVG Dot
function createDot(svg, cx, cy, color, id, r = 3) {
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', cx);
    dot.setAttribute('cy', cy);
    dot.setAttribute('r', r);
    dot.setAttribute('class', `connector-path ${color}`);
    dot.setAttribute('data-num', id);
    svg.appendChild(dot);
}

// Helper to create SVG Arrowhead
function createArrowHead(svg, x, y, direction, color, id) {
    const size = 10; 
    let pathData;

    if (direction === 'right') {
        pathData = `M ${x} ${y} L ${x - size} ${y - size / 1.5} L ${x - size} ${y + size / 1.5} Z`;
    } else {
        pathData = `M ${x} ${y} L ${x + size} ${y - size / 1.5} L ${x + size} ${y + size / 1.5} Z`;
    }

    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    arrow.setAttribute('d', pathData);
    
    // We add the 'arrow-head' class so we can style it in CSS
    arrow.setAttribute('class', `connector-path arrow-head ${color}`);
    arrow.setAttribute('data-num', id);
    
    // REMOVED: The lines that forced arrow.style.fill
    // REMOVED: The themeColors object
    
    svg.appendChild(arrow);
}

function initSection3Explainer() {
    if (window.innerWidth > 991) {
        const revisedTab = document.getElementById('revised-tab');
        if (revisedTab && revisedTab.classList.contains('active')) {
            setTimeout(() => {
                // drawConnectorsSection3(); // <--- OLD CURVED VERSION (Commented out)
                // drawOrthogonalConnectorsSection3(); // <--- NEW BRACKET VERSION
                drawChamferedConnectorsSection3(); // <--- NEW ChamferedVERSION
                // drawRoundedConnectorsSection3();      // <--- NEW rounded curve version
                setupSection3Hover();
            }, 100);
        }
    }
}

function setupSection3Hover() {
    const annotations = document.querySelectorAll('.section3-annotations .annotation-item');
    const zones = document.querySelectorAll('.highlight-zone[data-num^="s3-"]');

    annotations.forEach(item => {
        item.addEventListener('mouseenter', handleSection3HoverStart);
        item.addEventListener('mouseleave', handleSection3HoverEnd);
    });
    zones.forEach(zone => {
        zone.addEventListener('mouseenter', handleSection3ZoneHoverStart);
        zone.addEventListener('mouseleave', handleSection3HoverEnd);
    });
}

function handleSection3HoverStart(e) {
    if (window.innerWidth <= 991) return;
    const annotationId = e.currentTarget.dataset.target;
    if (!annotationId) return;

    document.querySelectorAll('.section3-annotations .annotation-item').forEach(el => el.classList.add('faded'));
    document.querySelectorAll('.highlight-zone[data-num^="s3-"]').forEach(el => el.classList.add('faded'));
    document.querySelectorAll('#connectorSvgSection3 .connector-path').forEach(el => el.classList.add('faded'));

    e.currentTarget.classList.remove('faded');
    e.currentTarget.classList.add('highlighted');

    const connectionMap = {
        's3-1': ['s3-1a', 's3-1b', 's3-1c'],
        's3-2': ['s3-2a', 's3-2b', 's3-2c'],
        's3-3': ['s3-3a', 's3-3b'],
        's3-4': ['s3-4a', 's3-4b'],
        's3-5': ['s3-5'],
        's3-6': ['s3-6']
    };

    const targets = connectionMap[annotationId] || [];
    targets.forEach(targetNum => {
        const zone = document.querySelector(`.highlight-zone[data-num="${targetNum}"]`);
        if (zone) {
            zone.classList.remove('faded');
            zone.classList.add('highlighted');
        }
    });

    document.querySelectorAll(`#connectorSvgSection3 .connector-path[data-num="${annotationId}"]`).forEach(path => {
        path.classList.remove('faded');
        path.classList.add('highlighted');
    });
}

function handleSection3ZoneHoverStart(e) {
    if (window.innerWidth <= 991) return;
    const zoneNum = e.currentTarget.dataset.num;
    if (!zoneNum) return;

    const reverseMap = {
        's3-1a': 's3-1', 's3-1b': 's3-1', 's3-1c': 's3-1',
        's3-2a': 's3-2', 's3-2b': 's3-2', 's3-2c': 's3-2',
        's3-3a': 's3-3', 's3-3b': 's3-3',
        's3-4a': 's3-4', 's3-4b': 's3-4',
        's3-5': 's3-5',
        's3-6': 's3-6'
    };
    const annotationId = reverseMap[zoneNum];
    if (!annotationId) return;

    const annotation = document.querySelector(`.section3-annotations .annotation-item[data-target="${annotationId}"]`);
    if (annotation) {
        handleSection3HoverStart({ currentTarget: annotation });
    }
}

function handleSection3HoverEnd() {
    if (window.innerWidth <= 991) return;
    document.querySelectorAll('.section3-annotations .annotation-item, .highlight-zone[data-num^="s3-"], #connectorSvgSection3 .connector-path').forEach(el => {
        el.classList.remove('highlighted', 'faded');
    });
}

// Global Resize handler for Section 3
window.addEventListener('resize', debounce(function() {
    const svg = document.getElementById('connectorSvgSection3');
    if (svg) svg.innerHTML = '';
    
    document.querySelectorAll('.section3-annotations .annotation-item, .highlight-zone[data-num^="s3-"], #connectorSvgSection3 .connector-path').forEach(el => {
        el.classList.remove('highlighted', 'faded');
    });
    
    if (window.innerWidth > 991) {
        const revisedTab = document.getElementById('revised-tab');
        if (revisedTab && revisedTab.classList.contains('active')) {
            // drawConnectorsSection3(); // <--- OLD CURVED VERSION (Commented out)
            // drawOrthogonalConnectorsSection3(); // <--- NEW BRACKET VERSION
            drawChamferedConnectorsSection3(); // <--- NEW ChamferedVERSION
            // drawRoundedConnectorsSection3();      // <--- NEW rounded curve version
            setupSection3Hover();
        }
    }
}, 150));

// =====================================================
// DUPLICATE SECTION LOGIC (ALL FUNCTIONS CONSOLIDATED)
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Duplicate Section (Revised Tab is default active here)
    setTimeout(() => {
        if(document.getElementById('connectorSvgSection3_2')) {
            drawChamferedConnectorsSection3_Duplicate();
            setupSection3Hover_Duplicate();
        }
    }, 500);
});

// 2. Window Resize Handler for Duplicate Section
window.addEventListener('resize', debounce(function() {
    // Redraw whichever tab is active in the duplicate section
    const activeTab = document.querySelector('#duplicate-reco-section .tab-content.active');
    if (activeTab && activeTab.id === 'active-2-tab') {
        drawConnectorsSection2_Duplicate();
    } else if (activeTab && activeTab.id === 'revised-2-tab') {
        drawChamferedConnectorsSection3_Duplicate();
    }
}, 150));


// -----------------------------------------------------
// A. ACTIVE TAB LOGIC (Duplicate Section)
// -----------------------------------------------------
function drawConnectorsSection2_Duplicate() {
    const svg = document.getElementById('connectorSvgSection2_2');
    const container = document.getElementById('explainerContainerSection2_2');
    if (!svg || !container) return;

    svg.innerHTML = '';
    const containerRect = container.getBoundingClientRect();
    
    // Mapping for Active Tab (Duplicate)
    const connections = { 's2-1_2': ['left', 'orange'], 's2-2_2': ['right', 'blue'] };

    Object.entries(connections).forEach(([num, [side, color]]) => {
        const annotation = document.querySelector(`.section2-annotations-2 .annotation-item[data-target="${num}"]`);
        const zone = document.querySelector(`.highlight-zone[data-num="${num}"]`);
        if (!annotation || !zone) return;

        const annotationRect = annotation.getBoundingClientRect();
        const zoneRect = zone.getBoundingClientRect();
        let startX, startY, endX, endY;

        if (side === 'left') {
            startX = annotationRect.right - containerRect.left;
            startY = annotationRect.top + annotationRect.height / 2 - containerRect.top;
            endX = zoneRect.left - containerRect.left;
            endY = zoneRect.top + zoneRect.height / 2 - containerRect.top;
        } else {
            startX = annotationRect.left - containerRect.left;
            startY = annotationRect.top + annotationRect.height / 2 - containerRect.top;
            endX = zoneRect.right - containerRect.left;
            endY = zoneRect.top + zoneRect.height / 2 - containerRect.top;
        }

        // Hanging Thread Style (Matches Original Section 2)
        const midX = (startX + endX) / 2;
        const distance = Math.abs(endX - startX);
        const slack = Math.min(30, distance * 0.15);
        const controlY = (startY + endY) / 2 + slack;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${startX} ${startY} Q ${midX} ${controlY} ${endX} ${endY}`);
        path.setAttribute('class', `connector-path ${color}`);
        path.setAttribute('data-num', num);
        svg.appendChild(path);

        [ {x: startX, y: startY}, {x: endX, y: endY} ].forEach(pt => {
            const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y); dot.setAttribute('r', 3);
            dot.setAttribute('class', `connector-path ${color}`);
            svg.appendChild(dot);
        });
    });
}


// -----------------------------------------------------
// B. REVISED TAB LOGIC (Duplicate Section)
// -----------------------------------------------------
function drawChamferedConnectorsSection3_Duplicate() {
    const svg = document.getElementById('connectorSvgSection3_2');
    const container = document.getElementById('explainerContainerSection3_2');
    const card = container ? container.querySelector('.revision-card.active') : null;
    
    if (!svg || !container || !card) return;

    svg.style.overflow = 'visible';
    svg.style.zIndex = '10'; 
    svg.innerHTML = '';
    
    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const chamfer = 15;      
    const spaceFromCard = 15; 
    const gapFromCard = 50;   

    // FIXED: Added all targets (a, b, c) so history lines appear
    const connections = {
        's3-1_2': { side: 'left', color: 'orange', targets: ['s3-1a_2', 's3-1b_2', 's3-1c_2'] },
        's3-2_2': { side: 'left', color: 'red', targets: ['s3-2a_2', 's3-2b_2', 's3-2c_2'] },
        's3-3_2': { side: 'right', color: 'green', targets: ['s3-3a_2', 's3-3b_2'] },
        's3-4_2': { side: 'right', color: 'blue', targets: ['s3-4a_2', 's3-4b_2'] },
        's3-5_2': { side: 'left', color: 'purple', targets: ['s3-5_2'] },
        's3-6_2': { side: 'right', color: 'pink', targets: ['s3-6_2'] }
    };

    Object.entries(connections).forEach(([annotationId, config]) => {
        const annotation = document.querySelector(`.section3-annotations-2 .annotation-item[data-target="${annotationId}"]`);
        if (!annotation) return;

        const annotationRect = annotation.getBoundingClientRect();
        
        let startX, startY;
        if (config.side === 'left') {
            startX = annotationRect.right - containerRect.left;
        } else {
            startX = annotationRect.left - containerRect.left;
        }
        startY = annotationRect.top + annotationRect.height / 2 - containerRect.top;

        // Start Dot
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', startX); dot.setAttribute('cy', startY); dot.setAttribute('r', 3);
        dot.setAttribute('class', `connector-path ${config.color}`);
        svg.appendChild(dot);

        // Gather Targets
        const validTargets = [];
        config.targets.forEach((targetNum) => {
            const zone = document.querySelector(`.highlight-zone[data-num="${targetNum}"]`);
            if (!zone) return;
            
            // Check if inside hidden history
            const historyContainer = zone.closest('.revision-history-section');
            if (historyContainer && !historyContainer.classList.contains('expanded')) return;
            
            const zoneRect = zone.getBoundingClientRect();
            if (zoneRect.width === 0 || zoneRect.height === 0) return;

            let endX;
            if (config.side === 'left') endX = (cardRect.left - containerRect.left) - spaceFromCard; 
            else endX = (cardRect.right - containerRect.left) + spaceFromCard;
            
            validTargets.push({ x: endX, y: zoneRect.top + zoneRect.height / 2 - containerRect.top });
        });

        if (validTargets.length === 0) return;

        // Bus Position
        let busX;
        if (config.side === 'left') busX = (cardRect.left - containerRect.left) - gapFromCard;
        else busX = (cardRect.right - containerRect.left) + gapFromCard;

        // Draw Feeder (Annotation -> Bus)
        const feeder = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        feeder.setAttribute('d', `M ${startX} ${startY} L ${busX} ${startY}`);
        feeder.setAttribute('class', `connector-path ${config.color}`);
        feeder.setAttribute('data-num', annotationId);
        svg.appendChild(feeder);

        const arrowDir = config.side === 'left' ? 'right' : 'left';
        const busDir = config.side === 'left' ? 1 : -1; 

        validTargets.forEach(target => {
            const arrowSize = 10;
            let lineEndX = (arrowDir === 'right') ? target.x - arrowSize + 1 : target.x + arrowSize - 1;

            // Draw Arrow
            const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const dArrow = arrowDir === 'right' 
                ? `M ${target.x} ${target.y} L ${target.x - 10} ${target.y - 6} L ${target.x - 10} ${target.y + 6} Z`
                : `M ${target.x} ${target.y} L ${target.x + 10} ${target.y - 6} L ${target.x + 10} ${target.y + 6} Z`;
            arrow.setAttribute('d', dArrow);
            arrow.setAttribute('class', `connector-path arrow-head ${config.color}`);
            arrow.setAttribute('data-num', annotationId);
            svg.appendChild(arrow);

            // Draw Chamfered Path (No Gap Logic)
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            let d = "";
            
            if (Math.abs(target.y - startY) < 1) {
                d = `M ${busX} ${target.y} L ${lineEndX} ${target.y}`;
            } else {
                d += `M ${busX} ${startY} `; 
                if (target.y > startY) { d += `L ${busX} ${target.y - chamfer} `; } 
                else { d += `L ${busX} ${target.y + chamfer} `; }
                
                d += `L ${busX + (busDir * chamfer)} ${target.y} `;
                d += `L ${lineEndX} ${target.y}`;
            }
            path.setAttribute('d', d);
            path.setAttribute('class', `connector-path ${config.color}`);
            path.setAttribute('data-num', annotationId);
            path.style.fill = 'none'; 
            svg.appendChild(path);
        });
    });
}


// -----------------------------------------------------
// C. INTERACTIONS (History & Hover)
// -----------------------------------------------------

function toggleTabbedHistory_Duplicate() {
    const section = document.getElementById("tabbed-history-section-2");
    const text = document.getElementById("tabbed-history-text-2");
    const icon = document.getElementById("tabbed-history-icon-2");
    const btn = document.getElementById("tabbed-history-btn-2");

    if (section.classList.contains("expanded")) {
        section.classList.remove("expanded");
        text.textContent = "View History";
        icon.classList.remove("bi-chevron-up");
        icon.classList.add("bi-chevron-down");
        btn.classList.remove("expanded");
    } else {
        section.classList.add("expanded");
        text.textContent = "Hide History";
        icon.classList.remove("bi-chevron-down");
        icon.classList.add("bi-chevron-up");
        btn.classList.add("expanded");
    }
    // Redraw connectors after animation (so lines reach the new history items)
    setTimeout(drawChamferedConnectorsSection3_Duplicate, 350); 
}

function switchToRevisedTab_Duplicate() {
    // Finds the button in the duplicate section that opens the revised tab
    const btn = document.querySelector('#duplicate-reco-section .tab-btn[data-tab="revised-2"]');
    if(btn) btn.click();
}

function setupSection3Hover_Duplicate() {
    // Targeted selectors for Duplicate Section
    const annotations = document.querySelectorAll('.section3-annotations-2 .annotation-item');
    const zones = document.querySelectorAll('.highlight-zone[data-num*="_2"]'); 

    annotations.forEach(item => {
        item.addEventListener('mouseenter', handleDuplicateHoverStart);
        item.addEventListener('mouseleave', handleDuplicateHoverEnd);
    });
    zones.forEach(zone => {
        zone.addEventListener('mouseenter', handleDuplicateHoverStart);
        zone.addEventListener('mouseleave', handleDuplicateHoverEnd);
    });
    
    // Also setup Section 2 (Active Tab) hover
    const annotations2 = document.querySelectorAll('.section2-annotations-2 .annotation-item');
    annotations2.forEach(item => {
        item.addEventListener('mouseenter', handleDuplicateHoverStart);
        item.addEventListener('mouseleave', handleDuplicateHoverEnd);
    });
}

function handleDuplicateHoverStart(e) {
    if (window.innerWidth <= 991) return;
    
    // Get the ID of the element being hovered (Annotation or Zone)
    let id = e.currentTarget.dataset.target || e.currentTarget.dataset.num;
    if(!id) return;
    
    // 1. Clean up ID if hovering a sub-zone (e.g. s3-1a_2 becomes s3-1_2)
    // This allows reverse-highlighting (Zone -> Annotation)
    if(id.includes('a_2') || id.includes('b_2') || id.includes('c_2')) {
        id = id.replace(/[abc]_2/, '_2');
    }

    // 2. Define the Mapping for the Duplicate Section
    // This tells the code exactly which boxes belong to which group
    const connectionMap = {
        's3-1_2': ['s3-1a_2', 's3-1b_2', 's3-1c_2'],
        's3-2_2': ['s3-2a_2', 's3-2b_2', 's3-2c_2'],
        's3-3_2': ['s3-3a_2', 's3-3b_2'],
        's3-4_2': ['s3-4a_2', 's3-4b_2'],
        's3-5_2': ['s3-5_2'],
        's3-6_2': ['s3-6_2']
    };

    // 3. FADE EVERYTHING in the duplicate section
    const section = document.getElementById('duplicate-reco-section');
    section.querySelectorAll('.annotation-item, .highlight-zone, .connector-path').forEach(el => el.classList.add('faded'));

    // 4. HIGHLIGHT THE ANNOTATION (Left/Right Text)
    const annotation = section.querySelector(`.annotation-item[data-target="${id}"]`);
    if(annotation) { 
        annotation.classList.remove('faded'); 
        annotation.classList.add('highlighted'); 
    }

    // 5. HIGHLIGHT THE TARGET ZONES (Using the Map)
    const targets = connectionMap[id] || [];
    targets.forEach(targetId => {
        const zone = section.querySelector(`.highlight-zone[data-num="${targetId}"]`);
        if(zone) {
            zone.classList.remove('faded');
            zone.classList.add('highlighted');
        }
    });

    // 6. HIGHLIGHT THE LINES
    section.querySelectorAll(`.connector-path[data-num="${id}"]`).forEach(path => { 
        path.classList.remove('faded'); 
        path.classList.add('highlighted'); 
    });
}

function handleDuplicateHoverEnd() {
    const section = document.getElementById('duplicate-reco-section');
    section.querySelectorAll('.highlighted, .faded').forEach(el => {
        el.classList.remove('highlighted', 'faded');
    });
}

// Function for Exact Replica Cards Toggle
function toggleExactDetails(btn) {
    // Find the next sibling that is the details container
    const detailsDiv = btn.nextElementSibling;
    const icon = btn.querySelector('i');
    
    if (detailsDiv.classList.contains('expanded')) {
        // Collapse
        detailsDiv.classList.remove('expanded');
        btn.innerHTML = 'Show More <i class="bi bi-chevron-down"></i>';
    } else {
        // Expand
        detailsDiv.classList.add('expanded');
        btn.innerHTML = 'Show Less <i class="bi bi-chevron-up"></i>';
    }
}

// =====================================================
// FINAL OUTCOMES: PERSISTENT LINES & 3-WAY SYNC
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
    initFinalOutcomes();
});

// Re-draw lines on resize to keep positions accurate
window.addEventListener('resize', () => {
    setTimeout(updateAllConnectors, 100);
});

function initFinalOutcomes() {
    const section = document.getElementById('triLinkSection');
    if (!section) return;

    // 1. Initial Draw of Faint Lines
    setTimeout(updateAllConnectors, 500); // Small delay to ensure layout is settled

    // 2. Attach Listeners
    const triggers = section.querySelectorAll('.highlight-zone, .highlight-zone-inline, .annotation-item');
    triggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', handleFinalHover);
        trigger.addEventListener('mouseleave', handleFinalLeave);
    });
}

function toggleMirroredDetails(btn) {
    const allDetailDivs = document.querySelectorAll('.exact-details');
    const allButtons = document.querySelectorAll('.show-more-btn');
    const centerWrapper = document.getElementById('centerCollapsible');
    
    const isExpanding = !allDetailDivs[0].classList.contains('expanded');

    allDetailDivs.forEach(div => isExpanding ? div.classList.add('expanded') : div.classList.remove('expanded'));
    
    if(centerWrapper) {
        isExpanding ? centerWrapper.classList.add('expanded') : centerWrapper.classList.remove('expanded');
    }

    allButtons.forEach(b => b.innerHTML = isExpanding ? 'Show Less <i class="bi bi-chevron-up"></i>' : 'Show More <i class="bi bi-chevron-down"></i>');
    
    // REDRAW ALL LINES after the animation finishes
    setTimeout(updateAllConnectors, 400); 
}

// --- NEW LOGIC: Just Toggle Classes, Don't Redraw ---
function handleFinalHover(e) {
    const section = document.getElementById('triLinkSection');
    const id = e.currentTarget.getAttribute('data-num') || e.currentTarget.getAttribute('data-target');
    
    if (!id || !section) return;

    section.classList.add('has-interaction');

    // 1. Fade UI Elements
    const allElements = section.querySelectorAll('.highlight-zone, .highlight-zone-inline, .annotation-item');
    allElements.forEach(el => el.classList.add('faded'));

    // 2. Highlight Matching UI Elements
    const matches = section.querySelectorAll(`[data-num="${id}"], [data-target="${id}"]`);
    matches.forEach(el => {
        el.classList.remove('faded');
        el.classList.add('highlighted');
    });

    // 3. Highlight Matching SVG Lines (Find by data-num)
    const svgLines = document.querySelectorAll(`#dualConnectorSvg .dual-connector[data-num="${id}"], #dualConnectorSvg .arrow-head[data-num="${id}"]`);
    svgLines.forEach(line => line.classList.add('highlighted'));
}

function handleFinalLeave() {
    const section = document.getElementById('triLinkSection');
    if (section) {
        section.classList.remove('has-interaction');
        
        // Reset UI Elements
        section.querySelectorAll('.faded, .highlighted').forEach(el => {
            el.classList.remove('faded', 'highlighted');
        });

        // Reset SVG Lines (Remove highlight class)
        const svgLines = document.querySelectorAll('#dualConnectorSvg .highlighted');
        svgLines.forEach(line => line.classList.remove('highlighted'));
    }
}

// --- CORE FUNCTION: Draws ALL Visible Lines at Once ---
function updateAllConnectors() {
    const svg = document.getElementById('dualConnectorSvg');
    const section = document.getElementById('triLinkSection');
    if (!svg || !section) return;

    svg.innerHTML = ''; // Clear canvas
    const svgRect = svg.getBoundingClientRect();

    // Loop through EVERY center annotation card
    const centerItems = section.querySelectorAll('.annotation-item[data-target]');

    centerItems.forEach(targetAnno => {
        const id = targetAnno.getAttribute('data-target');
        
        // 1. COLLAPSIBLE CHECK: Skip if this card is hidden
        const centerWrapper = targetAnno.closest('.center-collapsible-wrapper');
        if (centerWrapper && !centerWrapper.classList.contains('expanded')) return;

        const annoRect = targetAnno.getBoundingClientRect();
        const centerY = (annoRect.top + annoRect.height / 2) - svgRect.top;

        // 2. Find matching zones in Side Cards
        const activeZones = section.querySelectorAll(`[data-num="${id}"].highlight-zone, [data-num="${id}"].highlight-zone-inline`);

        activeZones.forEach(zone => {
            // Check if Side Card row is visible
            const detailsWrapper = zone.closest('.exact-details');
            if (detailsWrapper && !detailsWrapper.classList.contains('expanded')) return;

            const zoneRect = zone.getBoundingClientRect();
            const startY = (zoneRect.top + zoneRect.height / 2) - svgRect.top;
            let startX, endX, busX, lineColor, arrowDir, busDir;

            if (zoneRect.left < annoRect.left) {
                // PROFIT (Left)
                startX = zoneRect.right - svgRect.left;
                endX = annoRect.left - svgRect.left;
                busX = startX + 25; 
                lineColor = 'line-profit';
                arrowDir = 'right';
                busDir = 1; 
            } else {
                // LOSS (Right)
                startX = zoneRect.left - svgRect.left;
                endX = annoRect.right - svgRect.left;
                busX = startX - 25;
                lineColor = 'line-loss';
                arrowDir = 'left'; 
                busDir = -1;
            }

            // Draw Arrow
            const arrowTipX = endX;
            const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const dArrow = (arrowDir === 'right') 
                ? `M ${arrowTipX} ${centerY} L ${arrowTipX - 10} ${centerY - 6} L ${arrowTipX - 10} ${centerY + 6} Z`
                : `M ${arrowTipX} ${centerY} L ${arrowTipX + 10} ${centerY - 6} L ${arrowTipX + 10} ${centerY + 6} Z`;
            
            arrowPath.setAttribute('d', dArrow);
            arrowPath.setAttribute('class', `arrow-head ${lineColor}`); // No 'connector-path' class needed for arrow
            arrowPath.setAttribute('data-num', id); // Important for highlighting
            svg.appendChild(arrowPath);

            // Draw Chamfered Line
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            let d = "";
            const chamfer = 15;
            const lineEndX = (arrowDir === 'right') ? arrowTipX - 10 : arrowTipX + 10;

            d += `M ${startX} ${startY} `;
            d += `L ${busX} ${startY} `;

            if (Math.abs(centerY - startY) > chamfer) {
                if (centerY > startY) d += `L ${busX} ${centerY - chamfer} `;
                else d += `L ${busX} ${centerY + chamfer} `;
                d += `L ${busX + (busDir * chamfer)} ${centerY} `;
            } else {
                d += `L ${busX} ${centerY} `;
            }

            d += `L ${lineEndX} ${centerY}`;

            path.setAttribute('d', d);
            path.setAttribute('class', `dual-connector ${lineColor}`);
            path.setAttribute('data-num', id); // Important for highlighting
            svg.appendChild(path);
        });
    });
}