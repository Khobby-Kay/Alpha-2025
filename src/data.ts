export type ProductCategory = {
  slug: string
  name: string
  description: string
  image: string
}

export type Product = {
  id: string
  name: string
  category: string
  categoryName: string
  brand: string
  description: string
  price: number
  rating: number
  reviewsCount: number
  badge?: 'Best Seller' | 'New Arrival'
  stock: number
  ageSuitability: string
  hairType: string
  images: string[]
  ingredients: string[]
  usage: string
}

export type Service = {
  id: string
  name: string
  description: string
  duration: string
  startPrice: number
  preparationNotes: string[]
  timeSlots: string[]
}

export type Testimonial = {
  id: string
  parentName: string
  rating: number
  quote: string
}

export type FaqItem = {
  id: string
  question: string
  answer: string
}

export const categories: ProductCategory[] = [
  {
    slug: 'hair-cream',
    name: 'Hair Cream',
    description: 'Nourishing daily cream for soft, healthy curls.',
    image:
      'https://images.unsplash.com/photo-1596466596120-2a8e4b5b44f6?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'kids-shampoo',
    name: 'Kids Shampoo',
    description: 'Tear-free cleansing formula made for little ones.',
    image:
      'https://images.unsplash.com/photo-1629198709650-5dbcb2c1f185?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'conditioner',
    name: 'Conditioner',
    description: 'Hydrating conditioners for easier wash-day routines.',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'hair-moisturizer',
    name: 'Hair Moisturizer',
    description: 'Lock in moisture and reduce breakage with every use.',
    image:
      'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'hair-oil',
    name: 'Hair Oil',
    description: 'Gentle growth oils with scalp comfort in mind.',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'detangling-spray',
    name: 'Detangling Spray',
    description: 'Easy comb-through support for textured hair.',
    image:
      'https://images.unsplash.com/photo-1516822003754-cca485356ecb?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'brushes-and-combs',
    name: 'Brushes & Combs',
    description: 'Salon-selected tools for gentle styling sessions.',
    image:
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'satin-bonnets',
    name: 'Satin Bonnets',
    description: 'Soft nighttime protection for curls and braids.',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'accessories',
    name: 'Hair Accessories',
    description: 'Premium clips, bows, beads, and styling accents.',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'clippers-and-trimmers',
    name: 'Clippers & Trimmers',
    description: 'Reliable grooming tools for precision trims.',
    image:
      'https://images.unsplash.com/photo-1503951458645-643d53d1c5d3?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'salon-tools',
    name: 'Salon Tools',
    description: 'Professional essentials for home and studio care.',
    image:
      'https://images.unsplash.com/photo-1599387737838-bb7d6b9bfdb0?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'kids-styling-essentials',
    name: 'Kids Styling Essentials',
    description: 'Complete kits for school days and special occasions.',
    image:
      'https://images.unsplash.com/photo-1491349174775-aaafddd81942?auto=format&fit=crop&w=900&q=80',
  },
]

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Silk Curl Defining Cream',
    category: 'hair-cream',
    categoryName: 'Hair Cream',
    brand: 'KeonaKay Luxe',
    description:
      'A lightweight curl cream designed to define coils while preserving softness and movement.',
    price: 24,
    rating: 4.8,
    reviewsCount: 114,
    badge: 'Best Seller',
    stock: 32,
    ageSuitability: 'Ages 3+',
    hairType: 'Curly / Coily',
    images: [
      'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1491349174775-aaafddd81942?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Shea Butter', 'Jojoba Oil', 'Aloe Vera'],
    usage:
      'Apply to damp sections after wash day. Finger-coil or braid and air dry.',
  },
  {
    id: 'prod-002',
    name: 'Gentle Bubbles Kids Shampoo',
    category: 'kids-shampoo',
    categoryName: 'Kids Shampoo',
    brand: 'KeonaKay Care',
    description:
      'A tear-free cleanser with a mild floral scent and sulfate-free base for sensitive scalps.',
    price: 19,
    rating: 4.7,
    reviewsCount: 89,
    stock: 51,
    ageSuitability: 'Ages 2+',
    hairType: 'All Hair Types',
    images: [
      'https://images.unsplash.com/photo-1629198709650-5dbcb2c1f185?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Chamomile', 'Coconut Cleanser', 'Vitamin E'],
    usage: 'Massage into wet hair and rinse. Follow with conditioner.',
  },
  {
    id: 'prod-003',
    name: 'Hydra Melt Conditioner',
    category: 'conditioner',
    categoryName: 'Conditioner',
    brand: 'KeonaKay Care',
    description:
      'Moisture-rich conditioner that softens strands and improves detangling in minutes.',
    price: 21,
    rating: 4.6,
    reviewsCount: 76,
    stock: 43,
    ageSuitability: 'Ages 3+',
    hairType: 'Dry / Textured Hair',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516822003754-cca485356ecb?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Marshmallow Root', 'Avocado Oil', 'Rice Protein'],
    usage: 'Leave on for 3-5 minutes before rinsing.',
  },
  {
    id: 'prod-004',
    name: 'Daily Moisture Milk',
    category: 'hair-moisturizer',
    categoryName: 'Hair Moisturizer',
    brand: 'KeonaKay Luxe',
    description:
      'A daily moisturizer that refreshes curls, minimizes frizz, and keeps styles neat.',
    price: 18,
    rating: 4.5,
    reviewsCount: 59,
    badge: 'New Arrival',
    stock: 67,
    ageSuitability: 'Ages 3+',
    hairType: 'Curly / Wavy',
    images: [
      'https://images.unsplash.com/photo-1596466596120-2a8e4b5b44f6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Aloe Vera', 'Sweet Almond Oil', 'Panthenol'],
    usage: 'Apply lightly every morning or as needed to dry sections.',
  },
  {
    id: 'prod-005',
    name: 'Growth Guard Scalp Oil',
    category: 'hair-oil',
    categoryName: 'Hair Oil',
    brand: 'KeonaKay Botanics',
    description:
      'A nutrient-rich oil blend for scalp comfort, shine, and protective style support.',
    price: 22,
    rating: 4.9,
    reviewsCount: 137,
    badge: 'Best Seller',
    stock: 25,
    ageSuitability: 'Ages 4+',
    hairType: 'Braided / Protective Styles',
    images: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Rosemary', 'Castor Oil', 'Peppermint'],
    usage: 'Apply a few drops to scalp 2-3 times weekly.',
  },
  {
    id: 'prod-006',
    name: 'No-Tears Detangling Mist',
    category: 'detangling-spray',
    categoryName: 'Detangling Spray',
    brand: 'KeonaKay Care',
    description:
      'Slip-enhancing spray that helps reduce knots and breakage during comb-through.',
    price: 16,
    rating: 4.7,
    reviewsCount: 84,
    stock: 70,
    ageSuitability: 'Ages 2+',
    hairType: 'All Hair Types',
    images: [
      'https://images.unsplash.com/photo-1516822003754-cca485356ecb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Marula Oil', 'Aloe Juice', 'Glycerin'],
    usage: 'Spray section by section before detangling with wide-tooth comb.',
  },
  {
    id: 'prod-007',
    name: 'Cloud Soft Detangle Brush',
    category: 'brushes-and-combs',
    categoryName: 'Brushes & Combs',
    brand: 'KeonaKay Tools',
    description: 'Flexible bristles designed to glide through wet or dry textured hair.',
    price: 14,
    rating: 4.4,
    reviewsCount: 42,
    stock: 90,
    ageSuitability: 'Ages 3+',
    hairType: 'Curly / Coily',
    images: [
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1599387737838-bb7d6b9bfdb0?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['ABS Resin', 'Soft Nylon Bristles'],
    usage: 'Use on damp hair after applying detangling mist.',
  },
  {
    id: 'prod-008',
    name: 'Midnight Satin Bonnet',
    category: 'satin-bonnets',
    categoryName: 'Satin Bonnets',
    brand: 'KeonaKay Sleep',
    description: 'Double-lined satin bonnet that protects edges and keeps styles fresh.',
    price: 17,
    rating: 4.8,
    reviewsCount: 120,
    stock: 38,
    ageSuitability: 'Ages 4+',
    hairType: 'Braids / Twists / Natural',
    images: [
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1491349174775-aaafddd81942?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Premium Satin', 'Soft Elastic Band'],
    usage: 'Wear nightly over twists, braids, or stretch styles.',
  },
  {
    id: 'prod-009',
    name: 'Princess Bow Accessory Set',
    category: 'accessories',
    categoryName: 'Hair Accessories',
    brand: 'KeonaKay Kids',
    description: 'A curated set of rose, blush, and cream bows for elevated styling.',
    price: 20,
    rating: 4.5,
    reviewsCount: 44,
    badge: 'New Arrival',
    stock: 47,
    ageSuitability: 'Ages 2+',
    hairType: 'All Hair Types',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1491349174775-aaafddd81942?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Fabric Bow', 'Nickel-Free Clips'],
    usage: 'Use as finishing touches for daily or occasion styles.',
  },
  {
    id: 'prod-010',
    name: 'Mini Precision Trimmer',
    category: 'clippers-and-trimmers',
    categoryName: 'Clippers & Trimmers',
    brand: 'KeonaKay Tools',
    description:
      'Quiet, low-vibration trimmer for edge shaping and kid-friendly grooming sessions.',
    price: 48,
    rating: 4.3,
    reviewsCount: 31,
    stock: 14,
    ageSuitability: 'Parent Use',
    hairType: 'All Hair Types',
    images: [
      'https://images.unsplash.com/photo-1503951458645-643d53d1c5d3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1599387737838-bb7d6b9bfdb0?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Ceramic Blade', 'Rechargeable Battery'],
    usage: 'For parent or stylist use on clean, dry hair.',
  },
  {
    id: 'prod-011',
    name: 'Salon Essentials Tool Kit',
    category: 'salon-tools',
    categoryName: 'Salon Tools',
    brand: 'KeonaKay Pro',
    description:
      'All-in-one kit featuring clips, combs, sectioning tools, and cleaning accessories.',
    price: 56,
    rating: 4.6,
    reviewsCount: 64,
    stock: 20,
    ageSuitability: 'Parent Use',
    hairType: 'All Hair Types',
    images: [
      'https://images.unsplash.com/photo-1599387737838-bb7d6b9bfdb0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Stainless Steel', 'Heat Resistant Silicone'],
    usage: 'Ideal for weekly hair care sessions at home.',
  },
  {
    id: 'prod-012',
    name: 'School Day Styling Starter Kit',
    category: 'kids-styling-essentials',
    categoryName: 'Kids Styling Essentials',
    brand: 'KeonaKay Kids',
    description:
      'A ready-to-use bundle with edge gel, mini brush, mist spray, and satin scrunchies.',
    price: 34,
    rating: 4.8,
    reviewsCount: 71,
    badge: 'Best Seller',
    stock: 36,
    ageSuitability: 'Ages 4+',
    hairType: 'Curly / Coily / Wavy',
    images: [
      'https://images.unsplash.com/photo-1491349174775-aaafddd81942?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Edge Gel', 'Detangling Spray', 'Satin Set'],
    usage: 'Use each item as part of a daily styling routine.',
  },
]

export const services: Service[] = [
  {
    id: 'svc-001',
    name: 'Kids Hair Washing',
    description:
      'A soothing cleanse and conditioning treatment with age-appropriate products.',
    duration: '35 minutes',
    startPrice: 25,
    preparationNotes: [
      'Arrive 10 minutes early for consultation.',
      'Bring allergy notes if your child has sensitivities.',
    ],
    timeSlots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:30 PM'],
  },
  {
    id: 'svc-002',
    name: 'Signature Braiding',
    description:
      'Protective braiding styles with premium sectioning and child comfort breaks.',
    duration: '90 minutes',
    startPrice: 65,
    preparationNotes: [
      'Hair should be freshly washed or add wash service.',
      'Bring preferred bead colors if available.',
    ],
    timeSlots: ['10:00 AM', '12:30 PM', '2:30 PM'],
  },
  {
    id: 'svc-003',
    name: 'Hair Treatment Therapy',
    description:
      'Scalp and moisture treatment for dry or stressed hair with gentle steam therapy.',
    duration: '55 minutes',
    startPrice: 48,
    preparationNotes: [
      'Avoid heavy styling products before arrival.',
      'Discuss known scalp sensitivities with stylist.',
    ],
    timeSlots: ['9:30 AM', '12:00 PM', '2:00 PM', '4:00 PM'],
  },
  {
    id: 'svc-004',
    name: 'Special Occasion Styling',
    description:
      'Elegant event styling for birthdays, photoshoots, weddings, and celebrations.',
    duration: '75 minutes',
    startPrice: 72,
    preparationNotes: [
      'Share outfit colors for coordinated accessories.',
      'Book at least 48 hours before event date.',
    ],
    timeSlots: ['9:00 AM', '11:30 AM', '1:30 PM'],
  },
  {
    id: 'svc-005',
    name: 'Salon Consultation',
    description:
      'A one-on-one care consultation with style planning and product recommendations.',
    duration: '25 minutes',
    startPrice: 20,
    preparationNotes: [
      'Bring current hair care products list.',
      'Bring photos of preferred style ideas.',
    ],
    timeSlots: ['10:30 AM', '1:00 PM', '4:30 PM'],
  },
]

export const trustPoints = [
  'Luxury salon experience built for families',
  'Child-safe products with ingredient transparency',
  'Experienced stylists trained for textured kids hair',
  'Clean, sanitized, and welcoming salon environment',
  'Premium customer support across shopping and services',
]

export const testimonials: Testimonial[] = [
  {
    id: 'rev-001',
    parentName: 'Amina R.',
    rating: 5,
    quote:
      'Every visit feels calm and professional. My daughter loves the stylists and the products.',
  },
  {
    id: 'rev-002',
    parentName: 'Claire M.',
    rating: 5,
    quote:
      'The service quality is exceptional. Booking is smooth, and the results last beautifully.',
  },
  {
    id: 'rev-003',
    parentName: 'Jasmine K.',
    rating: 4,
    quote:
      'The website makes it easy to shop and rebook. The salon atmosphere is clean and elegant.',
  },
]

export const galleryImages = [
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1596466596120-2a8e4b5b44f6?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1491349174775-aaafddd81942?auto=format&fit=crop&w=900&q=80',
]

export const paymentMethods = [
  'Mobile Money',
  'Card Payment',
  'Online Transfer',
  'Cash on Delivery',
]

export const faqItems: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Are your products suitable for sensitive scalps?',
    answer:
      'Yes. We prioritize gentle ingredients and list all key ingredients on product pages.',
  },
  {
    id: 'faq-2',
    question: 'Can I book both salon and home service appointments?',
    answer:
      'Yes. During booking you can choose in-salon, home service, or consultation sessions.',
  },
  {
    id: 'faq-3',
    question: 'Do you support guest checkout?',
    answer:
      'Yes. You can checkout as a guest or sign in to save your details for faster reorders.',
  },
  {
    id: 'faq-4',
    question: 'How do I track my order?',
    answer:
      'Order confirmation includes a reference number. Signed-in users can track status in Account.',
  },
]

