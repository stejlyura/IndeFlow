<script lang="ts">
    import type { PricingPlan } from '$lib/types';
    let { title = "Pricing", plans = [
        { name: "Silver Engine", price: "45,000 ₴", features: ["SEO", "Landing"], buttonText: "Выбрать" },
        { name: "Business Authority", price: "105,000 ₴", features: ["AdSense", "Support"], buttonText: "Купить поток", isPopular: true },
        { name: "Platinum Custom", price: "320,000 ₴", features: ["Full Service", "SLA"], buttonText: "VIP" }
    ] } = $props<{ title?: string, plans?: PricingPlan[] }>();
</script>

<section class="py-24 px-4 md:px-8 reveal">
    <div class="container mx-auto">
        <h2 class="text-4xl font-black mb-20 uppercase tracking-tighter text-center">{title}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-0 border" style="border-color: var(--border-color);">
            {#each plans as plan}
                <div class="p-10 border-b md:border-b-0 md:border-r last:border-r-0 flex flex-col {plan.isPopular ? 'bg-white/5 relative z-10' : ''}" 
                     style={plan.isPopular ? 'background-color: var(--bg-card); border-top: 4px solid var(--primary);' : 'border-color: var(--border-color);'}>
                    <h3 class="text-xs font-bold uppercase opacity-40 mb-6 italic">{plan.name}</h3>
                    <div class="text-4xl md:text-5xl font-black mb-10 italic" style={plan.isPopular ? '' : ''}>{plan.price}</div>
                    <ul class="space-y-4 mb-12 text-[10px] uppercase tracking-widest opacity-60 flex-grow">
                        {#each plan.features as feature}
                            <li>— {feature}</li>
                        {/each}
                    </ul>
                    <button class={plan.isPopular ? 'btn-premium p-4 sharp text-[10px] font-black' : 'w-full border p-4 sharp text-[10px] font-bold uppercase hover:bg-black hover:text-white transition'} 
                            style={!plan.isPopular ? 'border-color: var(--border-color);' : ''}>
                        {plan.buttonText}
                    </button>
                </div>
            {/each}
        </div>
    </div>
</section>
