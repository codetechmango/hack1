// Test script for Supabase connection
// Run with: node scripts/test-supabase.js

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://dtzhwxgfuosuktelilkd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0emh3eGdmdW9zdWt0ZWxpbGtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwOTEzMzUsImV4cCI6MjA3MzY2NzMzNX0.PJNyljxOpXMgaxdYOm6ElXWAvnAnOT-zkhoVEQQE-uI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testSupabaseConnection() {
  try {
    console.log('🧪 Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase.from('profiles').select('count');
    
    if (error) {
      console.error('❌ Connection failed:', error);
    } else {
      console.log('✅ Supabase connection successful!');
      console.log('📊 Query result:', data);
    }
    
    // Test table structure
    console.log('\n🔍 Testing table structures...');
    
    const tables = ['profiles', 'predictions', 'feedback'];
    for (const table of tables) {
      try {
        const { data, error } = await supabase.from(table).select('*').limit(1);
        if (error) {
          console.log(`❌ Table "${table}": ${error.message}`);
        } else {
          console.log(`✅ Table "${table}": OK`);
        }
      } catch (err) {
        console.log(`❌ Table "${table}": ${err.message}`);
      }
    }
    
  } catch (error) {
    console.error('💥 Test failed:', error);
  }
}

testSupabaseConnection();
