export interface Airport {
  code: string;
  name: string;
  city: string;
  terminal: string;
  is24Hours: boolean;
  curfewStart?: number;
  curfewEnd?: number;
  fact2026?: string;
  curfewWarning?: string;
}

export interface Transport {
  type: "train" | "bus" | "taxi" | "pass";
  name: string;
  duration: string;
  priceKRW: string;
  firstDeparture: string;
  lastDeparture: string;
  bookingUrl: string;
  tip?: string;
}

export interface TimeGuide {
  title: string;
  availability: "High" | "Limited" | "None";
  description: string;
  youtubeId: string;
  steps: string[];
}

export const airports: Airport[] = [
  {
    code: "ICN",
    name: "Incheon International Airport",
    city: "Seoul",
    terminal: "T1 / T2",
    is24Hours: true,
    fact2026: "T2 Phase 4 expansion complete — capacity now 100M passengers/year.",
  },
  {
    code: "GMP",
    name: "Gimpo International Airport",
    city: "Seoul",
    terminal: "Domestic / International",
    is24Hours: false,
    curfewStart: 23,
    curfewEnd: 6,
    curfewWarning: "Flights landing after 23:00 may be diverted to Incheon.",
  },
  {
    code: "CJU",
    name: "Jeju International Airport",
    city: "Jeju Island",
    terminal: "T1",
    is24Hours: false,
    curfewStart: 23,
    curfewEnd: 6,
    fact2026: "Korea's busiest domestic route: Seoul–Jeju. Verify international schedule carefully.",
    curfewWarning: "Night curfew in effect 23:00–06:00. Pre-book transport in advance.",
  },
  {
    code: "CJJ",
    name: "Cheongju International Airport",
    city: "Cheongju",
    terminal: "T1",
    is24Hours: false,
    curfewStart: 22,
    curfewEnd: 7,
    fact2026: "Gateway to central Korea. Direct charter flights from China, Japan, and Southeast Asia.",
    curfewWarning: "Strict curfew 22:00–07:00. Very limited international flights — verify your schedule.",
  },
  {
    code: "PUS",
    name: "Gimhae International Airport",
    city: "Busan",
    terminal: "International / Domestic",
    is24Hours: false,
    curfewStart: 23,
    curfewEnd: 6,
    fact2026: "Second largest gateway to Korea. Direct links to major Asian hubs.",
    curfewWarning: "Strict night curfew 23:00–06:00. Late flights often diverted to Incheon.",
  },
];

export const airportTimeGuides: Record<string, Record<string, TimeGuide>> = {
  ICN: {
    day: {
      title: "Daytime Transfer (06:00 – 23:00)",
      availability: "High",
      description:
        "All transport options are fully operational. AREX Express is the fastest and most recommended route to Seoul.",
      youtubeId: "Y2XW_K6r8_o",
      steps: [
        "Follow signs for 'Airport Railroad (AREX)' to B1 Level.",
        "Purchase AREX Express ticket at the orange kiosk (₩11,000 to Seoul Station).",
        "Board the express train — no stops, arrives Seoul Station in 43 minutes.",
        "For Gangnam, take AREX to Hongik Univ. station then transfer to Line 2.",
        "Airport Limousine Bus (KAL) available outside Arrival Hall for hotel drop-offs.",
      ],
    },
    night: {
      title: "Late Night Transfer (23:00 – 06:00)",
      availability: "Limited",
      description:
        "AREX trains are stopped. Night Buses N6000/N6001 and taxis are your only options. Budget extra time.",
      youtubeId: "k_H_W0S7kQ0",
      steps: [
        "Go to Arrival Hall Gate 6 (T1) or Public Transport Center (T2).",
        "Find Night Bus N6000 (to Gangnam) or N6001 (to Seoul Station).",
        "Pay with T-Money card (load ₩10,000+) or credit card — buses run 23:50–04:10.",
        "Taxis are available 24/7 but carry a 20–40% late-night surcharge after midnight.",
        "Recommended: Pre-book a Kakao Taxi via the Kakao T app before landing.",
      ],
    },
  },
  GMP: {
    day: {
      title: "Daytime Transfer (06:00 – 23:00)",
      availability: "High",
      description:
        "Metro Lines 5 and 9 provide fast, affordable access to central Seoul and Gangnam.",
      youtubeId: "N7z1Z6y-Z-o",
      steps: [
        "Follow 'Subway' signs to the underground metro station.",
        "Line 9 Express (Gold): Fastest to Gangnam & Yeouido (~30 min, ₩1,550).",
        "Line 5: Best for Gwanghwamun, Dongdaemun, and city center.",
        "Airport Bus 6002 runs to Gangnam directly (40–60 min depending on traffic).",
        "Foreigner Taxi (black): Available outside exit — metered + 20% surcharge applies.",
      ],
    },
    night: {
      title: "Late Night Transfer (23:00 – 06:00)",
      availability: "None",
      description:
        "Airport is CLOSED under night curfew. No metro service. Only taxis from outside the terminal.",
      youtubeId: "6I2H9Z-PskY",
      steps: [
        "No flights land at Gimpo after 23:00 (curfew enforced).",
        "If diverted from ICN, only licensed taxis are available at the terminal exit.",
        "Recommended: Book accommodation near Incheon Airport if arriving after 22:00.",
        "Kakao T or UT (Uber in Korea) apps can help locate available taxis.",
      ],
    },
  },
  CJU: {
    day: {
      title: "Daytime Transfer (06:00 – 23:00)",
      availability: "High",
      description:
        "Renting a car is strongly recommended in Jeju. Limousine Bus 600 is the best public option for downtown.",
      youtubeId: "xZkABBGOwIY",
      steps: [
        "For city center: Take Airport Limousine Bus 600 (₩5,500, ~30 min to Jeju City).",
        "For rental car: Follow 'Rental Car' signs to the free shuttle buses outside arrivals.",
        "All major rental companies (Lotte, AJ, SK) have desks and free shuttles.",
        "Taxis available 24/7 — metered, ~₩10,000 to downtown Jeju City.",
        "Note: Jeju has no metro — a rental car gives maximum freedom to explore.",
      ],
    },
    night: {
      title: "Late Night Transfer (23:00 – 06:00)",
      availability: "Limited",
      description:
        "Bus service ends. Rental car returns also close. Taxis are your primary option.",
      youtubeId: "xZkABBGOwIY",
      steps: [
        "Limousine Bus 600 stops running after 22:30 — plan accordingly.",
        "Taxis are available outside arrivals at all hours (~₩12,000–15,000 to downtown).",
        "Pre-book your rental car to allow after-hours pickup if needed.",
        "Recommended: Book a hotel near the airport if arriving very late.",
      ],
    },
  },
  CJJ: {
    day: {
      title: "Daytime Transfer (07:00 – 22:00)",
      availability: "High",
      description:
        "Express buses to Seoul are the most convenient option. Train requires a short taxi ride to Cheongju Station.",
      youtubeId: "p8F5Z5YgMoA",
      steps: [
        "Airport Express Bus 747: Direct to Seoul's Dong Seoul Terminal (90 min, ₩11,200).",
        "Buses depart from outside the arrivals exit — no reservation needed.",
        "For KTX/train: Take a taxi to Osong Station (~20 min, ₩15,000) for high-speed rail to Seoul.",
        "Local Bus 747 also goes to Cheongju City Center (~30 min, ₩1,800).",
        "Rental cars available at the airport — Cheongju is compact and easy to navigate.",
      ],
    },
    night: {
      title: "Late Night Transfer (22:00 – 07:00)",
      availability: "None",
      description:
        "Curfew begins at 22:00. No public buses or airport services operate. Pre-book transport.",
      youtubeId: "p8F5Z5YgMoA",
      steps: [
        "No flights land at Cheongju after 22:00 — verify your schedule in advance.",
        "If connecting to Cheongju late: take a taxi from Osong KTX Station (~20 min).",
        "Very limited hotel options near airport — book in central Cheongju or near Osong.",
        "Pre-book Kakao T or a private transfer via your hotel concierge.",
      ],
    },
  },
  PUS: {
    day: {
      title: "Daytime Transfer (06:00 – 23:00)",
      availability: "High",
      description:
        "Gimhae Light Rail is the fastest way to connect to Busan Metro Lines 2 and 3.",
      youtubeId: "p8F5Z5YgMoA",
      steps: [
        "Follow signs for 'Light Rail' (Purple line) outside the terminal.",
        "Take Light Rail to Sasang Station (Line 2) or Daejeo Station (Line 3).",
        "Limousine buses are also available to Haeundae and Busan Station areas.",
        "Taxis are readily available — metered, ~₩25,000 to Seomyeon area.",
      ],
    },
    night: {
      title: "Late Night Transfer (23:00 – 06:00)",
      availability: "None",
      description:
        "Airport is CLOSED. No light rail or bus service. Only taxis from outside arrivals.",
      youtubeId: "p8F5Z5YgMoA",
      steps: [
        "Strict 23:00 curfew. Very few flights land near this time.",
        "If arriving late, only licensed taxis are available at the terminal exit.",
        "Pre-booking a taxi via Kakao T is highly recommended.",
      ],
    },
  },
};

export const transportData: Record<string, Transport[]> = {
  ICN: [
    {
      type: "train",
      name: "AREX Express",
      duration: "43 min",
      priceKRW: "₩11,000",
      firstDeparture: "05:15",
      lastDeparture: "22:50",
      bookingUrl: "https://www.arex.or.kr/",
      tip: "Fastest option. No stops. Book in advance to skip queues.",
    },
    {
      type: "bus",
      name: "KAL Airport Limousine",
      duration: "60–90 min",
      priceKRW: "₩18,000",
      firstDeparture: "05:30",
      lastDeparture: "22:30",
      bookingUrl: "https://www.airportlimousine.co.kr/",
      tip: "Door-to-door service to major hotels. Best for heavy luggage.",
    },
    {
      type: "taxi",
      name: "Foreigner Friendly Taxi",
      duration: "60–90 min",
      priceKRW: "₩65,000–90,000",
      firstDeparture: "00:00",
      lastDeparture: "24:00",
      bookingUrl: "https://www.intltaxi.co.kr/",
      tip: "English-speaking drivers. Fixed-price zones available. 20% surcharge after midnight.",
    },
    {
      type: "bus",
      name: "Night Bus N6000",
      duration: "70 min",
      priceKRW: "₩10,000",
      firstDeparture: "23:50",
      lastDeparture: "04:10",
      bookingUrl: "https://www.airportlimousine.co.kr/",
      tip: "Only public night option. T-Money card or credit card accepted.",
    },
  ],
  GMP: [
    {
      type: "train",
      name: "Metro Line 9 (Express)",
      duration: "30 min to Gangnam",
      priceKRW: "₩1,550",
      firstDeparture: "05:32",
      lastDeparture: "23:32",
      bookingUrl: "https://www.seoulmetro.co.kr/",
      tip: "Express skips most stops. Fastest to Yeouido and Gangnam.",
    },
    {
      type: "train",
      name: "Metro Line 5",
      duration: "40 min to City Center",
      priceKRW: "₩1,550",
      firstDeparture: "05:35",
      lastDeparture: "24:00",
      bookingUrl: "https://www.seoulmetro.co.kr/",
      tip: "Connects to Gwanghwamun, Dongdaemun, and the 5-line network.",
    },
    {
      type: "bus",
      name: "Airport Bus 6002",
      duration: "40–60 min",
      priceKRW: "₩3,000",
      firstDeparture: "05:50",
      lastDeparture: "22:40",
      bookingUrl: "https://www.gbis.go.kr/",
      tip: "Direct to Gangnam station area. Can be slow in rush hour.",
    },
  ],
  CJU: [
    {
      type: "bus",
      name: "Limousine Bus 600",
      duration: "30 min",
      priceKRW: "₩5,500",
      firstDeparture: "06:10",
      lastDeparture: "22:30",
      bookingUrl: "https://www.jejubus.info/",
      tip: "Most popular option. Goes to downtown Jeju City and major hotels.",
    },
    {
      type: "taxi",
      name: "Airport Taxi",
      duration: "15 min",
      priceKRW: "₩8,000–12,000",
      firstDeparture: "00:00",
      lastDeparture: "24:00",
      bookingUrl: "https://kakaotaxi.kakao.com/",
      tip: "Readily available. Use Kakao T app for easy booking without language barrier.",
    },
    {
      type: "pass",
      name: "Rental Car Shuttle (Free)",
      duration: "5 min shuttle + pickup",
      priceKRW: "From ₩40,000/day",
      firstDeparture: "06:00",
      lastDeparture: "22:00",
      bookingUrl: "https://www.lotterental.com/",
      tip: "Highly recommended in Jeju. All rental companies have free airport shuttles.",
    },
  ],
  CJJ: [
    {
      type: "bus",
      name: "Express Bus 747 (Seoul)",
      duration: "90 min",
      priceKRW: "₩11,200",
      firstDeparture: "08:00",
      lastDeparture: "20:30",
      bookingUrl: "https://www.kobus.co.kr/",
      tip: "Direct to Seoul's Dong Seoul Terminal. No transfer needed.",
    },
    {
      type: "train",
      name: "KTX via Osong Station",
      duration: "55 min to Seoul",
      priceKRW: "₩14,900",
      firstDeparture: "07:00",
      lastDeparture: "21:00",
      bookingUrl: "https://www.letskorail.com/",
      tip: "Take taxi/bus to Osong KTX Station (~20 min). Book train in advance.",
    },
    {
      type: "taxi",
      name: "Local Taxi",
      duration: "20 min to city",
      priceKRW: "₩12,000–15,000",
      firstDeparture: "00:00",
      lastDeparture: "24:00",
      bookingUrl: "https://kakaotaxi.kakao.com/",
      tip: "For Cheongju city center or Osong KTX station connections.",
    },
  ],
  PUS: [
    {
      type: "train",
      name: "Busan-Gimhae Light Rail",
      duration: "20 min to Sasang",
      priceKRW: "₩1,600",
      firstDeparture: "05:00",
      lastDeparture: "23:30",
      bookingUrl: "http://www.bglrt.com/",
      tip: "Fastest way to Sasang Station (Line 2 transfer).",
    },
    {
      type: "bus",
      name: "Airport Limousine",
      duration: "60 min",
      priceKRW: "₩10,000",
      firstDeparture: "06:00",
      lastDeparture: "22:00",
      bookingUrl: "https://www.bglrt.com/",
      tip: "Direct to Haeundae and Busan Station area hotels.",
    },
    {
      type: "taxi",
      name: "Local Taxi",
      duration: "30–45 min",
      priceKRW: "₩25,000–35,000",
      firstDeparture: "00:00",
      lastDeparture: "24:00",
      bookingUrl: "https://kakaotaxi.kakao.com/",
      tip: "Comfortable and direct to your destination.",
    },
  ],
};
