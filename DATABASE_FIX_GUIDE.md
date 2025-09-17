# 🔧 Database Errors - COMPLETE FIX GUIDE

## 🔍 **Errors Identified:**

1. **Row-level security policy violation** (Error code: 42501)
2. **Missing 'is_correct' column** (Error code: PGRST204)

## ✅ **Step-by-Step Fix:**

### **Step 1: Run the Fixed Database Schema**

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `dtzhwxgfuosuktelilkd`
3. Go to **SQL Editor**
4. Copy and paste the contents of `supabase-schema-fixed.sql`
5. **Click "Run"** to execute the SQL

### **Step 2: Verify Tables are Created**

In the SQL Editor, run this query to check:

```sql
-- Check if tables exist
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'predictions', 'feedback')
ORDER BY table_name, ordinal_position;
```

### **Step 3: Verify RLS Policies**

```sql
-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public';
```

### **Step 4: Test Database Connection**

Run this in SQL Editor to test:

```sql
-- Test insert into profiles (replace with actual user ID)
INSERT INTO public.profiles (user_id, preferred_language) 
VALUES ('00000000-0000-0000-0000-000000000000', 'en') 
ON CONFLICT (user_id) DO UPDATE SET preferred_language = 'en';

-- Test predictions table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'predictions' AND table_schema = 'public';

-- Test feedback table structure  
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'feedback' AND table_schema = 'public';
```

## 🔧 **Alternative Quick Fix (if above doesn't work):**

### **Disable RLS Temporarily for Testing:**

```sql
-- Disable RLS for testing (NOT for production)
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.predictions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback DISABLE ROW LEVEL SECURITY;
```

### **Re-enable later with proper policies:**

```sql
-- Re-enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
```

## 🎯 **Test Your Fix:**

After running the schema:

1. **Restart your app:**
   ```bash
   npx expo start --clear
   ```

2. **Test the flow:**
   - Login/Signup
   - Take a photo (mock)
   - Get prediction
   - Submit feedback

3. **Check console logs:**
   - Should see successful database operations
   - No more RLS or column errors

## ✅ **Expected Results:**

- ✅ **No RLS policy violations**
- ✅ **Predictions save successfully**
- ✅ **Feedback submissions work**
- ✅ **All database operations complete**

## 🚨 **If Still Having Issues:**

### **Check Authentication:**
```sql
-- Check if user is properly authenticated
SELECT auth.uid(), auth.role();
```

### **Check Table Permissions:**
```sql
-- Verify table permissions
SELECT grantee, table_name, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'predictions', 'feedback');
```

### **Manual Table Creation (Last Resort):**
```sql
-- If automatic creation fails, run manually:
DROP TABLE IF EXISTS public.feedback CASCADE;
DROP TABLE IF EXISTS public.predictions CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Then run the full schema from supabase-schema-fixed.sql
```

## 📞 **Support:**

If you continue having issues:

1. **Check Supabase logs** in Dashboard → Logs
2. **Verify your project URL and API key**
3. **Ensure you're using the correct project**

**Your database should now work without errors!** 🚀
