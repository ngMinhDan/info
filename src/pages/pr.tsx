import { withMainLayoutPage } from '@/components/layouts';
import { FunctionComponent } from 'react';

const ResumePage: FunctionComponent = () => (
  <iframe src="/media/Japanese.pdf" className="h-screen w-full" />
);

export default withMainLayoutPage(ResumePage, {
  meta: {
    title: 'Pr',
    slug: 'pr'
  }
});
