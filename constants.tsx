import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from './types.ts';

export const PRODUCTS: Product[] = [
  {
    id: "zk-001",
    name: "Mitsuri Kanroji 1/7 Scale Figure",
    series: "Demon Slayer",
    category: "Figure",
    price: 14599,
    originalPrice: 17999,
    isFeatured: true,
    description: "A masterwork of dynamic sculpting, this 1/7 scale Mitsuri figure captures the Love Hashira mid-combat. Her unique, flexible whip-like Nichirin sword is crafted from semi-rigid polymer to maintain its spiral form while suggesting rapid motion. Features a stunning pearl-finish on her haori and translucent gradient PVC for her iconic hair braids. The base is an intricate recreation of cherry blossoms shattered by the kinetic energy of her breathing style.",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSJc4ZxmXEnWB6sIejC5Eq1xMFcXFJjKWNQlVpsxzxXYTTV8gjQdaikF8x2DMgExFraoyiHL0Ym2oPfYU6f9E0Ey_0cgi_pZNCRcyNnEh9zZGC7Uthfa5d-",
    image2: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQy30S-YSyRb6IK2M3kIzLyXfgAD-kapx-PzmcDdR7WBHit5VQNkkt3bLdvfoENDfpa3u9n1y0ZaPM6MFKHTZXifoWWvr8jDmsuJPsTgNQ",
    stock: 5,
    specs: { material: "High-Grade PVC/ABS", dimensions: "24cm (Height)", weight: "0.8kg", origin: "Aniplex Archival", rarity: "Rare" }
  },
  {
    id: "zk-002",
    name: "Luffy Gear 5 Tech-Hoodie",
    series: "One Piece",
    category: "Apparel",
    price: 5499,
    originalPrice: 7500,
    description: "Engineered for the Warrior of Liberation. This 480GSM heavy-weight tech hoodie features water-repellent outer layers and a thermal-reactive inner lining. The back is dominated by a high-density 3D puff print of the 'Drums of Liberation' heartbeat pattern. Custom-molded silicone aglets on the drawstrings shaped like the Straw Hat Pirate emblem. Built for urban exploration and ultimate style dominance.",
    image: "https://m.media-amazon.com/images/I/71vWjWW-9UL._SY879_.jpg",
    image2: "https://m.media-amazon.com/images/I/712M-nVEGrL._SY879_.jpg",
    stock: 50,
    specs: { material: "480GSM French Terry", dimensions: "Oversized Fit (S-XXL)", weight: "1.2kg", origin: "Grand Line Gear", rarity: "Epic" }
  },
  {
    id: "zk-003",
    name: "Sun God Nika Resin Statue",
    series: "One Piece",
    category: "Figures",
    price: 25599,
    originalPrice: 32000,
    isFeatured: true,
    description: "The definitive representation of Luffy's peak power. This polystone resin statue utilizes internal LED circuitry to make the lightning effects and pearlescent white aura glow. Every muscle contraction is hand-painted with professional-grade weathering to replicate the Onigashima roof battle. Includes a physical COA (Certificate of Authenticity) and a magnetic switch for lightning activation.",
    image: "https://www.kaihamastore.com/cdn/shop/files/16_d194bfe6-4d06-4f0e-a90f-2afdd9f1f69d.jpg?crop=center&height=1080&v=1757517988&width=1080",
    image2: "https://www.kaihamastore.com/cdn/shop/files/15_034b78f6-0776-420a-b007-c77b3223fad6.jpg?crop=center&height=1080&v=1757517988&width=1080",
    stock: 2,
    specs: { material: "Polystone / Transparent Resin", dimensions: "40cm x 35cm x 35cm", weight: "4.5kg", origin: "Kaidou-Kuni Foundry", rarity: "Zenith" }
  },
  {
    id: "zk-004",
    name: "Rengoku Kyojuro Flame Figure",
    series: "Demon Slayer",
    category: "Figures",
    price: 19599,
    originalPrice: 22000,
    isFeatured: true,
    description: "Capture the heroic intensity of the Flame Hashira. This figure features transparent 'flame' effect parts with internal refraction technology to glow in ambient light. Rengoku's defiant smirk and tattered haori are rendered with extreme precision. The base features scorched railroad tracks, immortalizing his final stand on the Mugen Train.",
    image: "https://m.media-amazon.com/images/I/51Ducm-CWBL.jpg",
    image2: "https://m.media-amazon.com/images/I/51ZrQcZT15L.jpg",
    stock: 5,
    specs: { material: "PVC/Transparent ABS", dimensions: "18cm", weight: "0.5kg", origin: "Mugen District", rarity: "Rare" }
  },
  {
    id: "zk-005",
    name: "Tengen Uzui Dual Cleavers",
    series: "Demon Slayer",
    category: "Collectibles",
    price: 22599,
    originalPrice: 26000,
    isFeatured: true,
    description: "A 1:1 museum-grade replica of the Sound Hashira's flamboyant dual cleavers. Forged from high-density polymer with a steel core for realistic weight. The 'Slayer' kanji is gold-leaf engraved, and the signature chain connecting the hilts is crafted from heavy-duty brass. Strictly for display purposes, this collectible embodies the flashiest of the Hashira.",
    image: "https://minikatana.com/cdn/shop/files/5F0A2585_e3a068ac-6fbf-46b7-b560-ee48de997b5e.jpg?v=1717707665",
    image2: "https://minikatana.com/cdn/shop/files/5F0A2696_39d45fe2-af03-4774-8687-1f043b47fa3b.jpg?v=1717707671",
    stock: 5,
    specs: { material: "Metal Core / High-Density Resin", dimensions: "85cm per blade", weight: "3.2kg (Total)", origin: "Entertainment District", rarity: "Epic" }
  },
  {
    id: "zk-006",
    name: "Roronoa Zoro's Black Enma",
    series: "One Piece",
    category: "Collectibles",
    price: 23699,
    originalPrice: 28000,
    isFeatured: true,
    description: "The blade that scarred Kaido. This 1:1 scale replica of Enma features the iconic flame-like hamon pattern and a deep purple lacquer finish on the scabbard. The hilt is wrapped in genuine synthetic ray-skin and traditional ito wrap. Comes with a weighted wooden display stand and a traditional silk sword bag.",
    image: "https://minikatana.com/cdn/shop/products/5F0A9318.jpg?v=1717707572",
    image2: "https://minikatana.com/cdn/shop/products/5F0A9297.jpg?v=1717707564",
    stock: 10,
    specs: { material: "Carbon Steel (Dull) / Wood", dimensions: "104cm", weight: "1.1kg", origin: "Wano Country", rarity: "Zenith" }
  },
  {
    id: "zk-007",
    name: "Bandai Thousand Sunny Model Kit",
    series: "One Piece",
    category: "Figures",
    price: 18200,
    originalPrice: 20000,
    description: "Experience the ultimate engineering of the Straw Hat Pirates. This Bandai Hobby Kit brings the Thousand Sunny to your shelf with incredible intricacy. No glue is required due to Bandai's master-level snap-fit technology. The kit includes the Gaon Cannon, the Soldier Dock System, and mini-figures of the crew. Each part is molded in color, though advanced builders can apply the included water-slide decals for a professional museum-quality finish. Set sail for the New World!",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRld6galW3iOl0PEYjFOatpyTOIC-Yocs50G1x7KwwQoBkdC-J3Ykwq3d-Y4tVkyEfv-LjUYr5a6rDMaRPnoqgbxdZaCRDDbg",
    image2: "https://www.usagundamstore.com/cdn/shop/products/thousand-sunny-one-piece-grand-ship-collection-02.jpg?v=1698949969&width=1200",
    stock: 18,
    specs: { material: "High-Grade Polystyrene", dimensions: "25cm", weight: "0.6kg", origin: "Water 7 Yards", rarity: "Rare" }
  },
  {
    id: "zk-008",
    name: "Akatsuki Village Cloud Hoodie",
    series: "Naruto",
    category: "Apparel",
    price: 3399,
    originalPrice: 4000,
    description: "Embody the legendary rogue ninja organization. This premium black hoodie features the iconic Akatsuki red clouds in a mix of high-density puff print and traditional embroidery for a layered, luxury texture. The sleeves are adorned with 'Hidden Leaf' strike-through symbols, representing the rogue status of the wearer. Made with 420GSM ultra-soft fleece, this hoodie is built for stealth, comfort, and longevity in any weather conditions.",
    image: "https://m.media-amazon.com/images/I/61YI9YclDtL._SY879_.jpg",
    image2: "https://m.media-amazon.com/images/I/61qjyswyYdL._SY879_.jpg",
    stock: 24,
    specs: { material: "420GSM Fleece Cotton", dimensions: "S to 3XL", weight: "0.8kg", origin: "Amegakure Outer Walls", rarity: "Common" }
  },
  {
    id: "zk-009",
    name: "Tanjiro: Hinokami Kagura Hoodie",
    series: "Demon Slayer",
    category: "Apparel",
    price: 3499,
    originalPrice: 4000,
    description: "Unleash the Sun Breathing style with this limited edition tech-hoodie. The back features a massive, vibrant graphic of Tanjiro Kamado performing the Hinokami Kagura, utilizing heat-pressed vinyl that won't crack or fade. The front has a minimalist Hanafuda earring embroidery on the chest. Designed with a modern oversized fit and hidden tech-pockets, this hoodie is the perfect fusion of traditional slayer aesthetics and contemporary streetwear functionality.",
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTqLaazBQPMwysezkkrmj1LV7z7iOe5OVyWCc8A68IE115_XK5eqehQHBZeQZPomokltXfwKEzQU5oscmHe9eaJtpotkRLfDWzbYRI9X8Y",
    image2: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTpUIyl8Lq1XxQJ1vhsCunYo9QMzI4G_A06LA0e6oSskOBRksWG49umQq5elvqyWV_yzZJkmJ3oFgVf-EOuToRefZCbhEb0XugExihAzpU",
    stock: 23,
    specs: { material: "Heavy French Terry", dimensions: "M to XXL", weight: "0.85kg", origin: "Mount Sagiri Labs", rarity: "Rare" }
  },
  {
    id: "zk-010",
    name: "Goku Spirit Bomb Figure",
    series: "Dragon Ball Z",
    category: "Figures",
    price: 46599,
    originalPrice: 50500,
    description: "A colossal representation of Saiyan hope. This large-scale figure captures Son Goku mid-summoning of the Universe's energy. The 'Spirit Bomb' itself is a massive 15cm translucent blue sphere with internal battery-powered LED circuitry that pulses with 'Life Energy.' The muscle definition and battle damage on Goku's gi are hand-painted to show the strain of the final battle against Kid Buu. A true centerpiece for any Dragon Ball fan's shrine.",
    image: "https://i.etsystatic.com/60484128/r/il/5eed20/7593071952/il_1588xN.7593071952_kdeb.jpg",
    image2: "https://i.etsystatic.com/60484128/r/il/413390/7593071950/il_1588xN.7593071950_797q.jpg",
    stock: 30,
    specs: { material: "High-Impact PVC/LED", dimensions: "45cm (Total Height)", weight: "2.8kg", origin: "Capsule Corp HQ", rarity: "Epic" }
  },
  {
    id: "zk-011",
    name: "Goku (The Flames) Wall Art",
    series: "Dragon Ball Z",
    category: "Collectibles",
    price: 69599,
    originalPrice: 70500,
    description: "A premium metal-plate wall art featuring Goku's iconic Super Saiyan transformation. Printed using high-definition UV-curing technology on a brushed aluminum plate, the colors pop with an iridescent depth. The 'Flames' edition features a specialized gloss finish on the aura effects, creating a moving-image illusion when viewed from different angles. Comes with a hidden magnetic mounting system for a clean, floating appearance on your wall. Limited to 100 pieces worldwide.",
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTNp07nH-XDymzntVopBgrfcO9iOKsFigoYgZVjQsr860FojUrdhJx7qQtNkG_Ty3KZnGCBBp09f3Nq64EUEU7tI9NhV6F1TAmDwA_dyWj5",
    image2: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTV1im59bzUARQ4f04Dm3Tky4r-m_wesY0p9KYnIWP9zBUuuzd0VzV-0Zmlo9ZuAdhTfmzoumHb4UIXDOHSB4lDLmREytdipeZq2uflgjORQXtUjMTnROr5fg",
    stock: 15,
    specs: { material: "Brushed Aluminum", dimensions: "60cm x 90cm", weight: "2.1kg", origin: "Satan City Archives", rarity: "Zenith" }
  },
  {
    id: "zk-012",
    name: "Naruto Sage Mode Savior Statue",
    series: "Naruto",
    category: "Figures",
    price: 45899,
    originalPrice: 50000,
    isFeatured: true,
    description: "Relive the moment the Hero of the Leaf returned to face Pain. This Tamashii Nations 'Battle Version' statue depicts Naruto in full Sage Mode, wearing the red scroll haori. The base is an intricately detailed ruin of Konoha, with Ma and Pa toad summons positioned at his shoulders. The eyes are painted with specialized orange pigments that reflect light, perfectly capturing the Toad Sage energy. A heavy-duty polystone base ensures stability for this dynamic, mid-charge pose.",
    image: "https://m.media-amazon.com/images/I/71705Dlep2L._SX679_.jpg",
    image2: "https://m.media-amazon.com/images/I/71XA0AUwQsL._SX679_.jpg",
    stock: 9,
    specs: { material: "PVC/ABS/Polystone", dimensions: "26cm", weight: "1.2kg", origin: "Mount Myoboku", rarity: "Rare" }
  }
];

export const Logo = ({ size = "lg", onSecretClick }: { size?: "sm" | "lg", onSecretClick?: () => void }) => {
  const [clickCount, setClickCount] = useState(0);
  const isSmall = size === "sm";

  const handleClick = (e: React.MouseEvent) => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount === 4) {
      if (onSecretClick) onSecretClick();
      setClickCount(0);
    }
    const timer = setTimeout(() => setClickCount(0), 2000);
    return () => clearTimeout(timer);
  };
  
  return (
    <div 
      onClick={handleClick}
      className={`flex ${isSmall ? 'flex-row items-center gap-3' : 'flex-col items-center gap-1'} group py-2 cursor-pointer select-none no-underline`}
    >
      <Link to="/" className="contents">
        <div className={`relative ${isSmall ? 'w-10 h-10' : 'w-24 h-24'} transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_var(--neon-primary)]">
            <circle cx="50" cy="50" r="48" fill="none" stroke="var(--neon-secondary)" strokeWidth="0.5" strokeOpacity="0.5" strokeDasharray="4 4" className="animate-[spin_10s_linear_infinite]" />
            <path d="M50 20 L85 70 Q85 85 50 80 Q15 85 15 70 Z" fill="#FFFFFF" />
            <path d="M50 25 L75 65 Q75 75 50 72 Q25 75 25 65 Z" fill="var(--bg-dark)" />
            <circle cx="50" cy="45" r="8" fill="var(--neon-primary)" className="animate-pulse" />
          </svg>
        </div>
        <div className={`${isSmall ? 'text-left' : 'text-center mt-2'}`}>
          <span className={`${isSmall ? 'text-lg' : 'text-2xl'} font-header font-black text-white tracking-tighter uppercase leading-none block italic group-hover:skew-x-12 transition-transform`}>
            Zen<span className="text-[var(--neon-primary)]">kira</span>
          </span>
          {!isSmall && (
            <div className="flex items-center gap-1 mt-1 justify-center">
              <span className="text-[10px] font-header font-bold text-[var(--text-muted)] tracking-[0.4em] uppercase whitespace-nowrap opacity-70">Archive_Hub</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export const SAMPLE_VIDEOS = [
  "https://joy.videvo.net/videvo_files/video/free/2019-11/large_watermarked/190828_27_Supernova_06_preview.mp4",
  "https://joy.videvo.net/videvo_files/video/free/2019-03/large_watermarked/190111_08_Glow_02_preview.mp4",
  "https://joy.videvo.net/videvo_files/video/free/2019-03/large_watermarked/190111_07_Abstract_14_preview.mp4",
  "https://joy.videvo.net/videvo_files/video/free/2019-11/large_watermarked/190828_27_Supernova_10_preview.mp4"
];

export const EASTER_EGGS = {
  LUFFY_HAT: { id: 'luffy', name: 'Straw Hat Pirate Emblem', anime: 'One Piece' },
  GOJO_BLINDFOLD: { id: 'gojo', name: 'Limitless Blindfold', anime: 'Jujutsu Kaisen' },
  SURVEY_WINGS: { id: 'aot', name: 'Wings of Freedom', anime: 'Attack on Titan' },
  TANJIRO_EARRING: { id: 'tanjiro', name: 'Hanafuda Earring', anime: 'Demon Slayer' },
  POCHITA: { id: 'pochita', name: 'Chainsaw Devil Pull-string', anime: 'Chainsaw Man' },
  WHISKERS: { id: 'naruto', name: 'Nine-Tails Whisker Marks', anime: 'Naruto' },
  FOUR_STAR: { id: 'dbz', name: '4-Star Dragon Ball', anime: 'Dragon Ball' },
  ANYA_PEANUT: { id: 'spyfamily', name: 'Peanut of Prophecy', anime: 'Spy x Family' },
  SHINIGAMI_BADGE: { id: 'bleach', name: 'Substitute Shinigami Badge', anime: 'Bleach' },
  RYUK_APPLE: { id: 'deathnote', name: 'Shinigami Apple', anime: 'Death Note' },
  MENACING: { id: 'jojo', name: 'Menacing SFX (ゴゴゴ)', anime: "Jojo's Bizarre Adventure" },
};