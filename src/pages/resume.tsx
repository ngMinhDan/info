import { withMainLayoutPage } from '@/components/layouts';
import { FunctionComponent } from 'react';

const ResumePage: FunctionComponent = () => (
  <iframe src="/media/MinhDan.pdf" className="h-screen w-full" />
);

export default withMainLayoutPage(ResumePage, {
  meta: {
    title: 'Resume',
    slug: 'resume'
  }
});
