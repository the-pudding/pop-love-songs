<script>
    export let center = false;
    export let top = false;
    export let bottom = false;
    export let left = false;
    export let right = false;

    export let tiltLeft = false;
    export let tiltRight = false;

    export let big = false;

    export let headline;

    $: style = `
        position: absolute;
        ${center ? 'top: 50%; left: 50%; transform: translate(-50%, -50%);' : ''}
        ${top ? 'top: 0;' : ''}
        ${bottom ? 'bottom: 0;' : ''}
        ${left ? 'left: 0;' : ''}
        ${right ? 'right: 0;' : ''}
        ${tiltLeft ? 'transform: rotate(-10deg);' : ''}
        ${tiltRight ? 'transform: rotate(10deg);' : ''}
        max-width: ${big ? '100%' : '50%'};
        z-index: ${center ? 1 : 0};
    `;

</script>

<a href={headline.url} target="_blank" style={style}>
    <img src={headline.src} alt={headline.alt} />
</a>

<style>
    a {
        max-width: 50%;
        /* max-height: 60%; */
        border: none;
    }

    img {
        object-fit: contain;
    }
</style>