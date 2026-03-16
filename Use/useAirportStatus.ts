import { useState, useEffect } from "react";
import { Airport } from "../Fetch/airportData";

export type AirportStatus = "open" | "curfew" | "always-open";

export interface AirportStatusResult {
  status: AirportStatus;
  label: string;
  currentKST: string;
  nextChange?: string;
}

function getKSTHour(): number {
  const now = new Date();
  const kst = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  return kst.getHours();
}

function getKSTTimeString(): string {
  return new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Seoul",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function getAirportStatus(airport: Airport): AirportStatusResult {
  if (airport.is24Hours) {
    return {
      status: "always-open",
      label: "Always Open · 24/7",
      currentKST: getKSTTimeString(),
    };
  }

  const hour = getKSTHour();
  const start = airport.curfewStart!;
  const end = airport.curfewEnd!;

  const isCurfew = hour >= start || hour < end;

  if (isCurfew) {
    return {
      status: "curfew",
      label: `Curfew · Opens at ${String(end).padStart(2, "0")}:00 KST`,
      currentKST: getKSTTimeString(),
      nextChange: `${String(end).padStart(2, "0")}:00`,
    };
  }

  return {
    status: "open",
    label: `Open · Curfew at ${String(start).padStart(2, "0")}:00 KST`,
    currentKST: getKSTTimeString(),
    nextChange: `${String(start).padStart(2, "0")}:00`,
  };
}

export function useAirportStatus(airport: Airport): AirportStatusResult {
  const [result, setResult] = useState<AirportStatusResult>(() =>
    getAirportStatus(airport)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setResult(getAirportStatus(airport));
    }, 60000);
    return () => clearInterval(interval);
  }, [airport]);

  return result;
}
