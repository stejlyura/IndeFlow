<script lang="ts">
    let { title = "UI Lab" } = $props<{ title?: string }>();
</script>

<section class="py-24 px-4 md:px-8 reveal">
    <div class="container mx-auto max-w-6xl text-center">
        <h2 class="text-3xl md:text-5xl font-black uppercase italic mb-12 tracking-tighter">{title}</h2>
        <div class="p-12 border border-[var(--border-color)] border-dashed glass-effect text-xs uppercase opacity-50 tracking-widest font-bold">
            Experimental UI Components Drop Zone
        </div>
    </div>
</section>
