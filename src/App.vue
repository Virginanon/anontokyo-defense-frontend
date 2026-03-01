<script setup lang="ts">
import { darkTheme, NConfigProvider, zhCN, dateZhCN } from "naive-ui";
</script>

<template>
    <NConfigProvider :theme="darkTheme" :locale="zhCN" :date-locale="dateZhCN">
        <RouterView></RouterView>
    </NConfigProvider>
</template>

<style lang="scss"></style>
