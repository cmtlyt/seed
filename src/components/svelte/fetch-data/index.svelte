<script lang="ts">
  interface User {
    id: number;
    name: string;
    email: string;
  }

  let users = $state<User[]>([]);
  let loading = $state(false);
  let error = $state<string | null>(null);

  async function fetchUsers() {
    loading = true;
    error = null;
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5');
      if (!response.ok) {throw new Error('Failed to fetch');}
      users = await response.json();
    } catch (err) {
      error = (err as Error).message;
    } finally {
      loading = false;
    }
  }

  $effect(() => {
    fetchUsers();
  });
</script>

<div class="fetch-data">
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p class="error">Error: {error}</p>
  {:else}
    <ul>
      {#each users as user (user.id)}
        <li>{user.name} — {user.email}</li>
      {/each}
    </ul>
  {/if}
  <button type="button" disabled={loading} onclick={fetchUsers}>Refresh</button>
</div>
