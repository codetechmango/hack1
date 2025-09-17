// Simple test script to verify Supabase connection
// Run with: node test-connection.js

const { createClient } = require('@supabase/supabase-js');

// Use your actual Supabase credentials
const SUPABASE_URL = 'https://dtzhwxgfuosuktelilkd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0emh3eGdmdW9zdWt0ZWxpbGtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwOTEzMzUsImV4cCI6MjA3MzY2NzMzNX0.PJNyljxOpXMgaxdYOm6ElXWAvnAnOT-zkhoVEQQE-uI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n');

  try {
    // Test 1: Basic connection
    console.log('1. Testing basic connection...');
    const { data, error } = await supabase.from('profiles').select('count');
    if (error) {
      console.log('❌ Profiles table error:', error.message);
    } else {
      console.log('✅ Profiles table accessible');
    }

    // Test 2: Predictions table
    console.log('\n2. Testing predictions table...');
    const { data: predData, error: predError } = await supabase.from('predictions').select('count');
    if (predError) {
      console.log('❌ Predictions table error:', predError.message);
    } else {
      console.log('✅ Predictions table accessible');
    }

    // Test 3: Feedback table
    console.log('\n3. Testing feedback table...');
    const { data: feedData, error: feedError } = await supabase.from('feedback').select('count');
    if (feedError) {
      console.log('❌ Feedback table error:', feedError.message);
    } else {
      console.log('✅ Feedback table accessible');
    }

    // Test 4: Storage bucket
    console.log('\n4. Testing storage bucket...');
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    if (bucketError) {
      console.log('❌ Storage error:', bucketError.message);
    } else {
      const hasPredictionsBucket = buckets.some(bucket => bucket.id === 'predictions-images');
      if (hasPredictionsBucket) {
        console.log('✅ predictions-images bucket exists');
      } else {
        console.log('❌ predictions-images bucket not found');
        console.log('Available buckets:', buckets.map(b => b.id));
      }
    }

    console.log('\n🎉 Connection test completed!');
    console.log('\n📝 Next steps:');
    console.log('1. If you see errors above, run the supabase-schema-complete.sql script');
    console.log('2. Check RLS policies in your Supabase dashboard');
    console.log('3. Ensure email confirmation is disabled in Auth settings');
    console.log('4. Run: npx expo start --clear');

  } catch (err) {
    console.error('❌ Connection test failed:', err);
    console.log('\n🔧 To fix:');
    console.log('1. Check your Supabase URL and API key');
    console.log('2. Ensure your Supabase project is running');
    console.log('3. Run the setup SQL script in Supabase SQL Editor');
  }
}

testConnection();
