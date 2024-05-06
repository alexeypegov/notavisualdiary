<#setting locale="en_US">
<#setting date_format="dd MMMM yyyy">

<#assign class=orientation!"horizontal">
<#assign parsed=date?date("yyyy-MM-dd")>

<main class="${class}" data-prev="${prev!""}" data-next="${next!""}">
  <header>
    <#assign next_link>
      <#if next == slug>
      previous
      <#elseif index == 1>
      <a href="${prev}.html">start over</a>
      <#else>
      <a href="${prev}.html">previous</a>
      </#if>
    </#assign>
    <a href="/">${vars.blog_title}</a> · <a href="000.html"/>about</a> · ${index} of ${count} · ${next_link} 
  </header>
  <article>
    ${body}
  </article>
</main>
