# Vite Config Best Practices

**Impact: HIGH**

Vite의 빌드 설정을 튜닝하여 브라우저 로딩 속도와 캐싱 효율을 극대화하십시오.

### 1. Manual Chunk Splitting
라이브러리(node_modules)를 별도의 청크로 분리하여 앱 코드가 수정되어도 라이브러리 캐시가 유지되도록 합니다.

**vite.config.ts:**
```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
```

### 2. Prefetching/Preloading Assets
Vite는 기본적으로 entry 청크가 의존하는 자식 청크를 알아서 프리로딩하도록 마킹하지만, 중요한 에셋이나 폰트는 `vite-plugin-pwa`나 수동 수정을 통해 프리로딩할 수 있습니다.

### 3. Tree Shaking & Optimization
- **CSS Preprocessing**: 무거운 라이브러리(Tailwind 등)를 사용할 때는 `postcss` 최적화가 잘 되어 있는지 확인하십시오.
- **Minification**: Vite 4+에서는 `esbuild`가 기본 미니파이어이며 충분히 빠릅니다. 더 높은 압축률이 필요하다면 `terser`를 고려해 보세요.
