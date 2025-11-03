// --- Update Year in Footer ---
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});

// --- Markdown Parser for Dev Log ---
function parseMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br>");
}

// --- Fetch and Render Dev Log ---
fetch("data/devlog.json")
  .then((response) => response.json())
  .then((logs) => {
    logs.sort((a, b) => new Date(b.date) - new Date(a.date));

    const feed = document.getElementById("devlog-feed");
    if (!feed) return;

    logs.forEach((day) => {
      const section = document.createElement("div");
      section.classList.add("dev-entry");
      section.innerHTML = `<h3>${day.date}</h3>`;

      day.entries.forEach((item) => {
        section.innerHTML += `
          <h4>${item.title}</h4>
          <p>${parseMarkdown(item.content)}</p>
        `;
      });

      feed.appendChild(section);
    });
  })
  .catch((err) => console.error("Failed to load dev log:", err));

// --- Tooltip for "Companies I Work For" ---
document.addEventListener("DOMContentLoaded", () => {
  const companiesCard = document.getElementById("companies-card");
  const tooltip = document.getElementById("companies-tooltip");

  if (companiesCard && tooltip) {
    companiesCard.addEventListener("mouseenter", () => {
      tooltip.style.display = "block";
    });

    companiesCard.addEventListener("mousemove", (e) => {
      tooltip.style.left = `${e.pageX + 16}px`;
      tooltip.style.top = `${e.pageY + 16}px`;
    });

    companiesCard.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
  }
});

fetch("data/projects.json")
  .then((res) => res.json())
  .then((data) => {
    const archive = document.getElementById("archive-content");
    let totalProjects = 0;

    Object.entries(data).forEach(([category, projects]) => {
      if (category !== "Commercial / Brand") {
        totalProjects += projects.length;
      }

      const section = document.createElement("div");
      section.innerHTML = `
        <h3>${category}</h3>
        <div class="project-grid">
          ${projects
            .map((p) => {
              const hasLink = !!p.url;
              const card = `
                <div class="project-card${hasLink ? " has-link" : ""}" ${hasLink ? `onclick="window.open('${p.url}','_blank')"` : ""}>
                  ${hasLink ? '<i class="fa-solid fa-circle-info info-icon"></i>' : ""}
                  <span>${p.title}</span>
                </div>`;
              return card;
            })
            .join("")}
        </div>
      `;
      archive.appendChild(section);
    });

    const projectCountCard = document.querySelector(".stat-card .value");
    if (projectCountCard) projectCountCard.textContent = totalProjects;
  })
  .catch((err) => console.error("Error loading projects:", err));



