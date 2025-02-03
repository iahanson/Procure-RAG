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

1. Follow the process document for deploying RAG applications to Azure to set up appropriate cloud infrasctucture 
2. Ensure that you have an Azure environment - run <azd env init> to initialise an env.  This will create a .azure folder with a .env file.  Populate the .env file with appropriate variables.
3. run <azd package> to package all the software requirements
4. run <azd provision> to create virtual python env in the docker container and run data processing files.  This command will provision all infrastructure if there are any bicep files, but the current repo only has a blank main.bicep.  All data in the /data folder will be processed, embeddings created, ingested into the seach index and uploaded to blob storage
5. run <azd deploy> to deploy codebase to exisiting web service in Azure

## Future Additions 🔮

* Attach to CosmosDB to allow for user feedback (thumbs  up/down) which will give greater evaluation power to model
* Bring in functionality to upload additional documents
* Bring in GPT vision functionality - additional costs
* Automate checks and ingenstion of updated docs
