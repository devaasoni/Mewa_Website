// =====================================================
// THE MEWA - LANDING PAGE JAVASCRIPT
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all modules
  initThemeToggle()
  initScrollAnimations()
  initCounterAnimations()
  initFAQAccordion()
  initProfitCalculator()
  initSmoothScroll()
  initNavbarScroll()
  initCandlestickChart()
  initDropdownMenus() // Added line
  initServiceTabs()
  activateBenefitsShowcase()
  initContactForm()
})

// =====================================================
// THEME TOGGLE
// =====================================================
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle")
  const html = document.documentElement

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme") || "dark"
  html.setAttribute("data-theme", savedTheme)
  updateThemeIcon(savedTheme)

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = html.getAttribute("data-theme")
      const newTheme = currentTheme === "dark" ? "light" : "dark"

      html.setAttribute("data-theme", newTheme)
      localStorage.setItem("theme", newTheme)
      updateThemeIcon(newTheme)
    })
  }
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById("themeToggle")
  if (themeToggle) {
    themeToggle.innerHTML = theme === "dark" ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>'
  }
}

// =====================================================
// SCROLL ANIMATIONS
// =====================================================
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll(".fade-up")
  const annotationItems = document.querySelectorAll(".annotation-item")

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  fadeElements.forEach((el) => observer.observe(el))
  annotationItems.forEach((el) => observer.observe(el))
}

// =====================================================
// COUNTER ANIMATIONS
// =====================================================
function initCounterAnimations() {
  const counters = document.querySelectorAll("[data-count]")

  const observerOptions = {
    threshold: 0.5,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        entry.target.classList.add("counted")
        animateCounter(entry.target)
      }
    })
  }, observerOptions)

  counters.forEach((counter) => observer.observe(counter))
}

function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute("data-count"))
  const suffix = element.getAttribute("data-suffix") || ""
  const prefix = element.getAttribute("data-prefix") || ""
  const duration = 2000
  const step = target / (duration / 16)
  let current = 0

  const updateCounter = () => {
    current += step
    if (current < target) {
      element.textContent = prefix + Math.floor(current) + suffix
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = prefix + target + suffix
    }
  }

  updateCounter()
}

// =====================================================
// FAQ ACCORDION
// =====================================================
function initFAQAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    // Check if this item is already initialized to prevent double-click issue
    if (item.hasAttribute("data-faq-init")) return;
    
    // Mark this item as initialized
    item.setAttribute("data-faq-init", "true");

    const question = item.querySelector(".faq-question");

    // Safety check
    if (!question) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current item
      // We force the state based on what it was before we started closing others
      if (isActive) {
        item.classList.remove("active");
      } else {
        item.classList.add("active");
      }
    });
  });
}

// =====================================================
// PROFIT CALCULATOR
// =====================================================
function initProfitCalculator() {
  const investmentInput = document.getElementById("investmentAmount")
  const monthsSlider = document.getElementById("investmentMonths")
  const monthsDisplay = document.getElementById("monthsDisplay")
  const resultValue = document.getElementById("calcResultValue")
  const resultSub = document.getElementById("calcResultSub")

  if (!investmentInput || !monthsSlider) return

  const calculateProfit = () => {
    const investment = Number.parseFloat(investmentInput.value) || 100000
    const months = Number.parseInt(monthsSlider.value) || 12

    // Average monthly return of 5%
    const monthlyReturn = 0.05
    const totalReturn = investment * Math.pow(1 + monthlyReturn, months)
    const profit = totalReturn - investment

    if (monthsDisplay) {
      monthsDisplay.textContent = months + " months"
    }

    if (resultValue) {
      resultValue.textContent = "₹" + formatNumber(Math.round(profit))
    }

    if (resultSub) {
      const percentageReturn = ((profit / investment) * 100).toFixed(1)
      resultSub.textContent = percentageReturn + "% total return"
    }
  }

  investmentInput.addEventListener("input", calculateProfit)
  monthsSlider.addEventListener("input", calculateProfit)

  // Initial calculation
  calculateProfit()
}

function formatNumber(num) {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(2) + " Cr"
  } else if (num >= 100000) {
    return (num / 100000).toFixed(2) + " L"
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toLocaleString("en-IN")
}

// =====================================================
// SMOOTH SCROLL
// =====================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const offset = 80
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
}

// =====================================================
// NAVBAR SCROLL EFFECT
// =====================================================
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar-custom")

  if (!navbar) return

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      // navbar.style.background = "rgba(10, 10, 15, 0.95)"
      navbar.style.boxShadow = "0 10px 40px rgba(0,0,0,0.3)"
    } else {
      // navbar.style.background = "rgba(10, 10, 15, 0.8)"
      navbar.style.boxShadow = "none"
    }
  })
}

// =====================================================
// CANDLESTICK CHART ANIMATION
// =====================================================
function initCandlestickChart() {
  const candlesContainer = document.querySelector(".trading-candles")

  if (!candlesContainer) return

  // Generate random candles
  const candleData = []
  for (let i = 0; i < 30; i++) {
    candleData.push({
      height: Math.random() * 150 + 30,
      isGreen: Math.random() > 0.4,
    })
  }

  candlesContainer.innerHTML = candleData
    .map(
      (candle, index) => `
        <div class="candle ${candle.isGreen ? "green" : "red"}" 
             style="height: ${candle.height}px; --delay: ${index}"></div>
    `,
    )
    .join("")
}

// =====================================================
// STOCK TICKER SIMULATION
// =====================================================
function simulateStockTicker() {
  const tickerItems = document.querySelectorAll(".ticker-change")

  setInterval(() => {
    tickerItems.forEach((item) => {
      const isUp = Math.random() > 0.4
      const change = (Math.random() * 3).toFixed(2)
      item.className = "ticker-change " + (isUp ? "up" : "down")
      item.innerHTML = (isUp ? "+" : "-") + change + '% <i class="bi bi-arrow-' + (isUp ? "up" : "down") + '"></i>'
    })
  }, 3000)
}

// Initialize ticker simulation
setTimeout(simulateStockTicker, 1000)

// =====================================================
// LIVE PRICE ANIMATION (for phone mockup)
// =====================================================
function initLivePriceAnimation() {
  const priceElements = document.querySelectorAll(".phone-live-price span:first-child")

  setInterval(() => {
    priceElements.forEach((el) => {
      const basePrice = Number.parseFloat(el.textContent.replace("₹", "").replace(",", ""))
      const change = (Math.random() - 0.5) * 10
      const newPrice = (basePrice + change).toFixed(2)
      el.textContent = "₹" + Number.parseFloat(newPrice).toLocaleString("en-IN")
    })
  }, 2000)
}

// Initialize live price animation
setTimeout(initLivePriceAnimation, 2000)

// =====================================================
// CHART SVG ANIMATION
// =====================================================
function initChartAnimation() {
  const chartLine = document.querySelector(".chart-line.animated")

  if (!chartLine) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          chartLine.style.animation = "none"
          chartLine.offsetHeight // Trigger reflow
          chartLine.style.animation = "drawChart 3s ease forwards"
        }
      })
    },
    { threshold: 0.5 },
  )

  observer.observe(chartLine)
}

// Initialize chart animation
setTimeout(initChartAnimation, 500)

// =====================================================
// DROPDOWN MENU FUNCTIONALITY
// =====================================================
function initDropdownMenus() {
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle")

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      const href = toggle.getAttribute("href")
      if (href === "#" || href.startsWith("#")) {
        e.preventDefault()
      }

      const dropdown = toggle.closest(".nav-dropdown")
      const dropdownMenu = dropdown.querySelector(".dropdown-menu-custom")

      const isCurrentlyOpen = dropdownMenu.style.opacity === "1"

      // Close other dropdowns
      document.querySelectorAll(".nav-dropdown").forEach((other) => {
        if (other !== dropdown) {
          other.querySelector(".dropdown-menu-custom").style.opacity = "0"
          other.querySelector(".dropdown-menu-custom").style.visibility = "hidden"
        }
      })

      if (isCurrentlyOpen) {
        dropdownMenu.style.opacity = "0"
        dropdownMenu.style.visibility = "hidden"
      } else {
        dropdownMenu.style.opacity = "1"
        dropdownMenu.style.visibility = "visible"
      }
    })
  })

  document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
    dropdown.addEventListener("mouseenter", () => {
      const dropdownMenu = dropdown.querySelector(".dropdown-menu-custom")
      // Remove inline styles to allow CSS hover to work
      dropdownMenu.style.opacity = ""
      dropdownMenu.style.visibility = ""
    })

    dropdown.addEventListener("mouseleave", () => {
      const dropdownMenu = dropdown.querySelector(".dropdown-menu-custom")
      // Reset inline styles when mouse leaves
      dropdownMenu.style.opacity = "0"
      dropdownMenu.style.visibility = "hidden"
    })
  })

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-dropdown")) {
      document.querySelectorAll(".dropdown-menu-custom").forEach((menu) => {
        menu.style.opacity = "0"
        menu.style.visibility = "hidden"
      })
    }
  })
}

// =====================================================
// PROFESSIONAL FLAT TABS FUNCTIONALITY
// =====================================================
function initServiceTabs() {
  const tabButtons = document.querySelectorAll(".service-tab-btn")
  const tabContents = document.querySelectorAll(".service-tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab")

      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => {
        content.classList.remove("active")
      })

      // Add active class to clicked button
      button.classList.add("active")

      // Show corresponding content with animation
      const targetContent = document.getElementById(`tab-${targetTab}`)
      if (targetContent) {
        setTimeout(() => {
          targetContent.classList.add("active")
        }, 50)
      }
    })
  })
}

// =====================================================
// BENEFITS SHOWCASE ANIMATIONS
// =====================================================
function activateBenefitsShowcase() {
  const benefitCards = document.querySelectorAll(
    ".asymmetric-benefit-card, .spotlight-benefit-card, .compact-benefit-card",
  )

  const observerSettings = {
    threshold: 0.2,
    rootMargin: "0px",
  }

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerSettings)

  benefitCards.forEach((card) => scrollObserver.observe(card))
}

// =====================================================
// CONTACT FORM HANDLER
// =====================================================
function initContactForm() {
  const contactForm = document.getElementById("contactForm")

  if (!contactForm) return

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("contactName").value
    const email = document.getElementById("contactEmail").value
    const message = document.getElementById("contactMessage").value

    // Here you would typically send the data to your backend
    console.log("Contact Form Submitted:", { name, email, message })

    // Show success message (you can customize this)
    alert(`Thank you, ${name}! We've received your message and will get back to you at ${email} within 24 hours.`)

    // Reset form
    contactForm.reset()
  })
}


// =====================================================
// THE MEWA - LANDING PAGE JAVASCRIPT
// Fully Responsive with Mobile Menu Support
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all modules
  initMobileMenu()
  initThemeToggle()
  initScrollAnimations()
  initCounterAnimations()
  initProfitCalculator()
  initSmoothScroll()
  initNavbarScroll()
  initDropdownMenus()
  activateBenefitsShowcase()
  initContactForm()
  initBackToTop()
})

// =====================================================
// MOBILE MENU FUNCTIONALITY
// =====================================================
function initMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle")
  const mobileNavMenu = document.getElementById("mobileNavMenu")
  const mobileDropdownToggles = document.querySelectorAll(".mobile-dropdown-toggle")

  if (!mobileMenuToggle || !mobileNavMenu) return

  // Toggle mobile menu
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenuToggle.classList.toggle("active")
    mobileNavMenu.classList.toggle("active")

    // Prevent body scroll when menu is open
    if (mobileNavMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  })

  // Mobile dropdown toggles
  mobileDropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const dropdownMenu = toggle.nextElementSibling
      toggle.classList.toggle("active")
      dropdownMenu.classList.toggle("active")
    })
  })

  // Close menu when clicking on a link
  const mobileNavLinks = mobileNavMenu.querySelectorAll("a")
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuToggle.classList.remove("active")
      mobileNavMenu.classList.remove("active")
      document.body.style.overflow = ""
    })
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileNavMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      mobileMenuToggle.classList.remove("active")
      mobileNavMenu.classList.remove("active")
      document.body.style.overflow = ""
    }
  })

  // Close menu on resize to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1199) {
      mobileMenuToggle.classList.remove("active")
      mobileNavMenu.classList.remove("active")
      document.body.style.overflow = ""
    }
  })
}

// =====================================================
// THEME TOGGLE
// =====================================================
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle")
  const html = document.documentElement

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme") || "dark"
  html.setAttribute("data-theme", savedTheme)
  updateThemeIcon(savedTheme)

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = html.getAttribute("data-theme")
      const newTheme = currentTheme === "dark" ? "light" : "dark"

      html.setAttribute("data-theme", newTheme)
      localStorage.setItem("theme", newTheme)
      updateThemeIcon(newTheme)
    })
  }
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById("themeToggle")
  if (themeToggle) {
    themeToggle.innerHTML = theme === "dark" ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>'
  }
}

// =====================================================
// SCROLL ANIMATIONS
// =====================================================
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll(".fade-up")
  const annotationItems = document.querySelectorAll(".annotation-item")

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  fadeElements.forEach((el) => observer.observe(el))
  annotationItems.forEach((el) => observer.observe(el))
}

// =====================================================
// COUNTER ANIMATIONS
// =====================================================
function initCounterAnimations() {
  const counters = document.querySelectorAll("[data-count]")

  const observerOptions = {
    threshold: 0.5,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        entry.target.classList.add("counted")
        animateCounter(entry.target)
      }
    })
  }, observerOptions)

  counters.forEach((counter) => observer.observe(counter))
}

function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute("data-count"))
  const suffix = element.getAttribute("data-suffix") || ""
  const prefix = element.getAttribute("data-prefix") || ""
  const duration = 2000
  const step = target / (duration / 16)
  let current = 0

  const updateCounter = () => {
    current += step
    if (current < target) {
      element.textContent = prefix + Math.floor(current) + suffix
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = prefix + target + suffix
    }
  }

  updateCounter()
}

// =====================================================
// PROFIT CALCULATOR
// =====================================================
function initProfitCalculator() {
  const investmentInput = document.getElementById("investmentAmount")
  const monthsSlider = document.getElementById("investmentMonths")
  const monthsDisplay = document.getElementById("monthsDisplay")
  const resultValue = document.getElementById("calcResultValue")
  const resultSub = document.getElementById("calcResultSub")

  if (!investmentInput || !monthsSlider) return

  const calculateProfit = () => {
    const investment = Number.parseFloat(investmentInput.value) || 100000
    const months = Number.parseInt(monthsSlider.value) || 12

    // Average monthly return of 5%
    const monthlyReturn = 0.05
    const totalReturn = investment * Math.pow(1 + monthlyReturn, months)
    const profit = totalReturn - investment

    if (monthsDisplay) {
      monthsDisplay.textContent = months + " months"
    }

    if (resultValue) {
      resultValue.textContent = "₹" + formatNumber(Math.round(profit))
    }

    if (resultSub) {
      const percentageReturn = ((profit / investment) * 100).toFixed(1)
      resultSub.textContent = percentageReturn + "% total return"
    }
  }

  investmentInput.addEventListener("input", calculateProfit)
  monthsSlider.addEventListener("input", calculateProfit)

  // Initial calculation
  calculateProfit()
}

function formatNumber(num) {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(2) + " Cr"
  } else if (num >= 100000) {
    return (num / 100000).toFixed(2) + " L"
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toLocaleString("en-IN")
}

// =====================================================
// SMOOTH SCROLL
// =====================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href === "#" || href === "#login") return

      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        const offset = 80
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
}

// =====================================================
// NAVBAR SCROLL EFFECT
// =====================================================
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar-custom")

  if (!navbar) return

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      // navbar.style.background = "rgba(10, 10, 15, 0.95)"
      navbar.style.boxShadow = "0 10px 40px rgba(0,0,0,0.3)"
    } else {
      // navbar.style.background = "rgba(10, 10, 15, 0.8)"
      navbar.style.boxShadow = "none"
    }
  })
}

// =====================================================
// DROPDOWN MENU FUNCTIONALITY (Desktop)
// =====================================================
function initDropdownMenus() {
  const dropdownToggles = document.querySelectorAll(".nav-dropdown .nav-link-custom")

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      const href = toggle.getAttribute("href")
      if (href === "#" || href.startsWith("#")) {
        e.preventDefault()
      }

      const dropdown = toggle.closest(".nav-dropdown")
      const dropdownMenu = dropdown.querySelector(".dropdown-menu-custom")

      const isCurrentlyOpen = dropdownMenu.style.opacity === "1"

      // Close other dropdowns
      document.querySelectorAll(".nav-dropdown").forEach((other) => {
        if (other !== dropdown) {
          const otherMenu = other.querySelector(".dropdown-menu-custom")
          if (otherMenu) {
            otherMenu.style.opacity = "0"
            otherMenu.style.visibility = "hidden"
          }
        }
      })

      if (isCurrentlyOpen) {
        dropdownMenu.style.opacity = "0"
        dropdownMenu.style.visibility = "hidden"
      } else {
        dropdownMenu.style.opacity = "1"
        dropdownMenu.style.visibility = "visible"
      }
    })
  })

  document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
    dropdown.addEventListener("mouseenter", () => {
      const dropdownMenu = dropdown.querySelector(".dropdown-menu-custom")
      if (dropdownMenu) {
        dropdownMenu.style.opacity = ""
        dropdownMenu.style.visibility = ""
      }
    })

    dropdown.addEventListener("mouseleave", () => {
      const dropdownMenu = dropdown.querySelector(".dropdown-menu-custom")
      if (dropdownMenu) {
        dropdownMenu.style.opacity = "0"
        dropdownMenu.style.visibility = "hidden"
      }
    })
  })

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-dropdown")) {
      document.querySelectorAll(".dropdown-menu-custom").forEach((menu) => {
        menu.style.opacity = "0"
        menu.style.visibility = "hidden"
      })
    }
  })
}


// =====================================================
// BENEFITS SHOWCASE ANIMATIONS
// =====================================================
function activateBenefitsShowcase() {
  const benefitCards = document.querySelectorAll(".benefit-item")

  const observerSettings = {
    threshold: 0.2,
    rootMargin: "0px",
  }

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerSettings)

  benefitCards.forEach((card) => scrollObserver.observe(card))
}

// =====================================================
// CONTACT FORM HANDLER
// =====================================================
function initContactForm() {
  const contactForm = document.getElementById("contactForm")

  if (!contactForm) return

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("contactName").value
    const email = document.getElementById("contactEmail").value
    const message = document.getElementById("contactMessage").value

    // Here you would typically send the data to your backend
    console.log("Contact Form Submitted:", { name, email, message })

    // Show success message
    alert(`Thank you, ${name}! We've received your message and will get back to you at ${email} within 24 hours.`)

    // Reset form
    contactForm.reset()
  })
}


/* =====================================================
   EXPLAINER CARD - CONNECTOR LINES & INTERACTIONS
===================================================== */

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
        
        // Reset all states
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

    // Connection mapping: number -> [side, color]
    // Left: 1 (orange), 2 (purple), 3 (blue)
    // Right: 4 (pink), 5 (green), 6 (red)
    const connections = {
      1: ['left', 'orange'],
      2: ['left', 'purple'],
      3: ['left', 'blue'],
      4: ['right', 'pink'],
      5: ['right', 'green'],
      6: ['right', 'red'],
      7: ['left', 'red'],
      8: ['right', 'orange']
    };

    Object.entries(connections).forEach(([num, [side, color]]) => {
      const annotation = document.querySelector(`.annotation-item[data-target="${num}"]`);
      const zone = document.querySelector(`.highlight-zone[data-num="${num}"]`);

      if (!annotation || !zone) return;

      const annotationRect = annotation.getBoundingClientRect();
      const zoneRect = zone.getBoundingClientRect();

      let startX, startY, endX, endY;

      if (side === 'left') {
        // From annotation right edge to zone left edge
        startX = annotationRect.right - containerRect.left;
        startY = annotationRect.top + annotationRect.height / 2 - containerRect.top;
        endX = zoneRect.left - containerRect.left;
        endY = zoneRect.top + zoneRect.height / 2 - containerRect.top;
      } else {
        // From annotation left edge to zone right edge
        startX = annotationRect.left - containerRect.left;
        startY = annotationRect.top + annotationRect.height / 2 - containerRect.top;
        endX = zoneRect.right - containerRect.left;
        endY = zoneRect.top + zoneRect.height / 2 - containerRect.top;
      }

      // <CHANGE> Replace curved path with orthogonal segments (horizontal → vertical → horizontal)
      const midX = (startX + endX) / 2;
      const dotRadius = 4;

      // Create three line segments for orthogonal path
      // Line 1: Horizontal from start
      const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line1.setAttribute('x1', startX);
      line1.setAttribute('y1', startY);
      line1.setAttribute('x2', midX);
      line1.setAttribute('y2', startY);
      line1.setAttribute('class', `connector-path ${color}`);
      line1.setAttribute('data-num', num);
      svg.appendChild(line1);

      // Line 2: Vertical in the middle
      const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line2.setAttribute('x1', midX);
      line2.setAttribute('y1', startY);
      line2.setAttribute('x2', midX);
      line2.setAttribute('y2', endY);
      line2.setAttribute('class', `connector-path ${color}`);
      line2.setAttribute('data-num', num);
      svg.appendChild(line2);

      // Line 3: Horizontal to end
      const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line3.setAttribute('x1', midX);
      line3.setAttribute('y1', endY);
      line3.setAttribute('x2', endX);
      line3.setAttribute('y2', endY);
      line3.setAttribute('class', `connector-path ${color}`);
      line3.setAttribute('data-num', num);
      svg.appendChild(line3);

      // <CHANGE> Add circles at start and end points
      // Dot at start (annotation)
      const dotStart = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dotStart.setAttribute('cx', startX);
      dotStart.setAttribute('cy', startY);
      dotStart.setAttribute('r', dotRadius);
      dotStart.setAttribute('class', `connector-path ${color}`);
      dotStart.setAttribute('data-num', num);
      svg.appendChild(dotStart);

      // Dot at end (zone)
      const dotEnd = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dotEnd.setAttribute('cx', endX);
      dotEnd.setAttribute('cy', endY);
      dotEnd.setAttribute('r', dotRadius);
      dotEnd.setAttribute('class', `connector-path ${color}`);
      dotEnd.setAttribute('data-num', num);
      svg.appendChild(dotEnd);
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
// SWITCH TO REVISED TAB (Called from "View Revised" button)
// =====================================================
// =====================================================
// SWITCH TO REVISED TAB (Called from "View Revised" button)
// =====================================================
function switchToRevisedTab() {
  // Get the correct revised tab button
  const revisedTabBtn = document.querySelector('.tab-btn[data-tab="revised"]')
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  // Remove active from all buttons and contents
  tabButtons.forEach((btn) => btn.classList.remove("active"))
  tabContents.forEach((content) => content.classList.remove("active"))

  // Activate revised tab button
  if (revisedTabBtn) {
    revisedTabBtn.classList.add("active")
  }

  // Show revised tab content (outer container)
  const revisedContent = document.getElementById("revised-tab")
  if (revisedContent) {
    revisedContent.classList.add("active")
  }

  // Also activate the inner reco-tab-content for revised
  const innerRevisedContent = document.getElementById("tab-revised-reco")
  if (innerRevisedContent) {
    innerRevisedContent.classList.add("active")
  }

  // Scroll to the section smoothly
  const section = document.querySelector(".tabbed-reco-section")
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  // <FIX> Trigger the explainer initialization for Section 3
  // We use a small timeout to ensure the DOM is visible before calculating positions
  if (typeof initSection3Explainer === 'function') {
    setTimeout(() => {
        initSection3Explainer();
    }, 100);
  }
}

// <CHANGE> Combined DOMContentLoaded for REVISED stamp and tab buttons
document.addEventListener("DOMContentLoaded", () => {
  // Add click event to REVISED stamp
  const revisedStamp = document.querySelector('.status-stamp.revised-stamp')
  if (revisedStamp) {
    revisedStamp.style.cursor = 'pointer' // Make it look clickable
    revisedStamp.addEventListener('click', switchToRevisedTab)
  }

  // Tab buttons functionality
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active state from tabs
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"))

      // Hide all tab contents
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"))

      // Also handle inner reco-tab-content visibility
      document.querySelectorAll(".reco-tab-content").forEach(c => c.classList.remove("active"))

      // Activate clicked tab
      btn.classList.add("active")

      // Show corresponding content
      const tab = btn.dataset.tab
      document.getElementById(`${tab}-tab`).classList.add("active")

      // Also activate the corresponding inner content
      if (tab === "active") {
        document.getElementById("tab-active-reco").classList.add("active")
      } else if (tab === "revised") {
        document.getElementById("tab-revised-reco").classList.add("active")
      }
    })
  })
})

// =====================================================
// TOGGLE HISTORY SECTION
// =====================================================
// =====================================================
// TOGGLE HISTORY SECTION
// =====================================================
function toggleTabbedHistory() {
  const section = document.getElementById("tabbed-history-section")
  const text = document.getElementById("tabbed-history-text")
  const icon = document.getElementById("tabbed-history-icon")
  const btn = document.getElementById("tabbed-history-btn")

  if (section.classList.contains("expanded")) {
    section.classList.remove("expanded")
    text.textContent = "View History"
    icon.classList.remove("bi-chevron-up")
    icon.classList.add("bi-chevron-down")
    btn.classList.remove("expanded")
  } else {
    section.classList.add("expanded")
    text.textContent = "Hide History"
    icon.classList.remove("bi-chevron-down")
    icon.classList.add("bi-chevron-up")
    btn.classList.add("expanded")
  }

  // <FIX> Redraw connectors after the slide animation finishes
  // This updates the lines based on whether the history is now open or closed
  if (typeof drawConnectorsSection3 === 'function') {
      setTimeout(() => {
          drawConnectorsSection3();
      }, 350); 
  }
}

/* =====================================================
   SECTION 2 EXPLAINER - CONNECTOR LOGIC
===================================================== */

function drawConnectorsSection2() {
    const svg = document.getElementById('connectorSvgSection2');
    const container = document.getElementById('explainerContainerSection2');
    if (!svg || !container) return;

    svg.innerHTML = '';
    const containerRect = container.getBoundingClientRect();

    // Section 2 connection mapping: s2-1 (left, orange), s2-2 (right, blue)
    const connections = {
        's2-1': ['left', 'orange'],
        's2-2': ['right', 'blue']
    };

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

        const midX = (startX + endX) / 2;
        const dotRadius = 4;

        // Line 1: Horizontal from start
        const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line1.setAttribute('x1', startX);
        line1.setAttribute('y1', startY);
        line1.setAttribute('x2', midX);
        line1.setAttribute('y2', startY);
        line1.setAttribute('class', `connector-path ${color}`);
        line1.setAttribute('data-num', num);
        svg.appendChild(line1);

        // Line 2: Vertical in the middle
        const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line2.setAttribute('x1', midX);
        line2.setAttribute('y1', startY);
        line2.setAttribute('x2', midX);
        line2.setAttribute('y2', endY);
        line2.setAttribute('class', `connector-path ${color}`);
        line2.setAttribute('data-num', num);
        svg.appendChild(line2);

        // Line 3: Horizontal to end
        const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line3.setAttribute('x1', midX);
        line3.setAttribute('y1', endY);
        line3.setAttribute('x2', endX);
        line3.setAttribute('y2', endY);
        line3.setAttribute('class', `connector-path ${color}`);
        line3.setAttribute('data-num', num);
        svg.appendChild(line3);

        // Dot at start
        const dotStart = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dotStart.setAttribute('cx', startX);
        dotStart.setAttribute('cy', startY);
        dotStart.setAttribute('r', dotRadius);
        dotStart.setAttribute('class', `connector-path ${color}`);
        dotStart.setAttribute('data-num', num);
        svg.appendChild(dotStart);

        // Dot at end
        const dotEnd = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dotEnd.setAttribute('cx', endX);
        dotEnd.setAttribute('cy', endY);
        dotEnd.setAttribute('r', dotRadius);
        dotEnd.setAttribute('class', `connector-path ${color}`);
        dotEnd.setAttribute('data-num', num);
        svg.appendChild(dotEnd);
    });
}

// Initialize Section 2 connectors
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

    // Fade all in section 2
    document.querySelectorAll('.section2-annotations .annotation-item').forEach(el => el.classList.add('faded'));
    document.querySelectorAll('.highlight-zone[data-num^="s2-"]').forEach(el => el.classList.add('faded'));
    document.querySelectorAll('#connectorSvgSection2 .connector-path').forEach(el => el.classList.add('faded'));

    // Highlight active
    if (annotation) {
        annotation.classList.remove('faded');
        annotation.classList.add('highlighted');
    }
    if (zone) {
        zone.classList.remove('faded');
        zone.classList.add('highlighted');
    }
    paths.forEach(path => {
        path.classList.remove('faded');
        path.classList.add('highlighted');
    });
}

function handleSection2HoverEnd() {
    if (window.innerWidth <= 991) return;

    document.querySelectorAll('.section2-annotations .annotation-item, .highlight-zone[data-num^="s2-"], #connectorSvgSection2 .connector-path').forEach(el => {
        el.classList.remove('highlighted', 'faded');
    });
}

// Call on page load and resize
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initSection2Explainer, 100);
});

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


/* =====================================================
   SECTION 3 EXPLAINER - REVISED TAB CONNECTOR LOGIC
===================================================== */

// =====================================================
// DRAW CONNECTORS FOR SECTION 3 (Revised Tab)
// =====================================================
function drawConnectorsSection3() {
    const svg = document.getElementById('connectorSvgSection3');
    const container = document.getElementById('explainerContainerSection3');
    if (!svg || !container) return;

    // Ensure SVG is visible and on top
    svg.style.overflow = 'visible';
    svg.style.zIndex = '10';

    svg.innerHTML = '';
    const containerRect = container.getBoundingClientRect();

    // Section 3 connection mapping
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
        const dotRadius = 4;

        // Calculate annotation start point
        let annotationX, annotationY;
        if (config.side === 'left') {
            annotationX = annotationRect.right - containerRect.left;
        } else {
            annotationX = annotationRect.left - containerRect.left;
        }
        annotationY = annotationRect.top + annotationRect.height / 2 - containerRect.top;

        // Draw dot at annotation
        const dotAnnotation = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dotAnnotation.setAttribute('cx', annotationX);
        dotAnnotation.setAttribute('cy', annotationY);
        dotAnnotation.setAttribute('r', dotRadius);
        dotAnnotation.setAttribute('class', `connector-path ${config.color}`);
        dotAnnotation.setAttribute('data-num', annotationId);
        svg.appendChild(dotAnnotation);

        // Draw connectors to each target
        config.targets.forEach((targetNum, index) => {
            const zone = document.querySelector(`.highlight-zone[data-num="${targetNum}"]`);
            if (!zone) return;

            // <FIX> CHECK IF ZONE IS INSIDE COLLAPSED HISTORY
            // This ensures lines are NOT drawn if the history section is closed
            const historyContainer = zone.closest('#tabbed-history-section');
            if (historyContainer && !historyContainer.classList.contains('expanded')) {
                return; // SKIP drawing this specific line
            }

            const zoneRect = zone.getBoundingClientRect();
            // Also skip if the element is hidden via display:none or has no size
            if (zoneRect.width === 0 || zoneRect.height === 0) return;

            let endX, endY;
            if (config.side === 'left') {
                endX = zoneRect.left - containerRect.left;
            } else {
                endX = zoneRect.right - containerRect.left;
            }
            endY = zoneRect.top + zoneRect.height / 2 - containerRect.top;

            // Calculate midX with offset for multiple connectors
            const midX = (annotationX + endX) / 2 + (index * 10 - (config.targets.length - 1) * 5);

            // Line 1: Horizontal from annotation
            const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line1.setAttribute('x1', annotationX);
            line1.setAttribute('y1', annotationY);
            line1.setAttribute('x2', midX);
            line1.setAttribute('y2', annotationY);
            line1.setAttribute('class', `connector-path ${config.color}`);
            line1.setAttribute('data-num', annotationId);
            svg.appendChild(line1);

            // Line 2: Vertical
            const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line2.setAttribute('x1', midX);
            line2.setAttribute('y1', annotationY);
            line2.setAttribute('x2', midX);
            line2.setAttribute('y2', endY);
            line2.setAttribute('class', `connector-path ${config.color}`);
            line2.setAttribute('data-num', annotationId);
            svg.appendChild(line2);

            // Line 3: Horizontal to target
            const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line3.setAttribute('x1', midX);
            line3.setAttribute('y1', endY);
            line3.setAttribute('x2', endX);
            line3.setAttribute('y2', endY);
            line3.setAttribute('class', `connector-path ${config.color}`);
            line3.setAttribute('data-num', annotationId);
            svg.appendChild(line3);

            // Dot at target
            const dotEnd = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dotEnd.setAttribute('cx', endX);
            dotEnd.setAttribute('cy', endY);
            dotEnd.setAttribute('r', dotRadius);
            dotEnd.setAttribute('class', `connector-path ${config.color}`);
            dotEnd.setAttribute('data-num', annotationId);
            svg.appendChild(dotEnd);
        });
    });
}

// Initialize Section 3 connectors
function initSection3Explainer() {
    if (window.innerWidth > 991) {
        // Only draw if revised tab is active
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

function handleSection3HoverStart(e) {
    if (window.innerWidth <= 991) return;

    const annotationId = e.currentTarget.dataset.target;
    if (!annotationId) return;

    // Fade all in section 3
    document.querySelectorAll('.section3-annotations .annotation-item').forEach(el => el.classList.add('faded'));
    document.querySelectorAll('.highlight-zone[data-num^="s3-"]').forEach(el => el.classList.add('faded'));
    document.querySelectorAll('#connectorSvgSection3 .connector-path').forEach(el => el.classList.add('faded'));

    // Highlight the annotation
    e.currentTarget.classList.remove('faded');
    e.currentTarget.classList.add('highlighted');

    // Highlight all related zones and connectors
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

    // Highlight connectors
    document.querySelectorAll(`#connectorSvgSection3 .connector-path[data-num="${annotationId}"]`).forEach(path => {
        path.classList.remove('faded');
        path.classList.add('highlighted');
    });
}

function handleSection3ZoneHoverStart(e) {
    if (window.innerWidth <= 991) return;

    const zoneNum = e.currentTarget.dataset.num;
    if (!zoneNum) return;

    // Find which annotation this zone belongs to
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

    // Trigger the same hover effect as hovering the annotation
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

// Call on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize when revised tab becomes active
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(() => {
                if (btn.dataset.tab === 'revised') {
                    initSection3Explainer();
                }
            }, 100);
        });
    });
});

// Redraw on resize
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

// Redraw connectors when history is toggled
const originalToggleTabbedHistory = window.toggleTabbedHistory;
window.toggleTabbedHistory = function() {
    originalToggleTabbedHistory();
    // Redraw connectors after history animation completes
    setTimeout(() => {
        if (window.innerWidth > 991) {
            drawConnectorsSection3();
        }
    }, 350);
};


// =====================================================
// BACK TO TOP BUTTON WITH SCROLL PROGRESS
// =====================================================
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTopBtn");
  const progressCircle = document.querySelector(".progress-ring__circle");

  if (!backToTopBtn || !progressCircle) return;

  // Circle Geometry settings
  const radius = progressCircle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  // Initialize the circle
  progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
  progressCircle.style.strokeDashoffset = circumference;

  function setProgress(percent) {
    // Calculate the offset (inverse of percentage)
    const offset = circumference - (percent / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
  }

  // Scroll Event Listener
  window.addEventListener("scroll", () => {
    // 1. Calculate how much we have scrolled (0 to 1)
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Prevent division by zero
    let scrollPercent = 0;
    if (docHeight > 0) {
        scrollPercent = (scrollTop / docHeight) * 100;
    }

    // 2. Show/Hide button logic
    if (scrollTop > 200) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }

    // 3. Update the circle progress
    setProgress(scrollPercent);
  });

  // Click functionality
  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}