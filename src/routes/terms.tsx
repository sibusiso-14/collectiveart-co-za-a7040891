import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Collaborate.art" },
      {
        name: "description",
        content:
          "Terms and Conditions for Collaborate.art, a curated link-only directory for independent fashion designers in South Africa.",
      },
      {
        property: "og:title",
        content: "Terms & Conditions — Collaborate.art",
      },
      {
        property: "og:description",
        content:
          "Terms and Conditions for Collaborate.art, a curated link-only directory for independent fashion designers in South Africa.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <article className="mx-auto max-w-[920px] px-5 py-16 md:px-10 md:py-24">
      <p className="label-xs text-muted-foreground">Legal</p>
      <h1 className="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl">
        Terms & Conditions
      </h1>
      <p className="mt-6 text-sm text-muted-foreground">
        Last updated: 2 August 2026
      </p>

      <div className="mt-12 space-y-12 text-sm leading-relaxed md:text-base">
        <section>
          <p>
            Welcome to <strong>Collaborate.art</strong> ("the Website"). By
            accessing or using this Website, whether as a browsing user ("User",
            "Customer", "Shopper") or as an advertising fashion designer
            ("Designer", "Seller"), you agree to be bound by these Terms and
            Conditions. If you do not agree, please do not use the Website.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl md:text-3xl">
            1. Nature of Service (The Link-Only Model)
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>
              <strong>Directory platform only.</strong> The Website operates
              strictly as an online curated advertising and directory platform.
              We showcase a rotating selection of limited fashion collections.
            </li>
            <li>
              <strong>No transactional involvement.</strong> The Website does
              not process payments, handle shopping carts, arrange shipping,
              or facilitate sales.
            </li>
            <li>
              <strong>Independent contracts.</strong> Any purchase,
              communication, or agreement made is strictly a direct contract
              between the Customer and the individual Designer. The Website is
              not a party to, nor responsible for, any such transactions.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl md:text-3xl">
            2. For Customers / Shoppers
          </h2>

          <h3 className="mt-6 font-serif text-xl">2.1 Risk of Transaction</h3>
          <p className="mt-2">
            You acknowledge that you buy products from the Designers entirely at
            your own risk. Any issues regarding product quality, sizing errors,
            incorrect colors, delayed delivery, missing items, or financial
            loss must be taken up directly with the Designer.
          </p>

          <h3 className="mt-6 font-serif text-xl">
            2.2 Verification and Fraud Disclaimer
          </h3>
          <p className="mt-2">
            While we endeavor to curate reputable creators, the Website does not
            guarantee the legitimacy, financial safety, or business practices
            of any listed Designer. We are not liable for scams,
            misrepresentations, or fraudulent behavior carried out by
            third-party Designers.
          </p>

          <h3 className="mt-6 font-serif text-xl">
            2.3 Returns, Refunds, and Exchanges
          </h3>
          <p className="mt-2">
            The Website cannot issue refunds, returns, or store credit. All
            policies regarding returns, sizing exchanges, and refunds are
            determined solely by the respective Designer&apos;s own terms of
            sale.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl md:text-3xl">
            3. For Designers (Seller Cohorts)
          </h2>

          <h3 className="mt-6 font-serif text-xl">
            3.1 Curation and Rotational Model
          </h3>
          <p className="mt-2">
            Spaces are strictly limited to five (5) Designers per three (3)
            month cycle ("Cohort"). Inclusion in a Cohort is at the sole
            discretion of the Website. At the end of your designated 3-month
            cycle, your listings will be automatically deactivated to allow the
            next Cohort to launch.
          </p>

          <h3 className="mt-6 font-serif text-xl">3.2 Fees and EFT Payments</h3>
          <p className="mt-2">
            To secure a slot, the agreed-upon fee must be paid via Electronic
            Funds Transfer (EFT) by the specified deadline date. Listing
            activation is subject to the funds reflecting in our designated bank
            account or upon receipt of a valid, bank-generated PDF Proof of
            Payment.
          </p>
          <p className="mt-2">
            <strong>Non-refundable:</strong> All fees paid to the Website are
            strictly non-refundable, regardless of whether you make any sales
            during your 3-month cycle.
          </p>

          <h3 className="mt-6 font-serif text-xl">
            3.3 Content Accuracy and Intellectual Property
          </h3>
          <p className="mt-2">
            Designers are solely responsible for ensuring they own the
            copyright or usage rights to all imagery, text, logos, and clothing
            designs uploaded. You warrant that your descriptions (sizing
            charts, fabrics, colors) are precise and accurate to minimize
            customer complaints.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl md:text-3xl">
            4. Total Limitation of Liability
          </h2>
          <p className="mt-4">
            <strong>No liability:</strong> To the maximum extent permitted under
            South African law, Collaborate.art (including its owner, employees,
            or representatives) shall not be liable for any direct, indirect,
            incidental, special, or consequential damages resulting from the use
            of, or inability to use, this Website.
          </p>
          <p className="mt-2">
            <strong>Specific exclusions:</strong> This exclusion includes, but is
            not limited to, financial fraud by third parties, identity theft,
            defective clothing items, structural errors on garments, or
            communication breakdowns between users.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl md:text-3xl">
            5. Privacy Policy & POPIA Compliance
          </h2>
          <p className="mt-4">
            <strong>Data collection:</strong> We collect minimal personal data
            (e.g., email addresses for inquiries or Designer business info) to
            facilitate connections.
          </p>
          <p className="mt-2">
            <strong>Consent:</strong> By submitting an inquiry form or signing
            up as a Designer, you consent to the processing of your data in
            accordance with the Protection of Personal Information Act (POPIA).
          </p>
          <p className="mt-2">
            <strong>Third-party shared data:</strong> Once a Shopper clicks a
            link to contact a Designer, that data leaves our platform. We are
            not responsible for how individual Designers store or use Shopper
            information.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl md:text-3xl">6. Indemnity</h2>
          <p className="mt-4">
            You agree to indemnify, defend, and hold harmless Collaborate.art
            and its owner from any claims, damages, liabilities, costs, or
            demands (including legal fees) made by any third party due to or
            arising out of your breach of these Terms, your misuse of the
            Website, or your violation of any South African law.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl md:text-3xl">7. Governing Law</h2>
          <p className="mt-4">
            These Terms and Conditions are governed by and construed in
            accordance with the laws of the Republic of South Africa. Any
            disputes arising from these terms shall be subject to the exclusive
            jurisdiction of the South African courts.
          </p>
        </section>

        <section className="border-t border-border pt-10">
          <p className="text-muted-foreground">
            Questions about these terms? Contact us at{" "}
            <a
              href="mailto:collaborateart@outlook.com"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              collaborateart@outlook.com
            </a>
            .
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="label-xs rule-link text-foreground/70 hover:text-foreground"
            >
              Back to home
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
