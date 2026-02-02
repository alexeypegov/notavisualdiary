<#include "header.ftl">

<main id="index-grid" class="image-grid">
  <#list items as note>
    <a href="${note.slug}.html" class="grid-item" title="${note.title}, ${note.year}">
      <img src="${note.cover}" loading="lazy" alt="${note.title}, ${note.year}" onload="this.classList.add('loaded')">
    </a>
  </#list>
</main>

<#include "footer.ftl">
