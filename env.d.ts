declare namespace NodeJS {
  interface ProcessEnv {
    SUPABASE_URL: string;
    SUPABASE_KEY: string;
    SUPABASE_BUCKET: string;
  }
}