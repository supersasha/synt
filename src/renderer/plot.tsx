import * as React from 'react';
import { useRef, useEffect } from 'react';
import { linspace } from '../synt/generators';

type PlotKind = 'line' | 'scatter';

export interface PlotSpec {
    xs: number[];
    ys: number[];
    style: string;
    kind: PlotKind;
}

export interface PlotProps {
    containerStyle: any;
    plotMargin: number;
    xrange: 'auto' | [number, number];
    yrange: 'auto' | [number, number];
    plots: PlotSpec[];
    xmarks: number;
    xmarkFormat: string;
    ymarks: number;
    ymarkFormat: string;
    title: string;
    lineWidth: number;
    titleFont: string;
}

const defaultPlotSpec: PlotSpec = {
    xs: [],
    ys: [],
    style: '',
    kind: 'line',
};

const defaultProps: PlotProps = {
    containerStyle: {},
    plotMargin: 60,
    xrange: 'auto', // 'auto' | [x0, x1]
    yrange: 'auto', // 'auto' | [y0, y1]
    plots: [],
    xmarks: 11,
    xmarkFormat: 'fixed:2',
    ymarks: 11,
    ymarkFormat: 'fixed:2',
    title: "Plot",
    lineWidth: 1,
    titleFont: '16px sans',
};

export function Plot(_props: Partial<Omit<PlotProps, 'plots'> & { plots: Partial<PlotSpec>[] }>): React.ReactElement {
    const props: PlotProps = { ...defaultProps, ..._props,
                    plots: _props.plots?.map(
                        (p: Partial<PlotSpec>): PlotSpec => ({ ...defaultPlotSpec, ...p })
                    )
    };
    const containerRef = useRef(null);
    const canvasRef = useRef(null);

    function draw(ctx: CanvasRenderingContext2D): void {
        function format(n: number, f: string): string {
            let parts = f.split(':');
            return n.toFixed(parseInt(parts[1]));
        }
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const marg = props.plotMargin;
        //ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = 'black';
        ctx.strokeRect(
            marg + 0.5, marg + 0.5,
            width - 2*marg, height - 2*marg
        );
        ctx.font = props.titleFont; //'16px sans';
        ctx.textAlign = 'center';
        ctx.fillText(props.title, width/2, marg/2);
        let xmin = Infinity;
        let xmax = -Infinity;
        let ymin = Infinity;
        let ymax = -Infinity;
        for (let p of props.plots) {
            for (let x of p.xs) {
                if (x < xmin) {
                    xmin = x;
                }
                if (x > xmax) {
                    xmax = x;
                }
            }
            for (let y of p.ys) {
                if (y < ymin) {
                    ymin = y;
                }
                if (y > ymax) {
                    ymax = y;
                }
            }
        }
        if (xmin === xmax) {
            xmin = xmin - 1;
            xmax = xmax + 1;
        }
        if (ymin === ymax) {
            ymin = ymin - 1;
            ymax = ymax + 1;
        }
        let xrange = props.xrange;
        if (xrange === 'auto') {
            xrange = [xmin, xmax];
        }
        let yrange = props.yrange;
        if (yrange === 'auto') {
            yrange = [ymin, ymax];
        }

        // X marks
        ctx.save();
        ctx.font = '8px sans';
        ctx.textAlign = 'center';
        ctx.lineWidth = 0.1;
        ctx.setLineDash([10, 2]);
        let screenMarks = [...linspace(marg, width - marg, props.xmarks)];
        let plotMarks = [...linspace(xrange[0], xrange[1], props.xmarks)];
        for (let i = 0; i < props.xmarks; i++) {
            ctx.fillText(format(plotMarks[i], props.xmarkFormat), screenMarks[i], height - 0.8*marg);
            ctx.beginPath();
            ctx.moveTo(Math.floor(screenMarks[i])+0.5, height - marg);
            ctx.lineTo(Math.floor(screenMarks[i])+0.5, marg);
            ctx.stroke();
        }
        ctx.restore();

        // Y marks
        ctx.save();
        ctx.font = '8px sans';
        ctx.textAlign = 'right';
        ctx.lineWidth = 0.1;
        ctx.setLineDash([10, 2]);
        screenMarks = [...linspace(height - marg, marg, props.ymarks)];
        plotMarks = [...linspace(yrange[0], yrange[1], props.ymarks)];
        for (let i = 0; i < props.ymarks; i++) {
            ctx.fillText(format(plotMarks[i], props.ymarkFormat), marg-5, screenMarks[i]);
            ctx.beginPath();
            ctx.moveTo(width - marg, Math.floor(screenMarks[i])+0.5);
            ctx.lineTo(marg, Math.floor(screenMarks[i])+0.5);
            ctx.stroke();
        }
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(marg, marg);
        ctx.lineTo(width - marg, marg);
        ctx.lineTo(width - marg, height - marg);
        ctx.lineTo(marg, height - marg);
        ctx.clip();
        for (let p of props.plots) {
            ctx.save();
            ctx.save();
            ctx.translate(marg, marg);
            const scaleX = (width - 2*marg)  / (xrange[1] - xrange[0]);
            const scaleY = (height - 2*marg) / (yrange[0] - yrange[1]);
            ctx.scale(scaleX, scaleY);
            ctx.translate(-xrange[0], -yrange[1]);
            if (p.kind === 'line') {
                ctx.beginPath();
                ctx.moveTo(p.xs[0], p.ys[0]);
                for (let i = 1; i < p.xs.length; i++) {
                    ctx.lineTo(p.xs[i], p.ys[i]);
                }
                ctx.restore();
                ctx.lineWidth = props.lineWidth;
                ctx.strokeStyle = p.style;
                ctx.stroke();
            } else if (p.kind === 'scatter') {
                for (let i = 0; i < p.xs.length; i++) {
                    ctx.beginPath();
                    ctx.ellipse(p.xs[i], p.ys[i],
                        Math.abs(props.lineWidth / scaleX),
                        Math.abs(props.lineWidth / scaleY),
                        0, 0, 2*Math.PI
                    );
                    ctx.closePath();
                    ctx.fillStyle = p.style;
                    ctx.fill();
                }
                ctx.restore();
            }
            ctx.restore();
        }
        ctx.restore();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        const ctx = canvas.getContext('2d');
        const ro = new ResizeObserver(() => {
            canvas.width  = container.clientWidth;
            canvas.height = container.clientHeight;
            draw(ctx);
        });
        canvas.width  = container.clientWidth;
        canvas.height = container.clientHeight;
        ro.observe(container);
        draw(ctx);
        return () => { 
            ro.disconnect();
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        draw(ctx);
    });

    return (
        <div ref={containerRef} style={props.containerStyle}>
            <canvas ref={canvasRef} />
        </div>
    );
}
