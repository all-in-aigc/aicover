import { ReactNode } from "react";

export interface ContextProviderValue {
  [propName: string]: any;
}

export interface ContextProviderProps {
  children: ReactNode;
}
