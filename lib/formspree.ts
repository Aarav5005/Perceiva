export interface FormData {
  role: string;
  school: string;
  city: string;
  board: string;
  challenge: string;
  email: string;
}

export async function submitToFormspree(data: FormData) {
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

  if (!endpoint || endpoint === "your_formspree_endpoint" || endpoint === "") {
    console.log("No Formspree endpoint configured. Mock submission successful.");
    console.log("Form Data:", data);
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    return { success: true };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return { success: true };
    } else {
      console.error("Formspree submission failed", await response.text());
      return { success: false, error: "Failed to submit form" };
    }
  } catch (error) {
    console.error("Error submitting form to Formspree:", error);
    return { success: false, error: "Network error" };
  }
}
