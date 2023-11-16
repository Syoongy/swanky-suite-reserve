<template>
  <form class="grid gap-4 animate-in animate-out fade-in fade-out" @submit.prevent="onSubmit">
    <CardContent class="flex flex-col gap-2">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem v-auto-animate>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="MartianMan" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem v-auto-animate>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </CardContent>
    <CardFooter>
      <Button class="w-full" type="submit"> Login </Button>
      <p class="pt-2 text-xs text-muted-foreground">
        Don't have an account?
        <RouterLink class="text-secondary-foreground underline" to="/signup"> Sign Up </RouterLink>
      </p>
    </CardFooter>
  </form>
</template>

<script setup lang="ts">
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "vue-router";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useToast } from "@/components/ui/toast/use-toast";

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string()
  })
);
const form = useForm({
  validationSchema: formSchema
});
const { toast } = useToast();
const { signIn } = useAuthStore();
const { user } = storeToRefs(useAuthStore());
const router = useRouter();

const onSubmit = form.handleSubmit(async (values) => {
  try {
    await signIn(values.email, values.password);
    router.push("/");
  } catch (error) {
    const err = error as Error;
    toast({
      title: "Error logging in",
      description: err.message,
      duration: 2000
    });
  }
});
</script>

<style scoped></style>
