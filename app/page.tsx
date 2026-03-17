'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  Train,
  Bus,
  Car,
  Info,
  AlertTriangle,
  PlaneLanding,
  Footprints,
  Check,
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────
interface Schedule {
  airport: string;
  departureDate: string;
  returnDate: string;
  passengers: number | string;
}

interface AirportOption {
  id: string;
  code: string;
  nameKo: string;
  terminal?: string;
  region: string;
  is24h?: boolean;
  curfew?: string; // e.g. "23:00–06:00"
}

// ── 공항 데이터 ─────────────────────────────────────────────────────────────
const AIRPORTS: AirportOption[] = [
  { id: 'icn_t1', code: 'ICN', nameKo: '인천국제공항', terminal: '제1터미널', region: '서울·수도권', is24h: true },
  { id: 'icn_t2', code: 'ICN', nameKo: '인천국제공항', terminal: '제2터미널', region: '서울·수도권', is24h: true },
  { id: 'gmp',    code: 'GMP', nameKo: '김포국제공항',  region: '서울·수도권', curfew: '23:00–06:00' },
  { id: 'pus',    code: 'PUS', nameKo: '김해국제공항',  region: '부산',        curfew: '23:00–06:00' },
  { id: 'cju',    code: 'CJU', nameKo: '제주국제공항',  region: '제주도',      curfew: '23:00–06:00' },
  { id: 'cjj',    code: 'CJJ', nameKo: '청주국제공항',  region: '충청권',      curfew: '22:00–07:00' },
];

// ── Main Component ─────────────────────────────────────────────────────────
export default function App() {
  // 진행 단계 (1: 공항/일정, 2: 시간 선택, 3: 이동 수단, 4: 상세 가이드)
  const [step, setStep] = useState(1);

  // 1단계: 공항 및 일정 상태
  const [schedule, setSchedule] = useState<Schedule>({
    airport: '',
    departureDate: '2026-04-01',
    returnDate: '2026-04-15',
    passengers: 1,
  });

  // 선택된 공항 ID (버튼 하이라이트 용)
  const [selectedAirportId, setSelectedAirportId] = useState<string>('');

  // 2단계: 도착 시간 상태
  const [arrivalTime, setArrivalTime] = useState('14:00');

  // 3단계: 선택된 이동 수단
  const [transport, setTransport] = useState('');

  // ── 비즈니스 로직 ──────────────────────────────────────────────────────
  const getDayLabel = (dateStr: string): string => {
    if (!dateStr) return '';
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const d = new Date(dateStr + 'T00:00:00');
    if (isNaN(d.getTime())) return '';
    return `${dateStr}(${days[d.getDay()]})`;
  };

  const checkPublicTransitAvailability = (time: string): boolean => {
    if (!time) return false;
    const [hour, minute] = time.split(':').map(Number);
    const timeInMinutes = hour * 60 + minute;
    return timeInMinutes >= 5 * 60 && timeInMinutes <= 23 * 60 + 30;
  };

  const isTransitAvailable = checkPublicTransitAvailability(arrivalTime);

  // ── 핸들러 함수들 ──────────────────────────────────────────────────────
  const handleAirportSelect = (ap: AirportOption) => {
    setSelectedAirportId(ap.id);
    const label = ap.terminal
      ? `${ap.nameKo} ${ap.terminal} (${ap.code})`
      : `${ap.nameKo} (${ap.code})`;
    setSchedule(prev => ({ ...prev, airport: label }));
  };

  const handleScheduleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setSchedule(prev => ({ ...prev, [name]: value }));
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAirportId) return; // 공항 미선택 시 진행 불가
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleTransportSelect = (method: string) => {
    setTransport(method);
    setStep(4);
  };

  // ── 진행 상태바 ────────────────────────────────────────────────────────
  const renderProgressBar = () => {
    const steps = ['도착 공항/일정', '도착 시간', '이동 수단', '이동 가이드'];
    return (
      <div className="w-full py-4 px-6 bg-white shadow-sm mb-4 rounded-2xl border border-gray-100">
        <div className="flex justify-between items-center max-w-3xl mx-auto relative">
          {/* 배경 트랙 */}
          <div className="absolute top-5 left-0 w-full h-[3px] bg-gray-100 -z-10 rounded-full" />
          {/* 진행 트랙 */}
          <div
            className="absolute top-5 left-0 h-[3px] bg-blue-600 -z-10 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />
          {steps.map((s, index) => {
            const num       = index + 1;
            const isActive  = step >= num;
            const isDone    = step > num;
            const isCurrent = step === num;
            return (
              <div key={index} className="flex flex-col items-center bg-white px-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                    transition-all duration-300 border-2
                    ${isDone    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200'
                    : isCurrent ? 'bg-white border-blue-600 text-blue-600 shadow-lg shadow-blue-100'
                    :             'bg-white border-gray-200 text-gray-400'}`}
                >
                  {isDone ? <Check size={18} strokeWidth={3} /> : num}
                </div>
                <span
                  className={`mt-2 text-[11px] font-bold tracking-wide whitespace-nowrap
                    ${isActive ? 'text-slate-700' : 'text-gray-400'}`}
                >
                  {s}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ── Step 1: 공항 버튼 + 일정 입력 ─────────────────────────────────────
  const renderStep1 = () => (
    <div className="bg-white rounded-[2.5rem] shadow-xl p-5 md:p-7 max-w-3xl mx-auto border border-gray-100 animate-zoom-in">

      {/* 섹션 헤더 — 한 줄 compact */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <MapPin className="text-blue-600" size={18} />
          도착 공항 및 기본 일정
        </h2>
        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-widest">Step 01</span>
      </div>

      <form onSubmit={handleStep1Submit} className="space-y-5">

        {/* 공항 버튼 그리드 */}
        <div>
          <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-widest">
            도착 공항 선택 <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {AIRPORTS.map(ap => {
              const isSelected = selectedAirportId === ap.id;
              return (
                <button
                  key={ap.id}
                  type="button"
                  onClick={() => handleAirportSelect(ap)}
                  className={`relative flex flex-col items-start p-3 rounded-2xl border-2 text-left
                    transition-all duration-200
                    ${isSelected
                      ? 'border-blue-600 bg-blue-50 shadow-md shadow-blue-100'
                      : 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-white hover:shadow-md'
                    }`}
                >
                  {/* 체크 뱃지 */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-blue-600 rounded-full
                                    flex items-center justify-center animate-zoom-in">
                      <Check size={9} strokeWidth={3} className="text-white" />
                    </div>
                  )}
                  {/* 상단: 코드 + 공항명 한 줄 */}
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full tracking-widest
                      ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                      {ap.code}
                    </span>
                    {ap.terminal && (
                      <span className={`text-[10px] font-semibold
                        ${isSelected ? 'text-blue-600' : 'text-slate-400'}`}>
                        {ap.terminal}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm font-black leading-tight
                    ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                    {ap.nameKo}
                  </p>
                  <p className={`text-[10px] mt-0.5 font-medium
                    ${isSelected ? 'text-blue-400' : 'text-slate-400'}`}>
                    {ap.region}
                  </p>
                  {/* 운영 시간 */}
                  {ap.is24h ? (
                    <p className="text-[9px] mt-1 font-black text-emerald-600">● 24시간</p>
                  ) : ap.curfew ? (
                    <p className="text-[9px] mt-1 font-black text-red-500">✕ 폐쇄 {ap.curfew}</p>
                  ) : null}
                </button>
              );
            })}
          </div>
          {/* 미선택 시 안내 문구 */}
          {!selectedAirportId && (
            <p className="mt-2 text-xs text-gray-400 font-medium">공항을 선택해야 다음 단계로 진행할 수 있습니다.</p>
          )}
        </div>

        {/* 날짜 입력 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black text-slate-500 mb-1.5 uppercase tracking-widest">
              가는 날 (출발일)
            </label>
            <div className="relative w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-9 pr-4
                            focus-within:ring-2 focus-within:ring-blue-500 transition-all flex items-center">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" size={17} />
              <span className="text-gray-900 pointer-events-none font-medium text-sm select-none">
                {schedule.departureDate ? getDayLabel(schedule.departureDate) : '날짜 선택'}
              </span>
              <input
                type="date" name="departureDate" value={schedule.departureDate}
                onChange={handleScheduleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black text-slate-500 mb-1.5 uppercase tracking-widest">
              오는 날 (귀국일)
            </label>
            <div className="relative w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-9 pr-4
                            focus-within:ring-2 focus-within:ring-blue-500 transition-all flex items-center">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" size={17} />
              <span className="text-gray-900 pointer-events-none font-medium text-sm select-none">
                {schedule.returnDate ? getDayLabel(schedule.returnDate) : '날짜 선택'}
              </span>
              <input
                type="date" name="returnDate" value={schedule.returnDate}
                onChange={handleScheduleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                required
              />
            </div>
          </div>
        </div>

        {/* 인원 선택 */}
        <div>
          <label className="block text-xs font-black text-slate-500 mb-1.5 uppercase tracking-widest">
            이동 인원 (유아·어린이 포함)
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-2.5 text-gray-400" size={17} />
            <select
              name="passengers" value={schedule.passengers}
              onChange={handleScheduleChange}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl
                         focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none font-medium text-sm"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>총 {num}명</option>
              ))}
              <option value="group">단체 (6명 이상)</option>
            </select>
          </div>
          <p className="mt-1.5 text-[11px] text-gray-400 font-medium leading-relaxed">
            유아(만 2세↓)·어린이(만 12세↓) 포함 · 유모차·카시트 동반 시 택시/리무진 권장
          </p>
        </div>

        {/* 다음 버튼 */}
        <button
          type="submit"
          disabled={!selectedAirportId}
          className={`w-full py-3 font-black text-base rounded-2xl transition-all duration-200
            ${selectedAirportId
              ? 'bg-slate-900 hover:bg-blue-600 text-white shadow-lg shadow-slate-200 hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          다음 단계로 →
        </button>
      </form>
    </div>
  );

  // ── Step 2: 도착 시간 (기존 내용 그대로) ─────────────────────────────
  const renderStep2 = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-xl p-8 md:p-10 border border-gray-100 animate-slide-right">
      <div className="mb-6">
        <p className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-1">Step 02</p>
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
          <Clock className="text-blue-600" size={24} />
          도착 시간을 알려주세요
        </h2>
      </div>
      <p className="text-gray-500 mb-8 font-medium leading-relaxed">
        입국 수속 및 수하물 수취 시간을 고려한 예상 공항 로비 도착 시간을 선택해 주세요. (보통 착륙 후 1시간 뒤)
      </p>

      <form onSubmit={handleStep2Submit} className="space-y-6">
        <div className="flex justify-center">
          <input
            type="time"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
            className="text-5xl font-black text-center text-blue-900 bg-blue-50 border-none rounded-2xl
                       py-6 px-6 focus:ring-4 focus:ring-blue-200 outline-none transition-all cursor-pointer"
            required
          />
        </div>

        {/* 동적 알림 패널 */}
        <div className={`p-5 rounded-2xl border-2 flex items-start transition-all duration-300
          ${isTransitAvailable
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-orange-50 border-orange-200 text-orange-800'}`}
        >
          {isTransitAvailable ? (
            <Info className="w-6 h-6 mr-3 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-6 h-6 mr-3 text-orange-600 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <h4 className="font-black text-base mb-1">
              {isTransitAvailable
                ? '대중교통 이용 가능 시간대입니다.'
                : '대중교통 이용이 제한되는 심야/새벽 시간입니다.'}
            </h4>
            <p className="text-sm opacity-90 leading-relaxed font-medium">
              {isTransitAvailable
                ? '지하철(공항철도), 시내버스, 공항 리무진 등 대부분의 이동 수단을 자유롭게 선택하실 수 있습니다.'
                : '정규 지하철 및 주간 버스 운행이 종료되었습니다. 심야 공항버스(N버스), 24시간 택시, 혹은 도보(인근 호텔) 이동을 권장합니다.'}
            </p>
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <button
            type="button" onClick={() => setStep(1)}
            className="w-1/3 py-4 bg-white border-2 border-gray-200 text-slate-700 font-black
                       rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            이전
          </button>
          <button
            type="submit"
            className="w-2/3 py-4 bg-slate-900 hover:bg-blue-600 text-white font-black
                       rounded-2xl shadow-xl shadow-slate-200 transition-all hover:-translate-y-0.5"
          >
            이동 수단 선택하기
          </button>
        </div>
      </form>
    </div>
  );

  // ── Step 3: 이동 수단 선택 (기존 내용 그대로) ─────────────────────────
  const renderStep3 = () => {
    const transportOptions = [
      { id: 'subway',    name: '지하철 / 공항철도', icon: Train,      type: 'public', desc: '정체 없이 정해진 시간에 가장 빠르게 도심 진입' },
      { id: 'bus',       name: '시내버스',           icon: Bus,        type: 'public', desc: '비교적 저렴한 요금으로 주요 거점 이동' },
      { id: 'limousine', name: '공항 리무진',         icon: Bus,        type: 'all',    desc: '편안한 좌석과 넉넉한 수하물 공간, 호텔 직행 노선' },
      { id: 'taxi',      name: '택시 / 콜밴',         icon: Car,        type: 'all',    desc: '목적지까지 프라이빗하고 편안한 다이렉트 이동' },
      { id: 'walk',      name: '도보 (인근 이동)',     icon: Footprints, type: 'all',    desc: '제1/2터미널 내 캡슐호텔 및 공항 인근 도보권 숙소 이동' },
    ];

    return (
      <div className="max-w-4xl mx-auto animate-slide-right">
        <div className="mb-8">
          <p className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-1 text-center">Step 03</p>
          <h2 className="text-2xl font-black text-slate-900 text-center">도심으로 가는 방법을 선택해 주세요</h2>
          <p className="text-gray-500 mt-2 text-center font-medium">
            {schedule.airport} 기준, {arrivalTime}에 이용 가능한 추천 수단입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {transportOptions.map(option => {
            const isDisabled = option.type === 'public' && !isTransitAvailable;
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => !isDisabled && handleTransportSelect(option.name)}
                disabled={isDisabled}
                className={`relative p-6 text-left rounded-[2rem] border-2 transition-all duration-200 flex flex-col h-full
                  ${isDisabled
                    ? 'bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed'
                    : 'bg-white border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 cursor-pointer'}`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4
                  ${isDisabled ? 'bg-gray-200 text-gray-400' : 'bg-slate-900 text-white'}`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-base font-black text-slate-900 mb-2">{option.name}</h3>
                <p className="text-sm text-gray-500 flex-grow font-medium leading-relaxed">{option.desc}</p>
                {isDisabled && (
                  <div className="mt-4 text-[10px] font-black text-orange-500 bg-orange-50 border border-orange-100 inline-block px-3 py-1.5 rounded-full">
                    현재 시간 운행 종료
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setStep(2)}
            className="text-gray-400 font-bold hover:text-slate-900 transition-colors text-sm"
          >
            ← 시간 다시 설정하기
          </button>
        </div>
      </div>
    );
  };

  // ── Step 4: 상세 가이드 (기존 내용 그대로) ───────────────────────────
  const renderStep4 = () => {
    const getGuideContent = () => {
      if (transport.includes('지하철')) {
        return (
          <ul className="space-y-4 text-gray-700 leading-relaxed">
            <li><strong>탑승 위치:</strong> 공항 터미널 지하 1층 '교통센터(Transportation Center)'로 이동하세요. 노란색 안내 표지판을 따라가시면 됩니다.</li>
            <li><strong>티켓 구매:</strong> 교통센터 내 무인 발권기 또는 편의점에서 교통카드(Tmoney 등)를 구매 및 충전할 수 있습니다. 직통열차의 경우 전용 창구를 이용하세요.</li>
            <li><strong>주의 사항:</strong> 출퇴근 시간대(07:30~09:00, 18:00~19:30)에는 탑승객이 많아 수하물이 클 경우 불편할 수 있습니다.</li>
            <li><strong>도착지 연계:</strong> 서울역, 홍대입구역 등 주요 환승역에서 시내 지하철 노선으로 쉽게 환승 가능합니다.</li>
          </ul>
        );
      } else if (transport.includes('리무진')) {
        return (
          <ul className="space-y-4 text-gray-700 leading-relaxed">
            <li><strong>탑승 위치:</strong> 1층 입국장 외부(게이트 3~7번 사이)에 위치한 리무진 버스 정류장으로 이동하세요.</li>
            <li><strong>티켓 구매:</strong> 입국장 내부 버스 매표소, 외부 무인 발권기, 또는 모바일 앱(티머니 GO)을 통해 좌석을 지정하여 구매합니다.</li>
            <li><strong>수하물 처리:</strong> 탑승 전 승무원이 수하물 칸에 짐을 실어주며, 짐표(Baggage Tag)를 발급해 줍니다. 하차 시 꼭 짐표를 확인하세요.</li>
            <li><strong>심야 이용:</strong> 심야 시간대(N버스)의 경우 특정 정류장에서만 정차하므로 사전 노선 확인이 필수입니다.</li>
          </ul>
        );
      } else if (transport.includes('택시')) {
        return (
          <ul className="space-y-4 text-gray-700 leading-relaxed">
            <li><strong>탑승 위치:</strong> 1층 입국장 외부 택시 승강장(일반/모범/대형 택시 분리 운영)에서 줄을 서서 대기합니다.</li>
            <li><strong>요금 안내:</strong> 도심까지 이동 시 지역에 따라 시외 할증이 붙을 수 있으며, 톨게이트 비용은 승객이 별도로 지불합니다. (미터기 요금 외 추가됨)</li>
            <li><strong>스마트폰 호출:</strong> 우버(UBER), 카카오T 등 모바일 앱을 이용할 경우, 앱 전용 탑승 구역(보통 외부 주차장 쪽)을 확인하세요.</li>
          </ul>
        );
      } else {
        return (
          <ul className="space-y-4 text-gray-700 leading-relaxed">
            <li><strong>도보 이동 가이드:</strong> 공항 내 환승 호텔이나 캡슐 호텔(다락휴 등)로 이동하시는 경우 표지판을 참조하세요.</li>
            <li><strong>외부 도보 이동:</strong> 공항 외부로의 도보 이동은 보행자 도로가 제한적일 수 있으므로 공항 내 무료 순환 셔틀버스 이용을 권장합니다.</li>
          </ul>
        );
      }
    };

    return (
      <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-xl border border-gray-100 animate-slide-bottom overflow-hidden">
        {/* 헤더 영역 */}
        <div className="bg-slate-900 p-8 md:p-10 text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-5">
            <CheckCircle size={12} /> 맞춤형 이동 가이드
          </div>
          <h2 className="text-3xl font-black mb-3 leading-tight">{schedule.airport}에서<br />도심으로</h2>
          <p className="text-slate-400 text-sm font-semibold flex items-center gap-2 flex-wrap">
            <span className="bg-white/10 px-3 py-1 rounded-full">{schedule.departureDate} 도착</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">{arrivalTime} 기준</span>
            <span className="bg-blue-600 px-3 py-1 rounded-full text-white">{transport} 이용</span>
          </p>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="p-8 md:p-10">
          <h3 className="text-lg font-black text-slate-900 border-b border-gray-100 pb-4 mb-6 uppercase tracking-wide">
            상세 이용 안내
          </h3>

          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6">
            {getGuideContent()}
          </div>

          <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl flex items-start gap-4 mb-8">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 leading-relaxed font-medium">
              <strong>Tip:</strong> 공항 상황(날씨, 요일, 특별 행사 등)에 따라 실제 운행 시간표와 대기 시간이 달라질 수 있습니다. 이동 전 각 교통수단의 공식 앱이나 안내 데스크를 통해 한 번 더 확인하시는 것이 좋습니다.
            </p>
          </div>

          <div className="flex justify-center border-t border-gray-100 pt-8">
            <button
              onClick={() => { setStep(1); setTransport(''); setSelectedAirportId(''); setSchedule(prev => ({ ...prev, airport: '' })); }}
              className="px-10 py-4 bg-slate-900 hover:bg-blue-600 text-white font-black rounded-2xl
                         transition-all shadow-xl shadow-slate-200 hover:-translate-y-0.5"
            >
              처음부터 다시 계획하기
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="flex items-center text-slate-900 font-black text-xl tracking-tight cursor-pointer gap-2"
            onClick={() => { setStep(1); setSelectedAirportId(''); setSchedule(prev => ({ ...prev, airport: '' })); setTransport(''); }}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
              <PlaneLanding size={18} className="text-white" />
            </div>
            CityTransit Guide
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-bold text-gray-500">
            <a href="#" className="hover:text-blue-600 transition-colors">공항별 정보</a>
            <a href="#" className="hover:text-blue-600 transition-colors">수하물 배송</a>
            <a href="#" className="hover:text-blue-600 transition-colors">고객센터</a>
          </nav>
        </div>
      </header>

      {/* Welcome Hero Banner — compact slim bar */}
      <section className="bg-gradient-to-r from-[#0F172A] via-[#1E3A5F] to-[#1E40AF] text-white">
        <div className="container mx-auto px-6 py-4 max-w-4xl flex items-center justify-between gap-4 flex-wrap">
          {/* 왼쪽: 타이틀 */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
              <PlaneLanding size={16} className="text-blue-300" />
            </div>
            <div>
              <h1 className="text-base font-black leading-none tracking-tight">
                Welcome to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Korea</span>
              </h1>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                Your trusted airport-to-city arrival guide
              </p>
            </div>
          </div>
          {/* 오른쪽: 뱃지 */}
          <div className="flex items-center gap-2 flex-wrap">
            {['✈ 6 Airports', '🕐 24/7 Info', '🛡 Verified'].map(b => (
              <span key={b}
                className="text-[11px] font-black text-white/80 bg-white/10 border border-white/15 rounded-full px-3 py-1">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 메인 컨텐츠 */}
      <main className="container mx-auto px-4 py-4 md:py-6 max-w-4xl">
        {renderProgressBar()}
        <div>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>
      </main>
    </div>
  );
}
