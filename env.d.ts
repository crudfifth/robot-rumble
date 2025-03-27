declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    VUE_APP_API_URL: string;
    VUE_APP_FEATURE_FLAG: "enabled" | "disabled";
  }
}
