<script setup lang="ts">
import { h, ref, type Component } from "vue";

import {
    type DataTableColumns,
    type DataTableRowKey,
    useThemeVars,
    NIcon,
    NCard,
    NCollapse,
    NCollapseItem,
    NButton,
    NButtonGroup,
    NDataTable,
    NTag,
    NCode,
    NModal,
    NDivider,
} from "naive-ui";
import {
    CookieOutlined,
    DeleteOutlineOutlined,
    NetworkCheckOutlined,
    RefreshOutlined,
    AddBoxOutlined,
    CloudDownloadOutlined,
    StopCircleOutlined,
    NotStartedOutlined,
} from "@vicons/material";

interface RowData {
    key: number;
    account: string;
    phoneNumber: string;
    expired: boolean;
    disable: boolean;
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
        width: 120,
        align: "left",
        title: "手机号",
    },
    {
        key: "status",
        title: "状态",
        align: "center",
        render: rowData => {
            return [
                rowData.expired ? h(NTag, { type: "error" }, () => "已过期") : h(NTag, { type: "success" }, () => "未过期"),
                rowData.disable
                    ? h(NTag, { type: "warning", style: "margin-left: 1vw" }, () => "已禁用")
                    : h(NTag, { type: "info", style: "margin-left: 1vw" }, () => "已启用"),
            ];
        },
    },
    {
        key: "actions",
        title: "操作",
        width: 350,
        align: "center",
        render: () => {
            interface DataRowActionBtn {
                label: string;
                type: "error" | "info" | "primary" | "warning";
                round: boolean;
                icon: Component;
            }

            const btns: DataRowActionBtn[] = [
                { label: "删除", type: "error", icon: DeleteOutlineOutlined, round: true },
                { label: "检测", type: "info", icon: NetworkCheckOutlined, round: false },
                { label: "刷新", type: "primary", icon: RefreshOutlined, round: false },
                { label: "启用", type: "info", icon: NotStartedOutlined, round: false },
                { label: "禁用", type: "warning", icon: StopCircleOutlined, round: true },
            ];
            return h(NButtonGroup, null, {
                default: () => {
                    return btns.map(btn => {
                        return h(
                            NButton,
                            { type: btn.type, size: "tiny", round: btn.round },
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
        expired: false,
        disable: false,
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
        expired: true,
        disable: true,
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
        expired: false,
        disable: false,
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

const addCookieModal = ref(false);
</script>

<template>
    <div class="container">
        <header>
            <NIcon :size="30">
                <CookieOutlined />
            </NIcon>
            <h1>cookie 管理</h1>
        </header>

        <NCard :content-style="`border-radius: ${themeVars.borderRadiusSmall}`">
            <NCollapse arrow-placement="right">
                <NCollapseItem>
                    <template #header>
                        <p>可以通过下载 <a href="#" @click.stop>cookie 提取程序</a> 来获取 cookie 文件，展开以查看使用方式</p>
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
                <NButton type="error" round size="small" :disabled="checkedRowKeys.length === 0">
                    <template #icon>
                        <NIcon>
                            <DeleteOutlineOutlined />
                        </NIcon>
                    </template>
                    批量删除
                </NButton>
                <NButton type="info" size="small" :disabled="checkedRowKeys.length === 0">
                    <template #icon>
                        <NIcon>
                            <NetworkCheckOutlined />
                        </NIcon>
                    </template>
                    批量检测
                </NButton>
                <NButton type="primary" size="small" :disabled="checkedRowKeys.length === 0">
                    <template #icon>
                        <NIcon>
                            <RefreshOutlined />
                        </NIcon>
                    </template>
                    批量刷新
                </NButton>
                <NButton type="info" size="small" :disabled="checkedRowKeys.length === 0">
                    <template #icon>
                        <NIcon>
                            <NotStartedOutlined />
                        </NIcon>
                    </template>
                    批量启用
                </NButton>
                <NButton type="warning" round size="small" :disabled="checkedRowKeys.length === 0">
                    <template #icon>
                        <NIcon>
                            <StopCircleOutlined />
                        </NIcon>
                    </template>
                    批量禁止
                </NButton>
            </NButtonGroup>

            <div style="display: flex; gap: 1vw">
                <NButton type="primary" round @click="addCookieModal = true">
                    <template #icon>
                        <NIcon>
                            <AddBoxOutlined />
                        </NIcon>
                    </template>
                    添加 cookie
                </NButton>
                <NButton type="primary" round>
                    <template #icon>
                        <NIcon>
                            <CloudDownloadOutlined />
                        </NIcon>
                    </template>
                    下载 cookie 包
                </NButton>
            </div>
        </section>

        <section class="table-content">
            <NDataTable v-model:checked-row-keys="checkedRowKeys" striped :columns="tableColumns" :data="tableDatas" />
        </section>

        <NModal v-model:show="addCookieModal">
            <NCard style="width: 60vw" content-style="display: flex;">
                <div class="add-cookie-modal__upload-file">
                    <h3>cookie 文件上传</h3>
                </div>
                <NDivider vertical style="height: 400px" />
                <div class="add-cookie-modal__account-auth">
                    <h3>账户登录验证</h3>
                </div>
            </NCard>
        </NModal>
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
        align-items: flex-end;
    }

    .table-content {
        padding-bottom: 10px;
    }
}

.add-cookie-modal__upload-file,
.add-cookie-modal__account-auth {
    flex: 1;

    h3 {
        display: flex;
        justify-content: center;
    }
}
</style>
