<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const { removeUser } = useAuthStore();
const { user, isLoggedIn } = storeToRefs(useAuthStore());
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList class="justify-around rounded-xl border-2 border-border px-4 py-1">
      <NavigationMenuItem>
        <RouterLink to="/">
          <NavigationMenuLink :class="navigationMenuTriggerStyle()">Home</NavigationMenuLink>
        </RouterLink>
      </NavigationMenuItem>
      <NavigationMenuItem v-if="isLoggedIn">
        <RouterLink to="/">
          <NavigationMenuLink :class="navigationMenuTriggerStyle()"> My List </NavigationMenuLink>
        </RouterLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <RouterLink to="/reservation">
          <NavigationMenuLink :class="navigationMenuTriggerStyle()">
            Reservations
          </NavigationMenuLink>
        </RouterLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <RouterLink to="/room">
          <NavigationMenuLink :class="navigationMenuTriggerStyle()"> Room </NavigationMenuLink>
        </RouterLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <DropdownMenu v-if="isLoggedIn">
          <DropdownMenuTrigger :class="navigationMenuTriggerStyle()">
            {{ user?.username }}
          </DropdownMenuTrigger>
          <DropdownMenuContent class="border bg-popover-foreground p-2 text-popover">
            <DropdownMenuItem class="hover:cursor-pointer hover:bg-accent/50" @click="removeUser">
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <RouterLink to="/login" v-else>
          <NavigationMenuLink :class="navigationMenuTriggerStyle()"> Login </NavigationMenuLink>
        </RouterLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
