import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Practise() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the practice page (American spelling)
    router.replace('/practice');
  }, [router]);
  
  return <div>Redirecting...</div>;
}