export const getAllPokemon = (url) => {

    //メモ 『resolve』とはデータ取得が成功した時
    // 『reject』とは失敗した時。今回は成功した時の場合のみ記述する。
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

//13.一つ一つのポケモンの詳細データを取得する
export const getPokemon = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                resolve(data)
            });
    });
};