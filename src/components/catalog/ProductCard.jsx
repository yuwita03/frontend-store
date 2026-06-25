import { Link } from 'react-router-dom'
import Badge from '../UI/Badge'

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.slug}`} className="group">
      <div className="flex flex-col gap-3">

        {/* Image */}
        <div className="aspect-square bg-shade-30 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-125"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <p className="font-body text-xs text-shade-50">{product.category?.name}</p>
            {product.stock === 0 && (
              <Badge variant="default">Out of stock</Badge>
            )}
          </div>
          <h3 className="font-body text-sm font-medium text-canvas-night">
            {product.name}
          </h3>
          <p className="font-body text-sm text-shade-60">
            Rp. {product.price?.toLocaleString()}
          </p>
        </div>

      </div>
    </Link>
  )
}

export default ProductCard