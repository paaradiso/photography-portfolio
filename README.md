# Photography Portfolio

My personal photography portfolio.

## Tech Stack
- **Framework:** [Svelte 5 with SvelteKit](https://svelte.dev/)
- **Components:** [shadcn-svelte](https://shadcn-svelte.com/)
- **Storage:** S3-compatible object storage
- **Image Optimisation**: [wsrv.nl](https://wsrv.nl/)

## Structure
Photos are organised in folders, each with a `metadata.yaml` file to provide context and tags. The root folder includes a `metadata.yaml` file with a list of all tags available across the portfolio.

<details>
<summary>Example of folder-specific <code>metadata.yaml</code></summary>

```yaml
title: NYC 2024
date: 2024-02
description: Photography in New York City.
tags: ["black-and-white", "street", "urban"]
photos: # Photo metadata is optional.
    1.jpg:
        title: Oswald
        description: Portrait of my friend, Oswald, in Times Square
        tags: ["portrait"]
    2.jpg:
        tags: ["landscape"]
```

</details>

<details>
<summary>Example of root <code>metadata.yaml</code></summary>

```yaml
tags:
    - black-and-white
    - street
    - urban
```

</details>

## Development
1. **Clone the repository**:
   ```bash
   git clone https://github.com/paaradiso/photography-portfolio.git
   ```
2. **Install dependencies**:
   ```bash
   cd photography-portfolio
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```
