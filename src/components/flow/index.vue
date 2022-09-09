<template>
    <div class="guide-wrap flow-bg">
      <div class="container">
        <div class="guide-header">
          <img class="guide-header-logo" src="../../images/guide-logo.png" />
          流程图
          <p class="guide-agile">Cultural industry</p>
        </div>
        <div class="guide-flow-show">
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Advantage",
    data() {
      return {
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .flow-bg {
    background: #fff;
  }
  .guide-wrap {
    .container {
      margin: 0 60px;
      .guide-header {
            display: flex;
            align-items: center;
          }
       .guide-flow-show {
        background-image: url("../../images/flow.jpg");
        height: 600px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
       }
    }
  }
  </style>
  