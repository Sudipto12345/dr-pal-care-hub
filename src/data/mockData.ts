// Mock data for the entire application

export const mockPatients = [
  { id: "P001", name: "Priya Sharma", age: 34, gender: "Female", phone: "+91 98765 11111", email: "priya@email.com", lastVisit: "2025-03-20", status: "Active" },
  { id: "P002", name: "Rajesh Kumar", age: 45, gender: "Male", phone: "+91 98765 22222", email: "rajesh@email.com", lastVisit: "2025-03-18", status: "Active" },
  { id: "P003", name: "Anita Desai", age: 28, gender: "Female", phone: "+91 98765 33333", email: "anita@email.com", lastVisit: "2025-03-15", status: "Active" },
  { id: "P004", name: "Suresh Patel", age: 52, gender: "Male", phone: "+91 98765 44444", email: "suresh@email.com", lastVisit: "2025-02-28", status: "Inactive" },
  { id: "P005", name: "Meera Joshi", age: 39, gender: "Female", phone: "+91 98765 55555", email: "meera@email.com", lastVisit: "2025-03-22", status: "Active" },
];

export const mockAppointments = [
  { id: "A001", patientName: "Priya Sharma", date: "2025-04-15", time: "10:00 AM", type: "Follow-up", status: "Confirmed" },
  { id: "A002", patientName: "Rajesh Kumar", date: "2025-04-15", time: "11:00 AM", type: "First Visit", status: "Pending" },
  { id: "A003", patientName: "Anita Desai", date: "2025-04-16", time: "09:00 AM", type: "Online", status: "Confirmed" },
  { id: "A004", patientName: "Meera Joshi", date: "2025-04-16", time: "02:00 PM", type: "Follow-up", status: "Confirmed" },
  { id: "A005", patientName: "Suresh Patel", date: "2025-04-17", time: "10:30 AM", type: "First Visit", status: "Pending" },
  { id: "A006", patientName: "Priya Sharma", date: "2025-04-18", time: "03:00 PM", type: "Follow-up", status: "Cancelled" },
];

export const mockPrescriptions = [
  { id: "RX001", patientName: "Priya Sharma", date: "2025-03-20", diagnosis: "Chronic Rhinitis", medicines: ["Allium Cepa 30C", "Sabadilla 200C"], status: "Active" },
  { id: "RX002", patientName: "Rajesh Kumar", date: "2025-03-18", diagnosis: "Gastritis", medicines: ["Nux Vomica 200C", "Lycopodium 30C"], status: "Active" },
  { id: "RX003", patientName: "Anita Desai", date: "2025-03-15", diagnosis: "Eczema", medicines: ["Graphites 30C", "Sulphur 200C", "Mezereum 30C"], status: "Completed" },
  { id: "RX004", patientName: "Meera Joshi", date: "2025-03-22", diagnosis: "Migraine", medicines: ["Belladonna 200C", "Iris Versicolor 30C"], status: "Active" },
];

export const mockCases = [
  { id: "C001", patientName: "Priya Sharma", condition: "Chronic Rhinitis", startDate: "2024-11-10", status: "Ongoing", visits: 8 },
  { id: "C002", patientName: "Rajesh Kumar", condition: "Gastritis & IBS", startDate: "2024-09-05", status: "Improving", visits: 12 },
  { id: "C003", patientName: "Anita Desai", condition: "Atopic Eczema", startDate: "2025-01-15", status: "Resolved", visits: 5 },
  { id: "C004", patientName: "Suresh Patel", condition: "Rheumatoid Arthritis", startDate: "2024-06-20", status: "Ongoing", visits: 18 },
  { id: "C005", patientName: "Meera Joshi", condition: "Chronic Migraine", startDate: "2025-02-01", status: "Improving", visits: 4 },
];

export const mockProducts = [
  { id: "PR001", name: "Arnica Montana 30C", category: "Remedy", price: 150, stock: 45, status: "In Stock" },
  { id: "PR002", name: "Nux Vomica 200C", category: "Remedy", price: 180, stock: 32, status: "In Stock" },
  { id: "PR003", name: "Bryonia Alba 30C", category: "Remedy", price: 150, stock: 0, status: "Out of Stock" },
  { id: "PR004", name: "Immunity Booster Kit", category: "Kit", price: 599, stock: 15, status: "In Stock" },
  { id: "PR005", name: "Allergy Relief Kit", category: "Kit", price: 499, stock: 8, status: "Low Stock" },
  { id: "PR006", name: "Stress Relief Drops", category: "Tincture", price: 350, stock: 22, status: "In Stock" },
];

export const mockOrders = [
  { id: "ORD001", date: "2025-04-10", items: ["Arnica Montana 30C", "Immunity Booster Kit"], total: 749, status: "Delivered" },
  { id: "ORD002", date: "2025-04-08", items: ["Stress Relief Drops"], total: 350, status: "Shipped" },
  { id: "ORD003", date: "2025-04-05", items: ["Allergy Relief Kit", "Nux Vomica 200C"], total: 679, status: "Processing" },
];

export const mockBlogPosts = [
  { id: "B001", title: "Understanding Homeopathy: A Beginner's Guide", category: "Education", date: "2025-03-15", status: "Published", views: 1250 },
  { id: "B002", title: "Top 5 Remedies for Seasonal Allergies", category: "Remedies", date: "2025-03-10", status: "Published", views: 890 },
  { id: "B003", title: "Homeopathy for Children: Safe & Effective", category: "Pediatrics", date: "2025-03-05", status: "Published", views: 720 },
  { id: "B004", title: "Managing Stress with Natural Remedies", category: "Wellness", date: "2025-02-28", status: "Draft", views: 0 },
  { id: "B005", title: "The Science Behind Potentization", category: "Education", date: "2025-04-01", status: "Published", views: 450 },
];

export const mockDashboardStats = {
  totalPatients: 156,
  appointmentsToday: 8,
  pendingAppointments: 12,
  activePrescriptions: 45,
  monthlyRevenue: 85600,
  newPatientsThisMonth: 14,
};

export const mockPatientDashboard = {
  nextAppointment: { date: "2025-04-15", time: "10:00 AM", type: "Follow-up" },
  activePrescriptions: 2,
  totalVisits: 8,
  pendingOrders: 1,
};
