export interface DayRoute {
  day: number;
  title: string;
  description: string;
  image?: string;
  highlights: string[];
}

export interface FoodItem {
  name: string;
  image: string;
  rating: number;
  description: string;
}

export interface ExpenseItem {
  category: string;
  icon: string;
  amount: number;
  note: string;
}

export interface Diary {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  coverImage: string;
  destination: string;
  country: string;
  startDate: string;
  endDate: string;
  days: number;
  budget: number;
  currency: string;
  transport: string;
  tags: string[];
  summary: string;
  featured: boolean;
  lat: number;
  lng: number;
  dayRoutes: DayRoute[];
  foods: FoodItem[];
  expenses: ExpenseItem[];
  photos: string[];
  tips: string[];
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  destination: string;
  country: string;
  category: string;
  tags: string[];
  summary: string;
  publishDate: string;
  readTime: number;
  traffic: string;
  accommodation: string;
  bestSeason: string;
  avgBudget: number;
  content: GuideSection[];
}

export interface GuideSection {
  type: 'text' | 'tips' | 'list';
  title: string;
  body: string;
  items?: string[];
}

export interface MapPoint {
  id: string;
  diaryId: string;
  title: string;
  destination: string;
  country: string;
  lat: number;
  lng: number;
  coverImage: string;
  slug: string;
}

export interface GuestMessage {
  id: string;
  nickname: string;
  avatar: string;
  content: string;
  createdAt: string;
}
