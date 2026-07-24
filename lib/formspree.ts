export function getFormspreeEndpoint(): string {
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
  
  if (!endpoint) {
    console.error("Missing NEXT_PUBLIC_FORMSPREE_ENDPOINT environment variable. Form submissions will fail.");
    // Return a dummy endpoint so the app doesn't crash during build,
    // but the error is logged clearly.
    return "";
  }
  
  return endpoint;
}

// Add actual form submission logic here later
