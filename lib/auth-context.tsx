"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, User as FirebaseUser } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface User {
  email: string | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({ email: firebaseUser.email });
        // Set a cookie so middleware or other server-side checks know they are an admin if needed.
        // Though purely client-side routing is often enough for simple panels.
        document.cookie = "is_admin=true; path=/; max-age=86400"; // 1 day
      } else {
        setUser(null);
        document.cookie = "is_admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [])

  // Any authenticated user in Firebase is considered an admin for this context
  const isAdmin = !!user;

  const signIn = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }
    await signInWithEmailAndPassword(auth, email, password);
  }

  const signOut = async () => {
    await firebaseSignOut(auth);
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login"
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
