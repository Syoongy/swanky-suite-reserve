<template>
  <Dialog :class="{ dark: isDark }">
    <DialogTrigger as-child>
      <Settings class="cursor-pointer text-muted-foreground" :size="24" />
    </DialogTrigger>
    <DialogContent :class="isDark ? 'dark' : ''">
      <DialogHeader>
        <DialogTitle>Edit Room</DialogTitle>
        <DialogDescription>
          Edit your <span class="text-primary">swanky</span> room
        </DialogDescription>
      </DialogHeader>
      <form class="flex flex-col gap-4 text-foreground" @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" :model-value="name" name="name">
          <FormItem v-auto-animate>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="My Cool Room" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" :model-value="startHour" name="startHour">
          <FormItem v-auto-animate>
            <FormLabel>Starting Hour</FormLabel>
            <FormControl>
              <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" :model-value="endHour" name="endHour">
          <FormItem v-auto-animate>
            <FormLabel>Ending Hour</FormLabel>
            <FormControl>
              <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" :model-value="pricePerHour" name="pricePerHour">
          <FormItem v-auto-animate>
            <FormLabel>Price Per Hour</FormLabel>
            <FormControl>
              <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <DialogFooter>
          <DialogClose as-child>
            <Button type="submit" class="w-full"> Save changes </Button>
          </DialogClose>
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
  DialogClose,
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
import type { RoomRow, UpdateRoom } from "@/types/room";
import { Settings } from "lucide-vue-next";
import { onBeforeMount, ref } from "vue";

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
const emits = defineEmits<{ editRoom: [editRoomDetails: UpdateRoom] }>();
const props = defineProps<{ details: RoomRow }>();

const name = ref("");
const startHour = ref(0);
const endHour = ref(0);
const pricePerHour = ref(1);

const onSubmit = form.handleSubmit(async (values) => {
  emits("editRoom", {
    name: values.name,
    end_hour: values.endHour,
    start_hour: values.startHour,
    price_per_hour: values.pricePerHour
  });
});

onBeforeMount(() => {
  if (props.details) {
    name.value = props.details.name;
    startHour.value = props.details.start_hour;
    endHour.value = props.details.end_hour;
    pricePerHour.value = props.details.price_per_hour;
  }
});
</script>

<style scoped></style>
