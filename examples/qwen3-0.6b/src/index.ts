import * as webllm from "@mlc-ai/web-llm";

async function main() {
  const selectedModel = "Qwen3-0.6B-q4f16_1-MLC";

  const engine = await webllm.CreateMLCEngine(
    selectedModel,
    {
      initProgressCallback: (progress) => {
        console.log(progress);
      },
    }
  );

  async function askQuestion(question: string) {
    console.log(`%cAsking: ${question}`, "color: blue; font-weight: bold;");

    const request: webllm.ChatCompletionRequest = {
      messages: [{ role: "user", content: question }],
    };

    const reply = await engine.chat.completions.create(request);
    console.log(reply);

    const usage = reply.usage;
    if (usage) {
      console.log(
        `Prompt tokens: ${usage.prompt_tokens}, Completion tokens: ${usage.completion_tokens}`
      );
    }

    const stats = await engine.runtimeStatsText();
    console.log(stats);
  }

  const questions = [
    "How many r's are there in the word strawberry?",
    "Does God Exist?",
  ];

  for (const question of questions) {
    await askQuestion(question);
    console.log("-".repeat(50));
  }
}

main();
