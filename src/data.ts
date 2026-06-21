import { ServiceItem, Stylist, Testimonial, SalonRoom } from './types';

export const SERVICE_CATEGORIES = [
  { id: 'hair', name: 'Haute Coiffure', desc: 'Expert cuts, couture coloring, and botanical repair' },
  { id: 'spa', name: 'Sérénité Spa & Face', desc: 'Holistic clinical facials and restorative massages' },
  { id: 'nails', name: 'Nail Atelier', desc: 'Precision manicures and customized luxury nail art' },
];

export const SERVICES: ServiceItem[] = [
  // Hair Services
  {
    id: 'h1',
    name: 'Signature Royal Blowout',
    price: 145,
    duration: '60 min',
    category: 'hair',
    description: 'Argan oil infused deep wash, scalp massage, and precision volume brush finish.',
  },
  {
    id: 'h2',
    name: 'Couture Balayage & Glaze',
    price: 380,
    duration: '180 min',
    category: 'hair',
    description: 'Hand-painted Parisian highlights customized for perfect dimensional shine and tone.',
  },
  {
    id: 'h3',
    name: 'Elite Sculpt & Restructuring',
    price: 185,
    duration: '75 min',
    category: 'hair',
    description: 'Master Architect cut tailored to facial structure, finishing with caviar botanical glaze.',
  },
  
  // Spa / Skincare Services
  {
    id: 's1',
    name: 'Cellular Hydradiance Facial',
    price: 240,
    duration: '75 min',
    category: 'spa',
    description: 'Oxy-infusion, microcurrent contouring, and active 24K gold serum mask.',
  },
  {
    id: 's2',
    name: 'Sérénité Hot Quartz Massage',
    price: 210,
    duration: '90 min',
    category: 'spa',
    description: 'Deep tissue alignment incorporating warm rose-quartz therapy and soothing jasmine nectar.',
  },
  {
    id: 's3',
    name: 'Advanced Collagen Lifting Therapy',
    price: 310,
    duration: '95 min',
    category: 'spa',
    description: 'Pure marine collagen synthesis with specialized architectural face massage and LED light.',
  },

  // Nail Services
  {
    id: 'n1',
    name: 'Platinum Gel-Couture Manicure',
    price: 115,
    duration: '60 min',
    category: 'nails',
    description: 'Nourishing milk bath, apricot cuticle care, organic hand massage, and long-wear platinum glaze.',
  },
  {
    id: 'n2',
    name: 'Imperial Pearl Pedicure',
    price: 140,
    duration: '75 min',
    category: 'nails',
    description: 'Crushed pearl exfoliation, heated gold mask, reflex massage, and designer color wrap.',
  },
  {
    id: 'n3',
    name: 'Avant-Garde Bespoke Nail Art',
    price: 195,
    duration: '90 min',
    category: 'nails',
    description: 'Custom sculpted gel overlays, incorporating 24k foil flakes, mother-of-pearl, or line painting.',
  }
];

export const STYLISTS: Stylist[] = [
  {
    id: 'st1',
    name: 'Antoine Laurent',
    role: 'Creative Hair Director & Master Architect',
    bio: 'With over 12 years in Paris and Milan fashion weeks, Antoine treats hair as a fluid architectural canvas, crafting structural silhouettes that turn heads.',
    avatar: 'AL',
    rating: 4.9,
    specialties: ['Couture Balayage', 'Structural Cuts', 'Caviar Treatment'],
    portfolioUrls: ['Voluminous locks', 'Runway blonde', 'Gilded gloss']
  },
  {
    id: 'st2',
    name: 'Evangeline Sophia',
    role: 'Dermal Esthetician & Facial Alchemist',
    bio: 'Evangeline is a holistic skincare consultant specializing in non-invasive skin regeneration, marrying cellular science with deep sensory wellness.',
    avatar: 'ES',
    rating: 5.0,
    specialties: ['Microcurrent Sculpting', 'Oxy-Infusion', '24K Gold Synthesis'],
    portfolioUrls: ['Radiant bridal skin', 'V-line lifting contour', 'Flawless velvet glow']
  },
  {
    id: 'st3',
    name: 'Yuki Tanaka',
    role: 'Vanguard Nail Artist & Sculptor',
    bio: 'Hailing from Tokyo, Yuki commands manicures as high-art. Renowned for delicate hand-painted motifs, 3D structures, and mineral textures.',
    avatar: 'YT',
    rating: 4.9,
    specialties: ['Bespoke 3D Art', 'Sculpted Gel Extensions', 'Pearl Therapy'],
    portfolioUrls: ['Gilded gold-foil tips', 'Abstract marble nails', 'Opal aura overlay']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Genevieve Sinclair',
    role: 'Fashion Consultant',
    rating: 5,
    comment: 'Antoine’s balayage is pure liquid light. Walking into the corridor feels like entering a Parisian sanctuary. The experience was simply magical.',
    avatarLetter: 'G'
  },
  {
    id: 't2',
    name: 'Maximilian Vance',
    role: 'Creative Director',
    rating: 5,
    comment: 'The Sérénité Hot Quartz Massage made me lose all track of time. It is a masterclass in luxury spa diagnostics with stellar attention to detail.',
    avatarLetter: 'M'
  },
  {
    id: 't3',
    name: 'Cassandra Sterling',
    role: 'Art Collector',
    rating: 5,
    comment: 'Yuki’s nail art is exceptional. Her custom gel work incorporating real gold leaf is literally miniature art on my fingertips. Absolutely exquisite.',
    avatarLetter: 'C'
  }
];

export const SALON_ROOMS: SalonRoom[] = [
  {
    id: 'r1',
    title: 'Haute Coiffure Atelier',
    category: 'hair',
    description: 'Step into a world of tailored volume and light. Framed by brilliant halo illumination and plush velvet structures.',
    image: '/src/assets/images/hair_salon_room_1782030578697.jpg',
    features: ['Backlit Gold Mirrors', 'Plush Pink Velvet Loungers', 'Master Styling Suite']
  },
  {
    id: 'r2',
    title: 'Sérénité Facial Sanctuary',
    category: 'spa',
    description: 'Breathe, align, and regenerate under soft organic rays. Cellular science meets sensory bliss on cloud-soft linens.',
    image: '/src/assets/images/skincare_salon_room_1782030594525.jpg',
    features: ['Pure Rose-Quartz Therapy', 'Active Collagen Infusion', 'Ambient LED Restrooms']
  },
  {
    id: 'r3',
    title: 'Bespoke Nail Art Lounge',
    category: 'nails',
    description: 'Transform nails into bespoke fine-art canvases. Outfitted with master pedicure thrones and raw mineral details.',
    image: '/src/assets/images/nail_salon_room_1782030614949.jpg',
    features: ['Tokyo-Gel Sculpting Kits', 'Arched Backlit Display', 'Infused Botanical Baths']
  }
];

export const DOUBLE_DOOR_IMAGE = '/src/assets/images/double_salmon_doors_1782030548426.jpg';
export const SALON_CORRIDOR_IMAGE = '/src/assets/images/salon_corridor_1782030564456.jpg';
