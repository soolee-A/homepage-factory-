export interface Airport {
  code: string;
  is24Hours: boolean;
  curfewStart?: number;
  curfewEnd?: number;
}

export interface Transport {
  type: "train" | "bus" | "taxi" | "pass";
  priceKRW: string;
  firstDeparture: string;
  lastDeparture: string;
  bookingUrl: string;
}

export interface EntryDocument {
  id: string;
  officialUrl: string;
}

export const airports: Airport[] = [
  {
    code: "ICN",
    is24Hours: true,
  },
  {
    code: "GMP",
    is24Hours: false,
    curfewStart: 23,
    curfewEnd: 6,
  },
  {
    code: "PUS",
    is24Hours: false,
    curfewStart: 23,
    curfewEnd: 6,
  },
];

export const transportData: Record<string, Transport[]> = {
  ICN: [
    { type: "train", priceKRW: "₩11,000", firstDeparture: "05:15", lastDeparture: "22:50", bookingUrl: "https://www.arex.or.kr/" },
    { type: "train", priceKRW: "₩4,150",  firstDeparture: "05:20", lastDeparture: "23:30", bookingUrl: "https://www.arex.or.kr/" },
    { type: "bus",   priceKRW: "₩17,000", firstDeparture: "05:00", lastDeparture: "23:00", bookingUrl: "https://www.airportlimousine.co.kr/" },
    { type: "pass",  priceKRW: "₩5,000/day", firstDeparture: "—", lastDeparture: "—", bookingUrl: "https://www.t-money.co.kr/" },
  ],
  GMP: [
    { type: "train", priceKRW: "₩1,400~2,150", firstDeparture: "05:34", lastDeparture: "23:50", bookingUrl: "https://www.seoulmetro.co.kr/" },
    { type: "bus",   priceKRW: "₩6,000~12,000", firstDeparture: "06:00", lastDeparture: "22:00", bookingUrl: "https://www.airportlimousine.co.kr/" },
    { type: "taxi",  priceKRW: "₩25,000~40,000", firstDeparture: "24hrs", lastDeparture: "24hrs", bookingUrl: "https://www.kakaomobility.com/" },
  ],
  PUS: [
    { type: "train", priceKRW: "₩1,500~2,800", firstDeparture: "05:42", lastDeparture: "22:58", bookingUrl: "https://www.bglrt.com/" },
    { type: "bus",   priceKRW: "₩7,000~12,000", firstDeparture: "06:00", lastDeparture: "22:00", bookingUrl: "https://www.airportlimousine.co.kr/" },
    { type: "taxi",  priceKRW: "₩20,000~35,000", firstDeparture: "24hrs", lastDeparture: "24hrs", bookingUrl: "https://www.kakaomobility.com/" },
  ],
};

export const entryDocuments: EntryDocument[] = [
  { id: "k-eta",     officialUrl: "https://www.k-eta.go.kr/" },
  { id: "q-code",    officialUrl: "https://qcode.kdca.go.kr/" },
  { id: "e-arrival", officialUrl: "https://www.hikorea.go.kr/" },
];
