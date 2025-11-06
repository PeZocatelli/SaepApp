import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qcdrkzjwwtpiwovavbgj.supabase.co'; // coloque o seu
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZHJremp3d3RwaXdvdmF2YmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNTU0NTcsImV4cCI6MjA3NzgzMTQ1N30.aul3MIWiVDxjWarVqpTMsfV9mU6EM5iF6MJh99hq-BI'; // pegue do projeto Supabase

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
