import fs from 'fs';
import path from 'path';

import { Module, Inputs, Outputs, GlobalState } from '../rack';
import { parse, ModuleDefinition, InstanceDecl, ImportDecl } from '../parser';

import { Audio } from './audio';
import { SincFilter } from './sinc-filter';
import { SquareOsc } from './square-osc';
import { SineOsc } from './sine-osc';
import { Amplifier } from './modules';
import { Sequencer } from './sequencer';
import { Envelope } from './envelope';
import { Oscilloscope } from './oscilloscope';
import { Value } from './value';

interface ModuleConstructor {
    new (...args: any[]): Module;
};

const rootModules: { [name: string]: ModuleConstructor } = {
    Amplifier,
    Audio,
    Envelope,
    Oscilloscope,
    Sequencer,
    SineOsc,
    SincFilter,
    SquareOsc,
    Value,
};

function createInstance(instDecl: InstanceDecl, impDecls: ImportDecl[], dir: string): Module {
    // First try to find in imports
    for (const impDecl of impDecls) {
        for (const name of impDecl.moduleNames) {
            if (name === instDecl.constr) {
                const filepath = path.join(impDecl.path, `${name}.mod`);
                return new MetaModule(filepath);
            }
        }
    }

    // Now try to find in the dir
    const filepath = path.join(dir, `${instDecl.name}.mod`);
    if (fs.existsSync(filepath)) {
        return new MetaModule(filepath);
    }

    // Finally try to find among root modules registry
    const Constr = rootModules[instDecl.constr];
    if (Constr) {
        return new Constr(...instDecl.args);
    }
    return null;
}

export class MetaModule implements Module {
    private instances: Record<string, Module> = {};
    private inputsRouter: Record<string, (inp: Inputs) => Inputs> = {};
    private outputsRouter: Record<string, string> = {};
    private outputs: Record<string, number> = {};
    private view: Record<string, any> = {};

    constructor(filepath: string) {
        const text = fs.readFileSync(filepath, { encoding: 'utf8' });
        const md: ModuleDefinition = parse(text);
        for (const inst of md.instances) {
            const instance = createInstance(inst, md.imports, path.dirname(filepath));
            this.instances[inst.name] = instance;
            if (instance.getViewConfig) {
                this.view[inst.name] = instance.getViewConfig();
            }
            for (const [inner, outer] of Object.entries(inst.outputs)) {
                this.outputsRouter[`${inst.name}:${inner}`] = outer;
            }
            this.inputsRouter[inst.name] = (modInputs: Inputs) => {
                const inputs: Inputs = {};
                for (const [k, v] of Object.entries(inst.inputs)) {
                    if (typeof v === 'number') {
                        inputs[k] = v;
                    } else if (typeof v === 'string') {
                        inputs[k] = modInputs[v]; 
                    } else {
                        inputs[k] = this.outputs[`${v.instance}:${v.output}`];
                    }
                }
                return inputs;
            };
        }
    }

    next(inp: Inputs, state: GlobalState): Outputs {
        const outs: Outputs = {};
        for (const [name, instance] of Object.entries(this.instances)) {
            const inputs = this.inputsRouter[name](inp);
            const outputs = instance.next(inputs, state);
            for (const [k, v] of Object.entries(outputs)) {
                const key = `${name}:${k}`;
                this.outputs[key] = v;
                const foundOutput = this.outputsRouter[key];
                if (foundOutput) {
                    outs[foundOutput] = v;
                }
            }
        }
        return outs;
    }

    getInstance(name: string): Module {
        return this.instances[name];
    }

    getView() {
        return this.view;
    }
}

