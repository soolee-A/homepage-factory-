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

export const airports: Airport[] = [
  {
    code: "ICN",
    name: "Incheon International Airport",
    city: "Incheon/Seoul",
    terminal: "T1 / T2",
    is24Hours: true,
    fact2026: "T2 Phase 4 expansion complete — capacity now 100M passengers/year.",
  },
  {
    code: "GMP",
    name: "Gimpo International Airport",
    city: "Seoul City",
    terminal: "International / Domestic",
    is24Hours: false,
    curfewStart: 23,
    curfewEnd: 6,
    curfewWarning: "Strict 23:00 curfew. Late flights diverted to ICN.",
  },
  {
    code: "CJU",
    name: "Jeju International Airport",
    city: "Jeju Island",
    terminal: "International / Domestic",
    is24Hours: false,
    curfewStart: 23,
    curfewEnd: 6,
    fact2026: "30-day Visa-free entry for direct international arrivals.",
  },
  {
    code: "CJJ",
    name: "Cheongju International Airport",
    city: "Cheongju / Central Korea",
    terminal: "T1",
    is24Hours: false,
    curfewStart: 22,
    curfewEnd: 7,
    curfewWarning: "Gate to K-Pop tours. Very strict 22:00 curfew.",
  },
  {
    code: "PUS",
    name: "Gimhae International Airport",
    city: "Busan",
    terminal: "International / Domestic",
    is24Hours: false,
    curfewStart: 23,
    curfewEnd: 6,
    curfewWarning: "Main gateway to Southern Korea. 23:00 curfew applies.",
  },
];

export const transportData: Record<string, Transport[]> = {
  ICN: [
    {
      type: "train",
      name: "AREX Express (Orange)",
      duration: "43 min",
      priceKRW: "₩11,000",
      firstDeparture: "05:15",
      lastDeparture: "22:50",
      bookingUrl: "https://www.arex.or.kr/",
      tip: "Direct to Seoul Station. Look for ORANGE gates at B1.",
    },
    {
      type: "bus",
      name: "Airport Limousine (6015 for Myeongdong)",
      duration: "70-90 min",
      priceKRW: "₩17,000",
      firstDeparture: "05:45",
      lastDeparture: "23:15",
      bookingUrl: "http://www.airportlimousine.co.kr/",
      tip: "Platform 5B-1. Keep your 'Claim Tag' for luggage.",
    },
    {
      type: "taxi",
      name: "Private Large Van (Recommended for 3+)",
      duration: "60 min",
      priceKRW: "₩80,000-120,000",
      firstDeparture: "00:00",
      lastDeparture: "24:00",
      bookingUrl: "https://www.klook.com/",
      tip: "Best for families. Standard taxis only fit 2 large suitcases.",
    },
    {
      type: "pass",
      name: "T-Luggage (Baggage Delivery)",
      duration: "Same-day delivery",
      priceKRW: "₩20,000-30,000",
      firstDeparture: "07:00",
      lastDeparture: "22:00",
      bookingUrl: "https://www.zimcarry.net/",
      tip: "Hands-free travel. Deliver your bags from ICN to your Hotel.",
    }
  ],
  GMP: [
    {
      type: "train",
      name: "Metro Line 9 (Express)",
      duration: "30 min",
      priceKRW: "₩1,550",
      firstDeparture: "05:30",
      lastDeparture: "23:30",
      bookingUrl: "https://www.seoulmetro.co.kr/",
      tip: "Fastest way to Gangnam (Yeouido/Bongeunsa).",
    },
    {
      type: "train",
      name: "Metro Line 5",
      duration: "45 min",
      priceKRW: "₩1,550",
      firstDeparture: "05:30",
      lastDeparture: "24:00",
      bookingUrl: "https://www.seoulmetro.co.kr/",
      tip: "Direct to Gwanghwamun and Dongdaemun.",
    },
    {
      type: "taxi",
      name: "Standard Taxi",
      duration: "30-40 min",
      priceKRW: "₩20,000-30,000",
      firstDeparture: "00:00",
      lastDeparture: "24:00",
      bookingUrl: "https://t.kakao.com/",
      tip: "Gimpo is very close to Seoul. Taxi is efficient for 2+ people.",
    }
  ],
  CJU: [
    {
      type: "bus",
      name: "Airport Limousine 600",
      duration: "50 min",
      priceKRW: "₩5,500",
      firstDeparture: "06:00",
      lastDeparture: "22:40",
      bookingUrl: "https://www.jejubus.info/",
      tip: "Goes to Jungmun Resort and Seogwipo. Highly recommended.",
    },
    {
      type: "pass",
      name: "Rental Car Shuttle",
      duration: "10-15 min",
      priceKRW: "Variable",
      firstDeparture: "08:00",
      lastDeparture: "20:00",
      bookingUrl: "https://www.lotterental.com/",
      tip: "Driving is essential in Jeju. Follow 'Rental Car' signs to the bus zone.",
    },
    {
      type: "taxi",
      name: "Jeju Global Taxi",
      duration: "15-20 min",
      priceKRW: "₩10,000-15,000",
      firstDeparture: "00:00",
      lastDeparture: "24:00",
      bookingUrl: "https://www.visitjeju.net/",
      tip: "Fixed-price daily tours available for foreigners.",
    }
  ],
  CJJ: [
    {
      type: "bus",
      name: "Express Bus to Seoul",
      duration: "90 min",
      priceKRW: "₩11,200",
      firstDeparture: "08:30",
      lastDeparture: "20:30",
      bookingUrl: "https://www.kobus.co.kr/",
      tip: "Direct to Seoul Gyeongbu Terminal. Ticket office is at the exit.",
    },
    {
      type: "train",
      name: "Mugunghwa-ho (Cheongju Airport Stn)",
      duration: "100 min",
      priceKRW: "₩9,500",
      firstDeparture: "06:50",
      lastDeparture: "21:30",
      bookingUrl: "https://www.letskorail.com/",
      tip: "Small train station 10 min walk from the terminal. Cheap but slow.",
    },
    {
      type: "taxi",
      name: "Local Taxi to Osong KTX",
      duration: "20 min",
      priceKRW: "₩15,000-20,000",
      firstDeparture: "00:00",
      lastDeparture: "24:00",
      bookingUrl: "https://t.kakao.com/",
      tip: "Take a taxi to Osong Station to catch the high-speed KTX train to Seoul.",
    }
  ],
  PUS: [
    {
      type: "train",
      name: "Gimhae Light Rail",
      duration: "20 min",
      priceKRW: "₩1,600",
      firstDeparture: "05:00",
      lastDeparture: "23:30",
      bookingUrl: "http://www.bglrt.com/",
      tip: "Fastest to Sasang Station. Transfer to Metro Line 2 for Seomyeon.",
    },
    {
      type: "bus",
      name: "Airport Limousine (Haeundae)",
      duration: "60-80 min",
      priceKRW: "₩10,000",
      firstDeparture: "06:50",
      lastDeparture: "22:00",
      bookingUrl: "https://www.bglrt.com/",
      tip: "Direct to major Haeundae hotels. Avoid in rush hour.",
    },
    {
      type: "taxi",
      name: "International Taxi",
      duration: "45 min",
      priceKRW: "₩30,000-45,000",
      firstDeparture: "00:00",
      lastDeparture: "24:00",
      bookingUrl: "https://www.intltaxi.co.kr/",
      tip: "Fixed rates available to Haeundae. No overcharging.",
    }
  ],
};
