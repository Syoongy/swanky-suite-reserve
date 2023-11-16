<template>
  <main class="flex h-full w-full items-center justify-center">
    <AuthCard
      :title="cardDetails.title"
      :description="cardDetails.description"
      :btnText="cardDetails.btnText"
    >
      <transition-slide appear mode="out-in">
        <LoginCard v-if="isLogin" />
        <SignupCard v-else />
      </transition-slide>
    </AuthCard>
  </main>
</template>

<script setup lang="ts">
import AuthCard from "@/components/AuthCard.vue";
import LoginCard from "@/components/LoginCardContent.vue";
import SignupCard from "@/components/SignupCardContent.vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { TransitionSlide } from "@morev/vue-transitions";

const { user } = storeToRefs(useAuthStore());
const route = useRoute();
const isLogin = computed(() => route.name === "login");
const cardDetails = computed(() => {
  if (route.name === "login") {
    return {
      title: "Swanky Suite Reserve",
      description: "Book away baby!",
      btnText: "Sign In"
    };
  } else {
    return {
      title: "Create Account",
      description: "And start your booking journey",
      btnText: "Create Account"
    };
  }
});
</script>

<style scoped></style>
