<script lang="ts">
    let { title = "Enter<br> the<br> Flow", description = "Start your project today." } = $props<{ title?: string, description?: string }>();
</script>

<section class="py-32 px-4 md:px-8 relative reveal" style="background-color: var(--bg-accent); color: var(--text-accent);">
    <div class="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-24">
        <div>
            <h2 class="text-6xl md:text-[110px] font-black uppercase italic leading-[0.85] mb-12 tracking-tighter">{@html title}</h2>
            <p class="uppercase text-[10px] tracking-[0.5em] mb-16 opacity-60">{description}</p>
        </div>
        <div class="p-8 md:p-12 sharp border" style="background-color: var(--bg-card); border-color: var(--border-color); color: var(--text-main);">
            <form class="space-y-12" onsubmit={(e) => e.preventDefault()}>
                <div class="grid md:grid-cols-2 gap-10">
                    <input type="text" placeholder="YOUR NAME" required class="input-premium w-full" aria-label="Your Name">
                    <input type="tel" placeholder="PHONE" required class="input-premium w-full" aria-label="Phone Number">
                </div>
                <input type="text" placeholder="COMPANY NAME" class="input-premium w-full" aria-label="Company Name">
                <div class="grid md:grid-cols-2 gap-10">
                    <div class="flex flex-col">
                        <label for="budget" class="text-[9px] uppercase mb-4 opacity-60">Budget</label>
                        <select id="budget" class="bg-transparent border-b py-3 text-xs uppercase font-bold outline-none cursor-pointer" style="border-color: var(--border-color);">
                            <option value="1">40,000 - 150,000 ₴</option>
                            <option value="2">150,000+ ₴</option>
                        </select>
                    </div>
                    <div class="flex flex-col">
                        <label for="deadline" class="text-[9px] uppercase mb-4 opacity-60">Deadline</label>
                        <input id="deadline" type="date" class="bg-transparent border-b py-3 text-xs uppercase font-bold outline-none" style="border-color: var(--border-color);">
                    </div>
                </div>
                <button type="submit" class="w-full btn-premium py-8 sharp text-[11px] font-black tracking-[0.4em]">SEND REQUEST</button>
            </form>
        </div>
    </div>
</section>
