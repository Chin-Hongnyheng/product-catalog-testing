import type { Product } from "./types";

// ── Seed / mock catalogue data ─────────────────────────────────────────────
const SEED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    category: "Audio",
    price: 219,
    originalPrice: 299,
    inStock: true,
    onSale: true,
    emoji: "🎧",
    description:
      "Premium sound with 30-hour battery life and active noise cancellation.",
    internalNotes: "Restock scheduled with warehouse A next Tuesday. Margin: 42%.",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    category: "Peripherals",
    price: 149,
    inStock: true,
    onSale: false,
    emoji: "⌨️",
    description: "Tactile switches, RGB backlight, and full aluminium body.",
    internalNotes: "Vendor: KeyWorks Taiwan; MOQ: 50 units.",
  },
  {
    id: 3,
    name: "Ultra-Wide Monitor",
    category: "Displays",
    price: 749,
    inStock: false,
    onSale: false,
    emoji: "🖥️",
    description:
      '34" IPS, 144 Hz, 1ms response time for immersive productivity.',
    internalNotes: "Awaiting replacement panel supply from supplier.",
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 379,
    originalPrice: 499,
    inStock: true,
    onSale: true,
    emoji: "🪑",
    description:
      "Lumbar support, breathable mesh and fully adjustable armrests.",
    internalNotes: "Bulk freight discount applied.",
  },
  {
    id: 5,
    name: "Smart LED Desk Lamp",
    category: "Lighting",
    price: 89,
    inStock: true,
    onSale: false,
    emoji: "💡",
    description:
      "Touch-dimming, USB-C charging port and circadian rhythm modes.",
  },
  {
    id: 6,
    name: "4K Webcam",
    category: "Displays",
    price: 199,
    inStock: false,
    onSale: false,
    emoji: "📷",
    description:
      "Autofocus, dual microphone and HDR for crystal-clear video calls.",
    internalNotes: "Firmware v2.1 update pending before shipment.",
  },
  {
    id: 7,
    name: "Portable SSD 2 TB",
    category: "Storage",
    price: 99,
    originalPrice: 129,
    inStock: true,
    onSale: true,
    emoji: "💾",
    description:
      "USB 3.2 Gen 2, up to 1050 MB/s read speed in rugged aluminium casing.",
  },
  {
    id: 8,
    name: "Wireless Charging Pad",
    category: "Accessories",
    price: 49,
    inStock: false,
    onSale: false,
    emoji: "🔋",
    description:
      "Qi-certified 15W fast charge, compatible with all Qi-enabled devices.",
    internalNotes: "Discontinuation candidate at end of quarter.",
  },
];

export default SEED_PRODUCTS;
