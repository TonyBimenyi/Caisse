<template>
<div class=" d-inline-flex pull-left mt-3">
 <div class="input-group">
    <input type="text" class="form-control" @keydown="e=>searchValue(e)" placeholder="Rechercher">
    <div class="input-group-append">
      <button class="btn btn-secondary" type="button">
        <i class="fa fa-search"></i>
      </button>
    </div>
  </div>
</div>
  
</template>

<script>
export default {
  data() {
    return{
      
    }
  },
  methods: {
    searchValue(e){
      this.$store.state.keyword = e.target.value;
    }

  }


}
</script>

<style scoped>
.main {
    width: 50%;
    margin: 50px auto;
}
.has-search .form-control {
    padding-left: 2.375rem;
}
input{
  height:35px;
  width:250px;
  border:3px solid var(--cyan);
  outline: none;
}
input:hover{
    box-shadow: inset 0px 0px 6px 2px var(--info);
    transition: .4s;
}
input:focus{
    box-shadow: inset 0px 0px 6px 2px var(--info);
}
button{
  height:43px;
  width:43px;
  background-color: var(--cyan);
  color:white;
  border:none;
  border-radius: 0px;
}
button:hover{
  cursor: pointer;
}
.input-group{
      display: flex;
      margin-left:50px; 
      margin-top:20px;
      height:20px;
      border-radius:7px;
      margin-top: 60px;
}

.has-search .form-control-feedback {
    position: relative;
    z-index: 2;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: #aaa;
}
@media screen and (max-width: 1100px){
  input{
  height:30px;
  width:150px;
  border:3px solid var(--cyan);transition: .5s;
}
button{
  height:38px;
  width:43px;transition: .5s;
}
}

</style>