import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Calendar, Home, Menu, X, User, Languages, BookOpen, Contrast, LogOut, LogIn } from 'lucide-react';
import { cn } from '../atoms/Button';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { toggleTheme } = useTheme();
  const { user, signInWithGoogle, signOut } = useAuth();
  const location = useLocation();

  const links = [
    { name: t('nav.home'), path: '/', icon: Home },
    { name: t('nav.timeline'), path: '/timeline', icon: Calendar },
    { name: t('nav.polling'), path: '/locator', icon: MapPin },
    { name: t('nav.learning'), path: '/learn', icon: BookOpen },
    ...(user ? [{ name: t('nav.dashboard'), path: '/dashboard', icon: User }] : []),
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-background/80 backdrop-blur-glass border-b border-white/5 sticky top-0 z-50 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <span className="text-xl font-extrabold tracking-tighter text-text-primary group-hover:text-primary transition-colors">
                THE ELECTION NAVIGATOR
              </span>
              <div className="ml-2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-neon-saffron"></div>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      'relative inline-flex items-center px-1 pt-1 text-xs font-bold uppercase tracking-widest transition-all duration-300',
                      isActive
                        ? 'text-primary'
                        : 'text-text-muted hover:text-text-primary'
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-4 left-0 w-full h-0.5 bg-primary shadow-neon-saffron"></span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="hidden md:flex md:items-center space-x-6">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              className="p-2 rounded-md hover:bg-white/5 text-text-muted hover:text-primary transition-all"
              title="Change Language"
            >
              <Languages className="h-5 w-5" />
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-white/5 text-text-muted hover:text-secondary transition-all"
              title="Toggle Contrast"
            >
              <Contrast className="h-5 w-5" />
            </button>
            <div className="h-8 w-px bg-white/10 mx-2"></div>
            
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="w-10 h-10 rounded-full border border-white/20 p-0.5 hover:border-primary transition-colors overflow-hidden">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <div className="w-full h-full rounded-full bg-surface-high flex items-center justify-center">
                      <User className="h-5 w-5 text-text-secondary" />
                    </div>
                  )}
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="p-2 rounded-md hover:bg-white/5 text-text-muted hover:text-red-500 transition-all"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => signInWithGoogle()}
                className="btn-primary-sovereign py-2 px-6 text-[10px] flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" /> LOGIN
              </button>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-text-muted hover:text-primary transition-all"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-white/5 animate-fade-in">
          <div className="pt-2 pb-6 space-y-1 px-4">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={cn(
                    'flex items-center px-4 py-4 rounded-lg text-sm font-bold uppercase tracking-widest transition-all',
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-text-muted hover:bg-white/5 hover:text-text-primary'
                  )}
                >
                  <Icon className="w-5 h-5 mr-4" />
                  {link.name}
                </Link>
              );
            })}
            {!user ? (
              <button 
                onClick={() => { signInWithGoogle(); closeMenu(); }}
                className="w-full flex items-center px-4 py-4 rounded-lg text-sm font-bold uppercase tracking-widest text-primary hover:bg-primary/5 transition-all"
              >
                <LogIn className="w-5 h-5 mr-4" /> LOGIN
              </button>
            ) : (
              <button 
                onClick={() => { signOut(); closeMenu(); }}
                className="w-full flex items-center px-4 py-4 rounded-lg text-sm font-bold uppercase tracking-widest text-red-500 hover:bg-red-500/5 transition-all"
              >
                <LogOut className="w-5 h-5 mr-4" /> SIGN OUT
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
