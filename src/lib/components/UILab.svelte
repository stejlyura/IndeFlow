<script lang="ts">
    let { title = "Лаборатория Компонентов" } = $props<{ title?: string }>();
</script>

<section class="py-24 px-4 md:px-8 reveal">
    <div class="container mx-auto max-w-6xl">
        <div class="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <h2 class="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">
                {@html title}
            </h2>
            <div class="flex items-center space-x-3 bg-zinc-100 p-2 sharp border border-zinc-300">
                <span class="text-[9px] uppercase font-bold opacity-50 px-2 text-black">Preview Style:</span>
                <select 
                    id="lab-theme-select"
                    class="bg-transparent text-[10px] font-bold uppercase tracking-widest outline-none cursor-pointer px-2 text-black"
                >
                    <option value="berry">Berry Mint</option>
                    <option value="apple">Apple Glass</option>
                    <option value="heritage">Heritage Gold</option>
                    <option value="mercedes">Aero Mercedes</option>
                    <option value="wordpress">Blueprint</option>
                </select>
                {@html `<script>
                    (function() {
                        var select = document.getElementById('lab-theme-select');
                        var container = document.getElementById('uiLab');
                        if (select && container) {
                            select.addEventListener('change', function(e) {
                                container.setAttribute('data-theme', e.target.value);
                            });
                        }
                    })();
                </script>`}
            </div>
        </div>

        <div id="uiLab" data-theme="berry" class="border p-8 md:p-20 transition-all duration-500 sharp relative overflow-hidden" style="background-color: var(--bg-body); border-color: var(--border-color); color: var(--text-main);">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 items-start">
                <div class="space-y-4">
                    <p class="text-[9px] uppercase font-bold opacity-40 italic">Action Button</p>
                    <button class="btn-premium w-full py-5 sharp text-[10px]">Тест Кнопки</button>
                </div>
                <div class="space-y-4">
                    <p class="text-[9px] uppercase font-bold opacity-40 italic">Premium Input</p>
                    <input type="text" placeholder="ВАШ ДОМЕН..." class="input-premium w-full text-xs font-bold uppercase tracking-widest">
                </div>
                <div class="space-y-4">
                    <p class="text-[9px] uppercase font-bold opacity-40 italic">Status Tag</p>
                    <div class="inline-block px-6 py-2 border-2 text-[9px] font-black uppercase tracking-[0.3em]" style="color: var(--primary); border-color: var(--primary);">Verified Pass</div>
                </div>
            </div>
        </div>
    </div>
</section>
