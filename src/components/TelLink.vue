<template>
    <a href="" @click.prevent="call" :aria-label="`Die Nummer ${tel} anrufen`">
        <span v-text="tel" v-if="!wrapper"></span>
        <slot></slot>
    </a>
</template>

<script>
    export default {
        props: {
            tel: String,
            wrapper: Boolean
        },
        methods: {
            call() {
                // eslint-disable-next-line no-useless-escape
                const tel = this.tel.replace(/[\s\/-]/g, '');
                window.location.href = `tel:${tel}`;
            }
        }
    }
</script>
