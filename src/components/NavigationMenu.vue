<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { useAuthStore } from "@/stores/auth";

const { logout } = useAuthStore();
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList class="justify-around rounded-xl border-2 border-border px-4 py-1">
      <NavigationMenuItem>
        <RouterLink to="/" @click="logout">
          <NavigationMenuLink :class="navigationMenuTriggerStyle()"> Logout </NavigationMenuLink>
        </RouterLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
