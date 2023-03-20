<script lang="ts">
    let classNames = "";
    export { classNames as class }
</script>

<div class="placeholder animated-background rounded-full { classNames }"></div>

<style>
    @keyframes placeHolderShimmer {
        0%{
            background-position: -468px 0
        }
        100%{
            background-position: 468px 0
        }
    }
    .animated-background {
        animation-duration: 1.25s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: placeHolderShimmer;
        animation-timing-function: linear;
        background: #52525b;
        background: linear-gradient(to right, #3f3f46 10%, #27272a 18%, #3f3f46 33%);
        background-size: 800px 104px;
    }
</style>