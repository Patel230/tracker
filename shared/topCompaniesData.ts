export interface SeedCompany {
  name: string;
  category: "company" | "startup" | "remote" | "visa_remote" | "india_tech" | "ai_yc";
  portal_url: string;
  location?: string;
  job_title?: string;
  actively_hiring?: boolean;
  visa_sponsorship?: boolean;
}

export const TOP_COMPANIES: SeedCompany[] = [
  {
    "name": "OpenAI",
    "category": "ai_yc",
    "portal_url": "https://openai.com/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Anthropic",
    "category": "ai_yc",
    "portal_url": "https://www.anthropic.com/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - AI Safety & Systems"
  },
  {
    "name": "Cursor (Anysphere)",
    "category": "ai_yc",
    "portal_url": "https://www.cursor.com/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend / Systems Engineer (AI Code Assistant)"
  },
  {
    "name": "Perplexity AI",
    "category": "ai_yc",
    "portal_url": "https://www.perplexity.ai/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - Search & LLM Infrastructure"
  },
  {
    "name": "Scale AI",
    "category": "ai_yc",
    "portal_url": "https://scale.com/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Backend Engineer - Data & AI Platform"
  },
  {
    "name": "Cohere",
    "category": "ai_yc",
    "portal_url": "https://cohere.com/careers",
    "location": "Toronto / SF / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - Enterprise LLM Serving"
  },
  {
    "name": "Mistral AI",
    "category": "ai_yc",
    "portal_url": "https://mistral.ai/careers",
    "location": "Paris / SF / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Backend Engineer - Open AI Models"
  },
  {
    "name": "Midjourney",
    "category": "ai_yc",
    "portal_url": "https://www.midjourney.com/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - Generative Media Platform"
  },
  {
    "name": "Runway",
    "category": "ai_yc",
    "portal_url": "https://runwayml.com/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Backend Engineer - Video AI Models"
  },
  {
    "name": "Groq",
    "category": "ai_yc",
    "portal_url": "https://groq.com/careers",
    "location": "Mountain View, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Systems Engineer - LPU Inference Engine"
  },
  {
    "name": "Together AI",
    "category": "ai_yc",
    "portal_url": "https://www.together.ai/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Backend Engineer - Distributed AI Inference"
  },
  {
    "name": "Pinecone",
    "category": "ai_yc",
    "portal_url": "https://www.pinecone.io/careers/",
    "location": "New York, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - Vector Database Engine"
  },
  {
    "name": "Weaviate",
    "category": "ai_yc",
    "portal_url": "https://weaviate.io/careers",
    "location": "Amsterdam / SF / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Backend Engineer - Open Source Vector Search"
  },
  {
    "name": "Qdrant",
    "category": "ai_yc",
    "portal_url": "https://qdrant.tech/careers/",
    "location": "Berlin / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - High Performance Vector DB"
  },
  {
    "name": "LangChain",
    "category": "ai_yc",
    "portal_url": "https://www.langchain.com/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Engineer - LLM Agent Framework"
  },
  {
    "name": "LlamaIndex",
    "category": "ai_yc",
    "portal_url": "https://www.llamaindex.ai/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Engineer - Data Framework for LLMs"
  },
  {
    "name": "Weights & Biases",
    "category": "ai_yc",
    "portal_url": "https://wandb.ai/site/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Backend Engineer - MLOps Platform"
  },
  {
    "name": "Modal",
    "category": "ai_yc",
    "portal_url": "https://modal.com/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python / Systems Engineer - Serverless Cloud for AI"
  },
  {
    "name": "Baseten",
    "category": "ai_yc",
    "portal_url": "https://www.baseten.co/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - Model Deployment Platform"
  },
  {
    "name": "Replicate",
    "category": "ai_yc",
    "portal_url": "https://replicate.com/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python / Go Backend Engineer - Machine Learning API"
  },
  {
    "name": "ElevenLabs",
    "category": "ai_yc",
    "portal_url": "https://elevenlabs.io/careers",
    "location": "New York / London / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Backend Engineer - Voice AI Generation"
  },
  {
    "name": "Harvey AI",
    "category": "ai_yc",
    "portal_url": "https://www.harvey.ai/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Backend Engineer - Legal LLM Platform"
  },
  {
    "name": "Cognition (Devin)",
    "category": "ai_yc",
    "portal_url": "https://www.cognition.ai/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Systems Engineer - Autonomous AI Software Engineer"
  },
  {
    "name": "Poolside",
    "category": "ai_yc",
    "portal_url": "https://poolside.ai/careers",
    "location": "Paris / SF / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Backend Engineer - Code Intelligence Models"
  },
  {
    "name": "Fireworks.ai",
    "category": "ai_yc",
    "portal_url": "https://fireworks.ai/careers",
    "location": "Redwood City, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - Fast LLM API Engine"
  },
  {
    "name": "Unstructured.io",
    "category": "ai_yc",
    "portal_url": "https://unstructured.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Backend Engineer - LLM Ingestion Pipeline"
  },
  {
    "name": "Chroma",
    "category": "ai_yc",
    "portal_url": "https://www.trychroma.com/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python / Rust Backend Engineer - Open Embedding Database"
  },
  {
    "name": "Langfuse",
    "category": "ai_yc",
    "portal_url": "https://langfuse.com/careers",
    "location": "Berlin / SF / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - LLM Engineering & Observability"
  },
  {
    "name": "Portkey",
    "category": "ai_yc",
    "portal_url": "https://portkey.ai/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - AI Gateway & Routing"
  },
  {
    "name": "PromptLayer",
    "category": "ai_yc",
    "portal_url": "https://promptlayer.com/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Backend Engineer - Prompt Management API"
  },
  {
    "name": "Helicone",
    "category": "ai_yc",
    "portal_url": "https://helicone.ai/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - Open Source LLM Monitoring"
  },
  {
    "name": "Arize AI",
    "category": "ai_yc",
    "portal_url": "https://arize.com/careers/",
    "location": "Berkeley, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Backend Engineer - AI Observability Platform"
  },
  {
    "name": "Cleanlab",
    "category": "ai_yc",
    "portal_url": "https://cleanlab.ai/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Backend Engineer - Automated Data Quality AI"
  },
  {
    "name": "Hugging Face",
    "category": "ai_yc",
    "portal_url": "https://huggingface.co/careers",
    "location": "NYC / Paris / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Backend Engineer - Open Source Model Hub"
  },
  {
    "name": "Synthesia",
    "category": "ai_yc",
    "portal_url": "https://www.synthesia.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Backend Engineer - AI Video Generation"
  },
  {
    "name": "HeyGen",
    "category": "ai_yc",
    "portal_url": "https://www.heygen.com/careers",
    "location": "Los Angeles, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - AI Avatar Generation Platform"
  },
  {
    "name": "Luma AI",
    "category": "ai_yc",
    "portal_url": "https://lumalabs.ai/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Backend Engineer - 3D & Video NeRF AI"
  },
  {
    "name": "Pika Labs",
    "category": "ai_yc",
    "portal_url": "https://pika.art/careers",
    "location": "Palo Alto, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Systems Engineer - Video Generation AI"
  },
  {
    "name": "Suno AI",
    "category": "ai_yc",
    "portal_url": "https://suno.com/careers",
    "location": "Cambridge, MA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Backend Engineer - Music Generation AI"
  },
  {
    "name": "Udio",
    "category": "ai_yc",
    "portal_url": "https://www.udio.com/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Backend Engineer - Audio Synthesis Engine"
  },
  {
    "name": "Ideogram",
    "category": "ai_yc",
    "portal_url": "https://ideogram.ai/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Systems Engineer - Text-to-Image AI"
  },
  {
    "name": "Black Forest Labs (Flux)",
    "category": "ai_yc",
    "portal_url": "https://blackforestlabs.ai/careers",
    "location": "Freiburg, Germany / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Backend Engineer - FLUX Image Models"
  },
  {
    "name": "Mercor",
    "category": "ai_yc",
    "portal_url": "https://mercor.com/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Backend Engineer - AI Vetting & Sourcing"
  },
  {
    "name": "Factory AI",
    "category": "ai_yc",
    "portal_url": "https://factory.ai/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Systems Engineer - Autonomous Droids for Software"
  },
  {
    "name": "Superhuman",
    "category": "ai_yc",
    "portal_url": "https://superhuman.com/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - AI Email Client & Search"
  },
  {
    "name": "Linear",
    "category": "ai_yc",
    "portal_url": "https://linear.app/careers",
    "location": "100% Remote (US / EU)",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Systems Engineer - High Performance Issue Tracking"
  },
  {
    "name": "Raycast",
    "category": "ai_yc",
    "portal_url": "https://www.raycast.com/careers",
    "location": "London / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - AI Extensions & Sync Platform"
  },
  {
    "name": "Warp",
    "category": "ai_yc",
    "portal_url": "https://www.warp.dev/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - AI-Powered Terminal Platform"
  },
  {
    "name": "The Browser Company (Arc)",
    "category": "ai_yc",
    "portal_url": "https://browsercompany.com/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Systems Engineer - Arc Search & AI Browser"
  },
  {
    "name": "Vercel",
    "category": "ai_yc",
    "portal_url": "https://vercel.com/careers",
    "location": "100% Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - AI SDK & Edge Compute Infrastructure"
  },
  {
    "name": "Supabase",
    "category": "ai_yc",
    "portal_url": "https://supabase.com/careers",
    "location": "100% Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend / Postgres Engineer - pgvector & AI Functions"
  },
  {
    "name": "Neon",
    "category": "ai_yc",
    "portal_url": "https://neon.tech/careers",
    "location": "100% Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend / Rust Engineer - Serverless Postgres for AI"
  },
  {
    "name": "Railway",
    "category": "ai_yc",
    "portal_url": "https://railway.com/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - Cloud Deployment Platform"
  },
  {
    "name": "Render",
    "category": "ai_yc",
    "portal_url": "https://render.com/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - Zero-DevOps Cloud"
  },
  {
    "name": "Fly.io",
    "category": "ai_yc",
    "portal_url": "https://fly.io/jobs/",
    "location": "100% Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Systems Engineer - Global Application Delivery & GPU Cloud"
  },
  {
    "name": "Resend",
    "category": "ai_yc",
    "portal_url": "https://resend.com/careers",
    "location": "100% Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - Modern Email API & Transactional Engine"
  },
  {
    "name": "PostHog",
    "category": "ai_yc",
    "portal_url": "https://posthog.com/careers",
    "location": "100% Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python / ClickHouse Engineer - Open Source Product Analytics"
  },
  {
    "name": "Retool",
    "category": "ai_yc",
    "portal_url": "https://retool.com/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - Internal Tools & Retool AI Platform"
  },
  {
    "name": "Make",
    "category": "ai_yc",
    "portal_url": "https://www.make.com/en/careers",
    "location": "Prague / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - Visual Automation & AI Workflows"
  },
  {
    "name": "Zapier",
    "category": "ai_yc",
    "portal_url": "https://zapier.com/careers",
    "location": "100% Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python Backend Engineer - AI Central Automation Platform"
  },
  {
    "name": "Figma",
    "category": "ai_yc",
    "portal_url": "https://www.figma.com/careers/",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - AI Collaborative Design Tools"
  },
  {
    "name": "Notion",
    "category": "ai_yc",
    "portal_url": "https://www.notion.so/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - Notion AI & Knowledge Assistant"
  },
  {
    "name": "ClickHouse",
    "category": "ai_yc",
    "portal_url": "https://clickhouse.com/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend / C++ Engineer - Real-Time Analytics DB"
  },
  {
    "name": "MotherDuck",
    "category": "ai_yc",
    "portal_url": "https://motherduck.com/careers/",
    "location": "Seattle, WA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - Cloud DuckDB Analytics"
  },
  {
    "name": "Milvus (Zilliz)",
    "category": "ai_yc",
    "portal_url": "https://zilliz.com/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - Distributed Vector Database"
  },
  {
    "name": "Turbopuffer",
    "category": "ai_yc",
    "portal_url": "https://turbopuffer.com/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend Engineer - Stateless Serverless Vector Search"
  },
  {
    "name": "LanceDB",
    "category": "ai_yc",
    "portal_url": "https://lancedb.com/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Python / Rust Engineer - Embedded Vector Search Engine"
  },
  {
    "name": "Google",
    "category": "company",
    "portal_url": "https://careers.google.com",
    "location": "Mountain View, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Microsoft",
    "category": "company",
    "portal_url": "https://careers.microsoft.com",
    "location": "Redmond, WA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Apple",
    "category": "company",
    "portal_url": "https://www.apple.com/careers",
    "location": "Cupertino, CA",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Amazon",
    "category": "company",
    "portal_url": "https://www.amazon.jobs",
    "location": "Seattle, WA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Meta",
    "category": "company",
    "portal_url": "https://www.metacareers.com",
    "location": "Menlo Park, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Netflix",
    "category": "company",
    "portal_url": "https://jobs.netflix.com",
    "location": "Los Gatos, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Nvidia",
    "category": "company",
    "portal_url": "https://www.nvidia.com/en-us/about-nvidia/careers/",
    "location": "Santa Clara, CA",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Adobe",
    "category": "company",
    "portal_url": "https://www.adobe.com/careers.html",
    "location": "San Jose, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Salesforce",
    "category": "company",
    "portal_url": "https://www.salesforce.com/company/careers/",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Oracle",
    "category": "company",
    "portal_url": "https://www.oracle.com/careers/",
    "location": "Austin, TX / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "IBM",
    "category": "company",
    "portal_url": "https://www.ibm.com/careers",
    "location": "Armonk, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Cisco",
    "category": "company",
    "portal_url": "https://jobs.cisco.com",
    "location": "San Jose, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Intel",
    "category": "company",
    "portal_url": "https://jobs.intel.com",
    "location": "Santa Clara, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "AMD",
    "category": "company",
    "portal_url": "https://www.amd.com/en/corporate/careers.html",
    "location": "Santa Clara, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Qualcomm",
    "category": "company",
    "portal_url": "https://www.qualcomm.com/company/careers",
    "location": "San Diego, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Uber",
    "category": "company",
    "portal_url": "https://www.uber.com/us/en/careers/",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Airbnb",
    "category": "company",
    "portal_url": "https://careers.airbnb.com",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Lyft",
    "category": "company",
    "portal_url": "https://www.lyft.com/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Spotify",
    "category": "company",
    "portal_url": "https://www.lifeatspotify.com",
    "location": "Stockholm / NYC / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Tesla",
    "category": "company",
    "portal_url": "https://www.tesla.com/careers",
    "location": "Palo Alto, CA / Austin, TX",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Block (Square)",
    "category": "company",
    "portal_url": "https://block.xyz/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "PayPal",
    "category": "company",
    "portal_url": "https://crafted.paypal.com/careers",
    "location": "San Jose, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Shopify",
    "category": "company",
    "portal_url": "https://www.shopify.com/careers",
    "location": "Ottawa, ON / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Snowflake",
    "category": "company",
    "portal_url": "https://www.snowflake.com/careers/",
    "location": "Bozeman, MT / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Databricks",
    "category": "company",
    "portal_url": "https://www.databricks.com/company/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Palantir",
    "category": "company",
    "portal_url": "https://www.palantir.com/careers/",
    "location": "Denver, CO / NYC / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Atlassian",
    "category": "company",
    "portal_url": "https://www.atlassian.com/company/careers",
    "location": "Sydney / SF / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Cloudflare",
    "category": "company",
    "portal_url": "https://www.cloudflare.com/careers/",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Datadog",
    "category": "company",
    "portal_url": "https://www.datadoghq.com/careers/",
    "location": "New York, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "MongoDB",
    "category": "company",
    "portal_url": "https://www.mongodb.com/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "CrowdStrike",
    "category": "company",
    "portal_url": "https://www.crowdstrike.com/careers/",
    "location": "Austin, TX / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "GitLab",
    "category": "company",
    "portal_url": "https://about.gitlab.com/jobs/",
    "location": "100% Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "GitHub",
    "category": "company",
    "portal_url": "https://github.com/about/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Stripe",
    "category": "company",
    "portal_url": "https://stripe.com/jobs",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Plaid",
    "category": "company",
    "portal_url": "https://plaid.com/careers/",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Brex",
    "category": "company",
    "portal_url": "https://www.brex.com/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Ramp",
    "category": "company",
    "portal_url": "https://ramp.com/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Gusto",
    "category": "company",
    "portal_url": "https://gusto.com/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Rippling",
    "category": "company",
    "portal_url": "https://www.rippling.com/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Deel",
    "category": "company",
    "portal_url": "https://www.deel.com/careers",
    "location": "100% Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Remote.com",
    "category": "company",
    "portal_url": "https://remote.com/careers",
    "location": "100% Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Revolut",
    "category": "startup",
    "portal_url": "https://www.revolut.com/careers/",
    "location": "London, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Wise (TransferWise)",
    "category": "startup",
    "portal_url": "https://wise.com/careers/",
    "location": "London, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Monzo",
    "category": "startup",
    "portal_url": "https://monzo.com/careers/",
    "location": "London, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Deliveroo",
    "category": "startup",
    "portal_url": "https://careers.deliveroo.co.uk",
    "location": "London, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "DeepMind",
    "category": "startup",
    "portal_url": "https://deepmind.google/careers/",
    "location": "London, UK",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Darktrace",
    "category": "startup",
    "portal_url": "https://www.darktrace.com/en/careers/",
    "location": "Cambridge, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Checkout.com",
    "category": "startup",
    "portal_url": "https://www.checkout.com/careers",
    "location": "London, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "CMR Surgical",
    "category": "startup",
    "portal_url": "https://cmrsurgical.com/careers",
    "location": "Cambridge, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "GoCardless",
    "category": "startup",
    "portal_url": "https://gocardless.com/careers/",
    "location": "London, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Snyk",
    "category": "startup",
    "portal_url": "https://snyk.io/careers/",
    "location": "London, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Arm",
    "category": "startup",
    "portal_url": "https://careers.arm.com",
    "location": "Cambridge, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Grab",
    "category": "visa_remote",
    "portal_url": "https://grab.careers",
    "location": "Singapore (Visa & Relocation)",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Sea Limited (Shopee)",
    "category": "visa_remote",
    "portal_url": "https://careers.shopee.sg",
    "location": "Singapore (Visa & Relocation)",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "GoTo (Gojek / Tokopedia)",
    "category": "startup",
    "portal_url": "https://gotocompany.com/careers",
    "location": "Jakarta / Singapore / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Traveloka",
    "category": "startup",
    "portal_url": "https://www.traveloka.com/en-id/careers",
    "location": "Jakarta / Singapore / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Carousell",
    "category": "startup",
    "portal_url": "https://careers.carousell.com",
    "location": "Singapore / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Ninja Van",
    "category": "startup",
    "portal_url": "https://www.ninjavan.co/en-sg/careers",
    "location": "Singapore / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Razer",
    "category": "startup",
    "portal_url": "https://www.razer.com/careers",
    "location": "Singapore / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Lazada",
    "category": "visa_remote",
    "portal_url": "https://www.lazada.com/en/careers/",
    "location": "Singapore / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Nansen",
    "category": "startup",
    "portal_url": "https://www.nansen.ai/careers",
    "location": "100% Remote (Singapore HQ)",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Xendit",
    "category": "startup",
    "portal_url": "https://www.xendit.co/en/careers/",
    "location": "Jakarta / Singapore / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "ByteDance (TikTok)",
    "category": "company",
    "portal_url": "https://jobs.bytedance.com",
    "location": "Beijing / Singapore / SF / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Tencent",
    "category": "company",
    "portal_url": "https://careers.tencent.com",
    "location": "Shenzhen / Palo Alto / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Alibaba Group",
    "category": "company",
    "portal_url": "https://careers.alibaba.com",
    "location": "Hangzhou / Sunnyvale / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Baidu",
    "category": "company",
    "portal_url": "https://talent.baidu.com",
    "location": "Beijing / Sunnyvale",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "DJI",
    "category": "company",
    "portal_url": "https://we.dji.com",
    "location": "Shenzhen / Palo Alto",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Xiaomi",
    "category": "company",
    "portal_url": "https://hr.xiaomi.com",
    "location": "Beijing / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Pinduoduo (Temu)",
    "category": "company",
    "portal_url": "https://careers.pinduoduo.com",
    "location": "Shanghai / Boston",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Shein",
    "category": "company",
    "portal_url": "https://www.sheingroup.com/careers/",
    "location": "Nanjing / Singapore / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Flipkart",
    "category": "india_tech",
    "portal_url": "https://careers.flipkart.com",
    "location": "Bengaluru, India",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Swiggy",
    "category": "india_tech",
    "portal_url": "https://careers.swiggy.com",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Zomato",
    "category": "india_tech",
    "portal_url": "https://www.zomato.com/careers",
    "location": "Gurgaon, India",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Razorpay",
    "category": "india_tech",
    "portal_url": "https://razorpay.com/jobs/",
    "location": "Bengaluru, India",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "PhonePe",
    "category": "india_tech",
    "portal_url": "https://www.phonepe.com/careers/",
    "location": "Bengaluru, India",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "CRED",
    "category": "india_tech",
    "portal_url": "https://cred.club/careers",
    "location": "Bengaluru, India",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Groww",
    "category": "india_tech",
    "portal_url": "https://groww.in/careers",
    "location": "Bengaluru, India",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Zerodha",
    "category": "india_tech",
    "portal_url": "https://zerodha.com/careers",
    "location": "Bengaluru, India",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Meesho",
    "category": "india_tech",
    "portal_url": "https://meesho.io/careers",
    "location": "Bengaluru, India",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Zepto",
    "category": "india_tech",
    "portal_url": "https://www.zepto.co/careers",
    "location": "Mumbai / Bengaluru, India",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Blinkit",
    "category": "india_tech",
    "portal_url": "https://blinkit.com/careers",
    "location": "Gurgaon, India",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Dream11",
    "category": "india_tech",
    "portal_url": "https://www.dream11.com/careers",
    "location": "Mumbai, India",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Postman",
    "category": "india_tech",
    "portal_url": "https://www.postman.com/careers/",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Chargebee",
    "category": "india_tech",
    "portal_url": "https://www.chargebee.com/careers/",
    "location": "Chennai / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Freshworks India",
    "category": "india_tech",
    "portal_url": "https://www.freshworks.com/careers/",
    "location": "Chennai / Bengaluru, India",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Hasura",
    "category": "india_tech",
    "portal_url": "https://hasura.io/careers/",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "BrowserStack",
    "category": "india_tech",
    "portal_url": "https://www.browserstack.com/careers",
    "location": "Mumbai, India / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Zoho India",
    "category": "india_tech",
    "portal_url": "https://www.zoho.com/careers/",
    "location": "Chennai / Tenkasi, India",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Canva Australia",
    "category": "visa_remote",
    "portal_url": "https://www.canva.com/careers/",
    "location": "Sydney, Australia (Visa & Relocation)",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Atlassian Australia",
    "category": "visa_remote",
    "portal_url": "https://www.atlassian.com/company/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Xero",
    "category": "startup",
    "portal_url": "https://www.xero.com/about/careers/",
    "location": "Wellington, NZ / Melbourne / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "SafetyCulture",
    "category": "startup",
    "portal_url": "https://safetyculture.com/careers/",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Employment Hero",
    "category": "startup",
    "portal_url": "https://employmenthero.com/careers/",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Immutable",
    "category": "startup",
    "portal_url": "https://www.immutable.com/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Linktree",
    "category": "startup",
    "portal_url": "https://linktr.ee/careers",
    "location": "Melbourne, Australia / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Airwallex",
    "category": "visa_remote",
    "portal_url": "https://www.airwallex.com/careers",
    "location": "Melbourne / Sydney / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Mercari Japan",
    "category": "visa_remote",
    "portal_url": "https://careers.mercari.com",
    "location": "Tokyo, Japan (Visa & Relocation)",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Rakuten Group",
    "category": "visa_remote",
    "portal_url": "https://rakuten.careers",
    "location": "Tokyo, Japan (Visa & Relocation)",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "LY Corporation (LINE)",
    "category": "visa_remote",
    "portal_url": "https://linecorp.com/en/career/",
    "location": "Tokyo, Japan (Visa & Relocation)",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "SmartNews",
    "category": "company",
    "portal_url": "https://www.smartnews.com/careers/",
    "location": "Tokyo / SF / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Preferred Networks",
    "category": "company",
    "portal_url": "https://www.preferred.jp/en/careers/",
    "location": "Tokyo, Japan",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Adyen",
    "category": "visa_remote",
    "portal_url": "https://careers.adyen.com",
    "location": "Amsterdam, Netherlands (Visa & Relocation)",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Delivery Hero",
    "category": "visa_remote",
    "portal_url": "https://careers.deliveryhero.com",
    "location": "Berlin, Germany (Visa & Relocation)",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Zalando",
    "category": "visa_remote",
    "portal_url": "https://jobs.zalando.com",
    "location": "Berlin, Germany (Visa & Relocation)",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Personio",
    "category": "visa_remote",
    "portal_url": "https://www.personio.com/careers",
    "location": "Munich, Germany (Visa & Relocation)",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Bolt Estonia",
    "category": "visa_remote",
    "portal_url": "https://bolt.eu/careers/",
    "location": "Tallinn, Estonia (Visa & Relocation)",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Klarna",
    "category": "startup",
    "portal_url": "https://www.klarna.com/careers/",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "N26 Germany",
    "category": "startup",
    "portal_url": "https://n26.com/en-eu/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "MessageBird (Bird)",
    "category": "startup",
    "portal_url": "https://bird.com/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "DeepL",
    "category": "startup",
    "portal_url": "https://www.deepl.com/careers",
    "location": "Cologne, Germany / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Celonis",
    "category": "startup",
    "portal_url": "https://www.celonis.com/careers/",
    "location": "Munich, Germany / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Supercell",
    "category": "startup",
    "portal_url": "https://supercell.com/en/careers/",
    "location": "Helsinki, Finland",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Wolt",
    "category": "startup",
    "portal_url": "https://wolt.com/en/jobs",
    "location": "Helsinki, Finland / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Pleo Denmark",
    "category": "startup",
    "portal_url": "https://www.pleo.io/en/careers",
    "location": "Copenhagen, Denmark / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Alan Health",
    "category": "startup",
    "portal_url": "https://alan.com/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Qonto France",
    "category": "startup",
    "portal_url": "https://qonto.com/en/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Doctolib",
    "category": "startup",
    "portal_url": "https://careers.doctolib.com",
    "location": "Paris / Berlin / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Flutterwave",
    "category": "startup",
    "portal_url": "https://flutterwave.com/us/careers",
    "location": "Lagos, Nigeria / SF / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Paystack",
    "category": "startup",
    "portal_url": "https://paystack.com/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Chipper Cash",
    "category": "startup",
    "portal_url": "https://chippercash.com/careers",
    "location": "Nairobi / SF / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Andela",
    "category": "startup",
    "portal_url": "https://andela.com/careers/",
    "location": "100% Remote (Africa HQ)",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Moniepoint",
    "category": "startup",
    "portal_url": "https://moniepoint.com/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "M-KOPA",
    "category": "startup",
    "portal_url": "https://m-kopa.com/careers/",
    "location": "Nairobi, Kenya / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Nubank",
    "category": "startup",
    "portal_url": "https://nubank.com/en/careers/",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "MercadoLibre LatAm",
    "category": "startup",
    "portal_url": "https://careers-mercadolibre.com",
    "location": "Buenos Aires / S\u00e3o Paulo / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Rappi",
    "category": "startup",
    "portal_url": "https://rappi.com/careers",
    "location": "Bogot\u00e1, Colombia / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "dLocal",
    "category": "startup",
    "portal_url": "https://dlocal.com/careers/",
    "location": "Montevideo, Uruguay / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Careem Middle East",
    "category": "visa_remote",
    "portal_url": "https://www.careem.com/careers/",
    "location": "Dubai, UAE (Visa & Relocation)",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Talabat UAE",
    "category": "visa_remote",
    "portal_url": "https://www.talabat.com/careers",
    "location": "Dubai, UAE (Visa & Relocation)",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Tabby",
    "category": "startup",
    "portal_url": "https://tabby.ai/en-AE/careers",
    "location": "Riyadh / Dubai / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Tamara",
    "category": "startup",
    "portal_url": "https://tamara.co/careers.html",
    "location": "Riyadh, Saudi Arabia / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Engineer"
  },
  {
    "name": "Apex Labs",
    "category": "company",
    "portal_url": "https://www.apexlabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Apex AI",
    "category": "startup",
    "portal_url": "https://www.apexai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Apex Cloud",
    "category": "remote",
    "portal_url": "https://www.apexcloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Apex Systems",
    "category": "visa_remote",
    "portal_url": "https://www.apexsystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Apex Networks",
    "category": "india_tech",
    "portal_url": "https://www.apexnetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Apex Data",
    "category": "ai_yc",
    "portal_url": "https://www.apexdata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Apex Tech",
    "category": "company",
    "portal_url": "https://www.apextech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Apex Security",
    "category": "startup",
    "portal_url": "https://www.apexsecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Apex Robotics",
    "category": "remote",
    "portal_url": "https://www.apexrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Apex Analytics",
    "category": "visa_remote",
    "portal_url": "https://www.apexanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Apex Pay",
    "category": "india_tech",
    "portal_url": "https://www.apexpay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Apex Finance",
    "category": "ai_yc",
    "portal_url": "https://www.apexfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Apex Health",
    "category": "company",
    "portal_url": "https://www.apexhealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Apex Logistics",
    "category": "startup",
    "portal_url": "https://www.apexlogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Apex Media",
    "category": "remote",
    "portal_url": "https://www.apexmedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Apex Digital",
    "category": "visa_remote",
    "portal_url": "https://www.apexdigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Apex Software",
    "category": "india_tech",
    "portal_url": "https://www.apexsoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Apex Platform",
    "category": "ai_yc",
    "portal_url": "https://www.apexplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Apex Engine",
    "category": "company",
    "portal_url": "https://www.apexengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Apex Stack",
    "category": "startup",
    "portal_url": "https://www.apexstack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nexus Labs",
    "category": "remote",
    "portal_url": "https://www.nexuslabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nexus AI",
    "category": "visa_remote",
    "portal_url": "https://www.nexusai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nexus Cloud",
    "category": "india_tech",
    "portal_url": "https://www.nexuscloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nexus Systems",
    "category": "ai_yc",
    "portal_url": "https://www.nexussystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nexus Networks",
    "category": "company",
    "portal_url": "https://www.nexusnetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nexus Data",
    "category": "startup",
    "portal_url": "https://www.nexusdata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nexus Tech",
    "category": "remote",
    "portal_url": "https://www.nexustech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nexus Security",
    "category": "visa_remote",
    "portal_url": "https://www.nexussecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nexus Robotics",
    "category": "india_tech",
    "portal_url": "https://www.nexusrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nexus Analytics",
    "category": "ai_yc",
    "portal_url": "https://www.nexusanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nexus Pay",
    "category": "company",
    "portal_url": "https://www.nexuspay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nexus Finance",
    "category": "startup",
    "portal_url": "https://www.nexusfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nexus Health",
    "category": "remote",
    "portal_url": "https://www.nexushealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nexus Logistics",
    "category": "visa_remote",
    "portal_url": "https://www.nexuslogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nexus Media",
    "category": "india_tech",
    "portal_url": "https://www.nexusmedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nexus Digital",
    "category": "ai_yc",
    "portal_url": "https://www.nexusdigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nexus Software",
    "category": "company",
    "portal_url": "https://www.nexussoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nexus Platform",
    "category": "startup",
    "portal_url": "https://www.nexusplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nexus Engine",
    "category": "remote",
    "portal_url": "https://www.nexusengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nexus Stack",
    "category": "visa_remote",
    "portal_url": "https://www.nexusstack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vertex Labs",
    "category": "india_tech",
    "portal_url": "https://www.vertexlabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vertex AI",
    "category": "ai_yc",
    "portal_url": "https://www.vertexai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vertex Cloud",
    "category": "company",
    "portal_url": "https://www.vertexcloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vertex Systems",
    "category": "startup",
    "portal_url": "https://www.vertexsystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vertex Networks",
    "category": "remote",
    "portal_url": "https://www.vertexnetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vertex Data",
    "category": "visa_remote",
    "portal_url": "https://www.vertexdata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vertex Tech",
    "category": "india_tech",
    "portal_url": "https://www.vertextech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vertex Security",
    "category": "ai_yc",
    "portal_url": "https://www.vertexsecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vertex Robotics",
    "category": "company",
    "portal_url": "https://www.vertexrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vertex Analytics",
    "category": "startup",
    "portal_url": "https://www.vertexanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vertex Pay",
    "category": "remote",
    "portal_url": "https://www.vertexpay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vertex Finance",
    "category": "visa_remote",
    "portal_url": "https://www.vertexfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vertex Health",
    "category": "india_tech",
    "portal_url": "https://www.vertexhealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vertex Logistics",
    "category": "ai_yc",
    "portal_url": "https://www.vertexlogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vertex Media",
    "category": "company",
    "portal_url": "https://www.vertexmedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vertex Digital",
    "category": "startup",
    "portal_url": "https://www.vertexdigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vertex Software",
    "category": "remote",
    "portal_url": "https://www.vertexsoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vertex Platform",
    "category": "visa_remote",
    "portal_url": "https://www.vertexplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vertex Engine",
    "category": "india_tech",
    "portal_url": "https://www.vertexengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vertex Stack",
    "category": "ai_yc",
    "portal_url": "https://www.vertexstack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Quantum Labs",
    "category": "company",
    "portal_url": "https://www.quantumlabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Quantum AI",
    "category": "startup",
    "portal_url": "https://www.quantumai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Quantum Cloud",
    "category": "remote",
    "portal_url": "https://www.quantumcloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Quantum Systems",
    "category": "visa_remote",
    "portal_url": "https://www.quantumsystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Quantum Networks",
    "category": "india_tech",
    "portal_url": "https://www.quantumnetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Quantum Data",
    "category": "ai_yc",
    "portal_url": "https://www.quantumdata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Quantum Tech",
    "category": "company",
    "portal_url": "https://www.quantumtech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Quantum Security",
    "category": "startup",
    "portal_url": "https://www.quantumsecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Quantum Robotics",
    "category": "remote",
    "portal_url": "https://www.quantumrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Quantum Analytics",
    "category": "visa_remote",
    "portal_url": "https://www.quantumanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Quantum Pay",
    "category": "india_tech",
    "portal_url": "https://www.quantumpay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Quantum Finance",
    "category": "ai_yc",
    "portal_url": "https://www.quantumfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Quantum Health",
    "category": "company",
    "portal_url": "https://www.quantumhealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Quantum Logistics",
    "category": "startup",
    "portal_url": "https://www.quantumlogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Quantum Media",
    "category": "remote",
    "portal_url": "https://www.quantummedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Quantum Digital",
    "category": "visa_remote",
    "portal_url": "https://www.quantumdigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Quantum Software",
    "category": "india_tech",
    "portal_url": "https://www.quantumsoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Quantum Platform",
    "category": "ai_yc",
    "portal_url": "https://www.quantumplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Quantum Engine",
    "category": "company",
    "portal_url": "https://www.quantumengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Quantum Stack",
    "category": "startup",
    "portal_url": "https://www.quantumstack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Hyper Labs",
    "category": "remote",
    "portal_url": "https://www.hyperlabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Hyper AI",
    "category": "visa_remote",
    "portal_url": "https://www.hyperai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Hyper Cloud",
    "category": "india_tech",
    "portal_url": "https://www.hypercloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Hyper Systems",
    "category": "ai_yc",
    "portal_url": "https://www.hypersystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Hyper Networks",
    "category": "company",
    "portal_url": "https://www.hypernetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Hyper Data",
    "category": "startup",
    "portal_url": "https://www.hyperdata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Hyper Tech",
    "category": "remote",
    "portal_url": "https://www.hypertech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Hyper Security",
    "category": "visa_remote",
    "portal_url": "https://www.hypersecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Hyper Robotics",
    "category": "india_tech",
    "portal_url": "https://www.hyperrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Hyper Analytics",
    "category": "ai_yc",
    "portal_url": "https://www.hyperanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Hyper Pay",
    "category": "company",
    "portal_url": "https://www.hyperpay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Hyper Finance",
    "category": "startup",
    "portal_url": "https://www.hyperfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Hyper Health",
    "category": "remote",
    "portal_url": "https://www.hyperhealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Hyper Logistics",
    "category": "visa_remote",
    "portal_url": "https://www.hyperlogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Hyper Media",
    "category": "india_tech",
    "portal_url": "https://www.hypermedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Hyper Digital",
    "category": "ai_yc",
    "portal_url": "https://www.hyperdigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Hyper Software",
    "category": "company",
    "portal_url": "https://www.hypersoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Hyper Platform",
    "category": "startup",
    "portal_url": "https://www.hyperplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Hyper Engine",
    "category": "remote",
    "portal_url": "https://www.hyperengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Hyper Stack",
    "category": "visa_remote",
    "portal_url": "https://www.hyperstack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Cyber Labs",
    "category": "india_tech",
    "portal_url": "https://www.cyberlabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Cyber AI",
    "category": "ai_yc",
    "portal_url": "https://www.cyberai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Cyber Cloud",
    "category": "company",
    "portal_url": "https://www.cybercloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Cyber Systems",
    "category": "startup",
    "portal_url": "https://www.cybersystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Cyber Networks",
    "category": "remote",
    "portal_url": "https://www.cybernetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Cyber Data",
    "category": "visa_remote",
    "portal_url": "https://www.cyberdata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Cyber Tech",
    "category": "india_tech",
    "portal_url": "https://www.cybertech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Cyber Security",
    "category": "ai_yc",
    "portal_url": "https://www.cybersecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Cyber Robotics",
    "category": "company",
    "portal_url": "https://www.cyberrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Cyber Analytics",
    "category": "startup",
    "portal_url": "https://www.cyberanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Cyber Pay",
    "category": "remote",
    "portal_url": "https://www.cyberpay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Cyber Finance",
    "category": "visa_remote",
    "portal_url": "https://www.cyberfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Cyber Health",
    "category": "india_tech",
    "portal_url": "https://www.cyberhealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Cyber Logistics",
    "category": "ai_yc",
    "portal_url": "https://www.cyberlogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Cyber Media",
    "category": "company",
    "portal_url": "https://www.cybermedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Cyber Digital",
    "category": "startup",
    "portal_url": "https://www.cyberdigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Cyber Software",
    "category": "remote",
    "portal_url": "https://www.cybersoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Cyber Platform",
    "category": "visa_remote",
    "portal_url": "https://www.cyberplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Cyber Engine",
    "category": "india_tech",
    "portal_url": "https://www.cyberengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Cyber Stack",
    "category": "ai_yc",
    "portal_url": "https://www.cyberstack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Orbital Labs",
    "category": "company",
    "portal_url": "https://www.orbitallabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Orbital AI",
    "category": "startup",
    "portal_url": "https://www.orbitalai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Orbital Cloud",
    "category": "remote",
    "portal_url": "https://www.orbitalcloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Orbital Systems",
    "category": "visa_remote",
    "portal_url": "https://www.orbitalsystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Orbital Networks",
    "category": "india_tech",
    "portal_url": "https://www.orbitalnetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Orbital Data",
    "category": "ai_yc",
    "portal_url": "https://www.orbitaldata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Orbital Tech",
    "category": "company",
    "portal_url": "https://www.orbitaltech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Orbital Security",
    "category": "startup",
    "portal_url": "https://www.orbitalsecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Orbital Robotics",
    "category": "remote",
    "portal_url": "https://www.orbitalrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Orbital Analytics",
    "category": "visa_remote",
    "portal_url": "https://www.orbitalanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Orbital Pay",
    "category": "india_tech",
    "portal_url": "https://www.orbitalpay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Orbital Finance",
    "category": "ai_yc",
    "portal_url": "https://www.orbitalfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Orbital Health",
    "category": "company",
    "portal_url": "https://www.orbitalhealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Orbital Logistics",
    "category": "startup",
    "portal_url": "https://www.orbitallogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Orbital Media",
    "category": "remote",
    "portal_url": "https://www.orbitalmedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Orbital Digital",
    "category": "visa_remote",
    "portal_url": "https://www.orbitaldigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Orbital Software",
    "category": "india_tech",
    "portal_url": "https://www.orbitalsoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Orbital Platform",
    "category": "ai_yc",
    "portal_url": "https://www.orbitalplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Orbital Engine",
    "category": "company",
    "portal_url": "https://www.orbitalengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Orbital Stack",
    "category": "startup",
    "portal_url": "https://www.orbitalstack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Strata Labs",
    "category": "remote",
    "portal_url": "https://www.stratalabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Strata AI",
    "category": "visa_remote",
    "portal_url": "https://www.strataai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Strata Cloud",
    "category": "india_tech",
    "portal_url": "https://www.stratacloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Strata Systems",
    "category": "ai_yc",
    "portal_url": "https://www.stratasystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Strata Networks",
    "category": "company",
    "portal_url": "https://www.stratanetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Strata Data",
    "category": "startup",
    "portal_url": "https://www.stratadata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Strata Tech",
    "category": "remote",
    "portal_url": "https://www.stratatech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Strata Security",
    "category": "visa_remote",
    "portal_url": "https://www.stratasecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Strata Robotics",
    "category": "india_tech",
    "portal_url": "https://www.stratarobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Strata Analytics",
    "category": "ai_yc",
    "portal_url": "https://www.strataanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Strata Pay",
    "category": "company",
    "portal_url": "https://www.stratapay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Strata Finance",
    "category": "startup",
    "portal_url": "https://www.stratafinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Strata Health",
    "category": "remote",
    "portal_url": "https://www.stratahealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Strata Logistics",
    "category": "visa_remote",
    "portal_url": "https://www.stratalogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Strata Media",
    "category": "india_tech",
    "portal_url": "https://www.stratamedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Strata Digital",
    "category": "ai_yc",
    "portal_url": "https://www.stratadigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Strata Software",
    "category": "company",
    "portal_url": "https://www.stratasoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Strata Platform",
    "category": "startup",
    "portal_url": "https://www.strataplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Strata Engine",
    "category": "remote",
    "portal_url": "https://www.strataengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Strata Stack",
    "category": "visa_remote",
    "portal_url": "https://www.stratastack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vanguard Labs",
    "category": "india_tech",
    "portal_url": "https://www.vanguardlabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vanguard AI",
    "category": "ai_yc",
    "portal_url": "https://www.vanguardai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vanguard Cloud",
    "category": "company",
    "portal_url": "https://www.vanguardcloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vanguard Systems",
    "category": "startup",
    "portal_url": "https://www.vanguardsystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vanguard Networks",
    "category": "remote",
    "portal_url": "https://www.vanguardnetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vanguard Data",
    "category": "visa_remote",
    "portal_url": "https://www.vanguarddata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vanguard Tech",
    "category": "india_tech",
    "portal_url": "https://www.vanguardtech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vanguard Security",
    "category": "ai_yc",
    "portal_url": "https://www.vanguardsecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vanguard Robotics",
    "category": "company",
    "portal_url": "https://www.vanguardrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vanguard Analytics",
    "category": "startup",
    "portal_url": "https://www.vanguardanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vanguard Pay",
    "category": "remote",
    "portal_url": "https://www.vanguardpay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vanguard Finance",
    "category": "visa_remote",
    "portal_url": "https://www.vanguardfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vanguard Health",
    "category": "india_tech",
    "portal_url": "https://www.vanguardhealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vanguard Logistics",
    "category": "ai_yc",
    "portal_url": "https://www.vanguardlogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vanguard Media",
    "category": "company",
    "portal_url": "https://www.vanguardmedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vanguard Digital",
    "category": "startup",
    "portal_url": "https://www.vanguarddigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vanguard Software",
    "category": "remote",
    "portal_url": "https://www.vanguardsoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vanguard Platform",
    "category": "visa_remote",
    "portal_url": "https://www.vanguardplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vanguard Engine",
    "category": "india_tech",
    "portal_url": "https://www.vanguardengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vanguard Stack",
    "category": "ai_yc",
    "portal_url": "https://www.vanguardstack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Prism Labs",
    "category": "company",
    "portal_url": "https://www.prismlabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Prism AI",
    "category": "startup",
    "portal_url": "https://www.prismai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Prism Cloud",
    "category": "remote",
    "portal_url": "https://www.prismcloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Prism Systems",
    "category": "visa_remote",
    "portal_url": "https://www.prismsystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Prism Networks",
    "category": "india_tech",
    "portal_url": "https://www.prismnetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Prism Data",
    "category": "ai_yc",
    "portal_url": "https://www.prismdata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Prism Tech",
    "category": "company",
    "portal_url": "https://www.prismtech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Prism Security",
    "category": "startup",
    "portal_url": "https://www.prismsecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Prism Robotics",
    "category": "remote",
    "portal_url": "https://www.prismrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Prism Analytics",
    "category": "visa_remote",
    "portal_url": "https://www.prismanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Prism Pay",
    "category": "india_tech",
    "portal_url": "https://www.prismpay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Prism Finance",
    "category": "ai_yc",
    "portal_url": "https://www.prismfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Prism Health",
    "category": "company",
    "portal_url": "https://www.prismhealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Prism Logistics",
    "category": "startup",
    "portal_url": "https://www.prismlogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Prism Media",
    "category": "remote",
    "portal_url": "https://www.prismmedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Prism Digital",
    "category": "visa_remote",
    "portal_url": "https://www.prismdigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Prism Software",
    "category": "india_tech",
    "portal_url": "https://www.prismsoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Prism Platform",
    "category": "ai_yc",
    "portal_url": "https://www.prismplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Prism Engine",
    "category": "company",
    "portal_url": "https://www.prismengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Prism Stack",
    "category": "startup",
    "portal_url": "https://www.prismstack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Omni Labs",
    "category": "remote",
    "portal_url": "https://www.omnilabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Omni AI",
    "category": "visa_remote",
    "portal_url": "https://www.omniai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Omni Cloud",
    "category": "india_tech",
    "portal_url": "https://www.omnicloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Omni Systems",
    "category": "ai_yc",
    "portal_url": "https://www.omnisystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Omni Networks",
    "category": "company",
    "portal_url": "https://www.omninetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Omni Data",
    "category": "startup",
    "portal_url": "https://www.omnidata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Omni Tech",
    "category": "remote",
    "portal_url": "https://www.omnitech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Omni Security",
    "category": "visa_remote",
    "portal_url": "https://www.omnisecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Omni Robotics",
    "category": "india_tech",
    "portal_url": "https://www.omnirobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Omni Analytics",
    "category": "ai_yc",
    "portal_url": "https://www.omnianalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Omni Pay",
    "category": "company",
    "portal_url": "https://www.omnipay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Omni Finance",
    "category": "startup",
    "portal_url": "https://www.omnifinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Omni Health",
    "category": "remote",
    "portal_url": "https://www.omnihealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Omni Logistics",
    "category": "visa_remote",
    "portal_url": "https://www.omnilogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Omni Media",
    "category": "india_tech",
    "portal_url": "https://www.omnimedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Omni Digital",
    "category": "ai_yc",
    "portal_url": "https://www.omnidigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Omni Software",
    "category": "company",
    "portal_url": "https://www.omnisoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Omni Platform",
    "category": "startup",
    "portal_url": "https://www.omniplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Omni Engine",
    "category": "remote",
    "portal_url": "https://www.omniengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Omni Stack",
    "category": "visa_remote",
    "portal_url": "https://www.omnistack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pulse Labs",
    "category": "india_tech",
    "portal_url": "https://www.pulselabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pulse AI",
    "category": "ai_yc",
    "portal_url": "https://www.pulseai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pulse Cloud",
    "category": "company",
    "portal_url": "https://www.pulsecloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pulse Systems",
    "category": "startup",
    "portal_url": "https://www.pulsesystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pulse Networks",
    "category": "remote",
    "portal_url": "https://www.pulsenetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pulse Data",
    "category": "visa_remote",
    "portal_url": "https://www.pulsedata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pulse Tech",
    "category": "india_tech",
    "portal_url": "https://www.pulsetech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pulse Security",
    "category": "ai_yc",
    "portal_url": "https://www.pulsesecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pulse Robotics",
    "category": "company",
    "portal_url": "https://www.pulserobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pulse Analytics",
    "category": "startup",
    "portal_url": "https://www.pulseanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pulse Pay",
    "category": "remote",
    "portal_url": "https://www.pulsepay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pulse Finance",
    "category": "visa_remote",
    "portal_url": "https://www.pulsefinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pulse Health",
    "category": "india_tech",
    "portal_url": "https://www.pulsehealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pulse Logistics",
    "category": "ai_yc",
    "portal_url": "https://www.pulselogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pulse Media",
    "category": "company",
    "portal_url": "https://www.pulsemedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pulse Digital",
    "category": "startup",
    "portal_url": "https://www.pulsedigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pulse Software",
    "category": "remote",
    "portal_url": "https://www.pulsesoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pulse Platform",
    "category": "visa_remote",
    "portal_url": "https://www.pulseplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pulse Engine",
    "category": "india_tech",
    "portal_url": "https://www.pulseengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pulse Stack",
    "category": "ai_yc",
    "portal_url": "https://www.pulsestack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zenith Labs",
    "category": "company",
    "portal_url": "https://www.zenithlabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zenith AI",
    "category": "startup",
    "portal_url": "https://www.zenithai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zenith Cloud",
    "category": "remote",
    "portal_url": "https://www.zenithcloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zenith Systems",
    "category": "visa_remote",
    "portal_url": "https://www.zenithsystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zenith Networks",
    "category": "india_tech",
    "portal_url": "https://www.zenithnetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zenith Data",
    "category": "ai_yc",
    "portal_url": "https://www.zenithdata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zenith Tech",
    "category": "company",
    "portal_url": "https://www.zenithtech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zenith Security",
    "category": "startup",
    "portal_url": "https://www.zenithsecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zenith Robotics",
    "category": "remote",
    "portal_url": "https://www.zenithrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zenith Analytics",
    "category": "visa_remote",
    "portal_url": "https://www.zenithanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zenith Pay",
    "category": "india_tech",
    "portal_url": "https://www.zenithpay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zenith Finance",
    "category": "ai_yc",
    "portal_url": "https://www.zenithfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zenith Health",
    "category": "company",
    "portal_url": "https://www.zenithhealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zenith Logistics",
    "category": "startup",
    "portal_url": "https://www.zenithlogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zenith Media",
    "category": "remote",
    "portal_url": "https://www.zenithmedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zenith Digital",
    "category": "visa_remote",
    "portal_url": "https://www.zenithdigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zenith Software",
    "category": "india_tech",
    "portal_url": "https://www.zenithsoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zenith Platform",
    "category": "ai_yc",
    "portal_url": "https://www.zenithplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zenith Engine",
    "category": "company",
    "portal_url": "https://www.zenithengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zenith Stack",
    "category": "startup",
    "portal_url": "https://www.zenithstack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Horizon Labs",
    "category": "remote",
    "portal_url": "https://www.horizonlabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Horizon AI",
    "category": "visa_remote",
    "portal_url": "https://www.horizonai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Horizon Cloud",
    "category": "india_tech",
    "portal_url": "https://www.horizoncloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Horizon Systems",
    "category": "ai_yc",
    "portal_url": "https://www.horizonsystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Horizon Networks",
    "category": "company",
    "portal_url": "https://www.horizonnetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Horizon Data",
    "category": "startup",
    "portal_url": "https://www.horizondata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Horizon Tech",
    "category": "remote",
    "portal_url": "https://www.horizontech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Horizon Security",
    "category": "visa_remote",
    "portal_url": "https://www.horizonsecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Horizon Robotics",
    "category": "india_tech",
    "portal_url": "https://www.horizonrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Horizon Analytics",
    "category": "ai_yc",
    "portal_url": "https://www.horizonanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Horizon Pay",
    "category": "company",
    "portal_url": "https://www.horizonpay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Horizon Finance",
    "category": "startup",
    "portal_url": "https://www.horizonfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Horizon Health",
    "category": "remote",
    "portal_url": "https://www.horizonhealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Horizon Logistics",
    "category": "visa_remote",
    "portal_url": "https://www.horizonlogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Horizon Media",
    "category": "india_tech",
    "portal_url": "https://www.horizonmedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Horizon Digital",
    "category": "ai_yc",
    "portal_url": "https://www.horizondigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Horizon Software",
    "category": "company",
    "portal_url": "https://www.horizonsoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Horizon Platform",
    "category": "startup",
    "portal_url": "https://www.horizonplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Horizon Engine",
    "category": "remote",
    "portal_url": "https://www.horizonengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Horizon Stack",
    "category": "visa_remote",
    "portal_url": "https://www.horizonstack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Velocity Labs",
    "category": "india_tech",
    "portal_url": "https://www.velocitylabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Velocity AI",
    "category": "ai_yc",
    "portal_url": "https://www.velocityai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Velocity Cloud",
    "category": "company",
    "portal_url": "https://www.velocitycloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Velocity Systems",
    "category": "startup",
    "portal_url": "https://www.velocitysystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Velocity Networks",
    "category": "remote",
    "portal_url": "https://www.velocitynetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Velocity Data",
    "category": "visa_remote",
    "portal_url": "https://www.velocitydata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Velocity Tech",
    "category": "india_tech",
    "portal_url": "https://www.velocitytech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Velocity Security",
    "category": "ai_yc",
    "portal_url": "https://www.velocitysecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Velocity Robotics",
    "category": "company",
    "portal_url": "https://www.velocityrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Velocity Analytics",
    "category": "startup",
    "portal_url": "https://www.velocityanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Velocity Pay",
    "category": "remote",
    "portal_url": "https://www.velocitypay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Velocity Finance",
    "category": "visa_remote",
    "portal_url": "https://www.velocityfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Velocity Health",
    "category": "india_tech",
    "portal_url": "https://www.velocityhealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Velocity Logistics",
    "category": "ai_yc",
    "portal_url": "https://www.velocitylogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Velocity Media",
    "category": "company",
    "portal_url": "https://www.velocitymedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Velocity Digital",
    "category": "startup",
    "portal_url": "https://www.velocitydigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Velocity Software",
    "category": "remote",
    "portal_url": "https://www.velocitysoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Velocity Platform",
    "category": "visa_remote",
    "portal_url": "https://www.velocityplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Velocity Engine",
    "category": "india_tech",
    "portal_url": "https://www.velocityengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Velocity Stack",
    "category": "ai_yc",
    "portal_url": "https://www.velocitystack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Aegis Labs",
    "category": "company",
    "portal_url": "https://www.aegislabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Aegis AI",
    "category": "startup",
    "portal_url": "https://www.aegisai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Aegis Cloud",
    "category": "remote",
    "portal_url": "https://www.aegiscloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Aegis Systems",
    "category": "visa_remote",
    "portal_url": "https://www.aegissystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Aegis Networks",
    "category": "india_tech",
    "portal_url": "https://www.aegisnetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Aegis Data",
    "category": "ai_yc",
    "portal_url": "https://www.aegisdata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Aegis Tech",
    "category": "company",
    "portal_url": "https://www.aegistech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Aegis Security",
    "category": "startup",
    "portal_url": "https://www.aegissecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Aegis Robotics",
    "category": "remote",
    "portal_url": "https://www.aegisrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Aegis Analytics",
    "category": "visa_remote",
    "portal_url": "https://www.aegisanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Aegis Pay",
    "category": "india_tech",
    "portal_url": "https://www.aegispay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Aegis Finance",
    "category": "ai_yc",
    "portal_url": "https://www.aegisfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Aegis Health",
    "category": "company",
    "portal_url": "https://www.aegishealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Aegis Logistics",
    "category": "startup",
    "portal_url": "https://www.aegislogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Aegis Media",
    "category": "remote",
    "portal_url": "https://www.aegismedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Aegis Digital",
    "category": "visa_remote",
    "portal_url": "https://www.aegisdigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Aegis Software",
    "category": "india_tech",
    "portal_url": "https://www.aegissoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Aegis Platform",
    "category": "ai_yc",
    "portal_url": "https://www.aegisplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Aegis Engine",
    "category": "company",
    "portal_url": "https://www.aegisengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Aegis Stack",
    "category": "startup",
    "portal_url": "https://www.aegisstack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beacon Labs",
    "category": "remote",
    "portal_url": "https://www.beaconlabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beacon AI",
    "category": "visa_remote",
    "portal_url": "https://www.beaconai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beacon Cloud",
    "category": "india_tech",
    "portal_url": "https://www.beaconcloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beacon Systems",
    "category": "ai_yc",
    "portal_url": "https://www.beaconsystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beacon Networks",
    "category": "company",
    "portal_url": "https://www.beaconnetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beacon Data",
    "category": "startup",
    "portal_url": "https://www.beacondata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beacon Tech",
    "category": "remote",
    "portal_url": "https://www.beacontech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beacon Security",
    "category": "visa_remote",
    "portal_url": "https://www.beaconsecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beacon Robotics",
    "category": "india_tech",
    "portal_url": "https://www.beaconrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beacon Analytics",
    "category": "ai_yc",
    "portal_url": "https://www.beaconanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beacon Pay",
    "category": "company",
    "portal_url": "https://www.beaconpay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beacon Finance",
    "category": "startup",
    "portal_url": "https://www.beaconfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beacon Health",
    "category": "remote",
    "portal_url": "https://www.beaconhealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beacon Logistics",
    "category": "visa_remote",
    "portal_url": "https://www.beaconlogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beacon Media",
    "category": "india_tech",
    "portal_url": "https://www.beaconmedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beacon Digital",
    "category": "ai_yc",
    "portal_url": "https://www.beacondigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beacon Software",
    "category": "company",
    "portal_url": "https://www.beaconsoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beacon Platform",
    "category": "startup",
    "portal_url": "https://www.beaconplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beacon Engine",
    "category": "remote",
    "portal_url": "https://www.beaconengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beacon Stack",
    "category": "visa_remote",
    "portal_url": "https://www.beaconstack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Crest Labs",
    "category": "india_tech",
    "portal_url": "https://www.crestlabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Crest AI",
    "category": "ai_yc",
    "portal_url": "https://www.crestai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Crest Cloud",
    "category": "company",
    "portal_url": "https://www.crestcloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Crest Systems",
    "category": "startup",
    "portal_url": "https://www.crestsystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Crest Networks",
    "category": "remote",
    "portal_url": "https://www.crestnetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Crest Data",
    "category": "visa_remote",
    "portal_url": "https://www.crestdata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Crest Tech",
    "category": "india_tech",
    "portal_url": "https://www.cresttech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Crest Security",
    "category": "ai_yc",
    "portal_url": "https://www.crestsecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Crest Robotics",
    "category": "company",
    "portal_url": "https://www.crestrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Crest Analytics",
    "category": "startup",
    "portal_url": "https://www.crestanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Crest Pay",
    "category": "remote",
    "portal_url": "https://www.crestpay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Crest Finance",
    "category": "visa_remote",
    "portal_url": "https://www.crestfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Crest Health",
    "category": "india_tech",
    "portal_url": "https://www.cresthealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Crest Logistics",
    "category": "ai_yc",
    "portal_url": "https://www.crestlogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Crest Media",
    "category": "company",
    "portal_url": "https://www.crestmedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Crest Digital",
    "category": "startup",
    "portal_url": "https://www.crestdigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Crest Software",
    "category": "remote",
    "portal_url": "https://www.crestsoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Crest Platform",
    "category": "visa_remote",
    "portal_url": "https://www.crestplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Crest Engine",
    "category": "india_tech",
    "portal_url": "https://www.crestengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Crest Stack",
    "category": "ai_yc",
    "portal_url": "https://www.creststack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Data Labs",
    "category": "company",
    "portal_url": "https://www.datalabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Data AI",
    "category": "startup",
    "portal_url": "https://www.dataai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Data Cloud",
    "category": "remote",
    "portal_url": "https://www.datacloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Data Systems",
    "category": "visa_remote",
    "portal_url": "https://www.datasystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Data Networks",
    "category": "india_tech",
    "portal_url": "https://www.datanetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Data Data",
    "category": "ai_yc",
    "portal_url": "https://www.datadata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Data Tech",
    "category": "company",
    "portal_url": "https://www.datatech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Data Security",
    "category": "startup",
    "portal_url": "https://www.datasecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Data Robotics",
    "category": "remote",
    "portal_url": "https://www.datarobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Data Analytics",
    "category": "visa_remote",
    "portal_url": "https://www.dataanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Data Pay",
    "category": "india_tech",
    "portal_url": "https://www.datapay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Data Finance",
    "category": "ai_yc",
    "portal_url": "https://www.datafinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Data Health",
    "category": "company",
    "portal_url": "https://www.datahealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Data Logistics",
    "category": "startup",
    "portal_url": "https://www.datalogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Data Media",
    "category": "remote",
    "portal_url": "https://www.datamedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Data Digital",
    "category": "visa_remote",
    "portal_url": "https://www.datadigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Data Software",
    "category": "india_tech",
    "portal_url": "https://www.datasoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Data Platform",
    "category": "ai_yc",
    "portal_url": "https://www.dataplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Data Engine",
    "category": "company",
    "portal_url": "https://www.dataengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Data Stack",
    "category": "startup",
    "portal_url": "https://www.datastack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Echo Labs",
    "category": "remote",
    "portal_url": "https://www.echolabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Echo AI",
    "category": "visa_remote",
    "portal_url": "https://www.echoai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Echo Cloud",
    "category": "india_tech",
    "portal_url": "https://www.echocloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Echo Systems",
    "category": "ai_yc",
    "portal_url": "https://www.echosystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Echo Networks",
    "category": "company",
    "portal_url": "https://www.echonetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Echo Data",
    "category": "startup",
    "portal_url": "https://www.echodata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Echo Tech",
    "category": "remote",
    "portal_url": "https://www.echotech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Echo Security",
    "category": "visa_remote",
    "portal_url": "https://www.echosecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Echo Robotics",
    "category": "india_tech",
    "portal_url": "https://www.echorobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Echo Analytics",
    "category": "ai_yc",
    "portal_url": "https://www.echoanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Echo Pay",
    "category": "company",
    "portal_url": "https://www.echopay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Echo Finance",
    "category": "startup",
    "portal_url": "https://www.echofinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Echo Health",
    "category": "remote",
    "portal_url": "https://www.echohealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Echo Logistics",
    "category": "visa_remote",
    "portal_url": "https://www.echologistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Echo Media",
    "category": "india_tech",
    "portal_url": "https://www.echomedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Echo Digital",
    "category": "ai_yc",
    "portal_url": "https://www.echodigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Echo Software",
    "category": "company",
    "portal_url": "https://www.echosoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Echo Platform",
    "category": "startup",
    "portal_url": "https://www.echoplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Echo Engine",
    "category": "remote",
    "portal_url": "https://www.echoengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Echo Stack",
    "category": "visa_remote",
    "portal_url": "https://www.echostack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Flux Labs",
    "category": "india_tech",
    "portal_url": "https://www.fluxlabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Flux AI",
    "category": "ai_yc",
    "portal_url": "https://www.fluxai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Flux Cloud",
    "category": "company",
    "portal_url": "https://www.fluxcloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Flux Systems",
    "category": "startup",
    "portal_url": "https://www.fluxsystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Flux Networks",
    "category": "remote",
    "portal_url": "https://www.fluxnetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Flux Data",
    "category": "visa_remote",
    "portal_url": "https://www.fluxdata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Flux Tech",
    "category": "india_tech",
    "portal_url": "https://www.fluxtech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Flux Security",
    "category": "ai_yc",
    "portal_url": "https://www.fluxsecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Flux Robotics",
    "category": "company",
    "portal_url": "https://www.fluxrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Flux Analytics",
    "category": "startup",
    "portal_url": "https://www.fluxanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Flux Pay",
    "category": "remote",
    "portal_url": "https://www.fluxpay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Flux Finance",
    "category": "visa_remote",
    "portal_url": "https://www.fluxfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Flux Health",
    "category": "india_tech",
    "portal_url": "https://www.fluxhealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Flux Logistics",
    "category": "ai_yc",
    "portal_url": "https://www.fluxlogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Flux Media",
    "category": "company",
    "portal_url": "https://www.fluxmedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Flux Digital",
    "category": "startup",
    "portal_url": "https://www.fluxdigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Flux Software",
    "category": "remote",
    "portal_url": "https://www.fluxsoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Flux Platform",
    "category": "visa_remote",
    "portal_url": "https://www.fluxplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Flux Engine",
    "category": "india_tech",
    "portal_url": "https://www.fluxengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Flux Stack",
    "category": "ai_yc",
    "portal_url": "https://www.fluxstack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Grid Labs",
    "category": "company",
    "portal_url": "https://www.gridlabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Grid AI",
    "category": "startup",
    "portal_url": "https://www.gridai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Grid Cloud",
    "category": "remote",
    "portal_url": "https://www.gridcloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Grid Systems",
    "category": "visa_remote",
    "portal_url": "https://www.gridsystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Grid Networks",
    "category": "india_tech",
    "portal_url": "https://www.gridnetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Grid Data",
    "category": "ai_yc",
    "portal_url": "https://www.griddata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Grid Tech",
    "category": "company",
    "portal_url": "https://www.gridtech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Grid Security",
    "category": "startup",
    "portal_url": "https://www.gridsecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Grid Robotics",
    "category": "remote",
    "portal_url": "https://www.gridrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Grid Analytics",
    "category": "visa_remote",
    "portal_url": "https://www.gridanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Grid Pay",
    "category": "india_tech",
    "portal_url": "https://www.gridpay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Grid Finance",
    "category": "ai_yc",
    "portal_url": "https://www.gridfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Grid Health",
    "category": "company",
    "portal_url": "https://www.gridhealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Grid Logistics",
    "category": "startup",
    "portal_url": "https://www.gridlogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Grid Media",
    "category": "remote",
    "portal_url": "https://www.gridmedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Grid Digital",
    "category": "visa_remote",
    "portal_url": "https://www.griddigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Grid Software",
    "category": "india_tech",
    "portal_url": "https://www.gridsoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Grid Platform",
    "category": "ai_yc",
    "portal_url": "https://www.gridplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Grid Engine",
    "category": "company",
    "portal_url": "https://www.gridengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Grid Stack",
    "category": "startup",
    "portal_url": "https://www.gridstack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Helix Labs",
    "category": "remote",
    "portal_url": "https://www.helixlabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Helix AI",
    "category": "visa_remote",
    "portal_url": "https://www.helixai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Helix Cloud",
    "category": "india_tech",
    "portal_url": "https://www.helixcloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Helix Systems",
    "category": "ai_yc",
    "portal_url": "https://www.helixsystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Helix Networks",
    "category": "company",
    "portal_url": "https://www.helixnetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Helix Data",
    "category": "startup",
    "portal_url": "https://www.helixdata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Helix Tech",
    "category": "remote",
    "portal_url": "https://www.helixtech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Helix Security",
    "category": "visa_remote",
    "portal_url": "https://www.helixsecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Helix Robotics",
    "category": "india_tech",
    "portal_url": "https://www.helixrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Helix Analytics",
    "category": "ai_yc",
    "portal_url": "https://www.helixanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Helix Pay",
    "category": "company",
    "portal_url": "https://www.helixpay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Helix Finance",
    "category": "startup",
    "portal_url": "https://www.helixfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Helix Health",
    "category": "remote",
    "portal_url": "https://www.helixhealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Helix Logistics",
    "category": "visa_remote",
    "portal_url": "https://www.helixlogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Helix Media",
    "category": "india_tech",
    "portal_url": "https://www.helixmedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Helix Digital",
    "category": "ai_yc",
    "portal_url": "https://www.helixdigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Helix Software",
    "category": "company",
    "portal_url": "https://www.helixsoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Helix Platform",
    "category": "startup",
    "portal_url": "https://www.helixplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Helix Engine",
    "category": "remote",
    "portal_url": "https://www.helixengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Helix Stack",
    "category": "visa_remote",
    "portal_url": "https://www.helixstack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Infra Labs",
    "category": "india_tech",
    "portal_url": "https://www.infralabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Infra AI",
    "category": "ai_yc",
    "portal_url": "https://www.infraai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Infra Cloud",
    "category": "company",
    "portal_url": "https://www.infracloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Infra Systems",
    "category": "startup",
    "portal_url": "https://www.infrasystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Infra Networks",
    "category": "remote",
    "portal_url": "https://www.infranetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Infra Data",
    "category": "visa_remote",
    "portal_url": "https://www.infradata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Infra Tech",
    "category": "india_tech",
    "portal_url": "https://www.infratech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Infra Security",
    "category": "ai_yc",
    "portal_url": "https://www.infrasecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Infra Robotics",
    "category": "company",
    "portal_url": "https://www.infrarobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Infra Analytics",
    "category": "startup",
    "portal_url": "https://www.infraanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Infra Pay",
    "category": "remote",
    "portal_url": "https://www.infrapay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Infra Finance",
    "category": "visa_remote",
    "portal_url": "https://www.infrafinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Infra Health",
    "category": "india_tech",
    "portal_url": "https://www.infrahealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Infra Logistics",
    "category": "ai_yc",
    "portal_url": "https://www.infralogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Infra Media",
    "category": "company",
    "portal_url": "https://www.inframedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Infra Digital",
    "category": "startup",
    "portal_url": "https://www.infradigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Infra Software",
    "category": "remote",
    "portal_url": "https://www.infrasoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Infra Platform",
    "category": "visa_remote",
    "portal_url": "https://www.infraplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Infra Engine",
    "category": "india_tech",
    "portal_url": "https://www.infraengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Infra Stack",
    "category": "ai_yc",
    "portal_url": "https://www.infrastack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Kube Labs",
    "category": "company",
    "portal_url": "https://www.kubelabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Kube AI",
    "category": "startup",
    "portal_url": "https://www.kubeai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Kube Cloud",
    "category": "remote",
    "portal_url": "https://www.kubecloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Kube Systems",
    "category": "visa_remote",
    "portal_url": "https://www.kubesystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Kube Networks",
    "category": "india_tech",
    "portal_url": "https://www.kubenetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Kube Data",
    "category": "ai_yc",
    "portal_url": "https://www.kubedata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Kube Tech",
    "category": "company",
    "portal_url": "https://www.kubetech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Kube Security",
    "category": "startup",
    "portal_url": "https://www.kubesecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Kube Robotics",
    "category": "remote",
    "portal_url": "https://www.kuberobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Kube Analytics",
    "category": "visa_remote",
    "portal_url": "https://www.kubeanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Kube Pay",
    "category": "india_tech",
    "portal_url": "https://www.kubepay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Kube Finance",
    "category": "ai_yc",
    "portal_url": "https://www.kubefinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Kube Health",
    "category": "company",
    "portal_url": "https://www.kubehealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Kube Logistics",
    "category": "startup",
    "portal_url": "https://www.kubelogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Kube Media",
    "category": "remote",
    "portal_url": "https://www.kubemedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Kube Digital",
    "category": "visa_remote",
    "portal_url": "https://www.kubedigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Kube Software",
    "category": "india_tech",
    "portal_url": "https://www.kubesoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Kube Platform",
    "category": "ai_yc",
    "portal_url": "https://www.kubeplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Kube Engine",
    "category": "company",
    "portal_url": "https://www.kubeengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Kube Stack",
    "category": "startup",
    "portal_url": "https://www.kubestack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Logic Labs",
    "category": "remote",
    "portal_url": "https://www.logiclabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Logic AI",
    "category": "visa_remote",
    "portal_url": "https://www.logicai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Logic Cloud",
    "category": "india_tech",
    "portal_url": "https://www.logiccloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Logic Systems",
    "category": "ai_yc",
    "portal_url": "https://www.logicsystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Logic Networks",
    "category": "company",
    "portal_url": "https://www.logicnetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Logic Data",
    "category": "startup",
    "portal_url": "https://www.logicdata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Logic Tech",
    "category": "remote",
    "portal_url": "https://www.logictech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Logic Security",
    "category": "visa_remote",
    "portal_url": "https://www.logicsecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Logic Robotics",
    "category": "india_tech",
    "portal_url": "https://www.logicrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Logic Analytics",
    "category": "ai_yc",
    "portal_url": "https://www.logicanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Logic Pay",
    "category": "company",
    "portal_url": "https://www.logicpay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Logic Finance",
    "category": "startup",
    "portal_url": "https://www.logicfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Logic Health",
    "category": "remote",
    "portal_url": "https://www.logichealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Logic Logistics",
    "category": "visa_remote",
    "portal_url": "https://www.logiclogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Logic Media",
    "category": "india_tech",
    "portal_url": "https://www.logicmedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Logic Digital",
    "category": "ai_yc",
    "portal_url": "https://www.logicdigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Logic Software",
    "category": "company",
    "portal_url": "https://www.logicsoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Logic Platform",
    "category": "startup",
    "portal_url": "https://www.logicplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Logic Engine",
    "category": "remote",
    "portal_url": "https://www.logicengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Logic Stack",
    "category": "visa_remote",
    "portal_url": "https://www.logicstack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Matrix Labs",
    "category": "india_tech",
    "portal_url": "https://www.matrixlabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Matrix AI",
    "category": "ai_yc",
    "portal_url": "https://www.matrixai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Matrix Cloud",
    "category": "company",
    "portal_url": "https://www.matrixcloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Matrix Systems",
    "category": "startup",
    "portal_url": "https://www.matrixsystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Matrix Networks",
    "category": "remote",
    "portal_url": "https://www.matrixnetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Matrix Data",
    "category": "visa_remote",
    "portal_url": "https://www.matrixdata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Matrix Tech",
    "category": "india_tech",
    "portal_url": "https://www.matrixtech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Matrix Security",
    "category": "ai_yc",
    "portal_url": "https://www.matrixsecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Matrix Robotics",
    "category": "company",
    "portal_url": "https://www.matrixrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Matrix Analytics",
    "category": "startup",
    "portal_url": "https://www.matrixanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Matrix Pay",
    "category": "remote",
    "portal_url": "https://www.matrixpay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Matrix Finance",
    "category": "visa_remote",
    "portal_url": "https://www.matrixfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Matrix Health",
    "category": "india_tech",
    "portal_url": "https://www.matrixhealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Matrix Logistics",
    "category": "ai_yc",
    "portal_url": "https://www.matrixlogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Matrix Media",
    "category": "company",
    "portal_url": "https://www.matrixmedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Matrix Digital",
    "category": "startup",
    "portal_url": "https://www.matrixdigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Matrix Software",
    "category": "remote",
    "portal_url": "https://www.matrixsoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Matrix Platform",
    "category": "visa_remote",
    "portal_url": "https://www.matrixplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Matrix Engine",
    "category": "india_tech",
    "portal_url": "https://www.matrixengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Matrix Stack",
    "category": "ai_yc",
    "portal_url": "https://www.matrixstack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nova Labs",
    "category": "company",
    "portal_url": "https://www.novalabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nova AI",
    "category": "startup",
    "portal_url": "https://www.novaai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nova Cloud",
    "category": "remote",
    "portal_url": "https://www.novacloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nova Systems",
    "category": "visa_remote",
    "portal_url": "https://www.novasystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nova Networks",
    "category": "india_tech",
    "portal_url": "https://www.novanetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nova Data",
    "category": "ai_yc",
    "portal_url": "https://www.novadata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nova Tech",
    "category": "company",
    "portal_url": "https://www.novatech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nova Security",
    "category": "startup",
    "portal_url": "https://www.novasecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nova Robotics",
    "category": "remote",
    "portal_url": "https://www.novarobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nova Analytics",
    "category": "visa_remote",
    "portal_url": "https://www.novaanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nova Pay",
    "category": "india_tech",
    "portal_url": "https://www.novapay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nova Finance",
    "category": "ai_yc",
    "portal_url": "https://www.novafinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nova Health",
    "category": "company",
    "portal_url": "https://www.novahealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nova Logistics",
    "category": "startup",
    "portal_url": "https://www.novalogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nova Media",
    "category": "remote",
    "portal_url": "https://www.novamedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nova Digital",
    "category": "visa_remote",
    "portal_url": "https://www.novadigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nova Software",
    "category": "india_tech",
    "portal_url": "https://www.novasoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nova Platform",
    "category": "ai_yc",
    "portal_url": "https://www.novaplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nova Engine",
    "category": "company",
    "portal_url": "https://www.novaengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Nova Stack",
    "category": "startup",
    "portal_url": "https://www.novastack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Optima Labs",
    "category": "remote",
    "portal_url": "https://www.optimalabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Optima AI",
    "category": "visa_remote",
    "portal_url": "https://www.optimaai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Optima Cloud",
    "category": "india_tech",
    "portal_url": "https://www.optimacloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Optima Systems",
    "category": "ai_yc",
    "portal_url": "https://www.optimasystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Optima Networks",
    "category": "company",
    "portal_url": "https://www.optimanetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Optima Data",
    "category": "startup",
    "portal_url": "https://www.optimadata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Optima Tech",
    "category": "remote",
    "portal_url": "https://www.optimatech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Optima Security",
    "category": "visa_remote",
    "portal_url": "https://www.optimasecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Optima Robotics",
    "category": "india_tech",
    "portal_url": "https://www.optimarobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Optima Analytics",
    "category": "ai_yc",
    "portal_url": "https://www.optimaanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Optima Pay",
    "category": "company",
    "portal_url": "https://www.optimapay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Optima Finance",
    "category": "startup",
    "portal_url": "https://www.optimafinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Optima Health",
    "category": "remote",
    "portal_url": "https://www.optimahealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Optima Logistics",
    "category": "visa_remote",
    "portal_url": "https://www.optimalogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Optima Media",
    "category": "india_tech",
    "portal_url": "https://www.optimamedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Optima Digital",
    "category": "ai_yc",
    "portal_url": "https://www.optimadigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Optima Software",
    "category": "company",
    "portal_url": "https://www.optimasoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Optima Platform",
    "category": "startup",
    "portal_url": "https://www.optimaplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Optima Engine",
    "category": "remote",
    "portal_url": "https://www.optimaengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Optima Stack",
    "category": "visa_remote",
    "portal_url": "https://www.optimastack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pinnacle Labs",
    "category": "india_tech",
    "portal_url": "https://www.pinnaclelabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pinnacle AI",
    "category": "ai_yc",
    "portal_url": "https://www.pinnacleai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pinnacle Cloud",
    "category": "company",
    "portal_url": "https://www.pinnaclecloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pinnacle Systems",
    "category": "startup",
    "portal_url": "https://www.pinnaclesystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pinnacle Networks",
    "category": "remote",
    "portal_url": "https://www.pinnaclenetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pinnacle Data",
    "category": "visa_remote",
    "portal_url": "https://www.pinnacledata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pinnacle Tech",
    "category": "india_tech",
    "portal_url": "https://www.pinnacletech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pinnacle Security",
    "category": "ai_yc",
    "portal_url": "https://www.pinnaclesecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pinnacle Robotics",
    "category": "company",
    "portal_url": "https://www.pinnaclerobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pinnacle Analytics",
    "category": "startup",
    "portal_url": "https://www.pinnacleanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pinnacle Pay",
    "category": "remote",
    "portal_url": "https://www.pinnaclepay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pinnacle Finance",
    "category": "visa_remote",
    "portal_url": "https://www.pinnaclefinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pinnacle Health",
    "category": "india_tech",
    "portal_url": "https://www.pinnaclehealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pinnacle Logistics",
    "category": "ai_yc",
    "portal_url": "https://www.pinnaclelogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pinnacle Media",
    "category": "company",
    "portal_url": "https://www.pinnaclemedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pinnacle Digital",
    "category": "startup",
    "portal_url": "https://www.pinnacledigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pinnacle Software",
    "category": "remote",
    "portal_url": "https://www.pinnaclesoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pinnacle Platform",
    "category": "visa_remote",
    "portal_url": "https://www.pinnacleplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pinnacle Engine",
    "category": "india_tech",
    "portal_url": "https://www.pinnacleengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Pinnacle Stack",
    "category": "ai_yc",
    "portal_url": "https://www.pinnaclestack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Scale Labs",
    "category": "company",
    "portal_url": "https://www.scalelabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Scale Cloud",
    "category": "remote",
    "portal_url": "https://www.scalecloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Scale Systems",
    "category": "visa_remote",
    "portal_url": "https://www.scalesystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Scale Networks",
    "category": "india_tech",
    "portal_url": "https://www.scalenetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Scale Data",
    "category": "ai_yc",
    "portal_url": "https://www.scaledata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Scale Tech",
    "category": "company",
    "portal_url": "https://www.scaletech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Scale Security",
    "category": "startup",
    "portal_url": "https://www.scalesecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Scale Robotics",
    "category": "remote",
    "portal_url": "https://www.scalerobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Scale Analytics",
    "category": "visa_remote",
    "portal_url": "https://www.scaleanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Scale Pay",
    "category": "india_tech",
    "portal_url": "https://www.scalepay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Scale Finance",
    "category": "ai_yc",
    "portal_url": "https://www.scalefinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Scale Health",
    "category": "company",
    "portal_url": "https://www.scalehealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Scale Logistics",
    "category": "startup",
    "portal_url": "https://www.scalelogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Scale Media",
    "category": "remote",
    "portal_url": "https://www.scalemedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Scale Digital",
    "category": "visa_remote",
    "portal_url": "https://www.scaledigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Scale Software",
    "category": "india_tech",
    "portal_url": "https://www.scalesoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Scale Platform",
    "category": "ai_yc",
    "portal_url": "https://www.scaleplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Scale Engine",
    "category": "company",
    "portal_url": "https://www.scaleengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Scale Stack",
    "category": "startup",
    "portal_url": "https://www.scalestack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Tech Labs",
    "category": "remote",
    "portal_url": "https://www.techlabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Tech AI",
    "category": "visa_remote",
    "portal_url": "https://www.techai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Tech Cloud",
    "category": "india_tech",
    "portal_url": "https://www.techcloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Tech Systems",
    "category": "ai_yc",
    "portal_url": "https://www.techsystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Tech Networks",
    "category": "company",
    "portal_url": "https://www.technetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Tech Data",
    "category": "startup",
    "portal_url": "https://www.techdata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Tech Tech",
    "category": "remote",
    "portal_url": "https://www.techtech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Tech Security",
    "category": "visa_remote",
    "portal_url": "https://www.techsecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Tech Robotics",
    "category": "india_tech",
    "portal_url": "https://www.techrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Tech Analytics",
    "category": "ai_yc",
    "portal_url": "https://www.techanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Tech Pay",
    "category": "company",
    "portal_url": "https://www.techpay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Tech Finance",
    "category": "startup",
    "portal_url": "https://www.techfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Tech Health",
    "category": "remote",
    "portal_url": "https://www.techhealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Tech Logistics",
    "category": "visa_remote",
    "portal_url": "https://www.techlogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Tech Media",
    "category": "india_tech",
    "portal_url": "https://www.techmedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Tech Digital",
    "category": "ai_yc",
    "portal_url": "https://www.techdigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Tech Software",
    "category": "company",
    "portal_url": "https://www.techsoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Tech Platform",
    "category": "startup",
    "portal_url": "https://www.techplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Tech Engine",
    "category": "remote",
    "portal_url": "https://www.techengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Tech Stack",
    "category": "visa_remote",
    "portal_url": "https://www.techstack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vector Labs",
    "category": "india_tech",
    "portal_url": "https://www.vectorlabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vector AI",
    "category": "ai_yc",
    "portal_url": "https://www.vectorai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vector Cloud",
    "category": "company",
    "portal_url": "https://www.vectorcloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vector Systems",
    "category": "startup",
    "portal_url": "https://www.vectorsystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vector Networks",
    "category": "remote",
    "portal_url": "https://www.vectornetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vector Data",
    "category": "visa_remote",
    "portal_url": "https://www.vectordata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vector Tech",
    "category": "india_tech",
    "portal_url": "https://www.vectortech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vector Security",
    "category": "ai_yc",
    "portal_url": "https://www.vectorsecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vector Robotics",
    "category": "company",
    "portal_url": "https://www.vectorrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vector Analytics",
    "category": "startup",
    "portal_url": "https://www.vectoranalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vector Pay",
    "category": "remote",
    "portal_url": "https://www.vectorpay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vector Finance",
    "category": "visa_remote",
    "portal_url": "https://www.vectorfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vector Health",
    "category": "india_tech",
    "portal_url": "https://www.vectorhealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vector Logistics",
    "category": "ai_yc",
    "portal_url": "https://www.vectorlogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vector Media",
    "category": "company",
    "portal_url": "https://www.vectormedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vector Digital",
    "category": "startup",
    "portal_url": "https://www.vectordigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vector Software",
    "category": "remote",
    "portal_url": "https://www.vectorsoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vector Platform",
    "category": "visa_remote",
    "portal_url": "https://www.vectorplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vector Engine",
    "category": "india_tech",
    "portal_url": "https://www.vectorengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Vector Stack",
    "category": "ai_yc",
    "portal_url": "https://www.vectorstack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Wave Labs",
    "category": "company",
    "portal_url": "https://www.wavelabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Wave AI",
    "category": "startup",
    "portal_url": "https://www.waveai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Wave Cloud",
    "category": "remote",
    "portal_url": "https://www.wavecloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Wave Systems",
    "category": "visa_remote",
    "portal_url": "https://www.wavesystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Wave Networks",
    "category": "india_tech",
    "portal_url": "https://www.wavenetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Wave Data",
    "category": "ai_yc",
    "portal_url": "https://www.wavedata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Wave Tech",
    "category": "company",
    "portal_url": "https://www.wavetech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Wave Security",
    "category": "startup",
    "portal_url": "https://www.wavesecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Wave Robotics",
    "category": "remote",
    "portal_url": "https://www.waverobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Wave Analytics",
    "category": "visa_remote",
    "portal_url": "https://www.waveanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Wave Pay",
    "category": "india_tech",
    "portal_url": "https://www.wavepay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Wave Finance",
    "category": "ai_yc",
    "portal_url": "https://www.wavefinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Wave Health",
    "category": "company",
    "portal_url": "https://www.wavehealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Wave Logistics",
    "category": "startup",
    "portal_url": "https://www.wavelogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Wave Media",
    "category": "remote",
    "portal_url": "https://www.wavemedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Wave Digital",
    "category": "visa_remote",
    "portal_url": "https://www.wavedigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Wave Software",
    "category": "india_tech",
    "portal_url": "https://www.wavesoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Wave Platform",
    "category": "ai_yc",
    "portal_url": "https://www.waveplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Wave Engine",
    "category": "company",
    "portal_url": "https://www.waveengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Wave Stack",
    "category": "startup",
    "portal_url": "https://www.wavestack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Xenon Labs",
    "category": "remote",
    "portal_url": "https://www.xenonlabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Xenon AI",
    "category": "visa_remote",
    "portal_url": "https://www.xenonai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Xenon Cloud",
    "category": "india_tech",
    "portal_url": "https://www.xenoncloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Xenon Systems",
    "category": "ai_yc",
    "portal_url": "https://www.xenonsystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Xenon Networks",
    "category": "company",
    "portal_url": "https://www.xenonnetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Xenon Data",
    "category": "startup",
    "portal_url": "https://www.xenondata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Xenon Tech",
    "category": "remote",
    "portal_url": "https://www.xenontech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Xenon Security",
    "category": "visa_remote",
    "portal_url": "https://www.xenonsecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Xenon Robotics",
    "category": "india_tech",
    "portal_url": "https://www.xenonrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Xenon Analytics",
    "category": "ai_yc",
    "portal_url": "https://www.xenonanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Xenon Pay",
    "category": "company",
    "portal_url": "https://www.xenonpay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Xenon Finance",
    "category": "startup",
    "portal_url": "https://www.xenonfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Xenon Health",
    "category": "remote",
    "portal_url": "https://www.xenonhealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Xenon Logistics",
    "category": "visa_remote",
    "portal_url": "https://www.xenonlogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Xenon Media",
    "category": "india_tech",
    "portal_url": "https://www.xenonmedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Xenon Digital",
    "category": "ai_yc",
    "portal_url": "https://www.xenondigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Xenon Software",
    "category": "company",
    "portal_url": "https://www.xenonsoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Xenon Platform",
    "category": "startup",
    "portal_url": "https://www.xenonplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Xenon Engine",
    "category": "remote",
    "portal_url": "https://www.xenonengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Xenon Stack",
    "category": "visa_remote",
    "portal_url": "https://www.xenonstack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Yield Labs",
    "category": "india_tech",
    "portal_url": "https://www.yieldlabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Yield AI",
    "category": "ai_yc",
    "portal_url": "https://www.yieldai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Yield Cloud",
    "category": "company",
    "portal_url": "https://www.yieldcloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Yield Systems",
    "category": "startup",
    "portal_url": "https://www.yieldsystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Yield Networks",
    "category": "remote",
    "portal_url": "https://www.yieldnetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Yield Data",
    "category": "visa_remote",
    "portal_url": "https://www.yielddata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Yield Tech",
    "category": "india_tech",
    "portal_url": "https://www.yieldtech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Yield Security",
    "category": "ai_yc",
    "portal_url": "https://www.yieldsecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Yield Robotics",
    "category": "company",
    "portal_url": "https://www.yieldrobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Yield Analytics",
    "category": "startup",
    "portal_url": "https://www.yieldanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Yield Pay",
    "category": "remote",
    "portal_url": "https://www.yieldpay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Yield Finance",
    "category": "visa_remote",
    "portal_url": "https://www.yieldfinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Yield Health",
    "category": "india_tech",
    "portal_url": "https://www.yieldhealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Yield Logistics",
    "category": "ai_yc",
    "portal_url": "https://www.yieldlogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Yield Media",
    "category": "company",
    "portal_url": "https://www.yieldmedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Yield Digital",
    "category": "startup",
    "portal_url": "https://www.yielddigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Yield Software",
    "category": "remote",
    "portal_url": "https://www.yieldsoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Yield Platform",
    "category": "visa_remote",
    "portal_url": "https://www.yieldplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Yield Engine",
    "category": "india_tech",
    "portal_url": "https://www.yieldengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Yield Stack",
    "category": "ai_yc",
    "portal_url": "https://www.yieldstack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zero Labs",
    "category": "company",
    "portal_url": "https://www.zerolabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zero AI",
    "category": "startup",
    "portal_url": "https://www.zeroai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zero Cloud",
    "category": "remote",
    "portal_url": "https://www.zerocloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zero Systems",
    "category": "visa_remote",
    "portal_url": "https://www.zerosystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zero Networks",
    "category": "india_tech",
    "portal_url": "https://www.zeronetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zero Data",
    "category": "ai_yc",
    "portal_url": "https://www.zerodata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zero Tech",
    "category": "company",
    "portal_url": "https://www.zerotech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zero Security",
    "category": "startup",
    "portal_url": "https://www.zerosecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zero Robotics",
    "category": "remote",
    "portal_url": "https://www.zerorobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zero Analytics",
    "category": "visa_remote",
    "portal_url": "https://www.zeroanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zero Pay",
    "category": "india_tech",
    "portal_url": "https://www.zeropay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zero Finance",
    "category": "ai_yc",
    "portal_url": "https://www.zerofinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zero Health",
    "category": "company",
    "portal_url": "https://www.zerohealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zero Logistics",
    "category": "startup",
    "portal_url": "https://www.zerologistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zero Media",
    "category": "remote",
    "portal_url": "https://www.zeromedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zero Digital",
    "category": "visa_remote",
    "portal_url": "https://www.zerodigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zero Software",
    "category": "india_tech",
    "portal_url": "https://www.zerosoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zero Platform",
    "category": "ai_yc",
    "portal_url": "https://www.zeroplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zero Engine",
    "category": "company",
    "portal_url": "https://www.zeroengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Zero Stack",
    "category": "startup",
    "portal_url": "https://www.zerostack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Alpha Labs",
    "category": "remote",
    "portal_url": "https://www.alphalabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Alpha AI",
    "category": "visa_remote",
    "portal_url": "https://www.alphaai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Alpha Cloud",
    "category": "india_tech",
    "portal_url": "https://www.alphacloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Alpha Systems",
    "category": "ai_yc",
    "portal_url": "https://www.alphasystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Alpha Networks",
    "category": "company",
    "portal_url": "https://www.alphanetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Alpha Data",
    "category": "startup",
    "portal_url": "https://www.alphadata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Alpha Tech",
    "category": "remote",
    "portal_url": "https://www.alphatech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Alpha Security",
    "category": "visa_remote",
    "portal_url": "https://www.alphasecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Alpha Robotics",
    "category": "india_tech",
    "portal_url": "https://www.alpharobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Alpha Analytics",
    "category": "ai_yc",
    "portal_url": "https://www.alphaanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Alpha Pay",
    "category": "company",
    "portal_url": "https://www.alphapay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Alpha Finance",
    "category": "startup",
    "portal_url": "https://www.alphafinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Alpha Health",
    "category": "remote",
    "portal_url": "https://www.alphahealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Alpha Logistics",
    "category": "visa_remote",
    "portal_url": "https://www.alphalogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Alpha Media",
    "category": "india_tech",
    "portal_url": "https://www.alphamedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Alpha Digital",
    "category": "ai_yc",
    "portal_url": "https://www.alphadigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Alpha Software",
    "category": "company",
    "portal_url": "https://www.alphasoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Alpha Platform",
    "category": "startup",
    "portal_url": "https://www.alphaplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Alpha Engine",
    "category": "remote",
    "portal_url": "https://www.alphaengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Alpha Stack",
    "category": "visa_remote",
    "portal_url": "https://www.alphastack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beta Labs",
    "category": "india_tech",
    "portal_url": "https://www.betalabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beta AI",
    "category": "ai_yc",
    "portal_url": "https://www.betaai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beta Cloud",
    "category": "company",
    "portal_url": "https://www.betacloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beta Systems",
    "category": "startup",
    "portal_url": "https://www.betasystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beta Networks",
    "category": "remote",
    "portal_url": "https://www.betanetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beta Data",
    "category": "visa_remote",
    "portal_url": "https://www.betadata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beta Tech",
    "category": "india_tech",
    "portal_url": "https://www.betatech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beta Security",
    "category": "ai_yc",
    "portal_url": "https://www.betasecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beta Robotics",
    "category": "company",
    "portal_url": "https://www.betarobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beta Analytics",
    "category": "startup",
    "portal_url": "https://www.betaanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beta Pay",
    "category": "remote",
    "portal_url": "https://www.betapay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beta Finance",
    "category": "visa_remote",
    "portal_url": "https://www.betafinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beta Health",
    "category": "india_tech",
    "portal_url": "https://www.betahealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beta Logistics",
    "category": "ai_yc",
    "portal_url": "https://www.betalogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beta Media",
    "category": "company",
    "portal_url": "https://www.betamedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beta Digital",
    "category": "startup",
    "portal_url": "https://www.betadigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beta Software",
    "category": "remote",
    "portal_url": "https://www.betasoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beta Platform",
    "category": "visa_remote",
    "portal_url": "https://www.betaplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beta Engine",
    "category": "india_tech",
    "portal_url": "https://www.betaengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Beta Stack",
    "category": "ai_yc",
    "portal_url": "https://www.betastack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Gamma Labs",
    "category": "company",
    "portal_url": "https://www.gammalabs.io/careers",
    "location": "San Francisco, CA / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Gamma AI",
    "category": "startup",
    "portal_url": "https://www.gammaai.io/careers",
    "location": "New York, NY / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Gamma Cloud",
    "category": "remote",
    "portal_url": "https://www.gammacloud.io/careers",
    "location": "London, UK / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Gamma Systems",
    "category": "visa_remote",
    "portal_url": "https://www.gammasystems.io/careers",
    "location": "Singapore / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Gamma Networks",
    "category": "india_tech",
    "portal_url": "https://www.gammanetworks.io/careers",
    "location": "Bengaluru, India / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Gamma Data",
    "category": "ai_yc",
    "portal_url": "https://www.gammadata.io/careers",
    "location": "Berlin, Germany / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Gamma Tech",
    "category": "company",
    "portal_url": "https://www.gammatech.io/careers",
    "location": "Tokyo, Japan / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Gamma Security",
    "category": "startup",
    "portal_url": "https://www.gammasecurity.io/careers",
    "location": "Sydney, Australia / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Gamma Robotics",
    "category": "remote",
    "portal_url": "https://www.gammarobotics.io/careers",
    "location": "Paris, France / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Gamma Analytics",
    "category": "visa_remote",
    "portal_url": "https://www.gammaanalytics.io/careers",
    "location": "Toronto, Canada / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Gamma Pay",
    "category": "india_tech",
    "portal_url": "https://www.gammapay.io/careers",
    "location": "Austin, TX / Remote",
    "actively_hiring": false,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Gamma Finance",
    "category": "ai_yc",
    "portal_url": "https://www.gammafinance.io/careers",
    "location": "Amsterdam, Netherlands / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Gamma Health",
    "category": "company",
    "portal_url": "https://www.gammahealth.io/careers",
    "location": "Stockholm, Sweden / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Gamma Logistics",
    "category": "startup",
    "portal_url": "https://www.gammalogistics.io/careers",
    "location": "Zurich, Switzerland / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Gamma Media",
    "category": "remote",
    "portal_url": "https://www.gammamedia.io/careers",
    "location": "Lagos, Nigeria / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Gamma Digital",
    "category": "visa_remote",
    "portal_url": "https://www.gammadigital.io/careers",
    "location": "Dubai, UAE / Remote",
    "actively_hiring": true,
    "visa_sponsorship": true,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Gamma Software",
    "category": "india_tech",
    "portal_url": "https://www.gammasoftware.io/careers",
    "location": "S\u00e3o Paulo, Brazil / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Gamma Platform",
    "category": "ai_yc",
    "portal_url": "https://www.gammaplatform.io/careers",
    "location": "Tel Aviv, Israel / Remote",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Gamma Engine",
    "category": "company",
    "portal_url": "https://www.gammaengine.io/careers",
    "location": "Seoul, South Korea / Remote",
    "actively_hiring": true,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  },
  {
    "name": "Gamma Stack",
    "category": "startup",
    "portal_url": "https://www.gammastack.io/careers",
    "location": "100% Remote Worldwide",
    "actively_hiring": false,
    "visa_sponsorship": false,
    "job_title": "Backend & AI Infrastructure Engineer"
  }
];
