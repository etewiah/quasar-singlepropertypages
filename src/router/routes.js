const routes = [
  {
    path: "/",
    component: () => import("layouts/SppLayout.vue"),
    children: [
      {
        path: "",
        name: "rHomePage",
        component: () => import("src/pages/SppHomePage.vue"),
        children: [
        ]
      },
      {
        path: "source-html",
        name: "rSourceHtml",
        component: () => import("src/pages/SourceHtml.vue"),
        children: [
        ]
      },
      {
        path: "mortgage-calculator",
        name: "rMortgageCalculator",
        component: () => import("src/pages/MortgageCalculator.vue"),
        children: [
        ]
      },
      {
        path: "b/:board_uuid",
        name: "rBoardOverview",
        component: () => import("src/pages/BoardOverview.vue"),
      },
      {
        path: "p/spp/:listings_grouping/:listing_slug",
        name: "rSppEdit",
        component: () => import("src/pages/SppEdit.vue"),
      },
      {
        path: "p/spp/:listings_grouping/:listing_slug/preview",
        name: "rSppPreview",
        component: () => import("src/pages/SppPreview.vue"),
      },
      {
        path: "/login",
        name: "rLoginPage",
        component: () => import("src/pages/SppLogin.vue"),
      },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
]

export default routes
