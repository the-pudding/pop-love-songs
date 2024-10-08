<script>
	
    import {afterUpdate, onMount, tick} from "svelte";
    import urlParams from "../../utils/urlParams.js";
    import { tiemposFriendlyTextShadow } from "$utils/styling.js";
    import viewport from "$stores/viewport.js";

    import CustomTap from './../helpers/CustomTap.svelte';

    import XandAddButton from "$components/helpers/XandAddButton.svelte";
    import ExampleBubble from "./ExampleBubble.svelte";

    import { selectedSong, selectedPerformers, typesTreatedAsNonLoveSongs, showAggregateSnakeChart, songSearchString, performerSearchString } from "$stores/searchAndFilter.js"
    import {storySteps, currentStoryStepIndex, currentStoryStep} from "$stores/storySteps.js"
    import { getYPositionForPercentage, outermostMargin } from "$stores/canvasPosition.js";
	import DataMethodsModal from "./DataMethodsModal.svelte";	
	
	

    function updateQueryParams() {
        urlParams.set("step", $currentStoryStepIndex);
    }

    // Find button in gDoc text that opens modal
    let showModal = false;
    let container;
    const addModalOpenButtonListener = () => {
        const modalOpenButton = container && container.querySelector('.modalTrigger')
        if (modalOpenButton) {
            modalOpenButton.style.textShadow = tiemposFriendlyTextShadow();
            modalOpenButton.style.marginLeft = "2px";
            modalOpenButton.style.marginRight = "2px";

            modalOpenButton.addEventListener('click', () => {
                showModal = true;
            })
        }
    }

    const REMOVE_ICON_CLASS = "remove-love-song-type-icon-within-text";
    const Y_ADJUSTMENT = 8; // NOTE: careful, this magic number is also set in the copy gdoc
    const addRemoveButtonComponentToText = () => {
		const el = document.querySelector(`.${REMOVE_ICON_CLASS}`);
        
        if (!el || el.children.length > 0) {
            return;
        }

        // NOTE: we adjust the y-margin to offset the translateY (below), to avoid changing the text line-height
        el.style = `margin-top: -${Y_ADJUSTMENT}px; display: inline-block;`;
        new XandAddButton({
            target: el,
            props: {
                rotateIntoPlusSign: false,
                diameter: $viewport.isLikelyInMobileLandscape ? 24 : 28,
                selectionColor: null,
                selectionBackgroundColor: null,
                isSelected: false,
                transformProperties: `translateY(${Y_ADJUSTMENT}px)`,
                title: "I'm a demo remove button. I don't do anything. They just hired me... for my looks. *sigh*"
            }
        });

	};

    const EXAMPLE_BUBBLE_CLASS = "in-text-bubble-example";
    const addBubbleComponentToText = () => {
        const el = document.querySelector(`.${EXAMPLE_BUBBLE_CLASS}`);
        
        if (!el || el.children.length > 0) {
            return;
        }

        new ExampleBubble({
            target: el,
            props: {
                diameter: $viewport.isLikelyInMobileLandscape ? 24 : 28,
                yAdjustment: Y_ADJUSTMENT
            }
        });

    }

    const renderInTextComponents = () => {
        addModalOpenButtonListener();
        addRemoveButtonComponentToText();
        addBubbleComponentToText();
    }

    afterUpdate(() => {
        updateQueryParams();
        renderInTextComponents();
    });
    
    onMount(async () => {
       const urlIndex = parseInt(urlParams.get("step")?.toString() || "0");
       $currentStoryStepIndex = urlIndex > storySteps.length - 1 ? 0 : urlIndex;

       await tick();
       renderInTextComponents();
    });

    // Buttons
    const onPreviousButtonClick = () => {
        if ($currentStoryStepIndex > 0) $currentStoryStepIndex--;
    }
    const onNextButtonClick = () => {
        if ($currentStoryStepIndex < storySteps.length - 1) $currentStoryStepIndex++;
    }

    const onTap = ({ detail }) => {
		detail === "right" ? onNextButtonClick() : onPreviousButtonClick();
	};

    const updateFilterFilterState = () => {
        // clear any selections if you navigate to a new story step (story steps don't ever directly set these)
        selectedSong.set({}) 
        selectedPerformers.set([])
        // als clear any user input text
        songSearchString.set("")
        performerSearchString.set("")
        
        typesTreatedAsNonLoveSongs.set([...$currentStoryStep.searchAndFilterState.typesTreatedAsNonLoveSongs])
        showAggregateSnakeChart.set($currentStoryStep.visualEncodings.showAggregateSnakeChart)
    }

    $: $currentStoryStepIndex, updateFilterFilterState();

    $: backgroundGradientStyle = `
        position: fixed; top: 0; left: 0; width: 100%; 
        /* we want it to extend from the top of the page right down to where the chart starts */
        height: ${$getYPositionForPercentage(0)}px; 
        background: ${$currentStoryStep.text ? 'linear-gradient(to bottom, var(--color-cream-background), transparent)' : 'none'};
        pointer-events: none;
        z-index: 1;
    `
    $: containerStyle = `
        ${$currentStoryStep.showOpeningComment ? "" : "background: linear-gradient(to bottom, var(--color-cream-background), transparent);"}
        margin-top: ${$outermostMargin}px;
        ${$currentStoryStep.showOpeningComment ? "bottom: 5%;" : "top: 0"};
        text-shadow: ${tiemposFriendlyTextShadow()};
    `
    
    $: storyTextStyle = `
        font-size: ${$viewport.isLikelyInMobileLandscape ? '14px' : $currentStoryStepIndex === 0 ? '20px' : '16px'};
    `
</script>

<div style={backgroundGradientStyle}>
    <div bind:this={container} class={`container ${$currentStoryStepIndex === 0 ? 'fade-in' : ''}`} style={containerStyle}>
        {#if !!$currentStoryStep.text}
            <h4 class="story-text" style={storyTextStyle}>
                <!-- For styling of love song type spans within the text, see app.css -->
                <!-- Note: this wonky custom left-padding corrects for a visual fluke wherein left-justified text appears off center.  -->
                <div style:padding-left={!$viewport.isLikelyInMobileLandscape && $currentStoryStepIndex === 0 ? '42px' : '8px'}>
                    {@html $currentStoryStep.text}
                </div>
                <DataMethodsModal bind:showModal />
            </h4>
        {/if}
    </div>
</div>

<CustomTap on:tap={onTap} enableKeyboard={true} />

<style>
    .container {
        position: fixed;
        width: 100%;
        padding-left: 5%; 
        padding-right: 5%;
        /* TODO: there's probably a better way to place this with the correct margin (only matters on the first screen) */
        margin-bottom: 4%;

        pointer-events: none;
        border: none; /* this fixes the random border that appeared on mobile */        
    }

    .story-text {
        max-width: 800px;
        margin: 0 auto;
        padding: 12px;
        /* I want visual padding, but I need to keep the text very close to the top, since it's a tight squeeze with the chart */
        padding-top: 4px;
        margin-top: -8px;
        padding-bottom: 4px;
        padding-left: 12px;
        padding-right: 12px;

        border-radius: 8px;
        border: none; /* this fixes the random border that appeared on mobile */

        pointer-events: all;
    }

    .fade-in {
        opacity: 0;
        animation: fadeIn 1s forwards;
        animation-delay: 1s;
    }

     @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }
</style>