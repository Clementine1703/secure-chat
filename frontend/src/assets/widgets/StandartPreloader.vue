<template>
  <div class="wrapper">
    <div class="preloader-3">
      <svg viewBox="-2000 -1000 4000 2000">
        <path id="inf" d="M354-354A500 500 0 1 1 354 354L-354-354A500 500 0 1 0-354 354z"></path>
        <use xlink:href="#inf" stroke-dasharray="1570 5143" stroke-dashoffset="6713px"></use>
      </svg>
    </div>
  </div>
</template>



<script>
export default {
  name: 'StandartPreloader',
}

</script>


<style scoped>

.wrapper{
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(29, 30, 31, 0.5);
  overflow: hidden;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.preloader-3 svg {
  margin-top: -30px;
  scale: 0.3;
  width: 25em;
  border-radius: 3px;
  fill: none;
  stroke: white;
  stroke-linecap: round;
  stroke-width: 12%;
}
.preloader-3 use {
  stroke: #64B687;
  animation: preloader-3-a 2s linear infinite
}
@keyframes preloader-3-a {
  to {
    stroke-dashoffset: 0px
  }
}


</style>