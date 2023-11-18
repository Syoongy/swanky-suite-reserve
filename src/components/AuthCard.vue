<script setup lang="ts">
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
const props = defineProps<{ title: string; description: string; btnText: string }>();
</script>
<template>
  <Card class="w-1/3 transition-all delay-150 ease-in-out">
    <CardHeader class="space-y-1">
      <CardTitle class="text-2xl"> {{ props.title }} </CardTitle>
      <CardDescription> {{ props.description }} </CardDescription>
    </CardHeader>
    <slot />
  </Card>
</template>

<style scoped></style>
