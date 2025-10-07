import { ComponentType, useEffect, useState } from 'react';
import { Range } from 'react-range';

import styles from './styles.module.scss';

interface IProps {
  max?: number;
  min?: number;
  value?: [number, number];
  onChange?: (value: [number, number]) => any;
}

const FilterRange: ComponentType<IProps> = ({ max, min, value, onChange }) => {
  max = max ?? 1;
  min = min ?? 0;
  value = value ?? [min, max];
  const [internalValue, setInternalValue] = useState<[number, number]>(value);

  const finalChangeHandler = () => {
    onChange && onChange(internalValue);
  }

  useEffect(() => {
    if (value[0] === internalValue[0] && value[1] === internalValue[1]) {
      return;
    }

    setInternalValue(value);
  }, [value]);

  return (
    <div>
      <div className={styles.value}>
        {internalValue[0]} - {internalValue[1]}
      </div>
      <div className={styles.rangeWrap}>
        <Range
          step={1}
          min={min}
          max={max}
          values={internalValue}
          onChange={(v) => setInternalValue(v as [number, number])}
          onFinalChange={finalChangeHandler}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className={styles.track}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              key={props.key}
              className={styles.thumb}
            />
          )}
        />
      </div>
    </div>
  )
}

export default FilterRange;
