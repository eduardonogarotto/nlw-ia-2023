import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const videoURL = input.value

  // Verificar se a URL possui a palavra shorts. Nesta verificação, se ela não possuir o sistema emitira um erro e não prosseguirá com o código.
  if (!videoURL.includes("shorts")) {
    alert(
      "Parece que este video não é um shorts, por favor verifique a URL do vídeo."
    )
    return (content.textContent =
      "Aguardando a inserção de uma URL correta. Certifique-se de que na url existe a palavra shorts. Ex.: https://www.youtube.com/shorts/xxxxxxxxx.")
  }

  /* Tratando a URL do vídeo para pegar apenas o ID do vídeo.
  / Utilizar a palavra /shorts/ para separar em um array a URL do video. Ex.: [youtube.com, IDdovideo]. Como o que nos interessa é
  a segunda parte da URL (o IDdoVideo) podemos omitir a primeira posição do array ([_, params]) */
  const [_, params] = videoURL.split("/shorts/")
  /* Continuação do tratamento: retirar possíveis caracteres que compõem a URL do video apó o ID. Como iremos ignorar o que vier depois do ID do video, não existe necessidade de colocar as demais posições do array. */
  const [videoID] = params.split("?si")

  content.textContent = "Obtendo o texto do áudio"

  const transcription = await server.get("/summary/" + videoID)

  content.textContent = "O resumo está sendo gerado. Aguarde..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
