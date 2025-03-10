<template>
    <div class="stats">
        <div class="title">
            Blackday liquidity
        </div>
        <div class="chart">
            <div ref="chartContainer" class="chart"></div>
        </div>

        <div class="legend">
            x
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
            grid: {
                left: 0,
                right: 0,
                top: 20,
                bottom: 20,
                containLabel: true,
            },
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
    margin-top: 1rem;
    padding: 1rem;
    
}

.title {
    font-size: var(--text-size-2);
    color: var(--text-w);
    margin-bottom: 1rem;
    font-weight: 700;

}

.chart {
    
}


</style>