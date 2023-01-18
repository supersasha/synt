import { ReactElement, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { getRack, getInstance, subscribeToViewUpdate } from './rack-proxy';
import { Plot } from './plot';
import { Knob, Pointer, Scale, Arc, Value } from 'rc-knob';

const container = document.getElementById('app');
const root = createRoot(container!);

function RackKnob(props: any) {
    const { value, min, max, onChange } = props;
    return (
        <Knob 
            size={100}  
            angleOffset={220} 
            angleRange={280}
            steps={10}
            min={min}
            value={value}
            max={max}
            onChange={onChange}
        >
            <Scale 
                tickWidth={2} 
                tickHeight={2} 
                radius={45} 
            />
            <circle
                r="35"
                cx="50"
                cy="50"
                fill="#FC5A96"
            />,
            <Pointer 
                width={2} 
                height={35} 
                radius={10}
                type="rect"
                color="#FC5A96"
            />
            <Value 
                marginBottom={40} 
            />
        </Knob>
    );
}


function RackView() {
    const [view, setView]: [Record<string, any>, any] = useState({});
    const [values, setValues]: [Record<string, number>, any] = useState({});

    subscribeToViewUpdate((_ev, newView: Record<string, any>) => {
        console.log('view updated');
        setView(newView);
        const newValues: Record<string, number> = {};
        for (const [k, v] of Object.entries(newView)) {
            const { init } = v;
            newValues[k] = init; 
        }
        setValues(newValues);
    });

    const knobs: ReactElement[] = [];
    for (const [k, v] of Object.entries(view)) {
        const { type, min, max, title } = v;
        if (type !== 'knob') {
            continue;
        }
        const knob = (
            <div key={k}>
                <span>{title}</span>
                <RackKnob
                    name={k}
                    min={min}
                    max={max}
                    value={values[k]}
                    onChange={async (val: number) => {
                        const instance = getInstance(k);
                        await instance.setValue(val);
                        setValues({ ...values, k: val });
                    }}
                />
            </div>
        );
        knobs.push(knob);
    }
    return (
        <div>
            {knobs}
        </div>
    );
}

interface OscilloscopeProps {
    name: string;
}

function Oscilloscope(props: OscilloscopeProps) {
    const { name } = props;
    const [state, setState] = useState({ xs: [0, 1], ys: [0, 1] });
    setTimeout(async () => {
        const instance = getInstance(name);
        const data = await instance.getData();
        setState(data);
    }, 100);

    return (
        <div>
            <Plot
                containerStyle={{ width: '1000px', height: '600px'}}
                xmarkFormat=":3"
                yrange={[-1, 1]}
                plots={[
                    state,
                ]}
            />
        </div>
    );
}

function App() {
    const [paused, setPaused] = useState(true);
    return (<div>
        <div>
            <button onClick={async () => {
                const rack = getRack();
                if (paused) {
                    const res = await rack.resume();
                    console.log(res);
                } else {
                    await rack.pause();
                }
                setPaused(!paused);
            }}>{ paused ? 'play' : 'stop' }</button>
        </div>
        <div><RackView /></div>
        <div>
            <Oscilloscope name="oscope" />
        </div>
    </div>);
}

root.render(<App />);
