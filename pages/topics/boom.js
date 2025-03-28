import fs from 'fs';
import path from 'path';
import Head from 'next/head';

export default function BoomTopic({ html }) {
  return (
    <>
      <Head>
        <title>The Economic Boom - AQA GCSE History Revision</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/css/styles.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <script src="/js/main.js" defer></script>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}

export async function getStaticProps() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'topics', 'boom.html');
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Remove the head section and scripts at the end to avoid duplicates
    html = html.replace(/<head>[\s\S]*?<\/head>/, '');
    html = html.replace(/<script[\s\S]*?<\/script>/g, '');
    
    // Fix all relative links in the HTML
    html = html.replace(/href="..\/css\//g, 'href="/css/');
    html = html.replace(/src="..\/js\//g, 'src="/js/');
    html = html.replace(/href="..\/images\//g, 'href="/images/');
    html = html.replace(/src="..\/images\//g, 'src="/images/');
    
    // Fix navigation links
    html = html.replace(/href="..\/index.html"/g, 'href="/"');
    html = html.replace(/href="..\/practice.html"/g, 'href="/practice"');
    html = html.replace(/href="..\/topics.html"/g, 'href="/topics"');
    html = html.replace(/href="..\/about.html"/g, 'href="/about"');
    html = html.replace(/href="..\/contact.html"/g, 'href="/contact"');
    html = html.replace(/href="..\/privacy.html"/g, 'href="/privacy"');
    
    return {
      props: {
        html,
      },
    };
  } catch (error) {
    console.error('Error reading boom.html:', error);
    return {
      props: {
        html: '<h1>Error loading content</h1>',
      },
    };
  }
}