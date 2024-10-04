import { Category, Product } from "@/types/type";

// Định nghĩa categories
export const categories: Category[] = [
  {
    id: 1,
    name: "Home Decor",
    slug: "home-decor",
    description: "Decorative items for your home",
    level: 0,
    isActive: true,
    children: [
      {
        id: 2,
        name: "Wall Decor",
        slug: "wall-decor",
        parentId: 1,
        level: 1,
        isActive: true,
      },
      {
        id: 3,
        name: "Table Decor",
        slug: "table-decor",
        parentId: 1,
        level: 1,
        isActive: true,
      },
    ],
  },
  {
    id: 4,
    name: "Lighting",
    slug: "lighting",
    description: "Decorative lighting solutions",
    level: 0,
    isActive: true,
    children: [
      {
        id: 5,
        name: "Table Lamps",
        slug: "table-lamps",
        parentId: 4,
        level: 1,
        isActive: true,
      },
    ],
  },
  {
    id: 7,
    name: "Furniture",
    slug: "furniture",
    description: "Furniture items for your home",
    level: 0,
    isActive: true,
    children: [
      {
        id: 8,
        name: "Sofas",
        slug: "sofas",
        parentId: 7,
        level: 1,
        isActive: true,
      },
      {
        id: 9,
        name: "Coffee Tables",
        slug: "coffee-tables",
        parentId: 7,
        level: 1,
        isActive: true,
      },
    ],
  },
  {
    id: 10,
    name: "Rugs",
    slug: "rugs",
    description: "Decorative rugs for home interiors",
    level: 0,
    isActive: true,
    children: [
      {
        id: 11,
        name: "Living Room Rugs",
        slug: "living-room-rugs",
        parentId: 10,
        level: 1,
        isActive: true,
      },
      {
        id: 12,
        name: "Bedroom Rugs",
        slug: "bedroom-rugs",
        parentId: 10,
        level: 1,
        isActive: true,
      },
    ],
  },
  {
    id: 13,
    name: "Outdoor Decor",
    slug: "outdoor-decor",
    description: "Decorative items for outdoor spaces",
    level: 0,
    isActive: true,
    children: [
      {
        id: 14,
        name: "Garden Decor",
        slug: "garden-decor",
        parentId: 13,
        level: 1,
        isActive: true,
      },
      {
        id: 15,
        name: "Patio Furniture",
        slug: "patio-furniture",
        parentId: 13,
        level: 1,
        isActive: true,
      },
    ],
  },
  {
    id: 16,
    name: "Mirrors",
    slug: "mirrors",
    description: "Decorative mirrors for all spaces",
    level: 0,
    isActive: true,
    children: [
      {
        id: 17,
        name: "Wall Mirrors",
        slug: "wall-mirrors",
        parentId: 16,
        level: 1,
        isActive: true,
      },
      {
        id: 18,
        name: "Standing Mirrors",
        slug: "standing-mirrors",
        parentId: 16,
        level: 1,
        isActive: true,
      },
    ],
  },
  {
    id: 19,
    name: "Curtains",
    slug: "curtains",
    description: "Decorative curtains for windows",
    level: 0,
    isActive: true,
    children: [
      {
        id: 20,
        name: "Living Room Curtains",
        slug: "living-room-curtains",
        parentId: 19,
        level: 1,
        isActive: true,
      },
      {
        id: 21,
        name: "Bedroom Curtains",
        slug: "bedroom-curtains",
        parentId: 19,
        level: 1,
        isActive: true,
      },
    ],
  },
  {
    id: 22,
    name: "Vases",
    slug: "vases",
    description: "Decorative vases for flowers and more",
    level: 0,
    isActive: true,
    children: [
      {
        id: 23,
        name: "Glass Vases",
        slug: "glass-vases",
        parentId: 22,
        level: 1,
        isActive: true,
      },
      {
        id: 24,
        name: "Ceramic Vases",
        slug: "ceramic-vases",
        parentId: 22,
        level: 1,
        isActive: true,
      },
    ],
  },
  {
    id: 25,
    name: "Living Room",
    slug: "living-room",
    description: "Items for your living room",
    level: 0,
    isActive: true,
    children: [
      {
        id: 26,
        name: "Sofas",
        slug: "sofas",
        parentId: 1,
        level: 1,
        isActive: true,
      },
      {
        id: 27,
        name: "Coffee Tables",
        slug: "coffee-tables",
        parentId: 1,
        level: 1,
        isActive: true,
      },
      {
        id: 28,
        name: "Curtains",
        slug: "curtains",
        parentId: 1,
        level: 1,
        isActive: true,
      },
    ],
  },
  {
    id: 29,
    name: "Bedroom",
    slug: "bedroom",
    description: "Items for your bedroom",
    level: 0,
    isActive: true,
    children: [
      {
        id: 30,
        name: "Beds",
        slug: "beds",
        parentId: 5,
        level: 1,
        isActive: true,
      },
      {
        id: 30,
        name: "Wardrobes",
        slug: "wardrobes",
        parentId: 5,
        level: 1,
        isActive: true,
      },
      {
        id: 30,
        name: "Bedroom Lamps",
        slug: "bedroom-lamps",
        parentId: 5,
        level: 1,
        isActive: true,
      },
    ],
  },
  {
    id: 33,
    name: "Kitchen",
    slug: "kitchen",
    description: "Items for your kitchen",
    level: 0,
    isActive: true,
    children: [
      {
        id: 34,
        name: "Dining Tables",
        slug: "dining-tables",
        parentId: 9,
        level: 1,
        isActive: true,
      },
      {
        id: 35,
        name: "Chairs",
        slug: "chairs",
        parentId: 9,
        level: 1,
        isActive: true,
      },
      {
        id: 36,
        name: "Cutlery",
        slug: "cutlery",
        parentId: 9,
        level: 1,
        isActive: true,
      },
    ],
  },
  {
    id: 37,
    name: "Bathroom",
    slug: "bathroom",
    description: "Items for your bathroom",
    level: 0,
    isActive: true,
    children: [
      {
        id: 38,
        name: "Bathroom Mirrors",
        slug: "bathroom-mirrors",
        parentId: 13,
        level: 1,
        isActive: true,
      },
      {
        id: 39,
        name: "Towel Racks",
        slug: "towel-racks",
        parentId: 13,
        level: 1,
        isActive: true,
      },
      {
        id: 40,
        name: "Shower Curtains",
        slug: "shower-curtains",
        parentId: 13,
        level: 1,
        isActive: true,
      },
    ],
  },
  {
    id: 41,
    name: "Outdoor",
    slug: "outdoor",
    description: "Items for your outdoor spaces",
    level: 0,
    isActive: true,
    children: [
      {
        id: 42,
        name: "Patio Furniture",
        slug: "patio-furniture",
        parentId: 17,
        level: 1,
        isActive: true,
      },
      {
        id: 43,
        name: "Garden Decor",
        slug: "garden-decor",
        parentId: 17,
        level: 1,
        isActive: true,
      },
      {
        id: 44,
        name: "Outdoor Lighting",
        slug: "outdoor-lighting",
        parentId: 17,
        level: 1,
        isActive: true,
      },
    ],
  },
];

// 5 sản phẩm tiếp theo
export const products: Product[] = [
  {
    id: 1,
    name: "Modern Geometric Wall Mirror",
    description:
      "Elegant hexagonal mirror with gold frame, perfect for adding depth and style to any room. The modern geometric design complements both contemporary and classic interiors.",
    price: 129.99,
    originalPrice: 159.99,
    discount: 50,
    discountExpiry: new Date("2024-12-31"),
    isNew: true,
    rating: 4.5,
    reviewCount: 28,
    measurements: '24"W x 28"H x 1"D',
    sku: "WM-HEX-001",
    categories: [
      categories[0],
      categories[0].children![0], // Wall Decor
    ],
    colors: [
      {
        id: 1,
        colorName: "Gold Frame",
        colorCode: "#FFD700",
        quantity: 25,
        images: [
          {
            id: 1,
            url: "https://th.bing.com/th/id/OIP.m8BxsX3l6jD8kLootpMJTgHaIJ?rs=1&pid=ImgDetMain",
            isDefault: true,
            alt: "Gold framed geometric mirror - front view",
          },
          {
            id: 2,
            url: "https://cdn.decorpad.com/photos/2016/06/19/geometric-gold-framed-wall-mirror.jpeg",
            isDefault: false,
            alt: "Gold framed geometric mirror - angle view",
          },
        ],
      },
      {
        id: 2,
        colorName: "Silver Frame",
        colorCode: "#C0C0C0",
        quantity: 15,
        images: [
          {
            id: 3,
            url: "https://th.bing.com/th/id/R.fbde947e8e83b8c93bca90499f15db56?rik=SlGiKZEgRlHKPA&pid=ImgRaw&r=0",
            isDefault: true,
            alt: "Silver framed geometric mirror - front view",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Ceramic Vase Set",
    description:
      "Set of 3 handcrafted ceramic vases in varying heights. Perfect for displaying artificial or fresh flowers. Each piece features a unique textured design.",
    price: 89.99,
    originalPrice: 110.0,
    discount: 18,
    isNew: true,
    rating: 4.8,
    reviewCount: 45,
    measurements: 'Small: 4"x8", Medium: 5"x10", Large: 6"x12"',
    sku: "VS-CER-003",
    categories: [
      categories[0],
      categories[0].children![1], // Table Decor
    ],
    colors: [
      {
        id: 3,
        colorName: "Ivory White",
        colorCode: "#FFFFF0",
        quantity: 30,
        images: [
          {
            id: 4,
            url: "https://th.bing.com/th/id/OIP.mkxN5BFW-1whAaTEk8-QPwHaHa?rs=1&pid=ImgDetMain",
            isDefault: true,
            alt: "White ceramic vase set",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Macramé Wall Hanging",
    description:
      "Handwoven macramé wall hanging made from 100% cotton rope. Features an intricate bohemian design that adds texture and warmth to any wall.",
    price: 59.99,
    isNew: false,
    rating: 4.6,
    reviewCount: 32,
    measurements: '24"W x 36"H',
    sku: "WH-MAC-002",
    categories: [
      categories[0],
      categories[0].children![0], // Wall Decor
    ],
    colors: [
      {
        id: 4,
        colorName: "Natural",
        colorCode: "#F5F5DC",
        quantity: 20,
        images: [
          {
            id: 5,
            url: "https://th.bing.com/th/id/OIP.SViQHVqgaFFY0JW_5jmczQHaHa?rs=1&pid=ImgDetMain",
            isDefault: true,
            alt: "Natural macramé wall hanging",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Decorative Table Candle Holder",
    description:
      "Modern geometric metal candle holder with glass hurricane. Perfect centerpiece for dining tables or side tables. Holds standard pillar candles.",
    price: 45.99,
    originalPrice: 55.99,
    discount: 18,
    isNew: false,
    rating: 4.3,
    reviewCount: 19,
    measurements: '6"W x 12"H x 6"D',
    sku: "CH-GEO-004",
    categories: [
      categories[0],
      categories[0].children![1], // Table Decor
    ],
    colors: [
      {
        id: 5,
        colorName: "Matte Black",
        colorCode: "#292929",
        quantity: 40,
        images: [
          {
            id: 6,
            url: "https://th.bing.com/th/id/OIP.mfpG-8jNO4fF70jlEYDgYgHaHa?rs=1&pid=ImgDetMain",
            isDefault: true,
            alt: "Black geometric candle holder",
          },
        ],
      },
      {
        id: 6,
        colorName: "Brushed Gold",
        colorCode: "#D4AF37",
        quantity: 25,
        images: [
          {
            id: 7,
            url: "https://th.bing.com/th/id/OIP.xS7mA8SmAI9mPCI1Jk4OfgHaHa?w=1000&h=1000&rs=1&pid=ImgDetMain",
            isDefault: true,
            alt: "Gold geometric candle holder",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Abstract Wall Art Set",
    description:
      "Set of 3 coordinating abstract prints in modern earth tones. Printed on high-quality canvas and stretched over wooden frames.",
    price: 159.99,
    originalPrice: 199.99,
    discount: 20,
    discountExpiry: new Date("2024-11-30"),
    isNew: true,
    rating: 4.7,
    reviewCount: 23,
    measurements: 'Each piece: 16"x20"',
    sku: "WA-ABS-005",
    categories: [
      categories[0],
      categories[0].children![0], // Wall Decor
    ],
    colors: [
      {
        id: 7,
        colorName: "Earth Tones",
        colorCode: "#8B7355",
        quantity: 15,
        images: [
          {
            id: 8,
            url: "https://th.bing.com/th/id/OIP.s_-lhPrsUNXYKh9_yMot7wHaHa?w=640&h=640&rs=1&pid=ImgDetMain",
            isDefault: true,
            alt: "Abstract wall art set - earth tones",
          },
          {
            id: 9,
            url: "https://th.bing.com/th/id/R.4d5a0182b323e3aeab8156b4c2dce466?rik=2iPpXBZZRyBJmQ&pid=ImgRaw&r=0",
            isDefault: false,
            alt: "Abstract wall art set - individual pieces",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Minimalist Floating Shelves Set",
    description:
      "Set of 3 wooden floating shelves with hidden brackets. Perfect for displaying small decor items, photos, or plants. Made from solid oak with a modern finish.",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    discountExpiry: new Date("2024-12-15"),
    isNew: true,
    rating: 4.6,
    reviewCount: 34,
    measurements: 'Small: 12"L, Medium: 16"L, Large: 20"L x 6"D',
    sku: "FS-OAK-006",
    categories: [
      categories[0],
      categories[0].children![0], // Wall Decor
    ],
    colors: [
      {
        id: 8,
        colorName: "Natural Oak",
        colorCode: "#DEB887",
        quantity: 25,
        images: [
          {
            id: 10,
            url: "https://th.bing.com/th/id/OIP.dHDVKzuckYlwzoPm45MWIwHaHa?rs=1&pid=ImgDetMain",
            isDefault: true,
            alt: "Natural oak floating shelves",
          },
          {
            id: 11,
            url: "https://i.pinimg.com/originals/ed/07/66/ed07662d935bc3d29c182187bf1abbbf.jpg",
            isDefault: false,
            alt: "Natural oak floating shelves - styled",
          },
        ],
      },
      {
        id: 9,
        colorName: "Walnut",
        colorCode: "#654321",
        quantity: 20,
        images: [
          {
            id: 12,
            url: "https://th.bing.com/th/id/OIP.qBAXvgoaRkx5Xah-5iY0VwHaHa?w=1024&h=1024&rs=1&pid=ImgDetMain",
            isDefault: true,
            alt: "Walnut floating shelves",
          },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Decorative Glass Terrarium",
    description:
      "Geometric glass terrarium with gold-finished edges. Perfect for succulents, air plants, or as a decorative centerpiece. Includes drainage tray.",
    price: 49.99,
    originalPrice: 65.99,
    discount: 24,
    isNew: false,
    rating: 4.8,
    reviewCount: 56,
    measurements: '8"W x 8"D x 10"H',
    sku: "GT-GEO-007",
    categories: [
      categories[0],
      categories[0].children![1], // Table Decor
    ],
    colors: [
      {
        id: 10,
        colorName: "Gold Frame",
        colorCode: "#FFD700",
        quantity: 30,
        images: [
          {
            id: 13,
            url: "https://th.bing.com/th/id/OIP.4OcYz4E9-GDF0VS4af5hmgHaHa?rs=1&pid=ImgDetMain",
            isDefault: true,
            alt: "Gold geometric terrarium",
          },
          {
            id: 14,
            url: "https://i.pinimg.com/originals/4d/1e/0d/4d1e0dc8c57e2dfbcc9bf7446ed264e3.jpg",
            isDefault: false,
            alt: "Gold geometric terrarium with plants",
          },
        ],
      },
      {
        id: 11,
        colorName: "Copper Frame",
        colorCode: "#B87333",
        quantity: 15,
        images: [
          {
            id: 15,
            url: "https://i.pinimg.com/736x/99/a4/cd/99a4cd91cfdabf44472d64763c7e23d7.jpg",
            isDefault: true,
            alt: "Copper geometric terrarium",
          },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Ceramic Table Lamp",
    description:
      "Modern ceramic table lamp with textured base and linen shade. Features touch dimming and USB charging port. Perfect for bedside tables or living room.",
    price: 129.99,
    isNew: true,
    rating: 4.7,
    reviewCount: 42,
    measurements: '12"D x 22"H',
    sku: "TL-CER-008",
    categories: [
      categories[1], // Lighting
      categories[1].children![0], // Table Lamps
    ],
    colors: [
      {
        id: 12,
        colorName: "Sage Green",
        colorCode: "#9CAF88",
        quantity: 20,
        images: [
          {
            id: 16,
            url: "https://th.bing.com/th/id/OIP.v4Z6NwdwW4LKogv92lXJ3gHaHa?rs=1&pid=ImgDetMain",
            isDefault: true,
            alt: "Sage green ceramic table lamp",
          },
        ],
      },
      {
        id: 13,
        colorName: "Dusty Rose",
        colorCode: "#DCAE96",
        quantity: 15,
        images: [
          {
            id: 17,
            url: "https://th.bing.com/th/id/OIP.C-o6_Rpr3UckLtIdF9fPMQAAAA?w=376&h=376&rs=1&pid=ImgDetMain",
            isDefault: true,
            alt: "Dusty rose ceramic table lamp",
          },
        ],
      },
    ],
  },
  {
    id: 9,
    name: "Woven Wall Basket Set",
    description:
      "Set of 3 handwoven seagrass wall baskets in varying sizes. Each basket features unique patterns and can be hung individually or as a group.",
    price: 89.99,
    originalPrice: 110.0,
    discount: 18,
    discountExpiry: new Date("2024-11-30"),
    isNew: false,
    rating: 4.5,
    reviewCount: 29,
    measurements: 'Small: 12", Medium: 16", Large: 20" diameter',
    sku: "WB-SEA-009",
    categories: [
      categories[0],
      categories[0].children![0], // Wall Decor
    ],
    colors: [
      {
        id: 14,
        colorName: "Natural",
        colorCode: "#DEB887",
        quantity: 25,
        images: [
          {
            id: 18,
            url: "https://th.bing.com/th/id/OIP.APbpuGHSnzKUke9I1nTufgHaF7?rs=1&pid=ImgDetMain",
            isDefault: true,
            alt: "Natural seagrass wall baskets",
          },
          {
            id: 19,
            url: "https://th.bing.com/th/id/OIP.ztrO4QyJmId0_-DM3tugggHaGq?w=1000&h=900&rs=1&pid=ImgDetMain",
            isDefault: false,
            alt: "Natural seagrass wall baskets - arranged",
          },
        ],
      },
    ],
  },
  {
    id: 10,
    name: "Modern Hourglass Sand Timer",
    description:
      "Decorative hourglass with metal frame and colored sand. 30-minute timer makes it both functional and aesthetically pleasing. Perfect for desk or shelf decor.",
    price: 39.99,
    originalPrice: 45.99,
    discount: 13,
    isNew: true,
    rating: 4.4,
    reviewCount: 18,
    measurements: '4"D x 8"H',
    sku: "HG-MOD-010",
    categories: [
      categories[0],
      categories[0].children![1], // Table Decor
    ],
    colors: [
      {
        id: 15,
        colorName: "Rose Gold/Pink Sand",
        colorCode: "#B76E79",
        quantity: 30,
        images: [
          {
            id: 20,
            url: "https://th.bing.com/th/id/OIP.I7R7xUZ5Nhz5GwD7ZuYRXwHaIt?rs=1&pid=ImgDetMain",
            isDefault: true,
            alt: "Rose gold hourglass with pink sand",
          },
        ],
      },
      {
        id: 16,
        colorName: "Black/White Sand",
        colorCode: "#000000",
        quantity: 25,
        images: [
          {
            id: 21,
            url: "https://i.pinimg.com/originals/a0/a7/8b/a0a78b0f45e711d24c0d1b172c693a19.jpg",
            isDefault: true,
            alt: "Black hourglass with white sand",
          },
        ],
      },
    ],
  },
  {
    id: 11,
    name: "Rustic Wooden Coffee Table",
    description:
      "Handcrafted rustic coffee table made from reclaimed wood, featuring a sturdy design perfect for living room or outdoor spaces. Its natural wood grain adds a touch of charm and authenticity to any home.",
    price: 249.99,
    originalPrice: 299.99,
    discount: 17,
    discountExpiry: new Date("2024-11-15"),
    isNew: false,
    rating: 4.8,
    reviewCount: 45,
    measurements: '48"L x 24"W x 18"H',
    sku: "CT-WOOD-002",
    categories: [
      categories[2], // Furniture
      categories[2].children![1], // Coffee Tables
    ],
    colors: [
      {
        id: 16,
        colorName: "Natural Wood",
        colorCode: "#8B4513",
        quantity: 10,
        images: [
          {
            id: 22,
            url: "https://th.bing.com/th/id/R.1440de9ca221e28ee2fdcea3e2a49c0b?rik=hwknGTisA8JS3w&riu=http%3a%2f%2fcdn.home-designing.com%2fwp-content%2fuploads%2f2019%2f09%2fLarge-Rustic-X-Coffee-Table-Black-Legs-Thick-Wood-Top.jpg&ehk=7YnfwJ0cR8h0MBYfwHcTF2dPJ%2b1krh523hi6ajau55o%3d&risl=&pid=ImgRaw&r=0",
            isDefault: true,
            alt: "Rustic wooden coffee table - front view",
          },
          {
            id: 23,
            url: "https://th.bing.com/th/id/OIP.8TafbphfVzknwcAo-QUWugHaHa?w=1080&h=1080&rs=1&pid=ImgDetMain",
            isDefault: false,
            alt: "Rustic wooden coffee table - side view",
          },
        ],
      },
      {
        id: 17,
        colorName: "Dark Wood",
        colorCode: "#654321",
        quantity: 8,
        images: [
          {
            id: 24,
            url: "https://secure.img1-fg.wfcdn.com/im/83803315/resize-h600-w600%5Ecompr-r85/1496/149698625/Natural+Coffee+Table+With+Storage+Shelf+For+Living+Room%2C+Easy+Assembly+(Rectangle).jpg",
            isDefault: true,
            alt: "Dark wooden coffee table - front view",
          },
        ],
      },
    ],
  },
  {
    id: 12,
    name: "Vintage Leather Armchair",
    description:
      "Luxurious vintage-style armchair upholstered in high-quality leather, providing ultimate comfort and style. Perfect for adding a classic touch to your living room or study.",
    price: 349.99,
    originalPrice: 429.99,
    discount: 18,
    discountExpiry: new Date("2024-10-01"),
    isNew: true,
    rating: 4.7,
    reviewCount: 64,
    measurements: '32"W x 34"H x 30"D',
    sku: "CHAIR-LEATHER-003",
    categories: [
      categories[2], // Furniture
      categories[2].children![2], // Armchairs
    ],
    colors: [
      {
        id: 18,
        colorName: "Brown Leather",
        colorCode: "#A52A2A",
        quantity: 12,
        images: [
          {
            id: 25,
            url: "https://th.bing.com/th/id/OIP.4bEtXPZEH3I3u4V-VZtloAAAAA?rs=1&pid=ImgDetMain",
            isDefault: true,
            alt: "Vintage leather armchair - front view",
          },
          {
            id: 26,
            url: "https://th.bing.com/th/id/OIP.KtxUhoCnZBX3T7eWMb5HLAHaHa?w=2000&h=2000&rs=1&pid=ImgDetMain",
            isDefault: false,
            alt: "Vintage leather armchair - side view",
          },
        ],
      },
      {
        id: 19,
        colorName: "Black Leather",
        colorCode: "#000000",
        quantity: 8,
        images: [
          {
            id: 27,
            url: "https://th.bing.com/th/id/OIP.ONPhTEuhjmeTgLAO8DkEmAHaHa?w=2000&h=2000&rs=1&pid=ImgDetMain",
            isDefault: true,
            alt: "Black leather armchair - front view",
          },
          {
            id: 28,
            url: "https://i.pinimg.com/originals/49/a1/2e/49a12e8948c2f08e67d0c2c6765589e3.jpg",
            isDefault: false,
            alt: "Black leather armchair - angled view",
          },
        ],
      },
      {
        id: 20,
        colorName: "Olive Green Leather",
        colorCode: "#556B2F",
        quantity: 5,
        images: [
          {
            id: 29,
            url: "https://th.bing.com/th/id/R.c83d06a20318780d3642ff6452f673c6?rik=FrCuylRPfsMCYw&pid=ImgRaw&r=0",
            isDefault: true,
            alt: "Olive green leather armchair - front view",
          },
          {
            id: 30,
            url: "https://th.bing.com/th/id/OIP.qmY2Kx3eRCFFDVinKBptywHaHa?w=1400&h=1400&rs=1&pid=ImgDetMain",
            isDefault: false,
            alt: "Olive green leather armchair - side view",
          },
        ],
      },
    ],
  },
  {
    id: 13,
    name: "Minimalist Wooden Dining Table",
    description:
      "Sleek, minimalist dining table crafted from solid oak wood, perfect for modern and Scandinavian interiors. The simple design allows it to blend into any decor style, while providing ample space for family meals.",
    price: 599.99,
    originalPrice: 749.99,
    discount: 20,
    discountExpiry: new Date("2024-12-01"),
    isNew: false,
    rating: 4.9,
    reviewCount: 120,
    measurements: '72"L x 36"W x 30"H',
    sku: "TABLE-WOOD-004",
    categories: [
      categories[2], // Furniture
      categories[2].children![3], // Dining Tables
    ],
    colors: [
      {
        id: 21,
        colorName: "Natural Oak",
        colorCode: "#DEB887",
        quantity: 20,
        images: [
          {
            id: 31,
            url: "https://th.bing.com/th/id/OIP.mNGIV8uFPbPWEDq_UgSP6QHaHa?rs=1&pid=ImgDetMain",
            isDefault: true,
            alt: "Natural oak wooden dining table - front view",
          },
          {
            id: 32,
            url: "https://cdn.shopify.com/s/files/1/0278/9057/articles/Screen_Shot_2017-09-02_at_4.59.07_PM_600x.png?v=1504385994",
            isDefault: false,
            alt: "Natural oak wooden dining table - top view",
          },
          {
            id: 33,
            url: "https://i.pinimg.com/originals/91/14/5c/91145cf179c0559850bd70e68a1943f5.jpg",
            isDefault: false,
            alt: "Natural oak wooden dining table - side view",
          },
        ],
      },
      {
        id: 22,
        colorName: "Dark Walnut",
        colorCode: "#5C4033",
        quantity: 15,
        images: [
          {
            id: 34,
            url: "https://th.bing.com/th/id/OIP.370olwSXEX8qiUvVS7yv6QHaHa?rs=1&pid=ImgDetMain",
            isDefault: true,
            alt: "Dark walnut wooden dining table - front view",
          },
          {
            id: 35,
            url: "https://th.bing.com/th/id/OIP.VEd5T7te7ABMmBMmeXilzgHaHa?w=800&h=800&rs=1&pid=ImgDetMain",
            isDefault: false,
            alt: "Dark walnut wooden dining table - side view",
          },
          {
            id: 36,
            url: "https://i.pinimg.com/originals/91/14/5c/91145cf179c0559850bd70e68a1943f5.jpg",
            isDefault: false,
            alt: "Natural oak wooden dining table - side view",
          },
          {
            id: 37,
            url: "https://i.pinimg.com/originals/91/14/5c/91145cf179c0559850bd70e68a1943f5.jpg",
            isDefault: false,
            alt: "Natural oak wooden dining table - side view",
          },
          {
            id: 38,
            url: "https://i.pinimg.com/originals/91/14/5c/91145cf179c0559850bd70e68a1943f5.jpg",
            isDefault: false,
            alt: "Natural oak wooden dining table - side view",
          },
        ],
      },
      {
        id: 39,
        colorName: "Natural Oak",
        colorCode: "#DEB887",
        quantity: 20,
        images: [
          {
            id: 31,
            url: "https://th.bing.com/th/id/OIP.mNGIV8uFPbPWEDq_UgSP6QHaHa?rs=1&pid=ImgDetMain",
            isDefault: true,
            alt: "Natural oak wooden dining table - front view",
          },
          {
            id: 32,
            url: "https://cdn.shopify.com/s/files/1/0278/9057/articles/Screen_Shot_2017-09-02_at_4.59.07_PM_600x.png?v=1504385994",
            isDefault: false,
            alt: "Natural oak wooden dining table - top view",
          },
          {
            id: 33,
            url: "https://i.pinimg.com/originals/91/14/5c/91145cf179c0559850bd70e68a1943f5.jpg",
            isDefault: false,
            alt: "Natural oak wooden dining table - side view",
          },
        ],
      },
      {
        id: 40,
        colorName: "Natural Oak 2",
        colorCode: "#DEB887",
        quantity: 20,
        images: [
          {
            id: 31,
            url: "https://th.bing.com/th/id/OIP.Bl9CPQDqjt1lcewtRpePjgHaHa?rs=1&pid=ImgDetMain",
            isDefault: true,
            alt: "Natural oak wooden dining table - front view",
          },
          {
            id: 32,
            url: "https://cdn.shopify.com/s/files/1/0278/9057/articles/Screen_Shot_2017-09-02_at_4.59.07_PM_600x.png?v=1504385994",
            isDefault: false,
            alt: "Natural oak wooden dining table - top view",
          },
          {
            id: 33,
            url: "https://i.pinimg.com/originals/91/14/5c/91145cf179c0559850bd70e68a1943f5.jpg",
            isDefault: false,
            alt: "Natural oak wooden dining table - side view",
          },
        ],
      },
      {
        id: 41,
        colorName: "Natural Oak 3",
        colorCode: "#DEB887",
        quantity: 20,
        images: [
          {
            id: 31,
            url: "https://down-ph.img.susercontent.com/file/c542d482d77d1bb5ab447b67f9ea0775",
            isDefault: true,
            alt: "Natural oak wooden dining table - front view",
          },
          {
            id: 32,
            url: "https://cdn.shopify.com/s/files/1/0278/9057/articles/Screen_Shot_2017-09-02_at_4.59.07_PM_600x.png?v=1504385994",
            isDefault: false,
            alt: "Natural oak wooden dining table - top view",
          },
          {
            id: 33,
            url: "https://i.pinimg.com/originals/91/14/5c/91145cf179c0559850bd70e68a1943f5.jpg",
            isDefault: false,
            alt: "Natural oak wooden dining table - side view",
          },
        ],
      },
      {
        id: 42,
        colorName: "Natural Oak 3",
        colorCode: "#DEB887",
        quantity: 20,
        images: [
          {
            id: 31,
            url: "https://th.bing.com/th/id/OIF.2t5RxBgdQDCNZRX5frOD3A?rs=1&pid=ImgDetMain",
            isDefault: true,
            alt: "Natural oak wooden dining table - front view",
          },
          {
            id: 32,
            url: "https://cdn.shopify.com/s/files/1/0278/9057/articles/Screen_Shot_2017-09-02_at_4.59.07_PM_600x.png?v=1504385994",
            isDefault: false,
            alt: "Natural oak wooden dining table - top view",
          },
          {
            id: 33,
            url: "https://i.pinimg.com/originals/91/14/5c/91145cf179c0559850bd70e68a1943f5.jpg",
            isDefault: false,
            alt: "Natural oak wooden dining table - side view",
          },
        ],
      },
    ],
  },
];
