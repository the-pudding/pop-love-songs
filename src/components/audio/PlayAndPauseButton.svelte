<!-- Taken from here: https://css-tricks.com/making-pure-css-playpause-button/ -->
<script>
    export let paused = true;
</script>
<div class="fixed-width-container">
    <div class:paused class='inner-icon'></div>
</div>

<style>
    .fixed-width-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 24px;
        margin: 0;
        padding: 0;
    }

    .inner-icon {
        border: 0;
        background: transparent;
        box-sizing: border-box;
        width: 0;
        /* height: 74px; */
        height: 16px;
        border-color: transparent transparent transparent #202020;
        transition: 100ms all ease;
        cursor: pointer;
        border-style: solid;
        /* border-width: 37px 0 37px 60px; */
        border-width: 8px 0 8px 12.9px;
    }

    .inner-icon.paused {
        border-style: double;
        /* border-width: 0px 0 0px 60px; */
        border-width: 0px 0 0px 16px;
    }

    .inner-icon:hover {
        border-color: transparent transparent transparent #404040;
    }
</style>