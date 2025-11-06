import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qcdrkzjwwtpiwovavbgj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZHJremp3d3RwaXdvdmF2YmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNTU0NTcsImV4cCI6MjA3NzgzMTQ1N30.aul3MIWiVDxjWarVqpTMsfV9mU6EM5iF6MJh99hq-BI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
