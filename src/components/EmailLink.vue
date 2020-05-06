<template>
  <a
    href=""
    aria-label="E-Mail senden"
    @click.prevent="sendMail"
  >
    <span v-if="!$slots.default">
      {{ splittedEmail[0] }}<span class="hidden" />(at)<span class="hidden" />{{ splittedEmail[1] }}
    </span>
    <slot v-else></slot>
  </a>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component
  export default class EmailLink extends Vue {
    @Prop({ required: true }) email!: string;

    get splittedEmail() {
      return this.email.split('@');
    }

    sendMail() {
      window.location.href = `mailto:${this.email}`;
    }
  }
</script>
