<template>
    <div class="preview">
        <Skeleton v-if="!getProductData" width="100%" height="100%" />

        <div v-if="getProductData">
            <div class="preview-top">
                {{ getProductData.quality }} | +5 sold
            </div>


            <div class="preview-name">
                {{ getProductData.name }}
            </div>

            <div class="preview-price">
                {{ formatCurrency(getProductData.price) }}
            </div>

            <div class="preview-variants">
                Color: <label>{{ getProductData.color_name }}</label>

                <div :style="{ backgroundColor: `#${getProductData.color}` }" />
            </div>

            <div class="preview-about">About this product</div>

            <ul class="preview-bullet">
                <li>Memoria RAM: 8 GB</li>
                <li>Memoria interna: 256 GB</li>
                <li>Imponente diseño de titanio.</li>
                <li> Diseñado para Apple Intelligence.</li>
                <li> Control de la cámara.</li>
                <li>Capturas soñadas.</li>
                <li>Estilos fotográficos.</li>
                <li>La potencia del chip A18 Pro.</li>
                <li>Un salto enorme en batería.</li>
                <li>Personaliza tu iPhone.</li>
                <li> Funcionalidades esenciales de seguridad.</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import productAPI from '@/views/product/api/index';
import { inject } from 'vue';

const { formatCurrency } = inject('utils')

const { getProductData } = productAPI();

</script>

<style lang="css" scoped>
.preview {
    height: 700px;
}

.preview-name {
    font-size: var(--text-size-c);
    font-weight: 600;
    margin-top: 1rem;
}

.preview-price{
    font-size: var(--text-size-d);
    margin-top: 1rem;
    font-weight: 600;
}

.preview-top {
    display: flex;
    color: var(--text-b);
    font-size: var(--text-size-a);
}

.preview-about {
    font-weight: 600;
    font-size: var(--text-size-a);
    margin-top: 2rem; 
}

.preview-bullet {
    font-size: var(--text-size-a);
    padding-left: 1rem;
}

.preview-bullet li {
    line-height: 1.43em;
    margin-top: 8px;
    padding-left: 10px;
    text-indent: -11px;
}

.preview-variants {
    margin-top: 2rem;
}

.preview-variants label {
    font-weight: 600;
}

.preview-variants div {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
</style>