import { Paragraph, Link, Text } from '@modulz/design-system';

export const Footer = () => (
  <>
    <Paragraph>
      Based on the work of{' '}
      <Link href='https://twitter.com/susankare'>Susan Kare</Link>.
    </Paragraph>
    <Paragraph>
      Order prints at <Link href='https://kareprints.com'>kareprints.com</Link>.
    </Paragraph>
    <Paragraph>
      Source code available at{' '}
      <Link href='https://github.com/penx/cairo-edit'>
        github.com/penx/cairo-edit
      </Link>
      .
    </Paragraph>
    <Paragraph>
      Copyright © 2022{' '}
      <Link href='https://twitter.com/penx'>Alasdair McLeay</Link>.
    </Paragraph>
  </>
);
