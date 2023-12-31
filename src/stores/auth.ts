import { computed, ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/composables/supabase";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const user: Ref<User | null> = ref(null);

  async function getUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error(error);
    }
    if (data.user) {
      setUser(data.user);
    }
  }

  async function signUp(email: string, password: string, role: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role } }
    });
    console.error(error);
  }

  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    console.error(error);
    if (data.user) {
      setUser(data.user);
    }
  }

  function setUser(userData: User) {
    user.value = userData;
  }

  function getUserRole(): string {
    if (user.value) {
      return user.value.user_metadata.role;
    }
    return "";
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
    user.value = null;
  }

  const isLoggedIn = computed(() => user.value !== null);

  return { user, isLoggedIn, logout, getUser, signUp, signIn, getUserRole };
});
