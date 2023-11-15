import { computed, type Ref } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '@/types/user';
import { StorageSerializers, useStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<User | null> = useStorage('user', null, undefined, {
    serializer: StorageSerializers.object,
  });

  function setUser(userData: User) {
    user.value = userData;
  }

  function removeUser() {
    user.value = null;
  }

  const isLoggedIn = computed(() => user.value !== null);

  return { user, setUser, removeUser, isLoggedIn };
});
