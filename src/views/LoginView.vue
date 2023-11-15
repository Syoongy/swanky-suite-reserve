<template>
  <main class="flex h-full w-full items-center justify-center">
    <Card class="w-1/3 transition-all delay-150 ease-in-out">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl"> Swanky Suite Reserve </CardTitle>
        <CardDescription> Book away baby! </CardDescription>
      </CardHeader>
      <form class="grid gap-4 animate-in animate-out fade-in fade-out" @submit.prevent="onSubmit">
        <CardContent class="flex flex-col gap-2">
          <FormField v-slot="{ componentField }" name="username">
            <FormItem v-auto-animate>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="MartianMan" v-bind="componentField" />
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
          <Button class="w-full" type="submit"> Sign In </Button>
        </CardFooter>
      </form>
    </Card>
  </main>
</template>

<script setup lang="ts">
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card";
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

const { toast } = useToast();

const formSchema = toTypedSchema(
  z.object({
    username: z.string(),
    password: z.string()
  })
);
const form = useForm({
  validationSchema: formSchema
});
// const { login } = useAuthAPI();
const { user } = storeToRefs(useAuthStore());
const router = useRouter();

const onSubmit = form.handleSubmit(async (values) => {
  try {
    // await login({ username: values.username, passwordhash: values.password });
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
