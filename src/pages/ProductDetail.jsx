import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ShieldCheck, Truck, RotateCcw, AlertTriangle, ArrowLeft } from 'lucide-react';
import api from '../api/api';
import Toast from '../components/UI/Toats';
import { useToast } from '../hooks/useToast';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const {toast, showToast}  = useToast()


  useEffect(() => {
    const controller = new AbortController();

    const fetchProductDetail = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products/${slug}`, {
          signal: controller.signal
        });
        setProduct(res.data.data || res.data);
      } catch (err) {
        if (err.name === "CanceledError") return;
        console.error("Gagal mengambil detail produk:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProductDetail();
    return () => controller.abort();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-mono text-xs uppercase tracking-widest text-stone-400 animate-pulse">
        Loading product information...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-3 px-4">
        <p className="font-serif font-bold text-xl text-stone-800">Product could not be found</p>
        <Link to="/catalog" className="text-xs font-mono uppercase tracking-wider text-sky-600 hover:underline">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const productImage = product.image || "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80";

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(Number(product.price));

  const totalPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(Number(product.price) * quantity);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await api.post('/cart', {
        productId: product.id,
        quantity: quantity,
      });
      showToast('Added to cart!')
    } catch (err) {
      showToast(err.response?.data?.message || JSON.stringify(err.response?.data) || 'Failed to add to cart')
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-stone-800 antialiased py-12">
      <Toast toast={toast} />
      <div className="max-w-6xl mx-auto px-4 sm:px-8">

        {/* Breadcrumb - Bersih & Minimalis */}
        <div className="mb-8">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-stone-400 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft size={14} />
            BACK TO CATALOG
          </Link>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left: Product Image & SKU */}
          <div className="md:col-span-6 lg:col-span-7">
            <div className="bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 aspect-square flex items-center justify-center">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="mt-3 text-left pl-1">
              <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                SKU-SLUG: {product.slug}
              </span>
            </div>
          </div>

          {/* Right: Transaction Panel */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-6">
            <div>
              {product.category?.name && (
                <span className="inline-block bg-stone-100 text-stone-800 text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-md mb-3">
                  {product.category.name}
                </span>
              )}

              <h1 className="font-serif text-3xl font-bold text-stone-900 leading-tight mb-2">
                {product.name}
              </h1>

              <div className="text-xl font-mono font-bold text-stone-900">{formattedPrice}</div>

              <div className="border-t border-stone-100 my-5" />

              <div className="mb-2">
                <h3 className="text-xs uppercase tracking-wider text-stone-400 font-bold mb-1.5">Description</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {product.description || "No description provided for this product."}
                </p>
              </div>
            </div>

            {/* Purchase Action Box - Sesuai dengan gaya panel filter / box putih polos */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider">Status</span>
                {product.stock > 0 ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600 bg-emerald-50/50 px-2.5 py-1 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {product.stock} units left
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-stone-400 bg-stone-50 px-2.5 py-1 rounded-lg">
                    <AlertTriangle size={12} /> Out of Stock
                  </span>
                )}
              </div>

              {product.stock > 0 && (
                <div className="flex items-center justify-between mb-5 border-t border-stone-100 pt-4">
                  <span className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider">Quantity</span>
                  <div className="flex items-center border border-stone-200 rounded-lg p-1 bg-stone-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white text-stone-600 transition-colors disabled:opacity-30 font-mono text-sm"
                    >
                      -
                    </button>
                    <span className="w-9 text-center font-bold text-xs font-mono text-stone-800">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                      className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white text-stone-600 transition-colors disabled:opacity-30 font-mono text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Tombol Utama Hitam Minimalis */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAdding}
                className={`w-full font-mono text-xs font-bold py-3 px-6 rounded-lg transition-colors text-center flex items-center justify-center gap-2 ${
                  product.stock === 0
                    ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                    : 'bg-stone-950 text-white hover:bg-stone-800 active:bg-stone-900'
                }`}
              >
                <ShoppingCart size={14} />
                {isAdding ? 'ADDING TO CART...' : `ADD TO CART — ${totalPrice}`}
              </button>

              {/* Minimalist Trust Badges */}
              <div className="grid grid-cols-3 gap-2 mt-5 border-t border-stone-100 pt-4 text-center">
                <div className="flex flex-col items-center gap-1">
                  <Truck size={14} className="text-stone-400" />
                  <span className="text-[10px] font-mono text-stone-500 font-medium">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck size={14} className="text-stone-400" />
                  <span className="text-[10px] font-mono text-stone-500 font-medium">Original Asset</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw size={14} className="text-stone-400" />
                  <span className="text-[10px] font-mono text-stone-500 font-medium">Easy Returns</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}