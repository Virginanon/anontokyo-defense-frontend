<script setup lang="ts">
import { type Component, h, ref } from "vue";

import { RouterLink, useRoute } from "vue-router";
import { type MenuOption, NLayout, NLayoutContent, NLayoutSider, NMenu, NIcon, NLayoutFooter } from "naive-ui";
import { CookieOutlined, ReportGmailerrorredOutlined, RadarFilled } from "@vicons/material";
import { useMediaQuery } from "@vueuse/core";

const isMobile = useMediaQuery("(max-width: 768px)");
const collapsed = ref(false);

function renderMenuLabel(label: string, key: string) {
    return () => h(RouterLink, { to: { name: key } }, { default: () => label });
}

function renderMenuIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) });
}

const desktopMenuOptions: MenuOption[] = [
    {
        label: renderMenuLabel("cookie 管理", "cookie-manage"),
        key: "cookie-manage",
        icon: renderMenuIcon(CookieOutlined),
    },
    {
        label: renderMenuLabel("自动化举报", "auto-report"),
        key: "auto-report",
        icon: renderMenuIcon(ReportGmailerrorredOutlined),
    },
    {
        label: renderMenuLabel("图片监控", "image-detect"),
        key: "image-detect",
        icon: renderMenuIcon(RadarFilled),
    },
];

const route = useRoute();
const defaultMenuOption = route.matched[1]?.name?.toString() ?? "cookie-manage";
</script>

<template>
    <!-- 桌面端 -->
    <template v-if="!isMobile">
        <NLayout class="desktop-layout" has-sider>
            <NLayoutSider
                bordered
                :width="300"
                collapse-mode="width"
                :collapsed="collapsed"
                :collapsed-width="64"
                show-trigger="bar"
                @collapse="collapsed = true"
                @expand="collapsed = false"
                content-style="display: flex; flex-direction: column; justify-content: space-between"
            >
                <NMenu
                    :default-value="defaultMenuOption"
                    :collapsed="collapsed"
                    :collapsed-width="64"
                    :collapsed-icon-size="25"
                    :options="desktopMenuOptions"
                ></NMenu>
            </NLayoutSider>

            <NLayoutContent content-style="padding: 10px; padding-left: 20px">
                <RouterView></RouterView>
            </NLayoutContent>
        </NLayout>
    </template>

    <!-- 移动端 -->
    <template v-else>
        <NLayout class="mobile-layout">
            <NLayoutContent content-style="padding: 10px">
                <RouterView></RouterView>
            </NLayoutContent>

            <NLayoutFooter></NLayoutFooter>
        </NLayout>
    </template>
</template>

<style scoped lang="scss">
.desktop-layout {
    height: 100vh;
}

.mobile-layout {
    height: 100vh;

    :deep(.n-layout-scroll-container) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
}
</style>
