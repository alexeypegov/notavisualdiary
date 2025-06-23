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

  document.addEventListener("swiped-left", f("next"));
  document.addEventListener("swiped-right", f("prev"));
  document.addEventListener("left", f("prev"));
  document.addEventListener("right", f("next"));

  document.addEventListener("click", info);
  document.addEventListener("info", info);
});
