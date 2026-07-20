import { Link } from 'react-router-dom';
import { useState } from 'react';
import Badge from '../ui/Badge';

// Komponen internal untuk menangani gambar yang kosong atau error
const SafeImage = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  // Gunakan aset lokal atau URL placeholder yang senada dengan tema "Parchment"
  const placeholder = "https://static.wikia.nocookie.net/the-lost-landscapes/images/9/90/Shop_placeholader.png/revision/latest/scale-to-width-down/1677?cb=20240108044232"; 

  return (
    <img
      src={error || !src ? placeholder : src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="flex flex-col gap-4">

        <div className="aspect-[4/5] bg-[#efeeea] rounded-[0.5rem] overflow-hidden shadow-[0_4px_15px_rgba(51,69,55,0.06)]">
          <SafeImage
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="font-['Hanken_Grotesk'] text-[10px] font-semibold tracking-[0.05em] text-[#5e3819] uppercase">
              {product.category?.name || 'Uncategorized'}
            </span>
            {product.stock === 0 && (
              <Badge variant="default" className="text-[10px]">Habis</Badge>
            )}
          </div>
          
          <h3 className="font-['Libre_Caslon_Text'] text-lg font-semibold text-[#1b1c1a] leading-tight truncate">
            {product.name}
          </h3>
          
          <p className="font-['Hanken_Grotesk'] text-sm font-medium text-[#434843]">
            Rp {product.price?.toLocaleString('id-ID')}
          </p>
        </div>

      </div>
    </Link>
  );
}

export default ProductCard;