import fs from 'fs';
import path from 'path';

import { Module, Topology, GlobalState, IORouter } from '../rack';
import { parse, ModuleDefinition, InstanceDecl, ImportDecl } from '../parser';

import { Amplifier } from './modules';
import { Audio } from './audio';
import { Envelope } from './envelope';
import { FiliFilter } from './fili-filter';
import { HarmonicOsc } from './harmonic-osc';
import { Harmonics } from './harmonics';
import { Kxb } from './kxb';
import { Mixer } from './mixer';
import { Noise } from './noise';
import { Oscilloscope } from './oscilloscope';
import { SawOsc } from './saw-osc';
import { Sequencer } from './sequencer';
import { SincFilter } from './sinc-filter';
import { SineOsc } from './sine-osc';
import { SquareOsc } from './square-osc';
import { Value } from './value';
import { VCF } from './vcf';
import { Void } from './void';

import { secsToVal, freqToVal } from '../../common';

interface ModuleConstructor {
    new (...args: any[]): Module;
};

const rootModules: { [name: string]: ModuleConstructor } = {
    Amplifier,
    Audio,
    Envelope,
    FiliFilter,
    HarmonicOsc,
    Harmonics,
    Kxb,
    Mixer,
    Noise,
    Oscilloscope,
    SawOsc,
    Sequencer,
    SincFilter,
    SineOsc,
    SquareOsc,
    Value,
    VCF,
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

export class IORouterOfMetaModule implements IORouter {
    private instanceIndex: number = 0;
    private inputsRouter: number[][];
    private outputsRouter: number[][];
    private outputs: number[];

    constructor(inputsRouter: number[][], outputsRouter: number[][], outputs: number[]) {
        this.inputsRouter = inputsRouter;
        this.outputsRouter = outputsRouter;
        this.outputs = outputs;
    }

    setInstanceIndex(index: number) {
        this.instanceIndex = index;
    }

    getInput(inputIndex: number, defaultValue: number): number {
        const index = this.inputsRouter[this.instanceIndex][inputIndex];
        if (index < 0) {
            return defaultValue;
        }
        return this.outputs[index];
    }

    putOutput(outputIndex: number, value: number) {
        const index = this.outputsRouter[this.instanceIndex][outputIndex];
        if (index >= 0) {
            this.outputs[index] = value;
        }
    }
}

export class MetaModule implements Module {
    private instances: Instance[] = [];
    private view: Record<string, any> = {};
    private tpl: Topology;

    private outputs: number[] = [];
    private outputIndexByName: { [instanceName: string]: { [outputName: string]: number } } = {};

    // Inputs router maps instance index to the table
    // that maps input index to the index in the 'outputs' table
    private inputsRouter: number[][] = [];

    // Outputs router maps instance index to the table
    // that maps output index to the index in the 'outputs' table
    private outputsRouter: number[][] = [];

    private modInputIndexByName: { [name: string]: number } = {};
    private modInputs: string[] = [];
    private modInputsRouter: number[] = [];

    // Maps indices of module outputs to the indices in 'outputs' table
    private modOutputsRouter: number[] = [];
    private modOutputs: string[] = [];

    private ioRouter: IORouterOfMetaModule;

    constructor(filepath: string) {
        const text = fs.readFileSync(filepath, { encoding: 'utf8' });
        const md: ModuleDefinition = parse(text);

        for (let i = 0; i < md.inputs.length; i++) {
            this.outputs.push(md.inputs[i].defaults);
            this.modInputIndexByName[md.inputs[i].name] = this.outputs.length - 1;
            this.modInputs.push(md.inputs[i].name);
            this.modInputsRouter.push(this.outputs.length - 1);
        }

        for (let i = 0; i < md.outputs.length; i++) {
            this.modOutputsRouter.push(-1);
            this.modOutputs.push(md.outputs[i]);
        }

        for (let i = 0; i < md.instances.length; i++) {
            const inst = md.instances[i];
            const instance = createInstance(inst, md.imports, path.dirname(filepath));
            if (instance === null) {
                continue;
            }
            this.instances.push({ name: inst.name, inst: instance });
            if (instance.getViewConfig) {
                this.view[inst.name] = instance.getViewConfig();
            }

            const tpl = instance.topology();

            // Adding inputs
            const inputsRoute: number[] = new Array(tpl.inputs.length);
            inputsRoute.fill(-1);
            for (const k of Object.keys(inst.inputs)) {
                const inputIndex = tpl.inputs.indexOf(k);
                if (inputIndex < 0) {
                    continue;
                }
                const v = inst.inputs[k];
                if (typeof v === 'object' && 'val' in v) {
                    let val = 0;
                    if (v.transformFrom === 'secs') {
                        val = secsToVal(v.val);
                    } else if (v.transformFrom === 'herz') {
                        val = freqToVal(v.val);
                    } else {
                        val = v.val;
                    }
                    this.outputs.push(val);
                    inputsRoute[inputIndex] = this.outputs.length - 1;
                } else if (typeof v === 'string') {
                    inputsRoute[inputIndex] = this.modInputIndexByName[v];
                } else {
                    inputsRoute[inputIndex] = this.outputIndexByName[v.instance][v.output];
                }

            }
            this.inputsRouter.push(inputsRoute);

            // Adding outputs
            const outputsRoute: number[] = new Array(tpl.outputs.length);
            this.outputIndexByName[inst.name] = {};
            for (let i = 0; i < tpl.outputs.length; i++) {
                this.outputs.push(0); // initial value;
                this.outputIndexByName[inst.name][tpl.outputs[i]] = this.outputs.length - 1;
                outputsRoute[i] = this.outputs.length - 1;

                const modOutputName = inst.outputs[tpl.outputs[i]];
                if (modOutputName) {
                    const outputIndex = md.outputs.indexOf(modOutputName);
                    if (outputIndex >= 0) {
                        this.modOutputsRouter[outputIndex] = this.outputs.length - 1;
                    }
                }
            }
            this.outputsRouter.push(outputsRoute);
        }
        this.tpl = {
            inputs: this.modInputs,
            outputs: this.modOutputs
        };

        this.ioRouter = new IORouterOfMetaModule(
            this.inputsRouter, this.outputsRouter, this.outputs);
    }

    topology() {
        return this.tpl;
    }

    next(ioRouter: IORouter, state: GlobalState): void {
        for (let i = 0; i < this.tpl.inputs.length; i++) {
            this.outputs[this.modInputsRouter[i]] = ioRouter.getInput(i, 0);
        }

        for (let i = 0; i < this.instances.length; i++) {
            const instance = this.instances[i].inst;
            this.ioRouter.setInstanceIndex(i);
            instance.next(this.ioRouter, state);
        }
        
        for (let i = 0; i < this.tpl.outputs.length; i++) {
            ioRouter.putOutput(i, this.outputs[this.modOutputsRouter[i]])
        }
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
}

