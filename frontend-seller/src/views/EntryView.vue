<template>
    <div class="wrap">
        <div class="wrap-left"></div>
        <div class="wrap-right">


            <div class="login">
                <div class="title">
                    <span>Welcome back!</span>
                    <span>Start managing your inventory</span>
                </div>

                <div class="email">
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-envelope" />
                        </InputGroupAddon>
                        <InputText v-model="loginForm.email" placeholder="Email" type="email" style=" font-size: var(--text-size-a);" autofocus fluid/>
                    </InputGroup>

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

            </div>

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
.wrap {
    display: flex;
    height: 100vh;
}

.wrap-left {
    width: 40%;
    background: var(--background-b);
}

.wrap-right {
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login {
    min-width: 300px;
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
    margin-top: 1rem;
}
</style>