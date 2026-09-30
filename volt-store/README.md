# VOLT — ecommerce de portfólio

Frontend independente em React, TypeScript e Vite. Marca e produtos fictícios, com direção visual original, imagens de produto otimizadas e modelos conceituais interativos em Three.js.

## Executar

```bash
npm ci
npm run dev
```

## Validar e compilar

```bash
npm run build
npm run preview
```

## Recursos

- Catálogo com categorias, ordenação, busca e favoritos.
- Sacola persistida localmente, seleção de acabamento e controle de quantidade.
- Checkout demonstrativo com cupom `PRIMEIRA10`, sem cobrança ou envio de dados.
- Visualização 3D carregada sob demanda, rotação, zoom, seleção de cor e fallback quando WebGL não está disponível.
- Layout responsivo, diálogos nativos, navegação por teclado e respeito a movimento reduzido.
- Fontes locais, imagens WebP e divisão de código para carregar o motor 3D apenas quando solicitado.

## Publicar na Vercel

Importe esta pasta como projeto Vite. O arquivo `vercel.json` define build, pasta de saída e cabeçalhos.

Para publicar sob um caminho, compile com `npm run build -- --base=/seu-caminho/`.

## Créditos

Projeto de portfólio de Artur Guerra. Imagens criadas para esta demonstração. Fontes Manrope e Space Grotesk distribuídas sob SIL Open Font License; licenças em `public/fonts/`. Modelos 3D são interpretações conceituais e não reproduções industriais.

Os produtos, preços, condições comerciais e garantias são fictícios. Nenhum backend, pagamento real ou serviço de envio é integrado.
