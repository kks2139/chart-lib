window.onload = ()=>{
    const canvas = document.querySelector('#canvas');
    const yLabel = [0,10,20,30,40,50,60,70,80,90,100];
    const xLabel = ['국어','영어','수학','과학','미술','체육'];
    const datas = [55,60,90,95,80,88];

    new MyChart({
        canvas,
        yLabel,
        xLabel,
        datas
    });
}

const PADDING_X = 80;
const PADDING_Y = 80;

class MyChart{
    constructor({canvas, yLabel, xLabel, datas}){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.clientWidth = canvas.clientWidth;
        this.clientHeight = canvas.clientHeight;
        this.yLabel = yLabel;
        this.xLabel = xLabel;
        this.datas = datas;
        // 계산된 x, y축 라벨 좌표
        this.yLabelPos = {};
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

        this.yLabelPos.baseLine = PADDING_Y + yLength;

        // y축 라벨링
        ctx.font = '20px bold';
        ctx.textAlign = 'right';
        this.yLabel.forEach((d, i, arr) =>{
            const interval = Math.floor(yLength / arr.length - 3) * i;
            const yPos = yLength - interval;
            ctx.fillText(d, PADDING_X - 10, yPos);
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

    setData = ()=>{
        const {ctx, datas, xLabelPos, yLabelPos} = this;

        ctx.fillStyle = 'yellow';
        datas.forEach((d, i) =>{
            ctx.beginPath();
            ctx.arc(xLabelPos[i], 300, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        });
    }

    drwaChart = ()=>{
        this.setAxis();
        this.setData();
    }
}