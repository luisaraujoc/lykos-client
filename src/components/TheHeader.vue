<script setup lang="ts">
import logo from '../assets/logo.png'
</script>

<template>
  <header class="site-header">
    <div class="container header__container">
     
      <div class="header__logo">
        <a href="/" aria-label="LYKOS - Página inicial">
          <img :src="logo" alt="Logo LYKOS" class="site-logo-image" />
        </a>
      </div>

      <nav class="main-nav" aria-label="Navegação principal">
        <ul>
          <li><a href="#">Início</a></li>
          <li><a href="#">Explorar</a></li>
          <li><a href="#">Como funciona</a></li>
          <li><a href="#">Dashboard</a></li>
        </ul>
      </nav>

      <div class="header__actions">
        <a href="/perfil" class="btn btn--primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
          </svg>
          <span>Perfil</span>
        </a>
      </div>

    </div>
  </header>
</template>

<style scoped>
.site-header {
  background-color: var(--color-white);
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border);
}

.header__container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 2.5rem;
}

.header__logo {
  justify-self: start;
}

.site-logo {
  font-weight: 800;
  font-size: 1.8rem;
  letter-spacing: 1px;
}

.logo-main {
  color: var(--color-dark);
}

.logo-highlight {
  color: var(--color-primary);
}

.main-nav ul {
  display: flex;
  gap: 3rem;
  justify-content: center;
  
}

.main-nav a {
  font-weight: 600;
  font-size: 1rem;
  color: var(--color-text);
  transition: color 0.2s ease;
}

.main-nav a:hover {
  color: var(--color-primary);
}

.header__actions {
  justify-self: end;
  padding-left: 2rem;
}

.header__actions .btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}
</style>
