export default {
  root: {
    name: "/",
    displayName: "navigationRoutes.home",
  },
  routes: [
    {
      name: "dashboard",
      displayName: "menu.dashboard",
      meta: {
        icon: "vuestic-iconset-dashboard",
      },
      admin: false,
    },
    {
      name: "pixel",
      displayName: "Comprar Pixel",
      meta: {
        icon: "fa-solid fa-money-bill-wave",
      },
      admin: false,
    },
    {
      name: "my-pixel",
      displayName: "Meus Pixels",
      meta: {
        icon: "fa-solid fa-bag-shopping",
      },
      admin: false,
    },
    {
      name: "personal-info",
      displayName: "Informações Pessoais",
      meta: {
        icon: "fa-solid fa-user",
      },
      admin: false,
    },
    {
      name: "sortition",
      displayName: "Sorteios",
      meta: {
        icon: "fa-duotone fa-chart-bar",
      },
      admin: true,
    },
    {
      name: "NFT",
      displayName: "NFTs",
      meta: {
        icon: "fa-solid fa-cubes",
      },
      admin: true,
    },
  ],
};
