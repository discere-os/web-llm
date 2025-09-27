import { prebuiltAppConfig } from "@mlc-ai/web-llm";

const phiModel = prebuiltAppConfig.model_list.find(
    (model) => model.model_id === "Phi-3.5-mini-instruct-q4f16_1-MLC-1k"
);

export default {
  model_list: [phiModel],
  use_web_worker: true,
};