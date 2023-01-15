<template>
      <div class="tab-content position-relative" id="v-pills-tabContent">
        <standart-preloader v-if="preloader"></standart-preloader>
        <div :class="{ show: (active_tab === 1) ,active: (active_tab === 1)}" class="tab-pane fade p-3" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
          <form>
            <div class="form-row">
              <label for="inputCity">Имя</label>
              <input type="text" class="form-control mt-1 mb-2" id="inputName" v-model='profile_data.name'>

              <label for="inputCity">Статус</label>
              <input type="text" class="form-control mt-1 mb-2" id="inputName" v-model='profile_data.user_status'>

              <label for="inputState">Пол</label>
              <select id="inputState" class="form-control mt-1 mb-2" v-model="profile_data.sex">
                <option selected>Мужской</option>
                <option>Женский</option>
              </select>

              <label for="inputState">Опыт</label>
              <select id="inputState" class="form-control mt-1 mb-2" v-model="profile_data.experience">
                <option selected>JR</option>
                <option>ML</option>
                <option>SR</option>
              </select>

              <div class="form-group col-md-4">
                <label for="birth_date">Дата рождения</label>
                <br>
                <input type="date" id="birth_date" name="birth_date"
                       v-model="profile_data.date_of_birth"
                       min="1900-01-01" max="2023-12-31">

                <button type="button" class="btn btn-success my-3" @click="post_user_data()">Изменить</button>
              </div>
            </div>

          </form>

          <transition name="fade">
            <div class="alert alert-success position-absolute mt-3" role="alert" v-if="alert_data">
              {{ alert_data }}
            </div>
          </transition>
        </div>

        <div :class="{ show: (active_tab === 2) ,active: (active_tab === 2)}" class="tab-pane fade p-4" role="tabpanel">2</div>
        <div :class="{ show: (active_tab === 3) ,active: (active_tab === 3)}" class="tab-pane fade p-4" role="tabpanel">3</div>
      </div>

</template>

<script>
import StandartPreloader from "@/assets/widgets/StandartPreloader";
import axios from "axios";

export default {
  name: 'UserProfile',
  components: {
    StandartPreloader,
  },
  props: ['active_tab'],
  data(){
    return{
      profile_data: {
        email: 'ddrhdrh',
        password: 0,
        name: '',
        user_status: '',
        sex: '',
        experience: '',
        date_of_birth:  '2000-01-01',
      },
      axios_response: '',
      alert_data: '',
      preloader: false,
    }
  },
  methods:{

    get_user_data(){
      this.preloader = true;
      axios(
          {
            method: 'get',
            url: `${this.$store.state.protocol}${this.$store.state.base_url}/api/`,
            mode: 'cors',
            headers: {
              Authorization: `Token ${this.$store.state.auth_token}`,
            }
          }
      )
          .then((response) => {
            let data = response.data.user_data[0]
            this.axios_response = data
            this.profile_data.email = '';
            this.profile_data.password = '';
            this.profile_data.name = data.name;
            this.profile_data.user_status = data.user_status;
            this.profile_data.sex = data.sex;
            this.profile_data.experience = data.experience;
            this.profile_data.date_of_birth =  data.date_of_birth;
            this.preloader = false;

          })
          .catch((error) => {
            this.axios_response = error.response.data;
          })
    },
    post_user_data(){
      this.preloader = true;
      axios(
          {
            method: 'post',
            url: `${this.$store.state.protocol}${this.$store.state.base_url}/api/`,
            mode: 'cors',
            headers: {
              Authorization: `Token ${this.$store.state.auth_token}`,
            },
            data: {
              name: this.profile_data.name,
              user_status: this.profile_data.user_status,
              sex: this.profile_data.sex,
              experience: this.profile_data.experience,
              date_of_birth: this.profile_data.date_of_birth,
            }
          }
      )
          .then((response) => {
            let data = response.data.user_data
            this.axios_response = data
            this.preloader = false;
            this.show_alert('Изменения сохранены');

          })
          .catch((error) => {
            this.axios_response = error.response.data;
          })
    },
    show_alert(message){
      this.alert_data = message;
      setTimeout(()=>{
        this.alert_data = '';
      }, 2000)
    },

  },
  mounted() {
    this.get_user_data()
  }

}
</script>

<style scoped>


.btn{
  right: 30px;
  bottom: 0;
  border: var(--bs-btn-border-width) solid #64B687;
  border-radius: var(--bs-btn-border-radius);
  background-color: #64B687;
  position: absolute;
  z-index: 1;
}

.btn:first-child:hover, :not(.btn-check)+.btn:hover {
  color: var(--bs-btn-hover-color);
  background-color: #4F775C;
  border-color: #4F775C;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

</style>