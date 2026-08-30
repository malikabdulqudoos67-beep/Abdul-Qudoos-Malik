import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Property, 
  Appointment, 
  UserProfile, 
  SiteContentConfig, 
  CurrencyCode, 
  FilterState, 
  AppointmentStatus,
  ContactInquiry
} from '../types';
import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  fbSignOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged, 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot 
} from '../firebase';
import { INITIAL_PROPERTIES, INITIAL_SITE_CONTENT, INITIAL_APPOINTMENTS } from '../data/initialData';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface RealEstateContextType {
  // Auth
  currentUser: UserProfile | null;
  isAdmin: boolean;
  isAuthLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  demoAdminLogin: () => Promise<void>;
  logout: () => Promise<void>;
  
  // Data
  properties: Property[];
  appointments: Appointment[];
  siteContent: SiteContentConfig;
  inquiries: ContactInquiry[];
  favorites: string[];
  toggleFavorite: (propId: string) => void;
  
  // Currency
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (amount: number, listingType?: 'sale' | 'rent') => string;
  
  // Filters & Navigation
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  selectedProperty: Property | null;
  setSelectedProperty: (p: Property | null) => void;
  
  // Modals
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  bookingTargetProperty: Property | null;
  openBookingForProperty: (p: Property) => void;
  isMortgageCalcOpen: boolean;
  setIsMortgageCalcOpen: (open: boolean) => void;
  activeView: 'home' | 'listings' | 'ai_architect' | 'appointments' | 'admin' | 'about' | 'contact';
  setActiveView: (view: 'home' | 'listings' | 'ai_architect' | 'appointments' | 'admin' | 'about' | 'contact') => void;
  
  // Actions
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => Promise<void>;
  updateProperty: (id: string, property: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  bookAppointment: (aptData: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => Promise<Appointment>;
  updateAppointmentStatus: (id: string, status: AppointmentStatus, adminNotes?: string) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
  submitInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateSiteContent: (content: Partial<SiteContentConfig>) => Promise<void>;
  
  // Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  propertyType: 'all',
  listingType: 'all',
  location: '',
  minPrice: 0,
  maxPrice: 50000000,
  bedrooms: 'all',
  bathrooms: 'all',
  amenities: [],
  sortBy: 'featured'
};

const RealEstateContext = createContext<RealEstateContextType | undefined>(undefined);

export const RealEstateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('abdul_realestate_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  
  // App Data state
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('abdul_realestate_properties');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('abdul_realestate_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });
  const [siteContent, setSiteContent] = useState<SiteContentConfig>(() => {
    const saved = localStorage.getItem('abdul_realestate_site_content');
    return saved ? JSON.parse(saved) : INITIAL_SITE_CONTENT;
  });
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('abdul_realestate_favs');
    return saved ? JSON.parse(saved) : ['prop-1'];
  });

  // UI / Navigation State
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingTargetProperty, setBookingTargetProperty] = useState<Property | null>(null);
  const [isMortgageCalcOpen, setIsMortgageCalcOpen] = useState(false);
  const [activeView, setActiveView] = useState<'home' | 'listings' | 'ai_architect' | 'appointments' | 'admin' | 'about' | 'contact'>('home');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('abdul_realestate_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('abdul_realestate_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('abdul_realestate_site_content', JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    localStorage.setItem('abdul_realestate_favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('abdul_realestate_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('abdul_realestate_user');
    }
  }, [currentUser]);

  // Firestore Sync Listeners
  useEffect(() => {
    let unsubProps = () => {};
    let unsubApts = () => {};
    let unsubContent = () => {};

    try {
      // Sync properties collection
      const propsCol = collection(db, 'properties');
      unsubProps = onSnapshot(propsCol, (snapshot) => {
        if (!snapshot.empty) {
          const loaded: Property[] = [];
          snapshot.forEach(docSnap => {
            loaded.push({ id: docSnap.id, ...(docSnap.data() as any) });
          });
          setProperties(loaded);
        } else {
          // If empty in remote Firestore, seed with initial properties
          INITIAL_PROPERTIES.forEach(async (p) => {
            try {
              await setDoc(doc(db, 'properties', p.id), p);
            } catch (err) {
              console.warn('Could not seed property to Firestore:', err);
            }
          });
        }
      }, (err) => {
        console.warn('Firestore properties snapshot error:', err);
      });

      // Sync appointments collection
      const aptsCol = collection(db, 'appointments');
      unsubApts = onSnapshot(aptsCol, (snapshot) => {
        if (!snapshot.empty) {
          const loadedApts: Appointment[] = [];
          snapshot.forEach(docSnap => {
            loadedApts.push({ id: docSnap.id, ...(docSnap.data() as any) });
          });
          setAppointments(loadedApts);
        }
      }, (err) => {
        console.warn('Firestore appointments snapshot error:', err);
      });

      // Sync site content
      const contentDoc = doc(db, 'siteContent', 'main');
      unsubContent = onSnapshot(contentDoc, (docSnap) => {
        if (docSnap.exists()) {
          setSiteContent(docSnap.data() as SiteContentConfig);
        }
      }, (err) => {
        console.warn('Firestore siteContent snapshot error:', err);
      });

    } catch (err) {
      console.warn('Firestore initialization fallback active:', err);
    }

    return () => {
      unsubProps();
      unsubApts();
      unsubContent();
    };
  }, []);

  // Firebase Auth Listener
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        // Check if demo admin or user
        const isAdminUser = fbUser.email?.toLowerCase().includes('admin') || fbUser.email === 'malikabdulqudoos67@gmail.com';
        setCurrentUser({
          uid: fbUser.uid,
          email: fbUser.email || '',
          displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Discerning Client',
          role: isAdminUser ? 'admin' : 'client',
          photoURL: fbUser.photoURL || undefined,
          favorites: favorites,
          createdAt: new Date().toISOString()
        });
      } else {
        // Keep local user if demo admin was signed in manually without Firebase session
        setCurrentUser(prev => (prev?.email === 'admin@abdulsrealestate.com' ? prev : null));
      }
      setIsAuthLoading(false);
    });

    return () => unsubAuth();
  }, []);

  // Auth Methods
  const loginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const isAdminUser = user.email?.toLowerCase().includes('admin') || user.email === 'malikabdulqudoos67@gmail.com';
      
      const profile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Distinguished Guest',
        role: isAdminUser ? 'admin' : 'client',
        photoURL: user.photoURL || undefined,
        favorites: favorites,
        createdAt: new Date().toISOString()
      };
      
      setCurrentUser(profile);
      showToast(`Welcome back, ${profile.displayName}!`, 'success');
      setIsAuthModalOpen(false);
    } catch (err: any) {
      console.error('Google Sign-in error:', err);
      showToast(err.message || 'Google sign-in failed', 'error');
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    try {
      // Check demo admin bypass
      if ((email.trim().toLowerCase() === 'admin' || email.trim().toLowerCase() === 'admin@abdulsrealestate.com') && pass === 'Admin@123') {
        const adminProfile: UserProfile = {
          uid: 'admin-master-uid',
          email: 'admin@abdulsrealestate.com',
          displayName: 'Abdul Malik (Executive Director)',
          role: 'admin',
          photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          favorites: favorites,
          createdAt: new Date().toISOString()
        };
        setCurrentUser(adminProfile);
        showToast('Authenticated as Executive Admin', 'success');
        setIsAuthModalOpen(false);
        return;
      }

      const res = await signInWithEmailAndPassword(auth, email, pass);
      const user = res.user;
      const isAdminUser = user.email?.toLowerCase().includes('admin');
      
      const profile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || email.split('@')[0],
        role: isAdminUser ? 'admin' : 'client',
        photoURL: user.photoURL || undefined,
        favorites: favorites,
        createdAt: new Date().toISOString()
      };
      
      setCurrentUser(profile);
      showToast(`Welcome back, ${profile.displayName}!`, 'success');
      setIsAuthModalOpen(false);
    } catch (err: any) {
      // If Firebase auth fails but credentials match demo admin
      if ((email.trim().toLowerCase() === 'admin' || email.trim().toLowerCase() === 'admin@abdulsrealestate.com') && pass === 'Admin@123') {
        const adminProfile: UserProfile = {
          uid: 'admin-master-uid',
          email: 'admin@abdulsrealestate.com',
          displayName: 'Abdul Malik (Executive Director)',
          role: 'admin',
          photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          favorites: favorites,
          createdAt: new Date().toISOString()
        };
        setCurrentUser(adminProfile);
        showToast('Logged in as Executive Admin', 'success');
        setIsAuthModalOpen(false);
        return;
      }
      console.error('Email sign in error:', err);
      showToast(err.message || 'Invalid credentials', 'error');
      throw err;
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(res.user, { displayName: name });
      
      const profile: UserProfile = {
        uid: res.user.uid,
        email: res.user.email || '',
        displayName: name,
        role: 'client',
        favorites: favorites,
        createdAt: new Date().toISOString()
      };
      
      setCurrentUser(profile);
      showToast(`Welcome to Abdul's Real Estate, ${name}!`, 'success');
      setIsAuthModalOpen(false);
    } catch (err: any) {
      console.error('Sign up error:', err);
      showToast(err.message || 'Registration failed', 'error');
      throw err;
    }
  };

  const demoAdminLogin = async () => {
    const adminProfile: UserProfile = {
      uid: 'admin-master-uid',
      email: 'admin@abdulsrealestate.com',
      displayName: 'Abdul Malik (Executive Director)',
      role: 'admin',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      favorites: favorites,
      createdAt: new Date().toISOString()
    };
    setCurrentUser(adminProfile);
    showToast('Demo Admin authenticated successfully!', 'success');
    setIsAuthModalOpen(false);
  };

  const logout = async () => {
    try {
      await fbSignOut(auth);
    } catch (e) {
      console.warn('Sign out error:', e);
    }
    setCurrentUser(null);
    showToast('Signed out successfully', 'info');
    if (activeView === 'admin') {
      setActiveView('home');
    }
  };

  // Favorites
  const toggleFavorite = (propId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(propId);
      const next = exists ? prev.filter(id => id !== propId) : [...prev, propId];
      showToast(exists ? 'Removed from favorites' : 'Saved to favorites', 'info');
      return next;
    });
  };

  // Currency formatting
  const formatPrice = (amount: number, listingType?: 'sale' | 'rent') => {
    let rate = 1;
    let symbol = '$';
    let suffix = listingType === 'rent' ? '/mo' : '';

    switch (currency) {
      case 'AED':
        rate = 3.67;
        symbol = 'AED ';
        break;
      case 'EUR':
        rate = 0.92;
        symbol = '€';
        break;
      case 'GBP':
        rate = 0.79;
        symbol = '£';
        break;
      default:
        rate = 1;
        symbol = '$';
    }

    const converted = Math.round(amount * rate);
    return `${symbol}${converted.toLocaleString()}${suffix}`;
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const openBookingForProperty = (p: Property) => {
    setBookingTargetProperty(p);
    setIsBookingModalOpen(true);
  };

  // Property Actions
  const addProperty = async (propData: Omit<Property, 'id' | 'createdAt'>) => {
    const newId = `prop-${Date.now()}`;
    const newProp: Property = {
      ...propData,
      id: newId,
      createdAt: new Date().toISOString(),
      views: 0,
      rating: 5.0
    };

    setProperties(prev => [newProp, ...prev]);

    try {
      await setDoc(doc(db, 'properties', newId), newProp);
    } catch (e) {
      console.warn('Firestore set property failed, local state active:', e);
    }

    showToast('Property listing created successfully!', 'success');
  };

  const updateProperty = async (id: string, update: Partial<Property>) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...update } : p));

    try {
      await updateDoc(doc(db, 'properties', id), update);
    } catch (e) {
      console.warn('Firestore update property failed:', e);
    }

    showToast('Property updated successfully', 'success');
  };

  const deleteProperty = async (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));

    try {
      await deleteDoc(doc(db, 'properties', id));
    } catch (e) {
      console.warn('Firestore delete property failed:', e);
    }

    showToast('Property removed from catalog', 'info');
  };

  // Appointments
  const bookAppointment = async (aptData: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Promise<Appointment> => {
    const newId = `apt-${Date.now()}`;
    const newAppointment: Appointment = {
      ...aptData,
      id: newId,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setAppointments(prev => [newAppointment, ...prev]);

    try {
      await setDoc(doc(db, 'appointments', newId), newAppointment);
    } catch (e) {
      console.warn('Firestore book appointment failed:', e);
    }

    showToast('Viewing appointment scheduled successfully! Our VIP concierge will contact you.', 'success');
    return newAppointment;
  };

  const updateAppointmentStatus = async (id: string, status: AppointmentStatus, adminNotes?: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status, ...(adminNotes ? { adminNotes } : {}) } : a));

    try {
      await updateDoc(doc(db, 'appointments', id), { 
        status, 
        ...(adminNotes ? { adminNotes } : {}) 
      });
    } catch (e) {
      console.warn('Firestore appointment status update failed:', e);
    }

    showToast(`Appointment status updated to ${status}`, 'success');
  };

  const deleteAppointment = async (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));

    try {
      await deleteDoc(doc(db, 'appointments', id));
    } catch (e) {
      console.warn('Firestore delete appointment failed:', e);
    }

    showToast('Appointment record removed', 'info');
  };

  // Inquiries
  const submitInquiry = async (inqData: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newId = `inq-${Date.now()}`;
    const newInquiry: ContactInquiry = {
      ...inqData,
      id: newId,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    setInquiries(prev => [newInquiry, ...prev]);

    try {
      await setDoc(doc(db, 'inquiries', newId), newInquiry);
    } catch (e) {
      console.warn('Firestore inquiry submit failed:', e);
    }

    showToast('Inquiry received. A senior advisor will reach out within 2 hours.', 'success');
  };

  // Site Content
  const updateSiteContent = async (contentUpdate: Partial<SiteContentConfig>) => {
    const updated = { ...siteContent, ...contentUpdate };
    setSiteContent(updated);

    try {
      await setDoc(doc(db, 'siteContent', 'main'), updated);
    } catch (e) {
      console.warn('Firestore site content update failed:', e);
    }

    showToast('Website content updated successfully', 'success');
  };

  return (
    <RealEstateContext.Provider
      value={{
        currentUser,
        isAdmin: currentUser?.role === 'admin',
        isAuthLoading,
        loginWithGoogle,
        loginWithEmail,
        signUpWithEmail,
        demoAdminLogin,
        logout,
        properties,
        appointments,
        siteContent,
        inquiries,
        favorites,
        toggleFavorite,
        currency,
        setCurrency,
        formatPrice,
        filters,
        setFilters,
        resetFilters,
        selectedProperty,
        setSelectedProperty,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isBookingModalOpen,
        setIsBookingModalOpen,
        bookingTargetProperty,
        openBookingForProperty,
        isMortgageCalcOpen,
        setIsMortgageCalcOpen,
        activeView,
        setActiveView,
        addProperty,
        updateProperty,
        deleteProperty,
        bookAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        submitInquiry,
        updateSiteContent,
        toasts,
        showToast
      }}
    >
      {children}
    </RealEstateContext.Provider>
  );
};

export const useRealEstate = () => {
  const context = useContext(RealEstateContext);
  if (!context) {
    throw new Error('useRealEstate must be used within a RealEstateProvider');
  }
  return context;
};
