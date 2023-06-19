import { getCurrentInstance } from "vue";

/**
 * 根据提供的id获取dom元素
 * @param id - dom元素的id
 * @returns rect - 返回dom元素
 */
const getDOM = (id: string) => {
  return new Promise((resolve, reject) => {
    // 获取组件实例
    const instance = getCurrentInstance();
    const query = uni.createSelectorQuery().in(instance);
    query
      .select(`#${id}`)
      .boundingClientRect((rect: any) => {
        if (rect) {
          resolve(rect);
        } else {
          reject("获取不到元素");
        }
      })
      .exec();
  });
};

export default getDOM;
