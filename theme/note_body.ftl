<#setting locale="en_US">
<#setting date_format="dd MMMM yyyy">

<#assign class=orientation!"horizontal">
<#assign parsed=date?date("yyyy-MM-dd")>

<main class="${class}" data-prev="${prev!""}" data-next="${next!""}">
  <header>
    <a href="/">${vars.blog_title}</a> ∷ <a href="${prev}.html">previous</a> – <a href="${next}.html">next</a> 
  </header>
  <article>
    ${body}
  </article>
</main>