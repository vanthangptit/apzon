import React, {
  createContext,
  ReactNode,
  useState
} from 'react';

type Props = {
  children?: ReactNode;
}

type IAuthContext = {
  authenticated: string  | undefined
  setAuthenticated: (newState?: string) => void
}

const initialValue = {
  authenticated: undefined,
  setAuthenticated: () => {}
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [ authenticated, setAuthenticated ] = useState<string | undefined>();

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export {  AuthContext, AuthProvider };
