import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  auth,
  googleProvider,
  isFirebaseConfigured,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "../services/firebase";

const AuthContext = createContext(null);

const DEMO_USER_KEY = "celluloid_demo_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Synchronize Firebase auth state
  useEffect(() => {
    let unsubscribe = () => {};

    if (isFirebaseConfigured && auth) {
      unsubscribe = onAuthStateChanged(
        auth,
        (currentUser) => {
          if (currentUser) {
            setUser({
              uid: currentUser.uid,
              displayName: currentUser.displayName || currentUser.email?.split("@")[0] || "Cinephile",
              email: currentUser.email,
              photoURL: currentUser.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
              isDemoUser: false,
            });
          } else {
            setUser(null);
          }
          setLoading(false);
        },
        (error) => {
          console.error("Auth state listener error:", error);
          setLoading(false);
        }
      );
    } else {
      // Fallback: Check local storage for persistent demo user login
      const savedDemo = localStorage.getItem(DEMO_USER_KEY);
      if (savedDemo) {
        try {
          setUser(JSON.parse(savedDemo));
        } catch (_) {}
      }
      setLoading(false);
    }

    return () => unsubscribe();
  }, []);

  // Google Sign-In Function
  const loginWithGoogle = useCallback(async () => {
    setLoading(true);
    try {
      if (isFirebaseConfigured && auth && googleProvider) {
        const result = await signInWithPopup(auth, googleProvider);
        const signedInUser = result.user;
        toast.success(`Welcome back, ${signedInUser.displayName || "Cinephile"}! 🎬`, {
          icon: "🍿",
        });
        return signedInUser;
      } else {
        // High-fidelity fallback login for local demo / when Firebase env vars aren't filled yet
        const demoUser = {
          uid: "demo_user_12345",
          displayName: "Alex Rivera",
          email: "alex.rivera@celluloid.symphony",
          photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
          isDemoUser: true,
        };
        localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
        setUser(demoUser);
        toast.success("Signed in with Google (Demo Mode)! 🎬", { icon: "🍿" });
        return demoUser;
      }
    } catch (error) {
      console.error("Google Authentication error:", error);
      if (error.code !== "auth/popup-closed-by-user") {
        toast.error(`Authentication failed: ${error.message || "Unable to sign in"}`);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout Function
  const logout = useCallback(async () => {
    try {
      if (isFirebaseConfigured && auth && !user?.isDemoUser) {
        await signOut(auth);
      }
      localStorage.removeItem(DEMO_USER_KEY);
      setUser(null);
      toast.success("Successfully logged out.", { icon: "👋" });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out cleanly.");
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
