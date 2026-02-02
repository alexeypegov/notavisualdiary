<#setting date_format="yyyy-MM-dd'T00:00:00+00:00'">
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:base="${base_url}">
  <title>${vars.blog_title}</title>
  <link href="${vars.blog_url}/${name}.xml" rel="self" />
  <link href="${vars.blog_url}" rel="alternate" />
  <id>${vars.blog_url}/</id>
  <updated>${items[0].date?date("yyyy-MM-dd")?date}</updated>
  <author>
    <name>${vars.feed_author}</name>
    <email>${vars.feed_email}</email>
  </author>
  <#list items as note>
    <entry>
      <title><![CDATA[#${note.slug}]]></title>
      <link href="${vars.blog_url}${note.link}" />
      <id>urn:uuid:${note.uuid}</id>
      <updated>${note.date?date("yyyy-MM-dd")?date}</updated>
      <content type="html">
	<![CDATA[
        <img src="${vars.blog_url}/${note.cover}" alt="${note.title}"/>
        <p>${note.title}, ${note.year}</p>
	]]>
      </content>
    </entry>
  </#list>
</feed>
