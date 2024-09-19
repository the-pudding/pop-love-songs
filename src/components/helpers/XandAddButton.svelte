<script>
    import variables from '$data/variables.json';
    export let rotateIntoPlusSign = false;
    export let diameter;
    export let selectionColor;
    export let selectionBackgroundColor;
    export let isSelected;

    $: backgroundImage = `url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40px' height='40px' viewbox='0 0 40 40'%3E%3Cpath d='M 10,10 L 30,30 M 30,10 L 10,30' stroke='${isSelected ? selectionBackgroundColor : 'black'}' stroke-width='4' stroke-linecap='butt' /%3E%3C/svg%3E\")`;

    $: style = `
        transform: rotate(${rotateIntoPlusSign ? 45 : 0}deg);
        height: ${diameter}px;
        width: ${diameter}px;
        background-color: ${isSelected ? selectionColor : variables.color['cream-background']};
        background-image: ${backgroundImage};
        background-size: 100%;
    `;
</script>

<div class="x" {style} />

<style>
    .x {
        display: inline-block;
        border-radius: 100%;
        box-shadow: 2px 2px 4px rgb(70, 70, 70);
        transition: transform 1s cubic-bezier(0.68, -0.55, 0.27, 2);
    }
</style>