import type { User } from "firebase/auth";
import { writable, readable } from "svelte/store";

export const loginInfo = writable<User>();
export let meetmenubool = writable<boolean>(false);