<script lang="ts">
  export let cancel: () => void = undefined;
  cancel;
  // function handle_keydown(evt: KeyboardEvent | undefined) {
  //   evt = evt || (window.event as KeyboardEvent);
  //   var isEscape = false;
  //   if ('key' in evt) {
  //     isEscape = evt.key === 'Escape' || evt.key === 'Esc';
  //   } else {
  //     isEscape = (evt as KeyboardEvent).keyCode === 27;
  //   }
  //   if (isEscape) {
  //     cancel();
  //   }
  // }
</script>
<style>
  @keyframes scale {
    from {
      width:0;
    }
    to {
        width:100%;
    }
  }
  @keyframes flicker {
    from {
        background-color: #aaaaaa;
    }
    to {
        background-color: #d61f69;
    }
  }
  .page-loading::before {
    content:" ";
    display:block;
    position:fixed;
    z-index:10;
    height:2px;
    width:100%;
    top:0;
    left:0;
    background-color:#06D;
    animation: flicker infinite ease-out 2s, scale 2s;
    box-shadow:0 2px 2px rgba(0,0,0,.2);
  }
</style>
<!-- <svelte:window on:keydown={handle_keydown} /> -->
<div class="page-loading"></div>
