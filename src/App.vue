<script setup lang="ts">
import { darkTheme, NConfigProvider, zhCN, dateZhCN } from "naive-ui";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";

hljs.registerLanguage("json", json);
</script>

<template>
    <NConfigProvider :theme="darkTheme" :locale="zhCN" :date-locale="dateZhCN" :hljs="hljs">
        <RouterView></RouterView>
    </NConfigProvider>
</template>

<style lang="scss"></style>
