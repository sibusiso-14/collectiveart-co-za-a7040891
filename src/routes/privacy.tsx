import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Collaborate.art" },
      {
        name: "description",
        content:
          "Privacy Policy for Collaborate.art, explaining what information we collect and how it's used.",
      },
      {
        property: "og:title",
        content: "Privacy Policy — Collaborate.art",
      },
      {
        property: "og:description",
        content:
          "Privacy Policy for Collaborate.art, explaining what information we collect and how it's used.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <article className="mx-auto max-w-[920px] px-5 py-16 md:px-10 md:py-24">
      <p className="label-xs text-muted-foreground">Legal</p>
      <h1 className="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl">
        Privacy Policy
      </h1>
      <p className="mt-6 text-sm text-muted-foreground">
        Last updated: 18 August 2026
      </p>

      <div className="mt-12 space-y-12 text-sm leading-relaxed md:text-base">
        <section>
          <p>
            <strong>Collaborate.art</strong> ("the Website", "we", "us") respects your
            privacy. This policy explains what information we collect, how we use it,
            and the choices you have.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl">Information we collect</h2>
          <p className="mt-4">
            When you create an account, we collect your name and email address, either
            entered directly or provided by Google if you sign in with Google.
          </p>
          <p className="mt-4">
            When you apply to become a creator or brand ambassador, we collect the
            details you submit in that form, such as your name, email, social media
            handle, city, and a short description about yourself.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl">How we use your information</h2>
          <p className="mt-4">
            We use this information to operate your account, respond to applications
            and enquiries, and improve the Website. We do not sell your personal
            information to third parties.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl">Third-party services</h2>
          <p className="mt-4">
            We use Supabase to store account and application data, and Google to offer
            sign-in with Google. These providers process data on our behalf under their
            own privacy and security practices.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl">Your choices</h2>
          <p className="mt-4">
                        You can request access to, correction of, or deletion of your personal
            information by contacting us at{" "}
            <a
              href="mailto:collaborateart@outlook.com"
              className="underline underline-offset-4"
            >
              collaborateart@outlook.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl">Contact</h2>
          <p className="mt-4">
                        Questions about this policy can be sent to{" "}
            <a
              href="mailto:collaborateart@outlook.com"
              className="underline underline-offset-4"
            >
              collaborateart@outlook.com
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
