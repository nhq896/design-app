// file này mục đích để hỗ trợ autocomplete cho process.env
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_BASE_URL: string;

      NEXT_PUBLIC_UNSPLASH_ACCESS_KEY: string;

      DATABASE_URL: string;
    }
  }
}
