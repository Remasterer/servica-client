export const prepareAuthHeaders = (headers: Headers): Headers => {
  const token = localStorage.getItem('token');
  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }
  return headers;
};
