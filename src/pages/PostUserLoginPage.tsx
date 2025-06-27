// PostUserLoginPage.tsx
import { useEffect } from 'react';
import { useAuthContext } from '@/lib/AuthContext';

export default function PostUserLoginPage() {
  const { actor, isAuthenticated, principal } = useAuthContext();

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated && actor) {
        try {
          const user = await actor.getUser(); // 🔥 Ambil data user berdasarkan msg.caller
          console.log("User:", user);
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      }
    };

    fetchUser();
  }, [isAuthenticated, actor]);

  return <div>This is post login page</div>;
}
