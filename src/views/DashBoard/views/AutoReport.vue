<script setup lang="ts">
import { NEmpty } from "naive-ui";

import emptyIcon from "../../../assets/images/anon.webp";
</script>

<template>
    <NEmpty>
        <h1>auto report</h1>
        <p style="text-align: center">功能暂未实现</p>

        <template #icon>
            <img :src="emptyIcon" />
        </template>
    </NEmpty>
</template>

<style scoped lang="scss">
:deep(.n-empty__icon) {
    width: 150px;
    height: 150px;

    img {
        width: 150px;
        height: 150px;
    }
}
</style>
