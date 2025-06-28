document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      document.dispatchEvent(new CustomEvent("right"));
    }

    if (e.key === "ArrowLeft") {
      document.dispatchEvent(new CustomEvent("left"));
    }

    if (e.code === "Enter") {
      document.dispatchEvent(new CustomEvent("right"));
    }

    if (e.code === "KeyT") {
      document.dispatchEvent(new CustomEvent("theme"));
    }
    
    if (e.code === "KeyI" || e.code === "Space") {
      document.dispatchEvent(new CustomEvent("info"));
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
});
