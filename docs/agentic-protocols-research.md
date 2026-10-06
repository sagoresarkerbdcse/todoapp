# Agentic AI Protocols: Research Notes

_Last updated: 2026-10-06_

An "agentic protocol" is an open standard that lets AI agents connect to tools, to other agents, to user interfaces and to payment systems. No single protocol covers everything. Each one handles one layer, and real systems usually combine two or three.

## 1. The protocol stack

| Layer | Protocol | Backed by | What it standardizes |
|---|---|---|---|
| Agent ↔ tools/data | **MCP** (Model Context Protocol) | Anthropic (Nov 2024), now under the Linux Foundation's Agentic AI Foundation | How a model or agent finds and calls tools, resources and prompts on external servers |
| Agent ↔ agent | **A2A** (Agent2Agent) | Google (Apr 2025), Linux Foundation | How agents that don't share code find each other (via "Agent Cards"), hand off tasks and stream results |
| Agent ↔ user interface | **AG-UI** / A2UI | CopilotKit / Google | Streaming agent events, state and UI components to a frontend |
| Checkout | **ACP** (Agentic Commerce Protocol) | OpenAI + Stripe | Checkout between an agent and a merchant; powers ChatGPT Instant Checkout |
| Commerce discovery | **UCP** (Universal Commerce Protocol) | Google | Product discovery and the shopping flow across merchants |
| Payment authorization | **AP2** (Agent Payments Protocol) | Google + 60+ partners | Signed "Mandates" from the user that set what the agent may spend, on what, and for how long |
| Settlement | **x402** | Coinbase | Revives HTTP 402 "Payment Required" for per-request agent payments, often in stablecoins |
| Agent identity | **TAP** (Trusted Agent Protocol) | Visa | Lets merchants verify that an agent is legitimate and acting for a real cardholder |

> Note: IBM's earlier *Agent Communication Protocol* also used the name "ACP" and was merged into A2A in 2025. Today "ACP" usually means OpenAI and Stripe's commerce protocol.

## 2. Key points

1. **MCP and A2A work together; they don't compete.** MCP covers how an agent reaches the systems it needs. A2A covers how separate agents collaborate. Both use JSON-RPC 2.0. MCP connects one client to many servers, while A2A links peer agents that each have their own job.
2. **Governance has become neutral.** In December 2025 Anthropic donated MCP to the **Agentic AI Foundation** (AAIF), a Linux Foundation fund co-founded with OpenAI and Block and backed by Google, Microsoft, AWS, Cloudflare and Bloomberg. It also hosts Block's *goose* and OpenAI's *AGENTS.md*. A2A is also under the Linux Foundation.
3. **Adoption figures** (vendor and blog numbers, so treat them as approximate):
   - MCP: about 97M SDK downloads per month and over 10,000 public servers. It is supported in ChatGPT, Gemini, Copilot, VS Code and Cursor.
   - A2A: reached v1.0 in April 2026 and is supported by 150+ organizations.
4. **Commerce is the most contested area.** ACP (OpenAI/Stripe) and Google's UCP + AP2 overlap the most. A typical commerce stack is MCP, plus one checkout protocol, plus one authorization protocol, plus a settlement rail.
5. **Security is the main open problem.** Recent papers cover attacks on A2A ("A2ABreak") and argue for checking an agent's whole sequence of actions, not just each action alone. With MCP, the known risks are prompt injection through tool outputs, servers that over-request permissions, and supply-chain risk from third-party servers.

## 3. Practical guidance

- **For a single agent using tools or data:** start with MCP. It has the largest ecosystem and the most mature SDKs.
- **For multi-agent or cross-organization workflows:** add A2A.
- **For agent features in a product UI:** consider AG-UI.
- **For payments:** use ACP to sell inside ChatGPT, or UCP + AP2 for Google surfaces. Add x402 for machine-to-machine micropayments.

## 4. Google's recent work (2026)

### Late September 2026: routine platform updates
- The **Gemini Enterprise Agent Platform** received incremental updates: tiered location configuration, clearer messages when a governance policy denies an action, and Agent Platform SDK for Python 2.0.1. These are maintenance releases, not new protocols.

### Google I/O 2026 (May): consumer agents and commerce
- **Gemini Spark** is an always-on personal agent in the Gemini app. It runs on dedicated cloud VMs and works through long tasks in the background.
- **Search agents** are user-created agents that keep watching news, blogs, social posts and financial or sports data for updates.
- **Universal Cart** is one shopping cart shared across Search, Gemini, YouTube and Gmail, with price tracking and deal finding in the background.
- **UCP expansion:** checkout through UCP is expanding to Canada and Australia, then the U.K. It is also coming to YouTube in the U.S. and to new categories, starting with hotel booking and local food delivery.
- **A2A in production** at 150+ organizations, including Microsoft, AWS, Salesforce, SAP, ServiceNow, PayPal, Workday and LangChain.
- **Gemini 3.5 Flash** is a model built for autonomous action, available in Antigravity, the Gemini API and Android Studio.

### Cloud Next and the A2A anniversary (April 2026)
- **A2A v1.0**, and later **v1.2**, which added gRPC transport, signed Agent Cards so you can verify an agent's identity, and latency broadcasting.
- **ADK 1.0** (Agent Development Kit), Google's framework for building agents, reached a stable release.
- **AP2 v0.2.0** shipped with reference implementations in Python, TypeScript, Kotlin and Go. Public deployments so far:
  - a PayPal wallet integration
  - a Mastercard Agent Pay pilot
  - the A2A x402 extension for crypto payments

### January 2026: UCP launched
- Google released the **Universal Commerce Protocol** as an open standard for agent-driven shopping. It is Google's answer to ACP.

### What it adds up to
Google now has a protocol for most layers of the agent stack: A2A for agents working with other agents, UCP for shopping and checkout, AP2 for payment authorization, and ADK for building agents. It puts those protocols into its own products to drive adoption. For tool access, though, Google supports Anthropic's MCP instead of shipping its own competing protocol.

## Sources

- [Anthropic – Donating MCP and establishing the Agentic AI Foundation](https://anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation)
- [AAIF (Linux Foundation)](https://aaif.io/?p=1846)
- [IT Brief – Linux Foundation unveils agentic AI standards group](https://itbrief.co.nz/story/linux-foundation-unveils-agentic-ai-standards-group)
- [Linuxiac – MCP joins Linux Foundation](https://linuxiac.com/model-context-protocol-joins-linux-foundation-in-major-ai-shift/)
- [YourStory – OpenAI, Anthropic, Block launch AAIF](https://yourstory.com/ai-story/agentic-ai-foundation-openai-anthropic-linux)
- [OneReach – MCP vs A2A](https://onereach.ai/blog/guide-choosing-mcp-vs-a2a-protocols/)
- [DEV – MCP vs A2A complete guide 2026](https://dev.to/pockit_tools/mcp-vs-a2a-the-complete-guide-to-ai-agent-protocols-in-2026-30li)
- [Beam AI – Agent2Agent vs MCP](https://beam.ai/agentic-insights/agent2agent-vs-mcp-2026-ai-agent-stack)
- [Intuz – MCP vs A2A](https://www.intuz.com/blog/mcp-vs-a2a/)
- [AI Magicx – MCP vs A2A vs ACP](https://www.aimagicx.com/blog/mcp-vs-a2a-vs-acp-ai-agent-protocols-guide-2026)
- [Crossmint – Agentic payments protocols compared](https://crossmint.com/learn/agentic-payments-protocols-compared)
- [BlindPay – AP2 vs ACP vs x402](https://blindpay.com/resources/more/agent-payment-protocols-compared)
- [FourWeekMBA – ACP vs AP2](https://fourweekmba.com/acp-vs-ap2-the-agentic-commerce-standards-war-that-will-reshape-the-web)
- [Stellagent – MCP, A2A, UCP](https://stellagent.ai/insights/agentic-ai-protocols-mcp-a2a-ucp)
- [SoftwareSeni – Beyond MCP](https://www.softwareseni.com/beyond-mcp-universal-commerce-protocol-agent-payments-and-the-vertical-protocol-stack-for-ai-agents)
- [arXiv – A2ABreak: security analysis of A2A](https://arxiv.org/pdf/2609.10871)
- [arXiv – Securing Agentic AI: trajectory assurance](https://arxiv.org/pdf/2608.01558)
- [arXiv – Infrastructure for the Agentic Web](https://arxiv.org/pdf/2606.20570)
- [Gemini Enterprise Agent Platform release notes](https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes)
- [Google Blog – I/O 2026: Welcome to the agentic Gemini era](https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-collection/)
- [Google Developers Blog – I/O 2026 developer keynote](https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/)
- [eWeek – Google I/O 2026: 10 key takeaways](https://www.eweek.com/news/google-io-2026-ai-agents-gemini-search/)
- [Labellerr – Google I/O 2026 announcements](https://www.labellerr.com/blog/google-io-2026-biggest-announcements/)
- [eCommerceNews – Google unveils AI search agent tools](https://e-commerce.news/story/google-unveils-ai-search-agent-tools-at-i-o-2026)
- [The Next Web – Google Cloud Next 2026](https://thenextweb.com/news/google-cloud-next-ai-agents-agentic-era)
- [Linux Foundation – A2A surpasses 150 organizations](https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year)
- [Ailoitte – A2A upgrade at I/O 2026](https://www.ailoitte.com/blog/google-a2a-protocol-enterprise/)
- [TechCrunch – Google announces new commerce protocol (Jan 2026)](https://techcrunch.com/2026/01/11/google-announces-a-new-protocol-to-facilitate-commerce-using-ai-agents/)
- [Chain Store Age – Google expands agentic commerce standard](https://chainstoreage.com/google-expands-capabilities-agentic-commerce-standard)
- [Efficiently Connected – I/O 2026: UCP and AP2](https://www.efficientlyconnected.com/google-io-2026-agentic-commerce-protocols-ucp-ap2/)
- [ALM Corp – Universal Cart, UCP, AP2](https://almcorp.com/blog/google-universal-cart-ucp-ap2-merchant-center/)
- [Eco – AP2 explained](https://eco.com/support/en/articles/14845479-ap2-agent-payments-protocol-explained)
- [Wikipedia – Agent2Agent](https://en.wikipedia.org/wiki/Agent2Agent)
