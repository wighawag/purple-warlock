<script lang="ts">
  import Button from '../components/Button.svelte';
</script>

<section class="py-8 px-4 text-center">
  <div class="max-w-auto md:max-w-lg mx-auto">
    <img class="mb-8 mx-auto" src="pwa/android-chrome-256x256.png" alt="" />
    <h2 class="text-5xl mb-2 font-heading">Jolly Roger</h2>
    <p class="mb-6 text-gray-500">A template to build decentralised applications</p>
    <div class="max-w-md mx-auto mt-5 space-y-3 md:mt-8 md:space-y-5">
      <div class="space-y-5 sm:flex sm:justify-center sm:space-y-0 sm:space-x-3">
        <Button class="big secondary" href="Demo" label="Try ethereum integration">Demo</Button>
        <Button class="big secondary" href="Wallet" label="Check wallet status">Wallet</Button>
        <Button
          class="big secondary"
          href="https://github.com/wighawag/decentralised-application"
          label="get it from github!">
          Get It
        </Button>
      </div>
    </div>
  </div>
</section>
