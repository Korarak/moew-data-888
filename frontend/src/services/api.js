const API_URL = 'http://localhost:3000/api';

export const getCats = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/cats?${query}`);
  if (!res.ok) throw new Error('Failed to fetch cats');
  return res.json();
};

export const getCatById = async (id) => {
  const res = await fetch(`${API_URL}/cats/${id}`);
  if (!res.ok) throw new Error('Failed to fetch cat');
  return res.json();
};

export const createCat = async (catData) => {
  const res = await fetch(`${API_URL}/cats`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(catData)
  });
  if (!res.ok) throw new Error('Failed to create cat');
  return res.json();
};

export const updateCat = async (id, catData) => {
  const res = await fetch(`${API_URL}/cats/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(catData)
  });
  if (!res.ok) throw new Error('Failed to update cat');
  return res.json();
};

export const deleteCat = async (id) => {
  const res = await fetch(`${API_URL}/cats/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete cat');
  return res.json();
};
