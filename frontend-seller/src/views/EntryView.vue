<template>
    <div>
        {{ getUserData }} x
    </div>
</template>

<script setup>
import dashboardAPI from '@/views/api/index';

const { getUserData } = dashboardAPI();

</script>

<style lang="css" scoped></style>