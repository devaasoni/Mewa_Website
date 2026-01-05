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
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active")
        }
      })

      // Toggle current item
      item.classList.toggle("active")
    })
  })
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
      navbar.style.background = "rgba(10, 10, 15, 0.95)"
      navbar.style.boxShadow = "0 10px 40px rgba(0,0,0,0.3)"
    } else {
      navbar.style.background = "rgba(10, 10, 15, 0.8)"
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
  initFAQAccordion()
  initProfitCalculator()
  initSmoothScroll()
  initNavbarScroll()
  initDropdownMenus()
  activateBenefitsShowcase()
  initContactForm()
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
// FAQ ACCORDION
// =====================================================
function initFAQAccordion() {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active")
        }
      })

      // Toggle current item
      item.classList.toggle("active")
    })
  })
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
      navbar.style.background = "rgba(10, 10, 15, 0.95)"
      navbar.style.boxShadow = "0 10px 40px rgba(0,0,0,0.3)"
    } else {
      navbar.style.background = "rgba(10, 10, 15, 0.8)"
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
