<script lang="ts">
    let {
        title = '',
        description = '',
        buttonText = 'Contact Us',
        buttonHref = 'mailto:hello@indxflow.com'
    } = $props<{
        title?: string;
        description?: string;
        buttonText?: string;
        buttonHref?: string;
    }>();
</script>

<section class="py-32 px-4 md:px-8 bg-[var(--bg-body)] text-center reveal border-t border-[var(--border-color)]" id="contact">
    <div class="container mx-auto max-w-3xl">
        <h2 class="text-4xl md:text-6xl font-black uppercase italic mb-6 tracking-tighter">
            {title}
        </h2>
        <p class="text-lg md:text-xl opacity-75 mb-12">
            {description}
        </p>
        <a href={buttonHref} class="btn-premium px-12 py-6 sharp text-xs md:text-sm">
            {buttonText}
        </a>
    </div>
</section>

