import {createClient} from '@supabase/supabase-js'

export const supabase = createClient(
    'https://vspemsodlumlsrzolwuj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzcGVtc29kbHVtbHNyem9sd3VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY5MzkzMTUsImV4cCI6MjAwMjUxNTMxNX0.h26WBOLhNo0e9VINypfKoqi5UYAKiQmGfwBlGNd3CCQ'
);