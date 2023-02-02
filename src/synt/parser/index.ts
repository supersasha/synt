const mod = require('./module');
import { inspect } from 'util';

export interface ModuleDefinition {
    name: string;
    imports: ImportDecl[];
    inputs: InputDecl[];
    outputs: string[];
    instances: InstanceDecl[];
};

export interface ImportDecl {
    moduleNames: string[];
    path: string;
};

export interface InputDecl {
    name: string;
    defaults: number;
};

export interface InstanceDecl {
    name: string;
    constr: string;
    args: (number | string)[];
    outputs: { [name: string]: string };
    inputs: { [name: string]: InputValue };
};

interface OutputRef {
    instance: string;
    output: string;
}

interface NumVal {
    val: number;
    transformFrom?: string;
}

type InputValue = NumVal | string | OutputRef;

interface Actions {
    [key: string]: Action;
}

interface Action {
    (input: string, start: number, end: number, elements: any[]): any;
}

export function parse(text: string): ModuleDefinition {
    const actions: Actions = {
        buildModule(_input, _start, _end, elements) {
            return {
                name: elements[0],
                imports: elements[1].elements[1] || [],
                inputs: elements[2].elements[1] || [],
                outputs: elements[3].elements[1] || [],
                instances: elements[4]
            };
        },
        buildName(_input, _start, _end, elements) {
            return elements[1]
        },
        buildImports(_input, _start, _end, elements) {
            return [elements[0], ...elements[1].elements.map((e: any) => e.elements[1])];
        },
        buildImport(_input, _start, _end, elements) {
            return {
                moduleNames: [elements[2], ...elements[3].elements.map((e: any) => e.elements[3])],
                path: elements[7]
            };
        },
        buildInputs(_input, _start, _end, elements) {
            return [elements[0], ...elements[1].elements.map((e: any) => e.elements[1])];
        },
        buildInput(_input, _start, _end, elements) {
            return {
                name: elements[2],
                defaults: elements[6]
            };
        },
        buildOutputs(_i, _s, _e, elements) {
            return [elements[0], ...elements[1].elements.map((e: any) => e.elements[1])];
        },
        buildOutput(_i, _s, _e, elements) {
            return elements[2];
        },
        buildInstances(_input, _start, _end, elements) {
            return [elements[0], ...elements[1].elements.map((e: any) => e.elements[1])];
        },
        buildInstance(_input, _start, _end, elements) {
            const decls = elements[9].elements[1] || [];
            return {
                name: elements[2],
                constr: elements[6].constr,
                args: elements[6].args,
                inputs: decls.filter((e: any) => e.name)
                    .reduce((acc: any, { name, value }: any) => {
                        return { ...acc, [name]: value  };
                    }, {}),
                outputs: decls.filter((e: any) => e.output)
                    .reduce((acc: any, { output, as }: any) => {
                        return { ...acc, [output]: as };
                    }, {}),
            };
        },
        buildInstConstr(_input, _start, _end, elements) {
            return {
                constr: elements[0],
                args: elements[1].elements[3] || [],
            };
        },
        buildConstrArgs(_input, _start, _end, elements) {
            return [elements[0], ...elements[1].elements.map((e:any) => e.elements[3])];
        },
        buildInstDecls(_input, _start, _end, elements) {
            return [elements[0], ...elements[1].elements.map((e: any) => e.elements[1])];
        },
        buildExpose(_input, _start, _end, elements) {
            return {
                output: elements[4],
                as: elements[8]
            };
        },
        buildInp(_input, _start, _end, elements) {
            return {
                name: elements[0],
                value: elements[4]
            };
        },
        buildNumVal(_input, _start, _end, elements) {
            return {
                val: elements[0],
                transformFrom: elements[1].elements[3]
            };
        },
        buildOutRef(_input, _start, _end, elements) {
            return {
                instance: elements[0],
                output: elements[2],
            };
        },
        buildIdent(input, start, end) {
            return input.substring(start, end);
        },
        buildString(_input, _start, _end, elements) {
            return elements[1].text;
        },
        buildNumber(input, start, end) {
            return parseFloat(input.substring(start, end));
        },
        buildNothing() {
            return;
        }
    }
    const tree: any = mod.parse(text, { actions });
    console.log(inspect(tree, { depth: 10 }));
    return tree;
}

