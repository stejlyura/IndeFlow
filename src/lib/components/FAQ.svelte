<script lang="ts">
    let {
        title = "FAQ",
        questions = [
            {
                q: "Why Zero-JS?",
                a: "Because parsing and executing JavaScript is the number one cause of slow websites. CSS and HTML are instant.",
            },
            {
                q: "How do you handle analytics?",
                a: "We use Partytown to run all third-party scripts in a Web Worker, freeing up the main thread.",
            },
        ],
    } = $props<{ title?: string; questions?: { q: string; a: string }[] }>();
</script>

<section class="py-24 px-4 md:px-8 reveal bg-(--bg-body)">
    <div class="container mx-auto max-w-4xl">
        <h2
            class="text-3xl md:text-5xl font-black uppercase italic mb-16 tracking-tighter text-center"
        >
            {title}
        </h2>
        <div class="border-t border-[var(--border-color)]">
            {#each questions as item}
                <details class="group border-b border-[var(--border-color)]">
                    <summary
                        class="w-full flex justify-between items-center py-10 text-sm font-bold uppercase tracking-[0.2em] text-left cursor-pointer list-none appearance-none"
                        aria-expanded="false"
                    >
                        <span>{item.q}</span>
                        <span
                            class="transition-transform duration-300 opacity-50 group-open:rotate-180"
                        >
                            <svg
                                fill="none"
                                height="24"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                                width="24"><path d="M6 9l6 6 6-6"></path></svg
                            >
                        </span>
                    </summary>
                    <div
                        class="pb-10 text-[var(--text-main)] opacity-70 leading-relaxed text-sm"
                    >
                        {item.a}
                    </div>
                </details>
            {/each}
        </div>
    </div>
</section>

<style>
    summary::-webkit-details-marker {
        display: none;
    }
</style>
