import type { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { withMainLayoutPage } from '@/components/layouts';
import { getBlogList, ContentBlogList } from '@/server/content-parser';
import { DEFAULT_LOCALE } from '@/configs/env';
import BlogPageList, { withLocales } from '@/components/layouts/blog/PageList';

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
      title: 'Blog',
      date: '2022-06-01',
      image: '/media/banners/0.jpg',
      keywords: 'nmdan writing, technical writing, blog nmdan, minh dan blog',
      slug: 'blog',
      tags: ['blog', 'writing', 'technical writing', 'nmdan'],
      description: withLocales(locale).desc
    }
  };
});
