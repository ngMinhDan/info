import type { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { withMainLayoutPage } from '@/components/layouts';
import { getBlogList, ContentBlogList } from '@/server/content-parser-recap';
import { DEFAULT_LOCALE } from '@/configs/env';
import BlogPageList, { withLocales } from '@/components/layouts/recap/PageList';

type Props = {
  blogs: ContentBlogList;
  locale: string;
};

export const getStaticProps = async(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> => {
  const { locale = DEFAULT_LOCALE } = ctx;
  const blogs = await getBlogList(locale);
  return {
    props: {
      blogs,
      locale
    }
  };
};

const BlogIndexPage: NextPage<Props> = (props) => {
  const { blogs, locale } = props;
  const { total, contents } = blogs;
  return (
    <BlogPageList
      contents={contents}
      locale={locale}
      total={total}
    />
  );
};

export default withMainLayoutPage(BlogIndexPage, ({ locale }) => {
  return {
    locale,
    meta: {
      title: 'Recap',
      date: '2022-06-01',
      image: '/media/banners/2.jpg',
      keywords: 'check',
      slug: 'blog',
      tags: ['blog', 'writing', 'technical writing', 'nmdan.com'],
      description: withLocales(locale).desc
    }
  };
});
