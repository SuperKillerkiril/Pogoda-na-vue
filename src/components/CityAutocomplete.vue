
<template>
    <div class="search-bar">
        <input
            type="text"
            v-model="query"
            @input="onInput"
            @keydown.down.prevent="moveDown"
            @keydown.up.prevent="moveUp"
            @keydown.enter.prevent="selectActive"
            @keydown.esc.prevent="clearSelection"
            placeholder="Search for a city or airport"
        />
        <ul ref="autocomplete" v-if="filteredSuggestions.length" class="suggestions">
            <li
                v-for="(suggestion, index) in filteredSuggestions"
                :key="index"
                :class="{active: index === activeIndex}"
                @click="selectSuggestion(suggestion)"
            >
                {{ suggestion }}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  props: {
    suggestions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      query: "",
      filteredSuggestions: [],
      activeIndex: -1
    };
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    handleClickOutside(event) {
      const el = this.$refs.autocomplete;
      if (el && !el.contains(event.target)) {
        this.filteredSuggestions = [];
        this.activeIndex = -1;
      }
    },
    onInput() {
      const q = this.query.toLowerCase().trim();
      if (!q) {
        this.filteredSuggestions = [];
        this.activeIndex = -1;
        this.$emit("clear");
        return;
      }
      this.filteredSuggestions = this.suggestions
        .filter(s => s.toLowerCase().includes(q));
      this.activeIndex = -1;
    },
    moveDown() {
      if (this.activeIndex < this.filteredSuggestions.length - 1) {
        this.activeIndex++;
      }
    },
    moveUp() {
      if (this.activeIndex > 0) {
        this.activeIndex--;
      }
    },
    selectActive() {
      if (this.activeIndex >= 0) {
        this.selectSuggestion(this.filteredSuggestions[this.activeIndex]);
      }
    },
    selectSuggestion(suggestion) {
      this.query = suggestion;
      this.filteredSuggestions = [];
      this.activeIndex = -1;
      this.$emit("select", suggestion);
    },
    clearSelection() {
      this.query = "";
      this.filteredSuggestions = [];
      this.activeIndex = -1;
      this.$emit("clear");
    }
  }
};
</script>
<style>
.h1{
 font-size: 37px;
 font-weight: 700;
}
.search-bar{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #191919;
    border-radius: 10px;
}
.search-bar input{
    color: rgb(255, 255, 255);
    width: 100%;
    height: 39px;
    border-radius: 10px;
    padding: 7px;
    font-size: 19px;
    font-weight: 400;
    background: none;
    border: none;
    background: url('@/assets/icons/magnifier.svg') no-repeat 10px center;
    background-size: 23px;
    text-align: center;
}
@media (min-width: 1280px) {
.search-bar input{
    width: 98.5%;
    height: 39px;
}
}
.search-bar input::placeholder{
    color: #8c8c8c;
}
.search-bar input:focus{
    background: none;
}
.suggestions{
    border-radius: 10px;
    width: 87%;
    top:13%;
    z-index: 10;
    position: absolute;
    background-color: #191919;
}
.suggestions li{
    padding: 10px;
    cursor: pointer;
    transition: 0.2s ease;
    font-size: 19px;
    padding: 7px;
}
.suggestions li:hover,
.suggestions li.active{
    background-color: #141414;
    border-radius: 5px;
}
</style>
