<template>
  <section class="flex">
    <div class="menu">
      <div class="menu-nav flex">
        <span>Trending</span>
        <span>Discounts</span>
        <span>Rewards</span>
        <span>Support</span>
        <span>Sell</span>
        <span>
          <a href="https://cardano-ecommerce.gitbook.io/marketplace" target="_blank" rel="noopener noreferrer">Docs</a>
        </span>
        <span>Electronics</span>
        <span>Garden</span>
        <span>Office</span>
      </div>
    </div>
  </section>


</template>

<script setup>
</script>

<style lang="css" scoped>
section {
  border-bottom: 1px solid var(--border-a);
  border-top: 1px solid var(--border-a);
  justify-content: center;
  height: 2.75rem;
  width: inherit;

}

.menu {
  max-width: calc(var(--body-a) - 4rem);
  color: inherit;
  width: 100%;
}

.menu-nav {
  justify-content: space-between;
  width: inherit;
}

.menu-nav {
  font-size: var(--text-size-2);
  white-space: nowrap;
  font-weight: 400;
  cursor: pointer;
  color: inherit;
}

/* Default styles apply to all devices */

/* Small phones (up to 480px) */
@media (max-width: 480px) {
  section {
    height: initial;
  }

  .menu {
    color: var(--text-b);
    overflow-x: scroll;
    padding: 0 1rem;
    overflow: auto;
    /* Permite el scroll */
    -ms-overflow-style: none;
    /* Oculta scrollbar en IE y Edge */
    scrollbar-width: none;
    /* Oculta scrollbar en Firefox */
  }

  .menu::-webkit-scrollbar {
    display: none;
    /* Oculta scrollbar en Chrome, Safari y Edge */
  }

  .menu-nav span {
    padding: 0.5rem 0;
    margin-right: 1rem;
  }
}

/* Large phones and small tablets (481px - 767px) */
@media (min-width: 481px) and (max-width: 767px) {
  /* Styles for larger phones */
}

/* Tablets (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  /* Styles for tablets */
}

/* Laptops and small desktops (1025px - 1440px) */
@media (min-width: 1025px) and (max-width: 1440px) {
  /* Styles for laptops */
}

/* Large desktops (1441px and up) */
@media (min-width: 1441px) {
  /* Styles for large screens */
}
</style>