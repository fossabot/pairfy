<template>
    <div class="preview">
        <div class="preview-title">
            {{ getProductData?.name }}
        </div>

        <div class="preview-price">
            {{ getProductData?.price }}
        </div>
        <span>all you know</span>
        <ul>
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
</template>

<script setup>
import productAPI from '@/views/product/api/index';

const { getProductData } = productAPI();

</script>

<style lang="css" scoped>
.preview {
    height: 700px;
}

.preview-title {
    font-size: var(--text-size-c);
    font-weight: 600;
    
}
</style>