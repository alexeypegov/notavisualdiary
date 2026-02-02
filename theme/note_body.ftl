<#assign src = image?replace("@2x", "")>

<main id="wrapper" class="${bg!""}" data-prev="${prev!""}" data-next="${next!""}">
  <div class="pic-container">
    <custom-pic src="${src}" srcset="${src} 1x, ${image} 2x"></custom-pic>
  </div>
  <div class="info">
    <div class="title">${title}, ${year!"unknown"}</div>
    <div class="nav"><a href="index.html">home</a> · <a href="page-1.html">index</a> · <a href="about.html">about</a></div>
  </div>
</main>
