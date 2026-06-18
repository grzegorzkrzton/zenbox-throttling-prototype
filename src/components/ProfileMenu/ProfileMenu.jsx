import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../contexts';
import { SunIcon, MoonIcon } from '../Icons';
import { assetUrl } from '../../utils/assetUrl';
import './ProfileMenu.css';

export default function ProfileMenu({ className = '' }) {
  const { theme, toggleTheme, isDarkModeAllowed } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`profile-menu ${className}`} ref={menuRef}>
      <button 
        className={`profile-menu__avatar ${isOpen ? 'profile-menu__avatar--active' : ''}`}
        title="Profile"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="profile-menu__avatar-img">
          <img src={assetUrl('/assets/Avatar.png')} alt="Profile avatar" />
        </div>
      </button>

      {isOpen && (
        <div className="profile-menu__dropdown">
          <div className="profile-menu__info">
            <div className="profile-menu__info-avatar">
              <span>JD</span>
            </div>
            <div className="profile-menu__info-details">
              <span className="profile-menu__info-name">John Doe</span>
              <span className="profile-menu__info-email">john.doe@company.com</span>
            </div>
          </div>
          
          {isDarkModeAllowed && (
            <>
              <div className="profile-menu__divider" />

              <div className="profile-menu__theme">
                <span className="profile-menu__theme-label">Theme</span>
                <button 
                  className="profile-menu__theme-toggle" 
                  title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                  onClick={toggleTheme}
                >
                  <div className="profile-menu__theme-track">
                    <SunIcon className="profile-menu__theme-icon profile-menu__theme-icon--sun" />
                    <MoonIcon className="profile-menu__theme-icon profile-menu__theme-icon--moon" />
                    <div className={`profile-menu__theme-thumb ${theme === 'dark' ? 'profile-menu__theme-thumb--dark' : ''}`} />
                  </div>
                </button>
              </div>
            </>
          )}

          <div className="profile-menu__divider" />
          
          <button className="profile-menu__item">
            Settings
          </button>
          <button className="profile-menu__item profile-menu__item--danger">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}





