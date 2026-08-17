# How to run this site

Written for someone who has never done this. No coding required beyond copying and pasting.
No em dashes anywhere, including in the copy on the pages.

---

## What you have

```
site/
  index.html              home page: intro, project grid, method, capabilities
  about.html              your story, what you believe, the honest gaps
  README.md               this file
  Sizo-Manana-CV.pdf      you add this yourself, see step 3
  work/
    cambridge.html        Cambridge Commodities quote cockpit
    evara-cpq.html        Evara internal CPQ platform, with the YouTube video
    employmate.html       Employmate CRO
    dayshape.html         Dayshape rebuild and roadmap
    ruleguard.html        Ruleguard CRO and instrumentation
  assets/
    css/site.css          all the styling for every page, in one file
    img/
      me/                 your photo
      cambridge/          images for that case study
      evara-cpq/
      employmate/
      dayshape/
      ruleguard/
```

**The one thing to understand:** every page shares `assets/css/site.css`. Change a colour or a font size
there once and it changes on all seven pages. You never need to touch styling inside the page files.

---

## Step 1. Open it and look at it

Double click `index.html`. It opens in your browser and works completely offline. Click around all
seven pages. Nothing you do here can break anything, and nothing is public yet.

You will see dashed orange boxes. **Those are the slots where your images go.** Each one tells you the
exact filename to use. That is deliberate, so you never have to guess.

---

## Step 2. Add your images

### Exporting from Figma

1. Select the frame you want
2. In the right hand panel, scroll to **Export**
3. Click **+**, choose **JPG**, set the scale to **2x**
4. Click **Export**

Aim for images around 1600 to 2400px wide. Anything larger just makes the page slow.

### Naming and placing them

Save each file with **exactly** the name the dashed box asks for, in the folder it names. Filenames are
case sensitive, so `cover.jpg` and `Cover.JPG` are different files as far as the browser is concerned.

Start with these five, because they are the project thumbnails on the home page:

```
assets/img/cambridge/cover.jpg
assets/img/evara-cpq/cover.jpg
assets/img/employmate/cover.jpg
assets/img/dayshape/cover.jpg
assets/img/ruleguard/cover.jpg
assets/img/me/portrait.jpg
```

Those six will start working the moment you save them, with no editing at all. The home page and About
page are already looking for them.

### Replacing a slot inside a case study

Open the page in any plain text editor. Notepad, TextEdit or VS Code all work. Find the dashed box,
which looks like this:

```html
<div class="slot"><strong>Hero image goes here</strong> ... </div>
```

Delete that whole `<div class="slot">...</div>` block and put this in its place:

```html
<img src="../assets/img/cambridge/component-widths.jpg" alt="Describe what the image shows">
```

Two rules:

- Inside the `work/` folder, image paths start with `../assets/` because you are one folder deep
- On `index.html` and `about.html` they start with `assets/`

**Always write real alt text.** Describe what the image shows, not "screenshot". It matters for
accessibility, and on a page where you claim WCAG knowledge somebody will check.

---

## Step 3. Add your CV

Export your CV as a PDF named **exactly** `Sizo-Manana-CV.pdf` and put it in the `site` folder next to
`index.html`. The Download CV buttons already point at it.

If you would rather not publish your CV, delete the four buttons that say `Download CV`. Leaving them
pointing at a missing file gives visitors a 404, which is a bad look on a page about user experience.

---

## Step 4. Embed a Figma prototype

This is the strongest thing on the site when it works, because someone can click through your actual flow.

1. Open the prototype in Figma
2. Click **Share**
3. Click **Get embed code**
4. From the code Figma gives you, copy only the URL inside `src="..."`
5. In the page, find the prototype slot and replace the whole `<div class="slot">...</div>` with:

```html
<iframe src="PASTE-THE-URL-HERE" allowfullscreen title="Quote cockpit prototype"></iframe>
```

**Before you do this, read the next line properly.** Embedding makes that Figma file publicly viewable
to anyone with the link. For Evara client work that is a bigger step than showing a screenshot, and it
needs Fran's written permission first. Your own from scratch work needs nobody's permission.

---

## Step 5. Publish it, about fifteen minutes

GitHub Pages is free forever, has no ads, and does not expire.

1. Create an account at **github.com**. Your username becomes part of your web address, so pick
   something sensible. `sizomanana` gives you `sizomanana.github.io`
2. Click **+** in the top right, then **New repository**
3. Name it **exactly** `sizomanana.github.io`, substituting your real username. It must match your
   username exactly, including the `.github.io` part, or this will not work
4. Set it to **Public**. Private repositories cannot use Pages on the free plan
5. Click **Create repository**
6. Click **uploading an existing file**
7. Drag in **everything inside the `site` folder**, not the folder itself. That means `index.html`,
   `about.html`, `README.md`, and the `work` and `assets` folders
8. Scroll down, click **Commit changes**
9. Go to **Settings**, then **Pages** in the left sidebar
10. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch to **main**, folder to
    **/ (root)**, then **Save**
11. Wait two or three minutes, then visit `https://sizomanana.github.io`

### Updating it later

Open the repository, click the file, click the pencil icon to edit in the browser, make your change,
click **Commit changes**. Live in about a minute. To add images, use **Add file** then **Upload files**.

### If it does not work

- **404 page:** the repository name almost certainly does not match your username exactly. Check it
  character by character
- **Still 404 after ten minutes:** confirm `index.html` is at the top level of the repository, not
  inside a folder called `site`
- **Changes not showing:** hard refresh with Ctrl+Shift+R, or Cmd+Shift+R on a Mac
- **Images not appearing:** the filename or the folder path does not match. Check capital letters

---

## Step 6. Put the link everywhere

- LinkedIn **Contact info** as your website
- LinkedIn **Featured**, as the second item after the CPQ video
- The header of your CV, replacing `[portfolio URL once live]`
- Your email signature
- Every application

---

## What to do first if you are short on time

1. The six cover images and your portrait. Six files, no editing, and the site stops looking unfinished
2. Publish it. A live link you can put in an application this week beats a perfect one in three weeks
3. Everything else can be added while it is already live

---

## Two things to change once you have them

**Cambridge and Ruleguard case studies.** Both are marked as publishing soon on the home page. When
Evara publishes them, add the links the same way the Employmate and Dayshape pages do.

**Your own from scratch piece.** The strongest thing you could add is a case study nobody needs to
approve: an audit of a public fintech site, or a written piece on designing inside HubSpot UI extension
constraints. Create a new file by copying `work/ruleguard.html`, renaming it, and replacing the content.
Then add a card for it on `index.html` by copying one of the existing `<a class="card">` blocks.
