import { useEffect, useState } from "react";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownProps> = ({ targetDate }) => {
  console.log(targetDate);
  const [countdownTime, setCountTime] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateCountdownTime = () => {
      const convertTargetDate = targetDate.getTime();
      const currentDate = new Date().getTime();

      const difference = convertTargetDate - currentDate;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountTime({
          days,
          hours,
          minutes,
          seconds,
        });
      } else {
        setCountTime({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    const timer = setInterval(calculateCountdownTime, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  console.log(countdownTime);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-1">
        <div className="w-[70px] h-[70px] flex items-center justify-center bg-slate-100">
          <span className="text-3xl font-medium">{countdownTime.days}</span>
        </div>
        <span className="text-center text-gray-500">Days</span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="w-[70px] h-[70px] flex items-center justify-center bg-slate-100">
          <span className="text-3xl font-medium">{countdownTime.hours}</span>
        </div>
        <span className="text-center text-gray-500">Hours</span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="w-[70px] h-[70px] flex items-center justify-center bg-slate-100">
          <span className="text-3xl font-medium">{countdownTime.minutes}</span>
        </div>
        <span className="text-center text-gray-500">Minutes</span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="w-[70px] h-[70px] flex items-center justify-center bg-slate-100">
          <span className="text-3xl font-medium">{countdownTime.seconds}</span>
        </div>
        <span className="text-center text-gray-500">Seconds</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
