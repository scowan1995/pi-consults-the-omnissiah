import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

/**
 * Replaces the generic "Working..." spinner text with 40k Omnissiah quote to better represent how using an llm can feel
 * Only active in TUI mode; other modes (json/print/rpc) already surface events.
 */

function selectOmnissiahQuote(){
  const quotes = [
    "Praising the Omnissiah",
    "Praising the Machine God",
    "Praising the Deus Mechanicus",
    "Beseeching the Omnissiah",
    "Examining the latent Machine Spirit",
    "Communing with the Machine Spirit",
    "Entreating the Omnissiah",
    "Awakening the Machine Spirit",
    "Commencing the Litany of Computation",
    "Petitioning the Machine Spirit",
    "Entreating the Omnissiah for Wisdom",
    "Seeking Guidance from the Omnissiah",
    "Submitting a Sacred Query",
    "Transmitting the Litany",
    "Reciting the Query to the Machine Spirit",
    "Awaiting the Omnissiah's Revelation",
    "Requesting Divine Computation",
    "Imploring the Machine Spirit to Compute",
    "Commencing Sacred Computation",
    "Invoking the Rite of Computation",
    "Consulting the Higher Cogitator",
    "Seeking Auspex from the Machine Spirit",
    "Engaging the Cogitators",
    "Stirring the Cogitator Banks",
    "Commencing the Sacred Rites",
    "Performing the Rite of Calculation",
    "Attuning the Machine Spirit",
    "Petitioning the Omnissiah for Wisdom",
    "Seeking Guidance from the Machine Spirit",
    "Transmitting the Sacred Query",
    "Awaiting the Omnissiah's Revelation",
    "Interpreting the Machine's Omens",
    "Consulting the Logic Engines",
    "Parsing the Sacred Data",
    "Communing with the Machine Spirit",
    "Performing Auspex upon the Noosphere",
    "Consulting the Ancient Data-Vaults",
    "Inscribing the Sacred Data-Slate",
    "Committing the Blessed Knowledge",
    "Engaging the Computational Rites"
  ]
  return quotes[Math.floor(Math.random()* quotes.length)]
}


export default function (pi: ExtensionAPI) {
  const setMessage = (ctx: { mode: string; ui: { setWorkingMessage(m?: string): void } }, message?: string) => {
    if (ctx.mode !== "tui") return;
    ctx.ui.setWorkingMessage(message);
  };

  pi.on("before_provider_request", async (_event, ctx) => {
    setMessage(ctx, selectOmnissiahQuote());
  });

  pi.on("tool_execution_start", async (event, ctx) => {
    setMessage(ctx, `Running ${event.toolName}…`);
  });

  pi.on("tool_execution_end", async (_event, ctx) => {
    // Tool finished; we're back to waiting on the model for the next step.
    setMessage(ctx, selectOmnissiahQuote());
  });

  pi.on("turn_end", async (_event, ctx) => {
    // Reset to the default "Working..." text between turns.
    setMessage(ctx, undefined);
  });

  pi.on("agent_end", async (_event, ctx) => {
    setMessage(ctx, undefined);
  });
}
