document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keydown", (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) {
      return;
    }

    if (e.key === "ArrowRight") {
      document.dispatchEvent(new CustomEvent("right"));
    }

    if (e.key === "ArrowLeft") {
      document.dispatchEvent(new CustomEvent("left"));
    }

    if (e.code === "KeyT") {
      document.dispatchEvent(new CustomEvent("theme"));
    }

    if (e.code === "KeyH") {
      document.dispatchEvent(new CustomEvent("home"));
    }
  });

  const f = function (id) {
    return function () {
      const main = document.getElementById("wrapper");

      let slug = main.getAttribute("data-" + id);
      if (slug.length) {
        location.href = slug + ".html";
      }
    };
  };

  const dark = function() {
    const main = document.getElementById("wrapper");
    main.classList.toggle('dark');
  };

  const home = function() {
    location.href = "/";
  }

  document.addEventListener("swiped-left", f("prev"));
  document.addEventListener("swiped-right", f("next"));
  document.addEventListener("swiped-up", home);
  document.addEventListener("left", f("next"));
  document.addEventListener("right", f("prev"));
  document.addEventListener("home", home);
  document.addEventListener("theme", dark);

  const isLeftHalf = (x) => x < window.innerWidth / 2;

  const leftArrow = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><path d='M22 6 L10 16 L22 26' fill='none' stroke='black' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/><path d='M22 6 L10 16 L22 26' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/></svg>") 16 16, w-resize`;
  const rightArrow = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><path d='M10 6 L22 16 L10 26' fill='none' stroke='black' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/><path d='M10 6 L22 16 L10 26' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/></svg>") 16 16, e-resize`;

  const setCursor = (cursor) => {
    document.body.style.cursor = cursor;
    localStorage.setItem("cursor", cursor);
  };

  const savedCursor = localStorage.getItem("cursor");
  if (savedCursor) {
    document.body.style.cursor = savedCursor;
  }

  document.addEventListener("mousemove", (e) => {
    setCursor(isLeftHalf(e.clientX) ? leftArrow : rightArrow);
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest("a, button")) return;
    f(isLeftHalf(e.clientX) ? "next" : "prev")();
  });
});
