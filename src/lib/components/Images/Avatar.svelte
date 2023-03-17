<script lang="ts">
    let additionalClassNames: string = ""
    
    export let type: "thumbs" | "initials" = "thumbs";
    export let seed: string | null = null;
    export let src: string | null = null;
    export { additionalClassNames as class };
</script>

<img src={ src ?? `https://api.dicebear.com/5.x/${ type }/svg?scale=70&seed=${ seed }` } class="rounded-full object-cover w-8 h-8 { additionalClassNames }" alt="">