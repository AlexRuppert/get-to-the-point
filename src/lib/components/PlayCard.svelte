<script lang="ts">
  import { clazz } from '$lib/logic/utils'
  export let containerCardClass = ''
  export let containerCardInnerClass = ''
  export let frontCardClass = ''
  export let backCardClass = ''
  export let isUp = true

  $: {
    console.log(isUp)
  }
</script>

<div class={clazz(containerCardClass, 'container-card ')} on:click>
  <div
    class={clazz(
      containerCardInnerClass,
      'container-card-inner relative w-full h-full transition-transform duration-700 transform origin-center'
    )}
    class:flipped={!isUp}
  >
    <div class={clazz(frontCardClass, 'front-card absolute w-full h-full backface-invisible')}>
      <slot name="front" />
    </div>
    <div
      class={clazz(backCardClass, 'back-card absolute w-full h-full backface-invisible flipped')}
    >
      <slot name="back" />
    </div>
  </div>
</div>

<style>
  .container-card {
    perspective: 1000px;
  }
  .container-card-inner {
    transform-style: preserve-3d;
  }
  .flipped {
    transform: rotateY(180deg);
  }
  .backface-invisible {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  :global(.front-card > *) {
    @apply w-full h-full;
  }
  :global(.back-card > *) {
    @apply w-full h-full;
  }
</style>
