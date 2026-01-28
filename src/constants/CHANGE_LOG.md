# Supabase Projects Migration

This repo migrated the portfolio “projects” content from a JavaScript constant (`projects[]`) into a Supabase Postgres table. The goal is to manage portfolio content in the database (and optionally Supabase Storage) instead of hard-coded frontend data.

## Goals

- Move project content into Supabase for easier editing and deployment.
- Replace multi-paragraph `description[]` with:
  - a single, short **pitch/trailer-style** `description`
  - bullet-friendly arrays for **Key Features** and **My Contributions**
- Keep the schema simple (minimal joins) while remaining scalable.

---

## Data Model

### Table: `projects`

**Core columns**

- `id uuid primary key default gen_random_uuid()`
- `created_at timestamp default now()`
- `updated_at timestamp` (optional; add trigger if desired)
- `title text not null`
- `tagline text`
- `description text` (single “trailer/pitch” paragraph)
- `start_year int`
- `end_year int`
- `project_type project_type` (enum)
- `demo_link text`
- `github text`

**Arrays for display**

- `images text[] default '{}'`  
  Stores image paths or URLs. In production, these should become Supabase Storage public URLs.
- `tools text[] default '{}'`  
  Denormalized list of tools used (strings), rendered as badges in the UI.
- `project_tag project_tag[] default '{}'` (enum array)
- `key_features text[] default '{}'`  
  Bullet list of user-facing features.
- `my_contributions text[] default '{}'`  
  Bullet list of what was built/delivered (implementation + design contributions).

---

## Why Arrays Instead of Normalized Tables?

This portfolio needs fast reads and simple editing. Arrays (`text[]`) are ideal here because:

- Projects render in 1 query (no joins needed).
- Editing bullets in Supabase UI is straightforward.
- Tools/tags/features are primarily presentation concerns.

If the portfolio later requires filtering pages like “All Unity projects” with rich tool metadata, we can normalize tools into `tools` + `project_tools` join tables. For v1, arrays are intentional.

---

## Migration Summary

### 1) Initial Insert (JS → DB)

The original project data lived in a JS file:

- `description` was an array of paragraphs
- `tags` were simple strings
- `tools` referenced frontend tool icon objects
- `images` were local `require(...)` assets

**During migration**

- `description[]` → single text paragraph (`description`)
- remaining paragraphs → initially stored as `my_contributions` (later rewritten as bullets)
- `tools` → stored as strings (`text[]`)
- `images` → stored as string paths (replace later with Storage URLs)

**SQL script created:** `insert_projects.sql`  
(Contains a single bulk `insert into projects (...) values (...)`)

---

### 2) Rewrite Descriptions as “Pitch/Trailer” Intros

After insert, we rewrote `projects.description` to be concise and attention-grabbing for a new visitor.

**SQL script created:** `update_project_descriptions.sql`

- Updates `description` by `title`
- No other fields changed

---

### 3) Convert Long Paragraphs into Bullet Arrays

We then updated each project to have:

- `key_features`: user-facing bullet list
- `my_contributions`: implementation-focused bullet list

**SQL script created:** `update_features_and_contributions.sql`

- Updates `key_features` + `my_contributions` by `title`

---

## How to Run

1. Open **Supabase Dashboard → SQL Editor**
2. Run scripts in this order:

1) Create/verify schema + enums
2) `insert_projects.sql`
3) `update_project_descriptions.sql`
4) `update_features_and_contributions.sql`

All scripts use `begin; ... commit;` so they run atomically.

---

## Enums

This setup assumes:

### `project_type` enum includes:

- `Academic`
- `Club`
- `Personal`

### `project_tag` enum includes:

- `Web`
- `Games`
- `UI/UX`

If you get an error like:

> invalid input value for enum project_tag: "UI/UX"

Then your enum values differ (example: `UI_UX` instead of `UI/UX`). Update the insert/update scripts to match the exact enum labels.

---

## Images (Local → Supabase Storage)

Right now `images` contains string paths like:

- `projects/high-bridge/1.png`

Recommended next step:

1. Create a Supabase Storage bucket (e.g., `portfolio`)
2. Upload images using a consistent structure:
   - `projects/<slug>/<filename>.png`
3. Use the **public URL** in the `images` array.

Later enhancement: create a `project_images` table for captions, ordering, and different media types (gif/webp).

---

## Frontend Usage

Example render patterns:

```ts
// Projects list
const { data: projects } = await supabase
  .from('projects')
  .select('*')
  .order('start_year', { ascending: false });

// Project page bullets
project.key_features.map(...)
project.my_contributions.map(...)
project.tools.map(...)
```
