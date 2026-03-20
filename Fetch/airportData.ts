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

export interface YoutubeGuide {
  search: string;
  timeline: { time: string; desc: string }[];
}

export interface Transport {
  type: "train" | "bus" | "taxi" | "van" | "walk" | "pass";
  name: string;
  duration: string;
  priceKRW: string;
  firstDeparture: string;
  lastDeparture: string;
  bookingUrl: string;
  bestFor: string;
  tip: string;
  warning?: string;
  steps: string[];
  youtube: YoutubeGuide;
}

export interface AirportArrivalGuide {
  immigrationTips: string[];
  factCheck2026: string;
  sosNumbers: { number: string; label: string }[];
  youtube: YoutubeGuide;
  localSpotlights: { icon: string; title: string; desc: string }[];
}

export const airports: Airport[] = [
  {
    code: "ICN",
    name: "Incheon International Airport",
    city: "Incheon / Seoul",
    terminal: "T1 & T2",
    is24Hours: true,
    fact2026: "T2 Phase 4 expansion complete — capacity now 106M passengers/year. World's #1 airport 2024.",
  },
  {
    code: "GMP",
    name: "Gimpo International Airport",
    city: "Seoul (Western)",
    terminal: "International Terminal",
    is24Hours: false,
    curfewStart: 23,
    curfewEnd: 6,
    curfewWarning: "Strict 23:00 curfew. Late-arriving flights may be diverted to ICN.",
    fact2026: "Direct routes to Tokyo Haneda, Beijing, Shanghai, and Taipei only.",
  },
  {
    code: "CJU",
    name: "Jeju International Airport",
    city: "Jeju Island",
    terminal: "International / Domestic",
    is24Hours: false,
    curfewStart: 23,
    curfewEnd: 6,
    fact2026: "Visa-free 30-day entry for direct international arrivals to Jeju only (not mainland Korea).",
  },
  {
    code: "CJJ",
    name: "Cheongju International Airport",
    city: "Cheongju / Central Korea",
    terminal: "T1",
    is24Hours: false,
    curfewStart: 22,
    curfewEnd: 7,
    curfewWarning: "22:00 strict curfew. Popular K-Pop tour gateway. Very small terminal.",
    fact2026: "Growing international routes to China, Southeast Asia. Closest airport to Gongju & Buyeo historic sites.",
  },
  {
    code: "PUS",
    name: "Gimhae International Airport",
    city: "Busan",
    terminal: "International / Domestic",
    is24Hours: false,
    curfewStart: 23,
    curfewEnd: 6,
    curfewWarning: "23:00 curfew. Gateway to Southern Korea — Busan, Gyeongju, Tongyeong.",
    fact2026: "New Gadeokdo Airport under construction (2029). Gimhae remains primary until then.",
  },
];

// ── Airport-specific arrival guide ─────────────────────────────────────
export const arrivalGuides: Record<string, AirportArrivalGuide> = {
  ICN: {
    immigrationTips: [
      "If you land at T1 on a foreign/LCC airline → you MUST take the FREE underground Shuttle Train to the main terminal before immigration. Follow YELLOW signs.",
      "T2 passengers (Korean Air, Delta, Air France) → immigration is in the same building. No train needed.",
      "Photography is strictly prohibited at immigration. Remove hats, hoods, masks, and sunglasses at the desk.",
      "Use the automated e-Gate with eligible passports (US, EU, UK, Japan, etc.) — takes 30 seconds vs 15 min manual queue.",
      "After claiming bags → choose: AREX (B1 train), Limousine Bus (Floor 1, Exits 5-9), or Taxi (Floor 1, Exits 4-7).",
    ],
    factCheck2026: "K-ETA cost: ₩10,000 ($7.50 USD). Official site: k-eta.go.kr — never pay through third parties.",
    sosNumbers: [
      { number: "1330", label: "Korea Tourism Hotline (24/7, English)" },
      { number: "112", label: "Police" },
      { number: "119", label: "Medical / Fire" },
    ],
    youtube: {
      search: "Incheon Airport T1 arrival immigration step by step 2025",
      timeline: [
        { time: "00:30", desc: "Aircraft docks at satellite concourse — follow yellow ARRIVALS signs, NOT departures." },
        { time: "02:00", desc: "Descend to B1 → board the free Airside Shuttle Train (runs every 3 min)." },
        { time: "08:00", desc: "Exit train at main terminal → follow green IMMIGRATION signs upstairs." },
        { time: "12:00", desc: "At immigration kiosk: remove accessories, place both index fingers on scanner, look at camera." },
        { time: "18:00", desc: "Collect checked baggage from carousel (check screen for belt number)." },
        { time: "22:00", desc: "Exit through customs → turn LEFT for AREX train, straight for buses & taxis." },
      ],
    },
    localSpotlights: [
      { icon: "🏢", title: "Duty Free & Convenience", desc: "CU, GS25, and Tourist USIM booths are at Floor 1 arrivals before you exit." },
      { icon: "💰", title: "Currency Exchange", desc: "Skip airport counters — rates are 5% worse. Exchange $30 max for immediate needs only." },
      { icon: "🧳", title: "T-Luggage Counter", desc: "Between Exits 4-6 on Floor 1. Send bags to your hotel for ₩15,000-25,000. Same-day delivery." },
    ],
  },
  GMP: {
    immigrationTips: [
      "Gimpo is compact — immigration is a 3-minute walk from the gate. No shuttle train needed.",
      "International Terminal only handles: Japan (Tokyo Haneda, Osaka), China (Beijing, Shanghai), Taiwan (Taipei).",
      "Remove shoes if requested at security (rare, but possible at GMP for additional checks).",
      "Bags arrive fast — Gimpo carousels are usually populated within 15 min of landing.",
      "Exit through customs → immediately enter the arrivals hall. Subway entrance is 50m away.",
    ],
    factCheck2026: "Gimpo only handles short-haul Asia routes. If you see ICN on your ticket, you're at the wrong airport.",
    sosNumbers: [
      { number: "1330", label: "Korea Tourism Hotline (24/7, English)" },
      { number: "02-2660-2114", label: "Gimpo Airport Office" },
      { number: "119", label: "Medical / Fire" },
    ],
    youtube: {
      search: "Gimpo International Airport arrival guide subway 2024",
      timeline: [
        { time: "00:30", desc: "Deplane → follow ARRIVALS signs. Gimpo is small — everything is close together." },
        { time: "05:00", desc: "Reach immigration desks. Automated gates available for eligible passports." },
        { time: "12:00", desc: "Collect bags → proceed through customs (green channel if nothing to declare)." },
        { time: "15:00", desc: "Exit to arrivals hall → subway entrance is visible immediately on your left." },
        { time: "17:00", desc: "Buy T-Money card or tap your card at Line 5 or Line 9 turnstile." },
      ],
    },
    localSpotlights: [
      { icon: "🚇", title: "Subway Directly Below", desc: "Line 5 and Line 9 are inside the terminal building. Seoul in 30-45 min." },
      { icon: "🏙️", title: "Closest Airport to Seoul City", desc: "Taxi to Hongdae: ~₩15,000. Faster than ICN by 30-40 min total travel time." },
      { icon: "✈️", title: "Domestic Connections", desc: "Domestic terminal is separate. Jeju/Busan flights depart from the domestic side." },
    ],
  },
  CJU: {
    immigrationTips: [
      "Jeju is small — immigration to exit takes ~20 min total on average.",
      "VISA-FREE ENTRY: Most nationalities entering directly from abroad get 30 days visa-free ON JEJU ISLAND only.",
      "Critical: The Jeju visa-free status does NOT allow travel to mainland Korea. You need a proper visa for Seoul.",
      "Photography banned at immigration as always. Jeju officers are strict about this.",
      "After exit, rent a car immediately if your plan involves Jeju's outer attractions — public transport is limited.",
    ],
    factCheck2026: "Jeju visa-free applies to 112+ nationalities for direct international arrivals only. Check the official list at hikorea.go.kr before booking.",
    sosNumbers: [
      { number: "1330", label: "Korea Tourism / Jeju Hotline (English)" },
      { number: "064-797-2114", label: "Jeju Airport Official" },
      { number: "119", label: "Medical / Fire" },
    ],
    youtube: {
      search: "Jeju Airport arrival guide rental car bus tourist 2024",
      timeline: [
        { time: "00:30", desc: "Land → immigration is a short walk. Check visa-free eligibility board at the entrance." },
        { time: "08:00", desc: "Pass immigration → collect bags → exit customs." },
        { time: "12:00", desc: "RENTAL CAR: Follow 'Rental Car Shuttle' signs outside exit. Free shuttle to rental lot (10 min)." },
        { time: "14:00", desc: "BUS 600: Turn left outside exit → Bus stop 3. Limousine to Seogwipo/Jungmun (50 min)." },
        { time: "16:00", desc: "TAXI: Jeju Global Taxi stand is outside Exit 1. Fixed-price to Jeju City: ~₩10,000." },
      ],
    },
    localSpotlights: [
      { icon: "🚗", title: "Renting a Car is Highly Recommended", desc: "Jeju's best spots (Hallasan, Seongsan, Manjanggul) are hard to reach without a car. Book in advance online." },
      { icon: "🌺", title: "Jeju Unique Attractions", desc: "Hallasan volcano, black lava beaches, tangerine farms, and olle trails. Very different from mainland Korea." },
      { icon: "🍊", title: "Local Must-Buy", desc: "Fresh Jeju tangerines (감귤) at the airport arrival hall — buy a bag before you leave." },
    ],
  },
  CJJ: {
    immigrationTips: [
      "Cheongju Airport is tiny — the entire terminal fits in one building. Exit takes ~15 min.",
      "Immigration has only a few desks. Wait times can be long during peak China/SE Asia arrivals.",
      "After exit → turn right for bus tickets, left for taxis.",
      "There is NO rail connection directly from the terminal. You must take a bus or taxi first.",
      "The airport is 12km north of Cheongju city, but most travelers transit to Seoul or Daejeon.",
    ],
    factCheck2026: "CJJ is Korea's 5th busiest airport but 2nd smallest terminal. New international routes to Vietnam, Thailand added in 2024.",
    sosNumbers: [
      { number: "1330", label: "Korea Tourism Hotline (English)" },
      { number: "043-210-6114", label: "Cheongju Airport Office" },
      { number: "119", label: "Medical / Fire" },
    ],
    youtube: {
      search: "청주국제공항 입국 버스 서울 가는법 2024",
      timeline: [
        { time: "00:30", desc: "Land → very short walk to immigration. Only 1-2 immigration lanes open typically." },
        { time: "10:00", desc: "Collect bags → exit customs to arrivals hall." },
        { time: "12:00", desc: "Buy bus ticket at the counter inside the terminal (to Seoul or Osong KTX station)." },
        { time: "15:00", desc: "BEST OPTION: Taxi to Osong KTX Station (20 min, ₩15,000) → KTX to Seoul in 30 min." },
        { time: "17:00", desc: "Express Bus to Seoul: departs from outside the terminal. 90 min to Gyeongbu Express Terminal." },
      ],
    },
    localSpotlights: [
      { icon: "🚄", title: "Osong KTX: The Smart Move", desc: "Taxi to Osong Station (₩15,000, 20 min) → KTX to Seoul (30 min, ₩12,900). Total ~1hr and faster than the bus." },
      { icon: "🎵", title: "K-Pop Tour Gateway", desc: "Many K-Pop fan tours to Daejeon, Cheonan, and Gongju depart from Cheongju. Check tour bus pickups at the terminal." },
      { icon: "🏰", title: "Nearby Historical Sites", desc: "Gongju Fortress (40 min), Buyeo Baekje sites (1 hr), and Cheongju Haengju Castle are easily accessible." },
    ],
  },
  PUS: {
    immigrationTips: [
      "Gimhae (PUS) has an international terminal and a separate domestic terminal connected by a free shuttle.",
      "Immigration here is efficient — typically 10-20 min total during off-peak.",
      "After collecting bags → exit, turn right: Gimhae Light Rail (GLR) → direct to Sasang Metro Station.",
      "Bus stop for Haeundae limousine is immediately outside Arrival Gate 1.",
      "Night arrival? Taxi is your only option after 23:30 — GLR and buses stop around that time.",
    ],
    factCheck2026: "Busan's new Gadeokdo Airport opens 2029. Until then, all international flights use Gimhae (PUS).",
    sosNumbers: [
      { number: "1330", label: "Korea Tourism Hotline (English)" },
      { number: "051-974-3114", label: "Gimhae Airport Office" },
      { number: "119", label: "Medical / Fire" },
    ],
    youtube: {
      search: "Busan Gimhae airport arrival guide subway bus Haeundae 2024",
      timeline: [
        { time: "00:30", desc: "Land at international terminal → follow ARRIVALS signs. Immigration is 5 min walk." },
        { time: "08:00", desc: "Pass immigration → collect bags → through customs to arrivals hall." },
        { time: "12:00", desc: "LIGHT RAIL: Exit → walk 3 min to GLR (Gimhae Light Rail) station. Pays with T-Money." },
        { time: "14:00", desc: "GLR to Sasang Station (20 min) → transfer to Busan Metro Line 2 toward Seomyeon/Haeundae." },
        { time: "16:00", desc: "LIMOUSINE BUS: Outside Exit 1 → Bus to Haeundae (60 min, ₩10,000). Departs every 30 min." },
      ],
    },
    localSpotlights: [
      { icon: "🏖️", title: "Haeundae Beach", desc: "Korea's most famous beach — 60 min by bus from PUS. Best visited April-June or Sept-Oct (off peak)." },
      { icon: "🍜", title: "Busan Food Scene", desc: "Milmyeon (cold wheat noodles), Dwaeji Gukbap (pork soup), and Jagalchi fish market are Busan icons." },
      { icon: "🏯", title: "Gyeongju Day Trip", desc: "Ancient Silla capital, 1 hr by bus from Busan. UNESCO World Heritage. Accessible without a car." },
    ],
  },
};

// ── Per-airport transport data with steps + YouTube ────────────────────
export const transportData: Record<string, Transport[]> = {
  ICN: [
    {
      type: "train",
      name: "AREX Express (Orange) → Seoul Station",
      duration: "43 min",
      priceKRW: "₩11,000",
      firstDeparture: "05:15",
      lastDeparture: "22:50",
      bookingUrl: "https://www.arex.or.kr/",
      bestFor: "Solo travelers & couples heading to central Seoul",
      tip: "Look for ORANGE signs at B1 level. Reserved seating — book at ticket machine. Dedicated luggage racks.",
      warning: "Different from the BLUE all-stop train. Same platform — check the departure board.",
      steps: [
        "From arrivals hall → follow signs to B1 (basement level 1).",
        "At ticket machines: select 'AREX Express (직통)' → Seoul Station.",
        "Board ORANGE-marked train. Your seat number is on the ticket.",
        "43 min direct — no stops between ICN T1 and Seoul Station.",
        "At Seoul Station (서울역): exit to Seoul Metro Lines 1, 4, or Airport Bus connections.",
      ],
      youtube: {
        search: "AREX Express train Incheon airport to Seoul station guide 2025",
        timeline: [
          { time: "00:30", desc: "Find the AREX ticket machine at B1 — choose '직통 (Direct)' not '일반 (All-stop)'." },
          { time: "02:00", desc: "Insert card, select Seoul Station, choose your seat (window recommended)." },
          { time: "04:00", desc: "Board the orange-colored train — note the large luggage racks at each end." },
          { time: "08:00", desc: "Train departs — no stops. Wifi available onboard." },
          { time: "43:00", desc: "Arrive Seoul Station. Exit through gates and follow signs to metro or bus connections." },
        ],
      },
    },
    {
      type: "train",
      name: "AREX All-Stop (Blue) → Hongdae/City",
      duration: "56 min",
      priceKRW: "₩4,550",
      firstDeparture: "05:23",
      lastDeparture: "23:32",
      bookingUrl: "https://www.seoulmetro.co.kr/",
      bestFor: "Budget travelers / those heading to Hongdae or Digital Media City",
      tip: "Same B1 platform as Express but 60% cheaper. Stops at Hongdae, Digital Media City, Gimpo Airport.",
      steps: [
        "Follow signs to B1 (same as Express train).",
        "At ticket machine: select '일반 (All-stop)' or use T-Money card at turnstile.",
        "Board the BLUE-marked train. No seat reservation — first come, first served.",
        "Key stops: Gyeyang → Digital Media City → Hongdae Entrance → Seoul Station.",
        "For Hongdae (홍대입구): exit at Hongdae Entrance station and transfer to Metro Line 2.",
      ],
      youtube: {
        search: "AREX all stop Incheon airport to Hongdae subway guide",
        timeline: [
          { time: "00:30", desc: "At B1 platform → look for the BLUE train (all-stop / 일반)." },
          { time: "02:00", desc: "Tap T-Money card at turnstile. No need to buy a paper ticket." },
          { time: "04:00", desc: "Board — find a spot near the doors if you have luggage." },
          { time: "30:00", desc: "Digital Media City stop — transfer point for Line 6 (Mapo/Itaewon direction)." },
          { time: "36:00", desc: "Hongdae Entrance (홍대입구) — most Hongdae travelers exit here." },
          { time: "56:00", desc: "Seoul Station final stop — transfer to Lines 1, 4, or long-distance trains." },
        ],
      },
    },
    {
      type: "bus",
      name: "Airport Limousine Bus → City Center",
      duration: "60-90 min",
      priceKRW: "₩17,000 – ₩20,000",
      firstDeparture: "05:00",
      lastDeparture: "23:30",
      bookingUrl: "http://www.airportlimousine.co.kr/",
      bestFor: "Travelers with heavy luggage going to Gangnam, Itaewon, or Myeongdong hotel areas",
      tip: "Buses have under-carriage luggage storage — keep your 'Claim Tag' to retrieve bags. Buy ticket at the machine outside.",
      warning: "Rush hour (7-9 AM, 5-8 PM) can add 30-60 min to journey. Check traffic before choosing this over AREX.",
      steps: [
        "Exit arrivals hall → Floor 1, Exits 5–9 (both T1 and T2 have bus stops).",
        "Find your route number on the map board. Key routes: 6001 (Seoul Station/Myeongdong), 6002 (Gangnam), 6103 (Itaewon/Yongsan), 6015 (Mapo/Yeouido).",
        "Buy ticket at the machine outside OR pay the driver with card/cash.",
        "Load luggage into the under-carriage compartment — driver or staff will help.",
        "Keep your 'Claim Tag' (luggage receipt) — you'll need it to retrieve your bag at your stop.",
        "Tell the driver (or show map) your stop. Most buses announce in Korean only — watch Google Maps.",
      ],
      youtube: {
        search: "Incheon airport limousine bus to Seoul city guide 2025",
        timeline: [
          { time: "00:30", desc: "Exit arrivals → locate bus platform outside (Floor 1, Exits 5-9). Large boards show route numbers." },
          { time: "02:00", desc: "Buy ticket at machine: select your route → insert card → take ticket." },
          { time: "04:00", desc: "Load bags in undercarriage → take your Claim Tag from the driver." },
          { time: "08:00", desc: "Depart — comfortable seats, free wifi. Monitor stops on Google Maps." },
          { time: "70:00", desc: "Approach your stop → press stop button or tell driver. Retrieve bag with Claim Tag." },
        ],
      },
    },
    {
      type: "van",
      name: "Private Large Van (Klook / KakaoT Venti)",
      duration: "60 min",
      priceKRW: "₩100,000 – ₩150,000",
      firstDeparture: "00:00",
      lastDeparture: "24:00",
      bookingUrl: "https://www.klook.com/",
      bestFor: "Families or groups of 3-4 with large luggage",
      tip: "Pre-book on Klook for set price + driver meets you in arrivals with name sign. No hunting for taxis.",
      warning: "Standard taxis (Sonata) only fit 2 large suitcases. Groups of 3-4 MUST book a van or take 2 taxis.",
      steps: [
        "Pre-book on Klook.com or use KakaoT app → select 'Venti (Large Van)'.",
        "Your driver waits in the arrivals hall with a name board.",
        "Load all luggage — vans fit 4-6 passengers + full luggage comfortably.",
        "Driver uses navigation — journey to central Seoul is ~60 min (longer in rush hour).",
        "Payment: pre-paid via Klook (recommended) or cash/card to driver.",
      ],
      youtube: {
        search: "Incheon airport private transfer van family luggage Korea 2024",
        timeline: [
          { time: "00:30", desc: "Exit customs → look for your driver holding a name board in the arrivals hall." },
          { time: "03:00", desc: "Confirm driver name and destination before getting in." },
          { time: "05:00", desc: "Load luggage — driver assists. Comfortable seating for whole group." },
          { time: "60:00", desc: "Arrive at hotel entrance. Driver unloads bags. Tip is optional but appreciated." },
        ],
      },
    },
    {
      type: "pass",
      name: "T-Luggage (Baggage Delivery to Hotel)",
      duration: "Same-day (if drop before 12:00)",
      priceKRW: "₩15,000 – ₩25,000 per bag",
      firstDeparture: "07:00",
      lastDeparture: "14:00",
      bookingUrl: "https://www.zimcarry.net/",
      bestFor: "Anyone wanting hands-free travel from airport to hotel",
      tip: "Drop bags at T-Luggage counter (Floor 1, Exits 4-6) → explore Seoul bag-free → bags arrive at hotel by 9 PM.",
      steps: [
        "After collecting luggage from carousel → go to T-Luggage counter at Floor 1 Exits 4-6.",
        "Fill out delivery form: hotel name, address, room check-in time.",
        "Pay: ₩15,000-25,000 per bag by card or cash.",
        "Take your receipt with tracking number.",
        "Your bags arrive at your hotel by 9 PM (if dropped before 12:00 PM).",
        "Now take AREX or bus to Seoul completely hands-free.",
      ],
      youtube: {
        search: "T-Luggage Incheon airport hotel delivery hands-free travel Korea",
        timeline: [
          { time: "00:30", desc: "After baggage claim → find T-Luggage counter between Exits 4-6 on Floor 1." },
          { time: "02:00", desc: "Fill in hotel address and check-in details. Staff speaks basic English." },
          { time: "05:00", desc: "Pay and receive your receipt with tracking number." },
          { time: "08:00", desc: "Head to AREX or bus — completely luggage-free!" },
          { time: "same day", desc: "Bags delivered to hotel reception by 9 PM. Show receipt to collect." },
        ],
      },
    },
  ],

  GMP: [
    {
      type: "train",
      name: "Seoul Metro Line 9 (Express)",
      duration: "30 min to Yeouido",
      priceKRW: "₩1,550 – ₩2,050",
      firstDeparture: "05:40",
      lastDeparture: "23:52",
      bookingUrl: "https://www.seoulmetro.co.kr/",
      bestFor: "Fastest route to Yeouido, Gangnam, Sinnonhyeon area",
      tip: "Board the EXPRESS (급행) not local. Express skips many stops — arrives Yeouido in 13 min.",
      steps: [
        "Exit arrivals hall → follow 'Subway' signs to basement level.",
        "Line 9 station is inside the terminal building.",
        "Buy T-Money card at machine (₩4,000 deposit + load amount) or tap credit card.",
        "Board the EXPRESS (급행) train on the platform — check the screen for 'Express' label.",
        "Yeouido (여의도): 13 min. Sinnonhyeon (신논현, Gangnam): 30 min. Sapyeong (사평): 35 min.",
      ],
      youtube: {
        search: "Gimpo airport to Seoul subway Line 9 guide English 2024",
        timeline: [
          { time: "00:30", desc: "Exit arrivals → subway sign leads to basement. Line 9 is directly below the terminal." },
          { time: "02:00", desc: "At turnstile → tap T-Money card or credit card (contactless)." },
          { time: "04:00", desc: "On platform → wait for EXPRESS (급행) train. It has fewer stops and is faster." },
          { time: "17:00", desc: "Yeouido station — financial district, IFC Mall, Han River park." },
          { time: "30:00", desc: "Sinnonhyeon (강남) — heart of Gangnam. Transfer to Line 2 or 7." },
        ],
      },
    },
    {
      type: "train",
      name: "Seoul Metro Line 5",
      duration: "45 min to Gwanghwamun",
      priceKRW: "₩1,550",
      firstDeparture: "05:31",
      lastDeparture: "00:01",
      bookingUrl: "https://www.seoulmetro.co.kr/",
      bestFor: "Travelers heading to Gwanghwamun, Dongdaemun, City Hall area",
      tip: "Good connection to Mapo and Yeouido. Night owls: Line 5 runs latest of the two options at GMP.",
      steps: [
        "Same terminal subway access as Line 9 — both share the GMP station.",
        "At the platform: choose Line 5 direction toward Banghwa (for inbound to Seoul center).",
        "Tap T-Money card at turnstile.",
        "Key stops: Kimpo Airport → Songjung → Mapo → Yeouido → Yeouinaru → Gwanghwamun.",
      ],
      youtube: {
        search: "Gimpo airport Line 5 subway to central Seoul 2024",
        timeline: [
          { time: "00:30", desc: "Both Line 5 and Line 9 share the same basement station at GMP." },
          { time: "02:00", desc: "Choose Line 5 platform — direction '방화 (Banghwa)' side goes deeper into Seoul." },
          { time: "20:00", desc: "Mapo Station — good transfer point for central and northern Seoul." },
          { time: "40:00", desc: "Gwanghwamun / City Hall area — Gyeongbokgung Palace is 10 min walk." },
        ],
      },
    },
    {
      type: "taxi",
      name: "Standard Taxi / KakaoT",
      duration: "20-35 min",
      priceKRW: "₩15,000 – ₩30,000",
      firstDeparture: "00:00",
      lastDeparture: "24:00",
      bookingUrl: "https://t.kakao.com/",
      bestFor: "2+ people or anyone with lots of luggage. Gimpo is close to Seoul — taxi is very efficient.",
      tip: "For 2 people, a taxi to Hongdae is ~₩15,000 — cheaper than 2 subway tickets. Very reasonable.",
      warning: "Night surcharge (+40%) applies from midnight to 4 AM.",
      steps: [
        "Exit arrivals → taxi stand is immediately outside Exit 1.",
        "For best experience: use KakaoT app → select 'Regular' → show driver the map pin for your destination.",
        "If flagging a street taxi: only board metered taxis. The meter starts at ₩4,800 base fare.",
        "Show your destination on Google Maps or written in Korean to avoid miscommunication.",
        "For 3-4 people with large bags: use KakaoT and select 'Venti (Large)' for a van.",
      ],
      youtube: {
        search: "Gimpo airport taxi to Seoul how to use KakaoT 2024",
        timeline: [
          { time: "00:30", desc: "Exit arrivals → taxi rank is directly outside. Short queue typical." },
          { time: "02:00", desc: "Open KakaoT → set destination → select 'Regular Taxi'. Estimated price shown." },
          { time: "04:00", desc: "Confirm driver's car number matches app before entering." },
          { time: "25:00", desc: "Arrive destination. If paying in-app — auto-charged. Or pay driver directly." },
        ],
      },
    },
  ],

  CJU: [
    {
      type: "bus",
      name: "Airport Limousine Bus 600 → Seogwipo",
      duration: "50 min",
      priceKRW: "₩5,500",
      firstDeparture: "06:00",
      lastDeparture: "22:40",
      bookingUrl: "https://www.jejubus.info/",
      bestFor: "Travelers staying in Jungmun Resort or Seogwipo area",
      tip: "Buy ticket at machine inside terminal. Route goes: Jeju City → Jungmun → Seogwipo. Departs every 20-30 min.",
      steps: [
        "Exit customs → buy limousine bus ticket at machine inside arrival hall.",
        "Exit the terminal → Bus Stop 3 (Limousine, 리무진) outside on the right.",
        "Board Bus 600 — comfortable seats, luggage storage under the bus.",
        "Key stops: City Hall area → Jungmun Intercontinental → Seogwipo Hyatt → Seogwipo KAL Hotel.",
        "Show your stop on your phone to the driver when boarding.",
      ],
      youtube: {
        search: "Jeju airport limousine bus 600 seogwipo jungmun resort guide",
        timeline: [
          { time: "00:30", desc: "Inside terminal → buy ticket at the machine. Touch 'Limousine (600)' route." },
          { time: "03:00", desc: "Exit → Bus Stop 3 (리무진 정류소) clearly signed outside on the right." },
          { time: "05:00", desc: "Load luggage under the bus → board and sit. Driver announces stops." },
          { time: "25:00", desc: "Pass through Jeju City area — great views of Hallasan mountain on clear days." },
          { time: "50:00", desc: "Jungmun / Seogwipo area — your stop. Collect bag from undercarriage." },
        ],
      },
    },
    {
      type: "bus",
      name: "City Bus 100 → Jeju City Center",
      duration: "25 min",
      priceKRW: "₩1,500",
      firstDeparture: "06:00",
      lastDeparture: "23:00",
      bookingUrl: "https://www.jejubus.info/",
      bestFor: "Budget travelers staying in Jeju City (Jeju-si) area near the airport",
      tip: "Cheapest option. Tap T-Money card or pay cash. Very frequent service. Runs to Jeju East/West Bus Terminal.",
      steps: [
        "Exit terminal → Bus Stop 1 or 2 (City Bus / 시내버스).",
        "Board Bus 100 (City Bus) → pay ₩1,500 cash or tap T-Money card.",
        "25 min to Jeju City center. Good for Jeju-si hotels and guesthouses.",
      ],
      youtube: {
        search: "Jeju airport city bus to Jeju city center cheap transport",
        timeline: [
          { time: "00:30", desc: "Exit terminal → Bus Stop 1 (City Bus). Look for bus number 100 or 101." },
          { time: "02:00", desc: "Tap T-Money card on reader OR pay ₩1,500 cash to driver." },
          { time: "25:00", desc: "Jeju City Bus Terminal — transfer point for buses across the island." },
        ],
      },
    },
    {
      type: "van",
      name: "Rental Car (Strongly Recommended for Jeju)",
      duration: "10 min to rental lot",
      priceKRW: "₩50,000 – ₩120,000/day",
      firstDeparture: "08:00",
      lastDeparture: "20:00",
      bookingUrl: "https://www.lotterental.com/",
      bestFor: "Anyone wanting to explore Jeju properly — a car is ESSENTIAL",
      tip: "Jeju's best spots (Seongsan Ilchulbong, Hallasan, Manjanggul Cave) require a car or expensive taxis. Book rental online BEFORE arriving.",
      warning: "Jeju roads have speed cameras everywhere. Strict 80km/h limit. Never drive after drinking.",
      steps: [
        "After exiting customs → follow 'Rental Car Shuttle (렌터카 셔틀)' signs outside Exit 5.",
        "Free shuttle buses to the rental car lot depart every 10-15 min.",
        "At the lot: show your reservation, driver's license (international permit required for non-Korean licenses), and passport.",
        "Check the car for existing scratches BEFORE driving away — photograph everything.",
        "Use Naver Map (better than Google Maps for Jeju roads) for navigation.",
      ],
      youtube: {
        search: "Jeju Island rental car guide foreigner international license tips 2024",
        timeline: [
          { time: "00:30", desc: "Exit customs → Rental Car Shuttle signs are outside Exit 5." },
          { time: "03:00", desc: "Board free shuttle to rental car lot — about 10 min ride." },
          { time: "13:00", desc: "Counter check-in — show reservation, IDP (International Driving Permit), passport." },
          { time: "20:00", desc: "Pre-delivery inspection — photograph ALL scratches before accepting the car." },
          { time: "25:00", desc: "Drive away! Set up Naver Map for navigation — it handles Jeju road names better." },
        ],
      },
    },
    {
      type: "taxi",
      name: "Jeju Global Taxi (English-speaking)",
      duration: "15-20 min to Jeju City",
      priceKRW: "₩10,000 – ₩15,000",
      firstDeparture: "00:00",
      lastDeparture: "24:00",
      bookingUrl: "https://www.visitjeju.net/",
      bestFor: "Quick transfers to Jeju City hotels when you don't want to rent a car",
      tip: "Fixed daily tour packages available (₩200,000-300,000 for 8-hr private tour). Ask the driver.",
      steps: [
        "Exit terminal → Taxi stand is outside Exit 1, clearly marked.",
        "Look for 'Global Taxi (글로벌 택시)' — orange-colored taxis with multilingual drivers.",
        "Show your hotel address on Google Maps or written in Korean.",
        "Metered fare to Jeju City center is approximately ₩10,000-15,000.",
      ],
      youtube: {
        search: "Jeju airport taxi to city center Jeju global taxi English",
        timeline: [
          { time: "00:30", desc: "Exit terminal → Taxi stand at Exit 1. Global Taxi (orange) recommended." },
          { time: "02:00", desc: "Show hotel address. Driver will confirm destination." },
          { time: "20:00", desc: "Arrive Jeju City area. Pay metered fare — no tipping needed." },
        ],
      },
    },
  ],

  CJJ: [
    {
      type: "taxi",
      name: "Taxi to Osong KTX Station (BEST OPTION)",
      duration: "20 min taxi + 30 min KTX to Seoul",
      priceKRW: "₩15,000 taxi + ₩12,900 KTX",
      firstDeparture: "00:00",
      lastDeparture: "24:00",
      bookingUrl: "https://www.letskorail.com/",
      bestFor: "Anyone heading to Seoul — the fastest and most comfortable combination",
      tip: "Osong Station is only 20 min by taxi from CJJ. From Osong → Seoul by KTX takes just 30 min. Total journey under 1 hour!",
      steps: [
        "Exit terminal → Taxi stand is immediately outside the exit.",
        "Tell driver: '오송역 (Osong Station)' or show on map. Fare: ₩15,000-20,000.",
        "At Osong KTX Station → buy KTX ticket at machine or mobile app (Korail app, Korea Pass).",
        "KTX to Seoul: 30 min to Seoul Station or 25 min to Suseo/Gangnam SRT.",
        "At Seoul Station: transfer to Seoul Metro Lines 1, 4, or Airport Bus connections.",
      ],
      youtube: {
        search: "청주공항 오송역 KTX 서울 가는 방법 2024",
        timeline: [
          { time: "00:30", desc: "Exit terminal → Taxi rank outside. Say '오송역' to driver or show the text." },
          { time: "20:00", desc: "Arrive Osong KTX Station — buy ticket at machine or use Korail app." },
          { time: "25:00", desc: "Board KTX at Osong — comfortable seating, no standing allowed." },
          { time: "55:00", desc: "Arrive Seoul Station. Connect to metro or taxi to final destination." },
        ],
      },
    },
    {
      type: "bus",
      name: "Express Bus → Seoul (Gyeongbu Terminal)",
      duration: "90 min",
      priceKRW: "₩11,200",
      firstDeparture: "08:30",
      lastDeparture: "20:30",
      bookingUrl: "https://www.kobus.co.kr/",
      bestFor: "Budget travelers / those staying near Gangnam Express Bus Terminal area",
      tip: "Buy ticket at the counter inside the terminal arrival hall. Limited departures — check schedule before relying on this.",
      warning: "Traffic on the expressway can add 30-60 min during rush hours (7-9 AM, 5-8 PM).",
      steps: [
        "Inside terminal → buy express bus ticket at the counter before exiting.",
        "Exit terminal → bus departs from the bus stop directly outside.",
        "90 min to Seoul Gangnam Express Bus Terminal (강남고속버스터미널).",
        "At Gangnam Terminal: transfer to Metro Line 3 or 7 or take a taxi.",
      ],
      youtube: {
        search: "청주공항 서울 리무진버스 고속버스 타는법",
        timeline: [
          { time: "00:30", desc: "Inside terminal → bus ticket counter. Buy Seoul 서울 ticket." },
          { time: "03:00", desc: "Exit → board bus immediately outside. Limited departure frequency." },
          { time: "90:00", desc: "Gangnam Express Terminal. Connect to Metro Line 3 (Gangnam, Suseo) or Line 7." },
        ],
      },
    },
    {
      type: "train",
      name: "Mugunghwa Train → Cheongju / Daejeon",
      duration: "10 min walk + 100 min to Daejeon",
      priceKRW: "₩6,800 (to Daejeon)",
      firstDeparture: "06:50",
      lastDeparture: "21:30",
      bookingUrl: "https://www.letskorail.com/",
      bestFor: "Travelers heading to Daejeon or nearby cities (not Seoul)",
      tip: "Cheongju Airport Station is a 10-min walk from the terminal. Very infrequent service — check schedule in advance.",
      warning: "This is the slow Mugunghwa train, NOT KTX. For Seoul, the Osong KTX taxi combo is much faster.",
      steps: [
        "Exit terminal → walk straight for 10 min toward 'Cheongju Airport Station (청주공항역)' following road signs.",
        "Buy ticket at station counter.",
        "Board Mugunghwa train — slow but scenic. Good for Cheongju city or Daejeon.",
        "For Seoul: transfer at Daejeon to KTX (faster) or continue to Seoul (slow, 3+ hrs total).",
      ],
      youtube: {
        search: "청주공항 청주공항역 무궁화호 기차 타는법",
        timeline: [
          { time: "00:30", desc: "Exit terminal → walk 10 min following road signs to 청주공항역." },
          { time: "10:00", desc: "Buy ticket at station counter. Limited trains per day — check schedule." },
          { time: "110:00", desc: "Arrive Daejeon. Transfer to KTX for faster onward journey to Seoul." },
        ],
      },
    },
    {
      type: "taxi",
      name: "Local Taxi (Cheongju City / Short Trips)",
      duration: "20-40 min",
      priceKRW: "₩15,000 – ₩40,000",
      firstDeparture: "00:00",
      lastDeparture: "24:00",
      bookingUrl: "https://t.kakao.com/",
      bestFor: "Reaching Cheongju city center or K-Pop tour pickup locations",
      tip: "Use KakaoT app for reliable booking. Cheongju taxis are cheap — city center is only ₩15,000.",
      steps: [
        "Exit terminal → Taxi stand is outside the main exit.",
        "Use KakaoT app or flag a taxi.",
        "Key destinations: Cheongju City Center (20 min, ₩15,000), Osong Station (20 min, ₩15,000), Daejeon (40 min, ₩35,000).",
      ],
      youtube: {
        search: "청주공항 택시 카카오T 청주시내 이동방법",
        timeline: [
          { time: "00:30", desc: "Exit terminal → taxi rank outside main exit." },
          { time: "02:00", desc: "Use KakaoT app or board waiting taxi. Show destination on map." },
          { time: "20:00", desc: "Arrive Cheongju city or Osong Station." },
        ],
      },
    },
  ],

  PUS: [
    {
      type: "train",
      name: "Gimhae Light Rail (GLR) → Sasang Metro",
      duration: "20 min + metro connection",
      priceKRW: "₩1,600",
      firstDeparture: "05:00",
      lastDeparture: "23:30",
      bookingUrl: "http://www.bglrt.com/",
      bestFor: "Budget travelers heading to Seomyeon, Nampo, or Busan Station area",
      tip: "GLR connects directly to Busan Metro Line 2 at Sasang Station. Single T-Money card works for the entire journey.",
      steps: [
        "Exit arrivals hall → follow 'GLR (경전철)' signs. The station is a 3-min covered walk from terminal.",
        "Tap T-Money card at turnstile. No separate ticket needed.",
        "Board the light rail — runs every 8-10 min.",
        "At Sasang Station (사상역): transfer to Busan Metro Line 2.",
        "Line 2 East direction: Seomyeon (서면, 12 min) → Haeundae (해운대, 30 min total).",
      ],
      youtube: {
        search: "Busan Gimhae airport light rail to subway Sasang Seomyeon Haeundae guide",
        timeline: [
          { time: "00:30", desc: "Exit arrivals → follow GLR (경전철) signs. Short covered walkway." },
          { time: "03:00", desc: "Tap T-Money card at GLR turnstile. Train every 8 min." },
          { time: "23:00", desc: "Arrive Sasang Station — follow transfer signs to Busan Metro Line 2." },
          { time: "35:00", desc: "Line 2 to Seomyeon (서면) — Busan's main commercial hub." },
          { time: "50:00", desc: "Continue Line 2 to Haeundae (해운대) — beach area." },
        ],
      },
    },
    {
      type: "bus",
      name: "Airport Limousine Bus → Haeundae / Hotels",
      duration: "60-80 min",
      priceKRW: "₩10,000",
      firstDeparture: "06:50",
      lastDeparture: "22:00",
      bookingUrl: "https://www.bglrt.com/",
      bestFor: "Travelers with luggage going directly to Haeundae beach hotel area",
      tip: "Direct service to Haeundae beach hotels. Much easier than the train with heavy luggage. Departs every 30-40 min.",
      warning: "Rush hour adds significant time. If arriving 7-9 AM or 5-8 PM, expect 90+ min.",
      steps: [
        "Exit arrivals → turn left. Limousine Bus stop is outside Arrival Gate 1.",
        "Buy ticket at the small booth or pay driver.",
        "Board bus to 해운대 (Haeundae) — departs every 30-40 min.",
        "Bus stops at: BEXCO → Haeundae Station → Haeundae beach hotel district.",
        "Ask driver or show your hotel address for the right stop.",
      ],
      youtube: {
        search: "Busan Gimhae airport limousine bus Haeundae beach hotel direct 2024",
        timeline: [
          { time: "00:30", desc: "Exit arrivals → outside Gate 1, turn left for limousine bus stop." },
          { time: "02:00", desc: "Buy ticket at booth (₩10,000). Board the bus to Haeundae." },
          { time: "05:00", desc: "Comfortable coach seats — luggage in undercarriage." },
          { time: "65:00", desc: "BEXCO area → Haeundae Station → hotel district. Let driver know your stop." },
        ],
      },
    },
    {
      type: "taxi",
      name: "International Taxi (Fixed Rate) / KakaoT",
      duration: "30-50 min",
      priceKRW: "₩25,000 – ₩45,000",
      firstDeparture: "00:00",
      lastDeparture: "24:00",
      bookingUrl: "https://www.intltaxi.co.kr/",
      bestFor: "Late night arrivals / groups with luggage / direct hotel drop-off",
      tip: "International Taxi has fixed rates to key destinations (no overcharging). Regular taxis also available — use KakaoT to confirm price before boarding.",
      warning: "Night surcharge (+40%) applies midnight-4 AM. Haeundae taxi at 2 AM can cost ₩55,000+.",
      steps: [
        "Exit arrivals → International Taxi stand is outside Gate 1 (orange-yellow sign).",
        "Fixed rates to: Seomyeon ₩25,000 / Haeundae ₩35,000-40,000 / Nampo ₩30,000.",
        "For regular taxis: use KakaoT app → set destination → confirm estimated price.",
        "For groups of 4 with luggage: KakaoT Venti (large van) is available in Busan.",
      ],
      youtube: {
        search: "Busan Gimhae airport taxi KakaoT Haeundae Seomyeon fare guide",
        timeline: [
          { time: "00:30", desc: "Exit → International Taxi stand outside Gate 1. Fixed-rate cards posted." },
          { time: "02:00", desc: "Confirm destination and fixed rate before boarding." },
          { time: "40:00", desc: "Haeundae beach area. Taxi drops you at hotel entrance." },
        ],
      },
    },
    {
      type: "bus",
      name: "City Bus → Busan Station (KTX)",
      duration: "40 min",
      priceKRW: "₩1,700",
      firstDeparture: "05:30",
      lastDeparture: "23:00",
      bookingUrl: "https://www.seoulmetro.co.kr/",
      bestFor: "Travelers catching a KTX train from Busan Station to Seoul",
      tip: "City Bus 307 goes directly to Busan Station (부산역) where KTX to Seoul departs. Cheapest option for Seoul connection.",
      steps: [
        "Exit terminal → City Bus stop outside the exit (separate from Limousine stop).",
        "Board Bus 307 → tap T-Money card or pay ₩1,700 cash.",
        "40 min to Busan Station (부산역).",
        "At Busan Station: buy KTX ticket to Seoul (2 hrs 15 min, ₩59,800 standard).",
      ],
      youtube: {
        search: "부산 김해공항 부산역 버스 KTX 서울 가는법",
        timeline: [
          { time: "00:30", desc: "Exit terminal → City Bus stop. Board Bus 307 (부산역 방향)." },
          { time: "02:00", desc: "Tap T-Money or pay cash. Comfortable city bus." },
          { time: "40:00", desc: "Busan Station. KTX to Seoul from here — buy ticket at machine or Korail app." },
          { time: "160:00", desc: "Arrive Seoul Station. 2 hr 15 min KTX journey." },
        ],
      },
    },
  ],
};

// Legacy export for compatibility
export interface TimeGuide {
  title: string;
  availability: "High" | "Limited" | "None";
  description: string;
  steps: string[];
  youtubeId: string;
}

export const airportTimeGuides: Record<string, Record<string, TimeGuide>> = {};
