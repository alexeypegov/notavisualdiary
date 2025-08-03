document.addEventListener("DOMContentLoaded", function () {
  const isDesktop = !('ontouchstart' in window);
  
  const isTVBrowser = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    
    return userAgent.includes('smart-tv') || 
           userAgent.includes('tizen') || 
           userAgent.includes('webos') || 
           userAgent.includes('netcast') || 
           userAgent.includes('tv') || 
           userAgent.includes('smarttv') || 
           userAgent.includes('bravia') || 
           userAgent.includes('googletv') || 
           userAgent.includes('appletv') ||
           (userAgent.includes('samsung') && userAgent.includes('tv')) ||
           (userAgent.includes('lg') && userAgent.includes('browser'));
  };

  let autoTransitionTimer = null;
  let autoTransitionStartTime = null;
  let pausedElapsed = 0;
  let updateTimer = null;

  const TRANSITION_DURATION = parseInt(document.querySelector('meta[name="auto-transition-duration"]')?.content) || 3000;
  const TIMEOUT_DURATION = 20 * 1000; // 20 seconds in milliseconds

  const isAutoTransitionEnabled = () => {
    return isDesktop && localStorage.getItem('autoTransition') === 'true';
  };

  const setAutoTransition = (enabled) => {
    if (enabled) {
      localStorage.setItem('autoTransition', 'true');
    } else {
      localStorage.removeItem('autoTransition');
    }
  };

  const isAutoTransitionTimedOut = () => {
    const lastAutoTransitionStartTime = localStorage.getItem('autoTransitionStartTime');
    if (!lastAutoTransitionStartTime) return false;
    return Date.now() - lastAutoTransitionStartTime > TIMEOUT_DURATION;
  };


  const isInfoOverlayVisible = () => {
    const overlay = document.querySelector('.overlay');
    return overlay && overlay.style.display !== 'none';
  };

  const updateProgressIndicator = () => {
    if (!autoTransitionStartTime) return;
    
    const elapsed = Date.now() - autoTransitionStartTime + pausedElapsed;
    const progress = Math.min(elapsed / TRANSITION_DURATION, 1);
    
    const chars = ['█', '▙', '▌', '▘', ''];
    const charIndex = Math.floor(progress * chars.length);
    const char = chars[Math.min(charIndex, chars.length - 1)];
    
    const indicator = document.querySelector('.progress-indicator');
    if (indicator) {
      indicator.textContent = char;
    }
  };

  const startAutoTransition = () => {
    if (!isDesktop || isInfoOverlayVisible()) return;

    setAutoTransition(true);
    
    if (autoTransitionTimer) {
      clearTimeout(autoTransitionTimer);
    }
    if (updateTimer) {
      clearInterval(updateTimer);
    }
    
    // Show and reset indicator
    const indicator = document.querySelector('.progress-indicator');
    if (indicator) {
      indicator.style.display = 'block';
      indicator.textContent = '█';
    }
    
    autoTransitionStartTime = Date.now();
    localStorage.setItem('autoTransitionStartTime', autoTransitionStartTime);

    const remainingTime = TRANSITION_DURATION - pausedElapsed;
    
    updateProgressIndicator();
    updateTimer = setInterval(updateProgressIndicator, 100);
    
    autoTransitionTimer = setTimeout(() => {
      if (updateTimer) {
        clearInterval(updateTimer);
        updateTimer = null;
      }
      const indicator = document.querySelector('.progress-indicator');
      if (indicator) {
        indicator.textContent = '█';
      }
      pausedElapsed = 0;
      document.dispatchEvent(new CustomEvent("right"));
    }, remainingTime);
  };

  const stopAutoTransition = () => {
    if (!isDesktop) return;

    setAutoTransition(false);
    localStorage.removeItem('autoTransitionStartTime');
        
    if (autoTransitionStartTime) {
      pausedElapsed += Date.now() - autoTransitionStartTime;
      autoTransitionStartTime = null;
    }
    
    if (autoTransitionTimer) {
      clearTimeout(autoTransitionTimer);
      autoTransitionTimer = null;
    }
    
    if (updateTimer) {
      clearInterval(updateTimer);
      updateTimer = null;
    }
    
    const indicator = document.querySelector('.progress-indicator');
    if (indicator) {
      indicator.style.display = 'none';
    }
  };

  const toggleAutoTransition = () => {
    if (isAutoTransitionEnabled()) {
      stopAutoTransition();
    } else {
      startAutoTransition();
    }
  };

  document.addEventListener("keydown", (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) {
      return;
    }
    
    if (e.key === "ArrowRight") {
      document.dispatchEvent(new CustomEvent("stop-auto"));
      document.dispatchEvent(new CustomEvent("right"));
    }

    if (e.key === "ArrowLeft") {
      document.dispatchEvent(new CustomEvent("stop-auto"));
      document.dispatchEvent(new CustomEvent("left"));
    }

    if (e.code === "KeyT") {
      document.dispatchEvent(new CustomEvent("stop-auto"));
      document.dispatchEvent(new CustomEvent("theme"));
    }
    
    if (e.code === "Space") {
      document.dispatchEvent(new CustomEvent("stop-auto"));
      document.dispatchEvent(new CustomEvent("info"));
    }


    if (e.code === "Enter") {
      document.dispatchEvent(new CustomEvent("toggle-auto"))
    }
  });

  if (isAutoTransitionEnabled()) {
    if (isAutoTransitionTimedOut()) {
      console.warn('Auto-transition timed out (20 seconds exceeded), disabling auto-transition');
      setAutoTransition(false);
    } else {
      startAutoTransition();
    }
  }
  
  // Initialize indicator
  const indicator = document.querySelector('.progress-indicator');
  if (indicator && !isAutoTransitionEnabled()) {
    indicator.style.display = 'none';
  }

  const f = function (id) {
    return function () {
      const main = document.getElementById("wrapper");

      let slug = main.getAttribute("data-" + id);
      if (slug.length) {
        location.href = slug + ".html";
      }
    };
  };

  const info = function () {
    const overlay = document.querySelector(".overlay");
    overlay.style.display = overlay.style.display === "none" ? "block" : "none";
  };

  const dark = function() {
    const main = document.getElementById("wrapper");
    main.classList.toggle('dark');
  };

  const click = function() {
    if (isTVBrowser()) {
      toggleAutoTransition();
    } else {
      info();
    }
  };

  document.addEventListener("swiped-left", f("prev"));
  document.addEventListener("swiped-right", f("next"));
  document.addEventListener("left", f("next"));
  document.addEventListener("right", f("prev"));

  document.addEventListener("click", click);
  document.addEventListener("info", info);

  document.addEventListener("theme", dark);

  document.addEventListener("stop-auto", stopAutoTransition);
  document.addEventListener("toggle-auto", toggleAutoTransition);
});
