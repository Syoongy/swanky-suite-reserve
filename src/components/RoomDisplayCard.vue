<template>
  <Card class="cursor-pointer transition-colors">
    <CardHeader>
      <CardTitle class="text-xl">{{ room.name }}</CardTitle>
      <CardDescription> hgello </CardDescription>
    </CardHeader>
    <CardContent>
      <p class="text-right">${{ room.price_per_hour }}/hr</p>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { RoomRow } from "@/types/room";

const { room } = defineProps<{ room: RoomRow }>();
</script>

<style scoped></style>
