<script lang="ts">
  import { clazz } from '$lib/logic/utils'
  import { tick } from 'svelte'
  export let containerCardClass = ''
  export let containerCardInnerClass = ''
  export let frontCardClass = ''
  export let backCardClass = ''
  export let isUp = true

  let enableTransition = true

  export async function flipFromBack() {
    enableTransition = false
    await tick()
    isUp = false
    await tick()
    setTimeout(() => {
      enableTransition = true
      isUp = true
    }, 10)
  }
</script>

<div class={clazz(containerCardClass, 'container-card drop-shadow-md')} on:click>
  <div
    class={clazz(containerCardInnerClass, 'container-card-inner relative w-full h-max transform')}
    class:enableTransition
    class:flipped={!isUp}
  >
    <div class={clazz(frontCardClass, 'front-card  w-full h-fit backface-invisible')}>
      <slot name="front" />
    </div>
    <div class={clazz(backCardClass, 'back-card absolute inset-0 backface-invisible')}>
      <slot name="back" />
    </div>
  </div>
</div>

<style>
  .container-card {
    perspective: 3000px;
  }
  .enableTransition {
    transition-property: transform !important;
  }
  .container-card-inner {
    transform-style: preserve-3d;
    transition-property: none;
    transition-duration: 500ms;
    transition-timing-function: cubic-bezier(1, 0, 0.47, 1.05);

    transform-origin: top;
  }
  .flipped {
    transform: translateY(100%) rotateX(180deg);
  }
  .back-card {
    transform: rotateY(180deg);
  }
  .backface-invisible {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
</style>
