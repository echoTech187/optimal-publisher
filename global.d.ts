// global.d.ts
import { IStaticMethods,HSCarousel } from "flyonui/flyonui";
import type { noUiSlider } from "nouislider";


declare global {
  interface Window {
    // Optional third-party libraries
    _;
    $: typeof import("jquery");
    jQuery: typeof import("jquery");
    DataTable;
    Dropzone : typeof Dropzone;

    HSStaticMethods: IStaticMethods;
    HSCarousel: HSCarousel;
    noUiSlider: noUiSlider;
  }
}

export {};