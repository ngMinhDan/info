// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import ConcurrentManager from 'concurrent-manager';
import { SECRET_KEY } from '@/utils/config';

type Data = {
  revalidated: boolean;
  message: string;
  paths?: string[];
};

/**
 * On-Demand Revalidation. Revalidate defined path only with webhook success build or manually trigger
 * @see https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
 */
async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { key, path = '/' } = req.query;

  if (key !== SECRET_KEY) {
    return res.status(401)
      .json({
        revalidated: false,
        message: 'Invalid key'
      });
  }

  try {
    let paths = [path.toString()];
    if (path.includes(',') || Array.isArray(path)) {
      const pathSplitted = (path as string).split(',');
      const concurrent = new ConcurrentManager<string>({ concurrent: 50 });
      pathSplitted.forEach((p) => {
        concurrent.queue(async() => {
          await res.unstable_revalidate(p);
          return p;
        });
      });
      const result = await concurrent.run();
      paths = result.map((data) => data.response as string);
    } else {
      await res.unstable_revalidate(path);
    }
    return res.status(200)
      .json({
        revalidated: true,
        message: 'Revalidate Success',
        paths
      });
  } catch (err) {
    return res.status(500)
      .json({
        revalidated: false,
        message: 'Error Revalidating'
      });
  }
}

export default handler;