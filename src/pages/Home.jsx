import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

function Home() {
  const categories = [
    {
      id: "tshirt",
      name: "Everyday Tees",
      count: "Comfy & Casual",
      tag: "All Sizes",
      tagBg: "bg-amber-100 text-amber-950",
      shadowColor: "hover:shadow-[8px_8px_0px_0px_rgba(252,211,77,1)]",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "outerwear",
      name: "Cozy Layers",
      count: "Jackets & Knits",
      tag: "Restocked Weekly",
      tagBg: "bg-purple-100 text-purple-950",
      shadowColor: "hover:shadow-[8px_8px_0px_0px_rgba(196,181,253,1)]",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "pants",
      name: "Easy Bottoms",
      count: "Pants & Denim",
      tag: "Thrifted Staples",
      tagBg: "bg-emerald-100 text-emerald-950",
      shadowColor: "hover:shadow-[8px_8px_0px_0px_rgba(110,231,183,1)]",
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "shoes",
      name: "Comfy Footwear",
      count: "Sneakers & Boots",
      tag: "Cleaned & Ready",
      tagBg: "bg-rose-100 text-rose-950",
      shadowColor: "hover:shadow-[8px_8px_0px_0px_rgba(244,114,182,1)]",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80"
    }
  ];

  const freshlyAdded = [
    {
      id: 101,
      title: "Classic Retro Striped Cotton Tee",
      price: "$24",
      condition: "Great Condition",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 102,
      title: "Soft Oversized Denim Worker Jacket",
      price: "$42",
      condition: "Nicely Broken-In",
      image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 103,
      title: "Vintage Corduroy Bucket Hat",
      price: "$18",
      condition: "Like New",
      image: "https://images.unsplash.com/photo-1576871337622-98d48d435350?w=500&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-stone-900 font-sans selection:bg-yellow-200 overflow-x-hidden">
      
      {/* 1. Welcoming Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="flex flex-col gap-6 lg:col-span-7 items-start">
          <span className="font-mono text-xs font-bold tracking-wider bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200 uppercase">
            🌱 Fashion For Everyone
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-black text-stone-900 leading-[1.1] tracking-tight">
            Good thrift finds, made <span className="underline decoration-wavy decoration-yellow-400">easy</span> for <span className="bg-sky-100 px-2 rounded-md inline-block transform rotate-1 text-sky-700">everybody.</span>
          </h1>
          <p className="text-stone-600 text-lg max-w-xl font-medium leading-relaxed">
            Pakaian pre-loved berkualitas yang ramah di kantong dan ramah lingkungan. Kami percaya semua orang berhak tampil keren tanpa harus ribet berebut pakaian.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link to="/catalog">
              <Button variant="aloe" className="bg-stone-900 text-white hover:bg-stone-800 px-8 py-4 text-base font-bold shadow-[4px_4px_0px_0px_rgba(14,165,233,1)] transition-all">
                Mulai Belanja
              </Button>
            </Link>
          </div>
        </div>

        <div className="hidden md:flex lg:col-span-5 relative justify-center">
          <div className="w-72 h-96 bg-rose-100 rounded-2xl overflow-hidden border-4 border-stone-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <img 
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&auto=format&fit=crop&q=80" 
              alt="Comfortable preloved clothing" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-4 bg-yellow-200 text-stone-900 font-mono text-xs font-bold border-2 border-stone-900 py-2 px-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-md transform -rotate-3">
            ✨ Cleaned & Ready to Wear
          </div>
        </div>
      </section>

      {/* 2. Inclusivity Value Strip - Clean SVG Icon Style */}
      <section className="border-t-2 border-b-2 border-stone-950 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-stone-950">
          
          {/* Item 1: Sizes */}
          <div className="p-8 flex flex-col gap-3 hover:bg-stone-50/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-stone-950 flex items-center justify-center text-stone-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v16.5m16.5-16.5v16.5M12 3.75v16.5m-5.25-12h10.5m-10.5 5.25h10.5m-10.5 5.25h10.5" />
              </svg>
            </div>
            <div>
              <h4 className="font-serif font-black text-lg text-stone-900">Unique Pieces</h4>
              <p className="text-sm text-stone-600 font-medium mt-1">
                Setiap item hanya tersedia satu buah. Pakaian yang Anda beli murni milik gaya unik Anda sendiri.
              </p>
            </div>
          </div>

          {/* Item 2: Hygiene */}
          <div className="p-8 flex flex-col gap-3 hover:bg-stone-50/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-stone-950 flex items-center justify-center text-stone-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <div>
              <h4 className="font-serif font-black text-lg text-stone-900">Freshly Washed</h4>
              <p className="text-sm text-stone-600 font-medium mt-1">
                Semua pakaian sudah dicuci bersih secara higienis, harum, dan siap pakai.
              </p>
            </div>
          </div>

          {/* Item 3: Pricing */}
          <div className="p-8 flex flex-col gap-3 hover:bg-stone-50/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-100 border border-stone-950 flex items-center justify-center text-stone-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-2.25-3.75 2.25-3.75-2.25-3.75 2.25V4.257c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-serif font-black text-lg text-stone-900">Fair & Honest Prices</h4>
              <p className="text-sm text-stone-600 font-medium mt-1">
                Tidak ada harga gaib atau spekulasi. Semua harga jujur dan terjangkau.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Shop By Category Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <span className="font-mono text-xs font-bold text-sky-600 uppercase tracking-widest">Find Your Style</span>
            <h2 className="font-serif text-4xl font-black text-stone-900 mt-1">Jelajahi Kategori</h2>
          </div>
          <Link to="/catalog" className="text-stone-900 font-bold underline hover:text-stone-700 font-mono text-sm flex items-center gap-1">
            Lihat semua baju →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id} className={`group bg-white border-2 border-stone-950 rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${category.shadowColor} transition-all duration-300 flex flex-col`}>
              <div className="relative aspect-square bg-stone-100 border-b-2 border-stone-950 overflow-hidden">
                <span className={`absolute top-3 left-3 z-10 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-stone-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${category.tagBg}`}>
                  {category.tag}
                </span>
                <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex flex-col flex-grow gap-2">
                <div>
                  <h3 className="font-serif font-black text-xl text-stone-900">{category.name}</h3>
                  <span className="text-xs font-mono font-medium text-stone-500 mt-0.5">{category.count}</span>
                </div>
                <Link to={`/catalog?category=${category.id}`} className="mt-2">
                  <button className="w-full bg-white hover:bg-stone-950 text-stone-950 hover:text-white border-2 border-stone-950 font-bold py-2 px-3 rounded-lg text-xs transition-colors">
                    Buka Koleksi 😉
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Minimalist Info Banner with Sharp Utility Line Icons */}
      <div className="w-full bg-white border-t-2 border-b-2 border-stone-950 py-6">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-2 text-center">
          
          <div className="flex items-center justify-center gap-3 px-3">
            <div className="text-rose-500 bg-rose-50 p-1.5 rounded-lg border border-rose-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-mono text-[11px] font-bold tracking-wider text-stone-700 uppercase">Eco Friendly Sourced</span>
          </div>

          <div className="flex items-center justify-center gap-3 px-3 border-l-0 sm:border-l border-stone-200">
            <div className="text-emerald-500 bg-emerald-50 p-1.5 rounded-lg border border-emerald-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
            </div>
            <span className="font-mono text-[11px] font-bold tracking-wider text-stone-700 uppercase">Plastic-Free Pack</span>
          </div>

          <div className="flex items-center justify-center gap-3 px-3 border-l-0 md:border-l border-stone-200">
            <div className="text-amber-500 bg-amber-50 p-1.5 rounded-lg border border-amber-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <span className="font-mono text-[11px] font-bold tracking-wider text-stone-700 uppercase">New Items Daily</span>
          </div>

          <div className="flex items-center justify-center gap-3 px-3 border-l-0 sm:border-l border-stone-200">
            <div className="text-purple-500 bg-purple-50 p-1.5 rounded-lg border border-purple-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25c0-.446-.26-.846-.662-1.022l-2.62-1.143a1.125 1.125 0 00-.712-.113L15 9h-1.5V4.5A1.125 1.125 0 0012.375 3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125H12.75" />
              </svg>
            </div>
            <span className="font-mono text-[11px] font-bold tracking-wider text-stone-700 uppercase">Flat Rate Shipping</span>
          </div>

        </div>
      </div>

      {/* 5. Descriptive Editorial Showcase */}
      <section className="bg-white border-b-2 border-stone-950 py-24">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="max-w-xl mb-16">
            <span className="font-mono text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
              Kurasi Pilihan
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-stone-900 mt-3 leading-tight">
              Lebih dekat dengan koleksi harian kami.
            </h2>
            <p className="text-stone-600 text-sm mt-3 font-medium leading-relaxed">
              Setiap pakaian dipilih berdasarkan kualitas kain terbaik dan keunikan karakternya. Kami memeriksa setiap detail agar item tunggal ini siap jadi andalan baru Anda.
            </p>
          </div>

          {/* Descriptive Content Rows */}
          <div className="flex flex-col gap-16">
            {freshlyAdded.map((item, index) => (
              <div 
                key={item.id} 
                className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch border-b border-stone-100 pb-16 last:border-0 last:pb-0 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Presentation Frame */}
                <div className="flex-1 relative">
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-square bg-stone-50 border-2 border-stone-950 rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute bottom-4 left-4 bg-white border border-stone-950 font-mono text-[11px] font-bold px-3 py-1 rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      Kondisi: {item.condition}
                    </div>
                  </div>
                </div>

                {/* Rich Descriptive Information Block */}
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div className="flex flex-col gap-4">
                    
                    {/* Meta Tags */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-sky-50 border border-sky-200 text-sky-700 px-2.5 py-0.5 rounded">
                        Sudah Higienis
                      </span>
                      <span className="font-mono text-xs font-bold bg-amber-50 border border-amber-200 text-amber-700 px-2.5 py-0.5 rounded">
                        Eksklusif 1 Stok
                      </span>
                    </div>

                    {/* Title & Pricing */}
                    <div>
                      <h3 className="font-serif font-black text-2xl sm:text-3xl text-stone-900 leading-tight">
                        {item.title}
                      </h3>
                      <p className="font-sans font-black text-xl text-emerald-600 mt-2">
                        {item.price} <span className="text-xs font-mono font-medium text-stone-400">Nett (Termasuk Pajak)</span>
                      </p>
                    </div>

                    {/* Static, high-transparency descriptive details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-200 mt-2">
                      <div>
                        <h4 className="font-mono text-xs font-bold text-stone-400 uppercase tracking-wider">Info Produk</h4>
                        <p className="text-stone-700 text-sm font-medium mt-1">Bahan nyaman untuk dipakai beraktivitas sehari-hari tanpa terasa kaku.</p>
                      </div>
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="pt-6 flex flex-wrap items-center gap-4 mt-6 lg:mt-0">
                    <Link to={`/product/${item.id}`} className="flex-1 sm:flex-none">
                      <button className="w-full sm:w-auto bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold px-6 py-3.5 rounded-lg transition-colors tracking-wide shadow-[3px_3px_0px_0px_rgba(16,185,129,1)]">
                        Pelajari Spesifikasi Baju →
                      </button>
                    </Link>
                    <span className="font-mono text-xs text-stone-400 hidden sm:inline-block">
                      ID: #TRF-{item.id}
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Footer Navigation */}
          <div className="mt-16 pt-8 border-t-2 border-stone-950 text-center">
            <Link to="/catalog" className="inline-block font-mono text-sm font-bold text-stone-900 border-2 border-stone-950 px-6 py-3 bg-white rounded-lg hover:bg-stone-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
              Jelajahi Seluruh Lemari Koleksi Kami ({freshlyAdded.length}+ Item)
            </Link>
          </div>

        </div>
      </section>

      {/* 6. Casual Community Reviews Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-lg mx-auto mb-16">
          <span className="font-mono text-xs font-bold text-purple-600 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full uppercase">Testimoni</span>
          <h2 className="font-serif text-4xl font-black text-stone-900 mt-3">Kata Mereka</h2>
          <p className="text-sm font-medium text-stone-500 mt-2">Apa kata mereka yang sudah berbelanja pakaian pre-loved di toko kami?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border-2 border-stone-950 p-6 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-sm text-stone-600 font-medium">"Baju-bajunya beneran wangi dan bersih pas nyampe, ukurannya juga pas banget sesuai deskripsi di web. Suka!"</p>
            <p className="font-mono text-xs font-bold text-stone-900 mt-4">— @reza.ardian</p>
          </div>
          <div className="bg-white border-2 border-stone-950 p-6 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-sm text-stone-600 font-medium">"Suka sama konsepnya yang santai, harganya masuk akal banget buat kantong mahasiswa dan bahannya masih bagus."</p>
            <p className="font-mono text-xs font-bold text-stone-900 mt-4">— @dinda_amalia</p>
          </div>
          <div className="bg-white border-2 border-stone-950 p-6 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-sm text-stone-600 font-medium">"Akhirnya nemu thrift shop yang ga bikin pusing rebutan drop-dropan. Pengirimannya juga cepet banget."</p>
            <p className="font-mono text-xs font-bold text-stone-900 mt-4">— @kevin_mahendra</p>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home;