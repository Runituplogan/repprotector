import { useState } from "react";

export const useLoadingStatus = <T>() => {
  const [loadingType, setLoadingType] = useState<T>("" as T);

  const startLoading = (buttonActionType: T) => {
    setLoadingType(buttonActionType);
  };

  const stopLoading = () => {
    setLoadingType("" as T);
  };

  return { loadingType, startLoading, stopLoading };
};
