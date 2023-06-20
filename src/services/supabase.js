import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://nrupjizvsjelhtwalzeb.supabase.co';
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ydXBqaXp2c2plbGh0d2FsemViIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcxMTc0ODcsImV4cCI6MjAwMjY5MzQ4N30.ESRN-IWwh_zsuxYGrQNUvqEXgJf7ae7Qb-Vqw7LIKlk';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
