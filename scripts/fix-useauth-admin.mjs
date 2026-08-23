import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "src/hooks/useAuth.tsx");
let content = readFileSync(filePath, "utf-8");
let changes = 0;

const a1 = "  const [loading, setLoading] = useState(true);";
const b1 = "  const [loading, setLoading] = useState(true);\n  const [isAdmin, setIsAdmin] = useState(false);";
if (content.includes(a1) && !content.includes("isAdmin")) {
  content = content.replace(a1, b1);
  changes++;
  console.log("✓ added isAdmin state");
} else {
  console.warn("~ skipped isAdmin state (not found or already added)");
}

const a2 = "    return () => sub.subscription.unsubscribe();\n  }, []);";
const b2 = `    return () => sub.subscription.unsubscribe();
  }, []);
  useEffect(() => {
    let cancelled = false;
    const userId = session?.user?.id;
    if (!userId) {
      setIsAdmin(false);
      return;
    }
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setIsAdmin(!!data);
      });
    return () => {
      cancelled = true;
    };
  }, [session?.user?.id]);`;
if (content.includes(a2) && !content.includes("user_roles")) {
  content = content.replace(a2, b2);
  changes++;
  console.log("✓ added admin-check effect");
} else {
  console.warn("~ skipped admin-check effect (not found or already added)");
}

const a3 = "    isAuthenticated: !!session,";
const b3 = "    isAuthenticated: !!session,\n    isAdmin,";
if (content.includes(a3) && !content.match(/isAuthenticated: !!session,\n\s*isAdmin,/)) {
  content = content.replace(a3, b3);
  changes++;
  console.log("✓ exposed isAdmin in return");
} else {
  console.warn("~ skipped return exposure (not found or already added)");
}

writeFileSync(filePath, content, "utf-8");
console.log(`\nDone. ${changes}/3 edits applied.`);
