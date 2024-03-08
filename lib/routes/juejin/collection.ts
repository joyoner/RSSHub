import cache from '@/utils/cache';
import got from '@/utils/got';
import util from './utils';

export default async (ctx) => {
    const collectionId = ctx.req.param('collectionId');

    const collectPage = await got({
        method: 'get',
        url: `https://api.juejin.cn/interact_api/v1/collectionSet/get?tag_id=${collectionId}&cursor=0`,
    });

    let items = [];
    if (collectPage.data.data && collectPage.data.data.article_list) {
        items = collectPage.data.data.article_list.slice(0, 10);
    }

    const result = await util.ProcessFeed(items, cache);

    ctx.set('data', {
        title: '掘金 - 单个收藏夹',
        link: `https://juejin.cn/collection/${collectionId}`,
        description: '掘金，用户单个收藏夹',
        item: result,
        allowEmpty: true,
    });
};