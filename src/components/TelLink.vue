<template>
  <a
    href=""
    :aria-label="`Die Nummer ${tel} anrufen`"
    @click.prevent="call"
  >
    <span
      v-if="!doNotShowTel"
      v-text="tel"
    />
    <slot />
  </a>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component({
    name: 'TelLink'
  })
  export default class TelLink extends Vue {
    @Prop({ required: true }) tel!: string;
    @Prop() doNotShowTel!: boolean;

    get callableTel() {
      return this.tel.replace(/[\s\/-]/g, '').replace(/\(.*\)/g, '');
    }

    call() {
      window.location.href = `tel:${this.callableTel}`;
    }
  };
</script>
