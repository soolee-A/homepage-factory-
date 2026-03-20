"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck, ArrowLeft, Youtube, ExternalLink,
  Zap, Train, Bus, Car, Smartphone, Navigation,
  Info, Globe, AlertTriangle, Clock, MapPin, Star,
  Luggage, ChevronDown, ChevronUp, PhoneCall,
  Building2, Wifi, CreditCard, CheckCircle2,
} from "lucide-react";
import {
  airports,
  transportData,
  arrivalGuides,
  Transport,
} from "../../../Fetch/airportData";

// ── Types ────────────────────────────────────────────────────────────────
type TabId = "transport" | "sim" | "platform" | "byhotel";

interface HotelArea {
  area: string;
  areaEn: string;
  bestTransport: string;
  reason: string;
  duration: string;
  price: string;
  tip?: string;
  youtube: { search: string; timeline: { time: string; desc: string }[] };
}

// ── Hotel-area recommendations per airport ───────────────────────────────
const hotelAreas: Record<string, HotelArea[]> = {
  ICN: [
    {
      area: "홍대 / 합정 / 마포",
      areaEn: "Hongdae / Hapjeong / Mapo",
      bestTransport: "AREX 일반 (All-Stop)",
      reason: "홍대입구역에 직접 정차. 환승 없이 한 번에 도착.",
      duration: "약 56분",
      price: "₩4,550",
      tip: "T-Money 카드로 바로 탑승. 역 내 편의점 CU에서 구매 가능.",
      youtube: {
        search: "AREX all stop Incheon to Hongdae station guide 2025",
        timeline: [
          { time: "00:00", desc: "B1층 AREX 탑승구 → 파란색(일반) 열차 탑승." },
          { time: "36:00", desc: "홍대입구역 도착 → 9번 출구로 나오면 홍대 중심가." },
          { time: "38:00", desc: "대부분의 게스트하우스·호텔은 9번 또는 3번 출구 10분 이내." },
        ],
      },
    },
    {
      area: "명동 / 중구 / 을지로",
      areaEn: "Myeongdong / Jung-gu",
      bestTransport: "공항버스 6001 or AREX Express",
      reason: "리무진 6001 버스가 명동 앞까지 직행. 또는 AREX Express → 서울역 → 지하철 4호선.",
      duration: "60-80분",
      price: "₩18,000 (버스) / ₩11,000+₩1,500 (AREX+지하철)",
      tip: "짐이 많으면 버스, 빠른 이동이 목적이면 AREX Express + 지하철 4호선 명동역.",
      youtube: {
        search: "Incheon airport bus 6001 Myeongdong hotel shuttle guide",
        timeline: [
          { time: "00:00", desc: "1층 5~9번 출구 → 6001번 리무진 버스 정류소." },
          { time: "05:00", desc: "짐을 트렁크에 넣고 클레임 태그 수령." },
          { time: "70:00", desc: "명동 롯데호텔·신세계 백화점 앞 정차 → 하차." },
        ],
      },
    },
    {
      area: "강남 / 신논현 / 역삼",
      areaEn: "Gangnam / Sinnonhyeon",
      bestTransport: "공항버스 6002 or AREX All-Stop → Line 9",
      reason: "6002 버스가 강남역·신논현역 앞까지 직행. 또는 AREX 일반 → 김포공항에서 9호선 급행 환승.",
      duration: "70-90분",
      price: "₩18,000 (버스) / ₩6,100 (AREX+지하철)",
      tip: "심야에 도착하면 리무진 버스보다 KakaoT Venti가 빠를 수 있음.",
      youtube: {
        search: "Incheon airport bus 6002 Gangnam direct route guide 2025",
        timeline: [
          { time: "00:00", desc: "1층 5번 출구 → 6002번 리무진 버스 탑승." },
          { time: "75:00", desc: "강남역·신논현역·역삼역 순서로 정차." },
          { time: "80:00", desc: "내릴 때 클레임 태그로 짐 수령." },
        ],
      },
    },
    {
      area: "이태원 / 용산 / 한남",
      areaEn: "Itaewon / Yongsan / Hannam",
      bestTransport: "공항버스 6103",
      reason: "6103 버스가 이태원·용산역 앞까지 직행.",
      duration: "60-75분",
      price: "₩17,000",
      youtube: {
        search: "Incheon airport bus 6103 Itaewon Yongsan guide",
        timeline: [
          { time: "00:00", desc: "1층 6번 출구 → 6103번 버스 탑승." },
          { time: "65:00", desc: "이태원 버거킹 앞 정차 → 하차 후 도보 5분 내 대부분 호텔." },
        ],
      },
    },
    {
      area: "여의도 / 영등포",
      areaEn: "Yeouido / Yeongdeungpo",
      bestTransport: "AREX 일반 → 디지털미디어시티 → 9호선 급행",
      reason: "AREX 일반으로 DMC역 하차, 9호선 급행으로 여의도까지 13분.",
      duration: "약 55분",
      price: "₩6,100",
      youtube: {
        search: "Incheon airport to Yeouido subway route AREX Line 9 guide",
        timeline: [
          { time: "00:00", desc: "AREX 일반 탑승 → 디지털미디어시티역 하차 (약 31분)." },
          { time: "31:00", desc: "9호선 급행 환승 → 여의도 방향." },
          { time: "44:00", desc: "여의도역 도착 → IFC몰·한강공원 모두 도보 10분." },
        ],
      },
    },
    {
      area: "3-4인 그룹 / 짐 많음",
      areaEn: "Groups / Heavy Luggage",
      bestTransport: "KakaoT Venti or Klook 전용 밴",
      reason: "일반 택시는 대형 캐리어 2개가 한계. 3인 이상은 반드시 밴 예약.",
      duration: "60분",
      price: "₩100,000–₩150,000",
      tip: "Klook에서 사전 예약 시 기사가 이름판 들고 도착 홀에서 대기. 협상 불필요.",
      youtube: {
        search: "Incheon airport private van transfer family group Klook 2025",
        timeline: [
          { time: "00:00", desc: "수하물 찾은 후 도착 홀 → 기사 이름판 확인." },
          { time: "05:00", desc: "짐 싣고 탑승 → 목적지까지 직행." },
          { time: "60:00", desc: "호텔 정문 앞 하차. 기사가 짐 내려줌." },
        ],
      },
    },
  ],

  GMP: [
    {
      area: "홍대 / 합정",
      areaEn: "Hongdae / Hapjeong",
      bestTransport: "9호선 급행 → 당산 → 2호선 홍대입구",
      reason: "9호선에서 당산역 환승 후 2호선으로 홍대입구 바로 연결.",
      duration: "약 25분",
      price: "₩1,550",
      youtube: {
        search: "Gimpo airport to Hongdae subway Line 9 transfer guide",
        timeline: [
          { time: "00:00", desc: "지하 9호선 급행 탑승 → 당산역 하차 (2정거장)." },
          { time: "08:00", desc: "2호선 환승 → 홍대입구역 방향 내선." },
          { time: "15:00", desc: "홍대입구역 도착 → 9번 출구." },
        ],
      },
    },
    {
      area: "강남 / 신논현",
      areaEn: "Gangnam / Sinnonhyeon",
      bestTransport: "9호선 급행 직행",
      reason: "9호선 급행이 신논현(강남)까지 직행. 환승 없음.",
      duration: "약 30분",
      price: "₩2,050",
      youtube: {
        search: "Gimpo airport Line 9 express to Gangnam Sinnonhyeon",
        timeline: [
          { time: "00:00", desc: "지하 9호선 급행(급행) 탑승." },
          { time: "30:00", desc: "신논현역 도착 → 강남 핵심 지역 도보 5분." },
        ],
      },
    },
    {
      area: "광화문 / 종로 / 시청",
      areaEn: "Gwanghwamun / Jongno / City Hall",
      bestTransport: "5호선 직행",
      reason: "5호선이 광화문·시청 방향으로 직행 연결.",
      duration: "약 40분",
      price: "₩1,550",
      youtube: {
        search: "Gimpo airport Line 5 to Gwanghwamun City Hall subway",
        timeline: [
          { time: "00:00", desc: "지하 5호선 탑승 → 방화 방면 방향 (서울 중심 방향)." },
          { time: "40:00", desc: "광화문역 또는 시청역 하차." },
        ],
      },
    },
    {
      area: "택시 / 근거리",
      areaEn: "Taxi / Short Distance",
      bestTransport: "KakaoT 일반 택시",
      reason: "김포는 서울과 가까워 택시가 저렴. 홍대까지 2인이면 지하철보다 저렴.",
      duration: "20-30분",
      price: "₩15,000–₩25,000",
      tip: "2인 기준 홍대까지 ₩15,000 내외 — 지하철 2장보다 저렴하고 빠름.",
      youtube: {
        search: "Gimpo airport taxi KakaoT to Seoul cheap fast guide",
        timeline: [
          { time: "00:00", desc: "1번 출구 → 택시 승강장." },
          { time: "02:00", desc: "KakaoT 앱으로 목적지 설정 → 예상 금액 확인." },
          { time: "25:00", desc: "목적지 도착. 앱 자동 결제 또는 기사에게 직접 결제." },
        ],
      },
    },
  ],

  CJU: [
    {
      area: "제주시내 / 공항 근처",
      areaEn: "Jeju City / Near Airport",
      bestTransport: "시내버스 100번 or 글로벌 택시",
      reason: "제주시내는 공항에서 15-20분 거리. 버스 ₩1,500 또는 택시 ₩10,000.",
      duration: "15-25분",
      price: "₩1,500 (버스) / ₩10,000 (택시)",
      youtube: {
        search: "Jeju airport to Jeju city center bus 100 taxi guide",
        timeline: [
          { time: "00:00", desc: "터미널 출구 → 버스 정류소 1·2번 (시내버스) 또는 1번 출구 택시 승강장." },
          { time: "25:00", desc: "제주시내 또는 동·서부 버스터미널 도착." },
        ],
      },
    },
    {
      area: "서귀포 / 중문 리조트",
      areaEn: "Seogwipo / Jungmun Resort",
      bestTransport: "리무진 버스 600번",
      reason: "600번 버스가 중문 인터콘티넨탈·서귀포까지 직행. 가장 편리한 선택.",
      duration: "50분",
      price: "₩5,500",
      youtube: {
        search: "Jeju airport limousine bus 600 Seogwipo Jungmun resort 2024",
        timeline: [
          { time: "00:00", desc: "터미널 내 매표기 → 600번 리무진 구매 → 3번 정류소 탑승." },
          { time: "50:00", desc: "중문·서귀포 호텔 앞 정차." },
        ],
      },
    },
    {
      area: "제주 전체 관광 (차 있어야 함)",
      areaEn: "Island Exploration (Car Required)",
      bestTransport: "렌터카 (강력 권장)",
      reason: "성산일출봉, 한라산, 만장굴 등 주요 명소는 버스로 도달하기 어려움. 렌터카 필수.",
      duration: "공항에서 렌터카 셔틀 10분",
      price: "₩50,000–₩120,000/일",
      tip: "국제운전면허증(IDP) 필수. 출발 전 온라인 예약 필수 (로또렌터카·제주렌터카).",
      youtube: {
        search: "Jeju Island rental car guide foreign license IDP tips 2024",
        timeline: [
          { time: "00:00", desc: "5번 출구 → 렌터카 셔틀 탑승 (10분)." },
          { time: "13:00", desc: "렌터카 센터 도착 → 예약 확인·국제면허증·여권 제시." },
          { time: "20:00", desc: "차량 인수 전 스크래치 사진 촬영 필수." },
        ],
      },
    },
  ],

  CJJ: [
    {
      area: "서울 (전 지역)",
      areaEn: "Seoul (All Areas)",
      bestTransport: "택시 → 오송역 KTX (최적 루트)",
      reason: "오송역까지 택시 20분 + KTX 30분 = 총 1시간 이내. 버스보다 빠르고 편함.",
      duration: "약 55분 (오송 → 서울역)",
      price: "₩15,000 (택시) + ₩12,900 (KTX)",
      tip: "기사에게 '오송역 (Osong Station)' 이라고 말하거나 지도로 보여주세요.",
      youtube: {
        search: "청주공항 오송역 KTX 서울 빠른 이동 2024",
        timeline: [
          { time: "00:00", desc: "출구 → 택시 탑승 → '오송역' 말하기." },
          { time: "20:00", desc: "오송역 도착 → KTX 티켓 발권 (코레일 앱 또는 무인발권기)." },
          { time: "50:00", desc: "서울역 도착 → 지하철 1·4호선 환승." },
        ],
      },
    },
    {
      area: "대전 / 세종",
      areaEn: "Daejeon / Sejong",
      bestTransport: "고속버스 or 무궁화 기차",
      reason: "대전은 버스로 90분 또는 청주공항역에서 기차로 100분. 고속버스가 더 편리.",
      duration: "90분",
      price: "₩11,200 (버스)",
      youtube: {
        search: "청주공항 대전 고속버스 이동방법 2024",
        timeline: [
          { time: "00:00", desc: "터미널 내 버스 매표소 → 대전 행 구매." },
          { time: "90:00", desc: "대전 고속버스터미널 도착." },
        ],
      },
    },
    {
      area: "청주시내",
      areaEn: "Cheongju City",
      bestTransport: "로컬 택시",
      reason: "청주시내까지 택시 20분, ₩15,000 내외. 가장 직접적인 이동 수단.",
      duration: "20분",
      price: "₩15,000",
      youtube: {
        search: "청주공항 택시 청주시내 이동 KakaoT",
        timeline: [
          { time: "00:00", desc: "출구 → 택시 승강장 → KakaoT 또는 일반 택시 탑승." },
          { time: "20:00", desc: "청주 시내 도착." },
        ],
      },
    },
  ],

  PUS: [
    {
      area: "해운대 / 센텀시티",
      areaEn: "Haeundae / Centum City",
      bestTransport: "리무진 버스 (직행) or GLR → 2호선",
      reason: "리무진 버스가 해운대까지 직행 60분. 또는 GLR + 지하철 2호선으로 환승.",
      duration: "60-80분",
      price: "₩10,000 (리무진) / ₩2,500 (GLR+지하철)",
      tip: "짐이 많으면 리무진 버스, 저렴하게 이동하려면 GLR+2호선.",
      youtube: {
        search: "Busan Gimhae airport to Haeundae limousine bus direct guide 2024",
        timeline: [
          { time: "00:00", desc: "1번 게이트 출구 → 왼쪽 리무진 버스 정류소." },
          { time: "05:00", desc: "해운대 행 버스 탑승 (30분 간격)." },
          { time: "65:00", desc: "해운대 해수욕장·호텔 앞 정차." },
        ],
      },
    },
    {
      area: "서면 / 남포동 / 부산역",
      areaEn: "Seomyeon / Nampodong / Busan Station",
      bestTransport: "GLR → 사상역 → 2호선 서면",
      reason: "GLR 20분 + 2호선으로 서면·남포까지 연결. 저렴하고 신뢰성 높음.",
      duration: "약 40분",
      price: "₩1,600 + ₩1,500",
      youtube: {
        search: "Busan Gimhae airport light rail GLR to Seomyeon Nampo subway 2024",
        timeline: [
          { time: "00:00", desc: "경전철(GLR) 역 → T-Money 태그 후 탑승." },
          { time: "20:00", desc: "사상역 도착 → 부산 지하철 2호선 환승." },
          { time: "35:00", desc: "서면역 하차 → 남포·부산역 방향 연결." },
        ],
      },
    },
    {
      area: "KTX로 서울 이동",
      areaEn: "To Seoul by KTX",
      bestTransport: "시내버스 307 → 부산역 KTX",
      reason: "307번 버스로 부산역까지 40분 → KTX로 서울역까지 2시간 15분.",
      duration: "KTX 2시간 15분",
      price: "₩1,700 (버스) + ₩59,800 (KTX 일반실)",
      youtube: {
        search: "부산 김해공항 부산역 버스 KTX 서울 가는법 2024",
        timeline: [
          { time: "00:00", desc: "터미널 출구 → 시내버스 307번 탑승." },
          { time: "40:00", desc: "부산역(KTX) 도착 → 코레일 앱 또는 발권기에서 티켓 구매." },
          { time: "175:00", desc: "서울역 도착." },
        ],
      },
    },
    {
      area: "심야 도착",
      areaEn: "Late Night Arrival",
      bestTransport: "국제 택시 / KakaoT",
      reason: "23시 이후 GLR·버스 운행 종료. 택시만 가능.",
      duration: "30-50분",
      price: "₩25,000–₩45,000 (심야 할증 +40%)",
      tip: "자정~새벽 4시는 심야 할증. 해운대까지 ₩55,000 이상 나올 수 있음.",
      youtube: {
        search: "Busan Gimhae airport late night taxi international taxi guide",
        timeline: [
          { time: "00:00", desc: "1번 게이트 → 국제 택시 (오렌지색) 승강장." },
          { time: "02:00", desc: "목적지 확인 후 탑승. 고정 요금 카드 게시돼 있음." },
          { time: "40:00", desc: "호텔 앞 하차." },
        ],
      },
    },
  ],
};

// ── SIM guide per airport ────────────────────────────────────────────────
const simGuides: Record<string, {
  esimSpot: string;
  uSimSpot: string;
  wifiSpot: string;
  tip: string;
}> = {
  ICN: {
    esimSpot: "탑승 전 앱(Airalo·KT eSIM)으로 미리 구매 → 착륙 즉시 활성화.",
    uSimSpot: "1층 도착 홀 CU 또는 GS25 편의점. 'Tourist USIM' 요청 — 무제한 30일 ₩30,000~.",
    wifiSpot: "공항 내 무료 WiFi: 'Incheon Airport' SSID. 이민국 통과 전 eSIM 활성화 가능.",
    tip: "SKT·KT·LGU+ 부스는 3~4번 출구 사이. 영어 가능. 단, 줄이 길면 CU 유심이 더 빠름.",
  },
  GMP: {
    esimSpot: "탑승 전 앱으로 미리 구매 권장. 김포는 eSIM 부스가 ICN보다 적음.",
    uSimSpot: "도착 홀 GS25 편의점. 또는 지하철역 내 KT 부스 (김포공항역).",
    wifiSpot: "공항 무료 WiFi: 'GMP Free WiFi'. 1층 도착 홀 전체 커버.",
    tip: "김포 → 홍대·강남 이동 중 지하철 안에서도 데이터 연결 안정적 (LTE 커버 우수).",
  },
  CJU: {
    esimSpot: "제주 도착 전 앱으로 사전 구매 강력 권장. 공항 내 부스가 작고 줄이 길 수 있음.",
    uSimSpot: "도착 홀 CU 편의점 또는 KT·SKT 부스 (도착 홀 왼쪽).",
    wifiSpot: "공항 무료 WiFi: 'Jeju Airport WiFi'. 렌터카 센터 셔틀 내에서는 끊길 수 있음.",
    tip: "제주는 렌터카 이동 중 산간 지역(한라산 중턱 등)에서 신호가 약할 수 있음. 오프라인 지도 필수.",
  },
  CJJ: {
    esimSpot: "청주공항은 eSIM 부스 없음. 반드시 사전에 앱으로 구매.",
    uSimSpot: "도착 홀 내 편의점 GS25. 없으면 청주시내 이동 후 통신사 대리점 방문.",
    wifiSpot: "공항 무료 WiFi: 'CJJ Airport WiFi'. 오송역에서는 역 내 무료 WiFi 사용 가능.",
    tip: "청주공항은 규모가 작아 통신 인프라가 제한적. 인천 경유라면 ICN에서 유심 구매 추천.",
  },
  PUS: {
    esimSpot: "탑승 전 앱 사전 구매 권장. 도착 후 경전철(GLR) 이동 중 활성화 가능.",
    uSimSpot: "1층 도착 홀 CU 또는 SKT 부스. 'Tourist USIM' 요청.",
    wifiSpot: "공항 무료 WiFi: 'Gimhae Airport WiFi'. 경전철 역 내 무료 WiFi도 제공.",
    tip: "부산 지하철 전 구간 LTE 커버. 해운대 해수욕장 일대도 데이터 연결 매우 안정적.",
  },
};

// ── Platform guide per airport ───────────────────────────────────────────
const platformGuides: Record<string, {
  floors: { floor: string; what: string }[];
  signTip: string;
  commonMistake: string;
}> = {
  ICN: {
    floors: [
      { floor: "B1층 (지하 1층)", what: "AREX 급행·일반 열차 승강장. 오렌지(급행) / 파란색(일반) 구분." },
      { floor: "1층 (지상)", what: "리무진 버스 (5~9번 출구), 택시 (4~7번 출구), T-Luggage 카운터 (4~6번 출구 사이)." },
      { floor: "3층 (출발)", what: "국제·국내 탑승권 체크인. 도착객은 올라갈 필요 없음." },
      { floor: "T1 셔틀 트레인", what: "일부 외항사·LCC는 위성 터미널 도착 → 반드시 지하 셔틀 트레인 탑승 후 이민국 이동." },
    ],
    signTip: "노란색 안내판 = 셔틀 트레인 / 초록색 = 이민국·세관 / 파란색 = AREX·버스",
    commonMistake: "T1 외항사 도착 후 셔틀 트레인을 놓치고 이민국을 찾아 헤매는 경우 90% 발생. 내리자마자 'Shuttle Train' 표지만 따라가세요.",
  },
  GMP: {
    floors: [
      { floor: "지하 1층", what: "지하철 9호선·5호선 승강장. 이민국 통과 후 바로 지하 연결." },
      { floor: "1층", what: "도착 홀, 택시 승강장 (1번 출구)." },
    ],
    signTip: "모든 안내판 영문 병기. 이민국 → 수하물 → 세관 → 1층 도착 홀 순서.",
    commonMistake: "9호선 급행(급행)과 일반(완행) 혼동. 홈에서 열차 전광판 꼭 확인 — 급행이 훨씬 빠름.",
  },
  CJU: {
    floors: [
      { floor: "1층", what: "도착 홀, 시내버스 정류소 1·2번 (왼쪽), 리무진 버스 3번 (오른쪽), 택시 1번 출구." },
      { floor: "렌터카 셔틀", what: "5번 출구 → 무료 셔틀 버스 → 렌터카 단지 (10분)." },
    ],
    signTip: "제주공항은 소규모 — 도착 홀 나오면 왼쪽 버스, 오른쪽 리무진, 맞은편 택시로 구분.",
    commonMistake: "비자 없이 제주 도착 후 육지(서울)로 이동하려는 경우 입국 거부. 제주 비자 프리 ≠ 본토 비자 프리.",
  },
  CJJ: {
    floors: [
      { floor: "1층 (단일 터미널)", what: "도착·출발 모두 1개 건물. 오른쪽 → 버스 매표소, 왼쪽 → 택시 승강장." },
    ],
    signTip: "청주공항은 매우 작음. 안내판 없어도 출구 나오면 즉시 택시·버스 보임.",
    commonMistake: "오송역을 목표로 할 때 '청주공항역(기차역)'과 혼동. 청주공항역은 터미널에서 도보 10분이며 무궁화호(느린 기차)만 정차.",
  },
  PUS: {
    floors: [
      { floor: "1층 도착 홀", what: "경전철(GLR) 방향 → 3분 도보 (유리 통로). 리무진 버스 → 1번 게이트 왼쪽. 택시 → 1번 게이트 바로 앞." },
      { floor: "GLR 역", what: "사상역(부산 지하철 2호선)까지 20분. T-Money 또는 신용카드 탭앤고." },
    ],
    signTip: "경전철 표지: 'GLR (경전철)' 초록색 안내판 따라가면 연결 통로로 진입.",
    commonMistake: "국제선·국내선 터미널이 별도 건물. 국내선 환승 필요 시 무료 셔틀버스 이용 — 도보 이동 불가.",
  },
};

// ── UI Components ─────────────────────────────────────────────────────────

function YouTubeTimeline({ search, timeline }: {
  search: string;
  timeline: { time: string; desc: string }[];
}) {
  return (
    <div className="bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden mt-4">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <Youtube className="w-4 h-4 text-red-500" />
          <span className="text-slate-300 text-[10px] font-black uppercase tracking-wider">영상 증거 타임라인</span>
        </div>
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(search)}`}
          target="_blank" rel="noopener noreferrer"
          className="text-[10px] text-blue-400 font-bold hover:underline flex items-center gap-1"
        >
          유튜브에서 보기 <ExternalLink size={10} />
        </a>
      </div>
      <div className="p-4 space-y-3">
        {timeline.map((item, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="text-blue-500 font-black text-[10px] tabular-nums bg-blue-500/10 px-1.5 py-0.5 rounded shrink-0">{item.time}</span>
            <span className="text-slate-400 text-[11px] font-medium leading-relaxed">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AhaPoint({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-blue-500/[0.05] border-l-4 border-blue-500 p-4 rounded-r-2xl my-4">
      <div className="flex items-center gap-2 mb-1">
        <Zap className="w-4 h-4 text-blue-500" />
        <span className="text-blue-400 font-black text-[10px] uppercase tracking-widest">꿀팁</span>
      </div>
      <h4 className="text-white font-bold text-sm mb-1">{title}</h4>
      <div className="text-slate-400 text-xs leading-relaxed">{children}</div>
    </div>
  );
}

function TransportCard({ t }: { t: Transport }) {
  const [open, setOpen] = useState(false);
  const typeIcon =
    t.type === "train" ? <Train size={20} /> :
    t.type === "bus" ? <Bus size={20} /> :
    t.type === "pass" ? <Luggage size={20} /> :
    <Car size={20} />;

  return (
    <div className="glass rounded-3xl border border-white/5 hover:border-blue-500/20 transition-all overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
            {typeIcon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-black text-sm leading-tight">{t.name}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5">
              <span className="text-blue-400 text-[10px] font-black uppercase">{t.priceKRW}</span>
              <span className="text-slate-500 text-[10px]">·</span>
              <span className="text-slate-400 text-[10px] font-bold">{t.duration}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mb-3">
          <Star size={11} className="text-amber-400 shrink-0" />
          <span className="text-amber-400/80 text-[10px] font-bold">{t.bestFor}</span>
        </div>
        <p className="text-slate-400 text-xs italic leading-relaxed mb-3">"{t.tip}"</p>
        {t.warning && (
          <div className="flex items-start gap-2 bg-red-500/5 border border-red-500/15 rounded-xl p-3 mb-3">
            <AlertTriangle size={12} className="text-red-400 shrink-0 mt-0.5" />
            <span className="text-red-400 text-[10px] font-bold leading-relaxed">{t.warning}</span>
          </div>
        )}
        <div className="flex gap-4 text-[10px] text-slate-500 font-bold mb-3">
          <span className="flex items-center gap-1"><Clock size={10} /> 첫차: {t.firstDeparture}</span>
          <span className="flex items-center gap-1"><Clock size={10} /> 막차: {t.lastDeparture}</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 text-blue-400 text-[10px] font-black uppercase tracking-wider hover:text-blue-300 transition-colors"
        >
          {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          {open ? "접기" : "단계별 가이드 + 영상 보기"}
        </button>
      </div>
      {open && (
        <div className="px-6 pb-6 border-t border-white/5 pt-5 space-y-4">
          <div>
            <p className="text-white font-black text-xs uppercase tracking-wider mb-3">단계별 가이드</p>
            <ol className="space-y-2">
              {t.steps.map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[9px] font-black shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-slate-300 text-xs leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          {t.bookingUrl && (
            <a href={t.bookingUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-xl text-blue-300 text-[10px] font-black uppercase tracking-wider transition-all">
              <Globe size={11} /> 공식 예약 / 정보
            </a>
          )}
          <YouTubeTimeline search={t.youtube.search} timeline={t.youtube.timeline} />
        </div>
      )}
    </div>
  );
}

// ── Tab Contents ──────────────────────────────────────────────────────────

function TabTransport({ code }: { code: string }) {
  const transports = transportData[code] ?? [];
  return (
    <div className="space-y-4">
      <AhaPoint title="캐리어 탑승 제한">
        일반 택시(소나타·아반떼)는 대형 캐리어 2개가 한계. 3인 이상 그룹은 KakaoT Venti(대형 밴)나 Klook 전용 밴 예약 필수.
      </AhaPoint>
      <AhaPoint title="KakaoT 해외 카드 결제 팁">
        해외 카드가 앱 내 결제에서 실패하는 경우 많음. 결제 방법을 반드시 <strong>'현장 결제'</strong>로 선택 후 기사에게 직접 카드/현금 결제.
      </AhaPoint>
      {transports.map((t, i) => <TransportCard key={i} t={t} />)}
    </div>
  );
}

function TabSim({ code }: { code: string }) {
  const g = simGuides[code];
  if (!g) return null;
  return (
    <div className="space-y-6">
      {/* eSIM */}
      <div className="glass p-8 rounded-[2.5rem] border border-white/5">
        <h3 className="text-emerald-400 font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
          <Wifi size={14} /> eSIM (추천 1순위)
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">{g.esimSpot}</p>
        <YouTubeTimeline
          search={`Korea eSIM setup airport how to activate Airalo KT 2025`}
          timeline={[
            { time: "출발 전", desc: "Airalo·KT eSIM 앱에서 한국 플랜 구매 (보통 $10~$20, 15일·30일 선택)." },
            { time: "착륙 직후", desc: "비행기 모드 해제 → eSIM 프로파일 자동 활성화 (최대 2~3분 소요)." },
            { time: "이민국 이전", desc: "카카오맵·구글맵 미리 열어두기. 이민국 통과 후 즉시 사용 가능." },
          ]}
        />
      </div>

      {/* Physical USIM */}
      <div className="glass p-8 rounded-[2.5rem] border border-white/5">
        <h3 className="text-blue-400 font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
          <CreditCard size={14} /> 실물 유심 (Tourist USIM)
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">{g.uSimSpot}</p>
        <YouTubeTimeline
          search={`Korea airport tourist USIM SIM card buy convenience store guide`}
          timeline={[
            { time: "00:00", desc: "도착 홀 내 CU 또는 GS25 찾기 — 입국장 나오면 바로 보임." },
            { time: "02:00", desc: "'Tourist USIM' 달라고 하거나 냉장고 옆 유심 진열대 확인." },
            { time: "05:00", desc: "QR 또는 핀 도구로 유심 장착 → 자동 개통 (수분 소요)." },
            { time: "10:00", desc: "데이터 연결 확인 → 유튜브 또는 구글맵 테스트." },
          ]}
        />
      </div>

      {/* Free WiFi */}
      <div className="glass p-8 rounded-[2.5rem] border border-white/5">
        <h3 className="text-purple-400 font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
          <Wifi size={14} /> 공항 무료 WiFi
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">{g.wifiSpot}</p>
        <p className="text-slate-400 text-xs">{g.tip}</p>
      </div>

      <AhaPoint title="eSIM vs 유심 선택 기준">
        iPhone 12 이상·갤럭시 S20 이상이면 eSIM 사용 가능. 구형 기기거나 듀얼 유심이 필요하면 실물 유심 구매. 30일 무제한 기준 가격은 비슷하지만 eSIM이 줄 설 필요 없어 더 편리.
      </AhaPoint>
    </div>
  );
}

function TabPlatform({ code }: { code: string }) {
  const pg = platformGuides[code];
  const arrival = arrivalGuides[code];
  if (!pg || !arrival) return null;
  return (
    <div className="space-y-6">
      {/* Floor guide */}
      <div className="glass p-8 rounded-[2.5rem] border border-white/5">
        <h3 className="text-blue-400 font-black text-xs uppercase tracking-widest mb-5 flex items-center gap-2">
          <Building2 size={14} /> 층별 위치 안내
        </h3>
        <div className="space-y-3">
          {pg.floors.map((f, i) => (
            <div key={i} className="flex gap-4 items-start">
              <span className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-300 text-[10px] font-black whitespace-nowrap shrink-0">{f.floor}</span>
              <span className="text-slate-300 text-sm leading-relaxed">{f.what}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sign tip + common mistake */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass p-6 rounded-3xl border border-white/5">
          <h4 className="text-emerald-400 font-black text-xs uppercase tracking-widest mb-3">안내판 읽는 법</h4>
          <p className="text-slate-300 text-sm leading-relaxed">{pg.signTip}</p>
        </div>
        <div className="bg-red-500/5 border border-red-500/15 p-6 rounded-3xl">
          <h4 className="text-red-400 font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
            <AlertTriangle size={12} /> 자주 하는 실수
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed">{pg.commonMistake}</p>
        </div>
      </div>

      {/* Immigration steps */}
      <div className="glass p-8 rounded-[2.5rem] border border-white/5">
        <h3 className="text-purple-400 font-black text-xs uppercase tracking-widest mb-5 flex items-center gap-2">
          <CheckCircle2 size={14} /> 입국 단계별 가이드
        </h3>
        <ol className="space-y-3 mb-6">
          {arrival.immigrationTips.map((tip, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-white text-[9px] font-black shrink-0 mt-0.5">{i + 1}</span>
              <span className="text-slate-300 text-sm leading-relaxed">{tip}</span>
            </li>
          ))}
        </ol>
        <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-4 mb-4">
          <p className="text-emerald-400 font-black text-[10px] uppercase tracking-wider mb-1">2026 공식 확인</p>
          <p className="text-slate-300 text-sm">{arrival.factCheck2026}</p>
        </div>
        <YouTubeTimeline search={arrival.youtube.search} timeline={arrival.youtube.timeline} />
      </div>

      {/* SOS */}
      <div className="glass p-8 rounded-[2.5rem] border border-white/5">
        <h4 className="text-red-400 font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
          <PhoneCall size={14} /> 긴급 연락처
        </h4>
        <div className="space-y-4">
          {arrival.sosNumbers.map((s, i) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <span className="text-white font-black text-2xl tabular-nums">{s.number}</span>
              <span className="text-slate-400 text-[10px] font-bold uppercase text-right">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabByHotel({ code }: { code: string }) {
  const areas = hotelAreas[code] ?? [];
  return (
    <div className="space-y-4">
      <p className="text-slate-400 text-sm mb-6">
        숙소가 있는 지역을 클릭하면 최적의 탑승 방법과 영상 타임라인을 확인할 수 있습니다.
      </p>
      {areas.map((area, i) => <HotelAreaCard key={i} area={area} />)}
    </div>
  );
}

function HotelAreaCard({ area }: { area: HotelArea }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-3xl border border-white/5 hover:border-blue-500/20 transition-all overflow-hidden">
      <button
        className="w-full p-6 text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-black text-base">{area.area}</p>
            <p className="text-slate-500 text-xs font-bold mt-0.5">{area.areaEn}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block px-3 py-1.5 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-300 text-[10px] font-black">
              {area.duration}
            </span>
            {open ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Train size={12} className="text-blue-400" />
          <span className="text-blue-400 text-xs font-bold">{area.bestTransport}</span>
          <span className="text-slate-500 text-xs">·</span>
          <span className="text-slate-400 text-xs">{area.price}</span>
        </div>
        <p className="text-slate-400 text-xs mt-2 leading-relaxed">{area.reason}</p>
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-white/5 pt-5 space-y-4">
          {area.tip && (
            <div className="flex items-start gap-2 bg-amber-500/5 border border-amber-500/15 rounded-xl p-3">
              <Star size={11} className="text-amber-400 shrink-0 mt-0.5" />
              <span className="text-amber-300 text-xs font-bold leading-relaxed">{area.tip}</span>
            </div>
          )}
          <YouTubeTimeline search={area.youtube.search} timeline={area.youtube.timeline} />
        </div>
      )}
    </div>
  );
}

// ── Tab navigation config ─────────────────────────────────────────────────
const TABS: { id: TabId; label: string; sub: string; icon: React.ReactNode }[] = [
  { id: "transport", label: "교통수단",    sub: "Transport",       icon: <Train size={18} /> },
  { id: "sim",       label: "유심 · eSIM", sub: "SIM & Data",      icon: <Smartphone size={18} /> },
  { id: "platform",  label: "승강장 찾기", sub: "Platform Guide",  icon: <Navigation size={18} /> },
  { id: "byhotel",   label: "숙소별 탑승", sub: "By Hotel Area",   icon: <MapPin size={18} /> },
];

// ── Main ──────────────────────────────────────────────────────────────────
export default function AirportClient({ code: rawCode }: { code: string }) {
  const router = useRouter();
  const code = rawCode.toUpperCase();
  const airport = airports.find((a) => a.code === code);
  const [activeTab, setActiveTab] = useState<TabId>("transport");

  if (!airport) return null;

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans pb-24 text-slate-200">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto px-5 pt-10 relative">

        {/* Nav */}
        <nav className="flex items-center justify-between mb-12">
          <button onClick={() => router.push("/")} className="flex items-center gap-2 text-slate-400 hover:text-white font-bold transition-all">
            <ArrowLeft className="w-4 h-4" /> 공항 선택으로
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/25 bg-blue-500/[0.08]">
            <ShieldCheck className="w-3 h-3 text-blue-400" />
            <span className="text-blue-300 text-[10px] font-black uppercase tracking-widest">사실 기반 · 영상 증거</span>
          </div>
        </nav>

        {/* Airport Header */}
        <header className="mb-10">
          <div className="flex items-end gap-4 mb-3">
            <h1 className="text-7xl font-black text-white tracking-tighter leading-none">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">{airport.code}</span>
            </h1>
            <div className="pb-2">
              <p className="text-white font-bold text-lg leading-tight">{airport.name}</p>
              <p className="text-slate-400 text-sm">{airport.city} · {airport.terminal}</p>
            </div>
          </div>

          {airport.curfewWarning && (
            <div className="flex items-start gap-3 bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 mt-4">
              <AlertTriangle size={15} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-400 font-black text-[10px] uppercase tracking-wider mb-1">야간 운항 제한</p>
                <p className="text-slate-300 text-sm">{airport.curfewWarning}</p>
              </div>
            </div>
          )}
          {airport.fact2026 && (
            <div className="flex items-start gap-3 bg-blue-500/5 border border-blue-500/15 rounded-2xl p-4 mt-3">
              <Info size={15} className="text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-400 font-black text-[10px] uppercase tracking-wider mb-1">2026 공식 정보</p>
                <p className="text-slate-300 text-sm">{airport.fact2026}</p>
              </div>
            </div>
          )}
        </header>

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-10">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20"
                  : "glass border-white/5 text-slate-400 hover:text-white hover:border-white/10"
              }`}
            >
              <span className={activeTab === tab.id ? "text-white" : "text-slate-500"}>{tab.icon}</span>
              <div className="text-center">
                <p className="text-xs font-black leading-tight">{tab.label}</p>
                <p className={`text-[9px] font-bold uppercase tracking-wider mt-0.5 ${activeTab === tab.id ? "text-blue-200" : "text-slate-600"}`}>{tab.sub}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "transport" && <TabTransport code={code} />}
          {activeTab === "sim"       && <TabSim code={code} />}
          {activeTab === "platform"  && <TabPlatform code={code} />}
          {activeTab === "byhotel"   && <TabByHotel code={code} />}
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-10 border-t border-white/5 text-center">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4 italic">No Scams. Just Facts. 영상으로 검증된 2026 가이드.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white mx-auto hover:scale-110 transition-all"
          >
            ↑
          </button>
        </footer>
      </div>
    </div>
  );
}
