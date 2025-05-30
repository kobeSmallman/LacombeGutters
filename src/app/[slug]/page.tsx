export default function TestPage() {
  return <h1 style={{color: "red"}}>TEST PAGE - IT IS WORKING!</h1>;
}

export function generateStaticParams() {
  return [
    { slug: 'lacombe' },
    { slug: 'red-deer' },
    { slug: 'blackfalds' },
    { slug: 'sylvan-lake' },
    { slug: 'ponoka' },
    { slug: 'bentley' },
    { slug: 'rimbey' },
    { slug: 'eckville' },
    { slug: 'alix' },
    { slug: 'clive' },
    { slug: 'bashaw' },
    { slug: 'mirror' },
    { slug: 'stettler' },
    { slug: 'didsbury' },
    { slug: 'olds' },
    { slug: 'sundre' },
    { slug: 'rocky-mountain-house' },
    { slug: 'innisfail' },
    { slug: 'penhold' },
    { slug: 'black-diamond' },
    { slug: 'okotoks' },
    { slug: 'high-river' },
    { slug: 'strathmore' },
    { slug: 'cochrane' },
    { slug: 'airdrie' }
  ];
}
