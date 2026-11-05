import Link from "next/link";

export default function NotFound() {
  return (
    <section className="card text-center">
      <h1 className="text-2xl font-extrabold">페이지를 찾을 수 없습니다</h1>
      <Link href="/" className="mt-4 inline-block text-brand hover:underline">홈으로 →</Link>
    </section>
  );
}
