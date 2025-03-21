import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/infrastructure/config/firebase-config";

export const useAuthStatus = () => {
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      if (initializing) setInitializing(false);
      setLoading(false);
    });

    return unsubscribe;
  }, [initializing]);

  return { loading, initializing };
};