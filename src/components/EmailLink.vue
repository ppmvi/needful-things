<template>
  <a
    href=""
    aria-label="E-Mail senden"
    @click.prevent="sendMail"
  >
    <span>
      {{ splittedEmail[0] }}<span class="d-none" />@<span class="d-none" />{{ splittedEmail[1] }}
    </span>
  </a>
</template>

<script>
  export default {
    props: {
      email: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        splittedEmail: ''
      };
    },
    mounted() {
      this.splittedEmail = this.email.split('@');
    },
    methods: {
      sendMail() {
        window.location.href = `mailto:${this.email}`;
      }
    }
  };
</script>
