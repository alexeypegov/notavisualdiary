<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http://fm.alexeypegov.com/</loc>
    <lastmod>${.now?string["yyyy-MM-dd"]}</lastmod>
    <changefreq>weekly</changefreq>
  </url>
<#list items as item>
  <url>
    <loc>${item.loc}</loc>
    <lastmod>${(item.updated)!(item.date)}</lastmod>
  </url>
</#list>
</urlset>
