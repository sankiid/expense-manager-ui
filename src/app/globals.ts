'use strict';

export const BASE_USE:string = 'http://192.168.31.154:18241/';
export const DAY_30_MILLI_SEC:number = 2592000000;
export const ONE_DAY_MILLI_SEC:number = 86400000;

export const MONTH_START:number = Date.now() - new Date().getDate() * ONE_DAY_MILLI_SEC;
export const TODAY:number = Date.now();

