<template>
  <div class="countdown">
    <div class="box">
      <span>{{ timeLeft.days }}</span> <small>Days</small>
    </div>
    <div class="box">
      <span>{{ timeLeft.hours }}</span> <small>Hrs</small>
    </div>
    <div class="box">
      <span>{{ timeLeft.minutes }}</span> <small>Mins</small>
    </div>
    <div class="box">
      <span>{{ timeLeft.seconds }}</span> <small>Secs</small>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from "vue";

const props = defineProps({
  targetTimestamp: {
    type: Number,
    default: Date.now()  + 7900000000
  }
});

const timeLeft = ref(calculateTimeLeft());
let interval;

function calculateTimeLeft() {
  const now = Date.now();
  const difference = props.targetTimestamp - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    expired: false,
  };
}

function startCountdown() {
  if (interval) clearInterval(interval);

  interval = setInterval(() => {
    timeLeft.value = calculateTimeLeft();
    if (timeLeft.value.expired) {
      clearInterval(interval);
    }
  }, 1000);
}

// Start countdown & watch for prop changes
watch(() => props.targetTimestamp, startCountdown, { immediate: true });

onUnmounted(() => {
  clearInterval(interval);
});
</script>



<style scoped>
.countdown {
  display: flex;
  gap: 1rem;
}

.box {
  background: var(--black-a);
  color: var(--text-w);
  border-radius: 12px;  
  text-align: center;
  padding: 0.25rem;
  min-width: 50px;
}

.box span {
  font-size: var(--text-size-1);
  font-weight: bold;
}

small {
  display: block;
  font-size: 10px;
}
</style>
