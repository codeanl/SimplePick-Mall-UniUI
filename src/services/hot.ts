import { http } from '@/utils/http'
/**
 * 首页-前台分类-小程序
 */
export const getHotApi = () => {
    return http<any[]>({
        method: 'GET',
        url: '/api/index/categoryList',
    })
}

export const getHotProductApi = (subjectId: number) => {
    return http<any[]>({
        method: 'GET',
        url: `/api/index/subjectProductList?subjectId=${subjectId}`,
    });
};