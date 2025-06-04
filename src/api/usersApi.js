const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = async (page = 1, limit = 5) => {
    const response = await fetch(`${BASE_URL}?_page=${page}&_limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch users');
    const data = await response.json();
    const totalCount = response.headers.get('x-total-count') || 0;
    return { data, totalCount: Number(totalCount) };
};

export const createUser = async (user) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error('Failed to create user');
    return await response.json();
};

export const updateUser = async (id, user) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error('Failed to update user');
    return await response.json();
};

export const deleteUser = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete user');
    return true;
};
