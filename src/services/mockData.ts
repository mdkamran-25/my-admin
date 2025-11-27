// Centralized mock data for testing across all pages

export interface MockUser {
  id: string;
  sn: number;
  username: string;
  name: string;
  phone: string;
  email: string;
  points: number;
  wallet: number;
  registrationDate: string;
  lastActiveDate: string;
  status: "active" | "inactive";
  inactiveDays: number;
  hasWhatsapp: boolean;
  city: string;
  state: string;
  deviceBlocked: boolean;
}

export interface MockWithdrawRequest {
  id: string;
  userId: string;
  phone: string;
  name: string;
  username: string;
  amount: number;
  wallet: number;
  requestDate: string;
  status: "Pending" | "Approved" | "Rejected";
  type: "bank" | "upi";
  accountName: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  upiId?: string;
}

export interface MockDepositRequest {
  id: string;
  userId: string;
  phone: string;
  name: string;
  username: string;
  amount: number;
  wallet: number;
  requestDate: string;
  status: "Pending" | "Approved" | "Rejected";
  paymentMethod: "upi" | "bank" | "card";
  transactionId: string;
  upiId?: string;
}

export interface MockGamePlay {
  id: string;
  userId: string;
  username: string;
  phone: string;
  gameType: "main" | "starline";
  gameName: string;
  marketType: string;
  bidNumber: string;
  bidAmount: number;
  winAmount: number;
  playDate: string;
  playTime: string;
  status: "win" | "lose" | "pending";
}

export interface MockActivityLog {
  id: string;
  userId: string;
  username: string;
  phone: string;
  activity: string;
  timestamp: string;
  ipAddress: string;
  device: string;
}

// Generate 50 consistent mock users
export const mockUsers: MockUser[] = [
  {
    id: "1",
    sn: 1,
    username: "sumit123",
    name: "Sumit Kumar",
    phone: "9876543210",
    email: "sumit@example.com",
    points: 15000,
    wallet: 12500,
    registrationDate: "15/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: true,
    city: "Delhi",
    state: "Delhi",
    deviceBlocked: false,
  },
  {
    id: "2",
    sn: 2,
    username: "rajesh456",
    name: "Rajesh Sharma",
    phone: "9876543211",
    email: "rajesh@example.com",
    points: 8500,
    wallet: 5200,
    registrationDate: "18/11/2025",
    lastActiveDate: "26/11/2025",
    status: "active",
    inactiveDays: 1,
    hasWhatsapp: true,
    city: "Mumbai",
    state: "Maharashtra",
    deviceBlocked: false,
  },
  {
    id: "3",
    sn: 3,
    username: "priya789",
    name: "Priya Singh",
    phone: "9876543212",
    email: "priya@example.com",
    points: 3200,
    wallet: 1800,
    registrationDate: "10/11/2025",
    lastActiveDate: "20/11/2025",
    status: "inactive",
    inactiveDays: 7,
    hasWhatsapp: false,
    city: "Bangalore",
    state: "Karnataka",
    deviceBlocked: false,
  },
  {
    id: "4",
    sn: 4,
    username: "amit234",
    name: "Amit Patel",
    phone: "9876543213",
    email: "amit@example.com",
    points: 22000,
    wallet: 18500,
    registrationDate: "12/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: true,
    city: "Ahmedabad",
    state: "Gujarat",
    deviceBlocked: false,
  },
  {
    id: "5",
    sn: 5,
    username: "neha567",
    name: "Neha Gupta",
    phone: "9876543214",
    email: "neha@example.com",
    points: 5600,
    wallet: 3200,
    registrationDate: "20/11/2025",
    lastActiveDate: "25/11/2025",
    status: "active",
    inactiveDays: 2,
    hasWhatsapp: true,
    city: "Pune",
    state: "Maharashtra",
    deviceBlocked: false,
  },
  {
    id: "6",
    sn: 6,
    username: "vikram890",
    name: "Vikram Singh",
    phone: "9876543215",
    email: "vikram@example.com",
    points: 11000,
    wallet: 8900,
    registrationDate: "08/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: true,
    city: "Jaipur",
    state: "Rajasthan",
    deviceBlocked: false,
  },
  {
    id: "7",
    sn: 7,
    username: "kavita321",
    name: "Kavita Reddy",
    phone: "9876543216",
    email: "kavita@example.com",
    points: 4500,
    wallet: 2100,
    registrationDate: "22/11/2025",
    lastActiveDate: "26/11/2025",
    status: "active",
    inactiveDays: 1,
    hasWhatsapp: true,
    city: "Hyderabad",
    state: "Telangana",
    deviceBlocked: false,
  },
  {
    id: "8",
    sn: 8,
    username: "rahul654",
    name: "Rahul Verma",
    phone: "9876543217",
    email: "rahul@example.com",
    points: 18500,
    wallet: 15200,
    registrationDate: "05/11/2025",
    lastActiveDate: "24/11/2025",
    status: "active",
    inactiveDays: 3,
    hasWhatsapp: false,
    city: "Kolkata",
    state: "West Bengal",
    deviceBlocked: false,
  },
  {
    id: "9",
    sn: 9,
    username: "anjali987",
    name: "Anjali Desai",
    phone: "9876543218",
    email: "anjali@example.com",
    points: 6700,
    wallet: 4300,
    registrationDate: "17/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: true,
    city: "Surat",
    state: "Gujarat",
    deviceBlocked: false,
  },
  {
    id: "10",
    sn: 10,
    username: "deepak456",
    name: "Deepak Joshi",
    phone: "9876543219",
    email: "deepak@example.com",
    points: 9200,
    wallet: 6800,
    registrationDate: "14/11/2025",
    lastActiveDate: "23/11/2025",
    status: "inactive",
    inactiveDays: 4,
    hasWhatsapp: true,
    city: "Lucknow",
    state: "Uttar Pradesh",
    deviceBlocked: true,
  },
  {
    id: "11",
    sn: 11,
    username: "pooja111",
    name: "Pooja Mehta",
    phone: "9876543220",
    email: "pooja@example.com",
    points: 13500,
    wallet: 10200,
    registrationDate: "09/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: true,
    city: "Chennai",
    state: "Tamil Nadu",
    deviceBlocked: false,
  },
  {
    id: "12",
    sn: 12,
    username: "sanjay222",
    name: "Sanjay Kumar",
    phone: "9876543221",
    email: "sanjay@example.com",
    points: 7800,
    wallet: 5500,
    registrationDate: "19/11/2025",
    lastActiveDate: "25/11/2025",
    status: "active",
    inactiveDays: 2,
    hasWhatsapp: false,
    city: "Indore",
    state: "Madhya Pradesh",
    deviceBlocked: false,
  },
  {
    id: "13",
    sn: 13,
    username: "meena333",
    name: "Meena Iyer",
    phone: "9876543222",
    email: "meena@example.com",
    points: 5100,
    wallet: 3600,
    registrationDate: "23/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: true,
    city: "Coimbatore",
    state: "Tamil Nadu",
    deviceBlocked: false,
  },
  {
    id: "14",
    sn: 14,
    username: "arun444",
    name: "Arun Nair",
    phone: "9876543223",
    email: "arun@example.com",
    points: 16200,
    wallet: 13800,
    registrationDate: "06/11/2025",
    lastActiveDate: "26/11/2025",
    status: "active",
    inactiveDays: 1,
    hasWhatsapp: true,
    city: "Kochi",
    state: "Kerala",
    deviceBlocked: false,
  },
  {
    id: "15",
    sn: 15,
    username: "ritu555",
    name: "Ritu Bansal",
    phone: "9876543224",
    email: "ritu@example.com",
    points: 3900,
    wallet: 2400,
    registrationDate: "21/11/2025",
    lastActiveDate: "22/11/2025",
    status: "inactive",
    inactiveDays: 5,
    hasWhatsapp: true,
    city: "Chandigarh",
    state: "Punjab",
    deviceBlocked: false,
  },
  {
    id: "16",
    sn: 16,
    username: "manish666",
    name: "Manish Agarwal",
    phone: "9876543225",
    email: "manish@example.com",
    points: 20500,
    wallet: 17300,
    registrationDate: "03/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: true,
    city: "Nagpur",
    state: "Maharashtra",
    deviceBlocked: false,
  },
  {
    id: "17",
    sn: 17,
    username: "swati777",
    name: "Swati Kulkarni",
    phone: "9876543226",
    email: "swati@example.com",
    points: 8900,
    wallet: 6400,
    registrationDate: "16/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: false,
    city: "Nashik",
    state: "Maharashtra",
    deviceBlocked: false,
  },
  {
    id: "18",
    sn: 18,
    username: "rohan888",
    name: "Rohan Malhotra",
    phone: "9876543227",
    email: "rohan@example.com",
    points: 12300,
    wallet: 9700,
    registrationDate: "11/11/2025",
    lastActiveDate: "24/11/2025",
    status: "active",
    inactiveDays: 3,
    hasWhatsapp: true,
    city: "Ludhiana",
    state: "Punjab",
    deviceBlocked: false,
  },
  {
    id: "19",
    sn: 19,
    username: "sneha999",
    name: "Sneha Pillai",
    phone: "9876543228",
    email: "sneha@example.com",
    points: 6200,
    wallet: 4100,
    registrationDate: "24/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: true,
    city: "Thiruvananthapuram",
    state: "Kerala",
    deviceBlocked: false,
  },
  {
    id: "20",
    sn: 20,
    username: "karan000",
    name: "Karan Bhatt",
    phone: "9876543229",
    email: "karan@example.com",
    points: 14700,
    wallet: 11900,
    registrationDate: "07/11/2025",
    lastActiveDate: "26/11/2025",
    status: "active",
    inactiveDays: 1,
    hasWhatsapp: true,
    city: "Vadodara",
    state: "Gujarat",
    deviceBlocked: false,
  },
  {
    id: "21",
    sn: 21,
    username: "sunita101",
    name: "Sunita Rao",
    phone: "9876543230",
    email: "sunita@example.com",
    points: 4800,
    wallet: 3100,
    registrationDate: "13/11/2025",
    lastActiveDate: "21/11/2025",
    status: "inactive",
    inactiveDays: 6,
    hasWhatsapp: false,
    city: "Mangalore",
    state: "Karnataka",
    deviceBlocked: false,
  },
  {
    id: "22",
    sn: 22,
    username: "nitin202",
    name: "Nitin Saxena",
    phone: "9876543231",
    email: "nitin@example.com",
    points: 17800,
    wallet: 14600,
    registrationDate: "04/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: true,
    city: "Kanpur",
    state: "Uttar Pradesh",
    deviceBlocked: false,
  },
  {
    id: "23",
    sn: 23,
    username: "divya303",
    name: "Divya Chopra",
    phone: "9876543232",
    email: "divya@example.com",
    points: 9600,
    wallet: 7200,
    registrationDate: "25/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: true,
    city: "Amritsar",
    state: "Punjab",
    deviceBlocked: false,
  },
  {
    id: "24",
    sn: 24,
    username: "ashok404",
    name: "Ashok Menon",
    phone: "9876543233",
    email: "ashok@example.com",
    points: 11800,
    wallet: 9100,
    registrationDate: "15/11/2025",
    lastActiveDate: "25/11/2025",
    status: "active",
    inactiveDays: 2,
    hasWhatsapp: true,
    city: "Bhopal",
    state: "Madhya Pradesh",
    deviceBlocked: false,
  },
  {
    id: "25",
    sn: 25,
    username: "rekha505",
    name: "Rekha Sinha",
    phone: "9876543234",
    email: "rekha@example.com",
    points: 5400,
    wallet: 3800,
    registrationDate: "26/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: false,
    city: "Patna",
    state: "Bihar",
    deviceBlocked: false,
  },
  {
    id: "26",
    sn: 26,
    username: "gaurav606",
    name: "Gaurav Tripathi",
    phone: "9876543235",
    email: "gaurav@example.com",
    points: 19200,
    wallet: 16400,
    registrationDate: "02/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: true,
    city: "Varanasi",
    state: "Uttar Pradesh",
    deviceBlocked: false,
  },
  {
    id: "27",
    sn: 27,
    username: "preeti707",
    name: "Preeti Sharma",
    phone: "9876543236",
    email: "preeti@example.com",
    points: 7100,
    wallet: 5300,
    registrationDate: "18/11/2025",
    lastActiveDate: "23/11/2025",
    status: "inactive",
    inactiveDays: 4,
    hasWhatsapp: true,
    city: "Jaipur",
    state: "Rajasthan",
    deviceBlocked: true,
  },
  {
    id: "28",
    sn: 28,
    username: "sachin808",
    name: "Sachin Pandey",
    phone: "9876543237",
    email: "sachin@example.com",
    points: 13900,
    wallet: 11100,
    registrationDate: "10/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: true,
    city: "Guwahati",
    state: "Assam",
    deviceBlocked: false,
  },
  {
    id: "29",
    sn: 29,
    username: "nisha909",
    name: "Nisha Kapoor",
    phone: "9876543238",
    email: "nisha@example.com",
    points: 8300,
    wallet: 6100,
    registrationDate: "20/11/2025",
    lastActiveDate: "26/11/2025",
    status: "active",
    inactiveDays: 1,
    hasWhatsapp: false,
    city: "Dehradun",
    state: "Uttarakhand",
    deviceBlocked: false,
  },
  {
    id: "30",
    sn: 30,
    username: "rajat010",
    name: "Rajat Bose",
    phone: "9876543239",
    email: "rajat@example.com",
    points: 16500,
    wallet: 13700,
    registrationDate: "08/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: true,
    city: "Kolkata",
    state: "West Bengal",
    deviceBlocked: false,
  },
  {
    id: "31",
    sn: 31,
    username: "anita011",
    name: "Anita Das",
    phone: "9876543240",
    email: "anita@example.com",
    points: 4600,
    wallet: 2900,
    registrationDate: "22/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: true,
    city: "Ranchi",
    state: "Jharkhand",
    deviceBlocked: false,
  },
  {
    id: "32",
    sn: 32,
    username: "vishal012",
    name: "Vishal Yadav",
    phone: "9876543241",
    email: "vishal@example.com",
    points: 21000,
    wallet: 18200,
    registrationDate: "01/11/2025",
    lastActiveDate: "26/11/2025",
    status: "active",
    inactiveDays: 1,
    hasWhatsapp: true,
    city: "Agra",
    state: "Uttar Pradesh",
    deviceBlocked: false,
  },
  {
    id: "33",
    sn: 33,
    username: "pallavi013",
    name: "Pallavi Jain",
    phone: "9876543242",
    email: "pallavi@example.com",
    points: 9800,
    wallet: 7500,
    registrationDate: "14/11/2025",
    lastActiveDate: "24/11/2025",
    status: "active",
    inactiveDays: 3,
    hasWhatsapp: true,
    city: "Udaipur",
    state: "Rajasthan",
    deviceBlocked: false,
  },
  {
    id: "34",
    sn: 34,
    username: "harish014",
    name: "Harish Shetty",
    phone: "9876543243",
    email: "harish@example.com",
    points: 12600,
    wallet: 10300,
    registrationDate: "12/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: false,
    city: "Mysore",
    state: "Karnataka",
    deviceBlocked: false,
  },
  {
    id: "35",
    sn: 35,
    username: "ritika015",
    name: "Ritika Arora",
    phone: "9876543244",
    email: "ritika@example.com",
    points: 6500,
    wallet: 4700,
    registrationDate: "19/11/2025",
    lastActiveDate: "22/11/2025",
    status: "inactive",
    inactiveDays: 5,
    hasWhatsapp: true,
    city: "Noida",
    state: "Uttar Pradesh",
    deviceBlocked: false,
  },
  {
    id: "36",
    sn: 36,
    username: "suresh016",
    name: "Suresh Nambiar",
    phone: "9876543245",
    email: "suresh@example.com",
    points: 18900,
    wallet: 15800,
    registrationDate: "05/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: true,
    city: "Kozhikode",
    state: "Kerala",
    deviceBlocked: false,
  },
  {
    id: "37",
    sn: 37,
    username: "geeta017",
    name: "Geeta Pandey",
    phone: "9876543246",
    email: "geeta@example.com",
    points: 7400,
    wallet: 5600,
    registrationDate: "17/11/2025",
    lastActiveDate: "25/11/2025",
    status: "active",
    inactiveDays: 2,
    hasWhatsapp: true,
    city: "Allahabad",
    state: "Uttar Pradesh",
    deviceBlocked: false,
  },
  {
    id: "38",
    sn: 38,
    username: "mahesh018",
    name: "Mahesh Kamat",
    phone: "9876543247",
    email: "mahesh@example.com",
    points: 15300,
    wallet: 12800,
    registrationDate: "09/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: false,
    city: "Goa",
    state: "Goa",
    deviceBlocked: false,
  },
  {
    id: "39",
    sn: 39,
    username: "lata019",
    name: "Lata Deshmukh",
    phone: "9876543248",
    email: "lata@example.com",
    points: 5900,
    wallet: 4200,
    registrationDate: "23/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: true,
    city: "Aurangabad",
    state: "Maharashtra",
    deviceBlocked: false,
  },
  {
    id: "40",
    sn: 40,
    username: "jatin020",
    name: "Jatin Khanna",
    phone: "9876543249",
    email: "jatin@example.com",
    points: 22500,
    wallet: 19300,
    registrationDate: "03/11/2025",
    lastActiveDate: "26/11/2025",
    status: "active",
    inactiveDays: 1,
    hasWhatsapp: true,
    city: "Faridabad",
    state: "Haryana",
    deviceBlocked: false,
  },
  {
    id: "41",
    sn: 41,
    username: "shweta021",
    name: "Shweta Mishra",
    phone: "9876543250",
    email: "shweta@example.com",
    points: 10400,
    wallet: 8100,
    registrationDate: "16/11/2025",
    lastActiveDate: "24/11/2025",
    status: "active",
    inactiveDays: 3,
    hasWhatsapp: true,
    city: "Meerut",
    state: "Uttar Pradesh",
    deviceBlocked: false,
  },
  {
    id: "42",
    sn: 42,
    username: "alok022",
    name: "Alok Dubey",
    phone: "9876543251",
    email: "alok@example.com",
    points: 13200,
    wallet: 10700,
    registrationDate: "11/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: false,
    city: "Raipur",
    state: "Chhattisgarh",
    deviceBlocked: false,
  },
  {
    id: "43",
    sn: 43,
    username: "madhuri023",
    name: "Madhuri Pawar",
    phone: "9876543252",
    email: "madhuri@example.com",
    points: 8700,
    wallet: 6600,
    registrationDate: "21/11/2025",
    lastActiveDate: "26/11/2025",
    status: "active",
    inactiveDays: 1,
    hasWhatsapp: true,
    city: "Thane",
    state: "Maharashtra",
    deviceBlocked: false,
  },
  {
    id: "44",
    sn: 44,
    username: "naveen024",
    name: "Naveen Garg",
    phone: "9876543253",
    email: "naveen@example.com",
    points: 17100,
    wallet: 14400,
    registrationDate: "06/11/2025",
    lastActiveDate: "23/11/2025",
    status: "inactive",
    inactiveDays: 4,
    hasWhatsapp: true,
    city: "Gurgaon",
    state: "Haryana",
    deviceBlocked: true,
  },
  {
    id: "45",
    sn: 45,
    username: "tanvi025",
    name: "Tanvi Shah",
    phone: "9876543254",
    email: "tanvi@example.com",
    points: 6900,
    wallet: 5100,
    registrationDate: "18/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: true,
    city: "Rajkot",
    state: "Gujarat",
    deviceBlocked: false,
  },
  {
    id: "46",
    sn: 46,
    username: "prakash026",
    name: "Prakash Rane",
    phone: "9876543255",
    email: "prakash@example.com",
    points: 14100,
    wallet: 11600,
    registrationDate: "13/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: false,
    city: "Solapur",
    state: "Maharashtra",
    deviceBlocked: false,
  },
  {
    id: "47",
    sn: 47,
    username: "seema027",
    name: "Seema Malhotra",
    phone: "9876543256",
    email: "seema@example.com",
    points: 5700,
    wallet: 3900,
    registrationDate: "24/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: true,
    city: "Jalandhar",
    state: "Punjab",
    deviceBlocked: false,
  },
  {
    id: "48",
    sn: 48,
    username: "hemant028",
    name: "Hemant Rai",
    phone: "9876543257",
    email: "hemant@example.com",
    points: 19700,
    wallet: 16900,
    registrationDate: "04/11/2025",
    lastActiveDate: "26/11/2025",
    status: "active",
    inactiveDays: 1,
    hasWhatsapp: true,
    city: "Jodhpur",
    state: "Rajasthan",
    deviceBlocked: false,
  },
  {
    id: "49",
    sn: 49,
    username: "priyanka029",
    name: "Priyanka Bhardwaj",
    phone: "9876543258",
    email: "priyanka@example.com",
    points: 11500,
    wallet: 9200,
    registrationDate: "15/11/2025",
    lastActiveDate: "25/11/2025",
    status: "active",
    inactiveDays: 2,
    hasWhatsapp: true,
    city: "Shimla",
    state: "Himachal Pradesh",
    deviceBlocked: false,
  },
  {
    id: "50",
    sn: 50,
    username: "tarun030",
    name: "Tarun Goswami",
    phone: "9876543259",
    email: "tarun@example.com",
    points: 23100,
    wallet: 20500,
    registrationDate: "01/11/2025",
    lastActiveDate: "27/11/2025",
    status: "active",
    inactiveDays: 0,
    hasWhatsapp: true,
    city: "Visakhapatnam",
    state: "Andhra Pradesh",
    deviceBlocked: false,
  },
];

// Generate withdrawal requests based on users
const generateWithdrawRequests = (): MockWithdrawRequest[] => {
  const requests: MockWithdrawRequest[] = [];
  const statuses: ("Pending" | "Approved" | "Rejected")[] = [
    "Pending",
    "Approved",
    "Rejected",
  ];
  const types: ("bank" | "upi")[] = ["bank", "upi"];
  const dates = [
    "22/11/2025",
    "23/11/2025",
    "24/11/2025",
    "25/11/2025",
    "26/11/2025",
    "27/11/2025",
  ];
  const bankNames = [
    "HDFC Bank",
    "ICICI Bank",
    "State Bank of India",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "IDBI Bank",
  ];

  mockUsers.slice(0, 35).forEach((user, index) => {
    const status = statuses[index % 3];
    const type = types[index % 2];
    const dateIndex = index % 6;
    const hour = Math.floor(Math.random() * 12) + 1;
    const minute = Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0");
    const ampm = Math.random() > 0.5 ? "AM" : "PM";

    requests.push({
      id: `wr-${user.id}`,
      userId: user.id,
      phone: user.phone,
      name: user.name,
      username: user.username,
      amount: Math.floor(Math.random() * 10000) + 500,
      wallet: user.wallet,
      requestDate: `${dates[dateIndex]} ${hour}:${minute} ${ampm}`,
      status,
      type,
      accountName: user.name.toUpperCase(),
      bankName: bankNames[index % bankNames.length],
      accountNumber: `${Math.floor(Math.random() * 90000000000) + 10000000000}`,
      ifsc: `${bankNames[index % bankNames.length]
        .substring(0, 4)
        .toUpperCase()}0${Math.floor(Math.random() * 900000) + 100000}`,
      upiId: type === "upi" ? `${user.phone}@paytm` : undefined,
    });
  });

  return requests;
};

export const mockWithdrawRequests: MockWithdrawRequest[] =
  generateWithdrawRequests();

// Generate deposit requests
const generateDepositRequests = (): MockDepositRequest[] => {
  const requests: MockDepositRequest[] = [];
  const statuses: ("Pending" | "Approved" | "Rejected")[] = [
    "Pending",
    "Approved",
    "Rejected",
  ];
  const paymentMethods: ("upi" | "bank" | "card")[] = ["upi", "bank", "card"];
  const dates = [
    "22/11/2025 10:30 AM",
    "23/11/2025 02:15 PM",
    "24/11/2025 09:45 AM",
    "25/11/2025 04:20 PM",
    "26/11/2025 11:00 AM",
    "27/11/2025 03:30 PM",
  ];

  mockUsers.slice(0, 40).forEach((user, index) => {
    const numRequests = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < numRequests; i++) {
      const paymentMethod =
        paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
      requests.push({
        id: `dep-${user.id}-${i}`,
        userId: user.id,
        phone: user.phone,
        name: user.name,
        username: user.username,
        amount: [100, 200, 500, 1000, 2000, 5000][
          Math.floor(Math.random() * 6)
        ],
        wallet: user.wallet,
        requestDate: dates[Math.floor(Math.random() * dates.length)],
        status:
          index < 15 ? "Pending" : statuses[Math.floor(Math.random() * 3)],
        paymentMethod,
        transactionId: `TXN${Date.now()}${Math.random()
          .toString(36)
          .substr(2, 9)
          .toUpperCase()}`,
        upiId: paymentMethod === "upi" ? `${user.username}@upi` : undefined,
      });
    }
  });

  return requests;
};

export const mockDepositRequests: MockDepositRequest[] =
  generateDepositRequests();

// Generate game plays
const generateGamePlays = (): MockGamePlay[] => {
  const plays: MockGamePlay[] = [];
  const gameNames = [
    "Kalyan",
    "Milan Day",
    "Milan Night",
    "Rajdhani Day",
    "Rajdhani Night",
    "Time Bazar",
    "Main Bazar",
    "Kalyan Night",
  ];
  const starlineGames = [
    "Starline Morning",
    "Starline Afternoon",
    "Starline Evening",
    "Starline Night",
  ];
  const marketTypes = [
    "Single",
    "Jodi",
    "Single Patti",
    "Double Patti",
    "Triple Patti",
  ];
  const statuses: ("win" | "lose" | "pending")[] = ["win", "lose", "pending"];
  const dates = [
    "22/11/2025",
    "23/11/2025",
    "24/11/2025",
    "25/11/2025",
    "26/11/2025",
    "27/11/2025",
  ];

  mockUsers.forEach((user) => {
    const numPlays = Math.floor(Math.random() * 15) + 5;

    for (let i = 0; i < numPlays; i++) {
      const gameType: "main" | "starline" =
        Math.random() > 0.3 ? "main" : "starline";
      const gameName =
        gameType === "main"
          ? gameNames[Math.floor(Math.random() * gameNames.length)]
          : starlineGames[Math.floor(Math.random() * starlineGames.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const bidAmount = [10, 50, 100, 200, 500, 1000][
        Math.floor(Math.random() * 6)
      ];
      const winAmount =
        status === "win"
          ? bidAmount * (Math.floor(Math.random() * 80) + 10)
          : 0;

      plays.push({
        id: `gp-${user.id}-${i}`,
        userId: user.id,
        username: user.username,
        phone: user.phone,
        gameType,
        gameName,
        marketType: marketTypes[Math.floor(Math.random() * marketTypes.length)],
        bidNumber: `${Math.floor(Math.random() * 1000)}`,
        bidAmount,
        winAmount,
        playDate: dates[Math.floor(Math.random() * dates.length)],
        playTime: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(
          Math.random() * 60
        )
          .toString()
          .padStart(2, "0")} ${Math.random() > 0.5 ? "AM" : "PM"}`,
        status,
      });
    }
  });

  return plays;
};

export const mockGamePlays: MockGamePlay[] = generateGamePlays();

// Generate activity logs
const generateActivityLogs = (): MockActivityLog[] => {
  const logs: MockActivityLog[] = [];
  const activities = [
    "Login",
    "Logout",
    "Bid Placed",
    "Withdrawal Request",
    "Profile Updated",
    "Password Changed",
    "Points Added",
    "Game Played",
    "Fund Transfer",
    "Bid Cancelled",
  ];
  const dates = [
    "22/11/2025",
    "23/11/2025",
    "24/11/2025",
    "25/11/2025",
    "26/11/2025",
    "27/11/2025",
  ];
  const devices = ["Android", "iOS", "Web", "Mobile Web"];

  mockUsers.forEach((user) => {
    const numLogs = Math.floor(Math.random() * 15) + 10;

    for (let i = 0; i < numLogs; i++) {
      logs.push({
        id: `al-${user.id}-${i}`,
        userId: user.id,
        username: user.username,
        phone: user.phone,
        activity: activities[Math.floor(Math.random() * activities.length)],
        timestamp: `${dates[Math.floor(Math.random() * dates.length)]} ${
          Math.floor(Math.random() * 12) + 1
        }:${Math.floor(Math.random() * 60)
          .toString()
          .padStart(2, "0")} ${Math.random() > 0.5 ? "AM" : "PM"}`,
        ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(
          Math.random() * 255
        )}`,
        device: devices[Math.floor(Math.random() * devices.length)],
      });
    }
  });

  return logs.sort((a, b) => {
    // Sort by date descending (most recent first)
    const dateA = new Date(
      a.timestamp.split(" ")[0].split("/").reverse().join("-")
    );
    const dateB = new Date(
      b.timestamp.split(" ")[0].split("/").reverse().join("-")
    );
    return dateB.getTime() - dateA.getTime();
  });
};

export const mockActivityLogs: MockActivityLog[] = generateActivityLogs();

// Utility functions
export const getUserById = (id: string): MockUser | undefined => {
  return mockUsers.find((user) => user.id === id);
};

export const getUserByPhone = (phone: string): MockUser | undefined => {
  return mockUsers.find((user) => user.phone === phone);
};

export const getUserByUsername = (username: string): MockUser | undefined => {
  return mockUsers.find(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  );
};

export const getUserWithdrawRequests = (
  userId: string
): MockWithdrawRequest[] => {
  return mockWithdrawRequests.filter((req) => req.userId === userId);
};

export const getUserGamePlays = (userId: string): MockGamePlay[] => {
  return mockGamePlays.filter((play) => play.userId === userId);
};

export const getUserActivityLogs = (userId: string): MockActivityLog[] => {
  return mockActivityLogs.filter((log) => log.userId === userId);
};

// Get statistics
export const getStats = () => {
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter((u) => u.status === "active").length;
  const inactiveUsers = mockUsers.filter((u) => u.status === "inactive").length;
  const blockedDevices = mockUsers.filter((u) => u.deviceBlocked).length;

  const totalWithdrawals = mockWithdrawRequests.reduce(
    (sum, req) => sum + req.amount,
    0
  );
  const pendingWithdrawals = mockWithdrawRequests.filter(
    (req) => req.status === "Pending"
  ).length;
  const approvedWithdrawals = mockWithdrawRequests.filter(
    (req) => req.status === "Approved"
  ).length;
  const rejectedWithdrawals = mockWithdrawRequests.filter(
    (req) => req.status === "Rejected"
  ).length;

  const totalGames = mockGamePlays.length;
  const totalWins = mockGamePlays.filter(
    (play) => play.status === "win"
  ).length;
  const totalLosses = mockGamePlays.filter(
    (play) => play.status === "lose"
  ).length;
  const pendingGames = mockGamePlays.filter(
    (play) => play.status === "pending"
  ).length;

  return {
    users: {
      total: totalUsers,
      active: activeUsers,
      inactive: inactiveUsers,
      blocked: blockedDevices,
    },
    withdrawals: {
      total: totalWithdrawals,
      pending: pendingWithdrawals,
      approved: approvedWithdrawals,
      rejected: rejectedWithdrawals,
    },
    games: {
      total: totalGames,
      wins: totalWins,
      losses: totalLosses,
      pending: pendingGames,
    },
  };
};
