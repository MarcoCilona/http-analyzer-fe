<template lang="pug">
canvas(id='myCanvas' height='350')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Speedometer extends Vue {
  c?: any;
  ctx: any = null;
  degreeSaved: number = 0;
  degreeValue: number = 1000 / 253;
  endingAngle = 0.2 * Math.PI;
  rangeMap: any = [];
  startingAngle = 0.8 * Math.PI;
  positionX: number = 0;

  mounted() {
    this.c = document.getElementById('myCanvas');
    this.c.style.width = `${window.innerWidth}px`;
    this.positionX = window.innerWidth / 3;
    this.ctx = this.c!.getContext('2d');

    this.drawLowValueArc();
    this.drawMediumValueArc();
    this.drawGoodValueArc();
    this.drawOptimumValueArc();
  }

  drawGoodValueArc() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = 'rgb(72, 207, 139)';
    this.ctx.arc(this.positionX, 200, 80, 1.81 * Math.PI, 0.04 * Math.PI);
    this.ctx.stroke();
  }

  drawLowValueArc() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = 'red';
    this.ctx.arc(this.positionX, 200, 80, this.startingAngle, 1.5 * Math.PI);
    this.ctx.stroke();
  }

  drawMediumValueArc() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = 'orange';
    this.ctx.arc(this.positionX, 200, 80, 1.51 * Math.PI, 1.80 * Math.PI);
    this.ctx.stroke();
  }

  drawOptimumValueArc() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = 'rgb(0, 153, 51)';
    this.ctx.arc(this.positionX, 200, 80, 0.05 * Math.PI, this.endingAngle);
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
      const y = 200 + 80 * -Math.sin(radians);
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
      const y = 200 + 80 * -Math.sin(radians);

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
    this.rangeMap.filter((val: any) => {
      if (val.percentage === 45) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = 'black';
        this.ctx.arc(val.x, val.y, 10, 0, 2 * Math.PI);
        this.ctx.stroke();
        return true;
      }
      return false;
    });
  }
}
</script>
