import { useState } from "react";

export function useGoogleForm() {
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwDoBm9Yeqj2XpOdQx52knDPVgzGYWhYKnGSr-1fcN7FFuIpq0tdOCcMburFYn0BAB8/exec";

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(""); // "success", "error", ""

  const sendForm = async (formData) => {
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.result === "success") {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Google Form Error:", err);
      setStatus("error");
    }

    setLoading(false);
  };

  return { loading, status, sendForm, setStatus };
}
