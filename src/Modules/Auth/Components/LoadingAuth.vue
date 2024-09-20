<template>
    <div v-if="show" id="component_preloaders" class="component_preloader">
        <img class="w-56 component_preloader__logo" src="/assets/img/hoster/th_logo.png" alt="logo">
        <!-- <div class="component_preloader__loader">
            <div class="component_spinner"></div>
            
        </div> -->
        <div class="loader">Cargando...</div>
        <span class="absolute text-4xl mt-52 font-normal" style="color: #0B6357;">Cargando...</span>
    </div>
</template>
<script setup>
defineProps({
  show: Boolean,
})
</script>
<style scoped>
.loader {
  font-size: 10px;
  margin: 50px auto;
  text-indent: -9999em;
  width: 118px;
  height: 118px;
  border-radius: 50%;
  background: #ffffff;
  background: -moz-linear-gradient(left, #0B6357 52%, rgba(255, 255, 255, 0) 88%);
  background: -webkit-linear-gradient(left, #0B6357 52%, rgba(255, 255, 255, 0) 88%);
  background: -o-linear-gradient(left, #0B6357 52%, rgba(255, 255, 255, 0) 88%);
  background: -ms-linear-gradient(left, #0B6357 52%, rgba(255, 255, 255, 0) 88%);
  background: linear-gradient(to right, #0B6357 52%, rgba(255, 255, 255, 0) 88%);
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.loader:before {
  width: 50%;
  height: 50%;
  background: #0B6357;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
}
.loader:after {
  background: #fff;
  width: 81%;
  height: 81%;
  border-radius: 50%;
  content: '';
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
    .component_preloader {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .component_preloader__logo{
        position: fixed;
        top: 4rem;
        margin: auto;
    }
    .component_preloader__loader{
        position: fixed;
        text-align: center;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .component_spinner{
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        box-shadow: 1px 5px 2px #0B6357;
        animation: component_spinner 2s linear infinite;
    }
    /* .component_spinner{
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        box-shadow: 0px 0px 1px 7px #fff;
        animation: component_spinner 2s linear infinite;
    } */
    @keyframes component_spinner {
        0%{
            transform: rotate(0deg);
        }
        50%{
            transform: rotate(180deg);
        }
        100%{
            transform: rotate(360deg);
            
        }
    }
    .component_preloader__loader > span{
        display: block;
        font-weight: 200;
        font-size: 40px;
        color: #fff;
        margin-top: 2rem;
        font-family: 'Montserrat', sans-serif;
        text-align: center;
    }
    @media (max-width: 1200px){
        .component_preloader__logo{
            width: 31%;
        }
        .component_spinner{
            width: 3.7rem;
            height: 3.7rem;
        }
    }
    @media (max-width: 767px){
        .component_preloader__logo{
            width: 60%;
        }
        .component_spinner{
            width: 3.3rem;
            height: 3.3rem;
        }
        .component_preloaders > span{
            font-size: 1.3rem;
        }
    }
</style>