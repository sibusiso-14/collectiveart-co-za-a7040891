import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "src/routes/__root.tsx");
let content = readFileSync(filePath, "utf-8");
let changes = 0;

const importFind = `import { supabase } from "@/integrations/supabase/client";\n`;
if (content.includes(importFind)) {
  content = content.replace(importFind, "");
  changes++;
  console.log("✓ removed static supabase import");
} else {
  console.warn("~ skipped removing static import (not found — may already be fixed)");
}

const effectFind = `  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => data.subscription.unsubscribe();
  }, [router, queryClient]);`;

const effectReplace = `  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    import("@/integrations/supabase/client").then(({ supabase }) => {
      const { data } = supabase.auth.onAuthStateChange((event) => {
        if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
        router.invalidate();
        if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
      });
      unsubscribe = () => data.subscription.unsubscribe();
    });
    return () => {
      unsubscribe?.();
    };
  }, [router, queryClient]);`;

if (content.includes(effectFind)) {
  content = content.replace(effectFind, effectReplace);
  changes++;
  console.log("✓ converted supabase to a dynamic (lazy) import");
} else if (content.includes(effectReplace)) {
  console.log("~ effect already converted");
} else {
  console.warn("~ skipped effect conversion (exact pattern not found — needs manual check)");
}

writeFileSync(filePath, content, "utf-8");
console.log(`\nDone. ${changes}/2 edits applied.`);
