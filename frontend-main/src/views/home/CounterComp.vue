<template>
  <div class="card">
    <div class="title flex">
      <span>Blackday countdown</span>
      <span style="margin-left: 0.5rem; line-height: 0;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-flame">
          <path
            d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      </span>
    </div>

    <div class="clock">
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
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted, onBeforeUnmount } from "vue";

const props = defineProps({
  targetTimestamp: {
    type: Number,
    default: Date.now() + 7900000000
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


const unwatchClock = watch(() => props.targetTimestamp, startCountdown, { immediate: true });

onUnmounted(() => {
  clearInterval(interval);
});

onBeforeUnmount(() => {
  unwatchClock()
})
</script>



<style scoped>
.card {
  border: 1px solid var(--border-a);
  border-radius: 12px;
  padding: 1rem;
}

.clock {
  justify-content: space-between;
  display: flex;
  gap: 0rem;
}

.box {
  background: var(--background-b);
  border-radius: 12px;
  text-align: center;
  padding: 0.25rem;
  min-width: 50px;
}

.box span {
  font-size: var(--text-size-2);
  font-weight: 700;
}

small {
  display: block;
  font-size: 10px;
}

.title {
  font-size: var(--text-size-3);
  margin-bottom: 1rem;
  font-weight: 600;
}
</style>
