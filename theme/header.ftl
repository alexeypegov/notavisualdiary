<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, viewport-fit=cover">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

    <link rel="index" id="link-index" href="${vars.blog_url}">
    <#if title?? && year??>
      <#assign full_title = title + ", " + year>
    <#elseif title??>
      <#assign full_title = title>
    <#else>
      <#assign full_title = vars.blog_title>
    </#if>
    <#if title??>
    <title>${title} - ${vars.blog_title}</title>
    <#else>
    <title>${vars.blog_title}</title>
    </#if>

    <!-- opengraph meta -->
    <#if real_slug??>
    <meta property="og:type" content="article">
    <#else>
    <meta property="og:type" content="website">
    </#if>
    <meta property="og:locale" content="en_US">
    <meta property="og:site_name" content="${vars.blog_title}">
    <meta name="keywords" content="${vars.keywords}">
    <meta name="description" content="${vars.description}">
    <meta property="og:description" content="${vars.description}">
    <meta property="og:title" content="${full_title}">
    <#if link??>
      <#assign url = vars.blog_url + link>
    <#elseif ndx?? && ndx gt 1>
      <#assign url = vars.blog_url + "page-" + ndx + ".html">
    <#else>
      <#assign url = vars.blog_url>
    </#if>
    <meta property="og:url" content="${url}">
    <meta name="auto-transition-duration" content="${vars.auto_transition_duration?c}">
    <#assign og_image = cover!vars.default_cover!"images/000.webp">
    <meta property="og:image" content="${vars.blog_url}/${og_image}">
    <meta property="og:image:type" content="image/webp">
    <meta property="og:image:alt" content="${full_title}">

    <!-- twitter card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${full_title}">
    <meta name="twitter:description" content="${vars.description}">
    <meta name="twitter:image" content="${vars.blog_url}/${og_image}">

    <!-- structured data for google -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      <#if real_slug??>
      "@type": "ImageObject",
      "name": "${title}",
      "description": "${full_title}",
      "contentUrl": "${vars.blog_url}/${image}",
      "thumbnailUrl": "${vars.blog_url}/${cover}",
      "author": {
        "@type": "Person",
        "name": "${vars.blog_author}"
      },
      "datePublished": "${date}"
      <#else>
      "@type": "WebSite",
      "name": "${vars.blog_title}",
      "url": "${vars.blog_url}",
      "description": "${vars.description}",
      "author": {
        "@type": "Person",
        "name": "${vars.blog_author}"
      }
      </#if>
    }
    </script>

    <link rel="shortcut icon" type="image/ico" href="favicon.ico">
    <link rel="alternate" type="application/atom+xml" title="All images" href="${vars.feed_url}">
    <link rel="stylesheet" type="text/css" href="styles/styles.css?seed=${vars.version}">

    <#macro prefetch slug>
    <#if slug?has_content>
    <link rel="prefetch" href="${slug}.html">
    <link rel="preload" href="images/${slug}.webp" as="image" type="image/webp" imagesrcset="images/${slug}.webp 1x, images/${slug}@2x.webp 2x">
    </#if>
    </#macro>
    <@prefetch prev!""/>
    <@prefetch next!""/>

    <script src="js/pic.js?seed=${vars.version}"></script>
    <script src="js/swiped-events.min.js?seed=${vars.version}"></script>
    <script src="js/app.js?seed=${vars.version}"></script>
  </head>
<#if real_slug??>
<body class="wrapper">
<#else>
<body>
</#if>
