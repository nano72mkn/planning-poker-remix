// Import the functions you need from the SDKs you need
import type { FirebaseApp, FirebaseOptions } from "firebase/app";
import { getApps } from "firebase/app";
import { getApp, initializeApp } from "firebase/app";

export const initFirebase = (config: FirebaseOptions): FirebaseApp =>
  getApps().length === 0 ? initializeApp(config) : getApp();
