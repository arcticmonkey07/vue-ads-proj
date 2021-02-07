<template>
  <v-container>
    <v-layout class="mt-5" row>
      <v-flex :class="`elevation-${hover ? 24 : 6}`" xs12 sm6 offset-sm3>
        <h1 class="text--secondary ml-3">Orders</h1>
        <v-list>
          <v-list-item 
            v-for="order in orders" 
            :key="order.id"
          >
            <v-list-item-action>
              <v-checkbox
                :input-value="order.done"
                @change="markDone(order)"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ order.name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ order.phone }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn class="primary" :to="'/ad/' + order.adId">Open</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      orders: [
        {
          id: 'fds3',
          name: 'Peter',
          phone: '8-910-233-45-65',
          adId: '123',
          done: false,
        },
        {
          id: 'fds4',
          name: 'Vasya',
          phone: '8-930-243-45-65',
          adId: '234',
          done: false,
        },
      ],
    };
  },
  methods: {
    markDone(order) {
      order.done = true;
    },
  },
};
</script>

<style scoped>
.text--secondary {
}
</style>
