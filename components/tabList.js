const tab = require('./tab');

function tabList(tabListData) {
  return JSON.parse(tabListData).reduce((acc, story) => {
    var tabItem = tab(story);
    var checked = story.source === "RK" ? "checked" : ""
    var tabWrapper = `
<div class="tab">
  <input type="radio" id="tab__${story.source}" name="news" class="radio" ${checked} />
  <label for="tab__${story.source}" class="label label__${story.source}">${story.source}</label>
  <ul class="tab-list ${story.source}">
    ${tabItem}
  </ul>
</div>
    `;
    acc += tabWrapper;

    return acc;
  }, '');
};

module.exports = tabList;
