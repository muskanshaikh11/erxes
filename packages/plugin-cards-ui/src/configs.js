module.exports = {
  name: "cards",
  port: 3003,
  exposes: {
    "./routes": "./src/routes.tsx",
    "./settings": "./src/Settings.tsx",
  },
  routes: {
    url: "http://localhost:3003/remoteEntry.js",
    scope: "deals1",
    module: "./routes",
  },
  menus: [
    {
      text: "Sales Pipeline",
      url: "/deal",
      icon: "icon-piggy-bank",
      location: "mainNavigation",
      permission: "showDeals",
    },
    {
      text: "Task",
      url: "/task",
      icon: "icon-file-check-alt",
      location: "mainNavigation",
      permission: "showConversations",
    },
    {
      text: "Ticket",
      url: "/ticket/board",
      icon: "icon-ticket",
      location: "mainNavigation",
      permission: "showTickets",
    },
    {
      text: "Growth Hacking",
      url: "/growthHack",
      icon: "icon-idea",
      location: "mainNavigation",
      permission: "showGrowthHacks",
    },
    {
      text: "Sales Pipelines",
      to: "/settings/boards/deal",
      image: "/images/icons/erxes-25.png",
      location: "settings",
      scope: "deals",
      component: "./settings",
      permissions: [
        "dealBoardsAdd",
        "dealBoardsEdit",
        "dealBoardsRemove",
        "dealPipelinesAdd",
        "dealPipelinesEdit",
        "dealPipelinesUpdateOrder",
        "dealPipelinesRemove",
        "dealPipelinesArchive",
        "dealPipelinesArchive",
        "dealStagesAdd",
        "dealStagesEdit",
        "dealStagesUpdateOrder",
        "dealStagesRemove",
      ],
    },
    {
      text: "Task Pipelines",
      to: "/settings/boards/task",
      image: "/images/icons/erxes-13.svg",
      location: "settings",
      scope: "deals",
      component: "./settings",
      permissions: [
        'taskBoardsAdd',
        'taskBoardsEdit',
        'taskBoardsRemove',
        'taskPipelinesAdd',
        'taskPipelinesEdit',
        'taskPipelinesUpdateOrder',
        'taskPipelinesRemove',
        'taskPipelinesArchive',
        'taskPipelinesCopied',
        'taskStagesAdd',
        'taskStagesEdit',
        'taskStagesUpdateOrder',
        'taskStagesRemove',
        'tasksAll'
      ],
    },
    {
      text: "Ticket Pipelines",
      to: "/settings/boards/ticket",
      image: "/images/icons/erxes-19.svg",
      location: "settings",
      scope: "deals",
      component: "./settings",
      permissions: [
        'ticketBoardsAdd',
        'ticketBoardsEdit',
        'ticketBoardsRemove',
        'ticketPipelinesAdd',
        'ticketPipelinesEdit',
        'ticketPipelinesUpdateOrder',
        'ticketPipelinesRemove',
        'ticketPipelinesArchive',
        'ticketPipelinesCopied',
        'ticketStagesAdd',
        'ticketStagesEdit',
        'ticketStagesUpdateOrder',
        'ticketStagesRemove'
      ],
    },
    {
      text: "Growth Hacking Templates",
      to: "/settings/boards/growthHack",
      image: "/images/icons/erxes-12.svg",
      location: "settings",
      scope: "deals",
      component: "./settings",
      permissions: [
        'growthHackTemplatesAdd',
        'growthHackTemplatesEdit',
        'growthHackTemplatesRemove',
        'growthHackTemplatesDuplicate',
        'showGrowthHackTemplates'
      ],
    }
  ],
};
