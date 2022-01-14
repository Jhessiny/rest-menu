const tabsList = document.querySelector(".tabs");
const sections = document.querySelector(".sections");

async function getMenuItems() {
  return await (await fetch("menu.json")).json();
}

const allTabs = [
  {
    id: "tab-all",
    content: "all",
    isActive: true,
  },
  {
    id: "tab-burgers",
    content: "burgers",
    isActive: false,
  },
  {
    id: "tab-appetizers",
    content: "appetizers",
    isActive: false,
  },
  {
    id: "tab-desserts",
    content: "desserts",
    isActive: false,
  },
];

tabsList.addEventListener("click", (e) => {
  allTabs.forEach((tab) => {
    if (tab.id === e.target.id) tab.isActive = true;
    else tab.isActive = false;
  });
  updateUi();
});

function generateSections(menuItems) {
  allTabs.forEach((tab) => {
    const section = document.createElement("ul");
    section.classList.add("menu-section");
    if (tab.content === "all") section.classList.add("menu-section--active");
    section.setAttribute("id", tab.content);

    const currentItems = menuItems.filter((item) => {
      if (tab.content === "all") return item;
      return item["tab-content"] === tab.content;
    });

    currentItems.forEach((item, index) => {
      const html = `
          <li class="menu-section__item">
            <img src="${item.image}" alt="" />
            <div class="menu-section__item-info">
              <h2 class="menu-section__item-name">${item.name}</h2>
              <span>R$ ${item.price}</span>
            </div>
          </li>`;
      section.insertAdjacentHTML("beforeend", html);
    });
    sections.appendChild(section);
  });
}

function updateUi() {
  allTabs.forEach((tab) => {
    const tabContentList = document.querySelector(`#${tab.content}`);
    const tabEl = document.querySelector(`#${tab.id}`);
    if (tab.isActive) {
      tabEl.classList.add("tabs__item--active");
      tabContentList.classList.add("menu-section--active");
    } else {
      tabEl.classList.remove("tabs__item--active");
      tabContentList.classList.remove("menu-section--active");
    }
  });
}

(async function start() {
  const menuItems = await getMenuItems();
  generateSections(menuItems);
})();
