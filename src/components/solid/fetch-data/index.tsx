import { createResource, For, Show } from 'solid-js';

interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5');
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  return response.json();
}

export function FetchData() {
  const [users, { refetch }] = createResource(fetchUsers);

  return (
    <div class="fetch-data">
      <Show when={users.loading}>
        <p>Loading...</p>
      </Show>
      <Show when={users.error}>
        <p class="error">Error: {users.error?.message}</p>
      </Show>
      <Show when={!users.loading && !users.error}>
        <ul>
          <For each={users()}>
            {(user) => (
              <li>
                {user.name} — {user.email}
              </li>
            )}
          </For>
        </ul>
      </Show>
      <button type="button" onClick={refetch} disabled={users.loading}>
        Refresh
      </button>
    </div>
  );
}
