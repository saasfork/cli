/**
 * Gère les erreurs de manière standardisée
 * @param {Error} error - L'erreur à gérer
 * @param {string} step - L'étape où l'erreur s'est produite
 * @param {boolean} [exitProcess=false] - Si true, termine le processus après l'affichage de l'erreur
 */
export function handleError(error, step, exitProcess = false) {
  console.error(`\n❌ Error during ${step}:`);
  console.error(error.message);
  
  if (error.stdout) {
    console.error("Command output:", error.stdout.toString());
  }
  
  console.error("\nPlease check the error above and try again.");
  
  if (exitProcess) {
    process.exit(1);
  }
}