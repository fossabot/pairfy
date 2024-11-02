<template>
    <div class="entry">
        <div class="entry-left">
            <div class="card">
                <div class="logo">
                    <img src="@/assets/logo-white.png" alt="">
                </div>
                <div class="logan">
                    <span> Buy and sell products in Cardano.</span>
                </div>
                <div class="subtext">
                    <span>Discover the largest native P2P marketplace where you can trade everything with ADA.</span>
                </div>
            </div>

            <div class="visual">
                <ul class="circles">
                    <li>
                        <img src="@/assets/lace.svg" alt="">
                    </li>
                    <li>
                        <img src="@/assets/eternl.png" alt="">
                    </li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li>
                        <img src="@/assets/vespr.png" alt="">
                    </li>
                    <li>
                        <img src="@/assets/daedalus.svg" alt="">
                    </li>
                    <li></li>
                    <li> <img src="@/assets/nami.svg" alt=""></li>
                    <li></li>
                </ul>
            </div>
        </div>

        <div class="entry-right">

            <!--LOGIN-->
            <div v-if="currentMode === 'login'" class="login">
                <div class="title">
                    <span>Welcome back!</span>
                    <span>Start managing your inventory</span>
                </div>

                <div class="email">
                    <IftaLabel>
                        <InputText id="email" v-model="loginForm.email" type="email" autofocus fluid variant="filled"
                            placeholder="you@example.com" style=" font-size: var(--text-size-a)" />
                        <label for="email">Email</label>
                    </IftaLabel>
                </div>


                <div class="password">
                    <Fluid>
                        <IftaLabel>

                            <Password v-model="loginForm.password" inputId="password" variant="filled" toggleMask
                                :feedback="false" inputStyle="font-size: var(--text-size-a);" />
                            <label for="password">Password</label>

                        </IftaLabel>
                    </Fluid>
                </div>


                <div class="legend">
                    <span>Forgot password?</span>
                </div>

                <div class="control">
                    <Button label="Login" fluid style=" font-size: var(--text-size-a);" />
                </div>

                <Divider layout="horizontal" fluid style=" font-size: var(--text-size-a); margin-top: 2rem; "><b>or</b>
                </Divider>

                <div class="bottom">
                    Don't you have an account? <span @click="navitageTo('register')">Sign Up</span>
                </div>
            </div>
            <!--LOGIN-->
            <!--REGISTER-->
            <div v-if="currentMode === 'register'">
                register
            </div>
            <!--REGISTER-->



        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import dashboardAPI from '@/views/api/index';
import { useRouter, useRoute } from 'vue-router'

const { getUserData } = dashboardAPI();

const loginForm = ref({
    email: "",
    password: ""
});

const router = useRouter()

const route = useRoute()

const modes = ["register", "login", "recovery", "email"];

let currentMode = ref('login');

const setupRoute = (mode) => {
    if (!mode) {
        return (currentMode.value = "login");
    }

    if (!modes.includes(mode)) {
        return (currentMode.value = "login");
    }

    currentMode = mode;
}

watch(
    () => route.query,
    (e) => setupRoute(e.mode),
    { immediate: true }
);


function navitageTo(mode) {
    router.push({
        name: 'entry',
        query: {
            mode
        },
    })
}


</script>

<style lang="css" scoped>
::v-deep(.p-button-label) {
    font-weight: 600;
}

::v-deep(.p-divider-content) {
    color: var(--text-b);
}

.entry {
    display: flex;
    height: 100vh;
}

.entry-left {
    width: 35%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.logan {
    font-weight: 600 !important;
    font-size: var(--text-size-h);
    padding: 1rem;
    color: var(--text-w);
    font-kerning: normal;
}

.subtext {
    font-size: var(--text-size-d);
    color: var(--text-w);
    padding: 1rem;
}

.logo {
    padding: 1rem;
}

.card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: var(--primary-a);
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    padding: 3rem;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='800' height='1000' preserveAspectRatio='none' viewBox='0 0 800 1000'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1164%26quot%3b)' fill='none'%3e%3crect width='800' height='1000' x='0' y='0' fill='url(%26quot%3b%23SvgjsLinearGradient1165%26quot%3b)'%3e%3c/rect%3e%3cpath d='M800 0L522.78 0L800 329.16z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M522.78 0L800 329.16L800 699.12L436.22999999999996 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M436.22999999999996 0L800 699.12L800 789.33L215.46999999999997 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M215.47000000000003 0L800 789.33L800 935.44L154.56000000000003 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 1000L107.04 1000L0 762.56z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 762.56L107.04 1000L396.73 1000L0 638.93z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 638.9300000000001L396.73 1000L397.14000000000004 1000L0 611.1400000000001z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 611.14L397.14000000000004 1000L597.26 1000L0 477.77z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1164'%3e%3crect width='800' height='1000' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='-6.25%25' y1='5%25' x2='106.25%25' y2='95%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1165'%3e%3cstop stop-color='rgba(14%2c 42%2c 71%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(0%2c 70%2c 190%2c 1)' offset='0'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
    background-size: cover;
    background-repeat: no-repeat;
}

.entry-right {
    width: 65%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login {
    min-width: 325px;
    min-height: 600px;
}

.icon-box {
    background: white;
    padding: 0.5rem;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 6px;
    position: relative;
    right: 8px;
}

.icon-box i {
    color: var(--primary-a);
    font-size: var(--text-size-a);
}

.title {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
}

.title span:nth-child(1) {
    font-size: var(--text-size-d);
    font-weight: 600;
}

.title span:nth-child(2) {
    color: var(--text-b);
    font-size: var(--text-size-a);
}

.password {
    margin-top: 2rem;
}

.legend {
    display: flex;
    justify-content: flex-end;
    color: var(--primary-c);
    font-size: var(--text-size-a);
    line-height: 3rem;
}

.legend span {
    font-weight: 600;
    cursor: pointer;
}

.control {
    margin-top: 2rem;
}

.visual {
    width: 100%;
    height: 100vh;
    position: absolute;
}

.bottom {
    font-size: var(--text-size-a);
    color: var(--text-b);
    font-weight: 600;
    text-align: center;
}

.bottom span {
    color: var(--primary-c);
    margin-left: 0.5rem;
    cursor: pointer;
}

.circles {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}

.circles li img {
    width: 100%;
    padding: 10%;
    border-radius: 2rem;
}

.circles li {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    animation: animate 25s linear infinite;
    bottom: -150px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.circles li:nth-child(1) {
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
}


.circles li:nth-child(2) {
    left: 10%;
    width: 40px;
    height: 40px;
    animation-delay: 2s;
    animation-duration: 12s;
}

.circles li:nth-child(3) {
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
}

.circles li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
}

.circles li:nth-child(5) {
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
}

.circles li:nth-child(6) {
    left: 75%;
    width: 100px;
    height: 100px;
    animation-delay: 3s;
}

.circles li:nth-child(7) {
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
}

.circles li:nth-child(8) {
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
}

.circles li:nth-child(9) {
    left: 20%;
    width: 40px;
    height: 40px;
    animation-delay: 2s;
    animation-duration: 35s;
}

.circles li:nth-child(10) {
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
}

@keyframes animate {

    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
    }

    100% {
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
        border-radius: 50%;
    }

}
</style>