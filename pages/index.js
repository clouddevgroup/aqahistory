import { useEffect } from 'react';
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';

export default function Home({ html }) {
  // Render the HTML content directly
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}

// Server-side rendering to get the HTML content
export async function getStaticProps() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'index.html');
    const html = fs.readFileSync(filePath, 'utf8');
    
    return {
      props: {
        html,
      },
    };
  } catch (error) {
    console.error('Error reading index.html:', error);
    return {
      props: {
        html: '<h1>Error loading content</h1>',
      },
    };
  }
}