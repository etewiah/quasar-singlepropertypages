const routes = [
  {
    path: "/",
    component: () => import("layouts/SppLayout.vue"),
    children: [
      {
        path: "",
        name: "rBvhHomePage",
        component: () => import("src/pages/SppHomePage.vue"),
        children: [
        ]
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
      // {
      //   path: "p/spp/:listings_grouping/",
      //   name: "rSppsContainer",
      //   component: () => import("pages/listings-container.vue"),
      //   // children: [
      //   //   {
      //   //     path: ":listing_slug",
      //   //     name: "rSppEdit",
      //   //     component: () => import("src/pages/SppEdit.vue"),
      //   //   },
      //   //   {
      //   //     path: ":listing_slug/preview",
      //   //     name: "rSppPreview",
      //   //     component: () => import("src/pages/SppPreview.vue"),
      //   //   },
      //   // ]
      // }
    ]
  },
  // {
  //   path: "/login",
  //   name: "rBvhLoginPage",
  //   component: () => import("src/pages/SppHomeLogin.vue"),
  // },
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Index.vue') }
  //   ]
  // },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
]

export default routes
