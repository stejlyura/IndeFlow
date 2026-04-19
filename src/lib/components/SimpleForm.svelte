<script lang="ts">
    import { page } from '$app/stores';
    // Simple Form Component for quick email collection
    let submitted = $state(false);

    $effect(() => {
        submitted = $page.url.searchParams.get('success') === 'true';
    });
</script>

{#if submitted}
    <div class="flex items-center gap-4 py-4 px-6 border border-white/20 bg-white/5 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" stroke-linejoin="miter" class="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span class="text-[10px] uppercase font-bold tracking-[0.2em] text-white">Subscribed!</span>
    </div>
{:else}
    <form 
        method="POST" 
        action="/api/submit" 
        class="flex flex-col sm:flex-row gap-4 w-full"
    >
        <input 
            type="email" 
            name="Email" 
            placeholder="ENTER YOUR EMAIL" 
            required 
            class="input-premium flex-1 text-xs uppercase font-bold px-6 py-4 border border-zinc-800 bg-transparent"
            aria-label="Your Email"
        >
        <button 
            type="submit" 
            class="btn-premium px-8 py-4 sharp text-[11px] font-black tracking-[0.2em] whitespace-nowrap"
        >
            SUBSCRIBE
        </button>
    </form>
{/if}
