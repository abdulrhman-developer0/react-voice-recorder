import { useContext, useRef } from "react";
import { counter } from '../providers/CounterProvider';

export default function useCounter() {
  const [value, setValue] = useContext(counter)
  const counterIntervalRef = useRef(null)

  const start = (step = 1) => {
    if (!counterIntervalRef.current) {
      counterIntervalRef.current = setInterval(() => {
        setValue(value => value + step);
      }, 1000);
    }
  };

  const stop = () => {
    if (counterIntervalRef.current) {
      clearInterval(counterIntervalRef.current);
      counterIntervalRef.current = null;
    }
  };

  const reset = (value = 0) => {
    stop();
    setValue(value);
  };

  return { value, start, stop, reset}
}
