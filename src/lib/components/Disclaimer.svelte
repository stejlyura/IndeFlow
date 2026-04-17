<script lang="ts">
    let { message = "Warning: Experimental features enabled. Data may be reset." } = $props<{ message?: string }>();
</script>

<div class="py-8 px-4 md:px-8 reveal">
    <div class="container mx-auto max-w-4xl">
        <div class="disclaimer-box text-center text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed">
            {message}
        </div>
    </div>
</div>
