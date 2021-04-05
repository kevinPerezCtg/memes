import { createStore } from 'vuex'

export default createStore({
  state: {
    titleApp: "Memes",
    memes: [],
  },
  mutations: {   
    setMemes(state,payload){
      state.memes = payload;
    }, 
  },
  actions: {
    async getMemes({commit}, params){
      try {
        const response = await fetch("https://api.imgflip.com/get_memes");
        const result = await response.json();

        console.log(result.data.memes)
        console.log(params)
        if(!params?.total){
          commit("setMemes", result.data.memes);
        }else{
          const resultTemp = [];
          result.data.memes.forEach((meme, index) => {
            if(index < params.total) resultTemp.push(meme);
          });
          commit("setMemes", resultTemp);
        }                
      } catch (error) {
        console.log("error ",error);
      }
    }
  },
  modules: {
  },
  getters: {

  }
})
