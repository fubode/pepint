import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
    "https://sif.fubode.org/",
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzE4MTY0ODAwLAogICJleHAiOiAxODc1OTMxMjAwCn0.Cxp0jE_KX0XFOvrRTdGgH5y9ZozZ9tI0Gnr2ez_NNDA'
    );
    
    /*
    export const supabase = createClient(
        'http://192.168.10.61:8000',
        //"https://srv01.fubode.org/",
        //'http://192.168.10.61:8000',
        "https://sif.fubode.org/",
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjg3NDkyODAwLAogICAgImV4cCI6IDE4NDUzNDU2MDAKfQ._J9SYY9X4XxenSPmYAo-aGLWbpKjiLOuCQ72EGYlVr4'
        );
        export const supabase = createClient(
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjg3NDkyODAwLAogICAgImV4cCI6IDE4NDUzNDU2MDAKfQ._J9SYY9X4XxenSPmYAo-aGLWbpKjiLOuCQ72EGYlVr4"
            );
    export const supabase = createClient(
    "http://181.115.207.107:8000",
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjg5NTY2NDAwLAogICAgImV4cCI6IDE4NDc0MTkyMDAKfQ.-8R9wRGFHTxIo4WvUlNAt1oIacr-FTYwB5oMCz1FW9o'
    );
    export const supabase = createClient(
        'http://200.87.173.45:8000',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjg3NDkyODAwLAogICAgImV4cCI6IDE4NDUzNDU2MDAKfQ._J9SYY9X4XxenSPmYAo-aGLWbpKjiLOuCQ72EGYlVr4'
        );
    export const supabase = createClient(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjg5NTY2NDAwLAogICAgImV4cCI6IDE4NDc0MTkyMDAKfQ.-8R9wRGFHTxIo4WvUlNAt1oIacr-FTYwB5oMCz1FW9o"
        );
*/
