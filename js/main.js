/**
 * SABAB MAHABUB - PORTFOLIO INTERACTIVITY SCRIPT
 * Theme: Bordeaux & Gold (Luxury Editorial)
 * Features: Counters, Experience Tabs, CV Modal, Clipboard Toast, Contact Form
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initExperienceFilter();
  initScrollSpy();
  initNumberCounters();
  initContactForm();
  initBackToTop();
});

// Toast notification helper
function showToast(message, icon = '✓') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');
  
  if (!toast) return;
  
  toastMsg.textContent = message;
  toastIcon.textContent = icon;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// Copy to clipboard helper
function copyToClipboard(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied ${label} to clipboard: ${text}`, '📋');
  }).catch(() => {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast(`Copied ${label} to clipboard!`, '📋');
  });
}

// Mobile navigation menu
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('hidden');
    setTimeout(() => {
      mobileMenu.classList.remove('opacity-0', '-translate-y-4');
    }, 10);
  }

  function closeMenu() {
    mobileMenu.classList.add('opacity-0', '-translate-y-4');
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
    }, 300);
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// Experience tab filtering in Bordeaux & Gold
function initExperienceFilter() {
  const tabButtons = document.querySelectorAll('.experience-tab-btn');
  const experienceCards = document.querySelectorAll('.experience-card');

  if (!tabButtons.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update button styles
      tabButtons.forEach(b => {
        b.classList.remove('active', 'bg-[#D9B26B]', 'text-[#43101C]', 'shadow-lg');
        b.classList.add('bg-[#6B2234]', 'text-[#F7EEE2]', 'hover:border-[#D9B26B]/50');
      });

      btn.classList.add('active', 'bg-[#D9B26B]', 'text-[#43101C]', 'shadow-lg');
      btn.classList.remove('bg-[#6B2234]', 'text-[#F7EEE2]', 'hover:border-[#D9B26B]/50');

      // Filter cards
      experienceCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Dynamic Counter Animation
function initNumberCounters() {
  const statElements = document.querySelectorAll('[data-target]');
  if (!statElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        let start = 0;
        const duration = 1600;
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            el.textContent = `${prefix}${target}${suffix}`;
            clearInterval(timer);
          } else {
            el.textContent = `${prefix}${Math.floor(start)}${suffix}`;
          }
        }, stepTime);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.25 });

  statElements.forEach(el => observer.observe(el));
}

// Active link highlighting on scroll
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 140;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-[#D9B26B]', 'font-bold');
      link.classList.add('text-[#CFA9B0]');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-[#D9B26B]', 'font-bold');
        link.classList.remove('text-[#CFA9B0]');
      }
    });
  });
}

// Contact form simulation
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const alertBox = document.getElementById('contact-form-alert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-[#43101C] inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg> Sending message...
      `;
    }

    setTimeout(() => {
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Send Message</span> <span class="text-xs">✦</span>`;
      }
      if (alertBox) {
        alertBox.classList.remove('hidden');
        setTimeout(() => alertBox.classList.add('hidden'), 6000);
      }
      showToast('Thank you! Your message has been sent to Sabab.', '💌');
    }, 1200);
  });
}

// Back to top floating pill
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      btn.classList.add('opacity-100', 'translate-y-0');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      btn.classList.remove('opacity-100', 'translate-y-0');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Modal functions for printable CV
function openCvModal() {
  const modal = document.getElementById('cv-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeCvModal() {
  const modal = document.getElementById('cv-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function printCv() {
  window.print();
}

// Global exposure for inline onclicks
window.copyToClipboard = copyToClipboard;
window.openCvModal = openCvModal;
window.closeCvModal = closeCvModal;
window.printCv = printCv;
