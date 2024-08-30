<!-- Taken from here: https://css-tricks.com/making-pure-css-playpause-button/ -->
<script>
    export let paused = true;
</script>

<div class:paused class='button'></div>

<style>
    .button {
        border: 0;
        padding: 0; /* override Pudding default */
        background: transparent;
        box-sizing: border-box;
        width: 0;
        /* height: 74px; */
        height: 24px;
        border-color: transparent transparent transparent #202020;
        transition: 100ms all ease;
        cursor: pointer;
        border-style: solid;
        /* border-width: 37px 0 37px 60px; */
        border-width: 12px 0 12px 19.4px;
    }
    .button.paused {
        border-style: double;
        /* border-width: 0px 0 0px 60px; */
        border-width: 0px 0 0px 24px;
    }
    .button:hover {
        border-color: transparent transparent transparent #404040;
    }
</style>