function tab(story) {
  return story.data.reduce((acc, item) => {
    var url = story.source === "RK" ? "http://www.risingkashmir.com/news/" : "http://www.greaterkashmir.com";
    var content = item.content ? `<p>${item.content}</p>` : "";
    var storyItem = `
<li class="tab-item">
  <h3 class="tab-title">
    <a href=${url}${item.url}>${item.title}</a>
  </h3>
  ${content}
</li>
    `;
    acc += storyItem;

    return acc;
  }, '');
}

module.exports = tab;
