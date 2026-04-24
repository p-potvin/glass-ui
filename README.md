<img src="https://raw.githubusercontent.com/p-potvin/vaultwares-docs/main/logo/vaultwares-logo.svg">

# vault-flows

**AI Workflow GUI &amp; Local Runtime Bridge**  
**Part of the VaultWares Ecosystem** • <a href="https://docs.vaultwares.com">docs.vaultwares.com</a> • <a href="https://vaultwares.com">vaultwares.com</a>

**Frontend web app (Vite + React) that provides a beautiful GUI for creating, managing, and executing AI model workflows from vaultwares-pipelines (image enhancements, multi-modal models, conversational AI, digital twins, LoRA training, I2V/T2V, etc.). Includes local runtime bridge for ComfyUI/FaceFusion scanning and execution.**

Live demo: https://vault-flows.vercel.app

## Features
- Drag-and-drop workflow builder with real-time preview
- Local-first execution mode (no backend required for demos)
- Local runtime bridge for scanning ComfyUI models and running FaceFusion flows
- Multi-agent coordination prototype (Redis-based)
- Full sub-module integration (vault-themes, vaultwares-agentciation, facefusion)
- Vercel deployment ready + local HTTPS dev scripts
- Playwright E2E tests + linting

## Quick Start

```bash
git clone https://github.com/p-potvin/vault-flows.git
cd vault-flows
git submodule update --init --recursive
npm install
cp .env.example .env
npm run dev
```

For local bridge (ComfyUI + FaceFusion):

```bash
npm run bridge:local
```

## Architecture &amp; Agent Integration
Fully synchronized with the VaultWares Agent Knowledge Dissemination System.
- Agents automatically pull latest branding and guidelines from: → https://raw.githubusercontent.com/p-potvin/vaultwares-docs/main/agents/knowledge-dissemination.mdx
- Python Redis agents in agents/ and vaultwares-agentciation submodule coordinate workflows.
- See full details: [Agent Knowledge System](https://raw.githubusercontent.com/p-potvin/vaultwares-docs/main/agents/knowledge-dissemination.mdx)

## Environment Variables
- `VITE_API_URL` → leave empty for local demo/fallback mode

## Privacy &amp; Security
- Local-first by default
- No telemetry or external tracking
- Encrypted local storage options
- Full threat model in central VaultWares docs

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) and the central [Brand Guidelines](https://raw.githubusercontent.com/p-potvin/vaultwares-docs/main/agents/branding.mdx).

## License
GPL-3.0 (see [LICENSE](LICENSE))

Built with ❤️ for privacy
