<script lang="ts">
  import {onMount} from 'svelte'
  type LightDark = 'light' | 'dark'
  interface Window {
    config: {
      [index: string]: any
    }
  }

  const storageKey = "theme-preference";
  let currentTheme = undefined

  const isDarkMode = Array.from(
          document.getElementsByTagName("html")[0]?.classList
  ).includes("dark");

  const changeCanvasTheme = (theme: LightDark) => {
    if (theme === 'dark') {
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
        ? "dark"
        : "light";
  };

  const reflectPreference = (theme: LightDark) => {
    if (theme === "light") document.documentElement.classList.remove("dark");
    if (theme === "dark") document.documentElement.classList.add("dark");
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
    <img src="/src/data/images/icons/moon.svg" on:click={() => setPreference('dark')} alt="Dark Mode">
  {:else}
    <img src="/src/data/images/icons/sun.svg" on:click={() => setPreference('light')} alt="Light Mode">
  {/if}
</div>

<style lang="scss">
  .theme-switch {
    position: absolute;
    top: 74px;
    right: 77px;
    .dark & {
      img {
        filter: invert(1);
      }
    }
  }
</style>
