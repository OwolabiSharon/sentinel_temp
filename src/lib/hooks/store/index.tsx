import { useCallback, useEffect, useState } from 'react';

import type { StoreType } from '../../types';

const useStore = () => {
  const [store, setStore] = useState<StoreType>({});
  useEffect(() => {
    const storeInStorage = sessionStorage.getItem('store');
    if (storeInStorage) {
      setStore(JSON.parse(storeInStorage));
    }
  }, []);

  const updateValueInStore = useCallback(
    (value: Partial<StoreType>) => {
      const updatedStore = { ...store, ...value };
      setStore(updatedStore);
      sessionStorage.setItem('store', JSON.stringify(updatedStore));
    },
    [store]
  );

  return { store, updateValueInStore };
};

export default useStore;
