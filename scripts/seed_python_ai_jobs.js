import { writeFileSync } from "fs";

// Python + AI Companies dataset tailored for Python Backend + AI Engineer in India:
const PYTHON_AI_COMPANIES = [
  // --- TOP AI & LLM PLATFORMS ---
  { name: "Anthropic", title: "Python Backend & AI Infrastructure Engineer", url: "https://anthropic.com/careers", location: "San Francisco, CA / Remote", note: "Python / LLM Infrastructure" },
  { name: "OpenAI", title: "Python Software Engineer - AI Systems", url: "https://openai.com/careers", location: "San Francisco, CA / Remote", note: "Python / AI API Platform" },
  { name: "Perplexity AI", title: "Python Backend & Search AI Engineer", url: "https://www.perplexity.ai/careers", location: "San Francisco, CA / Remote", note: "Python / RAG Search Backend" },
  { name: "Cohere", title: "Python Engineer - Enterprise AI", url: "https://cohere.com/careers", location: "Toronto / Remote", note: "Python / Enterprise LLM Services" },
  { name: "Mistral AI", title: "Python Backend Engineer - AI Models", url: "https://mistral.ai/careers/", location: "Paris / Remote", note: "Python / Open LLMs & APIs" },
  { name: "LangChain", title: "Python Backend Engineer - AI Frameworks", url: "https://www.langchain.com/careers", location: "San Francisco, CA / Remote", note: "Python / Agentic AI Frameworks" },
  { name: "LlamaIndex", title: "Python Backend Engineer - RAG Systems", url: "https://www.llamaindex.ai/careers", location: "San Francisco, CA / Remote", note: "Python / Data Frameworks for LLMs" },
  { name: "Pinecone", title: "Python Engineer - Vector Database", url: "https://www.pinecone.io/careers/", location: "New York, NY / Remote", note: "Python / High-Performance Vector DB" },
  { name: "Qdrant", title: "Python Backend Engineer - Vector Search", url: "https://qdrant.tech/careers/", location: "Berlin / Remote", note: "Python / Open Vector Search Engine" },
  { name: "Weaviate", title: "Python Software Engineer - AI Search", url: "https://weaviate.io/company/careers", location: "100% Remote", note: "Python / Vector Database Core" },
  { name: "Together AI", title: "Python Backend Engineer - AI Inference", url: "https://www.together.ai/careers", location: "San Francisco, CA / Remote", note: "Python / GPU Inference Cloud" },
  { name: "Baseten", title: "Python Backend Engineer - Model Serving", url: "https://www.baseten.co/careers/", location: "San Francisco, CA / Remote", note: "Python / Production AI Serving" },
  { name: "Modal", title: "Python Backend Engineer - Cloud Systems", url: "https://modal.com/careers", location: "New York, NY / Remote", note: "Python / Serverless Compute Engine" },
  { name: "Weights & Biases", title: "Python Backend Engineer - MLOps", url: "https://wandb.ai/site/careers", location: "San Francisco, CA / Remote", note: "Python / AI Experiment Tracking" },
  { name: "Hugging Face", title: "Python Backend & Open-Source AI Engineer", url: "https://huggingface.co/jobs", location: "NYC / Paris / Remote", note: "Python / Open AI Ecosystem" },
  { name: "Scale AI", title: "Python Backend Engineer - AI Data Engine", url: "https://scale.com/careers", location: "San Francisco, CA", note: "Python / Generative AI Data Platform" },

  // --- TOP PRODUCT UNICORNS IN INDIA (BENGALURU / GURGAON / HYDERABAD / REMOTE) ---
  { name: "Postman", title: "Senior Python Backend Engineer", url: "https://www.postman.com/company/careers/", location: "Bengaluru, India / Remote", note: "Python / API Platform Core" },
  { name: "Hasura", title: "Python Backend & AI Services Engineer", url: "https://hasura.io/careers/", location: "Bengaluru, India / Remote", note: "Python / Data Engine & AI APIs" },
  { name: "Swiggy", title: "Python Backend Developer - AI & Logistics", url: "https://careers.swiggy.com", location: "Bengaluru, India / Remote", note: "Python / Microservices & Search AI" },
  { name: "Flipkart", title: "Python Backend Engineer - Search & Recommendation", url: "https://careers.flipkart.com", location: "Bengaluru, India", note: "Python / E-Commerce ML Platform" },
  { name: "Razorpay", title: "Senior Python Backend Developer", url: "https://razorpay.com/jobs/", location: "Bengaluru, India", note: "Python / High-Scale Financial Microservices" },
  { name: "Freshworks", title: "Python Backend & AI Engineer (Freddy AI)", url: "https://www.freshworks.com/careers/", location: "Chennai / Bengaluru, India", note: "Python / Enterprise GenAI" },
  { name: "BrowserStack", title: "Python Backend Software Engineer", url: "https://www.browserstack.com/careers", location: "Mumbai, India / Remote", note: "Python / DevTools Cloud Infra" },
  { name: "InMobi", title: "Python Backend & AI Engineer", url: "https://www.inmobi.com/company/careers/", location: "Bengaluru, India", note: "Python / AdTech AI & Big Data" },
  { name: "CRED", title: "Python Backend Developer", url: "https://cred.club/careers", location: "Bengaluru, India", note: "Python / High-Scale Payments Engine" },
  { name: "Groww", title: "Python Backend Systems Engineer", url: "https://groww.in/careers", location: "Bengaluru, India", note: "Python / WealthTech Microservices" },
  { name: "Zerodha", title: "Python Backend Software Engineer", url: "https://zerodha.com/careers", location: "Bengaluru, India / Remote", note: "Python / Open Core Trading Tech" },
  { name: "Meesho", title: "Python Backend Engineer - Personalization", url: "https://meesho.io/careers", location: "Bengaluru, India", note: "Python / E-Commerce AI Recommendation" },
  { name: "Zepto", title: "Python Backend Developer", url: "https://www.zepto.co/careers", location: "Mumbai / Bengaluru, India", note: "Python / Quick Commerce Logistics Engine" },
  { name: "Zomato", title: "Python Backend Engineer - Dispatch AI", url: "https://www.zomato.com/careers", location: "Gurgaon, India", note: "Python / Dispatch & Demand Forecasting AI" },
  { name: "Ola", title: "Python Backend Developer", url: "https://www.olacabs.com/careers", location: "Bengaluru, India", note: "Python / Mobility & Fleet Systems" },
  { name: "MakeMyTrip", title: "Python Backend Engineer", url: "https://careers.makemytrip.com", location: "Gurgaon, India", note: "Python / Travel Search & Personalization AI" },

  // --- VISA SPONSORSHIP & RELOCATION FOR INDIAN ENGINEERS ---
  { name: "Booking.com", title: "Python Backend & ML Engineer", url: "https://jobs.booking.com", location: "Amsterdam, Netherlands (Visa & Relocation)", note: "Python / Search & ML Systems (Visa Sponsor)" },
  { name: "Adyen", title: "Python Backend Engineer", url: "https://careers.adyen.com", location: "Amsterdam, Netherlands (Visa & Relocation)", note: "Python / Global Payment Platform (Visa Sponsor)" },
  { name: "Delivery Hero", title: "Senior Python Backend Developer", url: "https://careers.deliveryhero.com", location: "Berlin, Germany (Visa & Relocation)", note: "Python / Global Quick-Commerce Engine (Visa Sponsor)" },
  { name: "Zalando", title: "Python Backend Engineer - Personalization AI", url: "https://jobs.zalando.com", location: "Berlin, Germany (Visa & Relocation)", note: "Python / E-Commerce Personalization (Visa Sponsor)" },
  { name: "Personio", title: "Python Backend Engineer", url: "https://www.personio.com/careers", location: "Munich, Germany (Visa & Relocation)", note: "Python / HR Tech SaaS Platform (Visa Sponsor)" },
  { name: "Bolt", title: "Python Backend Software Engineer", url: "https://bolt.eu/careers/", location: "Tallinn, Estonia (Visa & Relocation)", note: "Python / Mobility & Ride-Hailing Platform (Visa Sponsor)" },
  { name: "Shopee", title: "Python Backend & AI Engineer", url: "https://careers.shopee.sg", location: "Singapore (Visa & Relocation)", note: "Python / E-Commerce Backend (Visa Sponsor)" },
  { name: "Rakuten", title: "Python Software Engineer - AI Cloud", url: "https://rakuten.careers", location: "Tokyo, Japan (Visa & Relocation)", note: "Python / AI & Cloud Services (Visa Sponsor)" },
  { name: "Mercari", title: "Python Backend & ML Engineer", url: "https://careers.mercari.com", location: "Tokyo, Japan (Visa & Relocation)", note: "Python / Marketplace AI (Visa Sponsor)" },
  { name: "LY Corporation (LINE)", title: "Python Backend Developer", url: "https://linecorp.com/en/career/", location: "Tokyo, Japan (Visa & Relocation)", note: "Python / Messaging & AI Services (Visa Sponsor)" },
  { name: "Careem", title: "Python Backend Engineer", url: "https://www.careem.com/careers/", location: "Dubai, UAE (Visa & Relocation)", note: "Python / Super-App Microservices (Visa Sponsor)" },
  { name: "Spotify", title: "Python Backend Engineer - Music AI", url: "https://www.lifeatspotify.com", location: "Stockholm / London (Visa & Relocation)", note: "Python / Music Discovery & Personalization (Visa Sponsor)" },
  { name: "Wise", title: "Python Backend Engineer", url: "https://wise.jobs", location: "London / Tallinn (Visa & Relocation)", note: "Python / Global Banking & FX Engine (Visa Sponsor)" },
  { name: "Revolut", title: "Python Backend Software Engineer", url: "https://www.revolut.com/careers/", location: "London / Europe (Visa & Relocation)", note: "Python / Core Banking Microservices (Visa Sponsor)" },

  // --- 100% REMOTE WORLDWIDE (HIRES IN INDIA) ---
  { name: "GitLab", title: "Python Backend Engineer - AI Features", url: "https://about.gitlab.com/jobs/", location: "100% Remote (Hires in India)", note: "Python / DevSecOps & AI Code Suggestions" },
  { name: "Automattic", title: "Python Backend Developer", url: "https://automattic.com/work-with-us/", location: "100% Remote (Hires in India)", note: "Python / WordPress & AI Tools Engine" },
  { name: "Zapier", title: "Python Backend Software Engineer", url: "https://zapier.com/jobs", location: "100% Remote (Hires in India)", note: "Python / Integration & AI Workflows Engine" },
  { name: "Canonical", title: "Python Software Engineer - Cloud & Ubuntu", url: "https://canonical.com/careers", location: "100% Remote (Hires in India)", note: "Python / Open Source & Cloud Automation" },
  { name: "DuckDuckGo", title: "Python Backend Developer", url: "https://duckduckgo.com/hiring", location: "100% Remote (Hires in India)", note: "Python / Private Search & AI Features" },
  { name: "Customer.io", title: "Python Backend Engineer", url: "https://customer.io/careers/", location: "100% Remote (Hires in India)", note: "Python / Messaging Data Pipeline" },
  { name: "Doist", title: "Python Backend Developer", url: "https://doist.com/careers", location: "100% Remote (Hires in India)", note: "Python / Productivity & AI Assistant Engine" },
  { name: "Sentry", title: "Python Backend Engineer", url: "https://sentry.io/careers/", location: "100% Remote (Hires in India)", note: "Python / Open Source Error Monitoring Engine" },
  { name: "Better Stack", title: "Python Backend Developer", url: "https://betterstack.com/careers", location: "100% Remote (Hires in India)", note: "Python / Observability & Uptime Infrastructure" },
  { name: "Trigger.dev", title: "Python Backend Engineer", url: "https://trigger.dev/careers", location: "100% Remote (Hires in India)", note: "Python / Background Jobs Engine" },
  { name: "Supabase", title: "Python Backend & AI Developer", url: "https://supabase.com/careers", location: "100% Remote (Hires in India)", note: "Python / Vector & Postgres AI Platform" },
  { name: "Vercel", title: "Python & Cloud Backend Engineer", url: "https://vercel.com/careers", location: "100% Remote (Hires in India)", note: "Python / AI SDK & Edge Compute Engine" },
  { name: "Resend", title: "Python Backend Software Engineer", url: "https://resend.com/careers", location: "100% Remote (Hires in India)", note: "Python / Transactional Email Engine" },
  { name: "Clerk", title: "Python Backend Engineer", url: "https://clerk.com/careers", location: "100% Remote (Hires in India)", note: "Python / Authentication & User Management Engine" }
];

const userIds = [
  "70159a67-e787-4fdc-92a3-0ee0969c3753", // lp141015@gmail.com
  "698e54f8-cd41-4eba-af93-80a4d8b5d8db", // lakshmanpatel230@gmail.com
  "3db69d62-6ede-46be-af62-2f5c00eb8351", // admin@tracker.app
];

function sqlEscape(str) {
  if (!str) return "NULL";
  return "'" + str.replace(/'/g, "''") + "'";
}

let sql = `-- Dedicated Python Backend + AI Engineer Job Seeding\n\n`;

let companyCount = 0;
let jobCount = 0;

for (const userId of userIds) {
  let order = 0;
  for (const item of PYTHON_AI_COMPANIES) {
    const companyId = `comp_py_${userId.substring(0, 8)}_${item.name.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
    const jobId = `job_py_${userId.substring(0, 8)}_${item.name.toLowerCase().replace(/[^a-z0-9]/g, "")}`;

    sql += `INSERT OR IGNORE INTO companies (id, user_id, name, portal_url) VALUES (${sqlEscape(companyId)}, ${sqlEscape(userId)}, ${sqlEscape(item.name)}, ${sqlEscape(item.url)});\n`;
    companyCount++;

    const desc = `Targeted Python Backend + AI Role at ${item.name}. Direct application link: ${item.url}.`;
    const notes = `${item.note} | Dedicated Python + AI Career Track (Laid-off Nov 2025 priority application)`;

    sql += `INSERT OR IGNORE INTO jobs (id, user_id, company_id, company, title, url, location, status, sort_order, description, notes)\n`;
    sql += `VALUES (${sqlEscape(jobId)}, ${sqlEscape(userId)}, ${sqlEscape(companyId)}, ${sqlEscape(item.name)}, ${sqlEscape(item.title)}, ${sqlEscape(item.url)}, ${sqlEscape(item.location)}, 'wishlist', ${order}, ${sqlEscape(desc)}, ${sqlEscape(notes)});\n`;
    jobCount++;
    order += 5;
  }
}

writeFileSync("migrations/seed_python_ai_jobs.sql", sql);
console.log(`Generated Python + AI seed SQL with ${companyCount} companies and ${jobCount} targeted jobs.`);
