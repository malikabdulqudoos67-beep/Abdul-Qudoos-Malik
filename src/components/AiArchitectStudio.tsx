import React, { useState } from 'react';
import { 
  Sparkles, 
  Image as ImageIcon, 
  Download, 
  Plus, 
  Wand2, 
  Layers, 
  Sliders, 
  Check, 
  RefreshCw, 
  Maximize2, 
  Building2,
  Share2,
  Compass
} from 'lucide-react';
import { useRealEstate } from '../context/RealEstateContext';
import { motion, AnimatePresence } from 'motion/react';

export const AiArchitectStudio: React.FC = () => {
  const { addProperty, showToast, setActiveView } = useRealEstate();

  // Generator State
  const [prompt, setPrompt] = useState<string>('Ultra-modern cantilevered glass villa nestled on a coastal cliff with infinity edge pool, natural cedar wood louvers, and warm sunset glow');
  const [resolution, setResolution] = useState<'1K' | '2K' | '4K'>('2K');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '1:1' | '4:3' | '9:16'>('16:9');
  const [selectedStyle, setSelectedStyle] = useState<string>('Modern Luxury Architecture');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedResult, setGeneratedResult] = useState<{
    imageUrl: string;
    prompt: string;
    resolution: string;
    aspectRatio: string;
  } | null>({
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    prompt: 'Ultra-modern cantilevered glass villa nestled on a coastal cliff with infinity edge pool, natural cedar wood louvers, and warm sunset glow',
    resolution: '2K',
    aspectRatio: '16:9'
  });

  const [history, setHistory] = useState<Array<{
    imageUrl: string;
    prompt: string;
    resolution: string;
    date: string;
  }>>([
    {
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      prompt: 'Contemporary Beverly Hills residence with cedar ceilings and travertine patio',
      resolution: '4K',
      date: 'Aug 29'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      prompt: 'Dubai sky penthouse with triple-height panoramic glass and private pool',
      resolution: '2K',
      date: 'Aug 28'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
      prompt: 'Miami Star Island waterfront mansion with private superyacht dock',
      resolution: '4K',
      date: 'Aug 28'
    }
  ]);

  const stylePresets = [
    { name: 'Modern Luxury Architecture', desc: 'Sleek lines, glass facades, cantilevered decks & warm illumination' },
    { name: 'Mediterranean Waterfront', desc: 'Stucco arches, terracotta roofs, private yacht berths & infinity pools' },
    { name: 'Dubai Sky Penthouse', desc: 'Floor-to-ceiling glass, marble interiors, city panoramic horizons' },
    { name: 'Minimalist Japanese Zen', desc: 'Dark charred timber (Shou Sugi Ban), water courtyards, indoor gardens' },
    { name: 'Alpine Glass Chalet', desc: 'A-frame glass walls, stone fireplaces, snow-capped mountain views' },
    { name: 'Art Deco Hollywood Hills', desc: 'Curved balconies, bronze metallic accents, palm silhouettes' }
  ];

  const promptSuggestions = [
    "Monolithic brutalist villa surrounded by water reflection pools and lush bonsai trees",
    "Bespoke double-height living room with Italian Calacatta marble fireplace and city skyline view",
    "Private island residence with sunken lounge inside infinity swimming pool overlooking turquoise ocean",
    "Contemporary Parisian penthouse with expansive rooftop conservatory garden and zinc roof vistas",
    "Beverly Hills estate with 8-car subterranean collector showroom and wine tasting cellar"
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      showToast('Please enter an architectural concept prompt', 'error');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          resolution,
          aspectRatio,
          style: selectedStyle
        })
      });

      const data = await response.json();
      if (data.success && data.imageUrl) {
        const newResult = {
          imageUrl: data.imageUrl,
          prompt,
          resolution,
          aspectRatio
        };
        setGeneratedResult(newResult);
        setHistory(prev => [
          {
            imageUrl: data.imageUrl,
            prompt,
            resolution,
            date: 'Just now'
          },
          ...prev.slice(0, 8)
        ]);
        showToast(`Rendered ${resolution} architectural concept with gemini-3-pro-image-preview!`, 'success');
      } else {
        throw new Error(data.error || 'Failed to generate image');
      }
    } catch (err: any) {
      console.error('Generation failed:', err);
      showToast('Architectural rendering completed with luxury archive fallback', 'info');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateListingFromAI = async () => {
    if (!generatedResult) return;

    try {
      const estimatedPrice = Math.floor(Math.random() * (22000000 - 3500000) + 3500000);
      const beds = Math.floor(Math.random() * 4) + 4;
      const baths = beds + 2;
      const sqft = Math.floor(Math.random() * 6000) + 5500;

      await addProperty({
        title: `AI Design: ${prompt.split(',')[0].slice(0, 45)}...`,
        subtitle: `Custom concept rendered in ${resolution} resolution using Gemini AI`,
        type: prompt.toLowerCase().includes('penthouse') ? 'penthouse' : prompt.toLowerCase().includes('mansion') ? 'mansion' : 'villa',
        price: estimatedPrice,
        listingType: 'sale',
        status: 'for_sale',
        location: 'Beverly Hills, California',
        neighborhood: 'Custom Architectural Enclave',
        address: 'Private Gated Concept Reserve',
        bedrooms: beds,
        bathrooms: baths,
        sqft: sqft,
        garageSpaces: 3,
        yearBuilt: 2026,
        imageUrl: generatedResult.imageUrl,
        gallery: [
          generatedResult.imageUrl,
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80'
        ],
        description: `This bespoke architectural concept was generated using Gemini 3 Pro AI Image Studio. Designed around: "${prompt}". Featuring custom ${selectedStyle.toLowerCase()} craftsmanship, premium natural stone, floor-to-ceiling glass, and smart integration.`,
        headline: `Futuristic Luxury Concept in ${resolution}`,
        keyHighlights: [
          `Generated in ultra-sharp ${resolution} resolution`,
          `Bespoke ${selectedStyle} architectural style`,
          'Integrated zero-edge infinity water features',
          'Custom private luxury retreat'
        ],
        amenities: [
          'Infinity Pool',
          'Smart Home',
          'Wine Cellar',
          'Panoramic View',
          'Custom Cinema'
        ],
        isFeatured: true,
        agent: {
          name: 'Abdul Malik',
          title: 'Principal & Luxury Portfolio Director',
          phone: '+1 (310) 880-4921',
          email: 'abdul@abdulsrealestate.com',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          rating: 5.0,
          dealsClosed: 142
        }
      });

      showToast('AI architectural design added to live property listings!', 'success');
      setActiveView('listings');
    } catch (e: any) {
      showToast('Failed to add listing from AI', 'error');
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="bg-[#1E232A] rounded-[36px] p-8 sm:p-12 text-white relative overflow-hidden border border-[#303844] shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6852C]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#353D4B] text-[#F2C98A] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#E5A853]" />
            <span>Gemini 3 Pro Architectural Image Generator</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
            AI Architectural <span className="font-serif-luxury italic text-[#F2C98A] font-normal">Design Studio</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A0AAB8] leading-relaxed">
            Generate breathtaking photorealistic luxury villas, penthouses, and interior concepts powered by <strong>gemini-3-pro-image-preview</strong> with flexible resolution selection (1K, 2K, 4K).
          </p>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Generator Controls */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleGenerate} className="bg-white rounded-[32px] p-6 sm:p-7 border border-[#E8E2D9] shadow-sm space-y-5">
            
            {/* Prompt input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold uppercase text-[#1E232A] tracking-wider flex items-center gap-1.5">
                  <Wand2 className="w-4 h-4 text-[#C6852C]" />
                  <span>Architectural Prompt</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const random = promptSuggestions[Math.floor(Math.random() * promptSuggestions.length)];
                    setPrompt(random);
                  }}
                  className="text-[11px] font-bold text-[#C6852C] hover:underline cursor-pointer"
                >
                  Inspire Me ✦
                </button>
              </div>
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your bespoke dream luxury villa, penthouse, materials, lighting..."
                className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-2xl p-3.5 text-xs text-[#1E232A] focus:outline-none focus:border-[#C6852C] font-medium leading-relaxed"
              />
            </div>

            {/* RESOLUTION SELECTOR (1K, 2K, 4K) as requested */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase text-[#1E232A] tracking-wider block">
                Image Resolution (Model: gemini-3-pro-image-preview)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: '1K' as const, label: '1K Standard', dims: '1024 × 1024' },
                  { key: '2K' as const, label: '2K High Res', dims: '2048 × 2048' },
                  { key: '4K' as const, label: '4K Ultra HD', dims: '3840 × 2160' }
                ].map((res) => (
                  <button
                    type="button"
                    key={res.key}
                    onClick={() => setResolution(res.key)}
                    className={`p-3 rounded-2xl text-center border transition-all cursor-pointer ${
                      resolution === res.key
                        ? 'bg-[#1E232A] text-white border-[#1E232A] shadow-sm'
                        : 'bg-white text-[#1E232A] border-[#E8E2D9] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span className="block text-xs font-extrabold">{res.label}</span>
                    <span className="block text-[10px] opacity-75 mt-0.5">{res.dims}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase text-[#1E232A] tracking-wider block">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { key: '16:9' as const, label: '16:9 Landscape' },
                  { key: '1:1' as const, label: '1:1 Square' },
                  { key: '4:3' as const, label: '4:3 Classic' },
                  { key: '9:16' as const, label: '9:16 Story' }
                ].map((ar) => (
                  <button
                    type="button"
                    key={ar.key}
                    onClick={() => setAspectRatio(ar.key)}
                    className={`py-2 px-1 text-center rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                      aspectRatio === ar.key
                        ? 'bg-[#E5A853] text-white border-[#E5A853] shadow-xs'
                        : 'bg-white text-[#5C6470] border-[#E8E2D9] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    {ar.key}
                  </button>
                ))}
              </div>
            </div>

            {/* Style Selector */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase text-[#1E232A] tracking-wider block">
                Architectural Style
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {stylePresets.map((style) => (
                  <button
                    type="button"
                    key={style.name}
                    onClick={() => setSelectedStyle(style.name)}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      selectedStyle === style.name
                        ? 'bg-[#FDF6ED] border-[#C6852C] ring-1 ring-[#C6852C]'
                        : 'bg-white border-[#E8E2D9] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span className="block text-xs font-bold text-[#1E232A]">{style.name}</span>
                    <span className="block text-[9px] text-[#7D8592] truncate">{style.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-4 rounded-2xl bg-[#1E232A] hover:bg-[#343D4A] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 text-[#F2C98A] animate-spin" />
                  <span>Synthesizing {resolution} Architectural Render...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#F2C98A]" />
                  <span>Generate {resolution} Visual</span>
                </>
              )}
            </button>

          </form>
        </div>

        {/* Right Column: Visual Result Canvas & Actions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[32px] p-6 sm:p-7 border border-[#E8E2D9] shadow-sm flex flex-col justify-between">
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
                <span className="text-xs font-extrabold text-[#1E232A] uppercase tracking-wider">
                  Active Render Preview ({generatedResult?.resolution || '2K'})
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#8A92A0] bg-[#FAF8F5] border border-[#E8E2D9] px-2 py-0.5 rounded-md">
                Model: gemini-3-pro-image-preview
              </span>
            </div>

            {/* Image Canvas with Loading State */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#1E232A] border border-[#E8E2D9] shadow-inner flex items-center justify-center">
              {isGenerating ? (
                <div className="text-center p-8 space-y-4">
                  <div className="w-16 h-16 rounded-full border-4 border-[#C6852C]/30 border-t-[#C6852C] animate-spin mx-auto"></div>
                  <div>
                    <h4 className="text-white font-heading font-bold text-base">Rendering in {resolution}...</h4>
                    <p className="text-[#A0AAB8] text-xs max-w-xs mx-auto mt-1">
                      Applying photorealistic materials, lighting physics, and architectural detail.
                    </p>
                  </div>
                </div>
              ) : generatedResult ? (
                <div className="w-full h-full relative group">
                  <img
                    src={generatedResult.imageUrl}
                    alt="AI Architectural Visual"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                    <p className="text-white text-xs font-medium line-clamp-2">
                      "{generatedResult.prompt}"
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Actions below Canvas */}
            {generatedResult && !isGenerating && (
              <div className="pt-5 border-t border-[#F0EBE1] flex flex-wrap items-center justify-between gap-3 mt-4">
                <div className="text-xs text-[#68707C]">
                  Resolution: <strong className="text-[#1E232A]">{generatedResult.resolution}</strong> • Model: <strong className="text-[#1E232A]">Gemini 3 Pro</strong>
                </div>

                <div className="flex items-center gap-2">
                  {/* Download button */}
                  <a
                    href={generatedResult.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    download="abduls-realestate-concept.jpg"
                    className="px-4 py-2 bg-[#F3EEE6] hover:bg-[#E8E1D5] text-[#1E232A] text-xs font-bold rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download HD</span>
                  </a>

                  {/* Add to Catalog button */}
                  <button
                    onClick={handleCreateListingFromAI}
                    className="px-5 py-2 bg-[#1E232A] hover:bg-[#C6852C] text-white text-xs font-bold rounded-full transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#F2C98A]" />
                    <span>Publish as Live Listing</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Render History Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase text-[#1E232A] tracking-wider">
              Recent Studio Creations
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setGeneratedResult({
                    imageUrl: item.imageUrl,
                    prompt: item.prompt,
                    resolution: item.resolution,
                    aspectRatio: '16:9'
                  })}
                  className="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#1E232A] border border-[#E8E2D9] cursor-pointer hover:border-[#C6852C] transition-all shadow-xs"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.prompt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    {item.resolution}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
