<script lang="ts" setup>
    const { getAllPegawai } = usePegawai();

    const allPegawai = await getAllPegawai();

    console.log(allPegawai.value.data);
</script>

<template>
    
</template>
