<!--
//  DebugWindow.vue
//
//  Copyright 2021 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
-->

<style lang="scss" scoped>
    .q-field {
        background-color: rgba(0, 0, 0, 0.4);
    }
</style>

<template>
    <OverlayShell
        icon="directions_bus"
        title="Debug"
        :managerProps="propsToPass"
        :defaultHeight="500"
        :defaultWidth="600"
        :defaultLeft="40"
        :defaultTop="400"
        :hoverShowBar="true"
        :style="{ 'background': 'rgba(0, 0, 0, 0.3)', 'box-shadow': 'none', border: 'none' }"
    >
        <q-tabs
            v-model="tab"
            dense
            >
            <q-tab name="Messages" icon="chat" label="Messages" />
            <q-tab name="Avatars" icon="people" label="Avatars" />
            <q-tab name="Testing" icon="code" label="Testing" />
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="Messages">
                <q-list v-for="msg in $store.state.messages.messages" :key="msg.id">
                    <div> {{ msgSender(msg) }} : {{ msgText(msg) }} </div>
                </q-list>
            </q-tab-panel>
            <q-tab-panel name="Avatars">
                 <button v-on:click="consoleLog">Click ME</button>
                <div>DisplayName: {{ $store.state.avatar.displayName }}</div>
                <div>Location: {{ $store.state.avatar.location }}</div>
                <div></div>
                <div>Avatars: {{ $store.state.avatars.count }} </div>
                <q-list v-for="ava in $store.state.avatars.avatarsInfo.values()" :key="ava">
                    <h6 style="margin:20px 0 0 0;">{{ava.displayName}}</h6>
                    <q-list v-for="(value, name) in ava" :key="name">
                        {{ name }}: {{ value }}
                    </q-list>
                </q-list>

            </q-tab-panel>
            <q-tab-panel name="Testing">
                 <button v-on:click="moveAvatar('forward')">FORWARD</button>
                 <button v-on:click="moveAvatar('back')">BACKWARD</button>
                 <button v-on:click="moveAvatar('left')">LEFT</button>
                 <button v-on:click="moveAvatar('right')">RIGHT</button>
                 <div> Store State Location: {{ $store.state.avatar.position }}</div>
            </q-tab-panel>

        </q-tab-panels>
        <!-- <q-inner-loading :showing="">
            <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading> -->
    </OverlayShell>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import { AMessage, FloofChatMessage } from "@Modules/domain/message";
// import { Greeter } from "@Modules/domain/testing";

// import Log from "@Modules/debugging/log";

import OverlayShell from "../OverlayShell.vue";
import { Store, Actions as StoreActions } from "@Store/index";

export default defineComponent({
    name: "DebugWindow",

    props: {
        propsToPass: { type: Object, default: () => ({}) }
    },

    components: {
        OverlayShell
    },

    data: () => ({
        messageInput: "",
        tab: null,
        subscribed: false  // 'true' if subscribed for messages
    }),

    computed: {
    },

    methods: {
        moveAvatar(direction: string): void {
            console.log("Moving function", direction);

            // spread syntax to clone object so we do not get Store mutation error.
            // const curPos = Store.state.avatar.position;
            const curPos = { ...Store.state.avatar.position };

            switch (direction) {
                case "forward": {

                    curPos.x = curPos.x + 1;
                    // eslint-disable-next-line no-void
                    void Store.dispatch(StoreActions.TEST_MOVEMENT, curPos);
                    break; }
                case "back": {
                    curPos.x = curPos.x - 1;
                    // eslint-disable-next-line no-void
                    void Store.dispatch(StoreActions.TEST_MOVEMENT, curPos);
                    break; }
                case "right": {
                    curPos.y = curPos.y + 1;
                    // eslint-disable-next-line no-void
                    void Store.dispatch(StoreActions.TEST_MOVEMENT, curPos);
                    break; }
                case "left": {
                    curPos.y = curPos.y - 1;
                    // eslint-disable-next-line no-void
                    void Store.dispatch(StoreActions.TEST_MOVEMENT, curPos);
                    break; }
                default:
                    break;
            }
        },

        runTest() {
            // console.log(StoreActions.TEST_ACTION);

            const position = { x: 10, y: 10, z: -0.1 };
            // eslint-disable-next-line no-void
            void Store.dispatch(StoreActions.TEST_MOVEMENT, position);
        },
        consoleLog: function() {
            // for (const avatar of this.$store.state.avatars.avatarsInfo) {
            //     console.log(avatar[1].position);
            // }
            console.log(this.$store.state);

        },
        getProfilePicture(username: string): string | null {
            // Should store profile pictures after retrieving and then pull each
            // subsequent one from cache instead of hitting metaverse every time.

            // This is filler functionality to enable the UI to be developed more correctly now.
            if (username === "testerino") {
                return "https://cdn.quasar.dev/img/avatar4.jpg";
            }
            return null;
        },
        // Return the sender Id included in the message. Returns the ID string if no displayname
        msgSender(pMsg: AMessage): string {
            if (pMsg.messageJSON) {
                // eslint-disable-next-line max-len
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unnecessary-type-assertion
                const fMsg = <FloofChatMessage>pMsg.messageJSON;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
                return fMsg.displayName;
            }
            return pMsg.senderId.stringify();
        },
        msgText(pMsg: AMessage): string {
            if (pMsg.messageJSON) {
                // eslint-disable-next-line max-len
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unnecessary-type-assertion
                const fMsg = <FloofChatMessage>pMsg.messageJSON;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
                return fMsg.message;
            }
            return pMsg.message;
        }
    }

    // created: function() {
    // }

    // mounted: function () {
    // }
});
</script>
