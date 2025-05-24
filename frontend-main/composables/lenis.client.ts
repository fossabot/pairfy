// composables/useLenisMultiple.ts
import { onMounted, onUnmounted } from "vue";
import Lenis from "lenis";

export function useLenisMultiple(refs: Ref<HTMLElement | null>[]) {
  const instances: Lenis[] = [];

  const createLenis = (wrapperEl: HTMLElement) => {
    const lenis = new Lenis({
      wrapper: wrapperEl,
      content: wrapperEl.firstElementChild as HTMLElement,
      smooth: true
    } as any);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    return lenis;
  };

  onMounted(() => {
    refs.forEach((r) => {
      if (r.value) {
        const instance = createLenis(r.value);
        instances.push(instance);
      }
    });
  });

  onUnmounted(() => {
    instances.forEach((i) => i.destroy());
  });

  return {
    getInstances: () => instances,
  };
}
