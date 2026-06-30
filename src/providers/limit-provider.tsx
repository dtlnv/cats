import { createContext, useCallback, useContext, useState } from 'react';
import { AVAILABLE_LIMITS, DEFAULT_LIMIT } from '@/lib/consts';

interface LimitContextType {
  limit: number;
  onUpdateLimit: (n: number | string) => void;
}

interface LimitProviderProps {
  children: React.ReactNode;
}

const LimitContext = createContext<LimitContextType | undefined>(undefined);

export function LimitProvider({ children }: LimitProviderProps) {
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);

  const onUpdateLimit = useCallback((num: number | string) => {
    const limit = +num;

    if (AVAILABLE_LIMITS.includes(limit)) {
      setLimit(limit);
    } else {
      setLimit(DEFAULT_LIMIT);
    }
  }, [limit]);


  return (
    <LimitContext.Provider value={{ limit, onUpdateLimit }}>{children}</LimitContext.Provider>
  );
}

export function useLimitContext() {
  const context = useContext(LimitContext);

  if (context === undefined) {
    throw new Error('useLimitContext must be used within a LimitProvider');
  }

  return context;
}
