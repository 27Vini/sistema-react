import type { ReactNode } from 'react';

export interface AppRoute {
  key: string;
  label: string;
  description: string;
  content: ReactNode;
}
