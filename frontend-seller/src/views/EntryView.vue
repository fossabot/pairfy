<template>
    <div class="wrap">
        <div class="wrap-left">
            <div class="card">
                <div class="logo">
                    <span> Buy and sell in the Cardano ecosystem.</span>
                </div>


            </div>
        </div>

        <div class="wrap-right">

            <!--LOGIN-->
            <div class="login">
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
                                :feedback="false" inputStyle=" font-size: var(--text-size-a);" />
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
            </div>
            <!--LOGIN-->


        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import dashboardAPI from '@/views/api/index';

const { getUserData } = dashboardAPI();

const loginForm = ref({
    email: "",
    password: ""
})

</script>

<style lang="css" scoped>
::v-deep(.p-button-label) {
    font-weight: 600;
}

::v-deep(.p-divider-content) {
    color: var(--text-b);
}

.wrap {
    display: flex;
    height: 100vh;
}

.wrap-left {
    width: 30%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo {
    font-family: "Manrope", serif;
    font-weight: 600 !important;
    font-size: var(--text-size-h);
    padding: 1rem;
    color: white;
    font-kerning: normal;
}

.card {
    width: calc(100% - 1rem);
    height: calc(100% - 1rem);
    display: flex;
    flex-direction: column;
    background: var(--primary-a);
    border-radius: 1rem;
    padding: 2rem;
}

.wrap-right {
    width: 70%;
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
</style>