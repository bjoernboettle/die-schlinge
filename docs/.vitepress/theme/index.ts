import DefaultTheme from "vitepress/theme";
import "@catppuccin/vitepress/theme/frappe/blue.css";
import Footer from "./components/Footer.vue";
import "./style.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("Footer", Footer);
  },
};
