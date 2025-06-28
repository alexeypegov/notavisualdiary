<#setting locale="en_US">
<#setting date_format="dd MMMM yyyy">

<#assign parsed=date?date("yyyy-MM-dd")>

<main id="wrapper" class="${bg!""}" data-prev="${prev!""}" data-next="${next!""}">
  <div class="overlay" style="display: none">
    <div class="content">
      <div class="author">${vars.blog_title}</div>
      <div class="title">${title}</div>
      <div class="help"><span class="key">&lt;</span> <span class="key">&gt;</span> <span class="key">i</span> <span class="key">t</span> / <span class="swiping">👆</span></div>
    </div>
  </div>
  <custom-pic src="${image}"/>
</main>
