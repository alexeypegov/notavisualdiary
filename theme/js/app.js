document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      document.dispatchEvent(
        new CustomEvent("right", {
          detail: { direction: "right" },
        }),
      );
    }

    if (e.key === "ArrowLeft") {
      document.dispatchEvent(
        new CustomEvent("left", {
          detail: { direction: "left" },
        }),
      );
    }

    if (e.code === "Space") {
      document.dispatchEvent(new CustomEvent("info"));
    }

    if (e.code === "KeyB") {
      document.dispatchEvent(new CustomEvent("toggle-dark"));
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

  document.addEventListener("toggle-dark", dark);
});
