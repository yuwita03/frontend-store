import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ShieldCheck, Truck, RotateCcw, AlertTriangle, ArrowLeft } from 'lucide-react';
import api from '../api/api';
import Toast from '../components/ui/Toats';
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
      <div className="min-h-screen bg-[#faf9f5] flex items-center justify-center font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] text-[#737872] uppercase animate-pulse">
        Loading product information...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf9f5] flex flex-col items-center justify-center gap-3 px-4">
        <p className="font-['Libre_Caslon_Text'] font-semibold text-xl text-[#1b1c1a]">Product could not be found</p>
        <Link to="/catalog" className="text-xs font-['Hanken_Grotesk'] font-semibold tracking-[0.05em] text-[#334537] hover:text-[#4a5d4e] uppercase transition-colors">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const productImage = product.image || "";

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
    <div className="min-h-screen bg-[#faf9f5] text-[#1b1c1a] font-['Hanken_Grotesk'] py-12">
      <Toast toast={toast} />
      <div className="max-w-[1280px] mx-auto px-6">

        <div className="mb-8">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-xs font-['Hanken_Grotesk'] font-semibold tracking-[0.05em] text-[#737872] hover:text-[#334537] uppercase transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Catalog
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">

          <div className="md:col-span-6 lg:col-span-7">
            <div className="bg-[#efeeea] rounded-[0.5rem] overflow-hidden aspect-square shadow-[0_4px_15px_rgba(51,69,55,0.06)]">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#efeeea]">
                  <span className="font-['Hanken_Grotesk'] text-sm font-medium tracking-widest uppercase text-[#434843]">
                    Product Image
                  </span>
                </div>
              )}
            </div>
            <div className="mt-3 text-left">
              <span className="text-[10px] font-['Hanken_Grotesk'] font-medium tracking-[0.05em] text-[#737872] uppercase">
                SKU: {product.slug}
              </span>
            </div>
          </div>

          <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-6">
            <div>
              {product.category?.name && (
                <span className="inline-block bg-[#efeeea] text-[#434843] text-[10px] uppercase tracking-[0.05em] font-semibold px-3 py-1 rounded-[0.25rem] mb-3">
                  {product.category.name}
                </span>
              )}

              <h1 className="font-['Libre_Caslon_Text'] text-3xl font-semibold text-[#1b1c1a] leading-tight mb-2">
                {product.name}
              </h1>

              <div className="text-xl font-['Hanken_Grotesk'] font-semibold text-[#fe932c]">{formattedPrice}</div>

              <div className="border-t border-[#e3e2df] my-5" />

              <div className="mb-2">
                <h3 className="text-xs uppercase tracking-[0.05em] text-[#737872] font-semibold mb-1.5">Description</h3>
                <p className="text-[#434843] text-sm leading-relaxed">
                  {product.description || "No description provided for this product."}
                </p>
              </div>
            </div>

            <div className="bg-[#ffffff] rounded-[0.5rem] p-6 shadow-[0_4px_15px_rgba(51,69,55,0.06)]">
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-['Hanken_Grotesk'] font-semibold tracking-[0.05em] text-[#737872] uppercase">Status</span>
                {product.stock > 0 ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-['Hanken_Grotesk'] font-semibold text-[#334537] bg-[#efeeea] px-3 py-1 rounded-[0.25rem]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#334537]" />
                    {product.stock} units left
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-['Hanken_Grotesk'] font-semibold text-[#737872] bg-[#efeeea] px-3 py-1 rounded-[0.25rem]">
                    <AlertTriangle size={12} /> Out of Stock
                  </span>
                )}
              </div>

              {product.stock > 0 && (
                <div className="flex items-center justify-between mb-5 border-t border-[#e3e2df] pt-4">
                  <span className="text-xs font-['Hanken_Grotesk'] font-semibold tracking-[0.05em] text-[#737872] uppercase">Quantity</span>
                  <div className="flex items-center border border-[#c3c8c1] rounded-[0.25rem] p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="w-7 h-7 rounded-[0.25rem] flex items-center justify-center hover:bg-[#efeeea] text-[#434843] transition-colors disabled:opacity-30 font-['Hanken_Grotesk'] text-sm"
                    >
                      -
                    </button>
                    <span className="w-9 text-center font-semibold text-xs font-['Hanken_Grotesk'] text-[#1b1c1a]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                      className="w-7 h-7 rounded-[0.25rem] flex items-center justify-center hover:bg-[#efeeea] text-[#434843] transition-colors disabled:opacity-30 font-['Hanken_Grotesk'] text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAdding}
                className={`w-full font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] py-3.5 px-6 rounded-[0.25rem] uppercase transition-all text-center flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(51,69,55,0.06)] ${
                  product.stock === 0
                    ? 'bg-[#efeeea] text-[#737872] cursor-not-allowed'
                    : 'bg-[#fe932c] text-[#ffffff] hover:bg-[#904d00]'
                }`}
              >
                <ShoppingCart size={14} />
                {isAdding ? 'Adding to Cart...' : `Add to Cart — ${totalPrice}`}
              </button>

              <div className="grid grid-cols-3 gap-2 mt-5 border-t border-[#e3e2df] pt-4 text-center">
                <div className="flex flex-col items-center gap-1">
                  <Truck size={14} className="text-[#737872]" />
                  <span className="text-[10px] font-['Hanken_Grotesk'] font-medium text-[#737872]">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck size={14} className="text-[#737872]" />
                  <span className="text-[10px] font-['Hanken_Grotesk'] font-medium text-[#737872]">Original Asset</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw size={14} className="text-[#737872]" />
                  <span className="text-[10px] font-['Hanken_Grotesk'] font-medium text-[#737872]">Easy Returns</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}