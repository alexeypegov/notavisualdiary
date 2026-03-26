<#include "header.ftl">

<main id="index-grid" class="image-grid">
  <header id="site-header">
    <a href="${vars.blog_url}">
      <h1>${vars.blog_title}</h1>
      <#if vars.blog_subtitle??><h2>${vars.blog_subtitle}</h2></#if>
    </a>
  </header>
  <#list items as note>
    <a href="${note.slug}.html" class="grid-item" title="${note.title}, ${note.year}">
      <img src="${note.cover}" loading="lazy" alt="${note.title}, ${note.year}" onload="this.classList.add('loaded')">
    </a>
  </#list>
</main>

<#include "footer.ftl">
