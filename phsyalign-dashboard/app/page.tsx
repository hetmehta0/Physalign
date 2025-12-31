'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn === 'true') {
      // If logged in, go to patients page
      router.push('/patients');
    } else {
      // If not logged in, go to sign in page
      router.push('/signin');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <p className="text-gray-600">Loading...</p>
    </div>
  );
}