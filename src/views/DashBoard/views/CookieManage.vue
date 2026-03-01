<script setup lang="ts">
import { h, ref, type Component } from "vue";

import {
    type DataTableColumns,
    useThemeVars,
    NIcon,
    NCard,
    NCollapse,
    NCollapseItem,
    NButton,
    NButtonGroup,
    NDataTable,
    type DataTableRowKey,
    NTag,
    NCode,
} from "naive-ui";
import {
    CookieOutlined,
    DeleteOutlineOutlined,
    NetworkCheckOutlined,
    RefreshOutlined,
    AddBoxOutlined,
} from "@vicons/material";

interface RowData {
    key: number;
    account: string;
    phoneNumber: string;
    status: "expired" | "unexpired";
    cookie: string;
}

const tableColumns: DataTableColumns<RowData> = [
    {
        type: "selection",
    },
    {
        key: "account",
        align: "left",
        title: "账户",
        width: 200,
        ellipsis: {
            tooltip: true,
        },
    },
    {
        key: "phoneNumber",
        align: "left",
        title: "手机号",
    },
    {
        key: "status",
        align: "center",
        title: "状态",
        render: rowData => {
            if (rowData.status === "expired") {
                return h(NTag, { type: "error" }, { default: () => "已过期" });
            } else {
                return h(NTag, { type: "success" }, { default: () => "未过期" });
            }
        },
    },
    {
        key: "actions",
        title: "操作",
        align: "center",
        render: () => {
            interface DataRowActionBtn {
                label: string;
                type: "error" | "info" | "primary";
                round: boolean;
                icon: Component;
            }

            const btns: DataRowActionBtn[] = [
                { label: "删除", type: "error", icon: DeleteOutlineOutlined, round: true },
                { label: "检测", type: "info", icon: NetworkCheckOutlined, round: false },
                { label: "刷新", type: "primary", icon: RefreshOutlined, round: true },
            ];
            return h(NButtonGroup, null, {
                default: () => {
                    return btns.map(btn => {
                        return h(
                            NButton,
                            { type: btn.type, size: "small", round: btn.round },
                            { default: () => btn.label, icon: () => h(NIcon, null, { default: () => h(btn.icon) }) },
                        );
                    });
                },
            });
        },
    },
    {
        type: "expand",
        title: "查看细节",
        width: "100",
        align: "center",
        renderExpand: rowData => {
            return h(NCode, { code: rowData.cookie, language: "json", showLineNumbers: true });
        },
    },
];

const themeVars = useThemeVars();
const checkedRowKeys = ref<DataTableRowKey[]>([]);
const tableDatas = ref<RowData[]>([
    {
        key: 1,
        account: "111fjawioejfoaiwjefojawoefjoawjfojweofjawojefoawjefoi",
        phoneNumber: "19230582134",
        status: "unexpired",
        cookie: `{
    "name": "session_id",
    "value": "abc123xyz789",
    "domain": ".example.com",
    "path": "/",
    "expires": "2026-03-02T21:52:25.000Z",
    "httpOnly": true,
    "secure": true,
    "sameSite": "Lax"
}`,
    },
    {
        key: 2,
        account: "111",
        phoneNumber: "19230582134",
        status: "expired",
        cookie: `{
    "name": "session_id",
    "value": "abc123xyz789",
    "domain": ".example.com",
    "path": "/",
    "expires": "2026-03-02T21:52:25.000Z",
    "httpOnly": true,
    "secure": true,
    "sameSite": "Lax"
}`,
    },
    {
        key: 3,
        account: "111",
        phoneNumber: "19230582134",
        status: "unexpired",
        cookie: `{
    "name": "session_id",
    "value": "abc123xyz789",
    "domain": ".example.com",
    "path": "/",
    "expires": "2026-03-02T21:52:25.000Z",
    "httpOnly": true,
    "secure": true,
    "sameSite": "Lax"
}`,
    },
]);
</script>

<template>
    <div class="container">
        <header>
            <NIcon :size="30"><CookieOutlined /></NIcon>
            <h1>cookie 管理</h1>
        </header>

        <NCard :content-style="`border-radius: ${themeVars.borderRadiusSmall}`">
            <NCollapse arrow-placement="right">
                <NCollapseItem>
                    <template #header>
                        <p>
                            可以通过下载 <a href="#" @click.stop>cookie 提取程序</a> 来获取 cookie
                            文件，展开以查看使用方式
                        </p>
                    </template>
                    <div>
                        <p>1. jfaowejfoj</p>
                        <p>2. jfaowejfoj</p>
                        <p>3. jfaowejfoj</p>
                        <p>4. jfaowejfoj</p>
                    </div>
                </NCollapseItem>
            </NCollapse>
        </NCard>

        <section class="table-menus">
            <NButtonGroup>
                <NButton type="error" round :disabled="checkedRowKeys.length === 0">
                    <template #icon>
                        <NIcon>
                            <DeleteOutlineOutlined />
                        </NIcon>
                    </template>
                    批量删除
                </NButton>
                <NButton type="info" :disabled="checkedRowKeys.length === 0">
                    <template #icon>
                        <NIcon>
                            <NetworkCheckOutlined />
                        </NIcon>
                    </template>
                    批量检测
                </NButton>
                <NButton type="primary" round :disabled="checkedRowKeys.length === 0">
                    <template #icon>
                        <NIcon>
                            <RefreshOutlined />
                        </NIcon>
                    </template>
                    批量刷新
                </NButton>
            </NButtonGroup>

            <NButton type="primary" round>
                <template #icon>
                    <NIcon>
                        <AddBoxOutlined />
                    </NIcon>
                </template>
                添加 cookie
            </NButton>
        </section>

        <section class="table-content">
            <NDataTable v-model:checked-row-keys="checkedRowKeys" striped :columns="tableColumns" :data="tableDatas" />
        </section>
    </div>
</template>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 1vh;

    header {
        display: flex;
        align-items: center;
        gap: 1vw;

        h1 {
            font-size: 2vw;
        }
    }

    .table-menus {
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
    }

    .table-content {
        padding-bottom: 10px;
    }
}
</style>
