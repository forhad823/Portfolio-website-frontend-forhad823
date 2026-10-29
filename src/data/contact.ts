/**
 * contact.ts — Single source of truth for all contact and social link data.
 *
 * Import from here in every component that needs email, phone, or social URLs.
 * Never hard-code these values in JSX — edit here and every section updates.
 */

export const contactInfo = {
  name: "Md. Forhad Uddin",
  displayName: "Forhad",
  designation: "Full Stack Web Developer",
  email: "forhaduddin823@gmail.com",
  phone: "+8801833568856",
  resumeUrl:
    "https://drive.google.com/uc?export=download&id=1Iw-FBSbW0-ESESsJ7twrbQxTQUo1l-GK",
  location: "Bangladesh",
} as const;

export type SocialPlatform = "github" | "linkedin" | "twitter" | "facebook";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: string;
  /** Icon identifier matched in component — uses react-icons Si* names */
  icon: string;
  ariaLabel: string;
}

export const socialLinks: SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    url: "https://github.com/forhad823",
    icon: "FaGithub",
    ariaLabel: "Forhad's GitHub profile",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/forhad823",
    icon: "FaLinkedin",
    ariaLabel: "Forhad's LinkedIn profile",
  },
  {
    platform: "twitter",
    label: "X / Twitter",
    url: "https://x.com/forhaduddin823",
    icon: "FaXTwitter",
    ariaLabel: "Forhad's X (Twitter) profile",
  },
  {
    platform: "facebook",
    label: "Facebook",
    url: "https://web.facebook.com/mdforhad.forhad.7186896",
    icon: "FaFacebook",
    ariaLabel: "Forhad's Facebook profile",
  },
];
