import api from "./api";

export async function pagar(code, nome) {
  const response = await api.post(`/pagamento/checkout/`, {code, nome});
  return response.data;
}