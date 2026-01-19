import { atom } from "nanostores";

export const $mainSidebar = atom<boolean>(false);

export const openMainSidebar = () => $mainSidebar.set(true);
export const closeMainSidebar = () => $mainSidebar.set(false);
export const toggleMainSidebar = () => $mainSidebar.set(!$mainSidebar.get());
