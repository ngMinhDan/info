import { Fragment, FunctionComponent, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Content,
  Footer,
  Navbar,
  Banner,
  CardBlogList,
  Pagination
} from '@/components';
import { ContentMeta } from '@/server/content-parser';
import { BLOG_PAGINATION_LIMIT } from '@/utils/config';
import { useRouter } from 'next/router';

export type Props = {
  contents: ContentMeta[];
  locale: string;
  total: number;
  pageCurrent?: number;
};

const BlogList: FunctionComponent<Props> = (props) => {
  const {
    contents,
    locale,
    total,
    pageCurrent = 1
  } = props;

  const router = useRouter();

  const pageCount = useMemo(() => {
    return Math.ceil(total / BLOG_PAGINATION_LIMIT);
  }, [total]);

  const handlePageChange = useCallback((page: number) => {
    router.push('/blog/page/[page]', `/blog/page/${page}`);
  }, []);

  return (
    <Fragment>
      <Navbar localeChange />
      <Banner
        bgImage="/media/banners/5.jpg"
        className="font-courgette text-white util--text-shadow text-center"
      >
        <div className="container -mt-48">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
            className="font-bold text-4xl mb-8 text-white dark:text-white"
          >
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.5, delay: 0.2 }}
            className="text-lg px-8 text-white dark:text-white"
          >
            {
              locale === 'en'
                ? 'Coding, work, life, and whatever i want.'
                : 'Kode, pekerjaan, kehidupan, dan apapun yang ku mau.'
            }”
          </motion.p>
        </div>
      </Banner>
      <Content className="flex flex-col items-center justify-center">
        <CardBlogList
          className="-mt-80"
          contents={contents}
          locale={locale}
        />
        <div className="mt-40 text-center">
          <h4 className="mb-16">
            Page {pageCurrent} of {pageCount}
          </h4>
          <Pagination
            onPageChange={handlePageChange}
            value={pageCurrent}
            pageCount={pageCount}
          />
        </div>
      </Content>
      <Footer />
    </Fragment>
  );
};

export default BlogList;
