import { useEffect, useState } from "react";

const FALLBACK_CONFIG: AblectClientConfig = {
  businessName: "Ablect Business Suite",
  installationDate: "",
  logoPath: null,
  logoDataUrl: null,
  configPath: "",
};

export function useClientConfig() {
  const [config, setConfig] = useState<AblectClientConfig>(FALLBACK_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      if (!window.ablectDesktop?.getClientConfig) {
        if (active) setLoading(false);
        return;
      }

      try {
        const nextConfig = await window.ablectDesktop.getClientConfig();
        if (active) setConfig(nextConfig);
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, []);

  return { config, loading };
}
