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
  Footprints,
  Info,
  AlertTriangle,
  PlaneLanding,
} from 'lucide-react';

interface Schedule {
  airport: string;
  departureDate: string;
  returnDate: string;
  passengers: number | string;
}

export default function App() {
  const [step, setStep] = useState(1);

  const [schedule, setSchedule] = useState<Schedule>({
    airport: '인천국제공항 (ICN)',
    departureDate: '2026-04-01',
    returnDate: '2026-04-15',
    passengers: 1,
  });

  const [arrivalTime, setArrivalTime] = useState('14:00');
  const [transport, setTransport] = useState('');

  const getDayInfo = (dateString: string) => {
    if (!dateString) return { text: '', isWeekend: false, fullText: '날짜 선택' };
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const date = new Date(dateString + 'T00:00:00');
    if (isNaN(date.getTime())) return { text: '', isWeekend: false, fullText: dateString };
    const dayIndex = date.getDay();
    return {
      text: `(${days[dayIndex]})`,
      isWeekend: dayIndex === 0 || dayIndex === 6,
      fullText: `${dateString}(${days[dayIndex]})`,
    };
  };

  const checkPublicTransitAvailability = (time: string): boolean => {
    if (!time) return false;
    const [hour, minute] = time.split(':').map(Number);
    const timeInMinutes = hour * 60 + minute;
    return timeInMinutes >= 5 * 60 && timeInMinutes <= 23 * 60 + 30;
  };

  const isTransitAvailable = checkPublicTransitAvailability(arrivalTime);

  const handleScheduleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setSchedule(prev => ({ ...prev, [name]: value }));
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
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

  const renderProgressBar = () => {
    const steps = ['도착 공항/일정', '도착 시간', '이동 수단', '이동 가이드'];
    return (
      <div className="w-full py-6 px-4 bg-white shadow-sm mb-6 rounded-xl">
        <div className="flex justify-between items-center max-w-3xl mx-auto relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded" />
          <div
            className="absolute top-1/2 left-0 h-1 bg-blue-600 -z-10 -translate-y-1/2 transition-all duration-500 rounded"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />
          {steps.map((s, index) => {
            const stepNumber = index + 1;
            const isActive = step >= stepNumber;
            const isCurrent = step === stepNumber;
            return (
              <div key={index} className="flex flex-col items-center bg-white px-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                    isActive ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-500'
                  } ${isCurrent ? 'ring-4 ring-blue-100' : ''}`}
                >
                  {stepNumber < step ? <CheckCircle size={20} /> : stepNumber}
                </div>
                <span className={`mt-2 text-xs font-medium ${isActive ? 'text-blue-700' : 'text-gray-400'}`}>
                  {s}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStep1 = () => {
    const depInfo = getDayInfo(schedule.departureDate);
    const arrInfo = getDayInfo(schedule.returnDate);

    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <MapPin className="mr-3 text-blue-600" /> 도착 공항 및 기본 일정
        </h2>
        <form onSubmit={handleStep1Submit} className="space-y-6">

          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">도착 공항</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
              <select
                name="airport" value={schedule.airport} onChange={handleScheduleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none font-medium"
              >
                <option value="인천국제공항 (ICN)">인천국제공항 (ICN)</option>
                <option value="김포국제공항 (GMP)">김포국제공항 (GMP)</option>
                <option value="김해국제공항 (PUS)">김해국제공항 (PUS) - 부산</option>
                <option value="제주국제공항 (CJU)">제주국제공항 (CJU)</option>
                <option value="청주국제공항 (CJJ)">청주국제공항 (CJJ)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">가는 날 (출발일)</label>
              <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus-within:ring-2 focus-within:ring-blue-500 transition-all cursor-pointer">
                <Calendar className="text-gray-400 mr-2 flex-shrink-0" size={20} />
                <span
                  className={`text-[15px] font-medium z-10 pointer-events-none ${
                    depInfo.isWeekend ? 'text-[#D85A30]' : 'text-gray-900'
                  }`}
                >
                  {depInfo.fullText}
                </span>
                <input
                  type="date"
                  name="departureDate"
                  value={schedule.departureDate}
                  onChange={handleScheduleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">오는 날 (귀국일)</label>
              <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus-within:ring-2 focus-within:ring-blue-500 transition-all cursor-pointer">
                <Calendar className="text-gray-400 mr-2 flex-shrink-0" size={20} />
                <span
                  className={`text-[15px] font-medium z-10 pointer-events-none ${
                    arrInfo.isWeekend ? 'text-[#D85A30]' : 'text-gray-900'
                  }`}
                >
                  {arrInfo.fullText}
                </span>
                <input
                  type="date"
                  name="returnDate"
                  value={schedule.returnDate}
                  onChange={handleScheduleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">이동 인원</label>
            <div className="relative">
              <Users className="absolute left-3 top-3 text-gray-400" size={20} />
              <select
                name="passengers" value={schedule.passengers} onChange={handleScheduleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>성인 {num}명</option>
                ))}
                <option value="group">단체 (6명 이상)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 text-right">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5 text-lg"
            >
              다음 단계로
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderStep2 = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
        <Clock className="mr-3 text-blue-600" /> 도착 시간을 알려주세요
      </h2>
      <p className="text-gray-500 mb-8">
        입국 수속 및 수하물 수취 시간을 고려한 예상 공항 로비 도착 시간을 선택해 주세요. (보통 착륙 후 1시간 뒤)
      </p>

      <form onSubmit={handleStep2Submit} className="space-y-6">
        <div className="flex justify-center">
          <input
            type="time"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
            className="text-5xl font-black text-center text-blue-900 bg-blue-50 border-none rounded-2xl py-6 px-4 focus:ring-4 focus:ring-blue-200 outline-none transition-all cursor-pointer"
            required
          />
        </div>

        <div
          className={`p-5 rounded-xl border flex items-start ${
            isTransitAvailable
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-orange-50 border-orange-200 text-orange-800'
          }`}
        >
          {isTransitAvailable ? (
            <Info className="w-6 h-6 mr-3 text-green-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-6 h-6 mr-3 text-orange-600 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <h4 className="font-bold text-lg mb-1">
              {isTransitAvailable
                ? '대중교통 이용 가능 시간대입니다.'
                : '대중교통 이용이 제한되는 심야/새벽 시간입니다.'}
            </h4>
            <p className="text-sm opacity-90 leading-relaxed">
              {isTransitAvailable
                ? '지하철(공항철도), 시내버스, 공항 리무진 등 대부분의 이동 수단을 자유롭게 선택하실 수 있습니다.'
                : '정규 지하철 및 주간 버스 운행이 종료되었습니다. 심야 공항버스(N버스), 24시간 택시, 혹은 도보(인근 호텔) 이동을 권장합니다.'}
            </p>
          </div>
        </div>

        <div className="pt-6 flex gap-4">
          <button
            type="button" onClick={() => setStep(1)}
            className="w-1/3 px-6 py-4 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
          >
            이전
          </button>
          <button
            type="submit"
            className="w-2/3 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all"
          >
            이동 수단 선택하기
          </button>
        </div>
      </form>
    </div>
  );

  const renderStep3 = () => {
    const transportOptions = [
      { id: 'subway',    name: '지하철 / 공항철도', icon: Train,      type: 'public', desc: '정체 없이 정해진 시간에 가장 빠르게 도심 진입' },
      { id: 'bus',       name: '시내버스',           icon: Bus,        type: 'public', desc: '비교적 저렴한 요금으로 주요 거점 이동' },
      { id: 'limousine', name: '공항 리무진',         icon: Bus,        type: 'all',    desc: '편안한 좌석과 넉넉한 수하물 공간, 호텔 직행 노선' },
      { id: 'taxi',      name: '택시 / 콜밴',         icon: Car,        type: 'all',    desc: '목적지까지 프라이빗하고 편안한 다이렉트 이동' },
      { id: 'walk',      name: '도보 (인근 이동)',     icon: Footprints, type: 'all',    desc: '제1/2터미널 내 캡슐호텔 및 공항 인근 도보권 숙소 이동' },
    ];

    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">도심으로 가는 방법을 선택해 주세요</h2>
          <p className="text-gray-500 mt-2">
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
                className={`relative p-6 text-left rounded-2xl border-2 transition-all duration-200 flex flex-col h-full
                  ${isDisabled
                    ? 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed'
                    : 'bg-white border-transparent shadow-sm hover:shadow-md hover:border-blue-400 cursor-pointer'
                  }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4
                  ${isDisabled ? 'bg-gray-200 text-gray-400' : 'bg-blue-50 text-blue-600'}`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{option.name}</h3>
                <p className="text-sm text-gray-500 flex-grow">{option.desc}</p>
                {isDisabled && (
                  <div className="mt-4 text-xs font-semibold text-orange-500 bg-orange-50 inline-block px-2 py-1 rounded">
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
            className="text-gray-500 font-medium hover:text-gray-800 hover:underline"
          >
            ← 시간 다시 설정하기
          </button>
        </div>
      </div>
    );
  };

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
      } else if (transport.includes('버스')) {
        return (
          <ul className="space-y-4 text-gray-700 leading-relaxed">
            <li><strong>탑승 위치:</strong> 1층 입국장 외부 시내버스 승강장번호를 확인 후 이동하세요. (서울/경기/인천 노선별 위치 상이)</li>
            <li><strong>이용 요금:</strong> 일반 교통카드 또는 현금으로 이용 가능합니다. (거리 비례제 적용 가능)</li>
            <li><strong>장점:</strong> 목적지 근처의 세부 정류장까지 저렴하게 이동할 수 있습니다.</li>
            <li><strong>참고:</strong> 큰 수하물의 경우 차내 반입이 제한될 수 있으므로 리무진 버스 이용을 권장합니다.</li>
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
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-blue-600 p-8 text-white">
          <div className="inline-block px-3 py-1 bg-blue-500 text-blue-100 rounded-full text-sm font-semibold mb-4">
            맞춤형 이동 가이드
          </div>
          <h2 className="text-3xl font-bold mb-2">{schedule.airport}에서 도심으로</h2>
          <p className="text-blue-100 text-lg">
            {schedule.departureDate} 도착 • {arrivalTime} 기준 • {transport} 이용
          </p>
        </div>

        <div className="p-8">
          <h3 className="text-xl font-bold text-gray-900 border-b pb-3 mb-5">상세 이용 안내</h3>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
            {getGuideContent()}
          </div>

          <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl flex items-start gap-4 mb-8">
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <p className="text-sm text-blue-800 leading-relaxed">
              <strong>Tip:</strong> 공항 상황(날씨, 요일, 특별 행사 등)에 따라 실제 운행 시간표와 대기 시간이 달라질 수 있습니다.
              이동 전 각 교통수단의 공식 앱이나 안내 데스크를 통해 한 번 더 확인하시는 것이 좋습니다.
            </p>
          </div>

          <div className="flex justify-center border-t pt-8">
            <button
              onClick={() => { setStep(1); setTransport(''); }}
              className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors shadow-md"
            >
              처음부터 다시 계획하기
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div
            className="flex items-center text-blue-600 font-black text-2xl tracking-tight cursor-pointer"
            onClick={() => setStep(1)}
          >
            <PlaneLanding className="mr-2" size={28} />
            CityTransit Guide
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-semibold text-gray-600">
            <a href="#" className="hover:text-blue-600 transition-colors">공항별 정보</a>
            <a href="#" className="hover:text-blue-600 transition-colors">수하물 배송</a>
            <a href="#" className="hover:text-blue-600 transition-colors">고객센터</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        {renderProgressBar()}
        <div className="mt-8">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>
      </main>
    </div>
  );
}
