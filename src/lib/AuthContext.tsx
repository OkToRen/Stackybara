import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { createActor, canisterId } from '@/declarations/backend';
import { HttpAgent } from '@dfinity/agent';

const identityProvider = `https://identity.ic0.app`;

type AuthContextType = {
  isAuthenticated: boolean;
  principal: string | null;
  login: () => Promise<void>;
  actor: any | null;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  principal: null,
  login: async () => {},
  actor: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [actor, setActor] = useState<any | null>(null);

  const login = async () => {
    const authClient = await AuthClient.create();

    await authClient.login({
      identityProvider,
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        const agent = new HttpAgent({ identity });

        if (process.env.DFX_NETWORK === 'local') {
          await agent.fetchRootKey();
        }

        const actorInstance = createActor(canisterId, { agent });
        setActor(actorInstance);
        setIsAuthenticated(true);
        setPrincipal(identity.getPrincipal().toText());
      },
    });
  };

  const checkAuth = async () => {
    const authClient = await AuthClient.create();
    const isLoggedIn = await authClient.isAuthenticated();
    if (isLoggedIn) {
      const identity = authClient.getIdentity();
      const agent = new HttpAgent({ identity });
      const actorInstance = createActor(canisterId, { agent });
      setActor(actorInstance);
      setIsAuthenticated(true);
      setPrincipal(identity.getPrincipal().toText());
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, principal, login, actor }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
