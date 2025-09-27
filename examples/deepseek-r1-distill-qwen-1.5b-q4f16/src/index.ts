import * as webllm from "@mlc-ai/web-llm";

async function main() {
  const selectedModel = "DeepSeek-R1-Distill-Qwen-1.5B-q4f16_1-MLC";

  const appConfig: webllm.AppConfig = {
    "model_list": [
      {
        "model": "https://huggingface.co/mlc-ai/DeepSeek-R1-Distill-Qwen-1.5B-q4f16_1-MLC/resolve/main/",
        "model_id": "DeepSeek-R1-Distill-Qwen-1.5B-q4f16_1-MLC",
        "model_lib": "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/web-llm-models/v0_2_48/Qwen2-1.5B-Instruct-q4f16_1-ctx4k_cs1k-webgpu.wasm",
      }
    ]
  };

  const engine = await webllm.CreateMLCEngine(
    selectedModel,
    {
      initProgressCallback: (progress) => {
        console.log(progress);
      },
      appConfig: appConfig
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
