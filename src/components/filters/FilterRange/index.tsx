import { ComponentType, useState } from 'react';
import { Range } from 'react-range';

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
    if (internalValue[0] === value[0] && internalValue[1] === value[1]) {
      return;
    }

    onChange && onChange(internalValue);
  }

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        {internalValue[0]} - {internalValue[1]}
      </div>
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
            style={{
              ...props.style,
              height: "6px",
              width: "100%",
              backgroundColor: "#ccc",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            key={props.key}
            style={{
              ...props.style,
              height: "42px",
              width: "42px",
              backgroundColor: "#999",
            }}
          />
        )}
      />
    </div>
  )
}

export default FilterRange;
