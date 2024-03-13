interface Email {
  fromName: string;
  fromEmail: string;
  text: string;
}

export const sendEmail = async (email: Email) =>
  (
    await fetch(import.meta.env.VITE_API_URL + "/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    })
  ).ok;
