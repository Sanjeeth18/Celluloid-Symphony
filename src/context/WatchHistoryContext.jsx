import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
import { validateMediaItem } from "../utils/security";
import {
  db,
  isFirebaseConfigured,
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
  writeBatch,
} from "../services/firebase";

const WatchHistoryContext = createContext(null);
const LOCAL_STORAGE_KEY = "celluloid_watch_history_v1";

export function WatchHistoryProvider({ children }) {
  const { user } = useAuth();
  const [watchHistory, setWatchHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // Load history on mount or when user changes
  useEffect(() => {
    let isMounted = true;

    async function loadHistory() {
      setLoadingHistory(true);
      try {
        if (user && isFirebaseConfigured && db && !user.isDemoUser) {
          // Fetch user watch history from Firebase Firestore
          const historyRef = collection(db, "users", user.uid, "watchHistory");
          const snapshot = await getDocs(historyRef);

          const firestoreItems = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const valid = validateMediaItem(data);
            if (valid) firestoreItems.push(valid);
          });

          // Sort by watchedAt timestamp descending
          firestoreItems.sort((a, b) => new Date(b.watchedAt) - new Date(a.watchedAt));

          if (isMounted) {
            setWatchHistory(firestoreItems);
            // Backup to local storage
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(firestoreItems));
          }
        } else {
          // Load from LocalStorage for guest or demo user
          const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (cached) {
            try {
              const parsed = JSON.parse(cached);
              const validated = parsed
                .map(validateMediaItem)
                .filter(Boolean)
                .sort((a, b) => new Date(b.watchedAt) - new Date(a.watchedAt));
              if (isMounted) setWatchHistory(validated);
            } catch (err) {
              console.error("Error parsing local watch history:", err);
            }
          }
        }
      } catch (error) {
        console.error("Error loading watch history:", error);
      } finally {
        if (isMounted) setLoadingHistory(false);
      }
    }

    loadHistory();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Sync guest local items to Firestore upon user login
  useEffect(() => {
    async function syncLocalToFirestore() {
      if (user && isFirebaseConfigured && db && !user.isDemoUser && watchHistory.length > 0) {
        try {
          const batch = writeBatch(db);
          watchHistory.forEach((item) => {
            const itemRef = doc(db, "users", user.uid, "watchHistory", String(item.id));
            batch.set(itemRef, item, { merge: true });
          });
          await batch.commit();
        } catch (err) {
          console.error("Error syncing watch history to Firestore:", err);
        }
      }
    }

    if (user && !user.isDemoUser) {
      syncLocalToFirestore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Add or Update item in Watch History
  const addToHistory = useCallback(
    async (rawItem) => {
      const validItem = validateMediaItem(rawItem);
      if (!validItem) return;

      const updatedItem = {
        ...validItem,
        watchedAt: new Date().toISOString(),
      };

      setWatchHistory((prev) => {
        // Remove existing occurrence if present, then add to top
        const filtered = prev.filter((i) => String(i.id) !== String(updatedItem.id));
        const updatedList = [updatedItem, ...filtered];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
        return updatedList;
      });

      // Sync with Firestore if logged in
      if (user && isFirebaseConfigured && db && !user.isDemoUser) {
        try {
          const itemRef = doc(db, "users", user.uid, "watchHistory", String(updatedItem.id));
          await setDoc(itemRef, updatedItem, { merge: true });
        } catch (error) {
          console.error("Error syncing item to Firestore:", error);
        }
      }
    },
    [user]
  );

  // Remove single item from Watch History
  const removeFromHistory = useCallback(
    async (id) => {
      const targetId = String(id);
      setWatchHistory((prev) => {
        const updatedList = prev.filter((i) => String(i.id) !== targetId);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
        return updatedList;
      });

      toast.success("Removed from watch history.");

      if (user && isFirebaseConfigured && db && !user.isDemoUser) {
        try {
          const itemRef = doc(db, "users", user.uid, "watchHistory", targetId);
          await deleteDoc(itemRef);
        } catch (error) {
          console.error("Error deleting item from Firestore:", error);
        }
      }
    },
    [user]
  );

  // Clear entire Watch History
  const clearHistory = useCallback(async () => {
    setWatchHistory([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    toast.success("Watch history cleared.");

    if (user && isFirebaseConfigured && db && !user.isDemoUser) {
      try {
        const historyRef = collection(db, "users", user.uid, "watchHistory");
        const snapshot = await getDocs(historyRef);
        const batch = writeBatch(db);
        snapshot.forEach((docSnap) => {
          batch.delete(docSnap.ref);
        });
        await batch.commit();
      } catch (error) {
        console.error("Error clearing Firestore history:", error);
      }
    }
  }, [user]);

  return (
    <WatchHistoryContext.Provider
      value={{
        watchHistory,
        loadingHistory,
        addToHistory,
        removeFromHistory,
        clearHistory,
      }}
    >
      {children}
    </WatchHistoryContext.Provider>
  );
}

export const useWatchHistory = () => {
  const ctx = useContext(WatchHistoryContext);
  if (!ctx) throw new Error("useWatchHistory must be used within a WatchHistoryProvider");
  return ctx;
};
