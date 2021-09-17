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
        this.clientWidth = canvas.clientWidth;
        this.clientHeight = canvas.clientHeight;
        this.yLabel = yLabel;
        this.xLabel = xLabel;
        this.datas = datas;
        this.ctx = canvas.getContext('2d');
        
        this.drwaChart();
    }

    setAxis = ()=>{
        // x, y축 그리기
        const xLength = this.clientWidth - PADDING_X;
        const yLength = this.clientHeight - PADDING_Y;
        this.ctx.moveTo(PADDING_X, PADDING_Y);
        this.ctx.lineTo(PADDING_X, yLength);
        this.ctx.moveTo(PADDING_X, yLength);
        this.ctx.lineTo(xLength, yLength);
        this.ctx.stroke();

        // x, y축 라벨링
        this.ctx.font = '20px bold';
        this.ctx.textAlign = 'right';
        this.yLabel.forEach((d, i, arr) =>{
            const interval = Math.floor(yLength / arr.length - 3) * i;
            this.ctx.fillText(d, PADDING_X - 10, yLength - interval + 10);
        });
        this.ctx.textAlign = 'center';
        this.xLabel.forEach((d, i, arr) =>{
            const startX = 50;
            const interval = Math.floor(xLength / arr.length - Math.floor(startX / 6)) * i;
            this.ctx.fillText(d, startX + PADDING_X + interval, yLength + 25);
        });
    }

    setData = ()=>{

    }

    drwaChart = ()=>{
        this.setAxis();
    }
}