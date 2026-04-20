<script lang="ts">
    import { page } from '$app/stores';
    let { title = "Enter<br> the<br> Flow", description = "Start your project today.", id = "contact" } = $props<{ title?: string, description?: string, id?: string }>();

    let submitted = $state(false);

    $effect(() => {
        submitted = $page.url.searchParams.get('success') === 'true';
    });
</script>

<svelte:head>
    <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>

<section {id} class="py-32 px-4 md:px-8 relative reveal" style="background-color: var(--bg-accent); color: var(--text-accent);">
    <div class="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-24">
        <div>
            <h2 class="text-6xl md:text-[110px] font-black uppercase italic leading-[0.85] mb-12 tracking-tighter">{@html title}</h2>
            <p class="uppercase text-[10px] tracking-[0.5em] mb-16 opacity-60">{description}</p>
        </div>
        <div class="p-8 md:p-12 sharp border bg-zinc-950 text-white border-zinc-800 relative overflow-hidden">
            {#if submitted}
                <div class="flex flex-col items-center justify-center py-20 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                    <div class="w-16 h-16 border border-white flex items-center justify-center rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" stroke-linejoin="miter"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <h3 class="text-3xl font-black uppercase tracking-tighter italic">Request Received</h3>
                    <p class="text-[10px] uppercase tracking-[0.3em] opacity-60">We'll get back to you shortly.</p>
                    <button onclick={() => submitted = false} class="text-[9px] uppercase tracking-[0.4em] underline underline-offset-8 opacity-40 hover:opacity-100 transition-opacity">Send another</button>
                </div>
            {:else}
                <form 
                    class="space-y-12 transition-opacity duration-300" 
                    id="callback-form" 
                    method="POST" 
                    action="/api/submit"
                >
                    <div class="grid md:grid-cols-2 gap-10">
                        <input type="text" name="Name" placeholder="YOUR NAME" required class="input-premium w-full text-xs uppercase font-bold" aria-label="Your Name">
                        <input type="email" name="Email" placeholder="EMAIL" required class="input-premium w-full text-xs uppercase font-bold" aria-label="Your Email">
                    </div>
                    <input type="text" name="Company Name" placeholder="COMPANY NAME (OPTIONAL)" class="input-premium w-full text-xs uppercase font-bold" aria-label="Company Name">
                    <div class="grid md:grid-cols-3 gap-10">
                        <div class="flex flex-col">
                            <label for="budget" class="text-[9px] uppercase mb-4 opacity-60">Budget</label>
                            <input id="budget" name="Budget" type="number" placeholder="AMOUNT" required class="bg-transparent border-b border-zinc-800 py-3 text-xs uppercase font-bold outline-none">
                        </div>
                        <div class="flex flex-col">
                            <label for="currency" class="text-[9px] uppercase mb-4 opacity-60">Currency</label>
                            <select id="currency" name="Currency" class="bg-transparent border-b border-zinc-800 py-3 text-xs uppercase font-bold outline-none cursor-pointer">
                                <option value="USD" class="bg-zinc-950">USD</option>
                                <option value="EUR" class="bg-zinc-950">EUR</option>
                                <option value="UAH" class="bg-zinc-950">UAH</option>
                            </select>
                        </div>
                        <div class="flex flex-col">
                            <label for="deadline" class="text-[9px] uppercase mb-4 opacity-60">Deadline</label>
                            <input id="deadline" name="Deadline" type="date" required class="bg-transparent border-b border-zinc-800 py-3 text-xs uppercase font-bold outline-none invert">
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label for="description" class="text-[9px] uppercase mb-4 opacity-60">Project Description</label>
                        <textarea id="description" name="Project Description" rows="3" maxlength="200" required placeholder="TELL US ABOUT YOUR PROJECT (MAX 200 CHARACTERS)" class="bg-transparent border-b border-zinc-800 py-3 text-xs uppercase font-bold outline-none resize-none"></textarea>
                    </div>
                    <div class="cf-turnstile" data-sitekey="1x00000000000000000000AA" data-theme="dark"></div>
                    <button type="submit" class="w-full btn-premium py-8 sharp text-[11px] font-black tracking-[0.4em]">
                        SEND REQUEST
                    </button>
                </form>
            {/if}
        </div>
    </div>
</section>

