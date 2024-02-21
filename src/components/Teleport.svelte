<script lang="ts">

    import {onMount} from "svelte";

    export let to: string
    let teleportWrapper: HTMLElement

    onMount(() => {
        const toDiv = document.querySelector(to)
        toDiv.innerHTML = ''
        const fragment = teleportWrapper.children[0];
        toDiv.appendChild(fragment)
        fragment.children[0].classList.remove('hide')
    })

</script>

<div class="teleport" bind:this={teleportWrapper}>
    <slot/>
</div>
