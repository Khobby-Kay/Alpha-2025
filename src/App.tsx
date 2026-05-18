import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import {
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import {
  categories,
  faqItems,
  galleryImages,
  paymentMethods,
  products,
  services,
  testimonials,
  trustPoints,
  type Product,
  type Service,
} from './data'
import { useStore } from './store'

const heroVideoUrl =
  'https://cdn.coverr.co/videos/coverr-little-girl-getting-her-hair-cut-1579/1080p.mp4'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

function formatMoney(value: number): string {
  return currencyFormatter.format(value)
}

function App() {
  const { cart, wishlist } = useStore()
  const location = useLocation()
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="site-shell">
      <Header cartCount={cartCount} wishlistCount={wishlist.length} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/category/:categorySlug" element={<CategoryPage />} />
          <Route path="/shop/product/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/confirmation" element={<CheckoutConfirmationPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/book/confirmation" element={<BookingConfirmationPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <MobileQuickActions activePath={location.pathname} cartCount={cartCount} />
    </div>
  )
}

function Header({
  cartCount,
  wishlistCount,
}: {
  cartCount: number
  wishlistCount: number
}) {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')

  function onSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = searchText.trim()
    if (!trimmed) {
      navigate('/shop')
      return
    }
    navigate(`/shop?query=${encodeURIComponent(trimmed)}`)
  }

  return (
    <header className="main-header">
      <div className="brand-line">
        <Link to="/" className="brand-link">
          <span className="brand-title">KeonaKay Kids</span>
          <span className="brand-tag">Luxury Kids Salon & Boutique</span>
        </Link>
        <form className="site-search" onSubmit={onSearchSubmit}>
          <input
            type="search"
            placeholder="Search products, services, brands..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <div className="utility-links">
          <NavLink to="/account">Account</NavLink>
          <NavLink to="/shop?wishlist=true">Wishlist ({wishlistCount})</NavLink>
          <NavLink to="/cart">Cart ({cartCount})</NavLink>
        </div>
      </div>
      <nav className="main-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
        <NavLink to="/reviews">Reviews</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/book" className="nav-cta">
          Book Appointment
        </NavLink>
      </nav>
    </header>
  )
}

function HomePage() {
  const { addToCart, toggleWishlist, wishlist } = useStore()
  const [newsletterStatus, setNewsletterStatus] = useState('idle')
  const featuredCategories = categories.slice(0, 8)
  const featuredProducts = products.slice(0, 8)
  const featuredServices = services.slice(0, 3)

  return (
    <div className="page home-page">
      <section className="hero-section">
        <video autoPlay loop muted playsInline className="hero-video" poster={galleryImages[0]}>
          <source src={heroVideoUrl} type="video/mp4" />
        </video>
        <div className="hero-overlay">
          <p className="eyebrow">Premium Care for Growing Curls</p>
          <h1>Luxury salon moments and trusted products for every child.</h1>
          <p>
            Discover refined hair care essentials and elegant service booking in one polished
            experience.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary">
              Shop Products
            </Link>
            <Link to="/book" className="btn btn-secondary">
              Book a Service
            </Link>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-title-row">
          <h2>Featured Categories</h2>
          <Link to="/shop" className="text-link">
            Explore all products
          </Link>
        </div>
        <div className="card-grid category-grid">
          {featuredCategories.map((category) => (
            <article key={category.slug} className="card category-card">
              <img src={category.image} alt={category.name} />
              <div className="card-body">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <Link to={`/shop/category/${category.slug}`} className="text-link">
                  Browse category
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section section-soft">
        <div className="section-title-row">
          <h2>Featured Products</h2>
          <Link to="/shop" className="text-link">
            View full collection
          </Link>
        </div>
        <div className="card-grid product-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              inWishlist={wishlist.includes(product.id)}
              onAddToCart={() => addToCart(product.id)}
              onToggleWishlist={() => toggleWishlist(product.id)}
            />
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-title-row">
          <h2>Services Preview</h2>
          <Link to="/services" className="text-link">
            View all services
          </Link>
        </div>
        <div className="card-grid service-grid">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="content-section trust-panel">
        <h2>Why Choose KeonaKay Kids</h2>
        <div className="trust-list">
          {trustPoints.map((point) => (
            <div key={point} className="trust-item">
              <p>{point}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-title-row">
          <h2>Parent Testimonials</h2>
          <Link to="/reviews" className="text-link">
            Read more reviews
          </Link>
        </div>
        <div className="card-grid testimonial-grid">
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className="card testimonial-card">
              <div className="review-score">{testimonial.rating.toFixed(1)} / 5</div>
              <p>"{testimonial.quote}"</p>
              <h3>{testimonial.parentName}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section section-soft">
        <div className="section-title-row">
          <h2>Gallery Showcase</h2>
          <Link to="/gallery" className="text-link">
            Open full gallery
          </Link>
        </div>
        <div className="gallery-grid">
          {galleryImages.slice(0, 6).map((image) => (
            <img key={image} src={image} alt="KeonaKay salon and product showcase" />
          ))}
        </div>
      </section>

      <section className="content-section newsletter-panel">
        <h2>Join Our Loyalty Circle</h2>
        <p>
          Subscribe for product launches, booking updates, promo codes, and premium parenting
          tips.
        </p>
        <form
          className="newsletter-form"
          onSubmit={(event) => {
            event.preventDefault()
            setNewsletterStatus('submitted')
          }}
        >
          <input type="email" required placeholder="Enter your email address" />
          <button type="submit" className="btn btn-primary">
            Subscribe
          </button>
        </form>
        {newsletterStatus === 'submitted' && (
          <p className="success-note">Thanks for subscribing. Welcome to KeonaKay Rewards.</p>
        )}
      </section>
    </div>
  )
}

function ProductCard({
  product,
  inWishlist,
  onAddToCart,
  onToggleWishlist,
}: {
  product: Product
  inWishlist: boolean
  onAddToCart: () => void
  onToggleWishlist: () => void
}) {
  return (
    <article className="card product-card">
      <img src={product.images[0]} alt={product.name} />
      <div className="card-body">
        <div className="card-topline">
          <p className="card-category">{product.categoryName}</p>
          {product.badge ? <span className="badge">{product.badge}</span> : null}
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p className="price-row">
          <strong>{formatMoney(product.price)}</strong>
          <span>Rating {product.rating.toFixed(1)}</span>
        </p>
        <div className="card-actions">
          <button type="button" className="btn btn-primary" onClick={onAddToCart}>
            Quick Add
          </button>
          <button type="button" className="btn btn-secondary" onClick={onToggleWishlist}>
            {inWishlist ? 'Saved' : 'Wishlist'}
          </button>
          <Link to={`/shop/product/${product.id}`} className="text-link">
            View details
          </Link>
        </div>
      </div>
    </article>
  )
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="card service-card">
      <div className="card-body">
        <h3>{service.name}</h3>
        <p>{service.description}</p>
        <ul className="meta-list">
          <li>Duration: {service.duration}</li>
          <li>Starting at: {formatMoney(service.startPrice)}</li>
        </ul>
        <div className="card-actions">
          <Link to={`/services/${service.id}`} className="btn btn-secondary">
            Learn More
          </Link>
          <Link to={`/book?service=${service.id}`} className="btn btn-primary">
            Book Now
          </Link>
        </div>
      </div>
    </article>
  )
}

function ShopPage() {
  const { addToCart, toggleWishlist, wishlist } = useStore()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('query') ?? '')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [maxPrice, setMaxPrice] = useState(80)
  const [availabilityOnly, setAvailabilityOnly] = useState(false)
  const [bestSellersOnly, setBestSellersOnly] = useState(false)
  const [minRating, setMinRating] = useState(0)
  const showWishlistOnly = searchParams.get('wishlist') === 'true'

  useEffect(() => {
    setQuery(searchParams.get('query') ?? '')
  }, [searchParams])

  const filteredProducts = useMemo(() => {
    const normalized = query.toLowerCase()
    const filtered = products.filter((product) => {
      const matchesQuery =
        normalized.length === 0 ||
        product.name.toLowerCase().includes(normalized) ||
        product.brand.toLowerCase().includes(normalized) ||
        product.categoryName.toLowerCase().includes(normalized)
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesPrice = product.price <= maxPrice
      const matchesAvailability = !availabilityOnly || product.stock > 0
      const matchesBestSeller = !bestSellersOnly || product.badge === 'Best Seller'
      const matchesRating = product.rating >= minRating
      const matchesWishlist = !showWishlistOnly || wishlist.includes(product.id)
      return (
        matchesQuery &&
        matchesCategory &&
        matchesPrice &&
        matchesAvailability &&
        matchesBestSeller &&
        matchesRating &&
        matchesWishlist
      )
    })

    if (sortBy === 'popular') {
      return filtered.toSorted((a, b) => b.reviewsCount - a.reviewsCount)
    }
    if (sortBy === 'newest') {
      return filtered.toSorted((a, b) => Number(Boolean(b.badge)) - Number(Boolean(a.badge)))
    }
    if (sortBy === 'price-asc') {
      return filtered.toSorted((a, b) => a.price - b.price)
    }
    if (sortBy === 'price-desc') {
      return filtered.toSorted((a, b) => b.price - a.price)
    }
    if (sortBy === 'rating') {
      return filtered.toSorted((a, b) => b.rating - a.rating)
    }
    return filtered
  }, [
    availabilityOnly,
    bestSellersOnly,
    maxPrice,
    minRating,
    query,
    selectedCategory,
    showWishlistOnly,
    sortBy,
    wishlist,
  ])

  return (
    <div className="page">
      <section className="content-section section-banner">
        <p className="eyebrow">E-Commerce Storefront</p>
        <h1>Shop premium kids hair and salon essentials</h1>
        <p>
          Search by product, brand, category, price range, rating, and best-seller status to find
          the right items quickly.
        </p>
      </section>

      <section className="content-section filter-panel">
        <div className="filter-grid">
          <label>
            Search
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Product name, service, or brand"
            />
          </label>
          <label>
            Category
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Sort by
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price low to high</option>
              <option value="price-desc">Price high to low</option>
              <option value="rating">Highest rated</option>
            </select>
          </label>
          <label>
            Max price ({formatMoney(maxPrice)})
            <input
              type="range"
              min={10}
              max={80}
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
            />
          </label>
          <label>
            Minimum rating
            <select value={minRating} onChange={(event) => setMinRating(Number(event.target.value))}>
              <option value={0}>Any rating</option>
              <option value={4}>4.0 and up</option>
              <option value={4.5}>4.5 and up</option>
              <option value={4.8}>4.8 and up</option>
            </select>
          </label>
          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={availabilityOnly}
              onChange={(event) => setAvailabilityOnly(event.target.checked)}
            />
            In stock only
          </label>
          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={bestSellersOnly}
              onChange={(event) => setBestSellersOnly(event.target.checked)}
            />
            Best sellers only
          </label>
        </div>
      </section>

      <section className="content-section">
        <div className="section-title-row">
          <h2>{showWishlistOnly ? 'Saved favorites' : 'Product listing'}</h2>
          <p>{filteredProducts.length} items</p>
        </div>
        <div className="card-grid product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              inWishlist={wishlist.includes(product.id)}
              onAddToCart={() => addToCart(product.id)}
              onToggleWishlist={() => toggleWishlist(product.id)}
            />
          ))}
        </div>
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <p>No products match these filters yet. Try expanding your search range.</p>
          </div>
        ) : null}
      </section>
    </div>
  )
}

function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>()
  const category = categories.find((item) => item.slug === categorySlug)
  const categoryProducts = products.filter((product) => product.category === categorySlug)
  const { addToCart, toggleWishlist, wishlist } = useStore()

  if (!category) {
    return (
      <div className="page content-section">
        <h1>Category not found</h1>
        <Link to="/shop" className="btn btn-primary">
          Back to shop
        </Link>
      </div>
    )
  }

  return (
    <div className="page">
      <section className="content-section section-banner">
        <p className="eyebrow">Category</p>
        <h1>{category.name}</h1>
        <p>{category.description}</p>
      </section>
      <section className="content-section">
        <div className="card-grid product-grid">
          {categoryProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              inWishlist={wishlist.includes(product.id)}
              onAddToCart={() => addToCart(product.id)}
              onToggleWishlist={() => toggleWishlist(product.id)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function ProductDetailPage() {
  const { addToCart, toggleWishlist, wishlist } = useStore()
  const navigate = useNavigate()
  const { productId } = useParams<{ productId: string }>()
  const product = products.find((item) => item.id === productId)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="page content-section">
        <h1>Product not found</h1>
        <Link to="/shop" className="btn btn-primary">
          Back to shop
        </Link>
      </div>
    )
  }

  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4)

  return (
    <div className="page">
      <section className="content-section detail-layout">
        <div className="detail-gallery">
          {product.images.map((image) => (
            <img key={image} src={image} alt={product.name} />
          ))}
        </div>
        <div className="detail-content">
          <p className="eyebrow">{product.categoryName}</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className="detail-meta">
            <p>
              <strong>{formatMoney(product.price)}</strong>
            </p>
            <p>Stock status: {product.stock > 0 ? 'In stock' : 'Out of stock'}</p>
            <p>Brand: {product.brand}</p>
            <p>Age suitability: {product.ageSuitability}</p>
            <p>Hair type: {product.hairType}</p>
            <p>Rating: {product.rating.toFixed(1)} / 5 ({product.reviewsCount} reviews)</p>
          </div>
          <div className="quantity-row">
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
            />
          </div>
          <div className="card-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => addToCart(product.id, quantity)}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                addToCart(product.id, quantity)
                navigate('/checkout')
              }}
            >
              Buy Now
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => toggleWishlist(product.id)}>
              {wishlist.includes(product.id) ? 'Saved in wishlist' : 'Add to wishlist'}
            </button>
          </div>
        </div>
      </section>

      <section className="content-section two-column">
        <article className="card">
          <div className="card-body">
            <h3>Ingredients / Materials</h3>
            <ul>
              {product.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </article>
        <article className="card">
          <div className="card-body">
            <h3>Usage Instructions</h3>
            <p>{product.usage}</p>
            <p>
              For best outcomes, pair with KeonaKay service consultations and recommended wash-day
              routines.
            </p>
          </div>
        </article>
      </section>

      <section className="content-section">
        <h2>Related products</h2>
        <div className="card-grid product-grid">
          {related.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              inWishlist={wishlist.includes(item.id)}
              onAddToCart={() => addToCart(item.id)}
              onToggleWishlist={() => toggleWishlist(item.id)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function CartPage() {
  const navigate = useNavigate()
  const { cart, updateCartQuantity, removeFromCart } = useStore()
  const [discountCode, setDiscountCode] = useState('')
  const [discountApplied, setDiscountApplied] = useState(false)
  const [codeMessage, setCodeMessage] = useState('')
  const lineItems = cart.map((item) => {
    const product = products.find((entry) => entry.id === item.productId)
    return { product, quantity: item.quantity }
  })

  const subtotal = lineItems.reduce((total, line) => {
    if (!line.product) {
      return total
    }
    return total + line.product.price * line.quantity
  }, 0)

  const discount = discountApplied ? subtotal * 0.1 : 0
  const deliveryFee = subtotal > 0 ? 8 : 0
  const total = subtotal + deliveryFee - discount

  function applyDiscount() {
    if (discountCode.trim().toUpperCase() === 'LUXE10') {
      setDiscountApplied(true)
      setCodeMessage('Discount code applied: 10% off.')
      return
    }
    setDiscountApplied(false)
    setCodeMessage('Code not valid. Use LUXE10 for this demo.')
  }

  return (
    <div className="page">
      <section className="content-section section-banner">
        <h1>Your cart</h1>
        <p>Review quantities, apply discount codes, and continue to secure checkout.</p>
      </section>

      <section className="content-section cart-layout">
        <div className="card">
          <div className="card-body">
            <h2>Items</h2>
            {lineItems.length === 0 ? (
              <p>Your cart is empty. Add products to continue shopping.</p>
            ) : (
              <ul className="cart-list">
                {lineItems.map((line) =>
                  line.product ? (
                    <li key={line.product.id} className="cart-item">
                      <img src={line.product.images[0]} alt={line.product.name} />
                      <div className="cart-item-info">
                        <h3>{line.product.name}</h3>
                        <p>{formatMoney(line.product.price)}</p>
                        <label>
                          Qty
                          <input
                            type="number"
                            min={1}
                            value={line.quantity}
                            onChange={(event) =>
                              updateCartQuantity(
                                line.product!.id,
                                Math.max(1, Number(event.target.value) || 1),
                              )
                            }
                          />
                        </label>
                        <button
                          type="button"
                          className="text-link text-button"
                          onClick={() => removeFromCart(line.product!.id)}
                        >
                          Remove item
                        </button>
                      </div>
                    </li>
                  ) : null,
                )}
              </ul>
            )}
          </div>
        </div>

        <aside className="card">
          <div className="card-body">
            <h2>Summary</h2>
            <label>
              Discount code
              <div className="inline-input-row">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(event) => setDiscountCode(event.target.value)}
                  placeholder="Enter code"
                />
                <button type="button" className="btn btn-secondary" onClick={applyDiscount}>
                  Apply
                </button>
              </div>
            </label>
            {codeMessage ? <p className="helper-note">{codeMessage}</p> : null}
            <dl className="summary-list">
              <div>
                <dt>Subtotal</dt>
                <dd>{formatMoney(subtotal)}</dd>
              </div>
              <div>
                <dt>Delivery fee</dt>
                <dd>{formatMoney(deliveryFee)}</dd>
              </div>
              <div>
                <dt>Discount</dt>
                <dd>-{formatMoney(discount)}</dd>
              </div>
              <div className="total-row">
                <dt>Total</dt>
                <dd>{formatMoney(total)}</dd>
              </div>
            </dl>
            <button
              type="button"
              className="btn btn-primary full-width"
              disabled={lineItems.length === 0}
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        </aside>
      </section>
    </div>
  )
}

function CheckoutPage() {
  const navigate = useNavigate()
  const { cart, clearCart, placeOrder } = useStore()
  const [checkoutMode, setCheckoutMode] = useState('guest')
  const [deliveryName, setDeliveryName] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0])

  const lineItems = cart.map((item) => {
    const product = products.find((entry) => entry.id === item.productId)
    return { product, quantity: item.quantity }
  })
  const subtotal = lineItems.reduce((total, line) => {
    if (!line.product) {
      return total
    }
    return total + line.product.price * line.quantity
  }, 0)
  const deliveryFee = subtotal > 0 ? 8 : 0
  const total = subtotal + deliveryFee

  if (lineItems.length === 0) {
    return (
      <div className="page content-section">
        <h1>Checkout</h1>
        <p>Your cart is empty. Add items before checkout.</p>
        <Link to="/shop" className="btn btn-primary">
          Continue shopping
        </Link>
      </div>
    )
  }

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const orderId = placeOrder({ total, contactEmail: email })
    clearCart()
    navigate(`/checkout/confirmation?order=${orderId}`)
  }

  return (
    <div className="page">
      <section className="content-section section-banner">
        <h1>Secure checkout</h1>
        <p>Guest and account checkout are both supported for convenience.</p>
      </section>
      <section className="content-section checkout-layout">
        <form className="card checkout-form" onSubmit={submitOrder}>
          <div className="card-body">
            <h2>Delivery & billing details</h2>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="checkout-mode"
                  checked={checkoutMode === 'guest'}
                  onChange={() => setCheckoutMode('guest')}
                />
                Guest checkout
              </label>
              <label>
                <input
                  type="radio"
                  name="checkout-mode"
                  checked={checkoutMode === 'account'}
                  onChange={() => setCheckoutMode('account')}
                />
                Account checkout
              </label>
            </div>
            <div className="form-grid">
              <label>
                Full name
                <input
                  required
                  value={deliveryName}
                  onChange={(event) => setDeliveryName(event.target.value)}
                />
              </label>
              <label>
                Phone number
                <input required value={phone} onChange={(event) => setPhone(event.target.value)} />
              </label>
              <label>
                Email
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              <label>
                Delivery address
                <input
                  required
                  value={deliveryAddress}
                  onChange={(event) => setDeliveryAddress(event.target.value)}
                />
              </label>
              <label>
                Billing address
                <input
                  required
                  value={billingAddress}
                  onChange={(event) => setBillingAddress(event.target.value)}
                />
              </label>
              <label>
                Payment method
                <select
                  value={paymentMethod}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                >
                  {paymentMethods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Place order
            </button>
            <p className="helper-note">
              Order confirmation will be sent to {email || 'your email'} and phone {phone || 'N/A'}.
            </p>
          </div>
        </form>

        <aside className="card">
          <div className="card-body">
            <h2>Order summary</h2>
            <ul className="summary-product-list">
              {lineItems.map((line) =>
                line.product ? (
                  <li key={line.product.id}>
                    <span>
                      {line.product.name} x {line.quantity}
                    </span>
                    <strong>{formatMoney(line.product.price * line.quantity)}</strong>
                  </li>
                ) : null,
              )}
            </ul>
            <dl className="summary-list">
              <div>
                <dt>Subtotal</dt>
                <dd>{formatMoney(subtotal)}</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>{formatMoney(deliveryFee)}</dd>
              </div>
              <div className="total-row">
                <dt>Total</dt>
                <dd>{formatMoney(total)}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>
    </div>
  )
}

function CheckoutConfirmationPage() {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('order')

  return (
    <div className="page content-section centered-panel">
      <h1>Order confirmed</h1>
      <p>Your purchase is complete and your confirmation has been sent.</p>
      <p className="confirmation-id">Confirmation number: {orderId ?? 'Pending assignment'}</p>
      <div className="card-actions">
        <Link to="/shop" className="btn btn-primary">
          Continue shopping
        </Link>
        <Link to="/account" className="btn btn-secondary">
          View account
        </Link>
      </div>
    </div>
  )
}

function ServicesPage() {
  return (
    <div className="page">
      <section className="content-section section-banner">
        <p className="eyebrow">Service Discovery</p>
        <h1>Salon services with premium child-first care</h1>
        <p>
          Explore every service, review durations and starting prices, then book in-salon, home
          service, or consultation appointments.
        </p>
      </section>
      <section className="content-section">
        <div className="card-grid service-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </div>
  )
}

function ServiceDetailPage() {
  const { serviceId } = useParams<{ serviceId: string }>()
  const service = services.find((item) => item.id === serviceId)

  if (!service) {
    return (
      <div className="page content-section">
        <h1>Service not found</h1>
        <Link to="/services" className="btn btn-primary">
          View services
        </Link>
      </div>
    )
  }

  return (
    <div className="page">
      <section className="content-section detail-layout">
        <div className="detail-content">
          <p className="eyebrow">Service detail</p>
          <h1>{service.name}</h1>
          <p>{service.description}</p>
          <div className="detail-meta">
            <p>Duration: {service.duration}</p>
            <p>Starting price: {formatMoney(service.startPrice)}</p>
          </div>
          <h3>Preparation notes</h3>
          <ul>
            {service.preparationNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <div className="card-actions">
            <Link to={`/book?service=${service.id}`} className="btn btn-primary">
              Book this service
            </Link>
            <Link to="/services" className="btn btn-secondary">
              Back to services
            </Link>
          </div>
        </div>
        <article className="card slot-panel">
          <div className="card-body">
            <h2>Available time slots</h2>
            <div className="slot-grid">
              {service.timeSlots.map((slot) => (
                <div key={slot} className="slot-chip">
                  {slot}
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>
    </div>
  )
}

function BookingPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { addBooking } = useStore()
  const initialServiceId = searchParams.get('service') ?? services[0].id
  const [serviceId, setServiceId] = useState(initialServiceId)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [appointmentType, setAppointmentType] = useState('In-salon')
  const [childName, setChildName] = useState('')
  const [childAge, setChildAge] = useState('')
  const [hairType, setHairType] = useState('')
  const [allergies, setAllergies] = useState('')
  const [notes, setNotes] = useState('')
  const [contactName, setContactName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const selectedService = services.find((item) => item.id === serviceId) ?? services[0]

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const bookingId = addBooking({
      serviceId,
      date,
      time,
      childName,
      appointmentType,
    })
    navigate(`/book/confirmation?booking=${bookingId}`)
  }

  return (
    <div className="page">
      <section className="content-section section-banner">
        <h1>Book appointment</h1>
        <p>Choose service, date, child profile details, and contact information.</p>
      </section>
      <section className="content-section">
        <form className="card booking-form" onSubmit={onSubmit}>
          <div className="card-body">
            <h2>Booking flow</h2>
            <div className="form-grid">
              <label>
                Service
                <select value={serviceId} onChange={(event) => setServiceId(event.target.value)}>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Date
                <input type="date" required value={date} onChange={(event) => setDate(event.target.value)} />
              </label>
              <label>
                Time slot
                <select value={time} onChange={(event) => setTime(event.target.value)} required>
                  <option value="">Select a slot</option>
                  {selectedService.timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Booking type
                <select
                  value={appointmentType}
                  onChange={(event) => setAppointmentType(event.target.value)}
                >
                  <option>In-salon</option>
                  <option>Home service</option>
                  <option>Consultation</option>
                </select>
              </label>
              <label>
                Child name
                <input required value={childName} onChange={(event) => setChildName(event.target.value)} />
              </label>
              <label>
                Child age
                <input required value={childAge} onChange={(event) => setChildAge(event.target.value)} />
              </label>
              <label>
                Hair type
                <input value={hairType} onChange={(event) => setHairType(event.target.value)} />
              </label>
              <label>
                Allergies / sensitivities
                <input value={allergies} onChange={(event) => setAllergies(event.target.value)} />
              </label>
              <label className="full-span">
                Special requests
                <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={3} />
              </label>
              <label>
                Parent/guardian name
                <input required value={contactName} onChange={(event) => setContactName(event.target.value)} />
              </label>
              <label>
                Phone number
                <input required value={phone} onChange={(event) => setPhone(event.target.value)} />
              </label>
              <label>
                Email
                <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Confirm appointment
            </button>
            <p className="helper-note">
              Confirmation will be sent immediately with date, time, and preparation details.
            </p>
          </div>
        </form>
      </section>
    </div>
  )
}

function BookingConfirmationPage() {
  const [searchParams] = useSearchParams()
  const bookingId = searchParams.get('booking')

  return (
    <div className="page content-section centered-panel">
      <h1>Booking confirmed</h1>
      <p>Appointment secured. A confirmation message has been sent to your contact details.</p>
      <p className="confirmation-id">Booking number: {bookingId ?? 'Pending assignment'}</p>
      <div className="card-actions">
        <Link to="/services" className="btn btn-secondary">
          Explore services
        </Link>
        <Link to="/account" className="btn btn-primary">
          View bookings
        </Link>
      </div>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="page">
      <section className="content-section section-banner">
        <h1>About KeonaKay Kids</h1>
        <p>
          We combine premium salon expertise with a nurturing child-centered environment so families
          feel confident every visit.
        </p>
      </section>
      <section className="content-section two-column">
        <article className="card">
          <div className="card-body">
            <h2>Our mission</h2>
            <p>
              Deliver elegant hair care experiences that are gentle, safe, and thoughtfully designed
              for children and parents.
            </p>
          </div>
        </article>
        <article className="card">
          <div className="card-body">
            <h2>Our values</h2>
            <ul>
              {trustPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </article>
      </section>
    </div>
  )
}

function GalleryPage() {
  return (
    <div className="page">
      <section className="content-section section-banner">
        <h1>Gallery</h1>
        <p>Explore finished styles, salon interiors, premium packaging, and happy family moments.</p>
      </section>
      <section className="content-section">
        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <img key={image} src={image} alt="KeonaKay gallery preview" />
          ))}
        </div>
      </section>
    </div>
  )
}

function ReviewsPage() {
  return (
    <div className="page">
      <section className="content-section section-banner">
        <h1>Parent reviews</h1>
        <p>Verified testimonials from families who shop and book with KeonaKay Kids.</p>
      </section>
      <section className="content-section">
        <div className="card-grid testimonial-grid">
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className="card testimonial-card">
              <div className="review-score">{testimonial.rating.toFixed(1)} / 5</div>
              <p>"{testimonial.quote}"</p>
              <h3>{testimonial.parentName}</h3>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <div className="page">
      <section className="content-section section-banner">
        <h1>Contact KeonaKay Kids</h1>
        <p>Reach support for orders, bookings, product guidance, and service recommendations.</p>
      </section>
      <section className="content-section two-column">
        <article className="card">
          <div className="card-body">
            <h2>Contact details</h2>
            <ul className="meta-list">
              <li>Phone: +1 555-0100</li>
              <li>Email: hello@keonakaykids.com</li>
              <li>Location: 22 Rose Avenue, Kids Beauty District</li>
              <li>Opening hours: Mon-Sat, 9:00 AM to 6:00 PM</li>
            </ul>
          </div>
        </article>
        <form
          className="card"
          onSubmit={(event) => {
            event.preventDefault()
            setSent(true)
          }}
        >
          <div className="card-body">
            <h2>Send a message</h2>
            <div className="form-grid">
              <label>
                Name
                <input required />
              </label>
              <label>
                Email
                <input required type="email" />
              </label>
              <label className="full-span">
                Message
                <textarea required rows={4} />
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit inquiry
            </button>
            {sent ? <p className="success-note">Thank you. Our team will respond shortly.</p> : null}
          </div>
        </form>
      </section>
    </div>
  )
}

function FaqPage() {
  return (
    <div className="page">
      <section className="content-section section-banner">
        <h1>Frequently asked questions</h1>
        <p>Helpful answers covering delivery, booking, products, and service policies.</p>
      </section>
      <section className="content-section">
        <div className="faq-list">
          {faqItems.map((item) => (
            <article key={item.id} className="card faq-item">
              <div className="card-body">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function AccountPage() {
  const { orders, bookings, wishlist } = useStore()
  const savedWishlistProducts = products.filter((product) => wishlist.includes(product.id))

  return (
    <div className="page">
      <section className="content-section section-banner">
        <h1>Account dashboard</h1>
        <p>Manage favorites, view order history, track bookings, and store child profile details.</p>
      </section>
      <section className="content-section dashboard-grid">
        <article className="card">
          <div className="card-body">
            <h2>Saved addresses</h2>
            <p>Home: 22 Rose Avenue, Kids Beauty District</p>
            <p>Billing: 15 Blossom Street, Family Estate</p>
          </div>
        </article>
        <article className="card">
          <div className="card-body">
            <h2>Child profile</h2>
            <ul className="meta-list">
              <li>Name: Amara</li>
              <li>Age: 7</li>
              <li>Hair type: 4A/4B</li>
              <li>Allergies: None listed</li>
              <li>Preferred style: Braids with beads</li>
            </ul>
          </div>
        </article>
        <article className="card">
          <div className="card-body">
            <h2>Order history ({orders.length})</h2>
            {orders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              <ul className="meta-list">
                {orders.map((order) => (
                  <li key={order.id}>
                    {order.id} - {formatMoney(order.total)} - {new Date(order.createdAt).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>
        <article className="card">
          <div className="card-body">
            <h2>Bookings ({bookings.length})</h2>
            {bookings.length === 0 ? (
              <p>No appointments booked yet.</p>
            ) : (
              <ul className="meta-list">
                {bookings.map((booking) => {
                  const service = services.find((entry) => entry.id === booking.serviceId)
                  return (
                    <li key={booking.id}>
                      {booking.id} - {service?.name ?? 'Service'} on {booking.date} at {booking.time}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </article>
      </section>

      <section className="content-section">
        <div className="section-title-row">
          <h2>Wishlist favorites ({savedWishlistProducts.length})</h2>
          <Link to="/shop?wishlist=true" className="text-link">
            Open wishlist in shop
          </Link>
        </div>
        <div className="card-grid product-grid">
          {savedWishlistProducts.map((product) => (
            <article key={product.id} className="card">
              <img src={product.images[0]} alt={product.name} />
              <div className="card-body">
                <h3>{product.name}</h3>
                <p>{formatMoney(product.price)}</p>
                <Link to={`/shop/product/${product.id}`} className="text-link">
                  View item
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function AdminPage() {
  return (
    <div className="page">
      <section className="content-section section-banner">
        <h1>Admin dashboard</h1>
        <p>Manage products, bookings, orders, inventory, promotions, and homepage content.</p>
      </section>
      <section className="content-section dashboard-grid">
        <MetricCard title="Products" value={products.length.toString()} detail="Catalog and stock control" />
        <MetricCard title="Services" value={services.length.toString()} detail="Service offerings and pricing" />
        <MetricCard title="Categories" value={categories.length.toString()} detail="Shop structure management" />
        <MetricCard title="Reviews" value={testimonials.length.toString()} detail="Verified feedback moderation" />
      </section>
      <section className="content-section two-column">
        <article className="card">
          <div className="card-body">
            <h2>Operations checklist</h2>
            <ul>
              <li>Add/edit products and media assets</li>
              <li>Manage stock levels and low inventory alerts</li>
              <li>Create promotions and loyalty offers</li>
              <li>Approve booking requests and appointment confirmations</li>
              <li>Track order pipeline and delivery status</li>
              <li>Handle customer messages and policy updates</li>
            </ul>
          </div>
        </article>
        <article className="card">
          <div className="card-body">
            <h2>Homepage content manager</h2>
            <ul className="meta-list">
              <li>Hero media rotation</li>
              <li>Featured products selection</li>
              <li>Service highlight modules</li>
              <li>Gallery updates</li>
              <li>Trust and policy banners</li>
            </ul>
          </div>
        </article>
      </section>
    </div>
  )
}

function MetricCard({ title, value, detail }: { title: string; value: string; detail: string }) {
  return (
    <article className="card metric-card">
      <div className="card-body">
        <p className="eyebrow">{title}</p>
        <h2>{value}</h2>
        <p>{detail}</p>
      </div>
    </article>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <h3>KeonaKay Kids</h3>
          <p>
            Luxury-first digital salon and boutique experience for product shopping and premium
            appointment booking.
          </p>
        </div>
        <div>
          <h3>Quick links</h3>
          <ul>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/book">Book Appointment</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Policies & trust</h3>
          <ul>
            <li>Secure payments</li>
            <li>Delivery policy</li>
            <li>Return and refund policy</li>
            <li>Service terms</li>
          </ul>
        </div>
        <div>
          <h3>Contact & hours</h3>
          <ul>
            <li>Mon-Sat: 9:00 AM - 6:00 PM</li>
            <li>22 Rose Avenue, Kids Beauty District</li>
            <li>+1 555-0100</li>
            <li>hello@keonakaykids.com</li>
          </ul>
        </div>
      </div>
      <p className="copyright">2026 KeonaKay Kids. All rights reserved.</p>
    </footer>
  )
}

function MobileQuickActions({ activePath, cartCount }: { activePath: string; cartCount: number }) {
  return (
    <div className="mobile-quick-bar">
      <Link to="/shop" className={activePath.startsWith('/shop') ? 'active' : ''}>
        Shop
      </Link>
      <Link to="/book" className={activePath.startsWith('/book') ? 'active' : ''}>
        Book
      </Link>
      <Link to="/cart" className={activePath.startsWith('/cart') ? 'active' : ''}>
        Cart ({cartCount})
      </Link>
      <Link to="/contact" className={activePath.startsWith('/contact') ? 'active' : ''}>
        Contact
      </Link>
    </div>
  )
}

export default App
