<template>
    <div id="app">
      <img alt="Vue logo" src="/frontend/public/assets/images/cinemaicon.png">
      <MyComponent/>
    </div>
  </template>
  
  <script>
  import MyComponent from './components/MyComponent.vue';

  
  export default {
    name: 'App',
    components: {
      MyComponent
    }
  }
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  
  #app img {
    width: 200px;
  }
  
  #app a {
    color: #42b983;
  }
  </style>
  