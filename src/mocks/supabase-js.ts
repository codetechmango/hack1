// Mock for @supabase/supabase-js
export interface User {
  id: string;
  email?: string;
  user_metadata?: Record<string, any>;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface AuthResponse {
  data: { user: User | null; session: Session | null };
  error: { message: string; code?: string } | null;
}

export interface AuthChangeEvent {
  event: 'SIGNED_IN' | 'SIGNED_OUT' | 'TOKEN_REFRESHED';
  session: Session | null;
}

export interface PostgrestResponse<T> {
  data: T | null;
  error: { message: string; code?: string } | null;
}

export interface StorageResponse {
  data: { path: string } | null;
  error: { message: string } | null;
}

export interface StorageFileApi {
  upload(path: string, file: any, options?: any): Promise<StorageResponse>;
  getPublicUrl(path: string): { data: { publicUrl: string } };
  remove(paths: string[]): Promise<{ data: any; error: any }>;
}

export interface PostgrestQueryBuilder<T> {
  select(columns?: string): PostgrestQueryBuilder<T>;
  insert(values: any): PostgrestQueryBuilder<T>;
  update(values: any): PostgrestQueryBuilder<T>;
  delete(): PostgrestQueryBuilder<T>;
  eq(column: string, value: any): PostgrestQueryBuilder<T>;
  order(column: string, options?: { ascending?: boolean }): PostgrestQueryBuilder<T>;
  limit(count: number): PostgrestQueryBuilder<T>;
  single(): Promise<PostgrestResponse<T>>;
  then<TResult1 = PostgrestResponse<T[]>, TResult2 = never>(
    onfulfilled?: ((value: PostgrestResponse<T[]>) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): Promise<TResult1 | TResult2>;
}

export interface SupabaseAuthClient {
  signUp(credentials: { email: string; password: string; options?: any }): Promise<AuthResponse>;
  signInWithPassword(credentials: { email: string; password: string }): Promise<AuthResponse>;
  signOut(): Promise<{ error: any }>;
  getUser(): Promise<{ data: { user: User | null }; error: any }>;
  getSession(): Promise<{ data: { session: Session | null }; error: any }>;
  onAuthStateChange(callback: (event: AuthChangeEvent) => void): { data: { subscription: { unsubscribe: () => void } } };
}

export interface SupabaseStorageClient {
  from(bucketId: string): StorageFileApi;
}

export interface SupabaseClient {
  auth: SupabaseAuthClient;
  from<T = any>(table: string): PostgrestQueryBuilder<T>;
  storage: SupabaseStorageClient;
}

// Mock implementation
const createMockQuery = <T>(): PostgrestQueryBuilder<T> => {
  const query: any = {
    select: () => query,
    insert: () => query,
    update: () => query,
    delete: () => query,
    eq: () => query,
    order: () => query,
    limit: () => query,
    single: () => Promise.resolve({ data: null, error: { message: 'Mock data', code: 'MOCK' } }),
    then: (resolve: any) => resolve({ data: null, error: { message: 'Mock data', code: 'MOCK' } }),
  };
  return query;
};

export const createClient = (supabaseUrl: string, supabaseKey: string, options?: any): SupabaseClient => ({
  auth: {
    signUp: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Mock auth', code: 'MOCK' } }),
    signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Mock auth', code: 'MOCK' } }),
    signOut: () => Promise.resolve({ error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
  from: <T>() => createMockQuery<T>(),
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: { path: 'mock/path' }, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: 'mock://url' } }),
      remove: () => Promise.resolve({ data: null, error: null }),
    }),
  },
});
