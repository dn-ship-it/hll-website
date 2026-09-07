export type ServiceDemoItem = {
  tabKey: string;
  title?: string | null;
  html?: string | null;
  htmlUrl?: string | null;
};

export type ServiceDemoConfig = {
  selectorLabel: string;
  items: ServiceDemoItem[];
  fallbackHtml?: string | null;
  fallbackUrl?: string | null;
};
