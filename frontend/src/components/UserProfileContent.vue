<template>
  <div class="tab-content position-relative" id="v-pills-tabContent">
    <standart-preloader v-if="preloader"></standart-preloader>
    <div :class="{ show: (active_tab === 1), active: (active_tab === 1) }" class="tab-pane fade p-3" id="v-pills-home"
      role="tabpanel" aria-labelledby="v-pills-home-tab">
      <form>
        <div class="form-row">
          <label for="inputCity">Имя</label>
          <input type="text" class="form-control mt-1 mb-2" id="inputName" v-model='GET_ADDITIONAL_USER_DATA.name'>

          <label for="inputCity">Статус</label>
          <input type="text" class="form-control mt-1 mb-2" id="inputName" v-model='GET_ADDITIONAL_USER_DATA.status'>

          <label for="inputState">Пол</label>
          <select id="inputState" class="form-control mt-1 mb-2" v-model="GET_ADDITIONAL_USER_DATA.sex">
            <option selected>Мужской</option>
            <option>Женский</option>
          </select>

          <label for="inputState">Опыт</label>
          <select id="inputState" class="form-control mt-1 mb-2" v-model="GET_ADDITIONAL_USER_DATA.experience">
            <option selected>JR</option>
            <option>ML</option>
            <option>SR</option>
          </select>

          <div class="form-group col-md-4">
            <label for="birth_date">Дата рождения</label>
            <br>
            <input type="date" id="birth_date" name="birth_date" v-model="GET_ADDITIONAL_USER_DATA.date_of_birth"
              min="1900-01-01" max="2023-12-31">

            <button type="button" class="btn btn-success my-3" @click="post_additional_user_data_to_api()">Изменить</button>
          </div>
        </div>

      </form>

      <transition name="fade">
        <div class="alert alert-success position-absolute mt-3" role="alert" v-if="alert_data">
          {{ alert_data }}
        </div>
      </transition>
    </div>

    <!-- <div :class="{ show: (active_tab === 2) ,active: (active_tab === 2)}" class="tab-pane fade p-4" role="tabpanel">2</div>
        <div :class="{ show: (active_tab === 3) ,active: (active_tab === 3)}" class="tab-pane fade p-4" role="tabpanel">3</div> -->
  </div>
</template>

<script>
import StandartPreloader from "@/assets/widgets/StandartPreloader";

import { mapActions, mapGetters } from "vuex";

export default {
  name: 'UserProfile',
  components: {
    StandartPreloader,
  },
  props: ['active_tab'],
  data() {
    return {
      alert_data: '',
      preloader: false,
    }
  },
  computed: {
    ...mapGetters(['GET_ADDITIONAL_USER_DATA']),
  },
  methods: {
    ...mapActions(['GET_ADDITIONAL_USER_DATA_FROM_API', 'POST_ADDITIONAL_USER_DATA_TO_API']),

    enable_preloader() {
      this.preloader = true;
    },

    disable_preloader() {
      this.preloader = false;
    },


    get_additional_user_data_from_api() {
      this.enable_preloader()
      try {
        this.GET_ADDITIONAL_USER_DATA_FROM_API(); //to store
      }
      catch (error) {
        this.show_alert(error.message)
      }
      this.disable_preloader()
    },

    post_additional_user_data_to_api() {
      this.enable_preloader()
      try {
        this.POST_ADDITIONAL_USER_DATA_TO_API(this.GET_ADDITIONAL_USER_DATA);
        this.disable_preloader()
        this.show_alert('Изменения успешно сохранены!')
      }
      catch (error) {
        this.show_alert(error.message)
      }
    },


    show_alert(message) {
      this.alert_data = message;
      setTimeout(() => {
        this.alert_data = '';
      }, 2000)
    },

  },
  mounted() {
    this.get_additional_user_data_from_api()
  }

}
</script>

<style scoped>
.btn {
  right: 30px;
  bottom: 0;
  border: var(--bs-btn-border-width) solid #64B687;
  border-radius: var(--bs-btn-border-radius);
  background-color: #64B687;
  position: absolute;
  z-index: 1;
}

.btn:first-child:hover,
:not(.btn-check)+.btn:hover {
  color: var(--bs-btn-hover-color);
  background-color: #4F775C;
  border-color: #4F775C;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active до версии 2.1.8 */
  {
  opacity: 0;
}
</style>