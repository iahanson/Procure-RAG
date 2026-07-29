## Table of Contents

- [Assistant Strengths](#assistant-strengths)
- [How it works](#how-it-works)
- [Limitations](#limitations)
- [Deployment process](#deploy-application)
- [Future Additions](#future-additions)


This assistant is a RAG (Retrieval Augmented Generation) chat application, it has been specially optimized and trained to utilize available enterprise data.



## Assistant Strengths 💪

RAG application excels at sifting through a large corpus of unstructured data and finding the most appropriate reference documentation relating to a user query.  The reference information is added to a LLM prompt to give timely and contextually relevant answers to guidance and policy issues.



## How it works ⚙️

### Data Ingestion

There are multiple steps for proper data ingestion:  Look at predocs folder for stategies.  Current data is knowledge store is mostly PDF based and data ingestion is primarily used through local pdf parser to save money with Doc Intelligence.


#### HTML Parsing

Upon running `prepdocs.sh`, all HTML documents in the `/data` folder are parsed with a custom local parser. The HTML parser is customised for the existing websites and will look for id=main.  If this doesn not work for any additional websites, then further customisation of the HTML parser will be needed.

#### Search Index Chunking

Chunking strategy is to follow full sentences and chunk the document at aroudn 500 tokens.  Currently the strategy overlaps chunks by 10% to retain context.

### Azure Search Index Structure

A search index is created to store the parsed PDF and HTML files to facilitate proper data retrieval.  The index is populated with all files in the `/data/` directory. 

### Chat Approach

This application implements the **read-retrieve-read** approach to interacting with GPT and the Azure Search Index. The original user query is sent to the LLM in order to extact specifc fields and choose a query type for the search index. The generated search query is then normalized and executed on the Azure Search Index with appropriate filtering. The results are sent back to the LLM for answer synthesis and displayed to the user.

### Prompt Engineering

Application largely follows standard assistant behavior.

## Limitations 🙅‍♂️

This application currently has some limitations that many impact its ability to help with all questions.  

Updated documents - need a method for automating checks for updaing documents in knowledge base.

## Deploy application

### Prerequisites (Docker-free)

- **Python 3.12** (this repo targets 3.12; the `cs-rag` conda env is the canonical dev env).
- **Node.js >= 22.12** (24.x LTS works).
- **Azure Developer CLI (`azd`)**.
- **Windows: Long Paths enabled** in the registry (`HKLM\SYSTEM\CurrentControlSet\Control\FileSystem\LongPathsEnabled = 1`), reboot required. This is needed by `msgraph-sdk`, which has file paths exceeding the legacy 260-char limit.

### Local development

```powershell
# From the repo root
conda activate cs-rag
pip install -r app\backend\requirements.txt

cd app\frontend
npm install
npm run build   # writes bundle to ../backend/static

cd ..\..
.\scripts\verify.ps1   # optional: runs backend pytest + frontend build
```

Backend is served by Quart via `app\start.ps1` (which populates env from `azd env`).

### Deploying to Azure (no Docker)

1. Follow the process document for provisioning Azure infrastructure (Search, OpenAI, App Service, Storage, etc.).
2. `azd env new <name>` (or `azd env select <name>` if already created). Populate the `.env` file with the required variables.
3. `azd auth login`
4. `azd up` — this will (a) provision any Bicep in `infra/` (currently minimal, infra is managed out-of-band), (b) run the `prepackage` hook that builds the frontend, (c) deploy the backend to App Service (Oryx build, **no Docker**), and (d) run the `postprovision` hooks that call `scripts\auth_update.ps1` and `scripts\prepdocs.ps1` to ingest documents from `/data` into the search index.
5. For code-only redeploys: `azd deploy`.
6. To ingest new documents without redeploying, run `scripts\prepdocs.ps1` directly (requires a valid `azd env`).

### Legacy: Docker / Codespaces

A `Dockerfile` and `.devcontainer/` are retained in the repo for users who prefer that flow, but they are **not** required for local dev or `azd` deploy. See `MODERNIZATION_NOTES.md` for the deliberate decisions.

## Future Additions 🔮

* Attach to CosmosDB to allow for user feedback (thumbs  up/down) which will give greater evaluation power to model
* Bring in functionality to upload additional documents
* Bring in GPT vision functionality - additional costs
* Automate checks and ingenstion of updated docs
