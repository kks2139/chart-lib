window.onload = ()=>{
    const canvas = document.querySelector('#canvas');
    const yLabel = [0,10,20,30,40,50,60,70,80,90,100];
    const xLabel = ['국어','영어','수학','과학','미술','체육'];
    const datas = [55,60,90,95,80,88];
    const rectWidth = 30;

    new MyChart({
        chart: 'line',
        canvas,
        yLabel,
        xLabel,
        datas,
        rectWidth
    });
}

const PADDING_X = 80;
const PADDING_Y = 80;

class MyChart{
    constructor({chart, canvas, yLabel, xLabel, datas, rectWidth=20}){
        this.chart = chart;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.clientWidth = canvas.clientWidth;
        this.clientHeight = canvas.clientHeight;
        this.yLabel = yLabel;
        this.xLabel = xLabel;
        this.datas = datas;
        this.rectWidth = rectWidth;
        // 계산된 x, y축 라벨 좌표
        this.yLabelPos = {
            baseLine: 0,
            interval: 0
        };
        this.xLabelPos = [];
        
        this.drwaChart();
    }

    setAxis = ()=>{
        const {ctx} = this;

        // x, y축 그리기
        const xLength = this.clientWidth - PADDING_X;
        const yLength = this.clientHeight - PADDING_Y;
        ctx.moveTo(PADDING_X, PADDING_Y);
        ctx.lineTo(PADDING_X, yLength);
        ctx.moveTo(PADDING_X, yLength);
        ctx.lineTo(xLength, yLength);
        ctx.stroke();

        this.yLabelPos.baseLine = yLength;

        // y축 라벨링
        ctx.font = '20px bold';
        ctx.textAlign = 'right';
        this.yLabel.forEach((d, i, arr) =>{
            const interval = Math.floor(yLength / arr.length - 3) * i;
            const yPos = yLength - interval;
            ctx.fillText(d, PADDING_X - 10, yPos);
            if(i === 1) this.yLabelPos.interval = interval;
        });

        // x축 라벨링
        ctx.textAlign = 'center';
        this.xLabel.forEach((d, i, arr) =>{
            const startX = 50;
            const interval = Math.floor(xLength / arr.length - Math.floor(startX / 6)) * i;
            const xPos = startX + PADDING_X + interval;
            ctx.fillText(d, xPos, yLength + 25);
            this.xLabelPos.push(xPos);
        });
    }

    
    setColumnChart = ()=>{
        const {ctx, datas, xLabelPos, yLabelPos} = this;
        const {baseLine, interval} = yLabelPos;
        
        ctx.fillStyle = 'yellow';
        datas.forEach((d, i) =>{
            const value = baseLine - (d * interval / 10);
    
            ctx.beginPath();
            ctx.rect(xLabelPos[i] - (this.rectWidth / 2), value, this.rectWidth, baseLine - value);
            ctx.fill();
            ctx.stroke();
        });
    }

    setLineChart = ()=>{
        const {ctx, datas, xLabelPos, yLabelPos} = this;
        const {baseLine, interval} = yLabelPos;
        
        ctx.fillStyle = 'yellow';
        datas.forEach((d, i, arr) =>{
            const preValue = baseLine - (arr[i-1] * interval / 10);
            const value = baseLine - (d * interval / 10);
    
            ctx.beginPath();
            ctx.arc(xLabelPos[i], value, 8, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();

            if(i > 0){
                ctx.beginPath();
                ctx.moveTo(xLabelPos[i-1], preValue);
                ctx.lineTo(xLabelPos[i], value);
                ctx.stroke();
            }
        });
    }

    setPieChart = ()=>{

    }

    setData = ()=>{
        const {chart} = this;
        switch(chart){
            case 'column': 
                this.setColumnChart();
                break;
            case 'line': 
                this.setLineChart();
                break;
            case 'pie': 
                this.setPieChart();
                break;
            default:
                console.error(`'${chart}' is not defined chart`);
                break;
        }
    }

    drwaChart = ()=>{
        this.setAxis();
        this.setData();
    }
}