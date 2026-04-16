<script lang="ts">
    export let logos: string[] = ['TECH CORP', 'FINANCE HUB', 'GLOBAL MEDIA', 'LUXURY REALTY', 'CRYPTO FLOW'];
</script>

<section class="py-12 border-y border-[var(--border-color)] overflow-hidden reveal">
    <div class="flex space-x-20 items-center animate-[scroll_40s_linear_infinite] whitespace-nowrap">
        {#each [...logos, ...logos] as logo}
            <div class="text-2xl font-black opacity-10 uppercase italic w-[250px] inline-block">{logo}</div>
        {/each}
    </div>
</section>

<style>
    @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
</style>
