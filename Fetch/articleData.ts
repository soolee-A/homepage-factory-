export interface Article {
  id: string;
  tags: string[]; // 'all', 'icn_t1', 'icn_t2', 'gmp', 'pus', 'cju', 'cjj'
  category: 'Entry' | 'Transport' | 'Weather' | 'Tech' | 'Culture';
  title: string;
  summary: string;
  content: string;
}

export const survivalArticles: Article[] = [
  // --- [Common: ALL] ---
  {
    id: 'k-eta-scam',
    tags: ['all'],
    category: 'Entry',
    title: 'K-ETA Official vs Scam Sites',
    summary: 'The official fee is only ₩10,000 (~$8). Never pay more than $10!',
    content: 'Only use the .go.kr official website. Scam sites often charge $50+...'
  },
  {
    id: 'naver-map-hack',
    tags: ['all'],
    category: 'Tech',
    title: 'Google Maps Fails in Korea',
    summary: 'Download Naver Map. Use the "Copy-Paste" Hangul trick for 100% accuracy.',
    content: 'Google Maps lacks walking directions. Copy the Korean name from Google and paste it into Naver Map.'
  },
  {
    id: 't-money-cash',
    tags: ['all'],
    category: 'Transport',
    title: 'T-Money: The Cash Requirement',
    summary: 'You need physical CASH to recharge your transit card at convenience stores.',
    content: 'Credit cards don\'t work for T-Money reloads. Keep ₩30,000 cash for transportation.'
  },

  // --- [Incheon: ICN] ---
  {
    id: 'icn-smart-pass',
    tags: ['icn_t1', 'icn_t2'],
    category: 'Entry',
    title: 'ICN SmartPass: Skip the Line',
    summary: 'Register your face on the app to use the VIP-only fast track at Incheon.',
    content: 'Download the ICN SmartPass app. Register your passport and face before arrival.'
  },

  // --- [Jeju: CJU] ---
  {
    id: 'cju-rental-gate',
    tags: ['cju'],
    category: 'Transport',
    title: 'Jeju Rental Car: Find Gate 5',
    summary: 'All rental car shuttles depart from the designated zone outside Gate 5.',
    content: 'Exit Gate 5, cross the walk, and find your rental company\'s shuttle number.'
  },

  // --- [Gimhae/Busan: PUS] ---
  {
    id: 'pus-light-rail',
    tags: ['pus'],
    category: 'Transport',
    title: 'Gimhae Light Rail to Busan',
    summary: 'The quickest way to reach Busan Subway Line 2 & 3.',
    content: 'Follow the purple signs for the Light Rail. It connects to Daejeo and Sasang stations.'
  },

  // --- [Cheongju: CJJ] ---
  {
    id: 'cjj-train-walk',
    tags: ['cjj'],
    category: 'Transport',
    title: 'CJJ Train Station: 10min Walk',
    summary: 'The train station is not inside the terminal. Follow the covered walkway.',
    content: 'Exit the terminal and walk about 600m to reach the Cheongju Airport Korail station.'
  }
];
