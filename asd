<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>VINTAGE EDGE | Curated History. Modern Style.</title>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:wght@400;700&amp;family=Hanken+Grotesk:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Theme Configuration -->
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                "secondary": "#904d00",
                "surface": "#faf9f5",
                "on-secondary": "#ffffff",
                "tertiary-fixed-dim": "#f4bb92",
                "outline": "#737872",
                "on-primary-container": "#c0d5c2",
                "on-tertiary": "#ffffff",
                "on-surface": "#1b1c1a",
                "surface-dim": "#dbdad6",
                "primary-fixed-dim": "#b7ccb9",
                "outline-variant": "#c3c8c1",
                "surface-container": "#efeeea",
                "background": "#faf9f5",
                "surface-variant": "#e3e2df",
                "inverse-surface": "#2f312e",
                "primary-container": "#4a5d4e",
                "secondary-container": "#fe932c",
                "inverse-on-surface": "#f2f1ed",
                "error": "#ba1a1a",
                "primary-fixed": "#d3e8d5",
                "surface-container-low": "#f4f4f0",
                "on-primary-fixed-variant": "#394b3d",
                "on-tertiary-fixed": "#301400",
                "on-secondary-fixed-variant": "#6e3900",
                "tertiary-fixed": "#ffdcc5",
                "surface-tint": "#506354",
                "on-error": "#ffffff",
                "on-background": "#1b1c1a",
                "surface-container-highest": "#e3e2df",
                "error-container": "#ffdad6",
                "tertiary": "#5e3819",
                "surface-container-lowest": "#ffffff",
                "on-primary-fixed": "#0e1f13",
                "surface-container-high": "#e9e8e4",
                "on-primary": "#ffffff",
                "on-error-container": "#93000a",
                "secondary-fixed-dim": "#ffb77d",
                "inverse-primary": "#b7ccb9",
                "on-tertiary-fixed-variant": "#653d1e",
                "on-tertiary-container": "#fec39a",
                "secondary-fixed": "#ffdcc3",
                "surface-bright": "#faf9f5",
                "on-secondary-container": "#663500",
                "on-surface-variant": "#434843",
                "tertiary-container": "#794f2e",
                "on-secondary-fixed": "#2f1500",
                "primary": "#334537"
            },
            "borderRadius": {
                "DEFAULT": "0.125rem",
                "lg": "0.25rem",
                "xl": "0.5rem",
                "full": "0.75rem"
            },
            "spacing": {
                "xs": "4px",
                "xl": "80px",
                "lg": "48px",
                "base": "8px",
                "sm": "12px",
                "md": "24px",
                "container-max": "1280px",
                "gutter": "24px"
            },
            "fontFamily": {
                "display-lg": ["Libre Caslon Text"],
                "body-lg": ["Hanken Grotesk"],
                "headline-md": ["Libre Caslon Text"],
                "headline-sm": ["Libre Caslon Text"],
                "display-lg-mobile": ["Libre Caslon Text"],
                "label-md": ["Hanken Grotesk"],
                "label-sm": ["Hanken Grotesk"],
                "body-md": ["Hanken Grotesk"]
            },
            "fontSize": {
                "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                "headline-md": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
                "headline-sm": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                "display-lg-mobile": ["36px", {"lineHeight": "42px", "fontWeight": "700"}],
                "label-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "600"}],
                "label-sm": ["12px", {"lineHeight": "16px", "fontWeight": "500"}],
                "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
<style>
        body {
            background-color: #faf9f5;
            color: #1b1c1a;
            scroll-behavior: smooth;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .product-card-shadow {
            box-shadow: 0 4px 15px rgba(51, 69, 55, 0.06);
        }
        .product-card-shadow:hover {
            box-shadow: 0 8px 25px rgba(51, 69, 55, 0.1);
            transform: translateY(-2px);
        }
        .transition-standard {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
    </style>
</head>
<body class="font-body-md text-body-md">
<!-- TopNavBar -->
<nav class="bg-surface dark:bg-surface-dim full-width top-0 z-50 fixed w-full border-b border-tertiary/15">
<div class="max-w-container-max mx-auto px-gutter flex justify-between items-center h-20">
<!-- Brand Logo -->
<div class="font-display-lg text-display-lg-mobile md:text-display-lg text-primary dark:text-primary-fixed-dim tracking-tight cursor-pointer active:scale-95 transition-transform">
                VINTAGE EDGE
            </div>
<!-- Navigation Links -->
<div class="hidden md:flex gap-md items-center">
<a class="text-secondary font-bold border-b-2 border-secondary pb-1 font-body-md text-body-md" href="#">Home</a>
<a class="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="#">Shop</a>
<a class="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="#">About</a>
<a class="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="#">Contact</a>
</div>
<!-- Trailing Actions -->
<div class="flex items-center gap-md">
<div class="relative group cursor-pointer active:scale-95 transition-transform text-primary">
<span class="material-symbols-outlined text-2xl">shopping_bag</span>
<span class="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">2</span>
</div>
<div class="md:hidden text-primary">
<span class="material-symbols-outlined text-2xl">menu</span>
</div>
</div>
</div>
</nav>
<main class="pt-20">
<!-- Hero Section -->
<section class="relative h-[870px] overflow-hidden">
<div class="absolute inset-0 z-0">
<div class="bg-cover bg-center w-full h-full transform scale-105 hover:scale-100 transition-transform duration-1000" data-alt="A cinematic portrait of a fashionable individual standing in a sun-drenched, minimalist European urban setting. They are wearing a curated mix of 70s vintage wool and modern tailoring, in a palette of sage green, ochre, and warm neutrals. The lighting is soft and golden, creating a nostalgic yet high-end fashion editorial mood. The composition is clean and airy, perfectly reflecting the VINTAGE EDGE brand identity." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuA9PYO0525H2IYQK840okZp-mHk2pAFTL5dAXFymjFbaywG-tjbArkFs6Os0WZCCeXr3hcX2O7uUie_yiGrCkNyQqpzbRfYFETo_TyE-VmPdJSqcJb9nWEMqeYzXzCMgsA9_KZpYLresSXmFX3W2lqW9MnO9C7b5Nl4rkSCTm-pCGPHzwhSR84raei0Qvxon7YUwBK75p_7yfps5EVjNc68n9D58vftQwkMy_kFza95IFGLOMJCLMgyFJEq4af_jBhbSyWQiCEFo1o')"></div>
<div class="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
</div>
<div class="relative z-10 max-w-container-max mx-auto px-gutter h-full flex flex-col justify-center items-start">
<div class="max-w-2xl bg-surface/80 backdrop-blur-sm p-lg md:p-xl rounded-lg">
<h1 class="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">Curated History. Modern Style.</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant mb-lg max-w-md">Sustainable fashion hand-picked for the modern soul. Discover pieces that tell a story without compromising on contemporary aesthetics.</p>
<button class="bg-secondary text-on-secondary px-lg py-md font-label-md text-label-md rounded-lg hover:opacity-90 transition-standard active:scale-95">
                        Shop the Collection
                    </button>
</div>
</div>
</section>
<!-- Featured Categories (Bento-ish Grid) -->
<section class="py-xl max-w-container-max mx-auto px-gutter">
<div class="flex flex-col md:flex-row justify-between items-baseline mb-lg gap-base">
<h2 class="font-headline-md text-headline-md text-primary">Curated Eras</h2>
<a class="font-label-md text-label-md text-secondary border-b border-secondary/30 hover:border-secondary transition-standard" href="#">View All Categories</a>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-md">
<!-- Card 1 -->
<div class="group relative aspect-[4/5] overflow-hidden rounded-lg cursor-pointer">
<div class="bg-cover bg-center w-full h-full transition-standard group-hover:scale-110" data-alt="A high-quality studio shot of a 70s retro themed fashion set. Features a corduroy jacket, flared denim, and tinted sunglasses arranged artistically on a neutral background. The lighting is warm and earthy, echoing the brand's secondary ochre and primary sage palette. Sophisticated and minimalist composition." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUCCjPMQdi6meUKmOqfGLn2ajj-Za6qkdj7FvE7maPrZE0ejG5VjJNCur88M2NYZiRVQM1yMVX45VSoCyFyTzift9PX9NGjuMdQLU7olLWs98UoakyqWdSMxTmPfhgR-G5sZmNHXY4ov0esKcapnWY9oIvESM-64C8VCLM3JVsmZwerTgPylAmc7tGSBKWb9Ol-BVI19lau78u-1bd71UhPFkF0IX-9GMoQT74vQfTNABNGPvuxUSiBwEcKhLUoZgwB4_9_arYNLs')"></div>
<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
<div class="absolute bottom-0 left-0 p-md">
<h3 class="font-headline-sm text-headline-sm text-white mb-xs">70s Retro</h3>
<p class="text-white/80 font-label-sm text-label-sm">Warm Tones &amp; Textures</p>
</div>
</div>
<!-- Card 2 -->
<div class="group relative aspect-[4/5] overflow-hidden rounded-lg cursor-pointer">
<div class="bg-cover bg-center w-full h-full transition-standard group-hover:scale-110" data-alt="Modern streetwear classic flat lay on an off-white textured surface. Includes an oversized vintage sweatshirt, classic high-top sneakers, and a minimal beanie in earthy tones. The lighting is clean and bright, emphasizing the high-quality textures of the pre-loved garments. Professional e-commerce aesthetic." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC-9m5VeRLMWW6wcDNFzGqLIxhL3yWc9SKBHkZGhFTGIrghDj6ILaTdLsHUlkNBKW6mjFGkMn-u-e0wvgJp0QRqSRSHZZqb-CXv35k6LjPumuK945gLH-m-2iRBNN5IY_FByW1yqmFq11p0wgVTvBZC07NbjnmPgaekj8xRQ31b-2O2JXoC-xbxu0EHtVqVs21tP8obFd1Ro-mp2V8RK57_puYHLeOucB_CklSM6aHLzhIaI2vH0ficUJH9_6DTgpjIFqDI1YA3bmc')"></div>
<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
<div class="absolute bottom-0 left-0 p-md">
<h3 class="font-headline-sm text-headline-sm text-white mb-xs">Streetwear Classics</h3>
<p class="text-white/80 font-label-sm text-label-sm">Timeless Urban Silhouettes</p>
</div>
</div>
<!-- Card 3 -->
<div class="group relative aspect-[4/5] overflow-hidden rounded-lg cursor-pointer">
<div class="bg-cover bg-center w-full h-full transition-standard group-hover:scale-110" data-alt="A luxurious Designer Archive display featuring a vintage silk scarf draped over a minimalist glass mannequin head. Beside it sits a high-end leather handbag with subtle patina. The lighting is focused and dramatic, highlighting the luxury and history of the pieces. Set against a soft sage green wall." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBK5K2PKm5CoiBLdr86etbRL-ZRMgL8CI9aa2rvVb-BjqxdSqDDd8RlBo6KFuU6wGrxIHHJGX6WDoOxEipH8kdym-0Vo9BxN1hBTSmoVsF9cR0RQbNpkw1KEWFS9Zr_ugRcz4GETynZvPUhMOzckL_44RG03DMYQZ-7ZM6f7nnYiFVkWQ9V3AqeXxyhb9tl5VlqOQ_ofrYZlwLO9x9d8uYKtc_StVMorwC7GgSN4kX8ZubbU_C5i7o_m2Wt9UNkyJnqOBM9pTJPn5M')"></div>
<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
<div class="absolute bottom-0 left-0 p-md">
<h3 class="font-headline-sm text-headline-sm text-white mb-xs">Designer Archive</h3>
<p class="text-white/80 font-label-sm text-label-sm">Luxury with a Legacy</p>
</div>
</div>
</div>
</section>
<!-- Informative Section: The Thrifty Way -->
<section class="bg-surface-container py-xl">
<div class="max-w-container-max mx-auto px-gutter">
<div class="text-center mb-lg">
<h2 class="font-headline-md text-headline-md text-primary mb-xs">The Thrifty Way</h2>
<p class="text-on-surface-variant max-w-lg mx-auto">Elevating the second-hand experience through meticulous curation and a commitment to quality.</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-lg">
<div class="flex flex-col items-center text-center p-md">
<div class="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-md text-primary">
<span class="material-symbols-outlined text-3xl">verified</span>
</div>
<h4 class="font-headline-sm text-headline-sm text-primary mb-sm">Hand-Picked Quality</h4>
<p class="text-on-surface-variant font-body-md text-body-md">Every item undergoes a rigorous 10-point inspection. We only source pieces that meet our standards for longevity and style.</p>
</div>
<div class="flex flex-col items-center text-center p-md">
<div class="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center mb-md text-secondary">
<span class="material-symbols-outlined text-3xl">eco</span>
</div>
<h4 class="font-headline-sm text-headline-sm text-primary mb-sm">Sustainable Impact</h4>
<p class="text-on-surface-variant font-body-md text-body-md">By choosing pre-loved, you're actively reducing waste. Our circular model ensures style doesn't cost the Earth.</p>
</div>
<div class="flex flex-col items-center text-center p-md">
<div class="w-16 h-16 rounded-full bg-tertiary-fixed flex items-center justify-center mb-md text-tertiary">
<span class="material-symbols-outlined text-3xl">fingerprint</span>
</div>
<h4 class="font-headline-sm text-headline-sm text-primary mb-sm">Unique Identity</h4>
<p class="text-on-surface-variant font-body-md text-body-md">Ditch the mass-produced. Own pieces with a history that reflect your personal journey and individual taste.</p>
</div>
</div>
</div>
</section>
<!-- Product Grid: New Arrivals -->
<section class="py-xl max-w-container-max mx-auto px-gutter">
<div class="flex justify-between items-center mb-lg">
<h2 class="font-headline-md text-headline-md text-primary">New Arrivals</h2>
<div class="flex gap-sm">
<button class="w-10 h-10 rounded-full border border-outline/20 flex items-center justify-center hover:bg-surface-container-high transition-standard">
<span class="material-symbols-outlined">chevron_left</span>
</button>
<button class="w-10 h-10 rounded-full border border-outline/20 flex items-center justify-center hover:bg-surface-container-high transition-standard">
<span class="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
<div class="grid grid-cols-2 lg:grid-cols-4 gap-md">
<!-- Product 1 -->
<div class="product-card-shadow bg-surface rounded-lg overflow-hidden transition-standard cursor-pointer group">
<div class="aspect-[4/5] relative bg-surface-container overflow-hidden">
<div class="bg-cover bg-center w-full h-full group-hover:scale-105 transition-standard" data-alt="An oversized vintage wool blazer in charcoal grey, professionally photographed against a light cream background. The fabric texture is clearly visible, highlighting the high-quality tailoring. Soft, natural lighting. A minimalist, boutique e-commerce product shot with a subtle ochre tag visible." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuD50c9XbvmnBVz-7z4EQwRAV9msCeEpv7kT5clR7-bninEH_cbJKDyHSMsk66xYtBD9-g8vMfNjHSn0900T6X5sQkakCwJjLWwwlAuFO5jYjWBF2EQ40Rs7Ol4D8M7Iu_COQGCiEvMOyWLv8yfw1_L5PGDwVCVHnfPHJDUjihai-RhC75Rm3gi0aerj83z7mmQ6vOnJPDzRY1128O5m8PEF2nagrjrO9k5J2VhGuY_EL2CXtsWENBwWkwDtmhGn0j6nQ2EkLIyS3mo')"></div>
<span class="absolute top-2 left-2 bg-secondary text-white text-[10px] px-2 py-1 rounded-full font-label-md uppercase tracking-wider">Vintage</span>
</div>
<div class="p-md">
<p class="font-label-sm text-label-sm text-on-surface-variant mb-xs">OUTERWEAR</p>
<h3 class="font-label-md text-label-md text-primary mb-base group-hover:text-secondary transition-standard">Oversized Wool Blazer</h3>
<p class="font-headline-sm text-headline-sm text-secondary">€89.00</p>
</div>
</div>
<!-- Product 2 -->
<div class="product-card-shadow bg-surface rounded-lg overflow-hidden transition-standard cursor-pointer group">
<div class="aspect-[4/5] relative bg-surface-container overflow-hidden">
<div class="bg-cover bg-center w-full h-full group-hover:scale-105 transition-standard" data-alt="A classic vintage denim jacket with a light wash and subtle distressing, displayed in a clean, minimalist studio setting. The jacket is slightly worn-in, giving it a soft, desirable character. Neutral background with soft shadows, fitting the VINTAGE EDGE earth-tone aesthetic." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAyGfIObbDVXhm4XcH6f34QpNKdodoF4iDuxBOq9TwXoZBD328eSZEehPfN8NqBXTD2zt4_f0le4e8GrH4nub8l6USBvfv-CwPRV9m2gAofxgjXNkyMsQXalcoueIJhl2UZXarMrCnChFu29xGupog-7wkAjcL4MLsDL2sIgKZEi8CLA1Z82z5qfLDe9-p-ZeVSpRH9hIOnWAPvyqsEbc53cQEbCa40J47BhEdedrwsmLft5D7aw69po-2tHCeTjHaEKAqrrnJCmG0')"></div>
<span class="absolute top-2 left-2 bg-primary text-white text-[10px] px-2 py-1 rounded-full font-label-md uppercase tracking-wider">Eco-friendly</span>
</div>
<div class="p-md">
<p class="font-label-sm text-label-sm text-on-surface-variant mb-xs">DENIM</p>
<h3 class="font-label-md text-label-md text-primary mb-base group-hover:text-secondary transition-standard">Vintage Denim Jacket</h3>
<p class="font-headline-sm text-headline-sm text-secondary">€65.00</p>
</div>
</div>
<!-- Product 3 -->
<div class="product-card-shadow bg-surface rounded-lg overflow-hidden transition-standard cursor-pointer group">
<div class="aspect-[4/5] relative bg-surface-container overflow-hidden">
<div class="bg-cover bg-center w-full h-full group-hover:scale-105 transition-standard" data-alt="A luxurious silk patterned scarf with intricate geometric motifs in shades of ochre, sage, and cream. Elegantly folded on a white marble surface. High-key lighting highlights the silk's sheen and the vividness of the patterns. Sophisticated boutique product photography." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBTj2zDVc6QcbnFmqSBaM6j-6aqPJPnBvHgIZywu5u-19ZCAZxYKhGygniEjRWiA07duN3k-0vfL8e2e3PZdTZbV7gFP3MLAgeWCIxxDlYLhN05nKAwi0e9PObkBm_wb3c_M7AK2dyz7Qmdc3Kbe9lKbQNYJJX9bh8mo5H3t1YNK-E-rW3eIQM1ykSHhYJ2hFKrSVK7li8d8rkkT8bpGV9WAioH02ETxU9davrR7qulKZFHq7vYrZm0zpXIyEqsfmnKdfseYYZnMrY')"></div>
<span class="absolute top-2 left-2 bg-tertiary text-white text-[10px] px-2 py-1 rounded-full font-label-md uppercase tracking-wider">Designer</span>
</div>
<div class="p-md">
<p class="font-label-sm text-label-sm text-on-surface-variant mb-xs">ACCESSORIES</p>
<h3 class="font-label-md text-label-md text-primary mb-base group-hover:text-secondary transition-standard">Silk Patterned Scarf</h3>
<p class="font-headline-sm text-headline-sm text-secondary">€42.00</p>
</div>
</div>
<!-- Product 4 -->
<div class="product-card-shadow bg-surface rounded-lg overflow-hidden transition-standard cursor-pointer group">
<div class="aspect-[4/5] relative bg-surface-container overflow-hidden">
<div class="bg-cover bg-center w-full h-full group-hover:scale-105 transition-standard" data-alt="A pair of well-maintained, dark brown leather Chelsea boots. The leather shows a beautiful natural patina. Photographed on a minimal oak wood surface against a neutral backdrop. Bright, even lighting. The overall mood is rugged yet sophisticated, perfect for a curated thrift store." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuB6BIwYSMOAr1Pw-ehnnEMjPXr6Lo1X4nswymvj6yebaFVyZmaPqAGzti8ve3x6KujB0yS1dhIYRDffQJ_AjuTWpipDxEVEjtJ1R0uUHnoRpH2Vq3V8N_lrSLcnV_eWua0ptjPhiIeZcxiWZHHEzMjHXbSETnex-mo37pvGqMLwvIj3QcKa3bjFsySyqrgtM3LQ6RW34LnL0vwF9v-yMGYnOBBY1Q8aTfaSUmI9HuuhGKDZoDe_GPBrtcvavdWUz_KQvPR6iZ9osTo')"></div>
</div>
<div class="p-md">
<p class="font-label-sm text-label-sm text-on-surface-variant mb-xs">FOOTWEAR</p>
<h3 class="font-label-md text-label-md text-primary mb-base group-hover:text-secondary transition-standard">Leather Chelsea Boots</h3>
<p class="font-headline-sm text-headline-sm text-secondary">€120.00</p>
</div>
</div>
</div>
<div class="mt-lg text-center">
<button class="border-2 border-primary text-primary px-lg py-md font-label-md text-label-md rounded-lg hover:bg-primary hover:text-white transition-standard active:scale-95">
                    View Full Collection
                </button>
</div>
</section>
<!-- Newsletter / CTA -->
<section class="py-xl bg-primary text-on-primary">
<div class="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 gap-lg items-center">
<div>
<h2 class="font-display-lg-mobile md:text-display-lg font-display-lg mb-md">Join the Legacy.</h2>
<p class="font-body-lg text-body-lg text-on-primary-container mb-lg">Sign up for early access to our weekly drops and exclusive vintage styling tips curated by our in-house experts.</p>
</div>
<div class="flex flex-col sm:flex-row gap-base">
<input class="flex-grow bg-primary-container/30 border border-on-primary-container/20 rounded-lg px-md py-md text-on-primary placeholder:text-on-primary-container/60 focus:outline-none focus:border-secondary transition-standard" placeholder="Enter your email" type="email"/>
<button class="bg-secondary text-white px-lg py-md rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-95 transition-standard whitespace-nowrap">
                        Subscribe Now
                    </button>
</div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="bg-surface-container-high dark:bg-inverse-surface full-width">
<div class="max-w-container-max mx-auto px-gutter py-xl flex flex-col md:flex-row justify-between gap-md">
<!-- Footer Brand & Copyright -->
<div class="flex flex-col gap-base max-w-sm">
<div class="font-display-lg-mobile text-display-lg-mobile text-primary dark:text-primary-fixed-dim">
                    VINTAGE EDGE
                </div>
<p class="text-on-surface-variant font-body-md text-body-md">© 2024 VINTAGE EDGE. CURATED WITH HISTORY.</p>
</div>
<!-- Footer Links -->
<div class="flex flex-wrap gap-x-lg gap-y-md md:items-end">
<a class="text-on-surface-variant dark:text-surface-variant hover:text-secondary transition-colors font-body-md text-body-md" href="#">Sustainability</a>
<a class="text-on-surface-variant dark:text-surface-variant hover:text-secondary transition-colors font-body-md text-body-md" href="#">Shipping</a>
<a class="text-on-surface-variant dark:text-surface-variant hover:text-secondary transition-colors font-body-md text-body-md" href="#">Returns</a>
<a class="text-on-surface-variant dark:text-surface-variant hover:text-secondary transition-colors font-body-md text-body-md" href="#">Terms</a>
<a class="text-on-surface-variant dark:text-surface-variant hover:text-secondary transition-colors font-body-md text-body-md" href="#">Privacy</a>
</div>
<!-- Socials placeholder -->
<div class="flex gap-md">
<a class="text-primary hover:text-secondary transition-colors" href="#"><span class="material-symbols-outlined">public</span></a>
<a class="text-primary hover:text-secondary transition-colors" href="#"><span class="material-symbols-outlined">favorite</span></a>
<a class="text-primary hover:text-secondary transition-colors" href="#"><span class="material-symbols-outlined">mail</span></a>
</div>
</div>
</footer>
<script>
        // Simple Micro-interaction: Header scroll effect
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 20) {
                nav.classList.add('shadow-md');
                nav.classList.replace('h-20', 'h-16');
            } else {
                nav.classList.remove('shadow-md');
                nav.classList.replace('h-16', 'h-20');
            }
        });
    </script>
</body></html>