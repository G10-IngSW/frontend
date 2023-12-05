import { createContext, useContext } from "react";
import DatiApp from "./classi/DatiApp";

export const AppContext = createContext<DatiApp | undefined>(undefined);

export function useAppContext() {
  const datiApp = useContext(AppContext);
  if (datiApp === undefined) {
    throw new Error("useAppContext must be used with an AppContext");
  }
  return datiApp;
}