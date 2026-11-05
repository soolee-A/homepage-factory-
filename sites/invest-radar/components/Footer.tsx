import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line py-10 text-sm text-muted dark:border-white/10">
      <div className="mx-auto max-w-6xl space-y-3 px-4">
        <p>
          ⚠️ 본 사이트는 공개 RSS 뉴스를 자동 수집·분류한 정보 제공 서비스이며, 특정 종목의 매수·매도를 권유하지 않습니다.
          감성 지표와 AI 브리핑은 헤드라인 기반 자동 분석으로 오류가 있을 수 있습니다. 투자 판단과 그 결과의 책임은 투자자 본인에게 있습니다.
        </p>
        <p>뉴스 저작권은 각 언론사에 있으며, 본 사이트는 제목·출처·원문 링크만 제공합니다.</p>
        <div className="flex gap-4">
          <Link href="/disclaimer" className="hover:underline">면책 고지</Link>
          <Link href="/status" className="hover:underline">수집 현황</Link>
        </div>
      </div>
    </footer>
  );
}
