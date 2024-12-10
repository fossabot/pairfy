<template>
    <div class="wrap">
        <div class="container">
            <div class="nav">

            </div>
            <div class="grid">
                <div class="col left">
                    <div class="timeline">
                        <div class="timeline-item">
                            <div class="timeline-bar">
                                <div class="timeline-bar-box">
                                    1
                                </div>
                                <div class="timeline-bar-line" />
                            </div>
                            <div class="timeline-body">
                                <div class="timeline-title">
                                    Order Created
                                </div>
                                <div class="timeline-content">
                                    Confirm
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col right">
                    <div class="chat">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="css" scoped>
.wrap {
    display: flex;
    justify-content: center;
}

.container {

    min-height: 100vh;
    max-width: 1200px;
    width: 100%;
}

.nav {
    height: 50px;
    border-bottom: 1px solid var(--border-a);
}

.grid {
    display: grid;
    grid-template-columns: 70% 30%;
}

.col {}

.col.left {}

.col.right {
    border-left: 1px solid var(--border-a);
}

.chat {
    width: 100%;
    height: 700px;
}


.timeline {
    display: block;
    width: 100%;
    box-sizing: border-box;
}

.timeline-item {
    display: flex;
    border: 1px solid red;
    width: inherit;
}

.timeline-bar {
    width: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.timeline-bar-box {
    width: inherit;
    height: 50px;
    background: blue;
}

.timeline-bar-line {
    width: 2px;
    height: 100%;
    background: var(--text-a);

}

.timeline-body {
    display: flex;
    flex-direction: column;
    height: 200px;
    width: inherit;
}

.timeline-title {
    line-height: 3rem;
    font-weight: 700;
}

.timeline-content {
    border: 1px solid var(--border-a);
    border-radius: 12px;
    height: 100%;
    padding: 1rem;
    width: inherit;
}
</style>