import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as fbSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  Timestamp 
} from 'firebase/firestore';

// Load config from firebase-applet-config.json
const firebaseConfig = {
  projectId: "learned-rarity-dthv3",
  appId: "1:937510832259:web:053fbc71970ed95045b3b6",
  apiKey: "AIzaSyAsQqkjx09kWkdjVgWjPZbFbpRYl7NDhWc",
  authDomain: "learned-rarity-dthv3.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-0edcc449-3168-42d8-813b-09404aba55e1",
  storageBucket: "learned-rarity-dthv3.firebasestorage.app",
  messagingSenderId: "937510832259",
  oAuthClientId: "937510832259-45hr0deoc929c5bo3gpqnqgakll9sg8k.apps.googleusercontent.com",
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Use specific database ID if configured, otherwise standard
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export {
  signInWithPopup,
  fbSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp
};
export type { FirebaseUser };
