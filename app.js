const data = window.SITE_DATA || {};

const byId = (id) => document.getElementById(id);
const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const safeUrl = (url) => {
  if (!url) return "#";
  const value = String(url).trim();
  if (value.startsWith("mailto:") || value.startsWith("#") || value.startsWith("/") || value.startsWith("assets/")) {
    return value;
  }
  try {
    const parsed = new URL(value);
    return ["http:", "https:"].includes(parsed.protocol) ? value : "#";
  } catch {
    return "#";
  }
};

const renderLinkedText = (value = "", linkMap = {}, className = "text-link") => {
  const text = String(value);
  const entries = Object.entries(linkMap)
    .filter(([label, url]) => label && url)
    .sort((a, b) => b[0].length - a[0].length);

  if (!entries.length) return escapeHtml(text);

  let html = "";
  let index = 0;
  while (index < text.length) {
    const match = entries.find(([label]) => text.startsWith(label, index));
    if (match) {
      const [label, url] = match;
      html += `<a class="${className}" href="${safeUrl(url)}">${escapeHtml(label)}</a>`;
      index += label.length;
    } else {
      html += escapeHtml(text[index]);
      index += 1;
    }
  }

  return html;
};

const setTextFields = () => {
  document.querySelectorAll("[data-field]").forEach((node) => {
    const key = node.getAttribute("data-field");
    if (data[key]) node.textContent = data[key];
  });
  document.title = `${data.name || "Academic Homepage"} | Homepage`;
};

const renderProfile = () => {
  const photo = byId("profile-photo");
  if (photo) {
    photo.src = data.photo || "assets/profile-placeholder.svg";
    photo.alt = `${data.name || "Profile"} photo`;
  }

  const facts = byId("profile-facts");
  facts.innerHTML = (data.facts || [])
    .map((item) => {
      const value = item.url
        ? `<a href="${safeUrl(item.url)}">${escapeHtml(item.value)}</a>`
        : escapeHtml(item.value);
      return `<li><strong>${escapeHtml(item.label)}</strong><span>${value}</span></li>`;
    })
    .join("");

  const links = byId("social-links");
  links.innerHTML = (data.links || [])
    .map((item) => `<a href="${safeUrl(item.url)}">${escapeHtml(item.label)}</a>`)
    .join("");

  const emailHref = `mailto:${data.email || "your.email@example.edu"}`;
  byId("email-link").href = emailHref;
  byId("footer-email-link").href = emailHref;
  byId("cv-link").href = safeUrl(data.cv);
};

const renderTags = () => {
  byId("hero-tags").innerHTML = (data.tags || [])
    .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join("");
};

const renderAbout = () => {
  byId("about-copy").innerHTML = (data.about || [])
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");

  byId("metrics").innerHTML = (data.metrics || [])
    .map((metric) => `<div class="metric"><strong>${escapeHtml(metric.value)}</strong><span>${escapeHtml(metric.label)}</span></div>`)
    .join("");
};

const renderResearch = () => {
  byId("interest-list").innerHTML = (data.interests || [])
    .map((interest) => `<div class="interest-item"><span class="interest-marker"></span><span>${escapeHtml(interest)}</span></div>`)
    .join("");

  byId("featured-work").innerHTML = (data.featuredWork || [])
    .map(
      (item) => `
        <article class="work-card">
          <span class="label">${escapeHtml(item.label)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
          <a href="${safeUrl(item.url)}">View details</a>
        </article>
      `
    )
    .join("");
};

const renderTimeline = () => {
  byId("timeline-list").innerHTML = (data.timeline || [])
    .map(
      (item) => `
        <li>
          <span class="date">${escapeHtml(item.date)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
        </li>
      `
    )
    .join("");
};

const renderPublications = () => {
  byId("publication-list").innerHTML = (data.publications || [])
    .map((pub) => {
      const links = (pub.links || [])
        .map((link) => `<a class="pub-link" href="${safeUrl(link.url)}">${escapeHtml(link.label)}</a>`)
        .join("");
      return `
        <article class="publication">
          <div class="pub-venue">${escapeHtml(pub.venue)}</div>
          <div>
            <h3>${escapeHtml(pub.title)}</h3>
            <p class="pub-authors">${renderLinkedText(pub.authors, data.authorLinks, "author-link")}</p>
            <p>${escapeHtml(pub.details)}</p>
            <div class="pub-links">${links}</div>
          </div>
        </article>
      `;
    })
    .join("");
};

const renderNews = () => {
  byId("news-list").innerHTML = (data.news || [])
    .map((item) => `<li><span class="news-date">${escapeHtml(item.date)}</span><span>${escapeHtml(item.text)}</span></li>`)
    .join("");
};

const renderService = () => {
  byId("service-list").innerHTML = (data.service || [])
    .map(
      (group) => `
        <section class="service-group">
          <h3>${escapeHtml(group.title)}</h3>
          <ul>${(group.items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
      `
    )
    .join("");
};

const setupNavigation = () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = byId("nav-links");
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
};

const renderFooter = () => {
  byId("footer-year").textContent = `- ${new Date().getFullYear()}`;
};

setTextFields();
renderProfile();
renderTags();
renderAbout();
renderResearch();
renderTimeline();
renderPublications();
renderNews();
renderService();
renderFooter();
setupNavigation();