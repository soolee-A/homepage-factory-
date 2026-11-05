import type { TopicId } from "./types.ts";

/**
 * 종목/코인 엔티티 사전.
 * - 한글 별칭: 부분 문자열 매칭 (긴 별칭 우선, 겹치는 구간 중복 집계 방지)
 * - 영문 별칭: 단어 경계 매칭 (티커는 대소문자 구분)
 * 사전은 "이름"만 포함하며 가격·수익률 등 변동 데이터는 하드코딩하지 않음.
 */
export interface Entity {
  name: string;
  aliases: (string | RegExp)[];
}

export const KR_STOCKS: Entity[] = [
  { name: "삼성전자", aliases: ["삼성전자"] },
  { name: "SK하이닉스", aliases: ["SK하이닉스", "하이닉스"] },
  { name: "LG에너지솔루션", aliases: ["LG에너지솔루션", "LG엔솔"] },
  { name: "삼성바이오로직스", aliases: ["삼성바이오로직스", "삼성바이오"] },
  { name: "현대차", aliases: ["현대차", "현대자동차"] },
  { name: "기아", aliases: [/기아(?!대책)/] },
  { name: "셀트리온", aliases: ["셀트리온"] },
  { name: "KB금융", aliases: ["KB금융"] },
  { name: "신한지주", aliases: ["신한지주", "신한금융"] },
  { name: "하나금융지주", aliases: ["하나금융"] },
  { name: "우리금융지주", aliases: ["우리금융"] },
  { name: "NAVER", aliases: ["네이버", /\bNAVER\b/] },
  { name: "카카오", aliases: [/카카오(?!뱅크|페이)/] },
  { name: "카카오뱅크", aliases: ["카카오뱅크"] },
  { name: "POSCO홀딩스", aliases: ["POSCO홀딩스", "포스코홀딩스"] },
  { name: "삼성SDI", aliases: ["삼성SDI"] },
  { name: "LG화학", aliases: ["LG화학"] },
  { name: "LG전자", aliases: ["LG전자"] },
  { name: "한화에어로스페이스", aliases: ["한화에어로스페이스", "한화에어로"] },
  { name: "HD현대중공업", aliases: ["HD현대중공업"] },
  { name: "한화오션", aliases: ["한화오션"] },
  { name: "삼성중공업", aliases: ["삼성중공업"] },
  { name: "현대모비스", aliases: ["현대모비스"] },
  { name: "SK이노베이션", aliases: ["SK이노베이션"] },
  { name: "SK텔레콤", aliases: ["SK텔레콤", /\bSKT\b/] },
  { name: "KT", aliases: [/\bKT(?!&)\b/] },
  { name: "KT&G", aliases: ["KT&G"] },
  { name: "한국전력", aliases: ["한국전력", "한전"] },
  { name: "두산에너빌리티", aliases: ["두산에너빌리티"] },
  { name: "고려아연", aliases: ["고려아연"] },
  { name: "에코프로비엠", aliases: ["에코프로비엠"] },
  { name: "에코프로", aliases: [/에코프로(?!비엠)/] },
  { name: "알테오젠", aliases: ["알테오젠"] },
  { name: "HLB", aliases: [/\bHLB\b/] },
  { name: "한미반도체", aliases: ["한미반도체"] },
  { name: "크래프톤", aliases: ["크래프톤"] },
  { name: "하이브", aliases: ["하이브"] },
  { name: "삼성생명", aliases: ["삼성생명"] },
  { name: "삼성화재", aliases: ["삼성화재"] },
  { name: "메리츠금융지주", aliases: ["메리츠금융", "메리츠"] },
  { name: "기업은행", aliases: ["기업은행", /\bIBK\b/] },
  { name: "삼성물산", aliases: ["삼성물산"] },
];

export const DIVIDEND_ASSETS: Entity[] = [
  { name: "KT&G", aliases: ["KT&G"] },
  { name: "KB금융", aliases: ["KB금융"] },
  { name: "신한지주", aliases: ["신한지주", "신한금융"] },
  { name: "하나금융지주", aliases: ["하나금융"] },
  { name: "우리금융지주", aliases: ["우리금융"] },
  { name: "기업은행", aliases: ["기업은행"] },
  { name: "삼성화재", aliases: ["삼성화재"] },
  { name: "SK텔레콤", aliases: ["SK텔레콤"] },
  { name: "맥쿼리인프라", aliases: ["맥쿼리인프라"] },
  { name: "SK리츠", aliases: ["SK리츠"] },
  { name: "롯데리츠", aliases: ["롯데리츠"] },
  { name: "신한알파리츠", aliases: ["신한알파리츠"] },
  { name: "ESR켄달스퀘어리츠", aliases: ["ESR켄달스퀘어", "켄달스퀘어리츠"] },
  { name: "SCHD", aliases: [/\bSCHD\b/] },
  { name: "JEPI", aliases: [/\bJEPI\b/] },
  { name: "JEPQ", aliases: [/\bJEPQ\b/] },
  { name: "리얼티인컴", aliases: ["리얼티인컴", /Realty Income/i] },
  { name: "미국배당다우존스", aliases: ["미국배당다우존스"] },
  { name: "커버드콜 ETF", aliases: ["커버드콜"] },
  { name: "리츠(일반)", aliases: [/리츠(?!인컴)/] },
];

export const COINS: Entity[] = [
  { name: "비트코인", aliases: ["비트코인", /\bBTC\b/, /\bbitcoin\b/i] },
  { name: "이더리움", aliases: ["이더리움", /\bETH\b/, /\bethereum\b/i, /\bether\b/i] },
  { name: "리플(XRP)", aliases: ["리플", /\bXRP\b/, /\bripple\b/i] },
  { name: "솔라나", aliases: ["솔라나", /\bSOL\b/, /\bsolana\b/i] },
  { name: "도지코인", aliases: ["도지코인", /\bDOGE\b/, /\bdogecoin\b/i] },
  { name: "에이다", aliases: ["에이다", "카르다노", /\bADA\b/, /\bcardano\b/i] },
  { name: "BNB", aliases: ["바이낸스코인", /\bBNB\b/] },
  { name: "트론", aliases: ["트론", /\bTRX\b/, /\btron\b/i] },
  { name: "테더(USDT)", aliases: ["테더", /\bUSDT\b/, /\btether\b/i] },
  { name: "USDC", aliases: [/\bUSDC\b/] },
  { name: "수이", aliases: [/\bSUI\b/] },
  { name: "체인링크", aliases: ["체인링크", /\bchainlink\b/i] },
  { name: "아발란체", aliases: ["아발란체", /\bAVAX\b/, /\bavalanche\b/i] },
  { name: "스테이블코인", aliases: ["스테이블코인", /\bstablecoins?\b/i] },
];

export const TOPIC_ENTITIES: Record<TopicId, Entity[]> = {
  dividend: DIVIDEND_ASSETS,
  "kr-stock": KR_STOCKS,
  crypto: COINS,
};

/** 감성 사전 (규칙 기반 휴리스틱). 투자 판단 근거가 아닌 뉴스 톤 지표. */
export const POSITIVE_TERMS: RegExp[] = [
  /상승/, /급등/, /반등/, /강세/, /호재/, /최고치/, /신고가/, /돌파/, /흑자/, /호실적/, /어닝\s?서프라이즈/,
  /순매수/, /증가/, /확대/, /개선/, /회복/, /인상/, /증액/, /랠리/, /훈풍/, /기대감/, /수혜/, /승인/,
  /\bsurges?\b/i, /\brall(y|ies)\b/i, /\bgains?\b/i, /\bjumps?\b/i, /\bsoars?\b/i, /record high/i,
  /\brebounds?\b/i, /\bbeats?\b/i, /\bupgrades?\b/i, /\binflows?\b/i, /\bapprov(al|es|ed)\b/i,
];

export const NEGATIVE_TERMS: RegExp[] = [
  /하락/, /급락/, /폭락/, /약세/, /악재/, /최저치/, /신저가/, /적자/, /어닝\s?쇼크/, /순매도/, /감소/,
  /축소/, /악화/, /우려/, /위기/, /쇼크/, /충격/, /제재/, /소송/, /해킹/, /파산/, /부도/, /삭감/,
  /감액/, /무배당/, /경고/, /불안/, /리스크/, /긴축/, /관세/, /전쟁/,
  /\bplunges?\b/i, /\bslumps?\b/i, /\bfalls?\b/i, /\bdrops?\b/i, /\bcrash(es)?\b/i, /\btumbles?\b/i,
  /\bsell-?off\b/i, /\bfears?\b/i, /\bhack(ed)?\b/i, /\bbankrupt/i, /\boutflows?\b/i, /\bdowngrades?\b/i,
  /\blawsuit\b/i, /\btariffs?\b/i,
];

export const STOPWORDS = new Set<string>([
  "속보", "단독", "종합", "포토", "영상", "사진", "오늘", "내일", "어제", "이번", "지난", "올해", "내년", "작년",
  "관련", "대한", "위해", "통해", "기자", "뉴스", "오전", "오후", "기사", "있다", "없다", "한다", "했다", "된다",
  "이후", "가운데", "가능성", "전망", "발표", "공개", "개최", "진행", "예정", "확인", "검토", "추진", "강조",
  "이상", "이하", "최대", "최소", "만에", "대비", "기준", "현재", "결국", "다시", "연속", "주간", "일일",
  "the", "and", "for", "with", "from", "that", "this", "after", "over", "into", "says", "said", "new",
  "its", "are", "was", "will", "has", "have", "amid", "about", "more", "than", "what", "how", "why", "who",
  "you", "your", "could", "would", "may", "can", "not", "but", "out", "off", "his", "her", "they", "their",
  "as", "at", "on", "in", "of", "to", "by", "is", "it", "be", "an", "or", "up", "vs", "we", "he", "my",
  "news", "live", "video", "watch", "update", "updates", "report", "week", "today", "year",
]);
