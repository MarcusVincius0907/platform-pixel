<template>
  <div class="w-full h-full">
    <div class=" max-w-[780px] bg-gray-200 w-full m-auto d-flex flex-wrap">

      <div class="d-flex max-w-[300px] flex-wrap">
        <input type="color" v-for="(s,i) in q1" :key="i" class="square" value="#e0e0e0" >
      </div>
      <div class="d-flex max-w-[200px] flex-wrap">
        <input type="color" v-for="(s,i) in q2" :key="i" class="square" value="#e0e0e0" >
      </div>
      <div class="d-flex max-w-[280px] flex-wrap">
        <input type="color" v-for="(s,i) in q3" :key="i" class="square" value="#e0e0e0" >
      </div>
      <div class="d-flex max-w-[300px] flex-wrap">
        <input type="color" v-for="(s,i) in q4" :key="i" class="square" value="#e0e0e0" >
      </div>
      <div class="w-full  max-w-[200px] h-[200px] ">
        <div class="w-full h-full d-flex p-5 image-pixel">

          <img src="../../../../public/img/logo.png" alt="">
        </div>
      </div>
      <div class="d-flex max-w-[280px] flex-wrap">
        <input type="color" v-for="(s,i) in q5" :key="i" class="square" value="#e0e0e0" >
      </div>
      <div class="d-flex max-w-[300px] flex-wrap">
        <input type="color" v-for="(s,i) in q6" :key="i" class="square" value="#e0e0e0" >
      </div>
      <div class="d-flex max-w-[200px] flex-wrap">
        <input type="color" v-for="(s,i) in q7" :key="i" class="square" value="#e0e0e0" >
      </div>
      <div class="d-flex max-w-[280px] flex-wrap">
        <input type="color" v-for="(s,i) in q8" :key="i" class="square" value="#e0e0e0" >
      </div>
      
    </div>
    <!-- <input type="color" list="presets"></label>
<datalist id="presets">
  <option value="#cccccc">Grey</option>
  <option value="#ffffff">White</option>
  <option value="#6699cc">Blue</option>
</datalist> -->
  </div>
</template>

<script>
import {ref} from  'vue'

export default {
  name: 'pixel-compra',
  components: {
   
  },
  methods: {
    
  },
  setup(){
    const q1 = []
    const q2 = []
    const q3 = []
    const q4 = []
    const q5 = []
    const q6 = []
    const q7 = []
    const q8 = []

    for(let i=0; i < 150; i++){
      const color = (i+1) % 2==0? 'gray' : 'white'
      q1.push({id:i, color})
      q4.push({id:i, color})
      q6.push({id:i, color})
    }

    for(let i=0; i < 140; i++){
      const color = (i+1) % 2==0? 'gray' : 'white'
      q3.push({id:i, color})
      q5.push({id:i, color})
      q8.push({id:i, color})
    }

    for(let i=0; i < 100; i++){
      const color = (i+1) % 2==0? 'gray' : 'white'
      q2.push({id:i, color})
      q7.push({id:i, color})
    }

    console.log(q1);

    return{
      q1: q1,
      q2: q2,
      q3: q3,
      q4: q4,
      q5: q5,
      q6: q6,
      q7: q7,
      q8: q8,



    }
  }
}
</script>

<style lang="scss">
.square{
  width: 20px;
  height: 20px;
  background: gray;
  border: 1px solid green;
  cursor:pointer;
  &:hover{
    opacity: 80%;
    background-color: red;
  }
}
.image-pixel{
  border: 8px solid #01a78d;
  
}

input[type="color"] {
	-webkit-appearance: none;
	border: none;
  border: 1px solid white;
}
input[type="color"]::-webkit-color-swatch-wrapper {
	padding: 0;
}
input[type="color"]::-webkit-color-swatch {
	border: none;
}
</style>
