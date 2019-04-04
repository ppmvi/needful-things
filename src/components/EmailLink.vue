<template>
    <a href="" @click.prevent="sendMail" :aria-label="`E-Mail senden an ${email}`">
        <span>
            {{ splittedEmail[0] }}<span class="d-none"></span>@<span class="d-none"></span>{{ splittedEmail[1] }}
        </span>
    </a>
</template>

<script>
    export default {
        props: {
            email: String
        },
        data() {
            return {
                splittedEmail: ''
            }
        },
        mounted() {
            this.splittedEmail = this.email.split('@');
        },
        methods: {
            sendMail() {
                window.location.href = `mailto:${this.email}`;
            }
        }
    }
</script>
