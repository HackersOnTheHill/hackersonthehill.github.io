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
  });
})();
