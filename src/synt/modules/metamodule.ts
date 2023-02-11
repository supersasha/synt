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
import { Void } from './void';

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

    Void,
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

interface Instance {
    name: string;
    inst: Module;
}

export class MetaModule implements Module {
    private instances: Instance[] = [];
    private inputsRouter: Inputs[] = [];
    private outputs: Record<string, number>[] = [];
    private view: Record<string, any> = {};
    private modInputs: Inputs = {};
    private exposedOutputs: Outputs = {};
    //private perf: Record<string, number> = {};

    constructor(filepath: string) {
        console.log('Creating metamodule from', filepath);
        const text = fs.readFileSync(filepath, { encoding: 'utf8' });
        const md: ModuleDefinition = parse(text);
        const self = this;
        for (let i = 0; i < md.instances.length; i++) {
            const inst = md.instances[i];
            console.log(`attempt to create instance`, inst);
            const instance = createInstance(inst, md.imports, path.dirname(filepath));
            if (instance === null) {
                continue;
            }
            console.log(`instance:`, inst);
            this.instances.push({ name: inst.name, inst: instance });
            if (instance.getViewConfig) {
                this.view[inst.name] = instance.getViewConfig();
            }
            for (const [inner, outer] of Object.entries(inst.outputs)) {
                Object.defineProperty(this.exposedOutputs, outer, {
                    get() {
                        return self.outputs[i][inner];
                    }
                });
            }
            const inputs: Inputs = {};
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
                    const index = this.findInstanceIndexByName(v.instance);
                    Object.defineProperty(inputs, k, {
                        get() {
                            return self.outputs[index][v.output];
                        }
                    });
                }
            }
            this.inputsRouter.push(inputs);
        }
    }

    private findInstanceIndexByName(name: string): number {
        for (let i = 0; i < this.instances.length; i++) {
            if (this.instances[i].name === name) {
                return i;
            }
        }
        return -1;
    }

    next(inp: Inputs, state: GlobalState): Outputs {
        this.modInputs = inp;

        for (let i = 0; i < this.instances.length; i++) {
            const instance = this.instances[i].inst;

            const inputs = this.inputsRouter[i];
            this.outputs[i] = instance.next(inputs, state);

        }
        return this.exposedOutputs;
    }

    getInstance(name: string): Module {
        for (let i = 0; i < this.instances.length; i++) {
            if (this.instances[i].name === name) {
                return this.instances[i].inst;
            }
        }
    }

    getView() {
        return this.view;
    }

    shutdown() {
        console.log('Shutting down');
        for (let i = 0; i < this.instances.length; i++) {
            if (this.instances[i].inst.shutdown) {
                console.log('Shutting down', this.instances[i].name);
                this.instances[i].inst.shutdown();
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

