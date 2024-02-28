type SessionKeys = 'accessToken' | 'user';

export const useAuth = () => {
  const setAuth = (key: SessionKeys, value: any) => {
    sessionStorage.setItem(key, value);
  };

  const getAuth = (key: SessionKeys) => {
    return sessionStorage.getItem(key) ?? undefined;
  };

  const clearAllAuth = () => sessionStorage.clear();

  return {
    setAuth,
    getAuth,
    clearAllAuth,
  };
};
