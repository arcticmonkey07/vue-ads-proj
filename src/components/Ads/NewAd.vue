<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Create new ad</h1>
        <v-form class="mb-3" v-model="valid" ref="form" validation>
          <v-text-field
            name="title"
            label="Ad title"
            type="text"
            v-model="title"
            required
            :rules="[(v) => !!v || 'Title is required']"
          ></v-text-field>
          <v-textarea
            name="description"
            label="Ad description"
            type="text"
            v-model="description"
            :rules="[(v) => !!v || 'Description is required']"
          ></v-textarea>
        </v-form>
        <v-layout class="mb-3" row>
          <v-flex xs12>
            <v-btn
              color="warning"
              class="ma-2 white--text"
              @click="triggerUpload"
            >
              Upload
              <v-icon right dark>
                mdi-cloud-upload
              </v-icon>
            </v-btn>
            <input
              ref="fileInput"
              type="file"
              style="display: none;"
              accept="image/*"
              @change="onFileChange"
            />
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs12>
            <img :src="imageSrc" height="100" v-if="imageSrc" />
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs12>
            <v-switch label="Add to promo?" v-model="promo" color="primary">
            </v-switch>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn
              class="success"
              @click="createAd"
              :loading="loading"
              :disabled="!valid || !image || loading"
              >Create ad</v-btn
            >
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false,
      image: null,
      imageSrc: '',
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    createAd() {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          imageSrc: this.image
        };

        this.$store
          .dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list');
          })
          .catch(() => {});
      }
    },
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
      this.image = file;
    },
  },
};
</script>
