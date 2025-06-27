import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAgent, useAgentManager, useAuth } from '@ic-reactor/react';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent } from '@dfinity/agent';
import { createActor, canisterId } from '@/declarations/backend';
import { authHooks } from '@ic-reactor/react/dist/helpers';
import { AgentManager } from '@ic-reactor/react/dist/types';

const identityProvider = 'https://identity.ic0.app';

type AuthContextType = {
  isAuthenticated: boolean;
  principal: string | null;
  login: () => void;
  logout: () => void;
  loginLoading: boolean;
  actor: any | null;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  principal: null,
  login: async () => {},
  logout: async () => {},
  loginLoading: false,
  actor: null,
});

// AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const agent: AgentManager = useAgentManager();
  const { useAuth, useAuthState, useUserPrincipal } = authHooks(agent);
  const { authenticated, login, logout, loginLoading } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [actor, setActor] = useState<any | null>(null); // Replace 'any' with your actor type

  // Handle login
  const handleLogin = () => {
    console.log('login');
    login({
      identityProvider,
    });
  };

  // Handle logout
  const handleLogout = async () => {
    console.log('logout');
    logout();
    setIsAuthenticated(false);
    setPrincipal(null);
    setActor(null);
    console.log('logout success');
  };

  const checkAuth = async () => {
    try {
      const authClient = await AuthClient.create();
      const isLoggedIn = await authClient.isAuthenticated();

      //
      console.log("AuthClient isAuthenticated:", isLoggedIn);

      if (isLoggedIn) {
        const identity = authClient.getIdentity();
        const agent = new HttpAgent({ identity });
        
        //
        const principal = identity.getPrincipal().toText();
        console.log("Principal from AuthClient:", principal);
        
        if (process.env.NODE_ENV !== 'production') {
          await agent.fetchRootKey();
        }
        const actorInstance = createActor(canisterId, { agent });
        setActor(actorInstance);
        setIsAuthenticated(true);
        setPrincipal(identity.getPrincipal().toText());
      } else{
        console.log("AuthClient not logged in");
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
    }
  };

  // Run checkAuth on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    console.log("Authenticated:", isAuthenticated);
    console.log("Principal:", principal);
    setIsAuthenticated(authenticated);
    if (authenticated) {
      checkAuth();
    }
  }, [authenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        principal,
        login: handleLogin,
        logout: handleLogout,
        loginLoading: loginLoading,
        actor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
