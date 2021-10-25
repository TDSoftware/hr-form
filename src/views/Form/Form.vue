<template>
  <div class="tds-form">
    <img src="../../assets/tds-banner.jpg">
    <div v-if="$route.params.id" class="form">
      <form @submit.prevent="send">
        <label>First Name</label>
        <input v-model="firstName" />
        <label>Last Name</label>
        <input v-model="lastName" />
        <label>Email</label>
        <input v-model="email" />
        <label>Job interests</label>
        <textarea v-model="interests" />
        <button type="submit" :class="{loading: isLoading}">Subscribe</button>
      </form>

      <div v-if="error" class="error">{{ error }}</div>
    </div>
    <div v-else class="tags">
      Choose a tag
      <button v-for="tag in tags" :key="tag.id" @click="$router.push('/' + tag.id)">{{ tag.name }}</button>
    </div>
  </div>
</template>

<script src="./Form.js" />
<style lang="scss" src="./Form.scss" scoped />
