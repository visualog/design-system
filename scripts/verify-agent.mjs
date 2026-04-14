import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredFiles = [
  "AGENTS.md",
  "src/App.tsx",
  "src/components/Sidebar.tsx",
  "src/components/MainContent.tsx",
  "src/components/ui/ProposalNotification.tsx",
  "src/lib/firebase.ts",
  "docs/architecture/agent-context.md",
  "docs/agent-playbooks/ui-page-change.md",
  "docs/agent-playbooks/firebase-auth-rules.md",
  "docs/configuration/firebase-and-deployment.md",
  "docs/onboarding/engineering-onboarding-checklist.md",
];

const requiredEnvKeys = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
  "VITE_PROPOSAL_ADMIN_EMAILS",
];

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

const missingFiles = requiredFiles.filter((relativePath) => {
  return !fs.existsSync(path.join(root, relativePath));
});

const envExamplePath = path.join(root, ".env.example");
const envExample = readFileSafe(envExamplePath) ?? "";
const missingEnvKeys = requiredEnvKeys.filter((key) => !envExample.includes(`${key}=`));
const appSource = readFileSafe(path.join(root, "src/App.tsx")) ?? "";
const readmeSource = readFileSafe(path.join(root, "README.md")) ?? "";
const agentContextSource =
  readFileSafe(path.join(root, "docs/architecture/agent-context.md")) ?? "";
const sidebarSource = readFileSafe(path.join(root, "src/components/Sidebar.tsx")) ?? "";
const useProposalsSource =
  readFileSafe(path.join(root, "src/hooks/useProposals.ts")) ?? "";
const firebaseSource = readFileSafe(path.join(root, "src/lib/firebase.ts")) ?? "";
const authContextSource =
  readFileSafe(path.join(root, "src/contexts/AuthContext.tsx")) ?? "";
const proposalNotificationSource =
  readFileSafe(path.join(root, "src/components/ui/ProposalNotification.tsx")) ?? "";
const firebaseConfigDocSource =
  readFileSafe(path.join(root, "docs/configuration/firebase-and-deployment.md")) ?? "";
const agentsSource = readFileSafe(path.join(root, "AGENTS.md")) ?? "";

const documentedRoutes = [
  "/overview",
  "/colors",
  "/typography",
  "/spacing",
  "/layout",
  "/radius",
  "/icons",
  "/shadows",
  "/guide/components/button",
  "/site-settings/theme",
  "/site-settings/layout",
  "/site-settings/typography",
  "/site-settings/components",
  "/login",
];

const sidebarRoutes = [
  "/overview",
  "/colors",
  "/typography",
  "/spacing",
  "/layout",
  "/radius",
  "/icons",
  "/shadows",
  "/guide/components/button",
  "/site-settings/theme",
  "/site-settings/layout",
  "/site-settings/typography",
  "/site-settings/components",
];

const failures = [];

if (missingFiles.length > 0) {
  failures.push(`Missing required files: ${missingFiles.join(", ")}`);
}

if (missingEnvKeys.length > 0) {
  failures.push(`Missing env example keys: ${missingEnvKeys.join(", ")}`);
}

for (const route of documentedRoutes) {
  if (!appSource.includes(`path="${route}"`)) {
    failures.push(`Route missing from src/App.tsx: ${route}`);
  }

  if (!readmeSource.includes(`\`${route}\``)) {
    failures.push(`Route missing from README.md: ${route}`);
  }

  if (!agentContextSource.includes(`\`${route}\``)) {
    failures.push(`Route missing from docs/architecture/agent-context.md: ${route}`);
  }
}

for (const route of sidebarRoutes) {
  if (!sidebarSource.includes(`to="${route}"`)) {
    failures.push(`Sidebar route missing from src/components/Sidebar.tsx: ${route}`);
  }
}

if (!proposalNotificationSource.includes("VITE_PROPOSAL_ADMIN_EMAILS")) {
  failures.push(
    "src/components/ui/ProposalNotification.tsx no longer references VITE_PROPOSAL_ADMIN_EMAILS"
  );
}

if (!firebaseConfigDocSource.includes("VITE_PROPOSAL_ADMIN_EMAILS")) {
  failures.push(
    "docs/configuration/firebase-and-deployment.md is missing VITE_PROPOSAL_ADMIN_EMAILS guidance"
  );
}

if (!agentsSource.includes("docs/onboarding/engineering-onboarding-checklist.md")) {
  failures.push("AGENTS.md is missing onboarding checklist reference");
}

if (!useProposalsSource.includes("const COLLECTION_NAME = 'proposals'")) {
  failures.push("src/hooks/useProposals.ts is missing the expected proposals collection contract");
}

if (!useProposalsSource.includes("serverTimestamp()")) {
  failures.push("src/hooks/useProposals.ts is missing serverTimestamp() on proposal writes");
}

if (!firebaseSource.includes("getAuth") || !firebaseSource.includes("getFirestore")) {
  failures.push("src/lib/firebase.ts is missing expected auth/firestore initialization");
}

if (!firebaseSource.includes("export const auth") || !firebaseSource.includes("export const db")) {
  failures.push("src/lib/firebase.ts is missing auth/db exports");
}

if (!authContextSource.includes("@fasoo.com")) {
  failures.push("src/contexts/AuthContext.tsx is missing the expected @fasoo.com domain guard");
}

if (!readmeSource.includes("## 빠른 시작")) {
  failures.push("README.md is missing the quick-start section");
}

if (failures.length > 0) {
  console.error("verify:agent failed");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("verify:agent passed");
