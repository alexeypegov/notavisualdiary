document.addEventListener("DOMContentLoaded", function () {
  const isDesktop = !('ontouchstart' in window);
  let autoTransitionTimer = null;
  let autoTransitionStartTime = null;
  let pausedElapsed = 0;
  let animationFrame = null;
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

  const updateProgressBar = () => {
    if (!autoTransitionStartTime) return;
    
    const elapsed = Date.now() - autoTransitionStartTime + pausedElapsed;
    const progress = Math.min(elapsed / TRANSITION_DURATION, 1);
    
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
      progressBar.style.width = (progress * 100) + '%';
    }
    
    if (progress < 1) {
      animationFrame = requestAnimationFrame(updateProgressBar);
    }
  };

  const startAutoTransition = () => {
    if (!isDesktop || isInfoOverlayVisible()) return;

    setAutoTransition(true);
    
    if (autoTransitionTimer) {
      clearTimeout(autoTransitionTimer);
    }
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
    
    autoTransitionStartTime = Date.now();
    localStorage.setItem('autoTransitionStartTime', autoTransitionStartTime);

    const remainingTime = TRANSITION_DURATION - pausedElapsed;
    
    updateProgressBar();
    
    autoTransitionTimer = setTimeout(() => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
      const progressBar = document.querySelector('.progress-bar');
      if (progressBar) {
        progressBar.style.width = '0%';
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
    
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
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
    if (e.key === "ArrowRight") {
      document.dispatchEvent(new CustomEvent("stop-auto"));
      document.dispatchEvent(new CustomEvent("right"));
    }

    if (e.key === "ArrowLeft") {
      document.dispatchEvent(new CustomEvent("stop-auto"));
      document.dispatchEvent(new CustomEvent("left"));
    }

    if (e.code === "Enter") {
      document.dispatchEvent(new CustomEvent("stop-auto"));
      document.dispatchEvent(new CustomEvent("right"));
    }

    if (e.code === "KeyT") {
      document.dispatchEvent(new CustomEvent("stop-auto"));
      document.dispatchEvent(new CustomEvent("theme"));
    }
    
    if (e.code === "KeyI") {
      document.dispatchEvent(new CustomEvent("stop-auto"));
      document.dispatchEvent(new CustomEvent("info"));
    }


    if (e.code === "Space") {
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

  document.addEventListener("swiped-left", f("prev"));
  document.addEventListener("swiped-right", f("next"));
  document.addEventListener("left", f("next"));
  document.addEventListener("right", f("prev"));

  document.addEventListener("click", info);
  document.addEventListener("info", info);

  document.addEventListener("theme", dark);

  document.addEventListener("stop-auto", stopAutoTransition);
  document.addEventListener("toggle-auto", toggleAutoTransition);
});
