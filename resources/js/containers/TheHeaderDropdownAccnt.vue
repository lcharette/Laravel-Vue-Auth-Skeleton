<template>
  <CDropdown inNav class="c-header-nav-items" placement="bottom-end" add-menu-classes="pt-0">
    <template #toggler>
      <CHeaderNavLink>
        <div class="px-2">{{ user.full_name }}</div>
        <div class="c-avatar">
          <img :src="user.avatar" class="c-avatar-img" />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Account</strong>
    </CDropdownHeader>
    <CDropdownItem>
      <CIcon name="cil-user" />Profile
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-settings" />Settings
    </CDropdownItem>
    <CDropdownItem @click="logout()">
      <CIcon name="cil-lock-locked" />Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import { AUTH_LOGOUT } from "@/store/actions/auth";

export default {
  name: "TheHeaderDropdownAccnt",
  computed: {
    user () {
      return this.$store.state.user.profile
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch(AUTH_LOGOUT)
      .then(() => {
        this.$router.push('/login')
      })
    }
  }
};
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>