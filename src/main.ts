import { createSSRApp } from "vue";
import * as Pinia from "pinia";
import tmui from "./tmui";
import App from "./App.vue";

// 引入tmui配置文件
import { config } from "./config";
export function createApp() {
  const app = createSSRApp(App);
  app.use(tmui, { ...config } as Tmui.tmuiConfig);
  return {
    app,
    Pinia,
  };
}
