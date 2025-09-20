document.getElementById("min-btn").addEventListener("click", () => {
  window.electronAPI.windowControl("minimize");
});

document.getElementById("close-btn").addEventListener("click", () => {
  window.electronAPI.windowControl("close");
});

const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", () => {
  window.electronAPI.openPageAndClose("mainpage"); // 👈 loads mainpage.html and closes this window
});

// Listen for page errors
if (window.electronAPI.onPageError) {
  window.electronAPI.onPageError((event, error) => {
    console.error('Page navigation error:', error);
    alert(`Navigation error: ${error}`);
  });
}
