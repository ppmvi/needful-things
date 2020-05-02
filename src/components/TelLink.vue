<template>
  <a
    href=""
    :aria-label="`Die Nummer ${tel} anrufen`"
    @click.prevent="call"
  >
    <span
      v-if="!wrapper"
      v-text="tel"
    />
    <slot />
  </a>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component
  export default class TelLink extends Vue {
    @Prop({ required: true }) tel!: string;
    @Prop() wrapper!: boolean;

    call() {
      const tel = this.tel.replace(/[\s\/-]/g, '').replace(/\(.*\)/g, '');
      window.location.href = `tel:${tel}`;
    }
  };
</script>
