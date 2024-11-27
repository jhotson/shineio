import { useApi } from './useApi';
import { paymentsApi, PaymentMethod } from '../lib/api/payments';

export function usePayments() {
  const { execute: createIntent, ...createIntentState } = useApi(paymentsApi.createPaymentIntent);
  const { execute: getMethods, ...getMethodsState } = useApi(paymentsApi.getPaymentMethods);
  const { execute: addMethod, ...addMethodState } = useApi(paymentsApi.addPaymentMethod);
  const { execute: setDefault, ...setDefaultState } = useApi(paymentsApi.setDefaultPaymentMethod);
  const { execute: deleteMethod, ...deleteMethodState } = useApi(paymentsApi.deletePaymentMethod);

  return {
    // Payment intent
    creatingIntent: createIntentState.loading,
    createIntentError: createIntentState.error,
    createPaymentIntent: (amount: number) => createIntent(amount),

    // Payment methods
    paymentMethods: getMethodsState.data,
    loadingMethods: getMethodsState.loading,
    methodsError: getMethodsState.error,
    fetchPaymentMethods: getMethods,

    // Add payment method
    addingMethod: addMethodState.loading,
    addMethodError: addMethodState.error,
    addPaymentMethod: (data: { paymentMethodId: string; last4: string; brand: string }) => 
      addMethod(data),

    // Set default method
    settingDefault: setDefaultState.loading,
    setDefaultError: setDefaultState.error,
    setDefaultMethod: (id: number) => setDefault(id),

    // Delete method
    deletingMethod: deleteMethodState.loading,
    deleteMethodError: deleteMethodState.error,
    deletePaymentMethod: (id: number) => deleteMethod(id),
  };
}