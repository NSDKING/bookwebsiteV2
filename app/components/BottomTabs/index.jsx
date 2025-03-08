 
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome as solidHome } from '@fortawesome/free-solid-svg-icons';
import { faCompass as solidCompass, faInfoCircle as regularInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation'
import './index.css';

export default function BottomTab() {
  const pathname = usePathname();
  

  return (
    <div className="bottom-tab">
      <Link href="/" className={`tab-item ${pathname === '/' ? 'active' : ''}`}>
        <FontAwesomeIcon icon={solidHome } className="tab-icon" />
        <span>Accueil</span>
      </Link>
      <Link href="/discovery" className={`tab-item ${pathname === '/discovery' ? 'active' : ''}`}>
        <FontAwesomeIcon icon={ solidCompass  } className="tab-icon" />
        <span>Découverte</span>
      </Link>
      <Link href="/contact" className={`tab-item ${pathname === '/about' ? 'active' : ''}`}>
      <FontAwesomeIcon icon={faInfoCircle} className="tab-icon" />
      <span>Contact</span>
      </Link>
    </div>
  );
}
