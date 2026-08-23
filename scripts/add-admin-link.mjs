import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

let changes = 0;

// 1. Extend useAuth.tsx to also expose isAdmin
const authPath = path.join(process.cwd(), "src/hooks/useAuth.tsx");
let authContent = readFileSync(authPath, "utf-8");

const authFind = `export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  return {
    session,
    user: (session?.user ?? null) as User | null,
    loading,
    isAuthenticated: !!session,
  };
}`;

const authReplace = `export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
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
  }, [session?.user?.id]);
  return {
    session,
    user: (session?.user ?? null) as User | null,
    loading,
    isAuthenticated: !!session,
    isAdmin,
  };
}`;

if (authContent.includes(authFind)) {
  authContent = authContent.replace(authFind, authReplace);
  changes++;
  console.log("✓ extended useAuth with isAdmin");
} else if (authContent.includes("isAdmin")) {
  console.log("~ useAuth already has isAdmin");
} else {
  console.warn("~ skipped useAuth (exact pattern not found)");
}
writeFileSync(authPath, authContent, "utf-8");

// 2. Update SiteHeader.tsx to use isAdmin and show the link
const headerPath = path.join(process.cwd(), "src/components/SiteHeader.tsx");
let headerContent = readFileSync(headerPath, "utf-8");

const destructureFind = `const { isAuthenticated, loading } = useAuth();`;
const destructureReplace = `const { isAuthenticated, loading, isAdmin } = useAuth();`;
if (headerContent.includes(destructureFind)) {
  headerContent = headerContent.replace(destructureFind, destructureReplace);
  changes++;
  console.log("✓ updated useAuth destructure");
} else if (headerContent.includes(destructureReplace)) {
  console.log("~ destructure already updated");
} else {
  console.warn("~ skipped destructure (pattern not found)");
}

const desktopFind = `          {!loading && (
            <Link
              to={isAuthenticated ? "/account" : "/auth"}
              className="hidden text-[0.7rem] uppercase tracking-[0.22em] text-foreground/70 transition-colors hover:text-foreground md:inline"
            >
              {isAuthenticated ? "Account" : "Sign in"}
            </Link>
          )}`;
const desktopReplace = `          {!loading && isAdmin && (
            <Link
              to="/admin"
              className="hidden text-[0.7rem] uppercase tracking-[0.22em] text-foreground/70 transition-colors hover:text-foreground md:inline"
            >
              Admin
            </Link>
          )}
          {!loading && (
            <Link
              to={isAuthenticated ? "/account" : "/auth"}
              className="hidden text-[0.7rem] uppercase tracking-[0.22em] text-foreground/70 transition-colors hover:text-foreground md:inline"
            >
              {isAuthenticated ? "Account" : "Sign in"}
            </Link>
          )}`;
if (headerContent.includes(desktopFind)) {
  headerContent = headerContent.replace(desktopFind, desktopReplace);
  changes++;
  console.log("✓ added desktop Admin link");
} else if (headerContent.includes('to="/admin"')) {
  console.log("~ desktop Admin link already added");
} else {
  console.warn("~ skipped desktop Admin link (pattern not found)");
}

const mobileFind = `          <Link
            to={isAuthenticated ? "/account" : "/auth"}
            onClick={() => setOpen(false)}
            className="py-4 font-serif text-2xl"
          >
            {isAuthenticated ? "Account" : "Sign in"}
          </Link>`;
const mobileReplace = `          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="border-b border-border py-4 font-serif text-2xl"
            >
              Admin
            </Link>
          )}
          <Link
            to={isAuthenticated ? "/account" : "/auth"}
            onClick={() => setOpen(false)}
            className="py-4 font-serif text-2xl"
          >
            {isAuthenticated ? "Account" : "Sign in"}
          </Link>`;
if (headerContent.includes(mobileFind)) {
  headerContent = headerContent.replace(mobileFind, mobileReplace);
  changes++;
  console.log("✓ added mobile Admin link");
} else if (headerContent.includes('to="/admin"') && headerContent.match(/to="\/admin"/g)?.length > 1) {
  console.log("~ mobile Admin link already added");
} else {
  console.warn("~ skipped mobile Admin link (pattern not found)");
}

writeFileSync(headerPath, headerContent, "utf-8");
console.log(`\nDone. ${changes}/4 edits applied.`);
