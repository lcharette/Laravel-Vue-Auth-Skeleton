<template>
  <li class="c-sidebar-nav-item">
    <slot>
      <CLink
        :class="linkClasses"
        v-bind="computedLinkProps"
      >
        <CIcon v-if="icon" v-bind="computedIcon"/>
        <i v-if="fontIcon" :class="['c-sidebar-nav-icon', fontIcon]"/>
        <font-awesome-icon v-if="faIcon" :icon="['fas', faIcon]" class="c-sidebar-nav-icon" /> {{name}}
        <CBadge
          v-if="badge"
          v-bind="Object.assign({}, badge, { text: null })"
        >
          {{badge.text}}
        </CBadge>
      </CLink>
    </slot>
  </li>
</template>

<script>
import CLink, { props as linkProps } from '@coreui/vue/src/components/link/CLink'
import CBadge from '@coreui/vue/src/components/badge/CBadge'
import CIcon from '@coreui/icons-vue/src/CIconRaw.vue'

const props = Object.assign(
  {}, 
  linkProps, 
  {
    exact: {
      type: Boolean,
      default: true
    },
    activeClass: {
      type: String,
      default: 'c-active'
    }
  },
  {
    name: String,
    icon: [String, Object],
    fontIcon: String,
    faIcon: String,
    badge: Object,
    addLinkClasses: [String, Array, Object],
    label: Boolean
  }
)

export default {
  name: 'FSidebarNavItem',
  components: {
    CLink, 
    CBadge,
    CIcon
  },
  props,
  computed: {
    computedLinkProps () {
      return Object.keys(linkProps).reduce((props, key) => {
        props[key] = this[key]
        return props
      }, {})
    },
    linkClasses () {
      return [
        this.label ? 'c-sidebar-nav-label' : 'c-sidebar-nav-link',
        this.addLinkClasses
      ]
    },
    computedIcon () {
      if (typeof this.icon === 'object') {
        return Object.assign(
          { customClasses: 'c-sidebar-nav-icon' },
          this.icon
        )
      } else {
        return { customClasses: 'c-sidebar-nav-icon', name: this.icon }
      }
    }
  }
}
</script>
