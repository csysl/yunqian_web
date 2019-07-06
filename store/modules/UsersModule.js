import axios from 'axios';
import iView from 'iview';
export default {
  namespaced: true,
  state:{
    currentUser:{
      get UserName(){
        return localStorage.getItem("currentUser_name");
      },
      get UserToken(){
        return localStorage.getItem("currentUser_token");
      },
      get RefreshToken(){
        return localStorage.getItem("currentUser_refresh_token");
      }
    }
  },
  mutations:{
    setUser(state,{user_name,user_token,refresh_token}){
      // 在这里把用户名和token保存起来
      localStorage.setItem("currentUser_name",user_name);
      // localStorage.setItem("currentUser_token",user_token);
      // localStorage.setItem("currentUser_refresh_token",refresh_token);
    },
    clearUser(state){
      localStorage.clear();
    }
  },
  actions:{
    userLogin(context,{user_name,user_password,router}){
      // localStorage.setItem("currentUser_name",user_name);
      axios({
        method: 'get',
        url: '/lesson/passport/vueLogin',
        params: {
          "userName": user_name,
          "passWord": user_password,
          // "grant_type": "password",
          // "scope": "all"
        },
        auth: {
          username: 'client',
          password: 'secret'
        }
      }).then(function(response){
        var data = response.data;
        if (data.success) {
          router.push({path: 'base/user'})
        } else {
          alert(data["message"])
        }
        data=data["data"]["account"]
        // console.log(data)
        localStorage.setItem("user_data",JSON.stringify(data));
        // data=JSON.parse(localStorage.getItem("user_data"))
        // console.log(data)

      }).catch(function(error){

      });
    },
    loginOUt(context,{router}){
      localStorage.clear()
      router.push({ path: '/login' }) ;
      context.commit('clearUser');
    }
  }
}
