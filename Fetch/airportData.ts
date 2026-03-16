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
  { code: "ICN", name: "Incheon International Airport", city: "Seoul", terminal: "T1 / T2", is24Hours: true, fact2026: "T2 Phase 4 expansion complete — capacity now 100M passengers/year." },
  { code: "GMP", name: "Gimpo International Airport", city: "Seoul", terminal: "Domestic / International", is24Hours: false, curfewStart: 23, curfewEnd: 6, curfewWarning: "Flights landing after 23:00 may be diverted to Incheon." },
  { code: "PUS", name: "Gimhae International Airport", city: "Busan", terminal: "Domestic / International", is24Hours: false, curfewStart: 23, curfewEnd: 6, curfewWarning: "Night curfew strictly enforced (23:00 - 06:00)." },
];

export const airportTimeGuides: Record<string, Record<string, TimeGuide>> = {
  ICN: {
    day: {
      title: "Daytime Transfer (06:00 - 23:00)",
      availability: "High",
      description: "All transport options are fully operational. AREX Express is the most recommended.",
      youtubeId: "Y2XW_K6r8_o", // Example AREX guide
      steps: [
        "Follow signs for 'Airport Railroad' (B1 Level).",
        "Purchase AREX Express ticket (₩11,000) at the orange kiosk.",
        "Take the elevator down to the platform.",
        "Arrive at Seoul Station in 43-51 minutes."
      ]
    },
    night: {
      title: "Late Night Transfer (23:00 - 06:00)",
      availability: "Limited",
      description: "Trains are stopped. Only Night Buses and Taxis are available.",
      youtubeId: "k_H_W0S7kQ0", // Example Night Bus guide
      steps: [
        "Go to Arrival Hall, Gate 6 (T1) or Public Transport Center (T2).",
        "Find Night Bus N6000 (to Gangnam) or N6001 (to Seoul Station).",
        "Tap your T-Money card (₩10,000+ recommended) or pay by credit card.",
        "Note: Taxis have a 20-40% late-night surcharge."
      ]
    }
  },
  GMP: {
    day: {
      title: "Daytime Transfer (06:00 - 23:00)",
      availability: "High",
      description: "Metro lines 5 and 9 are very efficient for reaching central Seoul.",
      youtubeId: "N7z1Z6y-Z-o",
      steps: [
        "Follow 'Subway' signs to the underground passage.",
        "Take Line 9 Express (Gold Line) for fast access to Gangnam/Yeouido.",
        "Line 5 is better for Gwanghwamun and Dongdaemun areas."
      ]
    },
    night: {
      title: "Late Night Transfer (23:00 - 06:00)",
      availability: "None",
      description: "Airport is CLOSED. Curfew is in effect. No public transport inside.",
      youtubeId: "6I2H9Z-PskY",
      steps: [
        "No flights land here after 23:00.",
        "Only pre-booked private cars or local taxis are available outside the terminal.",
        "Recommended to stay near Incheon if arriving late."
      ]
    }
  }
};

export const transportData: Record<string, Transport[]> = {
  ICN: [
    { type: "train", name: "AREX Express", duration: "43-51 min", priceKRW: "₩11,000", firstDeparture: "05:15", lastDeparture: "22:50", bookingUrl: "https://www.arex.or.kr/" },
    { type: "bus", name: "Night Bus (N6000)", duration: "70 min", priceKRW: "₩10,000", firstDeparture: "23:50", lastDeparture: "04:10", bookingUrl: "https://www.airportlimousine.co.kr/" },
  ],
  // ... other data remains the same
};
