import { airports } from "../../../Fetch/airportData";
import AirportClient from "./AirportClient";

export const runtime = 'edge';

export function generateStaticParams() {
  return airports.map((a) => ({ code: a.code.toLowerCase() }));
}

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <AirportClient code={code} />;
}
