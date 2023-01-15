import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { getRack, getInstance } from './rack-proxy';
import { Plot } from './plot';
import { Knob, Pointer, Scale, Arc, Value } from 'rc-knob';

const container = document.getElementById('app');
const root = createRoot(container!);

function MyKnob(props: any) {
    const [value, setValue] = useState(20000);
    return (
        <Knob 
          size={100}  
          angleOffset={220} 
          angleRange={280}
          steps={10}
          min={100}
          max={20000}
            onChange={ async(value: number) => {
                const instance = getInstance(props.name);
                await instance.setValue(value);
                setValue(value);
            }}
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

function Oscilloscope(props: any) {
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
        <div><MyKnob name="cutoff" /></div>
        <div>
            <Oscilloscope name="oscope" />
        </div>
    </div>);
}

root.render(<App />);
