// vite.config.ts
import path from "node:path";
import { defineConfig } from "file:///home/ubuntu/chatgpt-idp/app/node_modules/.pnpm/vite@4.4.3_@types+node@18.17.4_sass@1.64.1/node_modules/vite/dist/node/index.js";
import Vue from "file:///home/ubuntu/chatgpt-idp/app/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3_vite@4.4.3_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Pages from "file:///home/ubuntu/chatgpt-idp/app/node_modules/.pnpm/vite-plugin-pages@0.31.0_@vue+compiler-sfc@3.3.4_vite@4.4.3/node_modules/vite-plugin-pages/dist/index.mjs";
import Layouts from "file:///home/ubuntu/chatgpt-idp/app/node_modules/.pnpm/vite-plugin-vue-layouts@0.8.0_vite@4.4.3_vue-router@4.2.4_vue@3.3.4/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import Components from "file:///home/ubuntu/chatgpt-idp/app/node_modules/.pnpm/unplugin-vue-components@0.25.1_rollup@3.28.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import AutoImport from "file:///home/ubuntu/chatgpt-idp/app/node_modules/.pnpm/unplugin-auto-import@0.16.6_@vueuse+core@10.2.1_rollup@3.28.1/node_modules/unplugin-auto-import/dist/vite.js";
import Markdown from "file:///home/ubuntu/chatgpt-idp/app/node_modules/.pnpm/vite-plugin-vue-markdown@0.23.5_rollup@3.28.1_vite@4.4.3/node_modules/vite-plugin-vue-markdown/dist/index.mjs";
import LinkAttributes from "file:///home/ubuntu/chatgpt-idp/app/node_modules/.pnpm/markdown-it-link-attributes@4.0.1/node_modules/markdown-it-link-attributes/index.js";
import Unocss from "file:///home/ubuntu/chatgpt-idp/app/node_modules/.pnpm/unocss@0.53.5_postcss@8.4.27_rollup@3.28.1_vite@4.4.3/node_modules/unocss/dist/vite.mjs";
import Shiki from "file:///home/ubuntu/chatgpt-idp/app/node_modules/.pnpm/markdown-it-shiki@0.9.0/node_modules/markdown-it-shiki/dist/index.mjs";
import VueMacros from "file:///home/ubuntu/chatgpt-idp/app/node_modules/.pnpm/unplugin-vue-macros@2.3.6_@vueuse+core@10.2.1_rollup@3.28.1_vite@4.4.3_vue@3.3.4/node_modules/unplugin-vue-macros/dist/vite.mjs";
import VueDevTools from "file:///home/ubuntu/chatgpt-idp/app/node_modules/.pnpm/vite-plugin-vue-devtools@0.5.1_@types+node@18.17.4_pug@3.0.2_rollup@3.28.1_vite@4.4.3_vue@3.3.4/node_modules/vite-plugin-vue-devtools/dist/index.mjs";
var __vite_injected_original_dirname = "/home/ubuntu/chatgpt-idp/app";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__vite_injected_original_dirname, "src")}/`
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "https://www.aiofauna.com/api",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, ""),
        ws: true
      }
    }
  },
  build: {
    outDir: "../static",
    emptyOutDir: true
  },
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue({
          include: [/\.vue$/, /\.md$/]
        })
      }
    }),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ["vue", "md"]
    }),
    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),
    VueDevTools(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/head", "@vueuse/core"],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/composables", "src/stores", "src/types", "src/lib"],
      vueTemplate: true
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ["vue", "md"],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "src/components.d.ts"
    }),
    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    Unocss(),
    // https://github.com/antfu/vite-plugin-vue-markdown
    // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
    Markdown({
      wrapperClasses: "prose prose-sm m-auto text-left",
      headEnabled: true,
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true
      },
      markdownItSetup(md) {
        md.use(Shiki, {
          theme: {
            light: "vitesse-light",
            dark: "vitesse-dark"
          }
        });
        md.use(LinkAttributes, {
          matcher: (link) => /^https?:\/\//.test(link),
          attrs: {
            target: "_blank",
            rel: "noopener"
          }
        });
      },
      wrapperComponent: "markdown-body"
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS91YnVudHUvY2hhdGdwdC1pZHAvYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS91YnVudHUvY2hhdGdwdC1pZHAvYXBwL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3VidW50dS9jaGF0Z3B0LWlkcC9hcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IFZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgUGFnZXMgZnJvbSBcInZpdGUtcGx1Z2luLXBhZ2VzXCI7XG5pbXBvcnQgTGF5b3V0cyBmcm9tIFwidml0ZS1wbHVnaW4tdnVlLWxheW91dHNcIjtcbmltcG9ydCBDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCI7XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tIFwidW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZVwiO1xuaW1wb3J0IE1hcmtkb3duIGZyb20gXCJ2aXRlLXBsdWdpbi12dWUtbWFya2Rvd25cIjtcbmltcG9ydCBMaW5rQXR0cmlidXRlcyBmcm9tIFwibWFya2Rvd24taXQtbGluay1hdHRyaWJ1dGVzXCI7XG5pbXBvcnQgVW5vY3NzIGZyb20gXCJ1bm9jc3Mvdml0ZVwiO1xuaW1wb3J0IFNoaWtpIGZyb20gXCJtYXJrZG93bi1pdC1zaGlraVwiO1xuaW1wb3J0IFZ1ZU1hY3JvcyBmcm9tIFwidW5wbHVnaW4tdnVlLW1hY3Jvcy92aXRlXCI7XG5pbXBvcnQgVnVlRGV2VG9vbHMgZnJvbSBcInZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29sc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwifi9cIjogYCR7cGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIil9L2AsXG4gICAgfSxcbiAgfSxcblxuICBzZXJ2ZXI6IHtcbiAgICBwcm94eToge1xuICAgICAgXCIvYXBpXCI6IHtcbiAgICAgICAgdGFyZ2V0OiBcImh0dHBzOi8vd3d3LmFpb2ZhdW5hLmNvbS9hcGlcIixcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgXCJcIiksXG4gICAgICAgIHdzOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiBcIi4uL3N0YXRpY1wiLFxuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICB9LFxuXG4gIHBsdWdpbnM6IFtcbiAgICBWdWVNYWNyb3Moe1xuICAgICAgcGx1Z2luczoge1xuICAgICAgICB2dWU6IFZ1ZSh7XG4gICAgICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLm1kJC9dLFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgfSksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vaGFubm9lcnUvdml0ZS1wbHVnaW4tcGFnZXNcbiAgICBQYWdlcyh7XG4gICAgICBleHRlbnNpb25zOiBbXCJ2dWVcIiwgXCJtZFwiXSxcbiAgICB9KSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Kb2huQ2FtcGlvbkpyL3ZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzXG4gICAgTGF5b3V0cygpLFxuICAgIFZ1ZURldlRvb2xzKCksXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLWF1dG8taW1wb3J0XG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICBpbXBvcnRzOiBbXCJ2dWVcIiwgXCJ2dWUtcm91dGVyXCIsIFwiQHZ1ZXVzZS9oZWFkXCIsIFwiQHZ1ZXVzZS9jb3JlXCJdLFxuICAgICAgZHRzOiBcInNyYy9hdXRvLWltcG9ydHMuZC50c1wiLFxuICAgICAgZGlyczogW1wic3JjL2NvbXBvc2FibGVzXCIsIFwic3JjL3N0b3Jlc1wiLCBcInNyYy90eXBlc1wiLCBcInNyYy9saWJcIl0sXG4gICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSxcbiAgICB9KSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi12dWUtY29tcG9uZW50c1xuICAgIENvbXBvbmVudHMoe1xuICAgICAgLy8gYWxsb3cgYXV0byBsb2FkIG1hcmtkb3duIGNvbXBvbmVudHMgdW5kZXIgYC4vc3JjL2NvbXBvbmVudHMvYFxuICAgICAgZXh0ZW5zaW9uczogW1widnVlXCIsIFwibWRcIl0sXG4gICAgICAvLyBhbGxvdyBhdXRvIGltcG9ydCBhbmQgcmVnaXN0ZXIgY29tcG9uZW50cyB1c2VkIGluIG1hcmtkb3duXG4gICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlLywgL1xcLm1kJC9dLFxuICAgICAgZHRzOiBcInNyYy9jb21wb25lbnRzLmQudHNcIixcbiAgICB9KSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bm9jc3NcbiAgICAvLyBzZWUgdW5vLmNvbmZpZy50cyBmb3IgY29uZmlnXG4gICAgVW5vY3NzKCksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdml0ZS1wbHVnaW4tdnVlLW1hcmtkb3duXG4gICAgLy8gRG9uJ3QgbmVlZCB0aGlzPyBUcnkgdml0ZXNzZS1saXRlOiBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdml0ZXNzZS1saXRlXG4gICAgTWFya2Rvd24oe1xuICAgICAgd3JhcHBlckNsYXNzZXM6IFwicHJvc2UgcHJvc2Utc20gbS1hdXRvIHRleHQtbGVmdFwiLFxuICAgICAgaGVhZEVuYWJsZWQ6IHRydWUsXG4gICAgICBtYXJrZG93bkl0T3B0aW9uczoge1xuICAgICAgICBodG1sOiB0cnVlLFxuICAgICAgICBsaW5raWZ5OiB0cnVlLFxuICAgICAgICB0eXBvZ3JhcGhlcjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBtYXJrZG93bkl0U2V0dXAobWQpIHtcbiAgICAgICAgLy8gaHR0cHM6Ly9wcmlzbWpzLmNvbS9cbiAgICAgICAgbWQudXNlKFNoaWtpLCB7XG4gICAgICAgICAgdGhlbWU6IHtcbiAgICAgICAgICAgIGxpZ2h0OiBcInZpdGVzc2UtbGlnaHRcIixcbiAgICAgICAgICAgIGRhcms6IFwidml0ZXNzZS1kYXJrXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIG1kLnVzZShMaW5rQXR0cmlidXRlcywge1xuICAgICAgICAgIG1hdGNoZXI6IChsaW5rOiBzdHJpbmcpID0+IC9eaHR0cHM/OlxcL1xcLy8udGVzdChsaW5rKSxcbiAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgdGFyZ2V0OiBcIl9ibGFua1wiLFxuICAgICAgICAgICAgcmVsOiBcIm5vb3BlbmVyXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgd3JhcHBlckNvbXBvbmVudDogXCJtYXJrZG93bi1ib2R5XCIsXG4gICAgfSksXG4gIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1EsT0FBTyxVQUFVO0FBQ3ZSLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sY0FBYztBQUNyQixPQUFPLG9CQUFvQjtBQUMzQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sZUFBZTtBQUN0QixPQUFPLGlCQUFpQjtBQVp4QixJQUFNLG1DQUFtQztBQWN6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxNQUFNLEdBQUcsS0FBSyxRQUFRLGtDQUFXLEtBQUssQ0FBQztBQUFBLElBQ3pDO0FBQUEsRUFDRjtBQUFBLEVBRUEsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUyxDQUFDQSxVQUFTQSxNQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsUUFDNUMsSUFBSTtBQUFBLE1BQ047QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBRUEsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsYUFBYTtBQUFBLEVBQ2Y7QUFBQSxFQUVBLFNBQVM7QUFBQSxJQUNQLFVBQVU7QUFBQSxNQUNSLFNBQVM7QUFBQSxRQUNQLEtBQUssSUFBSTtBQUFBLFVBQ1AsU0FBUyxDQUFDLFVBQVUsT0FBTztBQUFBLFFBQzdCLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRixDQUFDO0FBQUE7QUFBQSxJQUdELE1BQU07QUFBQSxNQUNKLFlBQVksQ0FBQyxPQUFPLElBQUk7QUFBQSxJQUMxQixDQUFDO0FBQUE7QUFBQSxJQUdELFFBQVE7QUFBQSxJQUNSLFlBQVk7QUFBQTtBQUFBLElBRVosV0FBVztBQUFBLE1BQ1QsU0FBUyxDQUFDLE9BQU8sY0FBYyxnQkFBZ0IsY0FBYztBQUFBLE1BQzdELEtBQUs7QUFBQSxNQUNMLE1BQU0sQ0FBQyxtQkFBbUIsY0FBYyxhQUFhLFNBQVM7QUFBQSxNQUM5RCxhQUFhO0FBQUEsSUFDZixDQUFDO0FBQUE7QUFBQSxJQUdELFdBQVc7QUFBQTtBQUFBLE1BRVQsWUFBWSxDQUFDLE9BQU8sSUFBSTtBQUFBO0FBQUEsTUFFeEIsU0FBUyxDQUFDLFVBQVUsY0FBYyxPQUFPO0FBQUEsTUFDekMsS0FBSztBQUFBLElBQ1AsQ0FBQztBQUFBO0FBQUE7QUFBQSxJQUlELE9BQU87QUFBQTtBQUFBO0FBQUEsSUFJUCxTQUFTO0FBQUEsTUFDUCxnQkFBZ0I7QUFBQSxNQUNoQixhQUFhO0FBQUEsTUFDYixtQkFBbUI7QUFBQSxRQUNqQixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxhQUFhO0FBQUEsTUFDZjtBQUFBLE1BQ0EsZ0JBQWdCLElBQUk7QUFFbEIsV0FBRyxJQUFJLE9BQU87QUFBQSxVQUNaLE9BQU87QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsUUFDRixDQUFDO0FBQ0QsV0FBRyxJQUFJLGdCQUFnQjtBQUFBLFVBQ3JCLFNBQVMsQ0FBQyxTQUFpQixlQUFlLEtBQUssSUFBSTtBQUFBLFVBQ25ELE9BQU87QUFBQSxZQUNMLFFBQVE7QUFBQSxZQUNSLEtBQUs7QUFBQSxVQUNQO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUFBLE1BQ0Esa0JBQWtCO0FBQUEsSUFDcEIsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
