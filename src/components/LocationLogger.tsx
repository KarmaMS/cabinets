import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function LocationLogger() {
  const { pathname } = useLocation();   // updates on every navigation
  useEffect(() => {
    console.log('📍 Router pathname changed →', pathname);
  }, [pathname]);
  return null;                          // renders nothing visible
}