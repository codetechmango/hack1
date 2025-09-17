import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService, AuthUser } from '../services/authService';
import { i18n } from '../localization/i18n';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, confirmPassword: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateUserProfile: (language: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize i18n and check for existing session
    const initializeAuth = async () => {
      try {
        await i18n.initialize();
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        
        // Set language from user profile if available
        if (currentUser?.profile?.preferred_language) {
          await i18n.setLanguage(currentUser.profile.preferred_language);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: { subscription } } = authService.onAuthStateChange(async (authUser) => {
      setUser(authUser);
      
      // Update language when user changes
      if (authUser?.profile?.preferred_language) {
        await i18n.setLanguage(authUser.profile.preferred_language);
      }
      
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { user: authUser, error } = await authService.signIn({ email, password });
      
      if (error) {
        return { success: false, error };
      }
      
      if (authUser) {
        setUser(authUser);
        // Set language from profile if available
        if (authUser.profile?.preferred_language) {
          await i18n.setLanguage(authUser.profile.preferred_language);
        }
        return { success: true };
      }
      
      return { success: false, error: 'loginError' };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: 'loginError' };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, confirmPassword: string) => {
    setLoading(true);
    try {
      const { user: authUser, error } = await authService.signUp({ 
        email, 
        password, 
        confirmPassword 
      });
      
      if (error) {
        return { success: false, error };
      }
      
      if (authUser) {
        setUser(authUser);
        return { success: true };
      }
      
      return { success: false, error: 'signupError' };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: 'signupError' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await authService.signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (language: string) => {
    if (!user) {
      return { success: false, error: 'No user logged in' };
    }

    try {
      const { profile, error } = await authService.createOrUpdateProfile(
        user.id, 
        language as any
      );
      
      if (error) {
        return { success: false, error };
      }
      
      if (profile) {
        // Update local user state
        setUser(prevUser => ({
          ...prevUser!,
          profile,
        }));
        
        // Update i18n language
        await i18n.setLanguage(language as any);
        
        return { success: true };
      }
      
      return { success: false, error: 'profileError' };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: 'profileError' };
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
