<template>
    <div class="stats">
        <div class="title flex">
            <span>Blackday LP</span>
            <span style="margin-left: 0.5rem; line-height: 0;"> 

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            </span> 
        </div>
        <div class="chart">
            <div ref="chartContainer" class="chart"></div>
        </div>

        <div class="legend">
            
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartContainer = ref(null);

onMounted(() => {
    if (chartContainer.value) {
        const chart = echarts.init(chartContainer.value, null, { width: 230, height: 230 });
        chart.setOption({
            grid: {
                left: 0,
                right: 0,
                top: 20,
                bottom: 0,
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                axisLine: { show: false },
                splitLine: { show: false },
                axisLabel: { color: 'transparent' },
                axisTick: { show: false },
            },
            yAxis: {
                type: 'value',
                position: 'right',
                axisLine: { show: false },
                splitLine: { show: false },
                axisLabel: {
                    color: '#222',
                    formatter: (value) => `${value / 1000}k ₳`,
                }
            },
            series: [
                {
                    data: [400, 300, 500, 200, 600, 700],
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        color: '#222',
                        width: 2,
                    },
                    symbol: 'none',
                },
            ],
        });
    }
});
</script>

<style scoped>
.stats {
    border: 1px solid var(--border-a); 
    background: transparent;
    border-radius: 12px;
    margin-top: 1rem;
    padding: 1rem;
    
}

.title {
    font-size: var(--text-size-2);
    margin-bottom: 1rem;
    font-weight: 700;

}

.chart {
    
}


</style>