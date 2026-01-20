// =====================================================
// THE MEWA - MAIN JAVASCRIPT
// Fully Responsive with Mobile Menu Support
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initNavbarScroll();
  initDropdownMenus();
  initBackToTop();
  initActivePageHighlight();
  initScrollAnimations();
  initCounterAnimations();
  initSmoothScroll();
  activateBenefitsShowcase();
  initFAQAccordion();
  initServiceTabs();
  initContactForm();
  initSection2Explainer();
  
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

  mobileMenuToggle.addEventListener("click", () => {
    mobileMenuToggle.classList.toggle("active");
    mobileNavMenu.classList.toggle("active");
    if (mobileNavMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  mobileDropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault(); 
      const container = toggle.closest('.mobile-nav-dropdown');
      const dropdownMenu = container.querySelector('.mobile-dropdown-menu');
      if (dropdownMenu) {
        toggle.classList.toggle("active");
        dropdownMenu.classList.toggle("active");
      }
    });
  });

  const mobileNavLinks = mobileNavMenu.querySelectorAll("a");
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuToggle.classList.remove("active");
      mobileNavMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  document.addEventListener("click", (e) => {
    if (!mobileNavMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      mobileMenuToggle.classList.remove("active");
      mobileNavMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

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

function activateBenefitsShowcase() { }


// =====================================================
// 3. PAGE SPECIFIC MODULES
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
  const recoTabButtons = document.querySelectorAll(".tab-btn");
  if (recoTabButtons.length > 0) {
      recoTabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
          document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
          document.querySelectorAll(".reco-tab-content").forEach(c => c.classList.remove("active"));
          btn.classList.add("active");
          const tab = btn.dataset.tab;
          const mainContent = document.getElementById(`${tab}-tab`);
          if (mainContent) mainContent.classList.add("active");
          if (tab === "active") {
            const inner = document.getElementById("tab-active-reco");
            if(inner) inner.classList.add("active");
          } else if (tab === "revised") {
            const inner = document.getElementById("tab-revised-reco");
            if(inner) inner.classList.add("active");
            initSection3Explainer();
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

// Helper to calculate CSS scale
function getContainerScale(container) {
    if (!container || !container.offsetWidth) return 1;
    const rect = container.getBoundingClientRect();
    // width includes padding/border, offsetWidth includes same.
    // Floating point precision can cause tiny diffs, but this ratio captures CSS scale.
    return rect.width / container.offsetWidth;
}

// =====================================================
// 4. INTERACTIVE EXPLAINER CARD (OUR APP PAGE)
// =====================================================

(function() {
    'use strict';
    const isDesktop = () => window.innerWidth > 991;
    let activeZone = null;
    
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
    
    function drawConnectors() {
        const svg = document.getElementById('connectorSvg');
        const container = document.getElementById('explainerContainer');
        if (!svg || !container) return;
        svg.innerHTML = '';
        
        // --- FIX: DETECT SCALE ---
        const scale = getContainerScale(container);
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
            // --- FIX: APPLY SCALE CORRECTION TO COORDINATES ---
            if (side === 'left') {
                startX = (annotationRect.right - containerRect.left) / scale;
                startY = (annotationRect.top + annotationRect.height / 2 - containerRect.top) / scale;
                endX = (zoneRect.left - containerRect.left) / scale;
                endY = (zoneRect.top + zoneRect.height / 2 - containerRect.top) / scale;
            } else {
                startX = (annotationRect.left - containerRect.left) / scale;
                startY = (annotationRect.top + annotationRect.height / 2 - containerRect.top) / scale;
                endX = (zoneRect.right - containerRect.left) / scale;
                endY = (zoneRect.top + zoneRect.height / 2 - containerRect.top) / scale;
            }

            const midX = (startX + endX) / 2;
            const distance = Math.abs(endX - startX);
            const slack = Math.min(50, distance * 0.15); 
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
        
        document.querySelectorAll('.annotation-item').forEach(el => el.classList.add('faded'));
        document.querySelectorAll('.highlight-zone[data-num]').forEach(el => el.classList.add('faded'));
        document.querySelectorAll('.connector-path').forEach(el => el.classList.add('faded'));
        
        if (annotation) { annotation.classList.remove('faded'); annotation.classList.add('highlighted'); }
        if (zone) { zone.classList.remove('faded'); zone.classList.add('highlighted'); }
        if (path) { path.classList.remove('faded'); path.classList.add('highlighted'); }
    }
    
    function handleHoverEnd() {
        if (!isDesktop()) return;
        document.querySelectorAll('.annotation-item, .highlight-zone, .connector-path').forEach(el => {
            el.classList.remove('highlighted', 'faded');
        });
    }
    
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
        if (activeZone === zone) {
            closeExplanation(zone, explanation);
            activeZone = null;
            return;
        }
        if (activeZone) {
            const prevExplanation = activeZone.querySelector('.mobile-explanation');
            closeExplanation(activeZone, prevExplanation);
        }
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
    
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
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
  const revisedTabBtn = document.querySelector('.tab-btn[data-tab="revised"]');
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((btn) => btn.classList.remove("active"));
  tabContents.forEach((content) => content.classList.remove("active"));
  document.querySelectorAll(".reco-tab-content").forEach(c => c.classList.remove("active"));

  if (revisedTabBtn) revisedTabBtn.classList.add("active");

  const revisedContent = document.getElementById("revised-tab");
  if (revisedContent) revisedContent.classList.add("active");

  const innerRevisedContent = document.getElementById("tab-revised-reco");
  if (innerRevisedContent) innerRevisedContent.classList.add("active");

  const section = document.querySelector(".tabbed-reco-section");
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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
    if (typeof drawConnectorsSection3 === 'function') {
      drawConnectorsSection3();
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
    
    // --- FIX: DETECT SCALE ---
    const scale = getContainerScale(container);
    const containerRect = container.getBoundingClientRect();
    
    const connections = { 's2-1': ['left', 'orange'], 's2-2': ['right', 'blue'] };

    Object.entries(connections).forEach(([num, [side, color]]) => {
        const annotation = document.querySelector(`.section2-annotations .annotation-item[data-target="${num}"]`);
        const zone = document.querySelector(`.highlight-zone[data-num="${num}"]`);
        if (!annotation || !zone) return;
        const annotationRect = annotation.getBoundingClientRect();
        const zoneRect = zone.getBoundingClientRect();
        let startX, startY, endX, endY;

        // --- FIX: APPLY SCALE CORRECTION ---
        if (side === 'left') {
            startX = (annotationRect.right - containerRect.left) / scale;
            startY = (annotationRect.top + annotationRect.height / 2 - containerRect.top) / scale;
            endX = (zoneRect.left - containerRect.left) / scale;
            endY = (zoneRect.top + zoneRect.height / 2 - containerRect.top) / scale;
        } else {
            startX = (annotationRect.left - containerRect.left) / scale;
            startY = (annotationRect.top + annotationRect.height / 2 - containerRect.top) / scale;
            endX = (zoneRect.right - containerRect.left) / scale;
            endY = (zoneRect.top + zoneRect.height / 2 - containerRect.top) / scale;
        }

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
    svg.style.zIndex = '10';
    svg.innerHTML = '';
    
    // --- FIX: DETECT SCALE ---
    const scale = getContainerScale(container);
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
        // --- FIX: APPLY SCALE CORRECTION ---
        if (config.side === 'left') {
            startX = (annotationRect.right - containerRect.left) / scale;
        } else {
            startX = (annotationRect.left - containerRect.left) / scale;
        }
        startY = (annotationRect.top + annotationRect.height / 2 - containerRect.top) / scale;

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
                endX = (zoneRect.left - containerRect.left) / scale;
            } else {
                endX = (zoneRect.right - containerRect.left) / scale;
            }
            endY = (zoneRect.top + zoneRect.height / 2 - containerRect.top) / scale;

            const midX = (startX + endX) / 2;
            const distance = Math.abs(endX - startX);
            const slack = Math.min(30, distance * 0.15);
            const controlY = (startY + endY) / 2 + slack;

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', `M ${startX} ${startY} Q ${midX} ${controlY} ${endX} ${endY}`);
            path.setAttribute('class', `connector-path ${config.color}`);
            path.setAttribute('data-num', annotationId);
            svg.appendChild(path);

            const dotEnd = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dotEnd.setAttribute('cx', endX); dotEnd.setAttribute('cy', endY);
            dotEnd.setAttribute('r', 3);
            dotEnd.setAttribute('class', `connector-path ${config.color}`);
            dotEnd.setAttribute('data-num', annotationId);
            svg.appendChild(dotEnd);
        });
    });
}

function initSection3Explainer() {
    if (window.innerWidth > 991) {
        const revisedTab = document.getElementById('revised-tab');
        if (revisedTab && revisedTab.classList.contains('active')) {
            setTimeout(() => {
                drawConnectorsSection3();
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

// 1. Determine which group of elements needs highlighting
function getRelatedElements(id) {
    // Map Annotation -> All related Zones
    const annotationToZones = {
        's3-1': ['s3-1a', 's3-1b', 's3-1c'],
        's3-2': ['s3-2a', 's3-2b', 's3-2c'],
        's3-3': ['s3-3a', 's3-3b'],
        's3-4': ['s3-4a', 's3-4b'],
        's3-5': ['s3-5'],
        's3-6': ['s3-6']
    };

    // Map Zone -> Parent Annotation
    const zoneToAnnotation = {
        's3-1a': 's3-1', 's3-1b': 's3-1', 's3-1c': 's3-1',
        's3-2a': 's3-2', 's3-2b': 's3-2', 's3-2c': 's3-2',
        's3-3a': 's3-3', 's3-3b': 's3-3',
        's3-4a': 's3-4', 's3-4b': 's3-4',
        's3-5': 's3-5',
        's3-6': 's3-6'
    };

    let annotationId;
    
    // If input is an annotation ID (e.g., s3-1), use it directly
    if (annotationToZones[id]) {
        annotationId = id;
    } 
    // If input is a zone ID (e.g., s3-1a), look up its parent
    else if (zoneToAnnotation[id]) {
        annotationId = zoneToAnnotation[id];
    } else {
        return [];
    }

    const zones = annotationToZones[annotationId];
    return { annotationId, zones };
}

// 2. Main Hover Handler
function handleSection3HoverStart(e) {
    if (window.innerWidth <= 991) return;
    
    // Check if triggered by an annotation or a zone
    const targetId = e.currentTarget.dataset.target || e.currentTarget.dataset.num;
    if (!targetId) return;

    const group = getRelatedElements(targetId);
    if (!group || !group.annotationId) return;

    // FADE EVERYTHING FIRST
    document.querySelectorAll('.section3-annotations .annotation-item').forEach(el => el.classList.add('faded'));
    document.querySelectorAll('.highlight-zone[data-num^="s3-"]').forEach(el => el.classList.add('faded'));
    document.querySelectorAll('#connectorSvgSection3 .connector-path').forEach(el => el.classList.add('faded'));

    // HIGHLIGHT ANNOTATION
    const annotation = document.querySelector(`.section3-annotations .annotation-item[data-target="${group.annotationId}"]`);
    if(annotation) {
        annotation.classList.remove('faded');
        annotation.classList.add('highlighted');
    }

    // HIGHLIGHT ALL ZONES IN THE GROUP
    group.zones.forEach(zoneId => {
        const zone = document.querySelector(`.highlight-zone[data-num="${zoneId}"]`);
        if(zone) {
            zone.classList.remove('faded');
            zone.classList.add('highlighted');
        }
    });

    // HIGHLIGHT THREADS
    document.querySelectorAll(`#connectorSvgSection3 .connector-path[data-num="${group.annotationId}"]`).forEach(path => {
        path.classList.remove('faded');
        path.classList.add('highlighted');
    });
}

// 3. Wrapper for Zone hover to use the same logic
function handleSection3ZoneHoverStart(e) {
    handleSection3HoverStart(e);
}

function handleSection3HoverEnd() {
    if (window.innerWidth <= 991) return;
    document.querySelectorAll('.section3-annotations .annotation-item, .highlight-zone[data-num^="s3-"], #connectorSvgSection3 .connector-path').forEach(el => {
        el.classList.remove('highlighted', 'faded');
    });
}

window.addEventListener('resize', debounce(function() {
    const svg = document.getElementById('connectorSvgSection3');
    if (svg) svg.innerHTML = '';
    
    document.querySelectorAll('.section3-annotations .annotation-item, .highlight-zone[data-num^="s3-"], #connectorSvgSection3 .connector-path').forEach(el => {
        el.classList.remove('highlighted', 'faded');
    });
    
    if (window.innerWidth > 991) {
        const revisedTab = document.getElementById('revised-tab');
        if (revisedTab && revisedTab.classList.contains('active')) {
            drawConnectorsSection3();
            setupSection3Hover();
        }
    }
}, 150));


// =====================================================
// GSAP ANIMATION (WITH REFRESH FIX)
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const cursor = document.getElementById("demo-cursor");
    if (window.innerWidth > 991) {
        initCinematicScroll();
    }
});

function initCinematicScroll() {
    
    // --- PART 1: SECTION 2 ---
    const section2 = document.querySelector(".explainer-section");
    const annotations2 = section2.querySelectorAll(".annotation-item");
    gsap.set(annotations2, { autoAlpha: 0, y: 20 });

    const tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: section2,
            start: "center center",
            end: "+=2000",
            pin: true,
            scrub: 1,
            anticipatePin: 1
        }
    });

    const sortedAnnotations2 = Array.from(annotations2).sort((a, b) => a.dataset.target - b.dataset.target);
    sortedAnnotations2.forEach((ann) => {
        tl2.to(ann, { autoAlpha: 1, y: 0, duration: 0.5 }, "+=0.1");
        const zoneNum = ann.dataset.target;
        const zones = document.querySelectorAll(`.highlight-zone[data-num="${zoneNum}"]`);
        if(zones.length) tl2.to(zones, { backgroundColor: "rgba(255, 255, 255, 0.08)", duration: 0.2 }, "<");
    });


    // --- PART 2: SECTION 3 (Fixed Refresh) ---
    const section3 = document.querySelector(".tabbed-reco-section");
    const activeTabContent = document.getElementById("active-tab");
    const revisedTabContent = document.getElementById("revised-tab");
    const activeTabBtn = document.querySelector('.tab-btn[data-tab="active"]');
    const revisedTabBtn = document.querySelector('.tab-btn[data-tab="revised"]');
    const viewRevisedBtn = document.querySelector(".view-revised-btn");
    const historyBtn = document.getElementById("tabbed-history-btn");
    const historySection = document.getElementById("tabbed-history-section");
    const historyIcon = document.getElementById("tabbed-history-icon");
    const historyText = document.getElementById("tabbed-history-text");
    const annotationsActive = document.querySelectorAll(".section2-annotations .annotation-item");
    const annotationsRevised = document.querySelectorAll(".section3-annotations .annotation-item");

    gsap.set(annotationsActive, { autoAlpha: 0, y: 20 });
    gsap.set(annotationsRevised, { autoAlpha: 0, y: 20 });
    gsap.set("#demo-cursor", { autoAlpha: 0, x: 0, y: 0 }); 
    
    activeTabContent.style.display = "block";
    revisedTabContent.style.display = "none";
    historySection.style.maxHeight = ""; 
    historySection.classList.remove("expanded");

    const tl3 = gsap.timeline({
        scrollTrigger: {
            trigger: section3,
            start: "center center", 
            end: "+=6000", 
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            
            // --- CRITICAL FIX: RECALCULATE ON RESIZE ---
            invalidateOnRefresh: true, 
            
            onLeave: () => gsap.to("#demo-cursor", { autoAlpha: 0 }) 
        }
    });

    const sortedActiveAnns = Array.from(annotationsActive).sort((a, b) => {
        return parseInt(a.dataset.target.replace('s2-', '')) - parseInt(b.dataset.target.replace('s2-', ''));
    });
    sortedActiveAnns.forEach((ann) => {
        tl3.to(ann, { autoAlpha: 1, y: 0, duration: 1 }, "+=0.2");
    });

    tl3.to("#demo-cursor", { autoAlpha: 1, duration: 0.2 });
    
    // IMPORTANT: Use function-based values for x/y to allow recalculation
    tl3.to("#demo-cursor", { 
        x: () => { 
            const rect = viewRevisedBtn.getBoundingClientRect(); 
            return rect.left + rect.width/2; 
        },
        y: () => { 
            const rect = viewRevisedBtn.getBoundingClientRect(); 
            return rect.top + rect.height/2; 
        },
        duration: 1.5,
        ease: "power2.inOut"
    });
    
    tl3.to("#demo-cursor", { scale: 0.8, duration: 0.1 }); 
    tl3.to("#demo-cursor", { scale: 1, duration: 0.1 }); 
    
    tl3.add(() => {
        activeTabBtn.classList.remove("active");
        revisedTabBtn.classList.add("active");
        activeTabContent.style.display = "none";
        revisedTabContent.style.display = "block";
        revisedTabContent.classList.add("active");
        if(typeof drawConnectorsSection3 === 'function') drawConnectorsSection3();
    });
    tl3.to({}, { duration: 0.5 }); 

    const sortedRevisedAnns = Array.from(annotationsRevised).sort((a, b) => {
        const numA = parseInt(a.dataset.target.replace('s3-', ''));
        const numB = parseInt(b.dataset.target.replace('s3-', ''));
        return numA - numB;
    });

    sortedRevisedAnns.forEach((ann) => {
        if(ann.dataset.target !== 's3-5' && ann.dataset.target !== 's3-6') {
             tl3.to(ann, { autoAlpha: 1, y: 0, duration: 1 }, "+=0.2");
        }
    });

    tl3.to("#demo-cursor", { 
        x: () => { const rect = historyBtn.getBoundingClientRect(); return rect.left + rect.width/2; },
        y: () => { const rect = historyBtn.getBoundingClientRect(); return rect.top + rect.height/2; },
        duration: 1.5,
        ease: "power2.inOut"
    });
    tl3.to("#demo-cursor", { scale: 0.8, duration: 0.1 });
    tl3.to("#demo-cursor", { scale: 1, duration: 0.1 });

    tl3.to(historySection, { 
        maxHeight: "1000px", 
        duration: 1, 
        ease: "power2.inOut",
        onStart: () => {
            historyBtn.classList.add("expanded");
            historyText.textContent = "Hide History";
            historyIcon.classList.remove("bi-chevron-down");
            historyIcon.classList.add("bi-chevron-up");
        },
        onComplete: () => {
            historySection.classList.add("expanded");
            historySection.style.maxHeight = ""; 
        },
        onReverseStart: () => {
            const isManuallyClosed = !historySection.classList.contains("expanded");
            historySection.classList.remove("expanded");
            if (isManuallyClosed) {
                historySection.style.maxHeight = "0px";
            } else {
                historySection.style.maxHeight = historySection.scrollHeight + "px";
            }
            historyBtn.classList.remove("expanded");
            historyText.textContent = "View History";
            historyIcon.classList.remove("bi-chevron-up");
            historyIcon.classList.add("bi-chevron-down");
        }
    });

    tl3.to("#demo-cursor", { autoAlpha: 0, duration: 0.5 }); 

    sortedRevisedAnns.forEach((ann) => {
        if(ann.dataset.target === 's3-5' || ann.dataset.target === 's3-6') {
             tl3.to(ann, { autoAlpha: 1, y: 0, duration: 1 }, "+=0.2");
        }
    });

    tl3.to({}, { duration: 1 });
}