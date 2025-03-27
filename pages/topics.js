import fs from 'fs';
import path from 'path';

export default function Topics({ html }) {
  // Render the HTML content directly
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}

// Server-side rendering to get the HTML content
export async function getStaticProps() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'topics.html');
    const html = fs.readFileSync(filePath, 'utf8');
    
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