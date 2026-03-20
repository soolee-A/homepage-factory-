export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
  youtubeSearch: string;
  youtubeTimeline: { time: string; desc: string }[];
}

export const BLOG_POSTS: Record<string, BlogPost> = {
  '1-incheon-airport-shuttle-train': {
    slug: '1-incheon-airport-shuttle-train',
    title: '1. Incheon Airport: The Shuttle Train Trap (T1)',
    excerpt: '90% of foreigners get lost here. Learn how to navigate the shuttle train between terminals at Incheon International Airport.',
    date: 'March 18, 2026',
    readTime: '6 min read',
    category: 'Airport',
    youtubeSearch: 'Incheon Airport Arrival Guide for Foreigners',
    youtubeTimeline: [
      { time: "00:30", desc: "비행기 하차 후 위성 탑승동 진입 → 노란색 'ARRIVALS' 표지판만 따라가세요. 절대 'DEPARTURES' 방향 아님." },
      { time: "02:00", desc: "에스컬레이터로 B1 하강 → 무료 셔틀 트레인 플랫폼. 열차는 3~5분 간격 운행." },
      { time: "08:00", desc: "셔틀 트레인 하차 → 초록색 'IMMIGRATION' 표지판 따라 2층 이동." },
      { time: "12:00", desc: "자동출입국 심사(e-Gate): 여권 스캔 → 양 검지 지문 → 카메라 응시. 약 30초 완료." },
      { time: "18:00", desc: "수하물 벨트 → 항공편 번호로 본인 수하물 벨트 번호 확인 (전광판 참조)." },
      { time: "22:00", desc: "세관 통과 → 좌측 B1 AREX 열차, 직진 버스·택시 (1층 출구 5~9번)." },
    ],
    content: `
      <h2>Why Incheon T1 Confuses Nearly Every First-Time Visitor</h2>
      <p>Incheon International Airport Terminal 1 (T1) is one of the most awarded airports in the world — but it is also one of the most confusing for first-time arrivals. The reason? A significant portion of international flights land at a satellite concourse (Concourses A and B), not at the main terminal building. To reach Immigration, you must take an underground Shuttle Train.</p>

      <p>This is not immediately obvious. The aircraft door opens, you follow the crowd through a jet bridge, and suddenly you are in a long underground corridor. Many travelers panic, wondering if they have taken a wrong turn. You have not. You are in the satellite concourse and you are exactly where you should be.</p>

      <h2>Step-by-Step: How to Navigate the Shuttle Train</h2>
      <ol>
        <li><strong>After deplaning at the satellite concourse</strong>, follow the yellow "Arrivals" signs on the floor and ceiling. Do not follow signs for "Departures" or "Transfer."</li>
        <li><strong>Descend to the basement level</strong> using escalators or elevators. You will see a dedicated underground train platform — this is the Incheon Airside Shuttle.</li>
        <li><strong>Board the automated train</strong>. It runs every 3–5 minutes and takes about 6 minutes to reach the main terminal. There is no ticket required — this is a free intra-airport shuttle.</li>
        <li><strong>Exit at the main terminal</strong> and follow signs to "Arrival Immigration." You will see large green and yellow signs directing you to the immigration hall.</li>
        <li><strong>At Immigration</strong>, all electronic passport holders (including most Western nationalities) can use the automated e-Gates. This typically takes 30–60 seconds versus 10–20 minutes in the manual queue.</li>
      </ol>

      <h2>Which Airlines Use the Satellite Concourse?</h2>
      <p>Generally, foreign airlines and low-cost carriers (LCCs) operating into T1 use the satellite concourse (Gates 101–132). Korean Air, which uses Terminal 2, does NOT use T1. Airlines that frequently use T1 satellite gates include:</p>
      <ul>
        <li>Most European carriers (Lufthansa, Air France, British Airways, etc.)</li>
        <li>Southeast Asian LCCs (AirAsia, Scoot, Cebu Pacific)</li>
        <li>Middle Eastern carriers at some gates</li>
      </ul>
      <p>If your gate number is above 100 (e.g., Gate 124, Gate 108), you are in the satellite concourse and will need the shuttle train.</p>

      <h2>Important Tips to Remember</h2>
      <ul>
        <li><strong>Do not follow departing passengers.</strong> After the train, departing passengers go left, arriving passengers go right toward immigration. The signs are clear but easy to miss when tired.</li>
        <li><strong>Keep your immigration card ready.</strong> Most nationalities no longer need a paper immigration card at Incheon (it has gone digital), but check your airline's pre-flight information.</li>
        <li><strong>The shuttle train runs 24 hours.</strong> It does not close, so midnight arrivals should not worry about missing the last train.</li>
        <li><strong>Children and strollers:</strong> The train is fully accessible with elevators at every level. Allow extra time if traveling with young children.</li>
      </ul>

      <h2>After Immigration: Your Next Steps</h2>
      <p>Once you clear immigration and collect your bags from the baggage carousel, you will exit into the public arrivals hall on Floor 1. From here, you can access:</p>
      <ul>
        <li>AREX Airport Railroad Express (B1 floor — follow signs for the train)</li>
        <li>Airport Limousine Buses (Floor 1, exits 5–8 on the right side)</li>
        <li>Taxi stands (Floor 1, exits 4–7)</li>
        <li>Currency exchange counters and convenience stores (Floor 1)</li>
      </ul>
    `
  },

  '2-airport-photo-ban': {
    slug: '2-airport-photo-ban',
    title: '2. Airport Conduct: Put Your Phone Away!',
    excerpt: 'Avoid being scolded by security or detained. Photography is strictly prohibited at immigration and customs areas in Korean airports.',
    date: 'March 18, 2026',
    readTime: '5 min read',
    category: 'Airport',
    youtubeSearch: 'Step by Step Arrival at Korea Airport 2026',
    youtubeTimeline: [
      { time: "00:00", desc: "착륙 전 기내 → 카메라 앱 닫기. 한국 영공 진입 시부터 이민국 규정 적용 시작." },
      { time: "05:00", desc: "이민국 홀 입장 → 입구에 'NO PHOTOGRAPHY' 표지 있음. 폰은 주머니에." },
      { time: "10:00", desc: "이민국 심사대 → 모자·선글라스·마스크 제거. 지문·얼굴 인식 절차." },
      { time: "15:00", desc: "수하물 찾는 곳 (수하물 클레임) → 여기서는 일반 촬영 가능." },
      { time: "20:00", desc: "세관 검사 구역 → 다시 촬영 제한 구역. 물품 신고 없으면 그린 채널(녹색)." },
      { time: "25:00", desc: "공개 도착 홀(Public Arrivals Hall) → 촬영 자유. 환영 인파·표지판 모두 OK." },
    ],
    content: `
      <h2>Photography at Korean Airports: The Rules You Must Know</h2>
      <p>South Korean airports, particularly in immigration and customs areas, have strict rules about photography and video recording. These rules are enforced seriously — officers have the authority to delete your photos, confiscate your device for inspection, or in extreme cases, delay your entry while the situation is reviewed.</p>

      <p>The key rule is simple: <strong>do not use your phone in the immigration hall</strong>. This includes taking photos, recording video, making FaceTime calls, or even just holding your phone up where it could look like you are recording. Signs are posted in multiple languages throughout the hall, but many travelers either miss them or assume a quick photo for social media is harmless. It is not.</p>

      <h2>Why Are Cameras Banned at Immigration?</h2>
      <p>The immigration area is a security-sensitive zone. The government has legitimate reasons for restricting photography here:</p>
      <ul>
        <li><strong>Security procedures:</strong> Photographing immigration equipment, screening technology, or officers' workstations could compromise security protocols.</li>
        <li><strong>Privacy of other passengers:</strong> Photographs taken in the immigration queue often capture other travelers' documents, faces, and personal information without their consent.</li>
        <li><strong>Border integrity:</strong> Korea, like most countries, treats its immigration checkpoint as a sovereign security zone with restricted documentation rules.</li>
      </ul>

      <h2>Exact Rules: What You Can and Cannot Do</h2>
      <h3>Prohibited Areas:</h3>
      <ul>
        <li>The immigration hall (from entry to the desk clearance)</li>
        <li>Customs inspection area</li>
        <li>Baggage screening checkpoints</li>
        <li>Security patrol zones marked with "No Photography" signs</li>
      </ul>

      <h3>Generally Permitted:</h3>
      <ul>
        <li>The public arrivals hall after clearing customs</li>
        <li>Departure gates and terminals (check for local signs)</li>
        <li>Restaurants, shops, and public areas in the main terminal</li>
      </ul>

      <h2>At the Immigration Desk: Best Practices</h2>
      <p>Standing at the immigration desk, every second counts. Officers process thousands of arrivals per shift and expect compliance. Follow these steps to ensure a smooth clearance:</p>
      <ol>
        <li><strong>Remove accessories:</strong> Take off hats, hoods, masks, and sunglasses before you reach the desk. The officer needs a clear view of your face.</li>
        <li><strong>Prepare your documents:</strong> Have your passport open to the photo page. Biometric data pages should be accessible.</li>
        <li><strong>Fingerprint scanner:</strong> When prompted, place both index fingers on the scanner simultaneously. Look directly at the camera for the facial recognition check.</li>
        <li><strong>Do not use your phone:</strong> Keep it in your pocket from the moment you enter the immigration hall until you exit through the final barriers.</li>
        <li><strong>Answer questions clearly:</strong> Officers may ask your purpose of visit, where you are staying, and how long you plan to stay. Answer honestly and concisely.</li>
      </ol>

      <h2>What Happens If You Take a Photo?</h2>
      <p>If an officer sees you taking photos, you will typically be asked to stop and may be asked to show or delete the photo. Most officers handle this calmly and professionally. Comply immediately, be polite, and do not argue. In almost all cases, the situation resolves quickly with no further consequence beyond the request to delete the image.</p>

      <p>However, if you continue after being warned, or if you are caught photographing restricted equipment, the response escalates. This is not the situation you want to be in after a 12-hour flight with luggage to collect.</p>

      <h2>After Customs: You Are Free to Take Photos</h2>
      <p>Once you exit through the final customs checkpoint into the public arrivals hall, you are free to take photos and video. The public terminal, the information booths, transportation counters, and the iconic view of people waiting at the exit are all fair game. Many travelers take a relief selfie here — that is perfectly fine and very common.</p>
    `
  },

  '3-esim-vs-usim-convenience': {
    slug: '3-esim-vs-usim-convenience',
    title: '3. Connectivity: eSIM vs. Convenience Store USIM',
    excerpt: 'Don\'t waste time or money at airport telecom counters. Here is the complete 2026 guide to staying connected the moment you land in Korea.',
    date: 'March 18, 2026',
    readTime: '7 min read',
    category: 'Tech',
    youtubeSearch: 'Korea eSIM Setup in 1 Minute',
    youtubeTimeline: [
      { time: "출발 전", desc: "Airalo·KT eSIM 앱 다운로드 → 한국 플랜 구매 (7일 $10 / 30일 $20 내외). QR코드 저장." },
      { time: "착륙 5분 전", desc: "비행기 모드 해제 준비 → 보조 SIM 슬롯에 eSIM 활성화 설정 확인." },
      { time: "착륙 직후", desc: "비행기 모드 해제 → eSIM 자동 활성화 (1~3분). 공항 무료 WiFi 필요 없음." },
      { time: "이민국 전", desc: "카카오맵·구글맵 미리 로딩 → LTE/5G 연결 확인. 즉시 사용 가능." },
      { time: "05:00", desc: "유심 필요 시 → 도착 홀 CU·GS25 'Tourist USIM' 요청. 여권 지참 필수. 5~10분 개통." },
      { time: "10:00", desc: "데이터 연결 테스트 → 유튜브 또는 카카오맵 실행으로 확인." },
    ],
    content: `
      <h2>Staying Connected in Korea: Your 2026 Options</h2>
      <p>South Korea has some of the fastest and most reliable mobile internet in the world. 5G coverage in major cities is excellent, and 4G LTE is available virtually everywhere. The challenge for tourists is not the network quality — it is navigating the SIM purchasing process efficiently.</p>

      <p>There are three main options for international tourists: eSIM, physical Tourist USIM from a convenience store, or a full network contract (not recommended for short visits). Here is everything you need to know.</p>

      <h2>Option 1: eSIM (Best for Most Travelers)</h2>
      <p>An eSIM (embedded SIM) allows you to activate a Korean data plan digitally, before you even board the plane. No physical card is needed — your existing phone downloads the new carrier profile wirelessly.</p>

      <h3>Advantages of eSIM:</h3>
      <ul>
        <li><strong>Instant activation:</strong> You can be connected the moment you land, before you even reach immigration.</li>
        <li><strong>No queuing:</strong> Skip the telecom counters at the airport entirely.</li>
        <li><strong>Keep your home SIM active:</strong> With dual-SIM phones, you can use your Korean data plan while keeping your home number active for calls and texts.</li>
        <li><strong>Competitive pricing:</strong> Many eSIM providers offer 7-day or 30-day unlimited data plans for $15–$30 USD.</li>
      </ul>

      <h3>How to Get a Korean eSIM:</h3>
      <ol>
        <li>Check if your phone supports eSIM (most iPhones from XS onwards, Samsung Galaxy S20+, Google Pixel 3+).</li>
        <li>Purchase a plan from providers like Airalo, Klook, or KT Roaming before your trip.</li>
        <li>Follow the QR code activation instructions in the app.</li>
        <li>Set the eSIM as your "data" SIM in your phone settings before landing.</li>
      </ol>

      <h3>Limitations:</h3>
      <ul>
        <li>eSIM plans are usually data-only — no Korean phone number for local calls.</li>
        <li>Some older phones do not support eSIM.</li>
        <li>Apps like KakaoTalk work fine over data, so voice calls are rarely needed.</li>
      </ul>

      <h2>Option 2: Tourist USIM from a Convenience Store</h2>
      <p>If you need a physical SIM with a Korean phone number, or if your phone does not support eSIM, convenience stores are your best option — <strong>not the airport telecom counters</strong>.</p>

      <h3>Why Skip the Airport Telecom Counters?</h3>
      <p>Airport telecom counters (SK Telecom, KT, LG U+) at Incheon sell Tourist USIMs at significantly higher prices than convenience stores due to airport rent costs. The same product costs 30–50% less at a CU, GS25, or 7-Eleven in the city.</p>

      <h3>How to Buy a Tourist USIM at a Convenience Store:</h3>
      <ol>
        <li>Find any convenience store (CU, GS25, 7-Eleven, or emart24) — there are several in the arrivals hall of Incheon T1 and T2.</li>
        <li>Ask for a "Tourist USIM" (투어리스트 유심) and show your passport. A passport is required for registration.</li>
        <li>Choose a plan: typically 7-day, 15-day, or 30-day unlimited data options are available, priced from ₩25,000–₩50,000 ($18–$38 USD).</li>
        <li>The staff will activate the SIM for you in-store. The process takes 5–10 minutes.</li>
      </ol>

      <h3>Tourist USIM Benefits:</h3>
      <ul>
        <li>Includes a Korean phone number, useful for booking restaurants via apps or receiving verification texts.</li>
        <li>Physical card compatible with all unlocked phones.</li>
        <li>Works with all Korean carriers' 4G and 5G networks.</li>
      </ul>

      <h2>Option 3: Pocket WiFi Rental</h2>
      <p>Pocket WiFi (portable hotspot device) rentals are available at the airport. You rent a small device that creates a WiFi hotspot, allowing multiple devices to connect simultaneously. This is ideal for families or groups but adds the burden of carrying an extra device and remembering to charge it. For solo travelers or couples, an eSIM or USIM is more practical.</p>

      <h2>Recommendation Summary</h2>
      <ul>
        <li><strong>Solo/couple, modern phone:</strong> eSIM — activate before you leave home.</li>
        <li><strong>Older phone, or need Korean number:</strong> Convenience store Tourist USIM at Incheon arrivals (not the telecom counter).</li>
        <li><strong>Group of 3+ people:</strong> Consider Pocket WiFi rental for cost efficiency.</li>
      </ul>

      <h2>Apps You Will Need After Connecting</h2>
      <p>Once you have internet, download these essential apps immediately:</p>
      <ul>
        <li><strong>KakaoMap:</strong> Better than Google Maps for Korean addresses and public transit.</li>
        <li><strong>Papago:</strong> Naver's translation app with camera translation — essential for menus and signs.</li>
        <li><strong>KakaoT:</strong> Taxi booking app, more reliable than hailing on the street.</li>
        <li><strong>Naver Map:</strong> Alternative to KakaoMap with different restaurant data.</li>
      </ul>
    `
  },

  '4-taxi-luggage-limit': {
    slug: '4-taxi-luggage-limit',
    title: '4. The Taxi Luggage Trap: Group Size Matters',
    excerpt: 'Why 4 people with 4 large bags cannot take a regular taxi in Korea — and what to do instead.',
    date: 'March 18, 2026',
    readTime: '6 min read',
    category: 'Transport',
    youtubeSearch: 'Incheon Airport to Seoul: AREX vs Taxi vs Van',
    youtubeTimeline: [
      { time: "00:00", desc: "세관 통과 → 1층 도착 홀. 4인+대형 캐리어 4개 상황." },
      { time: "02:00", desc: "일반 택시 줄 → 기사가 트렁크 확인 후 고개를 저음. 소나타 트렁크는 대형 캐리어 2개 한계." },
      { time: "03:00", desc: "KakaoT 앱 실행 → '대형 택시' 또는 'Venti(밴)' 선택. 예상 요금 표시." },
      { time: "05:00", desc: "점보 택시 승강장 (1층 4~7번 출구 오른쪽) → '점보택시' 간판 확인. 대형 캐리어 6개까지 가능." },
      { time: "07:00", desc: "Klook 밴 사전 예약 시 → 도착 홀에서 이름 팻말 든 기사 대기. 가장 스트레스 없는 선택." },
      { time: "60:00", desc: "호텔 앞 하차. 기사가 짐 내려줌." },
    ],
    content: `
      <h2>The Luggage Problem That Surprises Every Group</h2>
      <p>You have just landed at Incheon after a long flight, your group has four people, and everyone has a 28-inch suitcase. You head to the taxi stand, relieved to finally be on the ground. Then the driver opens the trunk, looks at your bags, and shakes his head. A standard Korean Sonata or Avante sedan taxi has a trunk that physically cannot fit more than two large suitcases. Your group is stuck.</p>

      <p>This scenario plays out hundreds of times a day at Incheon. It is not the driver's fault — the cars are simply too small. Knowing your options in advance saves significant stress.</p>

      <h2>Standard Taxis: What Fits and What Does Not</h2>
      <p>The typical Korean taxi is a mid-size sedan (Hyundai Sonata or Kia K5). The trunk can comfortably fit:</p>
      <ul>
        <li>2 standard 28-inch suitcases (tight)</li>
        <li>Or 1 large case + 2 carry-on bags</li>
        <li>Or 3 small cabin bags</li>
      </ul>
      <p><strong>It cannot fit:</strong> 3 or 4 large suitcases. Period.</p>

      <h2>Your Solutions for Groups with Large Luggage</h2>

      <h3>1. Jumbo Taxi (Van Taxi) — Best Option</h3>
      <p>At Incheon Airport, there are dedicated "Jumbo Taxi" stands where you can find larger vans (Kia Carnival or similar). These vans can accommodate 4–6 passengers with full luggage. The price is approximately 1.5–2x a regular taxi to the same destination, which is often still cheaper than two standard taxis.</p>
      <p>To find Jumbo Taxis at Incheon T1: Exit the arrivals hall through doors 4–7, look for the Jumbo Taxi sign on the right side of the taxi lane (usually marked with an orange or yellow "점보택시" sign).</p>

      <h3>2. Private Van Transfer — Most Comfortable</h3>
      <p>Pre-book a private van transfer through Klook, KKday, or similar platforms. A van transfer from Incheon to central Seoul typically costs ₩100,000–₩150,000 ($75–$110 USD) for up to 4 people with luggage. The driver will be waiting for you in the arrivals hall with a name sign. For families with children and multiple bags, this is the stress-free choice.</p>

      <h3>3. Two Standard Taxis</h3>
      <p>The least ideal option but works in a pinch. One bag per taxi, split the group. The downside is coordination and slightly higher combined cost than a single van.</p>

      <h3>4. AREX + Luggage Delivery Service</h3>
      <p>An increasingly popular option: send your large suitcases via T-Luggage or Zimcarry (see Tip #19) and take the AREX train to your hotel with just a small personal bag. The luggage arrives at your hotel by evening. This works especially well if you are staying near a major AREX station (Seoul Station, Hongdae, Suseo).</p>

      <h2>Taxi Pricing: What to Expect (2026)</h2>
      <p>Standard taxi fares from Incheon T1 to central Seoul:</p>
      <ul>
        <li><strong>Regular taxi to Hongdae area:</strong> ₩60,000–₩70,000 ($45–$52 USD)</li>
        <li><strong>Regular taxi to Myeongdong/Jung-gu:</strong> ₩75,000–₩90,000 ($56–$67 USD)</li>
        <li><strong>Regular taxi to Gangnam:</strong> ₩80,000–₩100,000 ($60–$75 USD)</li>
        <li><strong>Night surcharge (midnight–4 AM):</strong> Add 40% to the above estimates</li>
      </ul>

      <h2>Using KakaoT for Airport Taxis</h2>
      <p>KakaoT (Korea's dominant taxi app) allows you to book a taxi or van from the airport in advance. In the app, select "Large Taxi" or "Van" to ensure you get an appropriate vehicle. You can also see estimated prices before booking, which helps with budgeting. International credit cards generally work on KakaoT — select "Pay to Driver" at checkout if your card is declined in the app.</p>
    `
  },

  '5-arex-orange-vs-blue': {
    slug: '5-arex-orange-vs-blue',
    title: '5. AREX Guide: Only Follow the Orange!',
    excerpt: 'Express vs. All-stop trains at Incheon. The complete 2026 guide to reaching Seoul quickly and cheaply by rail.',
    date: 'March 18, 2026',
    readTime: '7 min read',
    category: 'Transport',
    youtubeSearch: 'How to take AREX Express Train to Seoul',
    youtubeTimeline: [
      { time: "00:00", desc: "B1 AREX 플랫폼 → 전광판에서 '직통 (Express)' vs '일반 (All-Stop)' 구분." },
      { time: "01:00", desc: "오렌지 직통(급행): 티켓 기계에서 '직통' 선택 → ₩11,000 → 좌석 지정권 출력." },
      { time: "01:30", desc: "파란 일반(완행): T-Money 카드 태그만 해도 탑승 가능 → ₩4,550. 예약 불필요." },
      { time: "04:00", desc: "오렌지 열차 탑승 → 출발. 중간 정차 없음. 차내 WiFi 무료 제공." },
      { time: "43:00", desc: "서울역(Seoul Station) 도착 → 오렌지 급행 종점. 1·4호선 환승 또는 리무진 버스 연결." },
      { time: "56:00", desc: "파란 일반 서울역 도착 (홍대입구 36분, DMC 31분에 먼저 정차)." },
    ],
    content: `
      <h2>The AREX: Seoul's Airport Rail Link Explained</h2>
      <p>The Airport Railroad Express (AREX) is the train line connecting Incheon International Airport to downtown Seoul. It is fast, reliable, air-conditioned, and runs from 5:20 AM to midnight. For most solo travelers and couples without excessive luggage, the AREX is the best way into Seoul.</p>

      <p>The critical thing to understand is that there are <strong>two completely different trains</strong> running on the same AREX line, and choosing the wrong one adds 20–30 minutes to your journey.</p>

      <h2>The Two AREX Trains: Orange vs. Blue</h2>

      <h3>Orange Train: AREX Express (직통열차)</h3>
      <ul>
        <li><strong>Route:</strong> Incheon T1 → Incheon T2 → Seoul Station (NON-STOP)</li>
        <li><strong>Travel time:</strong> 43 minutes from T1, 51 minutes from T2</li>
        <li><strong>Price:</strong> ₩11,000 one way ($8 USD) — seats must be reserved</li>
        <li><strong>Frequency:</strong> Every 30–40 minutes</li>
        <li><strong>Features:</strong> Dedicated luggage racks at every seat, USB charging ports, 100% reserved seating</li>
      </ul>

      <h3>Blue Train: AREX All-Stop (일반열차)</h3>
      <ul>
        <li><strong>Route:</strong> Incheon T1 → 8 intermediate stations → Seoul Station</li>
        <li><strong>Travel time:</strong> 56–66 minutes from T1</li>
        <li><strong>Price:</strong> ₩4,550 ($3.40 USD) — pay with T-money card, no reservation needed</li>
        <li><strong>Frequency:</strong> Every 6–12 minutes</li>
        <li><strong>Features:</strong> Standing room available, connects to Seoul Metro at Gimpo Airport, Digital Media City, and Hongdae stations</li>
      </ul>

      <h2>Which Train Should You Take?</h2>
      <p>The decision comes down to your destination and budget:</p>

      <ul>
        <li><strong>Going to Seoul Station, Myeongdong, or areas well-served by Seoul Station:</strong> Take the Orange Express. The 20-minute time saving justifies the ₩6,500 price difference for most travelers.</li>
        <li><strong>Going to Hongdae (Hapjeong area):</strong> The Blue All-Stop actually serves Hongdae Station directly and is cheaper. Take the blue train and exit at Digital Media City or Hongdae-Ipgu station.</li>
        <li><strong>Budget travelers with flexibility:</strong> The Blue train is perfectly comfortable and saves money. The time difference is not dramatic.</li>
        <li><strong>Large groups with heavy luggage:</strong> The Orange Express's dedicated luggage racks make it more comfortable. Book in advance on the AREX website or at the ticket machines.</li>
      </ul>

      <h2>How to Find the AREX at Incheon T1</h2>
      <ol>
        <li>Exit the baggage claim hall and enter the public arrivals area (Floor 1).</li>
        <li>Follow the signs for "AREX" or "Airport Railroad" — these are on the floor and ceiling in blue and orange colors.</li>
        <li>Take the escalator or elevator down to the <strong>B1 floor</strong> (basement level 1).</li>
        <li>The ticket machines are at the platform entrance. Both trains depart from the same station — check the departure boards for the correct platform.</li>
      </ol>

      <h2>Limousine Bus Alternative</h2>
      <p>If you are not going to Seoul Station or Hongdae, the Airport Limousine Bus may be more convenient. These coaches serve specific areas of Seoul and run directly to bus stops near major hotel districts. Key routes:</p>
      <ul>
        <li><strong>Route 6001:</strong> Seoul Station, Myeongdong</li>
        <li><strong>Route 6002:</strong> Gangnam, Yangjae</li>
        <li><strong>Route 6015:</strong> Mapo, Yeouido</li>
        <li><strong>Route 6103:</strong> Itaewon, Yongsan</li>
      </ul>
      <p>Buses depart from Floors 1 and B1. Ticket machines are near the bus stops. Keep your luggage ticket ("Claim Tag") safe — the bus driver may check it when loading bags into the luggage compartment.</p>

      <h2>T-Money Card: Your Transport Pass</h2>
      <p>For the Blue All-Stop AREX and all Seoul subway and bus travel, you need a T-Money card (or a card with T-Money function). You can buy these at convenience stores in the arrivals hall for ₩4,000 ($3 USD) and top them up with cash or card. T-Money cards save approximately 10–15% on fares compared to single-ride tickets.</p>
    `
  },

  '6-emergency-1330-papago': {
    slug: '6-emergency-1330-papago',
    title: '6. SOS: 1330 and Papago are Your Best Friends',
    excerpt: 'How to instantly solve language barriers, navigate emergencies, and find lost items anywhere in Korea.',
    date: 'March 18, 2026',
    readTime: '6 min read',
    category: 'SOS',
    youtubeSearch: 'Korea Travel Emergency Guide: 1330 & LOST112',
    youtubeTimeline: [
      { time: "00:00", desc: "긴급 상황 발생 → 1330 전화 (무료, 24시간). 첫 번째 영어 안내 나오면 '1' 누르기." },
      { time: "00:30", desc: "통역사 연결 → 3자 통화로 택시기사·약사·식당 주인과 실시간 소통 가능." },
      { time: "02:00", desc: "분실물 신고 → 경찰: 112 / 분실물 찾기: LOST112.go.kr 접속." },
      { time: "05:00", desc: "Papago 앱 → 카메라 모드 실행 → 온돌/에어컨 리모컨 한국어 버튼 실시간 번역." },
      { time: "07:00", desc: "텍스트 번역 → 메뉴판 또는 간판 촬영 → 즉시 번역. 오프라인 한국어 팩 미리 다운로드 권장." },
    ],
    content: `
      <h2>The Two Resources That Solve Almost Every Problem in Korea</h2>
      <p>Korea is an incredibly safe and well-organized country for tourists. But language barriers and unfamiliar systems can still create stressful situations. Two tools — the 1330 hotline and the Papago translation app — solve the vast majority of problems you will encounter. Bookmark this page before your trip.</p>

      <h2>1330: Korea's Official Tourism Hotline</h2>
      <p>1330 is a free government hotline operated by the Korea Tourism Organization (KTO). It offers 24/7 interpretation and travel assistance in multiple languages including English, Chinese, Japanese, and several others.</p>

      <h3>What 1330 Can Do for You:</h3>
      <ul>
        <li><strong>Real-time interpretation:</strong> You call 1330, they connect a three-way call between you, the interpreter, and whoever you need to speak with (a shopkeeper, a taxi driver, a landlord, a pharmacist).</li>
        <li><strong>Emergency guidance:</strong> If you are involved in an accident or medical emergency and need to explain your situation to Korean responders, 1330 connects you with an interpreter who can relay information.</li>
        <li><strong>Travel information:</strong> Ask about transportation, tourist attractions, current events, or local recommendations.</li>
        <li><strong>Complaint handling:</strong> If you believe you have been overcharged or mistreated (common complaints include taxi drivers taking long routes), 1330 can help document the complaint and advise next steps.</li>
      </ul>

      <h3>How to Call 1330:</h3>
      <p>Simply dial <strong>1330</strong> from any Korean phone (mobile or landline). If you are using a foreign SIM, dial <strong>+82-2-1330</strong>. The call is free. Select your language when prompted.</p>

      <h2>Papago: Camera Translation That Actually Works</h2>
      <p>Naver's Papago app is essential for navigating Korean menus, signs, instruction labels, and any written text. Unlike Google Translate's camera mode, Papago is specifically optimized for Korean and handles the grammatical complexity of the language far better.</p>

      <h3>Best Uses for Papago:</h3>
      <ul>
        <li><strong>Restaurant menus:</strong> Point your camera at a Korean-only menu and see an instant translation overlay. This is vastly better than trying to ask a busy server to explain dishes.</li>
        <li><strong>Appliance controls:</strong> Boilers, washing machines, air conditioners in Korean apartments often have Korean-only controls. Papago camera solves this immediately.</li>
        <li><strong>Medicine packaging:</strong> Dosage instructions and warnings on Korean medicine are critical information. Photograph them in Papago before taking anything.</li>
        <li><strong>Street signs and directions:</strong> When maps do not show all signage, photographing directional signs helps.</li>
        <li><strong>Conversation mode:</strong> Papago has a voice-to-voice translation mode useful for real-time conversations with locals.</li>
      </ul>

      <h2>Lost and Found: lost112.go.kr</h2>
      <p>If you lose a wallet, passport, phone, or any item in Korea, check <strong>lost112.go.kr</strong> — Korea's national lost and found database maintained by the National Police Agency. What makes this remarkable is that every item turned into any police station or lost property office nationwide is photographed and uploaded to this database within 24 hours. The recovery rate for lost items in Korea is genuinely high.</p>

      <h3>How to Use lost112.go.kr:</h3>
      <ol>
        <li>Go to lost112.go.kr (available in English)</li>
        <li>Enter a description of your lost item and the date/location where you lost it</li>
        <li>Browse matching items with photos</li>
        <li>If found, the site shows which police station holds the item and provides contact information</li>
      </ol>

      <h2>Emergency Numbers in Korea</h2>
      <ul>
        <li><strong>112</strong> — Police</li>
        <li><strong>119</strong> — Fire / Ambulance</li>
        <li><strong>1330</strong> — Korea Tourism Hotline (multilingual)</li>
        <li><strong>1345</strong> — Immigration contact center</li>
        <li><strong>1339</strong> — Medical emergencies (can connect English interpreter)</li>
      </ul>

      <h2>Boiler and Appliance Troubleshooting</h2>
      <p>One of the most common frustrations for first-time visitors staying in Korean apartments (Airbnb or otherwise) is the ondol floor heating system. Korean boilers look intimidating. Papago + the boiler's manual (usually in the kitchen or bathroom cabinet) solves this almost every time. The typical controls are: 외출 (Away/out), 온수 (Hot water), and 실내 (Indoor/room temp). Use Papago to identify each button before touching anything.</p>
    `
  },

  '7-wowpass-and-exchange': {
    slug: '7-wowpass-and-exchange',
    title: '7. Money Hack: WOWPASS and Myeongdong Holy Grail',
    excerpt: 'Korea is 99% cashless but foreign cards sometimes fail. Here is the complete 2026 money guide for tourists.',
    date: 'March 18, 2026',
    readTime: '7 min read',
    category: 'Money',
    youtubeSearch: 'Myeongdong Exchange vs WOWPASS 2026',
    youtubeTimeline: [
      { time: "00:00", desc: "공항 환전소 → 환율 최악 (5~8% 수수료). 긴급 소액만 환전 (₩30,000 이내)." },
      { time: "10:00", desc: "WOWPASS 기계 (홍대·명동·강남역 등 주요 지하철역 내) → 외국 카드 삽입 → 원화 충전." },
      { time: "12:00", desc: "WOWPASS 카드 수령 → 편의점·식당·카페에서 T-Money+페이 겸용 사용 가능." },
      { time: "15:00", desc: "명동 사설 환전소 (하나은행 명동점 인근) → 여권 지참 시 최고 환율 제공." },
      { time: "20:00", desc: "ATM 출금 → 글로벌 ATM (GS25·CU 내 '글로벌 ATM' 스티커 확인) → 해외 카드로 원화 출금." },
    ],
    content: `
      <h2>Managing Money in Korea: What Actually Works in 2026</h2>
      <p>South Korea is one of the most cashless societies in the world. The vast majority of transactions — restaurants, taxis, convenience stores, cafes, taxis — accept credit and debit cards. However, international cards (especially non-Visa/Mastercard) sometimes fail at certain terminals. Having a backup strategy is wise.</p>

      <h2>Step 1: Airport Exchange — Only Convert a Small Amount</h2>
      <p>When you arrive at Incheon, there will be exchange counters in the arrivals hall. Exchange only what you need for immediate expenses: roughly $30–$50 USD is sufficient for the first few hours (airport snacks, a T-money card top-up, small purchases before you find a better exchange rate).</p>

      <p>Airport exchange counters are convenient but offer poor rates — typically 5–8% worse than city rates. Do not exchange large amounts at the airport.</p>

      <h2>Step 2: WOWPASS — The Smart Tourist Card</h2>
      <p>WOWPASS is a prepaid Visa card specifically designed for international tourists in Korea. You load it using cash at WOWPASS machines located in major subway stations, and it functions as a contactless card accepted everywhere Visa is accepted in Korea.</p>

      <h3>Why WOWPASS Is Useful:</h3>
      <ul>
        <li><strong>Load with foreign currency:</strong> WOWPASS machines accept USD, EUR, JPY, CNY, and other major currencies directly. The exchange rate is competitive (usually 1–2% better than bank counters).</li>
        <li><strong>Works where foreign cards fail:</strong> Some Korean POS terminals reject non-Korean issued cards. WOWPASS (being a Korean-issued card) works universally.</li>
        <li><strong>No foreign transaction fees:</strong> Unlike most international debit cards, there are no per-transaction fees within Korea.</li>
        <li><strong>T-Money function:</strong> WOWPASS doubles as a T-Money transit card, so you use one card for both shopping and subway/bus rides.</li>
      </ul>

      <h3>WOWPASS Machine Locations:</h3>
      <p>WOWPASS machines are found in Hongdae, Sinchon, Myeongdong, Insadong, and other tourist-heavy areas. The machine interface is available in English, Chinese, and Japanese.</p>

      <h2>Step 3: Best Cash Exchange Rates in Seoul</h2>
      <p>If you need Korean Won in cash (some small markets and street food vendors are cash-only), the best rates in Seoul are consistently found in one place:</p>

      <h3>Myeongdong Exchange Alley</h3>
      <p>The privately-run exchange booths on the street directly in front of the <strong>Chinese Embassy in Myeongdong</strong> (주한중국대사관 앞 환전소) offer the best Won/USD rates in the entire city — typically 0.5–1% better than hotel counters and 4–6% better than airport rates.</p>

      <p><strong>Pro tip:</strong> Bring crisp, clean $100 USD bills. The booths apply a slight discount to worn or marked bills. $100 bills consistently fetch better rates than $50 or $20 bills.</p>

      <h2>Using Foreign Cards in Korea</h2>
      <p>Visa and Mastercard issued internationally work at most large chain stores, hotels, and restaurants in major cities. Common failure points for foreign cards include:</p>
      <ul>
        <li>Small independent restaurants and markets (especially outside Seoul)</li>
        <li>Some subway ticket machines (use T-Money instead)</li>
        <li>Older POS terminals without contactless NFC</li>
        <li>Certain online Korean reservation platforms that only accept Korean-issued cards</li>
      </ul>

      <h2>Tipping Culture: There Is None</h2>
      <p>Korea has no tipping culture. Tipping in restaurants, taxis, or hotels is not just unnecessary — it can be awkward and confusing for staff. Service charges, when applicable, are included in the menu price. Never add a tip to a credit card slip. Simply pay the amount shown.</p>

      <h2>Summary: Your Korea Money Toolkit</h2>
      <ul>
        <li>Exchange $30–$50 at the airport for immediate needs only</li>
        <li>Get a WOWPASS card at a subway station machine for a working local card</li>
        <li>For larger cash needs, use Myeongdong exchange booths with $100 bills</li>
        <li>Use contactless Apple Pay / Google Pay where available — works at many major retailers</li>
        <li>Keep a T-Money card (or WOWPASS with T-Money) for all public transportation</li>
      </ul>
    `
  },

  '8-seasonal-clothing-tips': {
    slug: '8-seasonal-clothing-tips',
    title: '8. Packing: Long Puffers and Heat-Tech',
    excerpt: 'Surviving the Siberian winds of Seoul winter and the summer monsoon — the honest Korea packing guide.',
    date: 'March 18, 2026',
    readTime: '6 min read',
    category: 'Culture',
    youtubeSearch: 'What to wear in Korea: Season Guide',
    youtubeTimeline: [
      { time: "11~2월", desc: "필수: 롱패딩(무릎 아래) + 유니클로 히트텍 2장 겹치기. 영하 15°C 체감 대비." },
      { time: "3~4월", desc: "낮에는 가을 재킷, 아침저녁은 추움. 벚꽃 시즌 → 여의도·경복궁 혼잡 예상." },
      { time: "5~6월", desc: "가장 좋은 날씨. 얇은 카디건·청재킷. 자외선 차단제 필수." },
      { time: "7~8월", desc: "고온다습 → 편의점 투명 우산 ₩3,000에 구매. 습도 90%에도 사용 가능한 통기성 옷 권장." },
      { time: "9~10월", desc: "가을 단풍 시즌. 낮에는 반팔 가능, 저녁은 긴팔 필요." },
    ],
    content: `
      <h2>Korea's Four Distinct Seasons</h2>
      <p>South Korea experiences four dramatically different seasons, and packing wrong can make or ruin your trip. Unlike many travel destinations where "layers" is a sufficient answer, Korea's seasonal extremes require specific clothing knowledge.</p>

      <h2>Winter (December–February): Dress for Siberian Wind</h2>
      <p>Seoul winters are brutal. The city sits at the end of a cold Siberian air corridor, and wind chill makes actual temperatures feel significantly colder than the thermometer shows. Average temperatures are -5°C to 5°C (23–41°F), but with wind it can feel like -15°C (-5°F) in exposed areas like the Han River or Bukhansan mountain.</p>

      <h3>Essential Winter Items:</h3>
      <ul>
        <li><strong>Long Puffer (Long Padding / 롱패딩):</strong> The Korean "Long Padding" coat that extends to the knee or ankle is the single most important winter item. Koreans adopted this style specifically because Seoul winters require full-body coverage. Regular hip-length coats leave your legs exposed to wind. If you do not own one, consider buying one in Korea — they are cheaper here than in Western markets.</li>
        <li><strong>Uniqlo Heat-Tech:</strong> Korean winters popularized thermal underwear. Uniqlo's Heat-Tech (available at every Uniqlo location in Seoul) is the gold standard — it is thin enough to layer under normal clothes but dramatically increases warmth retention.</li>
        <li><strong>Neck gaiter or scarf:</strong> Wind protection for the neck is critical. A tube scarf (neck gaiter) is more practical than a traditional scarf as it cannot blow away.</li>
        <li><strong>Waterproof boots or insulated shoes:</strong> Snow is common in December through February. Slip-on sneakers will be miserable within an hour in snowy conditions.</li>
      </ul>

      <h2>Spring (March–May): The Most Comfortable Season</h2>
      <p>Spring is arguably Korea's most beautiful season. Cherry blossom season typically runs from late March to mid-April in Seoul. Temperatures range from 10°C to 22°C (50–72°F), making light layers ideal.</p>
      <ul>
        <li>A light jacket or windbreaker is sufficient for most of spring.</li>
        <li>April evenings can still drop to 7–10°C, so pack one mid-weight layer.</li>
        <li>Rain is possible — a compact travel umbrella is useful.</li>
        <li>Comfortable walking shoes are critical — spring in Korea means long days of outdoor exploration.</li>
      </ul>

      <h2>Summer (June–August): Hot, Humid, and Monsoon Season</h2>
      <p>Korean summers are hot and intensely humid, with a monsoon rainy season (장마, jangma) typically running from late June through mid-July. Temperatures reach 30–35°C (86–95°F) with humidity making it feel like 38–40°C.</p>
      <ul>
        <li><strong>Light, breathable fabrics only.</strong> Cotton and linen are better than synthetics in Korean summer heat.</li>
        <li><strong>Forget the heavy umbrella.</strong> A full-size umbrella in summer heat becomes a burden. Buy a cheap transparent convenience store umbrella (₩2,000–₩3,000, about $2) as soon as you need one — they are sold at every CU, GS25, and street vendor during rain season.</li>
        <li><strong>Sun protection:</strong> Korean summer UV index is extreme. A UV-blocking arm cover (팔토시) is widely used and works better than sunscreen reapplication during long outdoor days.</li>
        <li><strong>Indoor AC is aggressive.</strong> Korean buildings are often very heavily air-conditioned. Bring a light cardigan for restaurants and subway cars.</li>
      </ul>

      <h2>Autumn (September–November): Second Best Season</h2>
      <p>Autumn is Korea's second peak tourist season. Foliage turns in October and November, with Naejangsan and Seoraksan mountains offering world-class autumn leaf viewing.</p>
      <ul>
        <li>Layering is key: warm days (up to 22°C) and cool evenings (down to 5°C in November).</li>
        <li>A medium-weight jacket works for most of September and October.</li>
        <li>By November, temperatures resemble early winter — bring a puffer jacket if visiting late in the month.</li>
      </ul>

      <h2>What to Buy in Korea (Instead of Packing)</h2>
      <p>Korea has excellent clothing retail at very competitive prices. Rather than overpacking for any season, consider buying:</p>
      <ul>
        <li>Uniqlo Heat-Tech (cheaper than home markets, full size range available)</li>
        <li>Long Padding coat if visiting in winter (widely available, often on sale)</li>
        <li>Rain umbrellas (just buy one when it rains — $2 is not worth packing space)</li>
        <li>UV arm covers in summer (sold everywhere, very practical)</li>
      </ul>
    `
  },

  '9-discover-seoul-pass': {
    slug: '9-discover-seoul-pass',
    title: '9. Tourism Hack: Discover Seoul Pass',
    excerpt: 'Free entry to 50+ attractions and unlimited public transit. A complete 2026 analysis of whether the Discover Seoul Pass is worth it.',
    date: 'March 18, 2026',
    readTime: '6 min read',
    category: 'Culture',
    youtubeSearch: 'Is Discover Seoul Pass worth it?',
    youtubeTimeline: [
      { time: "출발 전", desc: "discoverseoulpass.com에서 24·48·72시간권 구매. 앱 바코드 저장 → 종이 발권 불필요." },
      { time: "09:00", desc: "경복궁 입장 → 앱 QR 스캔. 별도 티켓 구매 없이 입장. 성인 ₩3,000 아낌." },
      { time: "11:00", desc: "창덕궁·덕수궁도 동일하게 스캔 입장. 궁 투어 5개 모두 포함." },
      { time: "13:00", desc: "롯데월드 입장 → 줄 없이 바코드만 스캔. 일반 티켓 ₩65,000 vs 패스 사용." },
      { time: "15:00", desc: "한강 유람선·남산 케이블카 포함 여부 확인 (패스 버전에 따라 다름)." },
      { time: "하루 끝", desc: "5개 명소 이상 방문 시 기준 100달러 이상 절약 확인." },
    ],
    content: `
      <h2>What Is the Discover Seoul Pass?</h2>
      <p>The Discover Seoul Pass is an official Seoul city tourism card that combines free admission to over 50 major attractions with unlimited use of the Seoul metro and bus system. It comes in 24-hour, 48-hour, and 72-hour versions, priced at approximately ₩39,900, ₩55,000, and ₩70,000 respectively ($30, $41, $52 USD).</p>

      <p>The card is primarily designed for tourists who want to maximize attraction visits in a short timeframe. Whether it represents value depends entirely on your itinerary.</p>

      <h2>What Is Included?</h2>
      <h3>Major Attractions (Free Entry):</h3>
      <ul>
        <li>Gyeongbokgung Palace, Changdeokgung Palace, Deoksugung Palace</li>
        <li>Lotte World Adventure (Theme Park)</li>
        <li>National Museum of Korea</li>
        <li>Seoul City Tower (N Seoul Tower observation deck)</li>
        <li>Trick Eye Museum</li>
        <li>63 Art (63 Building observation deck)</li>
        <li>War Memorial of Korea</li>
        <li>Seoul Zoo (Grand Park)</li>
        <li>Multiple hanbok rental experiences</li>
        <li>Several amusement parks and cultural experiences</li>
      </ul>
      <h3>Transport:</h3>
      <ul>
        <li>Unlimited Seoul Metro rides (all lines)</li>
        <li>Unlimited Seoul city bus rides</li>
        <li>Some airport limousine bus discounts</li>
      </ul>

      <h2>Is It Worth It? The Math</h2>
      <p>To break even on the 24-hour pass (₩39,900), your individual attraction admissions plus transit costs need to exceed that amount. Consider:</p>
      <ul>
        <li>Lotte World alone: ₩62,000 ($46 USD) → The pass pays for itself with this one attraction if you planned to visit anyway.</li>
        <li>Three palaces: ₩3,000–₩9,000 each → adds up quickly if palace-hopping.</li>
        <li>Subway cost: ₩1,400–₩1,800 per ride → you need about 12 rides to recover the transit value in the 24-hour pass.</li>
      </ul>

      <p><strong>The Verdict:</strong> The pass delivers strong value if your itinerary includes at least one major paid theme park (Lotte World, 63 Art) plus several palace visits. If you are primarily visiting free sites (Bukchon, Hongdae, markets, parks), the pass is unnecessary overhead.</p>

      <h2>How to Buy and Use</h2>
      <p>Discover Seoul Pass cards are available at:</p>
      <ul>
        <li>Incheon and Gimpo Airport tourist information counters</li>
        <li>Seoul Global Cultural Center (near Seoul Station)</li>
        <li>Myeongdong, Hongdae, Dongdaemun, and Insadong tourist information centers</li>
        <li>Online in advance via the official website (best for pre-trip planning)</li>
      </ul>

      <h3>Usage Tips:</h3>
      <ul>
        <li>The 24-hour clock starts from <em>first use</em>, not purchase. Do not activate the card until you are ready to start your first full day.</li>
        <li>At attractions, look for the dedicated Discover Seoul Pass lane at ticketing counters — usually shorter than the regular queue.</li>
        <li>At subway stations, tap the card on the yellow turnstile reader just like a T-Money card.</li>
        <li>Some high-demand attractions (especially Lotte World) may have time slot restrictions during peak season. Check in advance.</li>
      </ul>

      <h2>Alternatives to Consider</h2>
      <ul>
        <li><strong>Seoul City Pass:</strong> A similar product with slightly different attraction inclusions — compare both before buying.</li>
        <li><strong>T-Money card only:</strong> If you are not visiting paid attractions, a regular T-Money card for transit is more economical.</li>
        <li><strong>Individual tickets:</strong> If you are only visiting one or two attractions, individual purchase may be cheaper.</li>
      </ul>
    `
  },

  '10-airbnb-trash-rules': {
    slug: '10-airbnb-trash-rules',
    title: '10. The Trash System: Chicken Bones are Not Food!',
    excerpt: 'Avoid heavy fines by understanding Korea\'s strict recycling and waste disposal system. Essential for anyone staying in a Korean home or Airbnb.',
    date: 'March 18, 2026',
    readTime: '6 min read',
    category: 'SOS',
    youtubeSearch: 'How to throw away trash in Korea Airbnb',
    youtubeTimeline: [
      { time: "00:00", desc: "편의점에서 종량제 봉투(파란색/하얀색) 구매. 크기: 5L·10L·20L. 이 봉투만 일반쓰레기에 사용 가능." },
      { time: "02:00", desc: "닭 뼈·조개껍데기·복숭아씨 → 일반쓰레기(종량제 봉투). 음식물 아님." },
      { time: "03:00", desc: "채소 껍질·밥·국물 → 음식물 쓰레기(갈색 통 또는 별도 비닐). 지역마다 방법 다름." },
      { time: "05:00", desc: "분리수거 → 플라스틱/종이/유리/캔 각각 분리. 라벨 제거 후 깨끗이 씻어야 함." },
      { time: "08:00", desc: "Airbnb 호스트 지침 우선 따르기. 규칙 위반 시 과태료 5만~30만원 가능." },
    ],
    content: `
      <h2>Korea's Mandatory Waste Separation System</h2>
      <p>South Korea operates one of the world's most rigorous waste management systems. Recycling is not optional — it is legally required and enforced. Violating waste disposal rules, especially using the wrong type of bag, can result in fines. For tourists staying in Airbnbs, guesthouses, or serviced apartments, understanding this system prevents unnecessary stress.</p>

      <h2>The Four Main Waste Categories</h2>

      <h3>1. General Waste (일반 쓰레기)</h3>
      <p>This covers non-recyclable, non-food waste: tissues, used paper plates, soiled packaging, broken ceramics, vacuum cleaner dust, and certain food-related items that cannot be composted.</p>
      <p><strong>Bag required:</strong> Official designated waste bags (종량제 봉투) in white/blue/orange, sold at convenience stores. Do NOT use regular supermarket bags — the fine is ₩100,000 ($75 USD).</p>

      <h3>2. Food Waste (음식물 쓰레기)</h3>
      <p>Food waste goes into a separate collection system and is composted or processed for animal feed and biogas. This covers most soft, wet food matter.</p>
      <p><strong>What DOES go in food waste:</strong> Rice, noodles, vegetable peelings, fruit peels (soft), cooked meat scraps (soft pieces without bone), coffee grounds, tea leaves.</p>
      <p><strong>What does NOT go in food waste (this surprises everyone):</strong></p>
      <ul>
        <li><strong>Chicken bones, fish bones, shellfish shells:</strong> Animals cannot digest these, so they are General Waste, not food waste. This is the #1 mistake tourists make.</li>
        <li><strong>Fruit pits and hard seeds</strong> (peach pits, avocado pits, corn cobs)</li>
        <li><strong>Onion skins, garlic skins</strong> (too fibrous)</li>
        <li><strong>Eggshells</strong> (go in General Waste)</li>
        <li><strong>Large amounts of liquid</strong> — drain excess water before disposal</li>
      </ul>

      <h3>3. Recyclables (재활용)</h3>
      <p>Korea has highly developed recycling infrastructure. Most buildings have color-coded bins:</p>
      <ul>
        <li><strong>Paper (종이):</strong> Newspapers, cardboard, clean paper. Cardboard boxes must be broken down flat.</li>
        <li><strong>Plastic (플라스틱):</strong> Bottles and containers marked with recycling symbols. Remove caps and labels when possible, rinse containers.</li>
        <li><strong>Glass (유리):</strong> Glass bottles and jars. Remove caps.</li>
        <li><strong>Metal (캔):</strong> Aluminum cans, metal cans. Rinse clean.</li>
        <li><strong>Styrofoam (스티로폼):</strong> Separate bin, collected on specific days.</li>
        <li><strong>Vinyl/plastic bags (비닐):</strong> Soft plastic films and bags have their own bin.</li>
      </ul>

      <h3>4. Large Waste Items (대형 폐기물)</h3>
      <p>Furniture, appliances, and large items require a special sticker (purchased at the local government office or convenience store) before being left for collection. Tourists generally do not encounter this.</p>

      <h2>Where to Buy Official Waste Bags</h2>
      <p>The official designated waste bags (종량제 봉투) are sold at every convenience store (CU, GS25, 7-Eleven). They come in several sizes (3L, 5L, 10L, 20L, 50L) and are color-coded by district. When buying, mention your neighborhood or show the convenience store staff your address — bags are district-specific.</p>

      <h2>Building-Specific Rules</h2>
      <p>Larger apartment buildings and guesthouses often have their own recycling rooms with labeled bins. Your Airbnb host should provide instructions — if they do not, the bins in the building's trash room are almost always clearly labeled with icons even if you cannot read Korean.</p>

      <h2>Quick Cheat Sheet to Post on Your Fridge</h2>
      <ul>
        <li>✅ Food waste bag: cooked rice, vegetables, fruit peels (soft), soft meat scraps</li>
        <li>❌ General waste (NOT food bag): chicken bones, fish bones, shells, eggshells, fruit pits</li>
        <li>♻️ Recyclable bins: paper, clean plastic, glass, metal cans — rinse first</li>
        <li>🛍️ Always use official white/orange 종량제 bags for general waste</li>
      </ul>
    `
  },

  '11-pharmacies-and-tylenol': {
    slug: '11-pharmacies-and-tylenol',
    title: '11. Health: Pharmacies vs. Convenience Stores at 2 AM',
    excerpt: 'Where to find medicine, what is available without a prescription, and how to access English-speaking medical care in Korea.',
    date: 'March 18, 2026',
    readTime: '6 min read',
    category: 'SOS',
    youtubeSearch: 'Getting Medicine in Korea Guide',
    youtubeTimeline: [
      { time: "00:00", desc: "심야 복통·두통 → 편의점(CU·GS25) 먼저. 이부프로펜·타이레놀·소화제 처방전 없이 구매." },
      { time: "05:00", desc: "Pharm114.or.kr 접속 → '야간 당번 약국' 검색 → 현재 내 위치 기준 24시간 약국 찾기." },
      { time: "10:00", desc: "약국(약국 간판, 빨간 십자가) → 약사에게 증상 설명. Papago 사용. 처방전 없이 대부분 구매 가능." },
      { time: "15:00", desc: "응급 상황 → 119 (구급차). 1339 전화 → 의료 상담 (영어 통역 연결)." },
      { time: "20:00", desc: "코로나·독감 키트 → 편의점에서 판매. 10분 내 자가진단 가능." },
    ],
    content: `
      <h2>Healthcare and Medicine Access in Korea for Tourists</h2>
      <p>South Korea has an excellent healthcare system. Major hospitals are modern and well-equipped, and the country has a robust pharmacy network. However, the system works differently from Western countries, and knowing what you can access without a prescription — and where — saves significant time and money during your trip.</p>

      <h2>Convenience Stores: Open 24/7 for Basic Needs</h2>
      <p>Korean convenience stores (CU, GS25, 7-Eleven, emart24) sell a limited but useful range of over-the-counter medicines without a prescription:</p>
      <ul>
        <li><strong>Tylenol / Acetaminophen:</strong> Available in small blister packs (usually 2 tablets per pack). Brand name is often "타이레놀" (Tylenol) or generic "아세트아미노펜."</li>
        <li><strong>Ibuprofen (애드빌/이부프로펜):</strong> Available at some convenience stores in limited doses.</li>
        <li><strong>Basic cold medicine:</strong> Decongestants, cough suppressants in liquid form.</li>
        <li><strong>Antacids and digestive aids:</strong> Useful after Korean BBQ excess.</li>
        <li><strong>Eye drops, antiseptic, and bandages</strong> for minor injuries.</li>
      </ul>

      <p>Convenience store medicines come in very small quantities — typically 1–2 dose packs — which is useful for immediate relief but not for longer treatment courses.</p>

      <h2>Pharmacies (약국): For More Serious Needs</h2>
      <p>Korean pharmacies (약국, yakguk) have a much wider selection than convenience stores and trained pharmacists who can provide guidance on appropriate medications. Pharmacies are not open 24/7 — typical hours are 9 AM to 9 PM, with some variation.</p>

      <h3>Finding Late-Night Pharmacies:</h3>
      <p>For after-hours needs, use <strong>Pharm114.or.kr</strong> — Korea's official national pharmacy search service. Filter by "24 hours" or "late night" (심야 약국) to find the nearest open pharmacy. There are always designated night-duty pharmacies in major districts.</p>

      <h3>What Pharmacists Can Do:</h3>
      <p>Korean pharmacists are highly trained and can recommend appropriate OTC treatments for common ailments. Many pharmacists in tourist areas speak basic English, and showing a photo of a symptom (on your skin, or similar) combined with Papago translation works well for communication.</p>

      <h2>Prescription Medications</h2>
      <p>Medications that require a prescription in your home country may have different classifications in Korea. Do not assume something is OTC here just because it is at home, or vice versa. If you rely on prescription medication, bring a sufficient supply from home with a doctor's note and the medication in original packaging with your name on it.</p>

      <h2>International Clinics for English Speakers</h2>
      <p>If you need a doctor, Korea has international clinics at major hospitals specifically serving foreign patients with English-speaking staff:</p>
      <ul>
        <li><strong>Severance Hospital International Health Care Center</strong> (신촌, near Sinchon station)</li>
        <li><strong>Asan Medical Center International Health Care Center</strong> (송파구, near Asan Medical Center station)</li>
        <li><strong>Samsung Medical Center International Medical Service</strong> (강남, Gangnam area)</li>
        <li><strong>Seoul National University Hospital International Healthcare Center</strong> (종로, near Hyehwa station)</li>
      </ul>

      <p>These centers typically offer same-day appointments, English-speaking doctors, and significantly lower costs than equivalent private care in Western countries. A standard consultation runs ₩50,000–₩150,000 ($37–$112 USD) depending on the specialty.</p>

      <h2>Travel Insurance Reminder</h2>
      <p>Korean hospitals require upfront payment. Travel insurance that covers medical emergencies is strongly recommended. Keep all receipts for reimbursement claims. Major credit cards (particularly Visa Infinite, Mastercard World) may include basic travel medical coverage — check your card benefits before your trip.</p>

      <h2>1339: Medical Emergency Interpretation</h2>
      <p>If you face a medical emergency and need interpretation between you and Korean medical staff, call <strong>1339</strong> (the medical emergency interpretation hotline). Like 1330, this is free and available 24/7 in multiple languages.</p>
    `
  },

  '13-seasonal-best-spots': {
    slug: '13-seasonal-best-spots',
    title: '13. Timing: Cherry Blossoms, Monsoon, and Autumn Leaves',
    excerpt: 'The exact best weeks to visit Korea for cherry blossoms, autumn foliage, and avoiding the monsoon — with specific location guides.',
    date: 'March 18, 2026',
    readTime: '7 min read',
    category: 'Culture',
    youtubeSearch: 'Best time to visit Korea: Season Guide',
    youtubeTimeline: [
      { time: "3~4월", desc: "벚꽃 최성수기 → 여의도·경주·진해. 호텔 2~3배 가격 급등. 최소 3개월 전 예약 필수." },
      { time: "5~6월", desc: "여행 최고 시즌. 날씨 쾌적, 관광객 상대적으로 적음. 한국 사람들도 여행 많이 가는 시기." },
      { time: "7~8월", desc: "부산 해운대·제주 성수기. 고온다습. 휴가철 특수 → 가격 최고점." },
      { time: "9~10월", desc: "단풍 시즌. 내장산·설악산 최고 절경. 10월 중순이 피크." },
      { time: "12~2월", desc: "비수기 → 항공·호텔 가장 저렴. 나미섬 설경, 비발디파크 스키. 영하 체감 대비 필수." },
    ],
    content: `
      <h2>The Best Times to Visit South Korea</h2>
      <p>South Korea's tourism calendar has distinct peaks and valleys. Timing your visit correctly can mean the difference between stunning natural beauty and queues in the rain. Here is the honest breakdown by season.</p>

      <h2>Spring: Cherry Blossom Season (Late March – Mid April)</h2>
      <p>Cherry blossom season is Korea's most spectacular and most crowded tourist period. The exact dates shift by 1–2 weeks each year based on winter temperatures, but the average peak bloom in Seoul is typically the first week of April.</p>

      <h3>Best Cherry Blossom Locations:</h3>
      <ul>
        <li><strong>Jinhae (진해), South Gyeongsang Province:</strong> Korea's most famous cherry blossom festival (군항제, Gunhangje) transforms the entire city into a tunnel of pink blossoms. Timing: late March to early April. The festival runs 10 days. Book accommodation months in advance.</li>
        <li><strong>Yeouido Hangang Park, Seoul:</strong> A 1.7km riverside boulevard lined with flowering cherry trees. Best visited on weekday mornings to avoid weekend crowds.</li>
        <li><strong>Gyeongju Historic Park:</strong> Cherry blossoms among ancient Silla kingdom tombs — a uniquely Korean combination of natural and historic beauty.</li>
        <li><strong>Changgyeonggung Palace, Seoul:</strong> The palace grounds have some of Seoul's oldest cherry trees.</li>
      </ul>

      <h3>Practical Tips for Cherry Blossom Season:</h3>
      <ul>
        <li>Book accommodation 2–3 months in advance if visiting in early April — this is peak season and prices surge.</li>
        <li>Arrive at popular spots before 9 AM to beat the crowds.</li>
        <li>Rain during peak bloom is common — it is also beautiful and the crowds thin significantly.</li>
      </ul>

      <h2>Summer: Monsoon and Beach Season (June – August)</h2>
      <p>Korean summer divides into two distinct phases:</p>

      <h3>Monsoon (Jangma, 장마) — Late June to Mid-July:</h3>
      <p>Heavy, sustained rainfall (average 300–400mm) concentrated over about three weeks. While the rain is often intermittent rather than constant, outdoor activities can be disrupted. The upside: fewer tourists, lower accommodation prices, and lush green scenery.</p>

      <h3>Peak Summer (Mid-July – August):</h3>
      <p>After monsoon ends, Korea's summer is hot and humid but generally dry. Beach season peaks in late July and August:</p>
      <ul>
        <li><strong>Busan's Haeundae Beach (해운대):</strong> Korea's most famous beach, with about 1 million visitors on peak summer weekends. Impressive as a spectacle but genuinely crowded.</li>
        <li><strong>Jeju Island:</strong> Subtropical island with beaches, volcanic landscapes, and seafood. Most enjoyable in June or September-October outside the summer peak.</li>
      </ul>

      <h2>Autumn: Foliage Season (Mid-October – Mid-November)</h2>
      <p>Korea's autumn foliage rivals Japan's for spectacular color. Unlike cherry blossoms, peak foliage timing is more predictable: it typically starts in northern mountains in early October and reaches Seoul by late October.</p>

      <h3>Best Autumn Foliage Locations:</h3>
      <ul>
        <li><strong>Naejangsan National Park (내장산):</strong> Consistently rated Korea's most spectacular autumn spot, known for deep red maple tunnels. Located in North Jeolla Province, about 2.5 hours from Seoul. Best timing: late October to early November.</li>
        <li><strong>Seoraksan National Park (설악산):</strong> Korea's most dramatic mountain landscape. Autumn begins here about 2 weeks before Seoul (early-mid October). Cable car access to the summit area for those who do not want to hike.</li>
        <li><strong>Bukhansan National Park, Seoul:</strong> Surprisingly beautiful autumn foliage accessible by Seoul Metro. Take Line 3 to Gupabal station.</li>
        <li><strong>Gyeongbokgung Palace grounds:</strong> Ginkgo trees in the palace courtyards turn brilliant yellow in November.</li>
      </ul>

      <h2>Winter: For Cultural Immersion (December – February)</h2>
      <p>Winter is Korea's low season for tourism. Accommodation prices drop, major sites are uncrowded, and the cultural calendar is rich with festivals. If you can handle cold weather (-5°C to 5°C in Seoul), winter offers the most authentic experience of everyday Korean life without tourist crowds.</p>
      <ul>
        <li><strong>Hwacheon Sancheoneo Ice Festival (화천산천어축제):</strong> Ice fishing festival in a frozen river, about 2 hours from Seoul. Quirky and uniquely Korean.</li>
        <li><strong>Seoul Lantern Festival (서울빛초롱축제):</strong> Usually December, along Cheonggyecheon Stream.</li>
      </ul>
    `
  },

  '14-korean-bbq-etiquette': {
    slug: '14-korean-bbq-etiquette',
    title: '14. BBQ: The Art of the Ssam (Wrap)',
    excerpt: 'How to eat Samgyeopsal like a local — the complete guide to Korean BBQ etiquette, ordering, and what to never do.',
    date: 'March 18, 2026',
    readTime: '6 min read',
    category: 'Food',
    youtubeSearch: 'How to eat Korean BBQ (Samgyeopsal) properly',
    youtubeTimeline: [
      { time: "00:00", desc: "입장 → 메뉴에서 '생(生)삼겹살' 주문. 냉동 아닌 신선육. 2인분(200g×2) 기준 ₩26,000~." },
      { time: "05:00", desc: "고기 불판에 올리면 → 직접 굽거나 직원에게 맡김. 뒤집는 시기는 갈색으로 변할 때." },
      { time: "10:00", desc: "쌈 싸기: 깻잎·상추 위에 고기+쌈장+마늘+파절임 올리기 → 한 입에 통째로 먹기." },
      { time: "12:00", desc: "반찬(밑반찬) → 김치·콩나물·된장국 등 무제한 리필. 벨 눌러서 요청." },
      { time: "15:00", desc: "가위로 고기 자르기 → 정상. 한국 식당에서는 당연한 일. 젓가락으로 고기 집어도 됨." },
      { time: "20:00", desc: "계산 → 카운터로 직접 가기 (테이블에서 계산서 안 가져다 줌)." },
    ],
    content: `
      <h2>Korean BBQ: More Than Just Grilling Meat</h2>
      <p>Korean BBQ (삼겹살, samgyeopsal, or 고기구이, gogigui) is one of Korea's defining cultural experiences. It is also a social ritual with unwritten rules that, once understood, dramatically enhance the experience. This guide explains exactly how to order, grill, and eat Korean BBQ the right way.</p>

      <h2>Fresh vs. Frozen: Choose Wisely</h2>
      <p>The single most important quality distinction in Korean BBQ is between <strong>Saeng (생, fresh)</strong> and frozen meat. Look for "생삼겹살" (fresh samgyeopsal) on the menu. Fresh pork belly has superior texture and flavor — it is juicier and develops a better char on the grill.</p>
      <p>Restaurants that use frozen meat often do not advertise this fact. A tell is the price — fresh samgyeopsal costs roughly ₩15,000–₩22,000 per 200g serving ($11–$16), while frozen versions may be significantly cheaper. If the price seems unusually low, ask or assume frozen.</p>

      <h2>The Ssam: How to Build the Perfect Wrap</h2>
      <p>The ssam (쌈, wrap) is the proper way to eat Korean BBQ. The technique matters:</p>
      <ol>
        <li><strong>Take one leaf</strong> of perilla (깻잎, kkaennip) or lettuce (상추, sangchu) and hold it in your palm.</li>
        <li><strong>Add a small amount of rice</strong> from the communal rice bowl.</li>
        <li><strong>Place 1–2 pieces of grilled meat</strong> on top of the rice.</li>
        <li><strong>Add a small amount of ssamjang</strong> (쌈장) — the fermented soybean and chili paste condiment that lives on the table.</li>
        <li><strong>Optionally add:</strong> a sliver of raw garlic (grilled garlic is also offered), a piece of green chili, or kimchi.</li>
        <li><strong>Fold the leaf and eat in ONE bite.</strong> This is the etiquette. Multiple bites of a ssam are considered messy and slightly rude. Build it to the right size for your mouth.</li>
      </ol>

      <h2>Who Does the Grilling?</h2>
      <p>In most Korean BBQ restaurants, a staff member will come to your table to do the initial grilling and cutting. At some more casual spots, you grill your own. Either way:</p>
      <ul>
        <li>Do not cut meat against the grain — the staff use scissors (not a knife) and know how to cut it correctly.</li>
        <li>Do not move raw meat off the grill prematurely — the staff will signal when pieces are ready.</li>
        <li>Press the call button (호출 버튼) on the table when you need assistance — do not shout across the restaurant.</li>
      </ul>

      <h2>The Side Dishes (Banchan)</h2>
      <p>Korean BBQ comes with a spread of free side dishes (banchan, 반찬). These are communal and shareable. Important rules:</p>
      <ul>
        <li><strong>Banchan is free and refillable.</strong> Ask for more of any side dish by pointing to the empty bowl and pressing the call button.</li>
        <li><strong>Use communal serving chopsticks</strong> (if provided) or your own clean chopsticks to transfer food to your own plate. Using your eating utensils directly in communal dishes is a hygiene concern in Korea.</li>
        <li><strong>Try everything:</strong> Banchan typically includes kimchi (several varieties), steamed egg (계란찜), bean sprout salad (콩나물무침), garlic mushrooms, pickled radish, and often doenjang jjigae (fermented soybean soup).</li>
      </ul>

      <h2>Recommended Cuts and Ordering Guide</h2>
      <ul>
        <li><strong>삼겹살 (samgyeopsal):</strong> Pork belly — the most popular. Three layers of fat and meat. Rich and satisfying.</li>
        <li><strong>목살 (moksal):</strong> Pork neck/collar — less fatty than belly, slightly more texture. Very tender when grilled properly.</li>
        <li><strong>LA갈비 (LA galbi):</strong> Cross-cut beef short ribs — marinated in soy and sweet soy sauce. Intensely flavorful.</li>
        <li><strong>항정살 (hangjeongsal):</strong> Pork jowl/cheek — often overlooked but prized by locals for its extraordinary fat distribution and flavor.</li>
      </ul>

      <h2>After the Meal: Dosirak Culture</h2>
      <p>Many Korean BBQ restaurants offer a rice finish after the main grilling: fried rice (볶음밥) made in the same grill pan using leftover seasoning and banchan, cooked tableside. This is a uniquely satisfying end to the meal and should not be skipped.</p>
    `
  },

  '15-hanwoo-beef-guide': {
    slug: '15-hanwoo-beef-guide',
    title: '15. Hanwoo Beef: The Snow-White Marbling',
    excerpt: 'The complete guide to experiencing genuine Hanwoo beef in Korea — grades, locations, what to order, and the Majang Market experience.',
    date: 'March 18, 2026',
    readTime: '6 min read',
    category: 'Food',
    youtubeSearch: 'Majang Meat Market Hanwoo Tour',
    youtubeTimeline: [
      { time: "00:00", desc: "마장 축산물 시장 (5호선 마장역) → 한우 직구매. 마블링 등급: 1++ > 1+ > 1 > 2 > 3." },
      { time: "10:00", desc: "정육식당 2층 → 시장에서 산 고기를 가져가면 구워주는 쿡형 식당. 1인 ₩5,000 테이블 이용료." },
      { time: "20:00", desc: "청담·강남 한우 전문점 → 1++등급 채끝 1인분 ₩80,000~₩150,000. 예약 필수." },
      { time: "30:00", desc: "마트(이마트·롯데마트) 한우 코너 → 가성비 선택. 1+등급 100g ₩8,000~₩15,000." },
    ],
    content: `
      <h2>What Is Hanwoo Beef?</h2>
      <p>Hanwoo (한우) is Korea's native cattle breed, prized for its exceptional marbling, flavor, and texture. It is to Korean cuisine what Wagyu is to Japanese: the gold standard of beef, intensely marbled, and significantly more expensive than imported alternatives. Experiencing genuine Hanwoo is one of the most memorable food experiences available in Korea.</p>

      <h2>The Grading System: What 1++ Means</h2>
      <p>Korean beef is graded by the Korean Livestock Products Grading Service (KAPES) on two dimensions: yield grade (A, B, C) and quality grade (1++, 1+, 1, 2, 3). The quality grade reflects marbling, meat color, fat color, and texture.</p>
      <ul>
        <li><strong>1++ (최고등급):</strong> The highest grade. Extraordinary marbling (BMS score 8–9), melt-in-your-mouth texture. Very expensive — typically ₩50,000–₩100,000+ ($37–$75+) per 200g.</li>
        <li><strong>1+ and 1:</strong> Excellent quality with good marbling. More accessible price point without sacrificing much in quality.</li>
        <li><strong>2 and 3:</strong> Good everyday Korean beef. Still Hanwoo, still better than most imported beef, but leaner.</li>
      </ul>

      <h2>Majang Meat Market (마장동 축산물 시장)</h2>
      <p>For the most authentic Hanwoo experience, visit Majang Livestock Market in the Majang-dong area of Seoul (closest station: Majang, Line 5). This is Korea's largest traditional meat market — a labyrinthine complex of wholesalers, butchers, and dedicated BBQ restaurants that cook the beef you just purchased at stalls inside the market.</p>

      <h3>How the Market Works:</h3>
      <ol>
        <li>Enter the market and browse the butchers' stalls on the lower floors. You will see entire carcasses, magnificent cuts displayed on ice, and grading certificates posted prominently.</li>
        <li>Choose your cut and have the butcher portion it to your specification.</li>
        <li>Take your purchased meat upstairs to one of the many BBQ restaurants. A small "grilling fee" (통닭비, 구이비) of approximately ₩5,000–₩10,000 per person is charged for the service, table, and banchan.</li>
        <li>Grill and eat immediately.</li>
      </ol>

      <h3>What to Order at Majang:</h3>
      <ul>
        <li><strong>등심 (deungsim):</strong> Ribeye — the classic marbled choice, most like Wagyu in texture.</li>
        <li><strong>채끝 (chaekkeut):</strong> Striploin — slightly leaner than ribeye but exceptional flavor.</li>
        <li><strong>안심 (ansim):</strong> Tenderloin — the most tender cut, less marbled but extremely soft.</li>
        <li><strong>갈비 (galbi):</strong> Short ribs — sold both marinated and unmarinated at Majang.</li>
      </ul>

      <h2>Certified Hanwoo Restaurants</h2>
      <p>If Majang seems overwhelming, look for the official Hanwoo certification mark (한우 인증) displayed in restaurant windows. This indicates the restaurant has been certified to serve genuine Korean Hanwoo beef (not imported beef labeled misleadingly).</p>
      <p>Itaewon-ro and the Cheongdam-dong area of Gangnam have numerous certified high-end Hanwoo restaurants. Expect to spend ₩80,000–₩200,000 ($60–$150 USD) per person for a full Hanwoo dinner experience at these establishments.</p>

      <h2>Hanwoo vs. Imported Beef: How to Tell the Difference</h2>
      <p>Menus in Korea are required by law to disclose the country of origin of beef. Look for "국내산 한우" (domestic Hanwoo) versus "미국산" (US beef), "호주산" (Australian beef), or "뉴질랜드산" (New Zealand beef). If origin is not listed, ask or be cautious — imported beef is fine but not Hanwoo.</p>
    `
  },

  '17-korean-glasses-in-30-mins': {
    slug: '17-korean-glasses-in-30-mins',
    title: '17. Optics: New Glasses in 30 Minutes',
    excerpt: 'Why Korea\'s optical shops offer the world\'s fastest and most affordable glasses — and how to get yours without hassle.',
    date: 'March 18, 2026',
    readTime: '5 min read',
    category: 'Shopping',
    youtubeSearch: 'Getting Glasses in Korea in 30 Minutes',
    youtubeTimeline: [
      { time: "00:00", desc: "동대문·남대문 안경 거리 또는 홍대 안경원 방문 → 영어 가능한 곳 많음." },
      { time: "05:00", desc: "시력 검사 무료 → 결과지 받기 (약 5분). 집에서 온 처방전도 사용 가능." },
      { time: "10:00", desc: "프레임 선택 → 기본 프레임 포함 단렌즈(1.56) 기준 ₩20,000~₩50,000. 기능 렌즈 추가 시 추가금." },
      { time: "15:00", desc: "제작 시작 → 일반 렌즈는 20~30분 완성. 고굴절·코팅 렌즈는 1~2시간." },
      { time: "30:00", desc: "완성 → 세팅 조정 무료. 착용 테스트 후 이상 없으면 바로 사용 가능." },
    ],
    content: `
      <h2>Korea's Optical Industry: A Hidden Gem for Travelers</h2>
      <p>South Korea is quietly famous among expats and informed travelers for one specific service that most visitors completely overlook: eyeglasses. Korean optical shops (안경원, angyeongwon) offer a combination of speed, quality, and price that simply does not exist in most Western countries.</p>

      <h2>The Numbers: What to Expect</h2>
      <ul>
        <li><strong>Speed:</strong> Basic single-vision glasses with standard lenses are ready in 30–60 minutes in most shops. Progressive (multifocal) lenses typically take 1–2 hours or next-day pickup.</li>
        <li><strong>Price:</strong> A complete pair of glasses with frames and standard single-vision lenses typically costs ₩30,000–₩80,000 ($22–$60 USD) for everyday options. Designer frames with premium lenses run ₩150,000–₩400,000 ($112–$300 USD). This is typically 3–5x cheaper than equivalent purchases in the US, UK, or Australia.</li>
        <li><strong>Eye exam:</strong> Free or ₩5,000–₩10,000 at most shops. The exam uses modern automated equipment and takes 15 minutes.</li>
      </ul>

      <h2>Best Areas for Optical Shopping</h2>
      <h3>Namdaemun Market Area (남대문시장 옆 안경골목)</h3>
      <p>The street adjacent to Namdaemun Market has a famous concentration of optical shops selling glasses at wholesale-adjacent prices. This is the location most recommended by local guides for budget-conscious glasses shopping. Bargaining is possible at smaller independent shops.</p>

      <h3>Dongdaemun Area</h3>
      <p>Several optical chains and independent shops around Dongdaemun offer good variety, particularly for trendier frames popular in Korean fashion.</p>

      <h3>Your Neighborhood Optical Shop</h3>
      <p>For a stress-free experience, simply find the nearest 안경원 (안경) sign in any Seoul neighborhood. The national chains (GC Vision, Eye-Up, EyeMax) offer standardized quality and English-speaking staff at many locations.</p>

      <h2>What to Bring</h2>
      <ul>
        <li><strong>Your current glasses:</strong> The optician can read the prescription from your existing lenses using an automated lensometer. Bringing your prescription printout is helpful but not required.</li>
        <li><strong>Your prescription (if you have it):</strong> Written prescriptions from your home country are accepted. The format (SPH, CYL, AXIS, ADD) is internationally standardized.</li>
        <li><strong>Time:</strong> Allow 1–2 hours including the eye exam and fitting.</li>
      </ul>

      <h2>What They Can Make</h2>
      <ul>
        <li>Single-vision (distance or reading)</li>
        <li>Progressive/multifocal (bifocal)</li>
        <li>High-index lenses (for strong prescriptions)</li>
        <li>Blue light filtering coatings</li>
        <li>Photochromic (Transitions) lenses</li>
        <li>Prescription sunglasses</li>
        <li>Sports frames and specialized lens types</li>
      </ul>

      <h2>Sunglasses: Non-Prescription</h2>
      <p>Korean optical shops also sell fashion sunglasses at excellent prices. Korean-style frames (typically thinner, more angular designs influenced by K-pop fashion) start from ₩15,000 ($11 USD) for basic pairs at Namdaemun or ₩30,000–₩100,000 for current styles at regular shops.</p>
    `
  },

  '18-han-river-chimeak-delivery': {
    slug: '18-han-river-chimeak-delivery',
    title: '18. Han River: Chimeak without a Korean ID',
    excerpt: 'How to order fried chicken and beer to Han River Park without a Korean account — the full 2026 guide for tourists.',
    date: 'March 18, 2026',
    readTime: '5 min read',
    category: 'Food',
    youtubeSearch: 'Ordering Fried Chicken to Han River (No Korean ID)',
    youtubeTimeline: [
      { time: "00:00", desc: "Shuttle Delivery 앱 다운로드 (영어 지원, 국제 카드 사용 가능). 위치 권한 허용." },
      { time: "05:00", desc: "한강 공원에서 현재 위치 핀 설정 → '배달 2구역' 선택. 닭강정·맥주·수박 주문." },
      { time: "10:00", desc: "국제 신용카드로 앱 내 결제. 카카오 계정 없어도 주문 가능." },
      { time: "30:00", desc: "라이더가 배달 구역 2번에 도착 → 앱 알림 수신 → 수령." },
      { time: "35:00", desc: "한강 돗자리 위에서 치킨+맥주 즐기기. 여름 성수기엔 40~50분 걸릴 수 있음." },
    ],
    content: `
      <h2>The Han River Chimeak Experience</h2>
      <p>"Chimeak" (치맥) is the beloved Korean combination of fried chicken (치킨, chikin) and beer (맥주, maekju). The Han River parks are the iconic setting for this experience — sitting on a mat by the river as the sun sets, with a bucket of crispy fried chicken and cold beer, is genuinely one of Seoul's finest simple pleasures.</p>

      <p>The challenge for tourists is that most Korean delivery apps require a Korean phone number and Korean-issued payment card to register. Here is how to do it without either.</p>

      <h2>Option 1: Shuttle Delivery App (Best for Tourists)</h2>
      <p>The <strong>Shuttle Delivery</strong> app (available on iOS and Android) is specifically designed for Han River Park delivery and explicitly supports international users:</p>
      <ul>
        <li>Registration with email (no Korean phone number required)</li>
        <li>International credit cards (Visa, Mastercard) accepted</li>
        <li>English-language interface available</li>
        <li>Menu items include English descriptions</li>
      </ul>

      <h3>How to Order:</h3>
      <ol>
        <li>Download Shuttle Delivery from the App Store or Google Play.</li>
        <li>Enable location services and select your Han River Park (there are multiple — confirm which park you are at: Yeouido, Ttukseom, Banpo, etc.).</li>
        <li>Browse available restaurants — fried chicken chains like BBQ치킨, BHC, 교촌 (Kyochon) are usually available.</li>
        <li>Place your order and head to your designated "Delivery Zone" (배달 구역) sign in the park. These are numbered signs on poles. Your order confirmation will specify which zone number to go to.</li>
        <li>Meet your delivery rider at the zone sign. Payment is completed in-app.</li>
      </ol>

      <h2>Option 2: Han River Convenience Store Kiosks</h2>
      <p>All major Han River parks have large GS25 convenience stores that stock instant foods, snacks, ramyeon (instant noodles made fresh with boiling water provided), and cold beverages including beer. No app or Korean ID required — just buy from the store directly.</p>
      <p>The kiosk approach does not get you fresh fried chicken, but it is the simplest option for spontaneous visits. Many convenience stores in Han River parks also carry pre-packaged fried chicken that is adequate for the experience.</p>

      <h2>Best Han River Parks for the Experience</h2>
      <ul>
        <li><strong>Yeouido Han River Park (여의도한강공원):</strong> The most popular and largest. Excellent city skyline views. Accessible from Yeouido Station (Line 5 or 9).</li>
        <li><strong>Ttukseom Hangang Park (뚝섬한강공원):</strong> Popular with younger crowds and university students. Good for a lively atmosphere.</li>
        <li><strong>Banpo Han River Park (반포한강공원):</strong> Known for the Banpo Rainbow Fountain (분수), which runs in the evenings. Romantic atmosphere.</li>
        <li><strong>Mangwon Han River Park (망원한강공원):</strong> Less touristy, beloved by locals. Slightly less crowded.</li>
      </ul>

      <h2>What to Bring</h2>
      <ul>
        <li>A mat or picnic blanket (rental available at most park kiosks for ₩3,000)</li>
        <li>Bug repellent (summer evenings by the river attract mosquitoes)</li>
        <li>Extra napkins (fried chicken is messy)</li>
        <li>A bag for your trash — leave no trace, use the trash bins provided</li>
      </ul>
    `
  },

  '19-hands-free-travel-t-luggage': {
    slug: '19-hands-free-travel-t-luggage',
    title: '19. Hands-Free: Airport to Hotel Luggage Delivery',
    excerpt: 'Don\'t drag suitcases through Seoul\'s busy subway. Here\'s exactly how to send luggage from Incheon to your hotel for under $20.',
    date: 'March 18, 2026',
    readTime: '5 min read',
    category: 'Transport',
    youtubeSearch: 'Send Luggage from Incheon Airport to Hotel Direct',
    youtubeTimeline: [
      { time: "00:00", desc: "수하물 찾기 후 → 1층 4~6번 출구 사이 T-Luggage 카운터 찾기. (ICN T1 기준)" },
      { time: "02:00", desc: "배송 신청서 작성: 호텔 이름·주소·체크인 시간·방 번호 기재." },
      { time: "05:00", desc: "가방당 ₩15,000~₩25,000 결제 → 추적 영수증 수령." },
      { time: "08:00", desc: "이제 완전 빈손 → AREX 또는 버스로 자유롭게 이동 시작." },
      { time: "21:00", desc: "호텔 프런트에 짐 배송 완료 (12시 이전 접수 시 당일 오후 9시까지 도착)." },
    ],
    content: `
      <h2>The Case for Hands-Free Travel in Korea</h2>
      <p>Navigating Seoul's metro system with large suitcases is genuinely difficult. Subway cars during rush hour have minimal space for luggage. Many stations have stairs despite elevator options. And the walk from a station to a hotel in a hilly neighborhood can involve stairs and narrow alleyways. Korea's luggage delivery services solve this elegantly.</p>

      <h2>T-Luggage (T익스프레스 수하물 배송)</h2>
      <p>T-Luggage, operated by the AREX Airport Railroad in partnership with CJ Logistics, is Korea's most established airport-to-hotel luggage delivery service.</p>

      <h3>Service Details:</h3>
      <ul>
        <li><strong>From Incheon Airport:</strong> Drop your bags at the T-Luggage counter in the arrivals hall (Floor 1, between exits 4–6). You will receive a pickup receipt.</li>
        <li><strong>Delivery time:</strong> Your bags arrive at your hotel by 9 PM on the same day if dropped off before 12 PM. For afternoon arrivals, next-day delivery is available.</li>
        <li><strong>Price:</strong> Approximately ₩12,000–₩18,000 ($9–$13 USD) per bag depending on size and destination. Large bags cost slightly more.</li>
        <li><strong>Coverage area:</strong> All major hotels and guesthouses in Seoul, Incheon, and most major Korean cities. Remote rural areas may not be covered.</li>
      </ul>

      <h3>How to Use:</h3>
      <ol>
        <li>After claiming your bags from the carousel, proceed to the T-Luggage counter in the arrivals hall.</li>
        <li>Fill out a delivery form (available in English, Chinese, and Japanese). Include your hotel name, address, and check-in date/time.</li>
        <li>Pay by credit card or cash.</li>
        <li>Take your receipt. The delivery tracking number can be used to monitor your bags online.</li>
        <li>Proceed to your hotel without your heavy bags. They will be at reception by evening.</li>
      </ol>

      <h2>Zimcarry: Luggage Storage and Delivery Alternative</h2>
      <p>Zimcarry offers a similar service with a slightly different model — they operate pickup points across Seoul (not just at the airport) and are particularly useful for mid-trip luggage transfers between cities.</p>
      <ul>
        <li>Mobile app available in English with clear booking interface</li>
        <li>Can arrange hotel-to-hotel transfers</li>
        <li>Also offers airport drop-off service for departure day</li>
      </ul>

      <h2>Luggage Storage (Day Use)</h2>
      <p>If you need to store bags for a few hours (for example, before check-in or after check-out), options include:</p>
      <ul>
        <li><strong>Station lockers:</strong> Seoul metro stations have coin-operated lockers (₩1,000–₩3,000 per 4 hours). Small and medium sizes are common; large suitcases may not fit.</li>
        <li><strong>Stasher / Bounce:</strong> Apps that locate nearby bag storage partners (cafes, guesthouses, convenience stores) that store luggage for ₩5,000–₩8,000 per bag per day.</li>
        <li><strong>Hotel bell service:</strong> Most hotels will store luggage for a few hours before check-in or after check-out, usually at no charge for guests.</li>
      </ul>

      <h2>Departure: Send Bags to the Airport</h2>
      <p>T-Luggage and Zimcarry also offer reverse service — pickup from your hotel on departure day and delivery to the check-in counter at Incheon. This allows you to spend your last morning exploring Seoul without dragging bags. Book the service the day before departure.</p>
    `
  },

  '20-waiting-apps-catchtable': {
    slug: '20-waiting-apps-catchtable',
    title: '20. No More Lines: CatchTable Global for Tourists',
    excerpt: 'How to secure a table at Korea\'s most popular cafes and restaurants without standing in line for hours.',
    date: 'March 18, 2026',
    readTime: '5 min read',
    category: 'Tech',
    youtubeSearch: 'How to survive Korean Restaurant Waiting Apps',
    youtubeTimeline: [
      { time: "00:00", desc: "인기 식당 도착 → 문 앞 QR코드 스캔 (캐치테이블 글로벌 앱 or 네이버 웨이팅)." },
      { time: "01:00", desc: "인원 수 선택 → 가상 번호 발급. 앱 알림으로 내 차례 알려줌. 자리 이탈 가능." },
      { time: "20:00", desc: "앱 알림 수신 → 5분 내 식당으로 돌아가야 함. 넘기면 자동 취소." },
      { time: "25:00", desc: "도착 확인 누르기 → 입장. 줄 서는 시간 없이 그 동안 주변 관광 가능." },
      { time: "30:00", desc: "CatchTable 사전 예약 → 유명 오마카세·브런치 카페는 1~4주 전 예약 필요." },
    ],
    content: `
      <h2>The Queue Problem in Korean Food Culture</h2>
      <p>Korea's food culture is intensely trend-driven. A restaurant or cafe featured on a popular YouTube channel, Instagram page, or variety show can develop queues of 1–3 hours within a week of the feature. For tourists with limited time in the country, standing in a 2-hour queue for a single meal is an inefficient use of precious travel days.</p>

      <p>The solution is mastering Korea's virtual queuing system.</p>

      <h2>CatchTable Global: The Tourist-Friendly Option</h2>
      <p>CatchTable (캐치테이블) is Korea's most widely used restaurant reservation and remote queuing platform. In 2024, they launched a global version (CatchTable Global) specifically designed for international users.</p>

      <h3>Key Features:</h3>
      <ul>
        <li><strong>Email sign-up:</strong> No Korean phone number required for the global version.</li>
        <li><strong>English interface:</strong> Full app and web interface in English.</li>
        <li><strong>International card payment:</strong> Visa, Mastercard accepted for deposits on reservation-required restaurants.</li>
        <li><strong>Remote waiting:</strong> Join a virtual queue remotely and receive a notification when your table is ready — you do not need to stand at the restaurant from the start.</li>
        <li><strong>Advance reservations:</strong> Book popular restaurants days or weeks in advance.</li>
      </ul>

      <h3>How to Use:</h3>
      <ol>
        <li>Download CatchTable from the App Store or Google Play. Select "Global" version.</li>
        <li>Sign up with your email address.</li>
        <li>Search for restaurants by name, cuisine type, or location.</li>
        <li>For "대기" (waiting) restaurants, join the virtual queue. You will receive an estimated wait time and a notification 10–15 minutes before your turn.</li>
        <li>For reservation restaurants, select your date, time, and party size. Some require a credit card deposit (refundable if cancelled within the policy window).</li>
      </ol>

      <h2>Naver Waiting System (네이버 웨이팅)</h2>
      <p>Many popular spots use Naver's integrated waiting system rather than CatchTable. Naver Waiting requires a Korean phone number for SMS verification, making it difficult for tourists without a Korean SIM. Solutions:</p>
      <ul>
        <li>Use a Tourist USIM (see Tip #3) — this gives you a Korean number for verification.</li>
        <li>Ask your hotel or guesthouse host if they can assist with Naver Waiting registration (most are happy to help).</li>
      </ul>

      <h2>Most Popular Reservation-Required Restaurants by Category</h2>
      <p>Certain categories of restaurants in Seoul are consistently oversubscribed and require advance planning:</p>
      <ul>
        <li><strong>High-end Korean tasting menus (한식 오마카세):</strong> Premium Korean fine dining experiences. Book 2–4 weeks in advance.</li>
        <li><strong>Famous traditional donut (도넛) cafes:</strong> Some have 1–2 hour queues even on weekdays.</li>
        <li><strong>Popular ramen shops:</strong> Japanese-style ramen restaurants with limited seating often have queues from opening time.</li>
        <li><strong>Trending street food:</strong> Queues can be short-lived but intense. CatchTable helps identify if a waiting option is available.</li>
      </ul>

      <h2>Practical Strategy for Food-Focused Visitors</h2>
      <ul>
        <li>Book your top 2–3 must-visit restaurants via CatchTable <em>before you arrive</em> in Korea.</li>
        <li>For spontaneous visits, use CatchTable to check real-time waiting status and join the queue digitally before walking over.</li>
        <li>Weekday lunches (11:30 AM–1 PM) are consistently shorter queue times than weekends or dinner hours.</li>
        <li>Have backup restaurants in mind — if your first choice has a 2-hour wait and no virtual queue, move on.</li>
      </ul>
    `
  },

  '21-taxi-apps-kakaot-and-uber': {
    slug: '21-taxi-apps-kakaot-and-uber',
    title: '21. Calling a Cab: KakaoT and Uber Hacks',
    excerpt: 'How to get a taxi in Korea without getting ripped off — the complete 2026 guide to KakaoT, Uber UT, and what to do when your card fails.',
    date: 'March 18, 2026',
    readTime: '6 min read',
    category: 'Transport',
    youtubeSearch: 'Don\'t hail a Taxi! Use Kakao T or Uber in Korea',
    youtubeTimeline: [
      { time: "00:00", desc: "KakaoT 앱 실행 → 목적지 설정 → 예상 요금 확인. 일반·모범·밴·대형 선택." },
      { time: "01:00", desc: "해외 카드 결제 실패 시 → '현장 결제' 선택. 기사에게 카드 또는 현금으로 직접 결제." },
      { time: "02:00", desc: "기사 배정 → 차량 번호 확인 후 탑승. 탑승 전 번호 일치 필수." },
      { time: "05:00", desc: "목적지 자동 안내 → 기사에게 따로 설명 불필요. 앱 지도로 경로 확인 가능." },
      { time: "30:00", desc: "도착 → 앱 자동 결제 또는 현금·카드 기사에게 결제. 영수증 자동 발송." },
    ],
    content: `
      <h2>Taxis in Korea: Safe, Affordable, and Mostly Metered</h2>
      <p>Korean taxis are generally safe, metered, and reasonably priced compared to Western cities. A cross-city Seoul ride (e.g., Hongdae to Gangnam) typically costs ₩25,000–₩40,000 ($19–$30 USD) depending on traffic. However, the occasional bad experience — overcharging tourists, taking unnecessarily long routes, refusing passengers — makes using a taxi app rather than street hailing the strongly preferred option.</p>

      <h2>KakaoT: Korea's Dominant Taxi App</h2>
      <p>KakaoT (카카오T) is to Korea what Uber is to the US or Grab is to Southeast Asia. It commands the vast majority of the Korean ride-hailing market. Most Korean taxis participate in the KakaoT network.</p>

      <h3>Setup and Registration:</h3>
      <ul>
        <li>Download KakaoT from the App Store or Google Play.</li>
        <li>Registration requires phone verification. International phone numbers work but may have occasional issues. A Korean Tourist USIM (see Tip #3) ensures smooth setup.</li>
        <li>Add your credit card. International Visa/Mastercard cards work for most accounts.</li>
      </ul>

      <h3>If Your Card Is Declined in KakaoT:</h3>
      <p>This is a common issue with certain international cards. The solution: when booking, select <strong>"차내 결제" (Pay to Driver)</strong> at the payment step. This allows you to pay by cash or card directly to the driver at the end of the ride — bypassing the app's payment system entirely.</p>

      <h3>Types of Rides in KakaoT:</h3>
      <ul>
        <li><strong>일반 (Regular):</strong> Standard metered taxi — most common, cheapest option.</li>
        <li><strong>블랙 (Black):</strong> Premium sedan, similar to Uber Black. Fixed price, professional driver.</li>
        <li><strong>벤티 (Venti):</strong> Large van/SUV. Best for groups with luggage (see Tip #4).</li>
        <li><strong>나비콜 (Navi Call):</strong> Wheelchair accessible taxis.</li>
      </ul>

      <h2>Uber (UT) in Korea</h2>
      <p>Uber operates in Korea as "Uber T" (UT), running on a partnership model with licensed Korean taxis. The app experience is essentially the same as Uber elsewhere, and it accepts international payment methods without issue.</p>

      <h3>When to Choose Uber Over KakaoT:</h3>
      <ul>
        <li>If you cannot register for KakaoT due to phone verification issues.</li>
        <li>If your international card works on Uber but not KakaoT.</li>
        <li>Uber sometimes offers promotional pricing during slower periods.</li>
      </ul>

      <p><strong>Coverage note:</strong> Uber's driver pool in Korea is smaller than KakaoT's, so wait times can be longer, especially outside central Seoul or late at night.</p>

      <h2>Street Hailing: When and How</h2>
      <p>Street hailing works in Korea but comes with risks: no record of the ride, no price estimate upfront, and the occasional driver who notices you are a tourist and routes inefficiently. When hailing:</p>
      <ul>
        <li>Only take taxis with the meter clearly visible and running.</li>
        <li>Confirm the destination clearly. Use Naver Map or KakaoMap to show the driver a map pin — addresses in Korea can be confusing even for native drivers.</li>
        <li>The receipt button (영수증) on the taxi meter produces a printed receipt — useful for expense reports or disputes.</li>
      </ul>

      <h2>Night Surcharge: Important Budget Note</h2>
      <p>Korean taxis apply a mandatory 40% surcharge (심야 할증) from midnight to 4 AM. This is legal and not negotiable. Factor this into late-night entertainment budgets — a ride that costs ₩25,000 during the day will cost ₩35,000 after midnight.</p>

      <h2>Designating a Driver Service (대리운전)</h2>
      <p>If you rent a car and plan to drink, Korea has an official designated driver service. Order a driver via KakaoT's "대리" function — a driver rides a foldable bicycle to your location, drives your car to your destination, and departs on the bicycle. This service is widely used by Koreans and costs approximately ₩30,000–₩60,000 depending on distance.</p>
    `
  },

  '22-olive-young-instant-refund': {
    slug: '22-olive-young-instant-refund',
    title: '22. K-Beauty: Olive Young Instant Tax Refund',
    excerpt: 'How to get your VAT refunded immediately at the Olive Young cashier — and the best K-beauty products to buy in 2026.',
    date: 'March 18, 2026',
    readTime: '6 min read',
    category: 'Shopping',
    youtubeSearch: 'Olive Young Must-Haves & Instant Tax Refund Guide',
    youtubeTimeline: [
      { time: "00:00", desc: "올리브영 입장 → 즉시 환급 대상: ₩30,000 이상 단일 영수증 구매. 외국인 전용." },
      { time: "05:00", desc: "계산대에서 여권 제시 → 직원이 VAT(10%) 즉시 차감 후 결제. 공항 환급 부스 불필요." },
      { time: "10:00", desc: "명동 올리브영 → 인기 아이템: 선크림·토너패드·마스크팩·클렌징폼. 한국 최저가." },
      { time: "15:00", desc: "1일 구매 한도 ₩500,000 (면세 기준). 초과 시 공항 환급으로 처리." },
      { time: "20:00", desc: "공항 면세 환급 → 출발장 세관 신고 도장 → 환급 부스 방문. 소요 시간 30~60분." },
    ],
    content: `
      <h2>Olive Young: Korea's Beauty Pharmacy</h2>
      <p>Olive Young (올리브영) is the dominant health and beauty retailer in South Korea, with over 1,300 locations nationwide including multiple stores in every major tourist area. It combines the roles of pharmacy, cosmetics store, skincare retailer, and supplement shop in one accessible format. For K-beauty enthusiasts, it is a mandatory stop.</p>

      <h2>Instant Tax Refund: How It Works</h2>
      <p>Korea's Immediate Tax Refund system (즉시환급) allows tourists to receive their VAT refund directly at the point of sale — meaning the tax is deducted from your total before you pay, rather than filing a claim at the airport.</p>

      <h3>Eligibility Requirements:</h3>
      <ul>
        <li>You are a non-Korean resident (tourist, visa holder on short stay).</li>
        <li>Your total purchase at a single participating store on a single receipt is between <strong>₩30,000 and ₩500,000</strong> ($22–$375 USD). Note: purchases above ₩500,000 are processed through the standard refund method at the airport.</li>
        <li>You show a valid passport at the cashier.</li>
      </ul>

      <h3>How to Get the Refund at Olive Young:</h3>
      <ol>
        <li>Shop until your basket reaches ₩30,000 or more.</li>
        <li>At checkout, <strong>before the cashier rings up your items</strong>, say "택스리펀" (tax refund) or show your passport and say "tax refund please."</li>
        <li>The cashier will scan your passport and apply the VAT deduction (approximately 10% of the pre-tax price) directly to your total.</li>
        <li>Pay the reduced amount. No paperwork to complete. No airport counter queue.</li>
      </ol>

      <p><strong>Important:</strong> The refund must be processed BEFORE payment. If you forget to mention it before the cashier completes the transaction, you cannot get the instant refund on that receipt. You would need to process it at the airport counter instead.</p>

      <h2>Best Olive Young Products for 2026 (Crowd Favorites)</h2>

      <h3>Skincare:</h3>
      <ul>
        <li><strong>Beauty of Joseon Dynasty Cream:</strong> A consistently top-selling traditional Korean skincare item, using hanbang (herbal medicine) ingredients.</li>
        <li><strong>Cosrx Advanced Snail 96 Mucin Power Essence:</strong> Globally recognized, cheaper in Korea than anywhere else.</li>
        <li><strong>Laneige Lip Sleeping Mask:</strong> Iconic overnight lip treatment. Original price significantly cheaper than US/EU prices.</li>
        <li><strong>Dr. Jart+ Cicapair Tiger Grass Cream:</strong> Calming redness-correcting moisturizer, popular for sensitive skin.</li>
      </ul>

      <h3>Sun Protection:</h3>
      <ul>
        <li><strong>Beauty of Joseon Relief Sun SPF 50+:</strong> Consistently rated as one of the best non-greasy Asian sunscreens globally.</li>
        <li><strong>Skin1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum:</strong> Ultra-lightweight sun serum that layers well under makeup.</li>
      </ul>

      <h3>Hair Care:</h3>
      <ul>
        <li><strong>Mise en Scene Perfect Repair Hair Essence:</strong> Affordable leave-in treatment, very popular among Koreans.</li>
        <li><strong>TS Shampoo:</strong> Hair loss prevention shampoo widely used in Korea.</li>
      </ul>

      <h2>Shopping Strategically at Olive Young</h2>
      <ul>
        <li><strong>Myeongdong flagship store:</strong> The largest Olive Young in Korea, with the widest selection. Located in the heart of the shopping district.</li>
        <li><strong>Weekly deals:</strong> Olive Young runs rotating weekly sale events. Check the app (available in English) before visiting.</li>
        <li><strong>Buy multiples of favorites:</strong> If you find a product you love, buy 2–3 units. Prices will not be this low at home.</li>
        <li><strong>Avoid airport Olive Young stores:</strong> Airport locations charge higher prices. Buy in the city.</li>
      </ul>
    `
  },

  '23-no-tipping-and-call-buttons': {
    slug: '23-no-tipping-and-call-buttons',
    title: '23. Manners: No Tipping, Call Buttons, and Public Rules',
    excerpt: 'The essential Korean social etiquette guide for tourists — what to never do and what surprises every first-time visitor.',
    date: 'March 18, 2026',
    readTime: '6 min read',
    category: 'Culture',
    youtubeSearch: '10 Things NOT to do in South Korea',
    youtubeTimeline: [
      { time: "00:00", desc: "식당 입장 → 자리에서 직원 부르면 안 됨. 테이블 벨(호출 버튼) 또는 손들기." },
      { time: "02:00", desc: "계산 → 직원이 와서 받아주지 않음. 식사 후 카운터로 직접 가기." },
      { time: "05:00", desc: "팁 없음 → 한국은 노팁 문화. 놓고 가면 직원이 쫓아올 수 있음." },
      { time: "10:00", desc: "지하철 음식 섭취 → 법적 금지는 아니지만 강한 사회적 금기. 특히 냄새 나는 음식." },
      { time: "15:00", desc: "어른보다 먼저 식사 시작 → 어른이 먹기 시작하면 식사 시작. 술잔 직접 채우지 않기." },
    ],
    content: `
      <h2>Korean Social Etiquette: What Visitors Need to Know</h2>
      <p>South Korea has a rich culture with specific social norms that differ significantly from Western or other Asian contexts. Violating these norms rarely results in confrontation — Koreans are generally very patient with tourists — but understanding them allows you to engage more respectfully and authentically.</p>

      <h2>Rule 1: Absolutely No Tipping</h2>
      <p>Korea operates on a strict no-tipping culture. Leaving money on the table for the server, adding a tip to a credit card slip, or trying to press extra cash into a driver's hand is not just unnecessary — it can be genuinely confusing or even slightly offensive, implying the worker's salary is insufficient.</p>
      <p>Restaurant service charges, when applicable, are already included in menu prices. Delivery app tips are a recent Western import still unusual to most delivery workers. The standard is to pay exactly the amount shown — nothing more.</p>

      <h2>Rule 2: Use the Call Button</h2>
      <p>Korean restaurants almost universally have a call button (호출 버튼) on the table — either a physical button embedded in the table, a small wireless device on the table, or a tablet screen button. Press this to summon your server.</p>
      <p>Do not shout "excuse me" or wave your hand at staff. In Korean service culture, servers do not check on tables proactively — they wait to be called. Shouting across a restaurant is considered rude. The button system is specifically designed to summon staff efficiently and respectfully. Use it confidently — this is exactly what it is for.</p>

      <h2>Rule 3: No Open Beverages on Public Transit</h2>
      <p>Eating or drinking (except water in sealed containers) on Seoul's subway and city buses is prohibited and enforced. Coffee cups, street food, and snacks should be finished before boarding. This rule applies even when trains are not crowded. Fine: up to ₩50,000 ($37 USD).</p>
      <p>Airport express trains and intercity trains have different rules — food is permitted on longer-distance trains.</p>

      <h2>Rule 4: Escalator Etiquette (Under Change)</h2>
      <p>Historically, Seoul escalators had a strict "stand right, walk left" rule. This is actively being changed by the Seoul Metro, which now asks everyone to stand still on escalators for safety reasons. In practice, you will still see many locals walking on the left. The safest approach: stand to the right and allow space if someone wants to pass.</p>

      <h2>Rule 5: Age and Hierarchy in Social Settings</h2>
      <p>Korean society has a strongly hierarchical structure based on age. While tourists are not expected to observe all these norms, being aware of them helps in social situations:</p>
      <ul>
        <li>The eldest person at the table typically pours drinks for others, not themselves. Others pour for the elder.</li>
        <li>When receiving food, drinks, or business cards from someone significantly older, use both hands or support your receiving arm with your other hand.</li>
        <li>Toasting (건배, geonbae): holding your glass slightly lower than an elder's glass when clinking is a sign of respect.</li>
      </ul>

      <h2>Rule 6: Public Display of Affection</h2>
      <p>Korea's attitude toward PDA is mixed. Young couples holding hands, hugging, or sitting close is common and accepted. Very overt kissing in public is still considered inappropriate by many older Koreans. Same-sex PDA remains socially sensitive outside of specific LGBTQ+-friendly areas (particularly Itaewon).</p>

      <h2>Rule 7: Shoes in Traditional Settings</h2>
      <p>Remove your shoes when entering Korean homes and certain traditional restaurants (those with floor seating, 방, bang). There is almost always a visible step at the entrance where the floor level changes — this is the signal to remove shoes. Wearing easily removable shoes is recommended for temple and palace visits where traditional areas may be involved.</p>

      <h2>Rule 8: Photography of People</h2>
      <p>Photographing strangers in public without permission has become increasingly sensitive in Korea, partly due to concerns about misuse on social media. Photographing street performers, market vendors, or restaurant staff for non-commercial purposes is generally tolerated but asking first is respectful, especially in intimate settings.</p>
    `
  },

  '24-jjimjilbang-sauna-guide': {
    slug: '24-jjimjilbang-sauna-guide',
    title: '24. Jjimjilbang: Sheep-Heads and Naked Truths',
    excerpt: 'The complete first-timer\'s guide to the Korean bathhouse (찜질방) — what to expect, what to bring, and how to act.',
    date: 'March 18, 2026',
    readTime: '7 min read',
    category: 'Culture',
    youtubeSearch: 'First Time at a Korean Bathhouse (Jjimjilbang Guide)',
    youtubeTimeline: [
      { time: "00:00", desc: "입장료 ₩8,000~₩15,000 지불 → 락커 열쇠 수령. 성별 분리 구역에서 모든 소지품 보관." },
      { time: "05:00", desc: "탈의실 → 완전 탈의 필수. 수영복·속옷 착용 불가. 한국 목욕 문화 핵심." },
      { time: "10:00", desc: "탕 입장: 온탕(42°C)→냉탕(18°C) 번갈아 사용. 수건 들고 다니기." },
      { time: "20:00", desc: "때밀이 서비스 (이태리 타올) → 기사에게 별도 ₩15,000~₩25,000. 예약 또는 현장 접수." },
      { time: "30:00", desc: "공용 찜질방 구역 → 제공된 반바지+티셔츠 착용 후 입장. 가족 혼용 공간." },
      { time: "40:00", desc: "황토방(60°C)·소금방(50°C)·냉방(15°C) 순환. 각 15~20분 권장." },
    ],
    content: `
      <h2>What Is a Jjimjilbang?</h2>
      <p>A jjimjilbang (찜질방) is a Korean public bathhouse and sauna complex. The word literally means "heated room bathing place." Unlike a simple sauna, a jjimjilbang is a full social wellness facility that Koreans use for relaxation, hangout sessions, and even overnight stays. Entry fees are cheap — typically ₩10,000–₩15,000 ($7–$11 USD) — and the experience is genuinely one of the most distinctive things you can do in Korea.</p>

      <h2>The Two Zones: Understanding the Layout</h2>
      <p>A jjimjilbang has two distinct zones with completely different rules:</p>

      <h3>Zone 1: The Bath Area (목욕 구역)</h3>
      <p>This is the bathing area with hot and cold pools, jet showers, steam rooms, and scrubbing stations. This area is <strong>gender-segregated and fully naked</strong>. Men's and women's entrances are separate. Swimwear is prohibited — everyone uses these facilities completely unclothed. Towels are provided at the entrance.</p>

      <p>For most Westerners, this is the most psychologically challenging part of the jjimjilbang experience. It is important to understand that nudity in the bath area is utterly normalized in Korean culture — there is no social discomfort, no staring, no judgment. It is simply a bathing culture practiced for centuries.</p>

      <h3>Zone 2: The Common Area (찜질방 구역)</h3>
      <p>After bathing, you enter the gender-mixed common area wearing the short-sleeve shirt and shorts provided by the facility (included in the entry fee). This area contains:</p>
      <ul>
        <li>Multiple heated rooms at different temperatures (typically 60°C, 80°C, 100°C, and a cool room)</li>
        <li>Sleeping areas with mats and wooden pillow headrests</li>
        <li>A food counter selling Korean snacks and drinks</li>
        <li>Television viewing area</li>
        <li>PC bang (internet gaming) section in some facilities</li>
        <li>Massage chairs</li>
      </ul>

      <h2>The Heated Rooms: What Each Temperature Does</h2>
      <ul>
        <li><strong>Hwangto (황토방, ~60°C):</strong> Yellow clay room. Mild heat, gentle detox. Good for beginners and extended stays.</li>
        <li><strong>Charcoal (숯불 찜방, ~80°C):</strong> Activated charcoal walls. More intense heat, popular for skin benefits.</li>
        <li><strong>Salt (소금방, ~70°C):</strong> Salt crystal room. Humidity is slightly higher.</li>
        <li><strong>Ice Room (얼음방, ~5°C):</strong> Refrigerated room for contrast therapy after hot sauna. Very popular — Koreans alternate between hot and cold rooms repeatedly.</li>
      </ul>

      <h2>The Iconic Sheep-Head Towel</h2>
      <p>You will see Koreans in jjimjilbangs with their towels twisted into a sheep or lamb shape on top of their heads. This is called a "양 머리" (sheep head) towel style. It is both practical (keeps sweat off the face in hot rooms) and a beloved cultural tradition. Instructions are often posted on the walls. Give it a try — it is a fun photo opportunity and makes you look like a proper jjimjilbang veteran.</p>

      <h2>The Key System: Your Locker Bracelet</h2>
      <p>Upon entry, you are given a locker key on a rubber bracelet. This key opens your locker, is your identity inside the facility, and — crucially — is how you pay for food and additional services. Everything is charged to your key number and settled at checkout. <strong>Do not lose the key</strong> — replacement fees can be significant (₩30,000+).</p>

      <h2>Staying Overnight</h2>
      <p>Many jjimjilbangs operate 24 hours and function as budget accommodation. You can sleep in the common area on provided mats. This is widely used by: people who missed the last train, budget travelers, and Koreans who want a low-cost city-center sleep option. Quality varies significantly between facilities — major chains like Siloam Spa, Dragon Hill Spa (서울 드래곤힐스파), and 찜질나라 are well-maintained.</p>

      <h2>Popular Jjimjilbangs in Seoul</h2>
      <ul>
        <li><strong>Dragon Hill Spa (용산 드래곤힐스파):</strong> The most famous jjimjilbang in Seoul, near Yongsan Station. Multiple floors, outdoor facilities, and English-friendly staff. Premium price (₩16,000+) but excellent experience for first-timers.</li>
        <li><strong>Siloam Spa (실로암사우나):</strong> Near Seoul Station. Popular among backpackers and budget travelers for its central location.</li>
        <li><strong>Spa Lei (스파레이):</strong> Women-only jjimjilbang in Dongdaemun, popular for its premium bathhouse experience in a female-only environment.</li>
      </ul>

      <h2>What to Bring</h2>
      <ul>
        <li>Your locker key bracelet (provided at entrance)</li>
        <li>The facility provides: towels, shorts and shirt for common area, shampoo and soap in bath area</li>
        <li>You may bring: your own preferred shampoo/body wash, flip-flops/sandals (recommended for hygiene), a change of clothes for departure</li>
        <li>Leave at home: jewelry (chlorinated water), valuables beyond what fits in your locker</li>
      </ul>
    `
  }
};
