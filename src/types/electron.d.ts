export {};

declare global {
  interface AblectClientConfig {
    businessName: string;
    installationDate: string;
    logoPath: string | null;
    logoDataUrl: string | null;
    configPath: string;
  }

  interface AblectDatabaseStatus {
    connected: boolean;
    error: string | null;
  }

  interface Window {
    ablectDesktop?: {
      getClientConfig: () => Promise<AblectClientConfig>;
      getDatabaseStatus: () => Promise<AblectDatabaseStatus>;
    };
  }
}
