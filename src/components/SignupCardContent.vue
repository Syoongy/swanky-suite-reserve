<template>
  <div class="grid animate-in animate-out fade-in fade-out">
    <CardContent>
      <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
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
        <FormField v-slot="{ componentField }" name="confirmPassword">
          <FormItem v-auto-animate>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="role">
          <FormItem>
            <FormLabel>Role</FormLabel>

            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="user"> User </SelectItem>
                  <SelectItem value="admin"> Admin </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button class="w-full" type="submit"> Create Account </Button>
      </form>
    </CardContent>

    <CardFooter>
      <p class="pt-2 text-xs text-muted-foreground">
        Already have an account?
        <RouterLink class="text-secondary-foreground underline" to="/login"> Login </RouterLink>
      </p>
    </CardFooter>
  </div>
</template>

<script setup lang="ts">
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useRouter } from "vue-router";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { useAuthStore } from "@/stores/auth";

const { toast } = useToast();
const formSchema = toTypedSchema(
  z
    .object({
      email: z.string().email(),
      password: z.string().min(8).max(50),
      confirmPassword: z.string().min(8).max(50),
      role: z.string()
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"]
    })
);
const form = useForm({
  validationSchema: formSchema
});
const router = useRouter();
const { signUp } = useAuthStore();

const onSubmit = form.handleSubmit(async (values) => {
  try {
    await signUp(values.email, values.password, values.role);
    router.push("/login");
  } catch (error) {
    const err = error as Error;
    toast({
      title: "Error signing up",
      description: err.message,
      duration: 2000
    });
  }
});
</script>

<style scoped></style>
