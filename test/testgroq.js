// Default
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "",
});

async function main() {
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: "",
        },
      ],
      model: "llama-3.3-70b-versatile",
    })
    .then((chatCompletion) => {
      console.log(chatCompletion.choices[0]?.message?.content || "");
    });
}

main();
