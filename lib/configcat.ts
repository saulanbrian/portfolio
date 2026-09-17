import { getClient, PollingMode, type IConfigCatClient, LogLevel, createConsoleLogger } from '@configcat/sdk';

let client: IConfigCatClient | null = null;

const logger = createConsoleLogger(LogLevel.Error);

export function getConfigCatClient(): IConfigCatClient | null {
  if (!client && process.env.CONFIGCAT_SDK_KEY) {
    client = getClient(process.env.CONFIGCAT_SDK_KEY, PollingMode.AutoPoll, {
      pollIntervalSeconds: 60,
      logger,
      requestTimeoutMs: 10000,
    });
  }
  return client;
}

export async function isFeatureEnabled(flagKey: string): Promise<boolean> {
  const c = getConfigCatClient();
  if (!c) {
    return new Promise(() => {});
  }
  return c.getValueAsync(flagKey, true);
}

export const FLAGS = {
  CUTDCROP_ENABLED: 'cutdcropenabled',
  PAPERLINE_ENABLED: 'paperlineenabled',
} as const;