<script>
    import {afterUpdate, onMount, tick} from "svelte";
    import urlParams from "../../utils/urlParams.js";
    import viewport from "$stores/viewport.js";

    import Tap from "../helpers/CustomTap.svelte";

    import {selectedSongs, selectedPerformers, typesTreatedAsNonLoveSongs, showAggregateSnakeChart} from "$stores/searchAndFilter.js"
    import {storySteps, currentStoryStepIndex, currentStoryStep} from "$stores/storySteps.js"
    import {STORY_STEP_CONTROLLER_TOP_PADDING} from "$components/viz/viz-utils.js"
    import { Y_MARGIN_SCREEN_PERCENTAGE } from "$data/data-utils.js";
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
            modalOpenButton.addEventListener('click', () => {
                showModal = true;
            })
        }
    }

    afterUpdate(() => {
        updateQueryParams();
        addModalOpenButtonListener();
    });
    
    onMount(async () => {
       const urlIndex = parseInt(urlParams.get("step")?.toString() || "0");
       $currentStoryStepIndex = urlIndex > storySteps.length - 1 ? 0 : urlIndex;

       await tick();
       addModalOpenButtonListener();
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
        selectedSongs.set([]) // clear any selections if you navigate to a new story step (story steps don't ever directly set this)
        selectedPerformers.set([...$currentStoryStep.searchAndFilterState.selectedPerformers])
        
        typesTreatedAsNonLoveSongs.set([...$currentStoryStep.searchAndFilterState.typesTreatedAsNonLoveSongs])
        showAggregateSnakeChart.set($currentStoryStep.visualEncodings.showAggregateSnakeChart)
    }

    $: $currentStoryStepIndex, updateFilterFilterState();

    $: style = `
        height: ${STORY_STEP_CONTROLLER_TOP_PADDING}px; 
        margin-top: ${$viewport.height * Y_MARGIN_SCREEN_PERCENTAGE}px;
        ${$currentStoryStep.showOpeningComment ? "bottom: 0" : "top: 0"}px;
    `
</script>

<div bind:this={container} class="container" style={style}>
    <h4 class="story-text">
        <!-- For styling of love song type spans within the text, see app.css -->
        {@html $currentStoryStep.text}
        <DataMethodsModal bind:showModal />
    </h4>
</div>

<Tap on:tap={onTap} debug={false} enableKeyboard={true} showArrows={true} />

<style>
    .container {
        position: fixed;
        width: 100%;
        padding-left: 5%; 
        padding-right: 5%;
        /* TODO: there's probably a better way to place this with the correct margin (only matters on the first screen) */
        margin-bottom: 4%;
    }

    .story-text {
        font-size: 16px;
    }
</style>