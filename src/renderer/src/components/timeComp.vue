<template>
  <div class="timecomp">
    <!-- {{ date.ldate }} -->
    <div class="time">{{ date.sdate.y }}-{{ date.sdate.m }}-{{ date.sdate.d }} {{ date.time.h }}:{{ date.time.m }}:{{ date.time.s }}</div>
  </div>
</template>

<script>
export default {
  name: 'TimeComp',
  data() {
    return {
      date: {
        ldate: null,
        time: {
          h: null,
          m: null,
          s: null
        },
        sdate: {
          y: null,
          m: null,
          d: null
        }
      },
      weekday: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    }
  },
  mounted() {
    this.time = setInterval(() => {
      var ldate = new Date()
      this.date.ldate = ldate

      this.date.time.h = ldate.getHours()
      this.date.time.m = ldate.getMinutes()
      this.date.time.s = ldate.getSeconds()

      this.date.sdate.y = ldate.getFullYear()
      this.date.sdate.m = ldate.getMonth()
      this.date.sdate.d = ldate.getDate()
    })
  }
}
</script>

<style>
</style>