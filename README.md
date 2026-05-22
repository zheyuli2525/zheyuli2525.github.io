# Academic Homepage

This is a static GitHub Pages homepage inspired by two common academic styles:

- A sidebar-centered AcademicPages layout with profile information and social links.
- A modern single-page profile with hero, research interests, featured work, timeline, publications, news, service, and contact sections.

## Customize

Edit `site-data.js`.

Most visible content lives in that one file:

- `name`, `nameNative`, `role`, `affiliation`, `location`, `email`
- `photo`: replace `assets/profile-placeholder.svg` with your own photo path
- `cv`: use a public, redacted PDF or leave it as `#` until the file is ready
- `links`: Google Scholar, GitHub, LinkedIn, ORCID
- `about`, `interests`, `featuredWork`, `timeline`, `publications`, `news`, `service`

For a real profile photo, place an image such as `assets/profile.jpg` and set:

```js
photo: "assets/profile.jpg"
```

## Deploy On GitHub Pages

This repository is named `Gerald2525.github.io`, so GitHub Pages should publish it at:

`https://Gerald2525.github.io/`

If it does not appear after a few minutes, open Settings -> Pages and publish from the `main` branch root.

## Local Preview

Open `index.html` directly in a browser. No build step is required.
