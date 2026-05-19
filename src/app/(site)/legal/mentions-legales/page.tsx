import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Mentions Legales",
  description: "Mentions legales conformement a la legislation francaise.",
  path: "/legal/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <main className="px-4 py-12 md:py-20">
      <div className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl">
        <h1>Mentions L&eacute;gales</h1>
        <p className="lead">
          Conform&eacute;ment aux dispositions de la loi n&deg; 2004-575 du 21
          juin 2004 pour la confiance dans l&apos;&eacute;conomie
          num&eacute;rique.
        </p>

        <h2>1. &Eacute;diteur du site</h2>
        <p>
          <strong>Raison sociale :</strong> [NOM DE LA SOCIETE]
          <br />
          <strong>Forme juridique :</strong> [FORME JURIDIQUE]
          <br />
          <strong>Si&egrave;ge social :</strong> [ADRESSE]
          <br />
          <strong>SIRET :</strong> [NUMERO SIRET]
          <br />
          <strong>Directeur de la publication :</strong> [NOM DU DIRECTEUR]
          <br />
          <strong>Contact :</strong>{" "}
          <a href="mailto:contact@example.com">contact@example.com</a>
        </p>

        <h2>2. H&eacute;bergeur</h2>
        <p>
          <strong>Raison sociale :</strong> Vercel Inc.
          <br />
          <strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723,
          USA
          <br />
          <strong>Site web :</strong>{" "}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
            vercel.com
          </a>
        </p>

        <h2>3. Propri&eacute;t&eacute; intellectuelle</h2>
        <p>
          L&apos;ensemble du contenu de ce site (textes, images, vid&eacute;os,
          logos) est prot&eacute;g&eacute; par le droit d&apos;auteur. Toute
          reproduction, m&ecirc;me partielle, est interdite sans autorisation
          pr&eacute;alable.
        </p>

        <h2>4. Donn&eacute;es personnelles</h2>
        <p>
          Les informations collect&eacute;es via les formulaires sont
          destin&eacute;es exclusivement &agrave; [NOM DE LA SOCIETE]. Elles ne
          sont jamais c&eacute;d&eacute;es &agrave; des tiers.
          Conform&eacute;ment au RGPD, vous disposez d&apos;un droit
          d&apos;acc&egrave;s, de rectification et de suppression de vos
          donn&eacute;es.
        </p>

        <h2>5. Cookies</h2>
        <p>
          Ce site utilise des cookies pour am&eacute;liorer
          l&apos;exp&eacute;rience utilisateur et mesurer l&apos;audience. Vous
          pouvez g&eacute;rer vos pr&eacute;f&eacute;rences via le bandeau
          cookies.
        </p>
      </div>
    </main>
  );
}
