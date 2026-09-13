import { User, Customer, Address } from "@/lib/models";

export const users: User[] = [
  {
    id: "user-admin",
    email: "Admin@1234",
    password: "Admin@1234",
    firstName: "Admin",
    lastName: "NAVI",
    phone: "+91 9876543210",
    role: "admin",
    status: "active",
    createdAt: "2020-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "user-001",
    email: "priya.sharma@email.com",
    password: "demo123",
    firstName: "Priya",
    lastName: "Sharma",
    phone: "+91 9876543211",
    role: "customer",
    status: "active",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2025-09-01T10:00:00Z",
  },
  {
    id: "user-002",
    email: "ananya.patel@email.com",
    password: "demo123",
    firstName: "Ananya",
    lastName: "Patel",
    phone: "+91 9876543212",
    role: "customer",
    status: "active",
    createdAt: "2024-06-20T10:00:00Z",
    updatedAt: "2025-08-15T10:00:00Z",
  },
  {
    id: "user-003",
    email: "meera.reddy@email.com",
    password: "demo123",
    firstName: "Meera",
    lastName: "Reddy",
    phone: "+91 9876543213",
    role: "customer",
    status: "active",
    createdAt: "2024-09-10T10:00:00Z",
    updatedAt: "2025-09-05T10:00:00Z",
  },
  {
    id: "user-004",
    email: "kavita.singh@email.com",
    password: "demo123",
    firstName: "Kavita",
    lastName: "Singh",
    phone: "+91 9876543214",
    role: "customer",
    status: "inactive",
    createdAt: "2023-12-01T10:00:00Z",
    updatedAt: "2025-07-01T10:00:00Z",
  },
  {
    id: "user-005",
    email: "rahul.verma@email.com",
    password: "demo123",
    firstName: "Rahul",
    lastName: "Verma",
    phone: "+91 9876543215",
    role: "customer",
    status: "active",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-09-08T10:00:00Z",
  },
];

export const addresses: Address[] = [
  {
    id: "addr-001",
    userId: "user-001",
    label: "Home",
    fullName: "Priya Sharma",
    phone: "+91 9876543211",
    addressLine1: "42, Green Park Extension",
    addressLine2: "Near Metro Station",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110016",
    country: "India",
    isDefault: true,
  },
  {
    id: "addr-002",
    userId: "user-002",
    label: "Home",
    fullName: "Ananya Patel",
    phone: "+91 9876543212",
    addressLine1: "15, Satellite Road",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "380015",
    country: "India",
    isDefault: true,
  },
  {
    id: "addr-003",
    userId: "user-003",
    label: "Office",
    fullName: "Meera Reddy",
    phone: "+91 9876543213",
    addressLine1: "88, Jubilee Hills",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500033",
    country: "India",
    isDefault: true,
  },
];

export const customers: Customer[] = users
  .filter((u) => u.role === "customer")
  .map((u) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    email: u.email,
    phone: u.phone,
    status: u.status,
    totalOrders: u.id === "user-001" ? 8 : u.id === "user-002" ? 5 : u.id === "user-003" ? 3 : u.id === "user-005" ? 2 : 1,
    totalSpent: u.id === "user-001" ? 125000 : u.id === "user-002" ? 78000 : u.id === "user-003" ? 45000 : u.id === "user-005" ? 22000 : 8500,
    lastOrderDate: u.id === "user-001" ? "2025-09-08T10:00:00Z" : u.id === "user-002" ? "2025-08-28T10:00:00Z" : "2025-09-05T10:00:00Z",
    registrationDate: u.createdAt,
    notes: u.id === "user-001" ? "VIP customer - prefers silk sarees" : undefined,
    addresses: addresses.filter((a) => a.userId === u.id),
  }));

export function getUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}
