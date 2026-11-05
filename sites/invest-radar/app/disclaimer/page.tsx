import type { Metadata } from "next";

export const metadata: Metadata = { title: "면책 고지", alternates: { canonical: "/disclaimer" } };

export default function Disclaimer() {
  return (
    <article className="card space-y-4 leading-relaxed">
      <h1 className="text-2xl font-extrabold">면책 고지</h1>
      <p>투자레이더는 공개 RSS 피드와 공개 시세 API를 자동으로 수집·분류하여 제공하는 정보 서비스입니다. 특정 금융투자상품의 매수·매도를 권유하거나 개별적인 투자자문을 제공하지 않습니다.</p>
      <h2 className="text-lg font-bold">분석 지표의 한계</h2>
      <p>뉴스 톤 지수는 헤드라인에 포함된 단어를 규칙 기반으로 집계한 값이며 시장 방향을 예측하지 않습니다. AI 브리핑은 수집된 헤드라인만을 근거로 자동 생성되며, 원문과 다르거나 부정확할 수 있으므로 반드시 원문 링크를 확인하십시오.</p>
      <h2 className="text-lg font-bold">시세 정보</h2>
      <p>코인 시세는 업비트 공개 API 기준이며 캐시로 인해 최대 1분 이상 지연될 수 있습니다. 실제 거래 시에는 거래소 화면의 가격을 확인하십시오.</p>
      <h2 className="text-lg font-bold">저작권</h2>
      <p>모든 기사의 저작권은 해당 언론사에 있습니다. 본 사이트는 기사 제목, 출처, 발행 시각, 원문 링크 및 RSS가 제공하는 짧은 요약만을 표시합니다. 게재 중단을 원하는 언론사는 연락 주시면 즉시 반영합니다.</p>
      <h2 className="text-lg font-bold">책임의 한계</h2>
      <p>본 사이트 정보를 이용한 투자 판단 및 그 결과에 대한 책임은 전적으로 이용자 본인에게 있습니다.</p>
    </article>
  );
}
