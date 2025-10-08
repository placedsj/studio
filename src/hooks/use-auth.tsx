// src/hooks/use-auth.tsx
'use client';

import { createContext, useContext } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { useUser, type AuthContextType } from '@/firebase';

const AuthContext = createContext<Omit<AuthContextType, 'user' | 'loading'> | undefined>(undefined);

export function AuthProvider({ children }: { children: React.React.Node }) {
  const router = useRouter();

  const signUp = async (firstName: string, lastName: string, email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const currentUser = userCredential.user;
    
    await updateProfile(currentUser, {
        displayName: `${firstName} ${lastName}`
    });

    // Create a user document in Firestore
    await setDoc(doc(db, "users", currentUser.uid), {
        uid: currentUser.uid,
        displayName: `${firstName} ${lastName}`,
        email: currentUser.email,
        createdAt: new Date(),
    });

    router.push('/dashboard');
    return userCredential;
  };

  const logIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    router.push('/dashboard');
    return userCredential;
  };

  const logOut = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const value = {
    signUp,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const userContext = useUser();
  const context = useContext(AuthContext);
  if (context === undefined || userContext === undefined) {
    throw new Error('useAuth must be used within an AuthProvider and FirebaseProvider');
  }
  return { ...userContext, ...context };
};
