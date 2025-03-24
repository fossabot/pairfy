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
  justify-content: center;
  height: 2.75rem;
  width: inherit;

}

.menu {
  max-width: calc(var(--body-a) - 1rem);
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
    display: none;
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