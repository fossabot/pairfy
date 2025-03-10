<template>
    <div class="stats">
        <div class="title">
            Blackday Liquidity
        </div>
        <div class="chart">
            <div ref="chartContainer" class="chart"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartContainer = ref(null);

onMounted(() => {
    if (chartContainer.value) {
        const chart = echarts.init(chartContainer.value, null, { width: 250, height: 250 });
        chart.setOption({
            xAxis: {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                axisLine: { show: false },
                splitLine: { show: false },
                axisLabel: { color: '#ffffff' },
            },
            yAxis: {
                type: 'value',
                position: 'right',
                axisLine: { show: false },
                splitLine: { show: false },
                axisLabel: {
                    color: '#ffffff',
                    formatter: (value) => `${value / 1000}k`,
                }
            },
            series: [
                {
                    data: [400, 300, 500, 200, 600, 700],
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        color: '#ffffff',
                        width: 2,
                    },
                },
            ],
        });
    }
});
</script>

<style scoped>
.stats {
    background: var(--primary-a);
    border-radius: 12px;
    padding: 1rem;
    margin-top: 1rem;
}

.title {
    font-size: var(--text-size-2);
    margin-bottom: 1rem;
    font-weight: 700;
    color: var(--text-w);
}

.chart {
    width: 100%;
    height: 200px;
}
</style>