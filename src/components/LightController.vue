<template>
    <div>
        <h1>welcome to lightcontrol</h1>
        <div ref="activitylog" class="activitylog">
            <p class="logheader">activity log:</p>
            <p class="logtext" v-for="(message, index) in activitylog.reverse()" :key="index">[{{ new Date(message.timestamp).toLocaleTimeString() }}] {{ message.message }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'LightController',
        data() {
            return {
                activitylog: [],
                socket: null,
            }
        },
        methods: {

        },
        sockets: {
            activitylog(log) {
                this.activitylog = log;
                this.$refs.activitylog.scrollBottom = this.$refs.activitylog.scrollHeight;
            }
        },
        props: {
            connected: Boolean,
            users: Object,
            username: String,
            registered: Boolean,
        }
    }
</script>

<style lang="css" scoped>

.activitylog {
    height: 200px;
    overflow-y: scroll;
    padding: 5px;
    width: 500px;
    background-color: whitesmoke;
    position: absolute;
    bottom: 5px;
    right: 0;
    border-radius: 5px;
}

.logheader {
    width: 100%;
    background-color: whitesmoke;
}

.logtext {
    position: relative;
}

</style>