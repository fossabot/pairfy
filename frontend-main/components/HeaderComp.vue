<template>
    <header>
        <HeaderNavComp :items="[
            { label: 'Trending', route: '/docs' },
            { label: 'Categories', route: '/categories' },
            { label: 'Docs', route: '/docs' },
            { label: 'Sellers', route: '/sell' },
            { label: 'Support', route: '/support' }
        ]" />

        <HeaderTopComp />
    </header>
</template>

<script setup>



</script>

<style scoped>
header {
    width: 100%;
    display: flex;
    align-items: center;
    color: var(--text-a);
    flex-direction: column;
    justify-content: center;
    font-size: var(--text-size-1);
}


/* Default styles apply to all devices */

/* Small phones (up to 480px) */
@media (max-width: 480px) {}

/* Large phones and small tablets (481px - 767px) */
@media (min-width: 481px) and (max-width: 767px) {}

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
