<template>
  <div class="tds-form">
    <img src="../../assets/tds-banner.jpg">
      <div class="form">
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
  </div>
</template>

<script src="./Form.js" />
<style lang="scss" src="./Form.scss" scoped />
