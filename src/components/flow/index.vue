<template>
    <div class="guide-wrap flow-bg">
      <div class="container">
        <div class="guide-header">
          流程图
          <div class="guide-agile">
            <div class="limit-desc">Comperehensive platform</div>
            Cultural industry
            </div>
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
    padding-top: 31px;
  }
  .guide-wrap {
    .container {
      margin: 0 60px;
      .guide-header {
            display: flex;
            align-items: center;
          }
       .guide-flow-show {
        background-image: url("../../images/flow.png");
        height: 600px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
       }
    }
  }
  </style>
  