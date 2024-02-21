import React from "react";

export interface IAppContext {
  formSended: boolean;
  setFormSended: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = React.createContext<IAppContext>({
  formSended: false,
  setFormSended: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => React.useContext(AppContext);

export interface IAppContextProviderProps extends React.PropsWithChildren {
  value: IAppContext;
}

export function AppContextProvider({
  children,
  value,
}: IAppContextProviderProps) {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
