export const addonsDataKey = "addonsData";

export const useSetAddonsData = () => {
  const setAddonsData = (value: { id: number; quantity: number }) => {
    sessionStorage.setItem(addonsDataKey, JSON.stringify(value));
  };
  return { setAddonsData };
};

export const useGetAddonsData = () => {
  const raw = sessionStorage.getItem(addonsDataKey);
  if (!raw) {
    return {
      id: null,
      quantity: null,
    };
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      id: parsed?.id ?? null,
      quantity: parsed?.quantity ?? null,
    };
  } catch {
    return {
      id: null,
      quantity: null,
    };
  }
};

export const CryptoPaymentDataKey = "CryptoPaymentData";

export const useSetCryptoPaymentData = () => {
  const setCryptoPaymentData = (value: {
    amount: number | string;
    code: string;
    address: string;
    network: string;
    currency_amount: number;
    payment_id: string;
  }) => {
    sessionStorage.setItem(CryptoPaymentDataKey, JSON.stringify(value));
  };
  return { setCryptoPaymentData };
};

export const useGetCryptoPaymentData = () => {
  const raw = sessionStorage.getItem(CryptoPaymentDataKey);
  if (!raw) {
    return {
      amount: null,
      code: null,
      address: null,
      network: null,
      currency_amount: null,
      payment_id: null,
    };
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      amount: parsed?.amount ?? null,
      code: parsed?.code ?? null,
      address: parsed?.address ?? null,
      network: parsed?.network ?? null,
      currency_amount: parsed?.currency_amount ?? null,
      payment_id: parsed?.payment_id ?? null,
    };
  } catch {
    return {
      amount: null,
      code: null,
      address: null,
      network: null,
      currency_amount: null,
      payment_id: null,
    };
  }
};
