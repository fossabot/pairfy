<template>
    <div class="container">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
    </div>
</template>

<script setup>

</script>

<style lang="css" scoped>
        .container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: minmax(150px, auto);
            gap: 1rem;
        }

        .item {
            background: var(--background-b);
            justify-content: center;
            align-items: center;
            border-radius: 12px;
            text-align: center;
            padding: 1rem;
            display: flex;
        }

        /* Specific item spans */
        .item:nth-child(1) {
            grid-column: span 2;
        }

        .item:nth-child(4) {
            grid-column: span 1;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .container {
                grid-template-columns: repeat(2, 1fr); 
            }

            .item:nth-child(1) {
                grid-column: span 1;
            }
        }

        @media (max-width: 480px) {
            .container {
                grid-template-columns: 1fr; 
            }
        }
</style>