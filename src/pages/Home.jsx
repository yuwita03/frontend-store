import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

function Placeholder({ label, className = '' }) {
  return (
    <div className={`w-full h-full flex items-center justify-center bg-[#efeeea] ${className}`}>
      <span className="text-[#434843] font-['Hanken_Grotesk'] text-sm font-medium tracking-widest uppercase">
        {label}
      </span>
    </div>
  )
}

function Home() {
  const categories = [
    {
      id: "tshirt",
      name: "Everyday Tees",
      count: "Comfy & Casual",
      tag: "All Sizes",
      bg: "bg-[#e8e0d5]",
      accent: "bg-[#fe932c]"
    },
    {
      id: "outerwear",
      name: "Cozy Layers",
      count: "Jackets & Knits",
      tag: "Restocked Weekly",
      bg: "bg-[#d5ddd0]",
      accent: "bg-[#334537]"
    },
    {
      id: "pants",
      name: "Easy Bottoms",
      count: "Pants & Denim",
      tag: "Thrifted Staples",
      bg: "bg-[#dcd4c8]",
      accent: "bg-[#5e3819]"
    },
    {
      id: "shoes",
      name: "Comfy Footwear",
      count: "Sneakers & Boots",
      tag: "Cleaned & Ready",
      bg: "bg-[#d9d0cc]",
      accent: "bg-[#904d00]"
    }
  ];

  const freshlyAdded = [
    {
      id: 101,
      title: "Classic Retro Striped Cotton Tee",
      price: "$24",
      condition: "Great Condition",
      bg: "bg-[#d5ddd0]"
    },
    {
      id: 102,
      title: "Soft Oversized Denim Worker Jacket",
      price: "$42",
      condition: "Nicely Broken-In",
      bg: "bg-[#e8e0d5]"
    },
    {
      id: 103,
      title: "Vintage Corduroy Bucket Hat",
      price: "$18",
      condition: "Like New",
      bg: "bg-[#d9d0cc]"
    }
  ];

  return (
    <div className="bg-[#faf9f5] min-h-screen text-[#1b1c1a] font-['Hanken_Grotesk'] overflow-x-hidden">

      {/* 1. Hero Section */}
      <section className="max-w-[1280px] mx-auto px-6 pt-24 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="flex flex-col gap-6 lg:col-span-7 items-start">
          <span className="font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] bg-[#334537] text-[#ffffff] px-4 py-1.5 rounded-[0.25rem] uppercase">
            Curated Heritage
          </span>
          <h1 className="font-['Libre_Caslon_Text'] text-5xl md:text-[48px] font-bold leading-[56px] tracking-[-0.02em] text-[#1b1c1a]">
            Pre-loved finds,<br />thoughtfully curated
          </h1>
          <p className="text-[#434843] text-lg max-w-xl font-['Hanken_Grotesk'] leading-relaxed">
            Setiap item dipilih dengan cermat untuk menghadirkan pengalaman thrift
            yang terasa seperti menemukan harta karun di butik vintage favorit Anda.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link to="/catalog">
              <Button variant="outline_dark" className="!bg-[#fe932c] !text-[#ffffff] !border-0 !rounded-[0.25rem] !px-8 !py-4 !text-base !font-semibold !font-['Hanken_Grotesk'] shadow-[0_4px_15px_rgba(51,69,55,0.06)] hover:shadow-[0_6px_20px_rgba(51,69,55,0.12)] hover:-translate-y-0.5 transition-all">
                Mulai Berbelanja
              </Button>
            </Link>
          </div>
        </div>
        <div className="hidden md:flex lg:col-span-5 relative justify-center">
          <div className="w-72 h-96 rounded-[0.5rem] overflow-hidden shadow-[0_4px_15px_rgba(51,69,55,0.06)]">
            <Placeholder label="Featured Style" className="bg-[#e8e0d5]" />
          </div>
          <div className="absolute -bottom-6 -left-4 bg-[#fe932c] text-[#ffffff] font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] py-2 px-4 rounded-[0.25rem] shadow-[0_4px_15px_rgba(51,69,55,0.06)] uppercase">
            Cleaned & Ready to Wear
          </div>
        </div>
      </section>

      {/* 2. Value Strip */}
      <section className="bg-[#ffffff]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3">
          <div className="p-8 lg:p-12 flex flex-col gap-4 hover:bg-[#f4f4f0] transition-colors">
            <div className="w-10 h-10 rounded-[0.25rem] bg-[#efeeea] flex items-center justify-center text-[#334537]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v16.5m16.5-16.5v16.5M12 3.75v16.5m-5.25-12h10.5m-10.5 5.25h10.5m-10.5 5.25h10.5" />
              </svg>
            </div>
            <div>
              <h4 className="font-['Libre_Caslon_Text'] font-semibold text-lg text-[#1b1c1a]">Unique Pieces</h4>
              <p className="text-sm text-[#434843] font-['Hanken_Grotesk'] mt-1 leading-relaxed">
                Setiap item hanya tersedia satu buah — milik Anda sepenuhnya.
              </p>
            </div>
          </div>
          <div className="p-8 lg:p-12 flex flex-col gap-4 hover:bg-[#f4f4f0] transition-colors border-t md:border-t-0 md:border-l border-[#e3e2df]">
            <div className="w-10 h-10 rounded-[0.25rem] bg-[#efeeea] flex items-center justify-center text-[#334537]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <div>
              <h4 className="font-['Libre_Caslon_Text'] font-semibold text-lg text-[#1b1c1a]">Freshly Washed</h4>
              <p className="text-sm text-[#434843] font-['Hanken_Grotesk'] mt-1 leading-relaxed">
                Semua pakaian dicuci bersih secara higienis, harum, dan siap pakai.
              </p>
            </div>
          </div>
          <div className="p-8 lg:p-12 flex flex-col gap-4 hover:bg-[#f4f4f0] transition-colors border-t md:border-t-0 md:border-l border-[#e3e2df]">
            <div className="w-10 h-10 rounded-[0.25rem] bg-[#efeeea] flex items-center justify-center text-[#334537]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-2.25-3.75 2.25-3.75-2.25-3.75 2.25V4.257c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-['Libre_Caslon_Text'] font-semibold text-lg text-[#1b1c1a]">Fair Prices</h4>
              <p className="text-sm text-[#434843] font-['Hanken_Grotesk'] mt-1 leading-relaxed">
                Harga jujur dan terjangkau tanpa markup berlebihan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shop By Category */}
      <section className="max-w-[1280px] mx-auto px-6 py-20 lg:py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <span className="font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] text-[#5e3819] uppercase">Categories</span>
            <h2 className="font-['Libre_Caslon_Text'] text-[32px] font-semibold leading-10 text-[#1b1c1a] mt-1">Jelajahi Kategori</h2>
          </div>
          <Link to="/catalog" className="font-['Hanken_Grotesk'] text-sm font-semibold text-[#334537] hover:text-[#4a5d4e] transition-colors">
            Lihat Semua &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="group bg-[#ffffff] rounded-[0.5rem] overflow-hidden shadow-[0_4px_15px_rgba(51,69,55,0.06)] hover:shadow-[0_6px_20px_rgba(51,69,55,0.12)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
              <div className="relative aspect-square overflow-hidden">
                <span className={`absolute top-3 left-3 z-10 font-['Hanken_Grotesk'] text-[10px] font-semibold tracking-[0.05em] text-[#ffffff] px-3 py-1 rounded-[0.25rem] uppercase ${category.accent}`}>
                  {category.tag}
                </span>
                <Placeholder label={category.name} className={category.bg} />
              </div>
              <div className="p-5 flex flex-col flex-grow gap-3">
                <div>
                  <h3 className="font-['Libre_Caslon_Text'] font-semibold text-xl text-[#1b1c1a]">{category.name}</h3>
                  <span className="text-xs font-['Hanken_Grotesk'] text-[#737872] mt-0.5 block">{category.count}</span>
                </div>
                <Link to={`/catalog?category=${category.id}`} className="mt-auto">
                  <button className="w-full bg-[#334537] hover:bg-[#4a5d4e] text-[#ffffff] font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] py-3 px-4 rounded-[0.25rem] uppercase transition-colors">
                    Buka Koleksi
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Info Banner */}
      <div className="w-full bg-[#ffffff] border-y border-[#e3e2df] py-8">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
          <div className="flex items-center justify-center gap-3">
            <div className="text-[#334537] bg-[#efeeea] p-2 rounded-[0.25rem]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] text-[#434843] uppercase">Eco Friendly</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="text-[#334537] bg-[#efeeea] p-2 rounded-[0.25rem]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
            </div>
            <span className="font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] text-[#434843] uppercase">Plastic-Free Pack</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="text-[#334537] bg-[#efeeea] p-2 rounded-[0.25rem]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <span className="font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] text-[#434843] uppercase">New Items Daily</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="text-[#334537] bg-[#efeeea] p-2 rounded-[0.25rem]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25c0-.446-.26-.846-.662-1.022l-2.62-1.143a1.125 1.125 0 00-.712-.113L15 9h-1.5V4.5A1.125 1.125 0 0012.375 3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125H12.75" />
              </svg>
            </div>
            <span className="font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] text-[#434843] uppercase">Flat Rate Shipping</span>
          </div>
        </div>
      </div>

      {/* 5. Editorial Showcase */}
      <section className="bg-[#ffffff] border-b border-[#e3e2df] py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-xl mb-16">
            <span className="font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] text-[#334537] uppercase">Kurasi Pilihan</span>
            <h2 className="font-['Libre_Caslon_Text'] text-[32px] font-semibold leading-10 text-[#1b1c1a] mt-2">
              Lebih dekat dengan koleksi harian kami.
            </h2>
            <p className="text-[#434843] text-sm font-['Hanken_Grotesk'] mt-3 leading-relaxed">
              Setiap pakaian dipilih berdasarkan kualitas kain dan keunikan karakternya.
              Kami memeriksa setiap detail agar siap jadi andalan baru Anda.
            </p>
          </div>
          <div className="flex flex-col gap-16">
            {freshlyAdded.map((item, index) => (
              <div
                key={item.id}
                className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch pb-16 last:pb-0 ${
                  index < freshlyAdded.length - 1 ? 'border-b border-[#e3e2df]' : ''
                } ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="flex-1">
                  <div className="relative aspect-[4/3] lg:aspect-square rounded-[0.5rem] overflow-hidden shadow-[0_4px_15px_rgba(51,69,55,0.06)]">
                    <Placeholder label={item.title} className={item.bg} />
                    <div className="absolute bottom-4 left-4 bg-[#ffffff] font-['Hanken_Grotesk'] text-[11px] font-semibold px-3 py-1.5 rounded-[0.25rem] shadow-[0_2px_8px_rgba(51,69,55,0.08)]">
                      Kondisi: {item.condition}
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center py-2">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] bg-[#efeeea] text-[#434843] px-3 py-1 rounded-[0.25rem] uppercase">
                        Sudah Higienis
                      </span>
                      <span className="font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] bg-[#efeeea] text-[#434843] px-3 py-1 rounded-[0.25rem] uppercase">
                        Eksklusif 1 Stok
                      </span>
                    </div>
                    <div>
                      <h3 className="font-['Libre_Caslon_Text'] font-semibold text-2xl sm:text-3xl text-[#1b1c1a] leading-tight">
                        {item.title}
                      </h3>
                      <p className="font-['Hanken_Grotesk'] font-semibold text-xl text-[#fe932c] mt-2">
                        {item.price}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#e3e2df]">
                      <h4 className="font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] text-[#737872] uppercase">Info Produk</h4>
                      <p className="text-[#434843] text-sm font-['Hanken_Grotesk'] mt-1">
                        Bahan nyaman untuk dipakai beraktivitas sehari-hari tanpa terasa kaku.
                      </p>
                    </div>
                  </div>
                  <div className="pt-6 flex flex-wrap items-center gap-4 mt-6 lg:mt-0">
                    <Link to={`/product/${item.id}`} className="flex-1 sm:flex-none">
                      <button className="w-full sm:w-auto bg-[#334537] hover:bg-[#4a5d4e] text-[#ffffff] font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] px-6 py-3.5 rounded-[0.25rem] uppercase transition-colors shadow-[0_4px_15px_rgba(51,69,55,0.06)]">
                        Lihat Detail &rarr;
                      </button>
                    </Link>
                    <span className="font-['Hanken_Grotesk'] text-xs text-[#737872] hidden sm:inline-block">
                      ID: #TRF-{item.id}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 pt-8 border-t border-[#e3e2df] text-center">
            <Link to="/catalog" className="inline-block font-['Hanken_Grotesk'] text-sm font-semibold tracking-[0.05em] text-[#334537] border border-[#334537] px-6 py-3 rounded-[0.25rem] hover:bg-[#334537] hover:text-[#ffffff] uppercase transition-colors">
              Jelajahi Seluruh Koleksi ({freshlyAdded.length}+ Item)
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="max-w-[1280px] mx-auto px-6 py-20 lg:py-24">
        <div className="text-center max-w-lg mx-auto mb-16">
          <span className="font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] text-[#5e3819] uppercase">Testimoni</span>
          <h2 className="font-['Libre_Caslon_Text'] text-[32px] font-semibold leading-10 text-[#1b1c1a] mt-2">Kata Mereka</h2>
          <p className="text-sm font-['Hanken_Grotesk'] text-[#737872] mt-2">
            Apa kata mereka yang sudah berbelanja pakaian pre-loved di toko kami?
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#ffffff] rounded-[0.5rem] p-6 shadow-[0_4px_15px_rgba(51,69,55,0.06)]">
            <p className="text-sm text-[#434843] font-['Hanken_Grotesk'] leading-relaxed">
              &ldquo;Baju-bajunya beneran wangi dan bersih pas nyampe, ukurannya juga pas banget sesuai deskripsi di web. Suka!&rdquo;
            </p>
            <p className="font-['Hanken_Grotesk'] text-xs font-semibold text-[#1b1c1a] mt-4">&mdash; @reza.ardian</p>
          </div>
          <div className="bg-[#ffffff] rounded-[0.5rem] p-6 shadow-[0_4px_15px_rgba(51,69,55,0.06)]">
            <p className="text-sm text-[#434843] font-['Hanken_Grotesk'] leading-relaxed">
              &ldquo;Suka sama konsepnya yang santai, harganya masuk akal banget buat kantong mahasiswa dan bahannya masih bagus.&rdquo;
            </p>
            <p className="font-['Hanken_Grotesk'] text-xs font-semibold text-[#1b1c1a] mt-4">&mdash; @dinda_amalia</p>
          </div>
          <div className="bg-[#ffffff] rounded-[0.5rem] p-6 shadow-[0_4px_15px_rgba(51,69,55,0.06)]">
            <p className="text-sm text-[#434843] font-['Hanken_Grotesk'] leading-relaxed">
              &ldquo;Akhirnya nemu thrift shop yang ga bikin pusing rebutan drop-dropan. Pengirimannya juga cepet banget.&rdquo;
            </p>
            <p className="font-['Hanken_Grotesk'] text-xs font-semibold text-[#1b1c1a] mt-4">&mdash; @kevin_mahendra</p>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home