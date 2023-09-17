import { pipeline } from "@xenova/transformers"

export async function sumarize(text) {
  try {
    console.log("Realizando o resumo...")

    const generator = await pipeline(
      "summarization",
      "xenova/distilbart-cnn-12-6"
    )

    const output = await generator(text)
    console.log("Resumo concluído com sucesso!")
    return output[0].summary_text
  } catch (error) {
    console.log("Não foi possível realizar o resumo.", error)
    throw new Error(error)
  }
}
