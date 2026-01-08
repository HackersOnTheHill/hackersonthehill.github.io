/**
 * Minimal behavior for the landing page:
 * - Initialize AOS for scroll animations
 * - Pause banner animation while the modal is open
 * - Handle light/dark theme toggle
 */
(function() {
  "use strict";

  document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Scroll animation
    if (window.AOS && !prefersReducedMotion.matches) {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }

    // Impact strip count-up
    const countupEls = document.querySelectorAll('[data-countup]');
    if (countupEls.length) {
      const setFinalCount = (el) => {
        const target = Number.parseInt(el.dataset.target, 10);
        if (!Number.isFinite(target)) {
          return;
        }
        const suffix = el.dataset.suffix || '';
        el.textContent = `${target}${suffix}`;
        el.dataset.counted = 'true';
      };

      const animateCount = (el) => {
        if (el.dataset.counted === 'true') {
          return;
        }
        const target = Number.parseInt(el.dataset.target, 10);
        if (!Number.isFinite(target)) {
          return;
        }
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const startTime = performance.now();

        const step = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.round(eased * target);
          el.textContent = `${value}${suffix}`;

          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            el.dataset.counted = 'true';
          }
        };

        window.requestAnimationFrame(step);
      };

      if (prefersReducedMotion.matches) {
        countupEls.forEach(setFinalCount);
      } else if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.4 });

        countupEls.forEach((el) => observer.observe(el));
      } else {
        countupEls.forEach(animateCount);
      }
    }

    // Pause banner animation when modal opens, resume when closed
    const modal2026 = document.getElementById('updates2026Modal');
    if (modal2026) {
      modal2026.addEventListener('show.bs.modal', () => {
        const banner = document.querySelector('.event-banner');
        if (banner) {
          banner.style.animationPlayState = 'paused';
        }
      });
      
      modal2026.addEventListener('hidden.bs.modal', () => {
        const banner = document.querySelector('.event-banner');
        if (banner) {
          banner.style.animationPlayState = 'running';
        }
      });
    }

    // Make banner sticky on load and release after initial scroll
    const banner = document.querySelector('.event-banner');
    if (banner) {
      const releaseThreshold = Math.max(window.innerHeight * 0.5, 320);
      const header = document.getElementById('header');
      const headerHeight = header?.offsetHeight || 0;
      
      const updateBanner = () => {
        const scrolled = window.scrollY >= releaseThreshold;
        banner.classList.toggle('is-hidden', scrolled);
        banner.classList.toggle('is-sticky', !scrolled);
        if (!scrolled) {
          banner.style.top = `${headerHeight}px`;
        }
      };
      
      updateBanner();
      window.addEventListener('scroll', updateBanner, { passive: true });
      window.addEventListener('resize', updateBanner);
    }

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    const getPreferredTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const setTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      if (themeIcon) {
        if (theme === 'dark') {
          themeIcon.classList.remove('fa-moon');
          themeIcon.classList.add('fa-sun');
          themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
          themeIcon.classList.remove('fa-sun');
          themeIcon.classList.add('fa-moon');
          themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
      }
    };

    const toggleTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    };

    if (themeToggle) {
      setTheme(getPreferredTheme());
      themeToggle.addEventListener('click', toggleTheme);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });

    // Close mobile nav when tapping outside the menu
    const navbarCollapse = document.getElementById('navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarCollapse && window.bootstrap && window.bootstrap.Collapse) {
      const collapseInstance = window.bootstrap.Collapse.getOrCreateInstance(navbarCollapse, { toggle: false });
      document.addEventListener('click', (event) => {
        if (!navbarCollapse.classList.contains('show')) {
          return;
        }
        const target = event.target;
        if (navbarCollapse.contains(target) || navbarToggler?.contains(target)) {
          return;
        }
        collapseInstance.hide();
      });
    }
  });
})();
