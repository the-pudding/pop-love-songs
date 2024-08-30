<!-- Taken from here: https://css-tricks.com/making-pure-css-playpause-button/ -->
<script>
    export let paused = true;
</script>

<button class:paused class='button'></button>

<style>
    .button {
        border: 0;
        padding: 0; /* override Pudding default */
        background: transparent;
        box-sizing: border-box;
        width: 0;
        height: 74px;
        border-color: transparent transparent transparent #202020;
        transition: 100ms all ease;
        cursor: pointer;
        border-style: solid;
        border-width: 37px 0 37px 60px;
    }
    .button.paused {
        border-style: double;
        border-width: 0px 0 0px 60px;
    }
    .button:hover {
        border-color: transparent transparent transparent #404040;
    }
</style>