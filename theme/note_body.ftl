<#setting locale="en_US">
<#setting date_format="dd MMMM yyyy">

<#assign class=orientation!"horizontal">
<#assign parsed=date?date("yyyy-MM-dd")>

<main class="${class}" data-prev="${prev!""}" data-next="${next!""}">
  <header>
    <#assign next_link>
      <#if next == slug>
      next
      <#else>
      <a href="${prev}.html">next</a>
      </#if>
    </#assign>
    <a href="/">${vars.blog_title}</a> · ${index} of ${count} · ${next_link} 
  </header>
  <article>
    ${body}
  </article>
</main>