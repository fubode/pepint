import {createClient} from '@supabase/supabase-js'
export const supabase = createClient(
    'https://srv01.fubode.org/',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjg3NDkyODAwLAogICAgImV4cCI6IDE4NDUzNDU2MDAKfQ._J9SYY9X4XxenSPmYAo-aGLWbpKjiLOuCQ72EGYlVr4'
);

/*
export const supabase = createClient(
    'http://200.87.173.45:8000',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjg3NDkyODAwLAogICAgImV4cCI6IDE4NDUzNDU2MDAKfQ._J9SYY9X4XxenSPmYAo-aGLWbpKjiLOuCQ72EGYlVr4'
);
*/
/*
export const supabase = createClient(
    'https://vspemsodlumlsrzolwuj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzcGVtc29kbHVtbHNyem9sd3VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY5MzkzMTUsImV4cCI6MjAwMjUxNTMxNX0.h26WBOLhNo0e9VINypfKoqi5UYAKiQmGfwBlGNd3CCQ'
);
*/