export function handleError(error, step) {
  console.error(`\n❌ Error during ${step}:`);
  console.error(error.message);
  
  if (error.stdout) {
    console.error("Command output:", error.stdout.toString());
  }
  
  console.error("\nPlease check the error above and try again.");
  process.exit(1);
}