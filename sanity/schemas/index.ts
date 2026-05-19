import { type SchemaTypeDefinition } from "sanity";

// Object schemas
import { seo } from "./objects/seo";
import { portableText } from "./objects/portable-text";
import { imageWithAlt } from "./objects/image-with-alt";
import { cta } from "./objects/cta";
import { socialLink } from "./objects/social-link";
import { codeBlock } from "./objects/code-block";

// Document schemas
import { post } from "./documents/post";
import { category } from "./documents/category";
import { author } from "./documents/author";
import { testimonial } from "./documents/testimonial";
import { teamMember } from "./documents/team-member";
import { service } from "./documents/service";
import { project } from "./documents/project";
import { faq } from "./documents/faq";
import { faqGroup } from "./documents/faq-group";
import { changelogEntry } from "./documents/changelog-entry";
import { page } from "./documents/page";
import { siteSettings } from "./documents/site-settings";

export const schemas: SchemaTypeDefinition[] = [
  // Objects (must be registered before documents that reference them)
  seo,
  portableText,
  imageWithAlt,
  cta,
  socialLink,
  codeBlock,

  // Documents
  post,
  category,
  author,
  testimonial,
  teamMember,
  service,
  project,
  faq,
  faqGroup,
  changelogEntry,
  page,
  siteSettings,
];
