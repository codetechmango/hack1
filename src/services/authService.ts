import { supabase, Profile } from '../config/supabase';
import { Language } from '../localization/translations';

export interface AuthUser {
  id: string;
  email: string;
  profile?: Profile;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  confirmPassword: string;
}

class AuthService {
  // Validation helpers
  validateEmail(email: string): string | null {
    if (!email) return 'emailRequired';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'invalidEmail';
    return null;
  }

  validatePassword(password: string): string | null {
    if (!password) return 'passwordRequired';
    if (password.length < 8) return 'passwordMinLength';
    return null;
  }

  validateSignupCredentials(credentials: SignupCredentials): string | null {
    const emailError = this.validateEmail(credentials.email);
    if (emailError) return emailError;

    const passwordError = this.validatePassword(credentials.password);
    if (passwordError) return passwordError;

    if (credentials.password !== credentials.confirmPassword) {
      return 'passwordsDoNotMatch';
    }

    return null;
  }

  // Authentication methods
  async signUp(credentials: SignupCredentials): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const validationError = this.validateSignupCredentials(credentials);
      if (validationError) {
        return { user: null, error: validationError };
      }

      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        console.error('Signup error:', error);
        return { user: null, error: 'signupError' };
      }

      if (data.user) {
        return {
          user: {
            id: data.user.id,
            email: data.user.email!,
          },
          error: null,
        };
      }

      return { user: null, error: 'signupError' };
    } catch (error) {
      console.error('Signup exception:', error);
      return { user: null, error: 'signupError' };
    }
  }

  async signIn(credentials: LoginCredentials): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const emailError = this.validateEmail(credentials.email);
      if (emailError) {
        return { user: null, error: emailError };
      }

      const passwordError = this.validatePassword(credentials.password);
      if (passwordError) {
        return { user: null, error: passwordError };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        console.error('Login error:', error);
        return { user: null, error: 'loginError' };
      }

      if (data.user) {
        const profile = await this.getProfile(data.user.id);
        return {
          user: {
            id: data.user.id,
            email: data.user.email!,
            profile,
          },
          error: null,
        };
      }

      return { user: null, error: 'loginError' };
    } catch (error) {
      console.error('Login exception:', error);
      return { user: null, error: 'loginError' };
    }
  }

  async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        return { error: 'logoutError' };
      }
      return { error: null };
    } catch (error) {
      console.error('Logout exception:', error);
      return { error: 'logoutError' };
    }
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const profile = await this.getProfile(user.id);
        return {
          id: user.id,
          email: user.email!,
          profile,
        };
      }
      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  async getProfile(userId: string): Promise<Profile | undefined> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        console.error('Get profile error:', error);
      }

      return data || undefined;
    } catch (error) {
      console.error('Get profile exception:', error);
      return undefined;
    }
  }

  async createOrUpdateProfile(userId: string, language: Language): Promise<{ profile: Profile | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          user_id: userId,
          preferred_language: language,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('Create/update profile error:', error);
        return { profile: null, error: 'profileError' };
      }

      return { profile: data, error: null };
    } catch (error) {
      console.error('Create/update profile exception:', error);
      return { profile: null, error: 'profileError' };
    }
  }

  // Session management
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const profile = await this.getProfile(session.user.id);
        callback({
          id: session.user.id,
          email: session.user.email!,
          profile,
        });
      } else {
        callback(null);
      }
    });
  }
}

export const authService = new AuthService();
