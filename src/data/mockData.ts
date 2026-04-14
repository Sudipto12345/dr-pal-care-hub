// Realistic mock data for Dr. Amit Kumar Pal's Homeopathic Care Platform

export const mockPatients = [
  { id: "P001", name: "Saida Begum", age: 42, gender: "Female", phone: "+91 98112 34567", email: "saida.begum@gmail.com", lastVisit: "2025-04-10", status: "Active" },
  { id: "P002", name: "Rohit Mehra", age: 35, gender: "Male", phone: "+91 99887 65432", email: "rohit.mehra@yahoo.com", lastVisit: "2025-04-08", status: "Active" },
  { id: "P003", name: "Anjali Tripathi", age: 29, gender: "Female", phone: "+91 88976 54321", email: "anjali.t@gmail.com", lastVisit: "2025-04-12", status: "Active" },
];

export const mockAppointments = [
  { id: "A001", patientName: "Saida Begum", date: "2025-04-10", time: "10:00 AM", type: "Follow-up", status: "Completed" },
  { id: "A002", patientName: "Rohit Mehra", date: "2025-04-08", time: "11:30 AM", type: "First Visit", status: "Completed" },
  { id: "A003", patientName: "Anjali Tripathi", date: "2025-04-12", time: "09:30 AM", type: "Follow-up", status: "Completed" },
  { id: "A004", patientName: "Saida Begum", date: "2025-04-20", time: "10:00 AM", type: "Follow-up", status: "Confirmed" },
  { id: "A005", patientName: "Rohit Mehra", date: "2025-04-22", time: "02:00 PM", type: "Follow-up", status: "Confirmed" },
];

export const mockPrescriptions = [
  {
    id: "RX001", patientName: "Saida Begum", date: "2025-04-10", diagnosis: "Chronic Sinusitis",
    medicines: ["Kali Bichromicum 30C – twice daily", "Silicea 200C – once weekly", "Hydrastis Q – nasal drops"],
    status: "Active",
  },
];

export const mockCases = [
  { id: "C001", patientName: "Saida Begum", condition: "Chronic Sinusitis & Allergic Rhinitis", startDate: "2025-01-15", status: "Ongoing", visits: 6 },
  { id: "C002", patientName: "Rohit Mehra", condition: "Acid Reflux (GERD)", startDate: "2025-03-01", status: "Improving", visits: 3 },
  { id: "C003", patientName: "Anjali Tripathi", condition: "Atopic Dermatitis (Eczema)", startDate: "2025-02-10", status: "Ongoing", visits: 4 },
];

export const mockProducts = [
  { id: "PR001", name: "Arnica Montana 30C", category: "Remedy", price: 150, stock: 45, status: "In Stock", description: "For bruises, sprains, muscle soreness and post-surgical recovery" },
  { id: "PR002", name: "Immunity Booster Kit", category: "Kit", price: 599, stock: 15, status: "In Stock", description: "Complete constitutional kit to strengthen natural immunity" },
  { id: "PR003", name: "Allergy Relief Kit", category: "Kit", price: 499, stock: 8, status: "In Stock", description: "Seasonal allergy relief with Sabadilla, Allium Cepa & Natrum Mur" },
  { id: "PR004", name: "Stress Relief Drops", category: "Tincture", price: 350, stock: 22, status: "In Stock", description: "Bach flower remedy blend for anxiety, stress and restful sleep" },
];

export const mockOrders = [
  { id: "ORD001", date: "2025-04-06", items: ["Arnica Montana 30C", "Immunity Booster Kit"], total: 749, status: "Delivered" },
  { id: "ORD002", date: "2025-04-11", items: ["Stress Relief Drops"], total: 350, status: "Shipped" },
];

export const mockBlogPosts = [
  {
    id: "B001",
    title: "Understanding Homeopathy: How It Works and Why It's Effective",
    category: "Education",
    date: "2025-03-15",
    status: "Published",
    views: 1250,
    excerpt: "Homeopathy is a 200-year-old system of medicine based on the principle of 'like cures like.' Learn how highly diluted natural substances stimulate your body's innate healing ability.",
  },
  {
    id: "B002",
    title: "5 Natural Remedies for Seasonal Allergies That Actually Work",
    category: "Remedies",
    date: "2025-03-28",
    status: "Published",
    views: 890,
    excerpt: "Struggling with sneezing, watery eyes, and nasal congestion every spring? Discover five time-tested homeopathic remedies that provide lasting relief without drowsiness.",
  },
  {
    id: "B003",
    title: "Homeopathy for Children: A Parent's Complete Guide",
    category: "Pediatrics",
    date: "2025-04-05",
    status: "Published",
    views: 720,
    excerpt: "Is homeopathy safe for kids? Absolutely. Learn which remedies are best for teething, colic, recurrent colds, and behavioral issues — all without side effects.",
  },
];

export const mockDashboardStats = {
  totalPatients: 3,
  appointmentsToday: 0,
  pendingAppointments: 0,
  activePrescriptions: 1,
  totalCases: 3,
  monthlyRevenue: 12400,
  newPatientsThisMonth: 1,
};

export const mockPatientDashboard = {
  patientName: "Saida Begum",
  nextAppointment: { date: "2025-04-20", time: "10:00 AM", type: "Follow-up" },
  activePrescriptions: 1,
  totalVisits: 6,
  pendingOrders: 1,
};
