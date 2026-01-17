// Accordion functionality for setting items
document.addEventListener("DOMContentLoaded", function () {
  const accordionButtons = document.querySelectorAll(".setting-acd");

  accordionButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const settingItem = this.closest(".setting-item");
      const isActive = settingItem.classList.contains("active");

      // Close all accordions
      document.querySelectorAll(".setting-item").forEach(function (item) {
        item.classList.remove("active");
      });

      // Toggle the clicked accordion
      if (!isActive) {
        settingItem.classList.add("active");
      }
    });
  });
});
