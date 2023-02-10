import fs from 'fs';
import path from 'path';

import { Module, Inputs, Outputs, GlobalState } from '../rack';
import { parse, ModuleDefinition, InstanceDecl, ImportDecl } from '../parser';

import { Amplifier } from './modules';
import { Audio } from './audio';
import { Envelope } from './envelope';
import { Kxb } from './kxb';
import { Noise } from './noise';
import { Oscilloscope } from './oscilloscope';
import { SawOsc } from './saw-osc';
import { Sequencer } from './sequencer';
import { SincFilter } from './sinc-filter';
import { SineOsc } from './sine-osc';
import { SquareOsc } from './square-osc';
import { Value } from './value';

import { secsToVal, freqToVal } from '../../common';

import { performance } from 'perf_hooks';

interface ModuleConstructor {
    new (...args: any[]): Module;
};

const rootModules: { [name: string]: ModuleConstructor } = {
    Amplifier,
    Audio,
    Envelope,
    Kxb,
    Noise,
    Oscilloscope,
    SawOsc,
    Sequencer,
    SineOsc,
    SincFilter,
    SquareOsc,
    Value,
};

function createInstance(instDecl: InstanceDecl, impDecls: ImportDecl[], dir: string): Module {
    console.log(`Creating instance of`, instDecl);
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
    const filepath = path.join(dir, `${instDecl.constr}.mod`);
    console.log(`Looking for module at ${filepath}`);
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
    private instances: Map<string, Module> = new Map();
    private inputsRouter: Record<string, Inputs> = {};
    private outputsRouter: Record<string, string> = {};
    private outputs: Record<string, number> = {};
    private view: Record<string, any> = {};
    private modInputs: Inputs = {};
    //private perf: Record<string, number> = {};

    constructor(filepath: string) {
        console.log('Creating metamodule from', filepath);
        const text = fs.readFileSync(filepath, { encoding: 'utf8' });
        const md: ModuleDefinition = parse(text);
        for (const inst of md.instances) {
            console.log(`attempt to create instance`, inst);
            const instance = createInstance(inst, md.imports, path.dirname(filepath));
            if (instance === null) {
                continue;
            }
            console.log(`instance:`, inst);
            this.instances.set(inst.name,  instance);
            if (instance.getViewConfig) {
                this.view[inst.name] = instance.getViewConfig();
            }
            for (const [inner, outer] of Object.entries(inst.outputs)) {
                this.outputsRouter[`${inst.name}:${inner}`] = outer;
            }
            const inputs: Inputs = {};
            const self = this;
            for (const k of Object.keys(inst.inputs)) {
                const v = inst.inputs[k];
                if (typeof v === 'object' && 'val' in v) {
                    if (v.transformFrom === 'secs') {
                        inputs[k] = secsToVal(v.val);
                    } else if (v.transformFrom === 'herz') {
                        inputs[k] = freqToVal(v.val);
                    } else {
                        inputs[k] = v.val;
                    }
                } else if (typeof v === 'string') {
                    Object.defineProperty(inputs, k, {
                        get() {
                            return self.modInputs[v];
                        }
                    });
                } else {
                    const key = `${v.instance}:${v.output}`;
                    Object.defineProperty(inputs, k, {
                        get() {
                            return self.outputs[key];
                        }
                    });
                }
            }
            this.inputsRouter[inst.name] = inputs;
        }
    }

    next(inp: Inputs, state: GlobalState): Outputs {
        const outs: Outputs = {};
        this.modInputs = inp;

        for (const name of this.instances.keys()) {
            //console.log('processing module', name);
            //const t0 = performance.now();

            const instance = this.instances.get(name);

            const inputs = this.inputsRouter[name];
            const outputs = instance.next(inputs, state);

            for (const k of Object.keys(outputs)) {
                const key = `${name}:${k}`;
                const v = outputs[k];
                this.outputs[key] = v;
                const foundOutput = this.outputsRouter[key];
                if (foundOutput) {
                    outs[foundOutput] = v;
                }
            }

            //const t1 = performance.now();
            //if (!this.perf[name]) {
            //    this.perf[name] = 0;
            //}
            //this.perf[name] += t1 - t0;
        }
        return outs;
    }

    getInstance(name: string): Module {
        return this.instances.get(name);
    }

    getView() {
        return this.view;
    }

    shutdown() {
        console.log('Shutting down');
        for (const [name, inst] of this.instances.entries()) {
            if (inst.shutdown) {
                console.log('Shutting down', name);
                inst.shutdown();
            }
        }
        console.log('Shut down');
    }

    /*
    resetStats() {
        this.perf = {};
    }

    getStats() {
        return this.perf;
    }
    */
}

