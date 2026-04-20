<script lang="ts">
    let {
        title = "Прозрачность и Этика",
        message = 'IndxFlow не продает «схемы» обхода AdSense. Мы строим качественные сайты, которые Google любит органически. Любые обещания 100% гарантии прохода — это <span class="underline">мошенничество</span>. Наша цель — ваша долгосрочная репутация.',
    } = $props<{ title?: string; message?: string }>();
</script>

<section class="py-12 px-4 md:px-8 reveal">
    <div class="container mx-auto max-w-4xl">
        <div
            class="disclaimer-box p-8 md:p-12 flex flex-col md:flex-row items-center gap-10"
        >
            <div
                class="shrink-0 w-16 h-16 flex items-center justify-center border-2 border-current rounded-full"
            >
                <span class="text-3xl font-bold italic">!</span>
            </div>
            <div class="text-center md:text-left">
                <h3 class="text-xl font-bold uppercase mb-4 tracking-widest">
                    {title}
                </h3>
                <p
                    class="text-sm md:text-base opacity-90 leading-relaxed italic font-medium"
                >
                    {@html message}
                </p>
            </div>
        </div>
    </div>
</section>

