import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ShieldCheck, Truck, RotateCcw, AlertTriangle, ArrowLeft } from 'lucide-react';
import api from '../api/api';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProductDetail = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products/${id}`, {
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

    if (id) fetchProductDetail();
    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas-cream flex items-center justify-center font-display text-lg tracking-widest text-shade-50">
        LOADING ARCHITECTURAL ASSET...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-canvas-cream flex flex-col items-center justify-center gap-4">
        <p className="font-body text-shade-60">Product asset could not be resolved.</p>
        <Link to="/catalog" className="text-sm font-mono uppercase underline tracking-wider">
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
    alert('Added to cart!');
  } catch (err) {
    console.log('Full error:', err.response?.data)
    // Show the actual error instead of redirecting
    alert(err.response?.data?.message || JSON.stringify(err.response?.data) || 'Failed to add to cart')
  } finally {
    setIsAdding(false);
  }
};

  return (
    <div className="min-h-screen bg-canvas-cream text-black font-body selection:bg-aloe py-12" style={{ fontFeatureSettings: '"ss03"' }}>
      <div className="max-w-7xl mx-auto px-8">

        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-shade-50 hover:text-black transition-colors"
          >
            <ArrowLeft size={14} />
            BACK TO CATALOG
          </Link>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: Product Image */}
          <div className="lg:col-span-7">
            <div className="bg-canvas-light rounded-lg overflow-hidden border border-hairline-light aspect-square flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
              <img src={productImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="mt-3 text-right">
              <span className="text-[10px] font-mono text-shade-40 uppercase tracking-widest">
                SKU-SLUG: {product.slug}
              </span>
            </div>
          </div>

          {/* Right: Transaction Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between min-h-[500px]">
            <div>
              {product.category?.name && (
                <Link
                  to="/catalog"
                  className="inline-block bg-aloe text-black text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-pill mb-4 hover:opacity-80 transition-opacity"
                >
                  {product.category.name}
                </Link>
              )}

              <h1 className="font-display text-3xl lg:text-4xl font-normal tracking-tight leading-tight mb-4">
                {product.name}
              </h1>

              <div className="mb-6">
                <div className="text-2xl font-normal font-display text-black">{formattedPrice}</div>
              </div>

              <hr className="border-hairline-light my-6" />

              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-widest text-shade-50 font-semibold mb-2">Description</h3>
                <p className="text-shade-60 text-base leading-relaxed font-normal">
                  {product.description || "No description provided for this architectural asset."}
                </p>
              </div>
            </div>

            {/* Purchase Action Box */}
            <div className="bg-canvas-light border border-hairline-light rounded-lg p-6 shadow-[0_8px_8px_rgba(0,0,0,0.02),0_4px_4px_rgba(0,0,0,0.02),0_0_0_1px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium text-shade-60">Inventory Status</span>
                {product.stock > 0 ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-pill bg-pistachio text-black">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {product.stock} units available
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-pill bg-shade-30 text-shade-60">
                    <AlertTriangle size={12} /> Out of Stock
                  </span>
                )}
              </div>

              {product.stock > 0 && (
                <div className="flex items-center justify-between mb-6 border-b border-hairline-light pb-4">
                  <span className="text-sm font-medium text-shade-60">Select Quantity</span>
                  <div className="flex items-center border border-hairline-light rounded-pill p-1 bg-canvas-cream">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="w-8 h-8 rounded-pill flex items-center justify-center hover:bg-shade-30 text-base transition-colors cursor-pointer disabled:opacity-30 font-mono"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-semibold text-sm font-mono">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                      className="w-8 h-8 rounded-pill flex items-center justify-center hover:bg-shade-30 text-base transition-colors cursor-pointer disabled:opacity-30 font-mono"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAdding}
                className={`w-full font-medium py-3 px-6 rounded-pill text-sm transition-all duration-200 text-center flex items-center justify-center gap-2 cursor-pointer ${
                  product.stock === 0
                    ? 'bg-shade-30 text-shade-50 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-shade-70 active:scale-[0.99]'
                }`}
              >
                <ShoppingCart size={16} />
                {isAdding ? 'Securing Item...' : `Add to Cart — ${totalPrice}`}
              </button>

              <div className="grid grid-cols-3 gap-2 mt-6 border-t border-hairline-light pt-4 text-center">
                <div className="flex flex-col items-center gap-1">
                  <Truck size={14} className="text-shade-60" />
                  <span className="text-[10px] font-medium text-shade-50 uppercase tracking-tight">Free Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck size={14} className="text-shade-60" />
                  <span className="text-[10px] font-medium text-shade-50 uppercase tracking-tight">Genuine Product</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw size={14} className="text-shade-60" />
                  <span className="text-[10px] font-medium text-shade-50 uppercase tracking-tight">Easy Returns</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}