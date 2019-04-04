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

<script>
  export default {
    props: {
      tel: {
        type: String,
        required: true
      },
      wrapper: Boolean
    },
    methods: {
      call() {
        // eslint-disable-next-line no-useless-escape
        const tel = this.tel.replace(/[\s\/-]/g, '');
        window.location.href = `tel:${tel}`;
      }
    }
  };
</script>
