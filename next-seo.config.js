/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "Sentinel",
  titleTemplate: "%s | Sentinel",
  defaultTitle: "Sentinel",
  description: "Sentinel - a platform to monitor your services seamlessly",
  canonical: "https://nextarter-chakra.sznm.dev",
  openGraph: {
    url: "https://nextarter-chakra.sznm.dev",
    title: "Sentinel",
    description: "Sentinel - a platform to monitor your services seamlessly",
    images: [
      {
        url: "https://og-image.sznm.dev/**nextarter-chakra**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250",
        alt: "nextarter-chakra.sznm.dev og-image",
      },
    ],
    site_name: "Sentinel",
  },
  twitter: {
    handle: "@sozonome",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
