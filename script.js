// Sidebar toggle for mobile
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(event) {
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.querySelector('.mobile-menu-btn');
  
  if (window.innerWidth <= 968) {
    if (!sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
      sidebar.classList.remove('active');
    }
  }
});

// Cookie Consent Functions
function acceptCookies() {
  localStorage.setItem('cookieConsent', 'accepted');
  document.getElementById('cookieNotice').classList.remove('show');
  initAnalytics();
}

function declineCookies() {
  localStorage.setItem('cookieConsent', 'declined');
  document.getElementById('cookieNotice').classList.remove('show');
}

function initAnalytics() {
  // Initialize your analytics tracking here
  console.log('Analytics initialized - cookie consent accepted');
  
  // Example: Google Analytics 4
  // Uncomment and add your Measurement ID
  
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YH5TSY3JKM');
  
  // You can also add other analytics tools here:
  // - Plausible Analytics
  // - Matomo
  // - Custom tracking solution
}

// Check cookie consent on page load
window.addEventListener('load', function() {
  const consent = localStorage.getItem('cookieConsent');
  const cookieNotice = document.getElementById('cookieNotice');
  
  if (consent) {
    // User has already made a choice
    cookieNotice.classList.remove('show');
    
    if (consent === 'accepted') {
      initAnalytics();
    }
  } else {
    // Show cookie notice after a short delay
    setTimeout(function() {
      cookieNotice.classList.add('show');
    }, 1000);
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu if open
      if (window.innerWidth <= 968) {
        document.getElementById('sidebar').classList.remove('active');
      }
    }
  });
});

// Update active nav link on scroll
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('.content-section');
  const navLinks = document.querySelectorAll('.sidebar-nav a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current || 
        (current === 'home' && link.getAttribute('href') === '#home')) {
      link.classList.add('active');
    }
  });
});
