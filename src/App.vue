<script setup lang="ts">
import { RouterView } from "vue-router";
import Toaster from "@/components/ui/toast/Toaster.vue";
import NavigationMenu from "@/components/NavigationMenu.vue";
import { usePreferredDark } from "@vueuse/core";
import { TransitionFade } from "@morev/vue-transitions";

const isDark = usePreferredDark();
</script>

<template>
  <div
    class="relative flex h-screen flex-col items-center justify-center gap-2 bg-background p-2 text-foreground"
    :class="{ dark: isDark }"
  >
    <div class="flex items-center justify-center" v-if="$route.name !== 'login'">
      <NavigationMenu class="flex-initial" />
    </div>
    <main class="container flex h-5/6 flex-grow gap-8 overflow-auto p-4">
      <RouterView v-slot="{ Component }">
        <transition-fade mode="out-in">
          <component :is="Component" />
        </transition-fade>
      </RouterView>
    </main>
  </div>
  <div class="absolute" :class="{ dark: isDark }">
    <Toaster />
  </div>
</template>

<style scoped></style>
