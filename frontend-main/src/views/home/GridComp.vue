<template>
    <div class="container">
        <div class="box">
            <div class="box-head flex">
                <div class="title">Top best sellers of the week</div>
                <div class="arrow">
                    <i class="pi pi-angle-right" />
                </div>
            </div>

            <div class="box-content">

                <div class="grid one">
                    <div class="grid-item">
                        <img class="grid-image" :src="image1" alt="">
                        <div class="grid-price">
                            <span>$35</span>
                        </div>
                    </div>
                    <div class="grid-item">
                        <img class="grid-image" :src="image2" alt="">
                        <div class="grid-price">
                            <span>$23</span>
                        </div>
                    </div>
                    <div class="grid-item">
                        <img class="grid-image" :src="image3" alt="">
                        <div class="grid-price">
                            <span>$10</span>
                        </div>
                    </div>
                    <div class="grid-item">
                        <img class="grid-image" :src="image4" alt="">
                        <div class="grid-price">
                            <span>$60</span>
                        </div>
                    </div>
                    <div class="grid-item">
                        <img class="grid-image" :src="image5" alt="">
                        <div class="grid-price">
                            <span>$45</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="box">
            <div class="box-head flex">
                <div class="title">Supplies for your work</div>
                <div class="arrow">
                    <i class="pi pi-angle-right" />
                </div>
            </div>

            <div class="box-content">

            </div>
        </div>
        <div class="box">
            <div class="box-head flex">
                <div class="title">Create your gaming station</div>
                <div class="arrow">
                    <i class="pi pi-angle-right" />
                </div>
            </div>

            <div class="box-content">

            </div>
        </div>
        <div class="box">
            <div class="box-head flex">
                <div class="title">Gym accessories</div>
                <div class="arrow">
                    <i class="pi pi-angle-right" />
                </div>
            </div>

            <div class="box-content">

            </div>
        </div>
        <div class="box">
            <div class="box-head flex">
                <div class="title">Decorate your room</div>
                <div class="arrow">
                    <i class="pi pi-angle-right" />
                </div>
            </div>

            <div class="box-content">

            </div>
        </div>
    </div>
</template>

<script setup>
import image1 from '@/assets/icons/0.png'
import image2 from '@/assets/icons/1.png'
import image3 from '@/assets/icons/2.png'
import image4 from '@/assets/icons/3.png'
import image5 from '@/assets/icons/5.png'

import { ref } from 'vue';


</script>

<style lang="css" scoped>
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(150px, auto);
    gap: 1rem;
}

.box {
    background: var(--background-b);
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 12px;
    text-align: center;
    padding: 0 1rem;
    display: flex;
    width: 100%;
}

.box:nth-child(1) {
    grid-column: span 2;
}

.box:nth-child(4) {
    grid-column: span 1;
}

.box-head {
    justify-content: space-between;
    padding: 0.75rem 0;
    width: inherit;
}

.box-head .title {
    font-size: var(--text-size-2);
    font-weight: 700;
}

.box-head .arrow {
    font-weight: 100;
}

.box-content {
    width: inherit;
    height: 100%;
}

.grid {
    display: flex;
    flex-wrap: wrap;
    padding: 0rem;
    gap: 1rem;
}

.grid-item {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100px;
    height: 100px;
    display: flex;
    font-weight: bold;
    border-radius: 12px;
}

.grid-image {
    height: 70px;
}

.grid-price {
    color: var(--primary-a);
    justify-content: center;
    align-items: center;
    width: inherit;
    display: flex;
    height: 30px;
}

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