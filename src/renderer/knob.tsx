import { useState, useRef } from 'react';

export interface KnobProps {
    min: number;
    max: number;
    val: number;
    size?: number;
    minAngle?: number; // degrees
    maxAngle?: number; // degrees
    onChange?: (value: number) => void;
    display?: (value: number) => string;
}

export function Knob(props: KnobProps) {
    const [state, setState] = useState({
        isDown: false,
        downY: 0,
        downVal: 0,
    });
    const ref = useRef(null);
    const {
        min,
        max,
        val,
        size = 100,
        minAngle = 135,
        maxAngle = 135 + 360 - 90,
        onChange = () => {},
        display = (value) => value.toPrecision(4),
    } = props;

    const angle = minAngle + (maxAngle - minAngle) * (val - min) / (max - min);

    return (
        <div >
            <svg version="1.1" width={size} height={size}
                xmlns="http://www.w3.org/2000/svg">
                <line x1={0.8 * size/2} y1={0} x2={size/2} y2={0}
                    stroke="orange" strokeWidth={2}
                    transform={`translate(${size/2}, ${size/2}) rotate(${angle})`} />
                <text className="knob-text" x={size/2} y={size/2+5}>{display(val)}</text>
                <circle ref={ref} cx={size/2} cy={size/2} r={size/2}
                    fill="rgba(210, 130, 0, 0.1)"
                    onPointerDown={(event) => {
                        const { clientY } = event;
                        ref.current.setPointerCapture(event.pointerId);
                        const newState = { ...state, isDown: true, downY: clientY, downVal: val };
                        setState(newState);
                    }}
                    onPointerMove={(event) => {
                        if (!state.isDown) {
                            return;
                        }
                        const { clientY } = event;
                        let newVal = (state.downY - clientY) / 500 * (max - min) + state.downVal;
                        if (newVal > max) {
                            newVal = max;
                        }
                        if (newVal < min) {
                            newVal = min;
                        }
                        onChange(newVal);
                    }}
                    onPointerUp={(event) => {
                        ref.current.releasePointerCapture(event.pointerId);
                        setState({ ...state, isDown: false });
                    }}
                />
            </svg>
        </div>
    );
}
