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
    const MARGIN_PERCENT = 3;
    $: style = `
        position: absolute;
        ${center ? 'top: 50%; left: 50%; transform: translate(-50%, -50%);' : ''}
        ${top ? `top: ${MARGIN_PERCENT}%;` : ''}
        ${bottom ? `bottom: ${MARGIN_PERCENT}%;` : ''}
        ${left ? `left: ${MARGIN_PERCENT}%;` : ''}
        ${right ? `right: ${MARGIN_PERCENT}%;` : ''}
        ${tiltLeft ? 'transform: rotate(-8deg);' : ''}
        ${tiltRight ? 'transform: rotate(8deg);' : ''}
        max-width: ${big ? '40%' : '40%'};
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