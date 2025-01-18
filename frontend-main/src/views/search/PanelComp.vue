<template>
    <div class="panel">

        <div class="panel-row">
            <span class="label">Price</span>
            <InputNumber v-model="price" inputId="mile" suffix=" USD" fluid />
            <Slider v-model="price" style="margin: 1rem 0.5rem;" :max="maxLimit" />
        </div>


        <div class="panel-row">
            <span class="label">Condition</span>
            <span class="checkbox flex">
                <Checkbox v-model="newed" inputId="new" name="new" value="new" size="small" />
                <label for="new"> New </label>
            </span>
            <span class="checkbox flex">
                <Checkbox v-model="used" inputId="used" name="used" value="used" size="small" />
                <label for="used"> Used </label>
            </span>
        </div>



    </div>
</template>

<script setup>
import { ref } from 'vue';

const maxLimit = ref(10000);

const price = ref(0);

const newed = ref(false)

const used = ref(false)

</script>

<style lang="css" scoped>
label {
    margin-left: 0.5rem;
    font-size: var(--text-size-1);
}

.panel {
    width: 400px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 1rem;
}

.panel-row {
    display: flex;
    flex-direction: column;
}

.label {
    font-size: var(--text-size-1);
    font-weight: 700;
    margin-bottom: 0.25rem;
}

.checkbox {
    margin-top: 0.5rem;
}
</style>