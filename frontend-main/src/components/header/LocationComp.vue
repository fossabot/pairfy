<template>
    <div class="location flex">
        <div class="icon flex">
            <i class="pi pi-map-marker"/>
        </div>
        <div class="box">
               <span>Deliver to</span>
               <span>Bogota 530001</span>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="css" scoped>
.location {
    height: 42px;
    color: var(--text-a);
    white-space: nowrap;
    text-align: start;
    margin: 0 auto;
}

.icon {
    width: 30px;
    height: inherit;
}

.icon i {
    font-size: var(--text-size-3);
}

.box{
    display: flex;
    flex-direction: column;
}

.box span:nth-child(1){
    font-size: var(--text-size-0);
}

.box span:nth-child(2){
    font-size: var(--text-size-0);
    font-weight: 600;
}

</style>