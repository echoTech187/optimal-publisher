// global.d.ts
import { IStaticMethods } from "flyonui/flyonui";
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
    noUiSlider: noUiSlider;
  }
}

export {};