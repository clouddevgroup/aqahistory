import fs from 'fs';
import path from 'path';
import Head from 'next/head';

export default function Topics({ html }) {
  // Fix relative paths in HTML by using the corrected HTML
  return (
    <>
      <Head>
        <title>Topics - AQA GCSE History Revision</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/css/styles.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <script src="/js/main.js" defer></script>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}

// Server-side rendering to get the HTML content
export async function getStaticProps() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'topics.html');
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Remove the head section and scripts at the end to avoid duplicates
    html = html.replace(/<head>[\s\S]*?<\/head>/, '');
    html = html.replace(/<script[\s\S]*?<\/script>/g, '');
    
    return {
      props: {
        html,
      },
    };
  } catch (error) {
    console.error('Error reading topics.html:', error);
    return {
      props: {
        html: '<h1>Error loading content</h1>',
      },
    };
  }
}