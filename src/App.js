
import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card/Card';
import Navber from './components/Navber/Navber';
import { getAllPokemon, getPokemon } from './utils/pokemon';


function App() {

  // エンドポイント
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  // 状態管理
  const [loading, setLoading] = useState(true); //11.falseならポケモンデータを表示
  const [pokemonData, setPokemonData] = useState([]); // _pokemonDataをスコープ外でも使いたいためuseStateで管理する。
  const [nextURL, setNextURL] = useState(""); //次ページのurlの状態を管理する
  const [prevURL, setPrevURL] = useState(""); //前ページのurlの状態を管理する

  // ブラウザをリロードしたらポケモンを取得したいのでuseEffect
  useEffect(() => {
    // 非同期処理を行いたい場合はasync/await関数を使うこと
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL);// 全てのポケモンデータを取得
      loadPokemon(res.results);// 12.各ポケモンの詳細データを取得
      setNextURL(res.next)
      setPrevURL(res.previous)
      setLoading(false);//11.ポケモンデータが取得できたらloadingのstateをfalseに切り替える
    }
    fetchPokemonData();
  }, []);

  //13.各ポケモンの詳細データが必要なのでjsonデータをもっと細かく分けるための関数
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(// async/awaitとは非同期処理の構文のこと https://qiita.com/soarflat/items/1a9613e023200bbebcb3
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);  //pokemon.urlでポケモンの詳細を渡している
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);// useState呼び出して_pokemonDataを格納する。
  }

  // useStateを使っているので_pokemonDataがpokemonDataとして出力される。
  // console.log(pokemonData);

  // 次へボタンイベント
  const handleNextPage = async () => {
    setLoading(true);//11.ポケモンデータが取得できたらloadingのstateをfalseに切り替える
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);// 12.各ポケモンの詳細データを取得
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);//11.ポケモンデータが取得できたらloadingのstateをfalseに切り替える

  };

  // 前へ戻るボタンイベント
  const handlePrevPage = async () => {
    setLoading(true);//11.ポケモンデータが取得できたらloadingのstateをfalseに切り替える
    if (!prevURL) return;
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);// 12.各ポケモンの詳細データを取得
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);//11.ポケモンデータが取得できたらloadingのstateをfalseに切り替える
  };


  return (
    <>
      <Navber />
      <div className="App">

        {/* もしsetLoadingの値がtrueなら『ロード中・・・』falseなら『ポケモンデータを取得しました。』と表示させる。 */}
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            <div className='pokemonCardContainer'>
              {/* ポケモン詳細データをmap関数で回してCard.jsに値を渡す iはindexのi */}
              {pokemonData.map((pokemon, i) => {
                // console.log(pokemon);
                return <Card pokemon={pokemon} key={i} />
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )
        }
      </div>
    </>
  );
}

export default App;
