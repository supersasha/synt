import { ReactElement, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { getRack, getInstance, subscribeToViewUpdate } from './rack-proxy';
import { Plot } from './plot';
//import { Knob, Pointer, Scale, Arc, Value } from 'rc-knob';
import { Knob } from './knob';
import { valToFreq, valToSecs } from '../common';

import './index.css';

const container = document.getElementById('app');
const root = createRoot(container!);

interface RackKnobProps {
    name: string;
    value: number;
    min: number;
    max: number;
    onChange(value: number): void;
    intent: string;
};

const INTENTS: Record<string, (val: number) => string> = {
    linear(val) {
        return `${val.toPrecision(4)}`;
    },

    freq(val) {
        const f = valToFreq(val);
        if (f > 1000) {
            return `${(f/1000).toPrecision(4)} kHz`
        }
        return `${f.toPrecision(4)} Hz`;
    },

    time(val) {
        const t = valToSecs(val);
        if (t < 1) {
            return `${(t*1000).toPrecision(4)} ms`;
        }
        return `${t.toPrecision(4)} s`;
    }
};

function RackKnob(props: RackKnobProps) {
    const { value, min, max, onChange, intent } = props;
    return (
        <Knob min={min} max={max} val={value} onChange={onChange}
            display={INTENTS[intent]}
        />
    );
}

interface OscilloscopeProps {
    name: string;
    title: string;
}

function Oscilloscope(props: OscilloscopeProps) {
    const { name, title } = props;
    const [state, setState] = useState({ xs: [0, 1], ys: [0, 1] });
    setTimeout(async () => {
        const instance = getInstance(name);
        const data = await instance.getData();
        const xs = [];
        const ys = [];
        for (let i = 0; i < data.length; i++) {
            if (i % 2 === 0) {
                xs.push(data[i]);
            } else {
                ys.push(data[i]);
            }
        }
        setState({ xs, ys });
    }, 100);

    return (
        <div>
            <Plot
                title={title}
                containerStyle={{ width: '500px', height: '300px'}}
                xmarkFormat=":3"
                yrange={[-1, 1]}
                plots={[
                    state,
                ]}
            />
        </div>
    );
}

function RackView() {
    const [view, setView]: [Record<string, any>, any] = useState({});
    const [values, setValues]: [Record<string, number>, any] = useState({});

    useEffect(() => {
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
        const rack = getRack();
        console.log('sending view ready');
        rack.viewReady();
    }, []);

    const knobs: ReactElement[] = [];
    for (const [k, v] of Object.entries(view)) {
        const { type, min, max, title, intent } = v;
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
                    intent={intent}
                    onChange={async (val: number) => {
                        const instance = getInstance(k);
                        await instance.setValue(val);
                        setValues({ ...values, [k]: val });
                    }}
                />
            </div>
        );
        knobs.push(knob);
    }
    const oscopes: ReactElement[] = [];
    for (const [k, v] of Object.entries(view)) {
        const { type, title } = v;
        if (type !== 'oscilloscope') {
            continue;
        }
        const oscope = (
            <Oscilloscope key={k} name={k} title={title} />
        );
        oscopes.push(oscope);
    }
    return (
        <div>
            <div className="horz-flex">{knobs}</div>
            <div className="horz-flex">{oscopes}</div>
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
    </div>);
}

root.render(<App />);
