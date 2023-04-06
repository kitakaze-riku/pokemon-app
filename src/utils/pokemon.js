export const getAllPokemon = (url) => {

    // 10.Promiseオブジェクトを使用して取得してきた値をjson形式で取得
    return new Promise((resolve, reject) => {
        // fetchでurlを取得
        fetch(url)
        // プロミスチェーンを用いて.thenで値を受け渡すことができる
        // 取得したurlをjson形式で返す↓
            .then((res) => res.json())
            // resを受け取りresolveに渡してreturn 
            .then((data) => resolve(data));
    })
}