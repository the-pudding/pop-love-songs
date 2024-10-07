<script>
    export let diameter = 24;
    export let yAdjustment = 0;

    $: style = `
        width: ${diameter}px; 
        height: ${diameter}px; 
        
        margin-top: -${yAdjustment}px;
        transform: translateY(${yAdjustment}px);
    `;
</script>

<div {style} title="hi, i'm a bubble. or a song, I guess..." />

<style>
    div {
        display: inline-block;
        background-color: var(--color-not-a-love-song);
        border: 1px solid black;
        border-radius: 50%;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    }
</style>