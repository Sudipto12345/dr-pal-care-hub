import arnicaMontana from "@/assets/products/arnica-montana.jpg";
import immunityKit from "@/assets/products/immunity-kit.jpg";
import allergyKit from "@/assets/products/allergy-kit.jpg";
import stressDrops from "@/assets/products/stress-drops.jpg";
import skinCream from "@/assets/products/skin-cream.jpg";
import digestiveCare from "@/assets/products/digestive-care.jpg";
import jointOil from "@/assets/products/joint-oil.jpg";
import childSyrup from "@/assets/products/child-syrup.jpg";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  image: string;
  description: string;
  benefits: string[];
  usage: string;
  rating: number;
  reviews: number;
}

export const shopCategories = ["All", "Pain Relief", "Immunity", "Stress & Anxiety", "Skin Care", "Digestive", "Children's Health"] as const;

export const shopProducts: Product[] = [
  {
    id: "PR001", name: "Arnica Montana 30C", slug: "arnica-montana-30c",
    category: "Pain Relief", price: 250, originalPrice: 320, stock: 45, image: arnicaMontana,
    description: "Classical homeopathic remedy for bruises, sprains, muscle soreness and post-surgical recovery. Prepared from the mountain daisy plant.",
    benefits: ["Relieves muscle pain & soreness", "Reduces bruise healing time", "Post-surgery recovery support", "Safe for all ages"],
    usage: "Take 3-4 pellets under the tongue, 3 times daily or as directed by your physician. Do not eat or drink 15 minutes before or after taking.",
    rating: 4.8, reviews: 124,
  },
  {
    id: "PR002", name: "Immunity Booster Kit", slug: "immunity-booster-kit",
    category: "Immunity", price: 850, originalPrice: 999, stock: 15, image: immunityKit,
    description: "Complete constitutional kit with 3 carefully selected remedies to strengthen your body's natural defense system against infections and seasonal changes.",
    benefits: ["Strengthens natural immunity", "Protects against seasonal infections", "Boosts energy & vitality", "Suitable for whole family"],
    usage: "Follow the included regimen card. Take Remedy A in the morning, Remedy B in the afternoon, and Remedy C at bedtime. Continue for 30 days.",
    rating: 4.9, reviews: 89,
  },
  {
    id: "PR003", name: "Allergy Relief Kit", slug: "allergy-relief-kit",
    category: "Immunity", price: 650, stock: 8, image: allergyKit,
    description: "Dual-remedy allergy relief kit with Sabadilla and Allium Cepa tinctures for lasting relief from seasonal allergies, rhinitis, and respiratory sensitivity.",
    benefits: ["Relieves sneezing & runny nose", "Reduces watery eyes", "Long-term allergy management", "No drowsiness"],
    usage: "Take 5 drops of each remedy in half cup of water, twice daily. Reduce frequency as symptoms improve.",
    rating: 4.7, reviews: 67,
  },
  {
    id: "PR004", name: "Stress Relief Drops", slug: "stress-relief-drops",
    category: "Stress & Anxiety", price: 450, stock: 22, image: stressDrops,
    description: "Bach flower remedy blend with Rescue Remedy, Lavender, and Passionflower tinctures for natural relief from anxiety, stress, and insomnia.",
    benefits: ["Calms anxiety naturally", "Promotes restful sleep", "Reduces mental fatigue", "Non-habit forming"],
    usage: "Add 10 drops to a glass of water and sip slowly. Take 3 times daily, or as needed during stressful moments.",
    rating: 4.6, reviews: 156,
  },
  {
    id: "PR005", name: "Derma Care Cream", slug: "derma-care-cream",
    category: "Skin Care", price: 380, stock: 30, image: skinCream,
    description: "Homeopathic skin care cream formulated with Calendula, Graphites, and Aloe Vera for eczema, dry skin, rashes, and general skin nourishment.",
    benefits: ["Soothes eczema & dermatitis", "Moisturizes dry cracked skin", "Reduces itching & redness", "Chemical-free formula"],
    usage: "Apply a thin layer to affected area 2-3 times daily after cleansing. For best results, use consistently for 4-6 weeks.",
    rating: 4.5, reviews: 93,
  },
  {
    id: "PR006", name: "Digestive Care Globules", slug: "digestive-care-globules",
    category: "Digestive", price: 280, stock: 38, image: digestiveCare,
    description: "Homeopathic globules with Nux Vomica, Lycopodium, and Carbo Veg for relief from indigestion, bloating, acidity, and IBS symptoms.",
    benefits: ["Relieves bloating & gas", "Reduces acidity", "Improves digestion", "Manages IBS symptoms"],
    usage: "Take 4 pellets under the tongue, 30 minutes before meals. Take 3 times daily or as directed.",
    rating: 4.7, reviews: 78,
  },
  {
    id: "PR007", name: "Joint Pain Relief Oil", slug: "joint-pain-relief-oil",
    category: "Pain Relief", price: 520, originalPrice: 650, stock: 18, image: jointOil,
    description: "Therapeutic oil blend with Rhus Tox, Bryonia, and Eucalyptus for external application on joints, muscles, and areas of chronic pain.",
    benefits: ["Relieves joint stiffness", "Reduces inflammation", "Improves mobility", "Warming & soothing"],
    usage: "Massage gently into affected area for 5-10 minutes, 2-3 times daily. Wash hands after use. For external use only.",
    rating: 4.4, reviews: 112,
  },
  {
    id: "PR008", name: "Children's Health Syrup", slug: "childrens-health-syrup",
    category: "Children's Health", price: 350, stock: 0, image: childSyrup,
    description: "Gentle homeopathic syrup for children with Chamomilla, Calcarea Carb, and Ferrum Phos. Helps with teething, recurrent colds, and growth support.",
    benefits: ["Soothes teething pain", "Boosts child immunity", "Supports healthy growth", "Pleasant taste — kids love it"],
    usage: "Children 1-5 years: 2.5ml twice daily. Children 5-12 years: 5ml twice daily. Use the included measuring cup.",
    rating: 4.8, reviews: 45,
  },
];
