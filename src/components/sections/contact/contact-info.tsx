import { Mail, Phone, MapPin } from "lucide-react";
import type { SocialLink } from "@/lib/content/types";

interface ContactInfoProps {
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: SocialLink[];
}

const socialLabels: Record<string, string> = {
  linkedin: "LinkedIn",
  twitter: "Twitter / X",
  github: "GitHub",
  instagram: "Instagram",
  youtube: "YouTube",
  facebook: "Facebook",
};

export function ContactInfo({
  email,
  phone,
  address,
  socialLinks,
}: ContactInfoProps) {
  return (
    <div className="flex flex-col gap-6">
      {email && (
        <div className="flex items-start gap-3">
          <Mail className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">Email</p>
            <a
              href={`mailto:${email}`}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {email}
            </a>
          </div>
        </div>
      )}
      {phone && (
        <div className="flex items-start gap-3">
          <Phone className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">Phone</p>
            <a
              href={`tel:${phone}`}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {phone}
            </a>
          </div>
        </div>
      )}
      {address && (
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">Address</p>
            <p className="text-sm text-muted-foreground">{address}</p>
          </div>
        </div>
      )}
      {socialLinks && socialLinks.length > 0 && (
        <div className="mt-2">
          <p className="mb-3 text-sm font-medium text-foreground">Follow us</p>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                {socialLabels[link.platform] ?? link.platform}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
