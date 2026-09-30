export type SceneType = 'chair' | 'lamp' | 'table' | 'headphones' | 'earbuds' | 'speaker';
export type Product = { id:string; name:string; category:string; price:number; image:string; badge?:string; subtitle:string; description:string; details:string[]; colors:{name:string;value:string}[]; scene:SceneType };
export type CartItem = { id:string; color:string; quantity:number };
export const money = (value:number) => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0}).format(value);
