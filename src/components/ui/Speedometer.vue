<template lang="pug">
div(ref='canvasWrapper' style='position: relative')
  span.fs-14(ref='bad', style='position: relative') 600
  span.fs-14(ref='medium', style='position: relative') 700
  span.fs-14(ref='good', style='position: relative') 800
  canvas(ref='myCanvas' height='200')
  .direction-column.value.std_black--text.fill-width.align-center.fill-height.fw-600
    .fs-30.text-align-center.mt-n10 {{ value }}
    .fs-25.text-align-center {{ valueText }}
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch
} from 'vue-property-decorator';

@Component
export default class Speedometer extends Vue {
  @Prop() value!: number;

  c?: any;
  ctx: any = null;
  degreeSaved: number = 0;
  degreeValue: number = 1000 / 253;
  endingAngle = 0.2 * Math.PI;
  graphRadius: number = 80;
  rangeMap: any[] = [];
  startingAngle = 0.8 * Math.PI;
  positionX: number = 0;
  positionY: number = 0;

  rangeColors: any[] = [
    {
      color: 'red',
      value: 600
    },
    {
      color: 'orange',
      value: 700
    },
    {
      color: 'rgb(72, 207, 139)',
      value: 800
    },
    {
      color: 'rgb(0, 153, 51)',
      value: 1000
    },
  ];

  get valueText() {
    if (this.value < 600) {
      return 'Bad!';
    }

    if (this.value < 700) {
      return 'Not bad!';
    }

    if (this.value < 800) {
      return 'Great!';
    }

    return 'Awesome!';
  }

  mounted() {
    this.c = this.$refs.myCanvas;
    const width = `${(this.$refs.canvasWrapper as HTMLElement).getBoundingClientRect().width}`;
    (this.c as HTMLElement).setAttribute('width', width);
    this.positionX = (+width / 2);
    this.positionY = ((this.c as HTMLElement).getBoundingClientRect().height / 2);
    this.ctx = this.c!.getContext('2d');

    this.drawLowValueArc();
    this.drawMediumValueArc();
    this.drawGoodValueArc();
    this.drawOptimumValueArc();
    this.generateFirstRangeValuesCoordinates();
    this.generateSecondRangeValuesCoordinates();
    this.drawCircle();
    this.drawLabels();
  }

  drawGoodValueArc() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = 'rgb(72, 207, 139)';
    this.ctx.arc(this.positionX, this.positionY, this.graphRadius, 1.81 * Math.PI, 0.04 * Math.PI);
    this.ctx.stroke();
  }

  drawLowValueArc() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = 'red';
    this.ctx.arc(this.positionX, this.positionY, this.graphRadius, this.startingAngle, 1.5 * Math.PI);
    this.ctx.stroke();
  }

  drawLabels() {
    // Low range values
    (this.$refs.bad as HTMLElement).style!.top = `${this.rangeMap.find((el: any) => el.percentage === (600 * 100) / 1000).y - 20}px`;
    (this.$refs.bad as HTMLElement).style!.left = `${this.rangeMap.find((el: any) => el.percentage === (600 * 100) / 1000).x - 40}px`;

    // Medium range values
    (this.$refs.medium as HTMLElement).style!.top = `${this.rangeMap.find((el: any) => el.percentage === (700 * 100) / 1000).y + 10}px`;
    (this.$refs.medium as HTMLElement).style!.left = `${this.rangeMap.find((el: any) => el.percentage === (700 * 100) / 1000).x}px`;

    // Good range values
    (this.$refs.good as HTMLElement).style!.top = `${this.rangeMap.find((el: any) => el.percentage === (800 * 100) / 1000).y + 40}px`;
    (this.$refs.good as HTMLElement).style!.left = `${this.rangeMap.find((el: any) => el.percentage === (800 * 100) / 1000).x - 30}px`;
  }

  drawMediumValueArc() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = 'orange';
    this.ctx.arc(this.positionX, this.positionY, this.graphRadius, 1.51 * Math.PI, 1.80 * Math.PI);
    this.ctx.stroke();
  }

  drawOptimumValueArc() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = 'rgb(0, 153, 51)';
    this.ctx.arc(this.positionX, this.positionY, this.graphRadius, 0.05 * Math.PI, this.endingAngle);
    this.ctx.stroke();
  }

  piToDegrees = (value: number) => {
    const valNeg: number = value * -1;
    return Math.floor((valNeg * 180) / Math.PI);
  };

  generateFirstRangeValuesCoordinates() {
    let degree = this.piToDegrees(this.startingAngle);
    while (degree > this.piToDegrees(2 * Math.PI)) {
      degree -= 1;
      const radians = degree * Math.PI / 180;
      const x = this.positionX + 80 * Math.cos(radians);
      const y = this.positionY + 80 * -Math.sin(radians);
      const value: number = this.degreeSaved * this.degreeValue;
      const percentage: number = Math.floor((value * 100) / 1000);
      this.degreeSaved += 1;
      this.rangeMap.push({
        percentage,
        x,
        y
      });
    }
  }

  generateSecondRangeValuesCoordinates() {
    let degree2 = this.piToDegrees(0);
    while (degree2 >= this.piToDegrees(this.endingAngle)) {
      degree2 -= 1;

      const radians = degree2 * Math.PI / 180;
      const x = this.positionX + 80 * Math.cos(radians);
      const y = this.positionY + 80 * -Math.sin(radians);

      const value: number = this.degreeSaved * this.degreeValue;
      const percentage: number = Math.floor((value * 100) / 1000);
      this.degreeSaved += 1;
      this.rangeMap.push({
        percentage,
        x,
        y
      });
    }
  }

  drawCircle() {
    let circleColor: string = '#000000';
    this.rangeColors.reverse().forEach((rangeColor: any) => {
      if (this.value <= rangeColor.value) circleColor = rangeColor.color;
    });

    const value: number = (this.value * 100) / 1000;
    const valuedFound = this.rangeMap.reduce((prev: any, current: any) => (Math.abs(current.percentage - value) < Math.abs(prev.percentage - value) ? current : prev));
    this.ctx.beginPath();
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = circleColor;
    this.ctx.fillStyle = '#ffffff';
    this.ctx.arc(valuedFound.x, valuedFound.y, 7, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
  }

  @Watch('value')
  updateCirclePosition() {
    this.drawCircle();
  }
}
</script>


<style lang="scss" scoped>
.value {
  position: absolute;
  top: 20px;
}
</style>
