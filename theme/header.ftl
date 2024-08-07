<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1">

    <link rel="index" id="link-index" href="${vars.blog_url}">
    <title>${title} - ${vars.blog_title}</title>

    <!-- opengraph meta, etc -->
    <meta property="og:type" content="website">
    <meta property="og:locale" content="en_US">
    <meta property="og:site_name" content="${vars.blog_title}">
    <meta name="keywords" content="${vars.keywords}">
    <meta name="description" content="${vars.description}">
    <meta property="og:description" content="${vars.description}">
    <meta property="og:title" content="${title}">
    <meta property="og:url" content="${vars.blog_url + link}">
    <#if cover??>
    <meta property="og:image" content="${vars.blog_url + "/" + cover}"/>
    </#if>

    <link rel="shortcut icon" type="image/ico" href="favicon.ico">
    <link rel="alternate" type="application/atom+xml" title="All images" href="${vars.feed_url}">
    <link rel="stylesheet" type="text/css" href="styles/styles.css">

    <script src="js/app.js?seed=${.now?string["HHmmss"]}"></script>
  </head>
<#if real_slug??>
<body class="wrapper">
<#else>
<body>
</#if>
