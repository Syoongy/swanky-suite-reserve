<template>
  <Dialog :class="{ dark: isDark }">
    <DialogTrigger as-child>
      <Button> New </Button>
    </DialogTrigger>
    <DialogContent :class="{ dark: isDark }">
      <DialogHeader>
        <DialogTitle>New Room</DialogTitle>
        <DialogDescription>
          Create a new <span class="text-primary">swanky</span> room available for reseservation
        </DialogDescription>
      </DialogHeader>
      <form class="flex flex-col gap-4 text-foreground" @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem v-auto-animate>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="MartianMan" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="startHour">
          <FormItem v-auto-animate>
            <FormLabel>Starting Hour</FormLabel>
            <FormControl>
              <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="endHour">
          <FormItem v-auto-animate>
            <FormLabel>Ending Hour</FormLabel>
            <FormControl>
              <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="pricePerHour">
          <FormItem v-auto-animate>
            <FormLabel>Price Per Hour</FormLabel>
            <FormControl>
              <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <DialogFooter>
          <Button type="submit" class="w-full"> Save changes </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { usePreferredDark } from "@vueuse/core";
import type { InsertRoom } from "@/types/room";

const isDark = usePreferredDark();
const formSchema = toTypedSchema(
  z
    .object({
      name: z.string().min(2),
      startHour: z.number().min(0).max(23),
      endHour: z.number().min(0).max(23),
      pricePerHour: z.number().min(1)
    })
    .refine((data) => data.endHour > data.startHour, {
      message: "Ending hour must be greater than start hour",
      path: ["endHour"]
    })
);
const form = useForm({
  validationSchema: formSchema
});

const emits = defineEmits<{ addRoom: [newRoom: InsertRoom] }>();

const onSubmit = form.handleSubmit(async (values) => {
  emits("addRoom", {
    name: values.name,
    end_hour: values.endHour,
    start_hour: values.startHour,
    price_per_hour: values.pricePerHour
  });
});
</script>

<style scoped></style>
