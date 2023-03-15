<script lang="ts">
  import {onMount} from 'svelte'
  enum Theme {
    dark = 'dark',
    light = 'light'
  }
  type LightDark = Theme.dark | Theme.light

  let currentTheme = undefined
  const storageKey = "theme-preference";

  const changeCanvasTheme = (theme: LightDark) => {
    if (theme === Theme.dark) {
      // config is available on the window, exposed by fluid.js
      config.BACK_COLOR = { r: 33, g: 33, b: 33 }
    } else {
      config.BACK_COLOR = { r: 255, g: 255, b: 255 }
    }
  }

  const getColorPreference = (): LightDark => {
    if (localStorage.getItem(storageKey))
      return <LightDark>localStorage.getItem(storageKey);
    else
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? Theme.dark
        : Theme.light;
  };

  const reflectPreference = (theme: LightDark) => {
    if (theme === Theme.light) document.documentElement.classList.remove(Theme.dark);
    if (theme === Theme.dark) document.documentElement.classList.add(Theme.dark);
    changeCanvasTheme(theme)
  };

  function setPreference(theme: LightDark) {
    currentTheme = theme
    localStorage.setItem(storageKey, theme);
    reflectPreference(theme);
  }

  onMount(() => {
    const theme = getColorPreference()
    setPreference(theme)
  })
</script>

<div class="theme-switch">
  {#if (currentTheme === 'light')}
    <img src="/moon.svg" on:click={() => setPreference(Theme.dark)} alt="Dark Mode">
  {:else}
    <img src="/sun.svg" on:click={() => setPreference(Theme.light)} alt="Light Mode">
  {/if}
</div>

<style lang="scss">
  .theme-switch {
    position: fixed;
    top: 74px;
    right: 77px;
    cursor: pointer;
    .dark & {
      img {
        filter: invert(1);
      }
    }
    @media screen and (max-width: 1000px) {
      position: absolute;
      top: 30px;
      right: 30px;
    }
  }
</style>
