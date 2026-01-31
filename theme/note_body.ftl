<#setting locale="en_US">
<#setting date_format="dd MMMM yyyy">

<#assign parsed=date?date("yyyy-MM-dd")>

<main id="wrapper" class="${bg!""}" data-prev="${prev!""}" data-next="${next!""}">
  <custom-pic src="${image?replace("@2x", "")}" srcset="${image?replace("@2x", "")} 1x, ${image} 2x"></custom-pic>
  <div class="info">
    <div class="title">${title}, ${year!"unknown"}</div>
  </div>
</main>
