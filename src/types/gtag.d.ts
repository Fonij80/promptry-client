export interface GtagCommand {
  event?: string;
  config?: string;
  [key: string]: any;
}

declare global {
  interface Window {
    gtag: (
      ...args: [string, GtagCommand] | [string, string, GtagCommand]
    ) => void;
    dataLayer: any[];
  }
}
