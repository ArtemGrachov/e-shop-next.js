import { ComponentType, useState } from 'react';
import { Range } from 'react-range';

interface IProps {
  max?: number;
  min?: number;
  onChange?: (min: number, max: number) => any;
}

const FilterRange: ComponentType<IProps> = ({ max, min }) => {
  max = max ?? 1;
  min = min ?? 0;
  const [values, setValues] = useState([min, max]);

  return (
    <div>
      <Range
        step={1}
        min={min}
        max={max}
        values={values}
        onChange={v => setValues(v)}
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
