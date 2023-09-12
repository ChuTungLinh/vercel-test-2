<template>
  <nav :class="classes" class="navbar">
    <div :class="containerClasses">
      <slot name="brand"></slot>
      
      <slot name="toggle-button">
        <button style="display: none;"
          class="navbar-toggler collapsed"
          v-if="hasMenu"
          type="button"
          @click="toggleMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-bar navbar-kebab"></span>
          <span class="navbar-toggler-bar navbar-kebab"></span>
          <span class="navbar-toggler-bar navbar-kebab"></span>
        </button>
      </slot>
      <!-- v-show="show" -->
        <div
          class="navbar-collapse navbar-custom-collapse collapse show"
          style="display: flex;"
          :class="menuClasses"
          v-click-outside="closeMenu">
          <slot :close-menu="closeMenu"></slot>
        </div>

        <h4 class="pt-2" id="user-name" v-html="userName"></h4>
      
        <button class="navbar-toggler" v-if="isAgent" @click.stop="toggleMenu">
          <span class="navbar-toggler-icon"></span>
        </button>

    </div>
  </nav>
</template>
<script>
export default {
  name: 'base-nav',
  props: {
    show: {
      type: Boolean,
      default: false,
      description:
        'Whether navbar menu is shown (valid for viewports < specified by `expand` prop)'
    },
    transparent: {
      type: Boolean,
      default: false,
      description: 'Whether navbar is transparent'
    },
    expand: {
      type: String,
      default: 'lg',
      description: 'Breakpoint where nav should expand'
    },
    menuClasses: {
      type: [String, Object, Array],
      default: '',
      description:
        'Navbar menu (items) classes. Can be used to align menu items to the right/left'
    },
    containerClasses: {
      type: [String, Object, Array],
      default: 'container',
      description:
        'Container classes. Can be used to control container classes (contains both navbar brand and menu items)'
    },
    type: {
      type: String,
      default: '',
      validator(value) {
        return [
          '',
          'dark',
          'success',
          'danger',
          'warning',
          'white',
          'primary',
          'light',
          'info',
          'vue'
        ].includes(value);
      },
      description: 'Navbar color type'
    },

    //Bổ sung thêm
    userName: {
      type: String,
      default: '',
    },
    isAgent: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: 'show',
    event: 'change'
  },
  computed: {
    classes() {
      let color = `bg-${this.type}`;
      let classes = [
        { 'navbar-transparent': this.transparent },
        { [`navbar-expand-${this.expand}`]: this.expand }
      ];
      if (this.position) {
        classes.push(`navbar-${this.position}`);
      }
      if (!this.transparent) {
        classes.push(color);
      }
      return classes;
    },
    hasMenu() {
      return this.$slots.default;
    }
  },
  methods: {
    toggleMenu() {
      this.$emit('change', !this.show);
    },
    closeMenu() {
      this.$emit('change', false);
    }
  }
};
</script>
<style scoped>

  .navbar-toggler {
    background-color: #c4cbd5;
    padding: 0.05rem 0.1rem;
  }

  .navbar {
    padding: 0px 6px;
  }

  .navbar-toggler-icon {
    width: 1.3em;
    height: 1.3em;
  }

  #user-name {
      text-align: center;
      font-weight: 400;
      line-height: 1.3;
  }

  @media only screen and (max-width: 768px) {
    #user-name {
      font-size: 14px;
    }
  }

</style>>
