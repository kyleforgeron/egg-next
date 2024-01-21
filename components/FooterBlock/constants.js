
import * as Google from 'assets/google-podcasts.svg';
import * as Apple from 'assets/apple-podcasts.svg';
import * as Spotify from 'assets/spotify.svg';
import * as Linkedin from 'assets/linkedin.svg';
import * as Facebook from 'assets/facebook.svg';
import * as Instagram from 'assets/instagram.svg';

export const footerColumns = [
  {
    title: 'Engage With Us',
    links: [
      {
        text: 'Listen to the Podcast',
        href: '/podcast',
      },
      {
        text: 'Read the Blog',
        href: '/blog',
      },
      {
        text: 'Access our Resources',
        href: '/resource-library',
      },
      {
        text: 'Contact Us',
        href: '/contact-us',
      },
    ],
  },
  {
    title: 'About Us',
    links: [
      {
        text: 'Who We Are',
        href: '/who-we-are',
      },
      {
        text: 'Special Thanks',
        href: '/special-thanks',
      },
      {
        text: 'Privacy Policy',
        href: '/privacy-policy',
      },
      {
        text: 'Copyright Notice',
        href: '/egg-copyright-notice',
      },
    ],
  },
  {
    title: 'International Education',
    links: [
      {
        text: 'Become an International Educator',
        href: '/blog/becoming-an-international-educator',
      },
      {
        text: 'Perks of Teaching Internationally',
        href: '/blog/perks-of-teaching-internationally',
      },
      {
        text: 'What to Seek and What to Avoid',
        href: '/blog/what-to-consider-in-schools-and-countries-when-recruiting',
      },
    ],
  },
];

export const socials = [
  {
    alt: 'Google Podcasts',
    src: Google,
    href: 'https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDA2MDYyLnJzcw',
  },
  {
    alt: 'Apple Podcasts',
    src: Apple,
    href: 'https://podcasts.apple.com/us/podcast/educators-going-global/id1657501409',
  },
  {
    alt: 'Spotify',
    src: Spotify,
    href: 'https://open.spotify.com/show/7BvZVshefIw4kAt3dOCTz8',
  },
  {
    alt: 'Linkedin',
    src: Linkedin,
    href: 'https://www.linkedin.com/company/educators-going-global/',
  },
  {
    alt: 'Facebook',
    src: Facebook,
    href: 'https://www.facebook.com/groups/1182356999027529',
  },
  {
    alt: 'Instagram',
    src: Instagram,
    href: 'https://www.instagram.com/educatorsgoingglobal/',
  },
]